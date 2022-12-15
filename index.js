import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

import UserModel from "./models/User.js";

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb://uuoooglcm0vpnaioclf8:P8zncGSf1Nc68X38TGV9@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bqc1eklatisbnzm?replicaSet=rs0"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DV err", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "10d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Неудалось зарегистрироваться",
    });
  }
});

app.listen(5555, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
