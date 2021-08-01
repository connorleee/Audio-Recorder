const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const recordings = [];

app.get("/audio", (req, res) => {
  res.send(recordings);
});

app.post("/audio", (req, res) => {
  let { recordingURL } = req.body;

  recordings.push(recordingURL);

  res.send({ msg: "successful" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
