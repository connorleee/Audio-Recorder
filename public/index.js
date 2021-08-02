const recordButton = document.getElementById("record-btn");
const stopButton = document.getElementById("stop-record-btn");

let shouldStop = false;
let stopped = false;

recordButton.addEventListener("mousedown", (e) => audioRecorder.start(e));
recordButton.addEventListener("mouseup", (e) => audioRecorder.stop(e));

const audioRecorder = {
  recorder: null,
  recordedChunks: [],
  init: async function () {
    audioRecorder.recordedChunks = [];

    try {
      const device = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioRecorder.recorder = new MediaRecorder(device);
      audioRecorder.recorder.onstop = handleStop;
      audioRecorder.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          audioRecorder.recordedChunks.push(e.data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  start: async function (e) {
    try {
      await audioRecorder.init();

      audioRecorder.recorder.start();
    } catch (err) {
      console.log(err);
    }
  },
  stop: function () {
    audioRecorder.recorder.stop();
  },
};

audioRecorder.init();

async function handleStop() {
  const blob = new Blob(audioRecorder.recordedChunks, {
    type: "audio/ogg; codecs=opus",
  });
  const audioURL = window.URL.createObjectURL(blob);

  try {
    let recording = await postAudio(audioURL).then((res) => res.json());
    createAudioEl(recording);
  } catch (err) {
    console.log(err);
  }
}

function createAudioEl(audioURL) {
  let recordingsList = document.getElementById("recordings-list");

  let newRecording = document.createElement("audio");

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
