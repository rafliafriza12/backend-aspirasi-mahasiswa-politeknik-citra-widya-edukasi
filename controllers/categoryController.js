import Categories from "../models/Categories.js";
import jwt from "jsonwebtoken";

export const getAllCategories = async (req, res, next) => {

        try {
            const categories = await Categories.find();
            return res.status(200).json({status: 200, data: categories });
        } catch (error) {
            console.error("Error fetching categories:", error);
            return res.status(500).json({status: 500, message: "Internal server error." });
        }
}

export const addCategory = async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({status: 401, message: "Authorization header is missing." });
    }

    // Memisahkan "Bearer" dari token
    const token = authHeader.split(' ')[1];

    // Memverifikasi token
    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({status: 403, message: "Invalid token." });
        }

        try {
            // Mengambil kategori dari body permintaan
            const { category } = req.body;

            // Memeriksa apakah kategori ada
            if (!category) {
                return res.status(400).json({status: 400, message: "Category is required." });
            }

            const existingCategory = await Categories.findOne({ category });
            if (existingCategory) {
                return res.status(409).json({ status: 409, message: "Category already exists." });
            }else{
                const newCategory = new Categories({ category });
                await newCategory.save();
    
                return res.status(201).json({ status: 201, message: "Category added successfully.", data: newCategory });
            }

            // Membuat kategori baru
        } catch (error) {
            console.error("Error adding category:", error);
            return res.status(500).json({status: 500, message: "Internal server error." });
        }
    });
};

export const deleteCategory = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({status: 401, message: "Authorization header is missing." });
    }

    // Memisahkan "Bearer" dari token
    const token = authHeader.split(' ')[1];

    // Memverifikasi token
    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({status: 403, message: "Invalid token." });
        }

        try {
            // Mengambil id kategori dari parameter request
            const categoryId = req.params.id;
            console.log(categoryId);

            // Mencari dan menghapus kategori
            const deletedCategory = await Categories.findByIdAndDelete(categoryId);

            // Memeriksa apakah kategori ada
            if (!deletedCategory) {
                return res.status(404).json({status: 404, message: "Category not found." });
            }

            return res.status(200).json({status: 200, message: "Category deleted successfully.", category: deletedCategory });
        } catch (error) {
            console.error("Error deleting category:", error);
            return res.status(500).json({status: 500, message: "Internal server error." });
        }
    });
};