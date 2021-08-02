const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const data = {
  recordings: [],
};

app.post("/audio", (req, res) => {
  let { recordingURL } = req.body;

  data.recordings.push(recordingURL);

  return res.json(recordingURL);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
