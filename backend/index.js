import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

// import { MongoClient } from "mongodb";
dotenv.config();

const connect = process.env.MONGO_CONNECTION_STRING;
// const mongoClient = new MongoClient(connect);
const port = process.env.port;
const APIkey = process.env.key;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/:location", async (req, res) => {
  const cityname = req.params.location;

  // const connection = await mongoClient.connect();
  // await connection
  //   .db("weatherApp")
  //   .collection("weatherData")
  //   .insertOne(responseJSON);

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`;

  let settings = { method: "Get" };

  fetch(url, settings)
    .then((res) => res.json())
    .then((json) => {
      const tempToC = (json?.main?.temp - 273.15).toFixed(1);
      const dataObj = { city: json?.name, temp: tempToC };
      res.send(dataObj);
    })
    .catch((error) => {
      res.send(error);
    });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
