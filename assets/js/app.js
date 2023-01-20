const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
var voices = speechSynthesis.getVoices();
function speak(sentence) {
  document.getElementById("interface").src = "assets/img/katrina-2.gif";

  const text_speak = new SpeechSynthesisUtterance(sentence);

  text_speak.rate = 1;
  text_speak.pitch = 1;
  var voices = speechSynthesis.getVoices();
  text_speak.voice = voices[55];
  window.speechSynthesis.speak(text_speak);
  text_speak.addEventListener("end", function () {
    document.getElementById("interface").src = "assets/img/katrina-2.png";
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
  document.getElementById("interface").src = "assets/img/katrina-2.png";
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
  document.getElementById("speak-mic").src = "assets/img/pause-mic.gif";
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  content.innerHTML += contentStyle("You",transcript);
  scrollSmoothToBottom('content-container');
  if (transcript.toLowerCase().includes(magic_word)) {
    stopSpeech();
    speakThis(transcript.toLowerCase().replace(magic_word, ""));

  }
};

function stopSpeech() {
  document.getElementById("speak-mic").src = "assets/img/pause-mic.gif";
  recognition2.stop();
}
// called when we detect sound
function startSpeech() {
  try {
    // calling it twice will throw...
    document.getElementById("speak-mic").src = "assets/img/play-mic.gif";
    recognition2.start();
  } catch (e) {}
}

// request a LocalMediaStream
/*
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

*/

function speakThis(message) {
  const speech = new SpeechSynthesisUtterance();
  var voices = speechSynthesis.getVoices();
  speech.voice = voices[55];
  speech.volume = 1;
  speech.pitch = 1;
  speech.rate = 1;
  speech.text = "I did not understand what you said please try again";

  if (message.includes("how are you")) {
    const finalText = "I am fine boss tell me how can i help you";
    speech.text = finalText;
  } else if (message.includes("whats your name")) {
    const finalText =
      "My name is Katrina. I'm a intelligent virtual assitant 3.0";
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
    message.includes("search google") 
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
  }   else if (message.includes("open calculator")) {
    window.open("Calculator:///");
    const finalText = "Opening Calculator";
    speech.text = finalText;
  } else if (message.includes("search youtube")) {
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
  } else {
      if(message == "")
      {
        const finalText = "Hello boss";
        speech.text = finalText;
      }
      else
      {
        
         

          getChatGPTData(message).then(res => {
            let finalText = res;
            if(finalText == "Error:408" || finalText == "404"){
              window.open(
                `https://www.google.com/search?q=${message.replace(" ", "+")}`,
                "_blank"
              );
              finalText = "I found some information for " + message + " on google";
            }
            speech.text = finalText;
            document.getElementById("interface").src = "assets/img/katrina-2.gif";
            window.speechSynthesis.speak(speech);
            content.innerHTML += contentStyle("Katrina", speech.text);
            scrollSmoothToBottom('content-container');
            speech.addEventListener("end", function () {
              document.getElementById("interface").src = "assets/img/katrina-2.png";
            });
          });

          return;
      }
    
  }


  document.getElementById("interface").src = "assets/img/katrina-2.gif";
  window.speechSynthesis.speak(speech);
  speech.addEventListener("end", function () {
    document.getElementById("interface").src = "assets/img/katrina-2.png";
  });
}

function contentStyle(x, str){
  return '<br/><b style="color: #fff;">'+x+':</b> <i>'+str+'</i>';
}

function scrollSmoothToBottom(id){
  const element = $(`#${id}`);
  element.animate({
     scrollTop: element.prop("scrollHeight")
  }, 500);
}

function askViaText(){
  let message = document.getElementById('askterm').value;
  document.getElementById('askterm').value = "";
  if(message != "" && message.length >0){
    speakThis(message.toLowerCase().trim());
  }
}


document.getElementById('askterm').onkeydown = function(e){
  if(e.keyCode == 13){
    askViaText();
  }
};

//Open.AI ChatGPT Integration 

const getChatGPTData = async (message) => {
  var data = {
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 2048,
    user: "1",
    temperature:  0.5,
    frequency_penalty: 0.0, 
    presence_penalty: 0.0,  
    stop: ["#", ";"] 
  }
  const request = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer ",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)  
  });
  const res = await request.json();
  var returnValue = "";
  if (res.error && res.error.message) {
    returnValue = "Error:408";
  } else if (res.choices && res.choices[0].text) {
     returnValue = res.choices[0].text;
     if (returnValue == "") returnValue = "404";
     return returnValue;
  }       
};
