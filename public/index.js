const recordButton = document.getElementById("record-btn");
const stopButton = document.getElementById("stop-record-btn");

let shouldStop = false;
let stopped = false;

recordButton.addEventListener("mousedown", (e) => audioRecorder.start(e));
recordButton.addEventListener("mouseup", (e) => audioRecorder.stop(e));

const audioRecorder = {
  // stream: null,
  recorder: null,
  recordedChunks: [],
  init: function () {
    audioRecorder.recorder = null;
    audioRecorder.recordedChunks = [];
  },
  start: async function (e) {
    try {
      const device = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      audioRecorder.recorder = new MediaRecorder(device);
      audioRecorder.recorder.onstop = async function (e) {
        const blob = new Blob(audioRecorder.recordedChunks, {
          type: "audio/ogg; codecs=opus",
        });
        const audioURL = window.URL.createObjectURL(blob);

        let recording = await postAudio(audioURL).then((res) => res.json());
        createAudioEl(recording);
      };
      audioRecorder.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          audioRecorder.recordedChunks.push(e.data);
        }
      });

      audioRecorder.recorder.start();
    } catch (err) {
      console.log(err);
    }
  },
  stop: async function (e) {
    e.preventDefault();

    audioRecorder.recorder.stop();

    audioRecorder.init();
  },
};

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

function getAudioURLs() {
  return (
    fetch("http://localhost:3000/audio")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("Failed to get audio URLs");
        }
      })
      // .then((data) => console.log(data))
      .catch((err) => console.log("get error", err))
  );
}
