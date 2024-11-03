import multer from "multer";

// Konfigurasi penyimpanan untuk file bukti dan tanda tangan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Direktori tempat menyimpan file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Menambahkan timestamp untuk menghindari nama file yang sama
    }
});

export const upload = multer({ storage: storage });