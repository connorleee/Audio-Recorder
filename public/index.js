//Note: I don't normally comment like this, but wanted to demonstrate my thought process a little more.

const recordButton = document.getElementById("record-btn");

recordButton.addEventListener("mousedown", () => audioRecorder.start());
recordButton.addEventListener("mouseup", () => audioRecorder.stop());

//I decided to model the audio recorder as an object with intention to modularize the recorder.
//Additionally, the object helps maintain context of individual instances of recorders
const audioRecorder = {
  recorder: null, //stores the instance of MediaRecorder and the input stream
  recordedChunks: [], //audio data is saved in this array while being recorded
  init: async function () {
    //init method creates instance of recorder and adds necessary methods for capturing audio data
    audioRecorder.recordedChunks = [];

    try {
      const device = await navigator.mediaDevices.getUserMedia({ audio: true }); //native web API to get access to user microphone data stream

      audioRecorder.recorder = new MediaRecorder(device); //native web API to create new recorder which captures stream data
      audioRecorder.recorder.onstop = handleStop;
      audioRecorder.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          audioRecorder.recordedChunks.push(e.data); //e.data is the actual audio data being saved locally
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  start: function () {
    audioRecorder.recordedChunks = []; //when starting a new recording, old recording data is removed. Otherwise each recording stacks on eachother

    audioRecorder.recorder.start();
  },
  stop: function () {
    audioRecorder.recorder.stop();
  },
};

audioRecorder.init();

async function handleStop() {
  const blob = new Blob(audioRecorder.recordedChunks, {
    type: "audio/mp3",
  }); //audio recordings are saved as blobs locally
  const audioURL = window.URL.createObjectURL(blob); //URL pointer to the blob data which will be saved on the server. In future release, the actual audio file should be saved on the server.

  try {
    let recording = await postAudio(audioURL).then((res) => res.json()); //posts blob URL to mock database and returns the entry to the client to generate a new audio element
    createAudioEl(recording);
  } catch (err) {
    console.log(err);
  }
}

function createAudioEl(audioURL) {
  let recordingsList = document.getElementById("recordings-list");
  let newRecording = document.createElement("audio");

  newRecording.setAttribute("class", "recording");
  newRecording.setAttribute("controls", "");
  newRecording.src = audioURL;

  recordingsList.appendChild(newRecording);
}

function postAudio(recordingURL) {
  return fetch("http://localhost:3000/audio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recordingURL }),
  }).catch((err) => console.log("post error", err));
}
