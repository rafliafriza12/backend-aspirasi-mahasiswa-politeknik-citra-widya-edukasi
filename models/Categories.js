import mongoose from "mongoose";

const Categories = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true,
    }
})

export default mongoose.model("Categories", Categories);