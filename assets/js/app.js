const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
var voices = speechSynthesis.getVoices();
function speak(sentence) {
  document.getElementById("interface").src = "assets/img/katrina.gif";

  const text_speak = new SpeechSynthesisUtterance(sentence);

  text_speak.rate = 1;
  text_speak.pitch = 1;
  var voices = speechSynthesis.getVoices();
  text_speak.voice = voices[3];
  window.speechSynthesis.speak(text_speak);
  text_speak.addEventListener("end", function () {
    document.getElementById("interface").src = "assets/img/katrina.png";
  });
}

function wishMe() {
  var day = new Date();
  var hr = day.getHours();

  if (hr >= 0 && hr < 12) {
    speak("Good Morning Boss");
  } else if (hr == 12) {
    speak("Good noon Boss");
  } else if (hr > 12 && hr <= 17) {
    speak("Good Afternoon Boss");
  } else {
    speak("Good Evening Boss");
  }
}

window.addEventListener("load", () => {
  speak("Activating Katrina");
  speak("Going online");
  wishMe();
  document.getElementById("interface").src = "assets/img/katrina.png";
});

const magic_word = "katrina";
var mediaStream = null;

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition2 = new SpeechRecognition();
recognition2.interimResults = false;
recognition2.maxAlternatives = 1;
recognition2.continuous = true;

recognition2.onresult = (event) => {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  content.textContent = transcript.replace("Katrina", "");
  if (transcript.toLowerCase().includes(magic_word)) {
    
    speakThis(transcript.toLowerCase().replace(magic_word, ""));

  }
};

// called when we detect silence
function stopSpeech() {
  recognition2.stop();
}
// called when we detect sound
function startSpeech() {
  try {
    // calling it twice will throw...
    recognition2.start();
  } catch (e) {}
}

// request a LocalMediaStream
navigator.mediaDevices
  .getUserMedia({ audio: true })
  // add our listeners
  .then((stream) => detectSilence(stream, stopSpeech, startSpeech))
  .catch((e) => log(e.message));

function detectSilence(
  stream,
  onSoundEnd = (_) => {},
  onSoundStart = (_) => {},
  silence_delay = 500,
  min_decibels = -80
) {
  mediaStream = stream;
  const ctx = new AudioContext();
  const analyser = ctx.createAnalyser();
  const streamNode = ctx.createMediaStreamSource(stream);
  streamNode.connect(analyser);
  analyser.minDecibels = min_decibels;

  const data = new Uint8Array(analyser.frequencyBinCount); // will hold our data
  let silence_start = performance.now();
  let triggered = false; // trigger only once per silence event

  function loop(time) {
    requestAnimationFrame(loop); // we'll loop every 60th of a second to check
    analyser.getByteFrequencyData(data); // get current data
    if (data.some((v) => v)) {
      // if there is data above the given db limit
      if (triggered) {
        triggered = false;
        onSoundStart();
      }
      silence_start = time; // set it to now
    }
    if (!triggered && time - silence_start > silence_delay) {
      onSoundEnd();
      triggered = true;
    }
  }
  loop();
}



function speakThis(message) {
  document.getElementById("interface").src = "assets/img/katrina.gif";
  const speech = new SpeechSynthesisUtterance();
  var voices = speechSynthesis.getVoices();
  speech.voice = voices[3];
  speech.text = "I did not understand what you said please try again";

  if (message.includes("how are you")) {
    const finalText = "I am fine boss tell me how can i help you";
    speech.text = finalText;
  } else if (message.includes("name") || message.includes("whats your name")) {
    const finalText =
      "My name is Katrina. I'm a intelligent virtual assitant 1.0";
    speech.text = finalText;
  } else if (message.includes("open google")) {
    window.open("https://google.com", "_blank");
    const finalText = "Opening Google";
    speech.text = finalText;
  } else if (message.includes("open instagram")) {
    window.open("https://instagram.com", "_blank");
    const finalText = "Opening instagram";
    speech.text = finalText;
  } else if (
    message.includes("what is") ||
    message.includes("who is") ||
    message.includes("what are")
  ) {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText = "This is what i found on internet regarding " + message;
    speech.text = finalText;
  } else if (message.includes("wikipedia")) {
    window.open(
      `https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`,
      "_blank"
    );
    const finalText = "This is what i found on wikipedia regarding " + message;
    speech.text = finalText;
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    const finalText = time;
    speech.text = finalText;
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    const finalText = date;
    speech.text = finalText;
  } else if (message.includes("calculator")) {
    window.open("Calculator:///");
    const finalText = "Opening Calculator";
    speech.text = finalText;
  } else if (message.includes("youtube")) {
    window.open(
      `https://www.youtube.com/results?search_query=${message.replace(
        "youtube",
        ""
      )}`,
      "_blank"
    );
    const finalText =
      "This is what i found on youtube regarding " +
      message.replace("youtube", "");
    speech.text = finalText;
  } else if (message.includes("search library for")) {
    window.open(
      `http://la.okcl.org/#/mindmap/${message.replace(
        "search library for",
        ""
      )}`,
      "_blank"
    );
    const finalText =
      "This is what i found on OKCL Learning Assitant regarding " +
      message.replace("search la for", "");
    speech.text = finalText;
  } else if (
    message.includes("call amresh") ||
    message.includes("call amaresh")
  ) {
    window.open("tel:+916294915441", "_blank");
    const finalText = "Calling " + message.split(" ")[1];
    speech.text = finalText;
  } else if (
    message.includes("call jayesh sir") ||
    message.includes("call jayesh")
  ) {
    window.open("tel:+917735746580", "_blank");
    const finalText = "Calling " + message.split(" ")[1];
    speech.text = finalText;
  } else {
      if(message == "")
      {
        const finalText = "Hello boss";
        speech.text = finalText;
      }
      else
      {
        window.open(
            `https://www.google.com/search?q=${message.replace(" ", "+")}`,
            "_blank"
          );
          const finalText = "I found some information for " + message + " on google";
          speech.text = finalText;
      }
    
  }

  speech.volume = 1;
  speech.pitch = 1;
  speech.rate = 1;

  window.speechSynthesis.speak(speech);
  speech.addEventListener("end", function () {
    document.getElementById("interface").src = "assets/img/katrina.png";
  });
}
