import Respondents from "../models/Respondents.js";
import jwt from "jsonwebtoken";

// Mendapatkan semua responden (dengan autentikasi)
export const getAllRespondents = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({status: 401, message: "Authorization header is missing." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, async (err) => {
    if (err) {
      return res.status(403).json({ status: 403, message: "Invalid token." });
    }

    try {
      const respondents = await Respondents.find();
      res.status(200).json({status: 200, data: respondents });
    } catch (error) {
      console.error("Error fetching respondents:", error);
      res.status(500).json({status: 500, message: "Internal server error." });
    }
  });
};

// Mendapatkan detail responden berdasarkan ID (dengan autentikasi)
export const getDetailRespondent = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const authHeader = req.headers["authorization"];
  
    if (!authHeader) {
      return res.status(401).json({ status: 401, message: "Authorization header is missing." });
    }
  
    const token = authHeader.split(" ")[1];
  
    jwt.verify(token, JWT_SECRET, async (err) => {
      if (err) {
        return res.status(403).json({ status: 403, message: "Invalid token." });
      }
  
      try {
        const id = req.params.id;
        const respondent = await Respondents.findById(id);
        if (!respondent) {
          return res.status(404).json({ status: 404, message: "Respondent not found." });
        }
  
       return res.status(200).json({ status: 200, data: respondent });
      } catch (error) {
        console.error("Error fetching respondent details:", error);
        return res.status(500).json({ status: 500, message: "Internal server error." });
      }
    });
  };
  

// Menambahkan responden baru (tanpa autentikasi)
export const createRespondent = async (req, res) => {
    try {
        const {
            fullName,
            majority,
            NIM,
            phoneNumber,
            email,
            category,
            report,
            lecturer,
            proof,
            signature, // Base64 string dari frontend
        } = req.body;
        console.log(fullName);
        // Validasi input
        if (!fullName) return res.status(400).json({ status: 400, message: "Nama Lengkap tidak boleh kosong." });
        if (!majority) return res.status(400).json({ status: 400, message: "Prodi tidak boleh kosong." });
        if (!NIM) return res.status(400).json({ status: 400, message: "NIM tidak boleh kosong." });
        if (!phoneNumber) return res.status(400).json({ status: 400, message: "Nomor HP tidak boleh kosong." });
        if (!email) return res.status(400).json({ status: 400, message: "Email tidak boleh kosong." });
        if (!category) return res.status(400).json({ status: 400, message: "Kategori tidak boleh kosong." });
        if (!report) return res.status(400).json({ status: 400, message: "Isi Laporan tidak boleh kosong." });
        if (!lecturer) return res.status(400).json({ status: 400, message: "Dosen tidak boleh kosong." });
        if (!proof) return res.status(400).json({ status: 400, message: "Bukti (Foto atau Video) tidak boleh kosong." });
        if (!signature) return res.status(400).json({ status: 400, message: "Tanda Tangan tidak boleh kosong." });

        // Mengonversi file menjadi base64
       

        const newRespondent = new Respondents({
            fullName,
            majority,
            NIM,
            phoneNumber,
            email,
            category,
            report,
            lecturer,
            proof,
            signature
        });

        await newRespondent.save();
        res.status(201).json({
            status: 201,
            message: "Aspirasi anda sudah di rekam",
            data: newRespondent,
        });
    } catch (error) {
        console.error("Error creating respondent:", error);
        res.status(500).json({ status: 500, message: "Internal server error." });
    }
};

  