const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

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
