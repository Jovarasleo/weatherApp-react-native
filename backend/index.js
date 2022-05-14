import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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
  console.log(cityname);
  // const connection = await mongoClient.connect();
  let fetchResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`
  );
  let responseJSON = await fetchResponse.json();
  // await connection
  //   .db("weatherApp")
  //   .collection("weatherData")
  //   .insertOne(responseJSON);
  const tempToC = (responseJSON.main.temp - 273.15).toFixed(1);
  const dataObj = { city: responseJSON.name, temp: tempToC };
  res.send(dataObj);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
