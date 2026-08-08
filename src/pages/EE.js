import { getRandomTopic } from "../services/eeService.js";

let draft =
  localStorage.getItem("eeDraft") || "";

let topic =
  getRandomTopic();

let timer = null;

let timeLeft = 30 * 60;

/* =========================================
   TIMER
========================================= */

function startTimer() {

  if (timer) {
    clearInterval(timer);
  }

  timer = setInterval(() => {

    if (timeLeft <= 0) {

      clearInterval(timer);

      autoSave();

      alert("Time is over!");

      return;

    }

    timeLeft--;

    const min =
      String(Math.floor(timeLeft / 60)).padStart(2, "0");

    const sec =
      String(timeLeft % 60).padStart(2, "0");

    const el =
      document.getElementById("timer");

    if (el) {
      el.innerHTML = `${min}:${sec}`;
    }

  }, 1000);

}

/* =========================================
   WORD / CHARACTER COUNTER
========================================= */

function updateCounter() {

  const text =
    document.getElementById("essay").value;

  const words =
    text.trim() === ""
      ? 0
      : text.trim().split(/\s+/).length;

  const chars =
    text.length;

  document.getElementById("wordCount").innerHTML =
    words;

  document.getElementById("charCount").innerHTML =
    chars;

  const status =
    document.getElementById("wordStatus");

  if (!status) return;

  if (words < 150) {

    status.innerHTML =
      "🔴 Too short";

    status.style.color =
      "#F44336";

  } else if (words <= 200) {

    status.innerHTML =
      "🟢 Perfect";

    status.style.color =
      "#4CAF50";

  } else {

    status.innerHTML =
      "🟠 Too long";

    status.style.color =
      "#FF9800";

  }

}
/* =========================================
   AUTO SAVE
========================================= */

window.autoSave = function () {

  const text =
    document.getElementById("essay").value;

  localStorage.setItem(
    "eeDraft",
    text
  );

};

/* =========================================
   SAVE
========================================= */

window.saveDraft = function () {

  autoSave();

  alert("Draft saved.");

};

/* =========================================
   CLEAR
========================================= */

window.clearEssay = function () {

  if (!confirm("Delete draft?")) {

    return;

  }

  localStorage.removeItem(
    "eeDraft"
  );

  location.reload();

};

/* =========================================
   SUBMIT
========================================= */

window.submitEssay = function () {

  autoSave();

  localStorage.setItem(
    "eeAnswer",
    document.getElementById("essay").value
  );

  localStorage.setItem(
    "eeTopic",
    JSON.stringify(topic)
  );

  localStorage.setItem(
    "currentPage",
    "ee-result"
  );

  location.reload();

};

/* =========================================
   NEXT TOPIC
========================================= */

window.nextTopic = function () {

  topic =
    getRandomTopic();

  draft = "";

  timeLeft =
    30 * 60;

  localStorage.removeItem(
    "eeDraft"
  );

  renderEE();

};

/* =========================================
   RENDER
========================================= */

function renderEE() {

  const app =
    document.getElementById("app");

  if (app) {

    app.innerHTML =
      EE();

  }

}
/* =========================================
   PAGE
========================================= */

export function EE() {

  setTimeout(() => {

    updateCounter();

    startTimer();

  }, 100);

  return `

    <main class="content">

      <h2>

        📝 Expression Écrite

      </h2>

      <div class="card">

        <div

          id="timer"

          style="

            font-size:34px;

            font-weight:bold;

            color:#1976D2;

            text-align:center;

            margin-bottom:20px;

          "

        >

          30:00

        </div>

        <h3>

          ${topic.title}

        </h3>

        <p>

          ${topic.instruction}

        </p>

        <button onclick="nextTopic()">

          🎲 Next Topic

        </button>

      </div>

      <div class="card">

        <textarea

          id="essay"

          rows="18"

          style="width:100%;"

          oninput="updateCounter(); autoSave();"

        >${draft}</textarea>

        <hr>

        <p>

          Words :
          <b id="wordCount">0</b>

          &nbsp;&nbsp;

          Characters :
          <b id="charCount">0</b>

        </p>

        <p>

          Target :
          <b>

            150 ~ 200 words

          </b>

        </p>

        <p>

          Status :

          <b id="wordStatus">

            🔴 Too short

          </b>

        </p>

        <br>
                <button onclick="saveDraft()">

          💾 Save Draft

        </button>

        &nbsp;

        <button onclick="clearEssay()">

          🗑 Clear

        </button>

        &nbsp;

        <button

          onclick="submitEssay()"

          style="
            background:#4CAF50;
            color:white;
            font-weight:bold;
          "

        >

          ✅ Submit

        </button>

      </div>

    </main>

  `;

}
