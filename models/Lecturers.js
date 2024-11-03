import mongoose from "mongoose";

const Lecturers = new mongoose.Schema({
    lecture: {
        type: String,
        required: true,
        unique: true,
    }
})

export default mongoose.model("Lecturers", Lecturers);