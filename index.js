import express from "express";
import mongoose from "mongoose";

import checkAuth from "./utils/checkAuth.js";
import {
  registerValidation,
  loginValidations,
  postCreateValidation,
} from "./validations.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb://uuoooglcm0vpnaioclf8:P8zncGSf1Nc68X38TGV9@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bqc1eklatisbnzm?replicaSet=rs0"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DV err", err));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidations, UserController.login);

app.post("/auth/register", registerValidation, UserController.register);

app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", PostController.update);

app.listen(5555, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
