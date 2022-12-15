import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose.set('strictQuery', false);
mongoose
  .connect("mongodb://uuoooglcm0vpnaioclf8:P8zncGSf1Nc68X38TGV9@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bqc1eklatisbnzm?replicaSet=rs0")
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DV err",err))

const app = express();

app.use(express.json());


app.post("/auth/register", (req, res) => {
  
});

app.listen(5555, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
