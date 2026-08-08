import { getRandomTopic } from "../services/eoService.js";
import { correctSpeech } from "../services/eoCorrection.js";
import { saveEOHistory } from "../services/eoHistoryService.js";
import { App } from "../App.js";

/* =========================================
   STATE
========================================= */

let topic =
  getRandomTopic();

let transcript = "";

let recognition = null;

let timer = null;

let prepareTimer = null;

let prepareTime = 30;

let speakingTime = 120;

let isRecording = false;

/* =========================================
   RENDER
========================================= */

function renderEO() {

  const app =
    document.getElementById("app");

  if (app) {

    app.innerHTML =
      EO();

  }

}

/* =========================================
   PREPARE TIMER
========================================= */

function startPrepareTimer() {

  clearInterval(
    prepareTimer
  );

  prepareTime = 30;

  const el =
    document.getElementById(
      "prepareTimer"
    );

  prepareTimer =
    setInterval(() => {

      prepareTime--;

      if (el) {

        el.innerHTML =
          prepareTime;

      }

      if (prepareTime <= 0) {

        clearInterval(
          prepareTimer
        );

        startSpeech();

      }

    },1000);

}

/* =========================================
   SPEAK TIMER
========================================= */

function startSpeechTimer() {

  clearInterval(timer);

  speakingTime = 120;

  const el =
    document.getElementById(
      "speechTimer"
    );

  timer =
    setInterval(() => {

      speakingTime--;

      const min =
        String(
          Math.floor(
            speakingTime/60
          )
        ).padStart(2,"0");

      const sec =
        String(
          speakingTime%60
        ).padStart(2,"0");

      if(el){

        el.innerHTML =
          `${min}:${sec}`;

      }

      if(
        speakingTime<=0
      ){

        stopSpeech();

      }

    },1000);

}

/* =========================================
   SPEECH RECOGNITION
========================================= */

function initRecognition() {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    alert(
      "Speech Recognition is not supported."
    );

    return;

  }

  recognition =
    new SpeechRecognition();

  recognition.lang =
    "fr-CA";

  recognition.continuous =
    true;

  recognition.interimResults =
    true;

  recognition.maxAlternatives =
    1;

  recognition.onstart =
    () => {

      isRecording = true;

      const btn =
        document.getElementById(
          "recordBtn"
        );

      if (btn) {

        btn.innerHTML =
          "🛑 Stop";

      }

    };

  recognition.onresult =
    (event) => {

      transcript = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0].transcript + " ";

      }

      const textarea =
        document.getElementById(
          "transcript"
        );

      if (textarea) {

        textarea.value =
          transcript.trim();

      }

    };

  recognition.onerror =
    (event) => {

      console.error(
        event.error
      );

    };

  recognition.onend =
    () => {

      isRecording = false;

      const btn =
        document.getElementById(
          "recordBtn"
        );

      if (btn) {

        btn.innerHTML =
          "🎤 Start";

      }

      clearInterval(timer);

    };

}

/* =========================================
   START RECORDING
========================================= */

window.startSpeech = function () {

  if (!recognition) {

    initRecognition();

  }

  if (isRecording) {

    stopSpeech();

    return;

  }

  transcript = "";

  const textarea =
    document.getElementById(
      "transcript"
    );

  if (textarea) {

    textarea.value = "";

  }

  recognition.start();

  startSpeechTimer();

};

/* =========================================
   STOP RECORDING
========================================= */

window.stopSpeech = function () {

  if (
    recognition &&
    isRecording
  ) {

    recognition.stop();

  }

  clearInterval(timer);

  isRecording = false;

};

/* =========================================
   NEXT TOPIC
========================================= */

window.nextTopic = function () {

  stopSpeech();

  topic =
    getRandomTopic();

  transcript = "";

  prepareTime = 30;

  speakingTime = 120;

  renderEO();

};

/* =========================================
   RESET
========================================= */

window.resetEO = function () {

  stopSpeech();

  transcript = "";

  prepareTime = 30;

  speakingTime = 120;

  const textarea =
    document.getElementById(
      "transcript"
    );

  if (textarea) {

    textarea.value = "";

  }

};

/* =========================================
   AI CORRECTION
========================================= */

window.evaluateSpeech = async function () {

  stopSpeech();

  const textarea =
    document.getElementById(
      "transcript"
    );

  const text =
    textarea.value.trim();

  if (text === "") {

    alert(
      "Please speak first."
    );

    return;

  }

  const resultBox =
    document.getElementById(
      "eoResult"
    );

  if (resultBox) {

    resultBox.innerHTML =
      "🤖 AI is evaluating...";

  }

  try {

    const result =
      await correctSpeech(
        topic,
        text
      );

    await saveEOHistory(

      topic,

      text,

      result

    );

    if (resultBox) {

      resultBox.innerHTML =
        `<pre style="
            white-space:pre-wrap;
            line-height:1.7;
          ">${result}</pre>`;

    }

  } catch (error) {

    console.error(error);

    if (resultBox) {

      resultBox.innerHTML =
        "❌ AI evaluation failed.";

    }

  }

};

/* =========================================
   HISTORY
========================================= */

window.showEOHistory = function () {

  const history =
    JSON.parse(
      localStorage.getItem(
        "eoHistory"
      ) || "[]"
    );

  console.log(history);

};

/* =========================================
   PAGE
========================================= */

export function EO() {

  setTimeout(() => {

    startPrepareTimer();

  },100);

  return `

  <main class="content">

    <h2>

      🎤 Expression Orale

    </h2>

    <div class="card">

      <h3>

        ${topic.title}

      </h3>

      <p>

        ${topic.instruction}

      </p>

    </div>

    <div class="card">

      <p>

        Preparation

      </p>

      <div

        id="prepareTimer"

        style="

          font-size:32px;

          font-weight:bold;

          color:#2196F3;

        "

      >

        30

      </div>

      <hr>

      <p>

        Speaking

      </p>

      <div

        id="speechTimer"

        style="

          font-size:32px;

          font-weight:bold;

          color:#4CAF50;

        "

      >

        02:00

      </div>

    </div>

    <div class="card">

      <textarea

        id="transcript"

        rows="10"

        style="width:100%;"

        placeholder="Speech Recognition..."

      ></textarea>

    </div>

    <div

      style="

        display:flex;

        gap:10px;

        flex-wrap:wrap;

        margin-top:20px;

      "

    >

      <button

        id="recordBtn"

        onclick="startSpeech()"

      >

        🎤 Start

      </button>

      <button

        onclick="stopSpeech()"

      >

        ⏹ Stop

      </button>

      <button

        onclick="evaluateSpeech()"

      >

        🤖 AI Evaluate

      </button>

      <button

        onclick="nextTopic()"

      >

        🎲 Next Topic

      </button>

      <button

        onclick="resetEO()"

      >

        🔄 Reset

      </button>

    </div>

    <hr>

    <div

      id="eoResult"

      class="card"

    >

      AI Result will appear here.

    </div>

  </main>

  `;

}

/* =========================================
   APP.JS
========================================= */

// import 추가

import { EO } from "./pages/EO.js";


// switch 추가

case "eo":
  return EO();



/* =========================================
   DASHBOARD BUTTON
========================================= */

<button onclick="goPage('eo')">

  🎤 Expression Orale

</button>



/* =========================================
   src/services/eoService.js
========================================= */

const topics = [

  {

    title:
      "Votre ville",

    instruction:
      "Présentez votre ville et expliquez pourquoi vous l'aimez."

  },

  {

    title:
      "Le travail",

    instruction:
      "Parlez de votre emploi idéal."

  },

  {

    title:
      "Les vacances",

    instruction:
      "Décrivez vos dernières vacances."

  },

  {

    title:
      "Les études",

    instruction:
      "Parlez de vos études et de vos projets."

  },

  {

    title:
      "Les transports",

    instruction:
      "Quels moyens de transport utilisez-vous ?"

  },

  {

    title:
      "Votre famille",

    instruction:
      "Parlez de votre famille."

  },

  {

    title:
      "Votre logement",

    instruction:
      "Décrivez votre logement."

  },

  {

    title:
      "Vos loisirs",

    instruction:
      "Quels sont vos loisirs préférés ?"

  },

  {

    title:
      "Le sport",

    instruction:
      "Parlez d'un sport que vous aimez."

  },

  {

    title:
      "La cuisine",

    instruction:
      "Quel plat aimez-vous préparer ?"

  }

];

export function getRandomTopic() {

  return topics[
    Math.floor(
      Math.random() *
      topics.length
    )
  ];

}



/* =========================================
   ROUTER
========================================= */

// currentPage

"eo"


// goPage()

window.goPage = function(page){

  localStorage.setItem(
    "currentPage",
    page
  );

  document.getElementById(
    "app"
  ).innerHTML =
    App();

};



/* =========================================
   FINISHED
========================================= */

/*

EO V1

✅ Random Topic

✅ Prepare Timer

✅ Speaking Timer

✅ Speech Recognition

✅ AI Evaluation

✅ History Save

*/
