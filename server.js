import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
// import fileUpload from 'express-fileupload';
import userRouter from "./routes/userRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import lecturersRouter from "./routes/lecturersRouter.js";
import respondentsRouter from "./routes/respondentsRouter.js";

const app = express();
const port = 5000;

configDotenv();
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(fileUpload());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };
  
  async function connectDB() {
    try {
      await mongoose.connect(process.env.MONGO_URI, clientOptions);
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.error("Koneksi ke MongoDB gagal:", error);
      process.exit(1); // Keluar dari proses jika koneksi gagal
    }
  }

app.get('/', (req, res) => {
    res.send("hallo")
})

app.use("/users", userRouter);
app.use("/categories", categoriesRouter);
app.use("/lecturers", lecturersRouter);
app.use("/respondents", respondentsRouter);

// let users, respondens, categories, lecturers;

connectDB()
  .then(() => {
    // users = mongoose.connection.collection("users");
    // respondens = mongoose.connection.collection("respondens");
    // categories = mongoose.connection.collection("categories");
    // lecturers = mongoose.connection.collection("lecturers");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(console.dir);