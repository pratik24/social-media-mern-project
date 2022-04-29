import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import multer from 'multer';
import path from 'path';

const __dirname = path.resolve();
console.log("dirname is ", __dirname);
const app = express();
dotenv.config();
mongoose.connect(process.env.MONGO_DB, () => {
    console.log("connection to mongoDB");
});
const joinedField = path.join(__dirname, "public/images");
console.log("joinedField ", joinedField);
app.use("/images", express.static(joinedField));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.get( "/", (req, res) => {
    res.send("app runing");
})
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(8080, ()=> {
    console.log("backend running");
})