let button = document.getElementById("record-btn");

button.addEventListener("click", (event) => record(event));

async function record(e) {
  e.preventDefault();

  try {
    //create stream
    const device = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    //pass stream to new recorder instance
    const recorder = new MediaRecorder(device);

    //array to save blobs generated from recording
    const recordedChunks = [];

    recorder.onstop = function (e) {
      const audio = document.createElement("audio");
      audio.controls = true;
      const blob = new Blob(recordedChunks, { type: "audio/ogg; codecs=opus" });
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;

      document.getElementById("recordings-container").appendChild(audio);
    };

    recorder.addEventListener("dataavailable", (e) => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    });

    console.log(recorder);

    recorder.start();
    setTimeout(() => console.log(recordedChunks), 3000);
    setTimeout(() => console.log(recordedChunks), 4000);

    setTimeout(() => recorder.stop(), 5000);
  } catch (err) {
    //TODO: account for race condition
  }
}
