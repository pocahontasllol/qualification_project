import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors"
import {
  registerValidation,
  loginValidations,
  postCreateValidation,
} from "./validations.js";

import { PostController, UserController } from "./controllers/index.js";

import { handleValidationErrors, checkAuth } from "./utils/index.js";

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb://uuoooglcm0vpnaioclf8:P8zncGSf1Nc68X38TGV9@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bqc1eklatisbnzm?replicaSet=rs0"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DV err", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    // if (!fs.existsSync("uploads")) {
    //   fs.mkdirSync("uploads");
    // }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors())
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  handleValidationErrors,
  loginValidations,
  UserController.login
);

app.post(
  "/auth/register",
  handleValidationErrors,
  registerValidation,
  UserController.register
);

app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(5555, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
