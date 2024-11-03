import Lecturers from "../models/Lecturers.js";
import jwt from "jsonwebtoken";

// Method untuk mendapatkan semua lecturers tanpa auth header
export const getAllLecturers = async (req, res) => {
    try {
        const lecturers = await Lecturers.find();
        res.status(200).json({status: 200, data: lecturers });
    } catch (error) {
        console.error("Error fetching lecturers:", error);
        res.status(500).json({status: 500, message: "Internal server error." });
    }
};

// Method untuk menambah lecturer baru dengan auth header
export const addLecture = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({status: 401, message: "Authorization header is missing." });
    }

    // Mengambil token dari header
    const token = authHeader.split(' ')[1];

    // Memverifikasi token
    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({status: 403, message: "Invalid token." });
        }

        try {
            const { lecture } = req.body;

            if (!lecture) {
                return res.status(400).json({status: 400, message: "Lecture name is required." });
            }

            const existingLecture = await Lecturers.findOne({lecture});
            if(existingLecture) return res.status(409).json({ status: 409, message: "Lecture already exists." });
            
            const newLecture = new Lecturers({ lecture });
            await newLecture.save();

            res.status(201).json({status: 201, message: "Lecture added successfully.", data: newLecture });
        } catch (error) {
            console.error("Error adding lecture:", error);
            res.status(500).json({ status: 500, message: "Internal server error." });
        }
    });
};

// Method untuk menghapus lecturer dengan auth header
export const deleteLecture = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({status: 401, message: "Authorization header is missing." });
    }

    // Mengambil token dari header
    const token = authHeader.split(' ')[1];

    // Memverifikasi token
    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({status: 403, message: "Invalid token." });
        }

        try {
            const id = req.params.id;
            
            const deletedLecture = await Lecturers.findByIdAndDelete(id);
            if (!deletedLecture) {
                return res.status(404).json({status: 404, message: "Lecture not found." });
            }

            res.status(200).json({status: 200, message: "Lecture deleted successfully.", data: deletedLecture });
        } catch (error) {
            console.error("Error deleting lecture:", error);
            res.status(500).json({status: 500, message: "Internal server error." });
        }
    });
};
