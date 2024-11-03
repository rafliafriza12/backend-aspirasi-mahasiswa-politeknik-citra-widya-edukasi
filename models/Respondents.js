import mongoose from "mongoose";

const Respondents = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        majority: { type: String, required: true },
        NIM: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        category: { type: String, required: true },
        report: { type: String, required: true },
        lecturer: { type: String, required: true },
        proof: { type: String, required: true }, // Menyimpan proof sebagai string (base64)
        signature: { type: String, required: true },
      }, { timestamps: true }
);

export default mongoose.model("Respondent", Respondents);
