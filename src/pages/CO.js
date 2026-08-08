import {
  getQuestionCount
} from "../services/settingsService.js";
import { QuestionPalette } from "../components/QuestionPalette.js";
import {
  getCategory
} from "../services/categoryService.js";

import {
  saveWrongQuestion,
  removeWrongQuestion
} from "../services/wrongNoteService.js";

import {
  addFavorite,
  isFavorite
} from "../services/favoriteService.js";

import { getMode } from "../services/modeService.js";

import { saveResult } from "../services/statisticsService.js";

import {
  getQuizQuestions,
  clearQuizQuestions
} from "../services/quizService.js";

import { setReviewQuestions } from "../services/reviewService.js";

import { App } from "../App.js";

import { Timer } from "../components/Timer.js";

import { ProgressBar } from "../components/ProgressBar.js";

import {
  AudioPlayer,
  resetAudio
} from "../components/AudioPlayer.js";

import { QuestionCard } from "../components/QuestionCard.js";

import { loadQuestions } from "../services/loadQuestions.js";

import { createExamQuestions } from "../services/examService.js";

import { shuffleChoices } from "../services/shuffleService.js";


/* =========================================================
   CO STATE
========================================================= */

let questionBank = [];

let examQuestions = [];

let currentQuestion = 0;

let score = 0;

let message = "";

let answered = false;

let selectedAnswer = -1;


/* =========================================================
   JSON LOADING STATE
========================================================= */

let loaded = false;

let loading = false;

let loadError = "";


/* =========================================================
   SAVE EXAM PROGRESS
========================================================= */

function saveExamProgress() {

  if (!Array.isArray(examQuestions) || examQuestions.length === 0) {
    return;
  }

  localStorage.setItem(
    "coSavedExamQuestions",
    JSON.stringify(examQuestions)
  );

  localStorage.setItem(
    "coSavedCurrentQuestion",
    String(currentQuestion)
  );

  localStorage.setItem(
    "coSavedScore",
    String(score)
  );

  localStorage.setItem(
    "coSavedAnswered",
    String(answered)
  );

  localStorage.setItem(
    "coSavedSelectedAnswer",
    String(selectedAnswer)
  );

  localStorage.setItem(
    "coSavedMessage",
    message
  );

}


/* =========================================================
   LOAD SAVED EXAM PROGRESS
========================================================= */

function restoreExamProgress() {

  const savedQuestions =
    localStorage.getItem("coSavedExamQuestions");

  if (!savedQuestions) {
    return false;
  }

  try {

    const parsed =
      JSON.parse(savedQuestions);

    if (
      !Array.isArray(parsed) ||
      parsed.length === 0
    ) {
      return false;
    }

    examQuestions = parsed;

    currentQuestion =
      Number(
        localStorage.getItem(
          "coSavedCurrentQuestion"
        ) || 0
      );

    score =
      Number(
        localStorage.getItem(
          "coSavedScore"
        ) || 0
      );

    answered =
      localStorage.getItem(
        "coSavedAnswered"
      ) === "true";

    selectedAnswer =
      Number(
        localStorage.getItem(
          "coSavedSelectedAnswer"
        ) || -1
      );

    message =
      localStorage.getItem(
        "coSavedMessage"
      ) || "";

    if (
      currentQuestion < 0 ||
      currentQuestion >= examQuestions.length
    ) {
      currentQuestion = 0;
    }

    return true;

  } catch (error) {

    console.error(
      "Cannot restore saved CO exam:",
      error
    );

    clearSavedExam();

    return false;

  }

}


/* =========================================================
   CLEAR SAVED EXAM
========================================================= */

function clearSavedExam() {

  localStorage.removeItem(
    "coSavedExamQuestions"
  );

  localStorage.removeItem(
    "coSavedCurrentQuestion"
  );

  localStorage.removeItem(
    "coSavedScore"
  );

  localStorage.removeItem(
    "coSavedAnswered"
  );

  localStorage.removeItem(
    "coSavedSelectedAnswer"
  );

  localStorage.removeItem(
    "coSavedMessage"
  );

}


/* =========================================================
   LOAD JSON QUESTION BANK
========================================================= */

async function loadQuestionBank() {

  if (loaded || loading) {
    return;
  }

  loading = true;
  loadError = "";
const data = await loadQuestions("co", "B2");
  
      throw new Error(
        "B2.json must contain a JSON array."
      );
    }

    if (data.length === 0) {
      throw new Error(
        "B2.json contains no questions."
      );
    }

    questionBank = data;

    loaded = true;

  } catch (error) {

    console.error(
      "CO question loading error:",
      error
    );

    loadError =
      error?.message ||
      "Unable to load B2 questions.";

  } finally {

    loading = false;

    const app =
      document.getElementById("app");

    if (app) {
      app.innerHTML = App();
    }

  }

}


/* =========================================================
   CREATE EXAM
========================================================= */

function createCOExam() {

  const customQuiz =
    getQuizQuestions();

  if (
    Array.isArray(customQuiz) &&
    customQuiz.length > 0
  ) {

    examQuestions =
      customQuiz.map(question =>
        shuffleChoices(question)
      );

    clearQuizQuestions();

    currentQuestion = 0;
    score = 0;
    message = "";
    answered = false;
    selectedAnswer = -1;

    saveExamProgress();

    return;
  }


  const category =
    getCategory();

  let questions =
    [...questionBank];


  if (
    category &&
    category !== "ALL"
  ) {

    questions =
      questions.filter(
        question =>
          question.category === category
      );

  }


  if (questions.length === 0) {

    console.warn(
      `No questions found for category: ${category}. Using ALL.`
    );

    questions =
      [...questionBank];

  }


  examQuestions =
   createExamQuestions(
    questions,
    getQuestionCount()
).map(question =>
      shuffleChoices(question)
    );


  currentQuestion = 0;
  score = 0;
  message = "";
  answered = false;
  selectedAnswer = -1;

  saveExamProgress();

}


/* =========================================================
   RESET CURRENT EXAM
========================================================= */

function resetExamState() {

  examQuestions = [];

  currentQuestion = 0;

  score = 0;

  message = "";

  answered = false;

  selectedAnswer = -1;

}


/* =========================================================
   CO PAGE
========================================================= */

export function CO() {

  if (!loaded) {

    if (
      !loading &&
      !loadError
    ) {

      loadQuestionBank();

    }


    if (loadError) {

      return `
        <main class="content">

          <h2>
            Compréhension Orale
          </h2>

          <div class="card">

            <h3>
              ❌ Question Loading Error
            </h3>

            <p>
              ${loadError}
            </p>

            <br>

            <p>
              Check:
              <strong>
                public/data/co/B2.json
              </strong>
            </p>

            <br>

            <button
              onclick="retryCOLoad()"
            >
              Retry
            </button>

          </div>

        </main>
      `;

    }


    return `
      <main class="content">

        <h2>
          Compréhension Orale
        </h2>

        <div class="card">

          <h3>
            Loading Questions...
          </h3>

          <p>
            B2 question bank is loading.
          </p>

        </div>

      </main>
    `;

  }


  if (
    examQuestions.length === 0
  ) {

    const restored =
      restoreExamProgress();

    if (!restored) {

      createCOExam();

    }

  }


  if (
    examQuestions.length === 0
  ) {

    return `
      <main class="content">

        <h2>
          Compréhension Orale
        </h2>

        <div class="card">

          <h3>
            No Questions
          </h3>

          <p>
            No CO questions are available.
          </p>

        </div>

      </main>
    `;

  }


  const q =
    examQuestions[currentQuestion];

  const mode =
    getMode();


  const renderButton = (index) => {

    let style = "";

    if (
      answered &&
      mode === "practice"
    ) {

      if (
        index === q.answer
      ) {

        style =
          "background:#4CAF50;color:white;";

      } else if (
        index === selectedAnswer
      ) {

        style =
          "background:#F44336;color:white;";

      }

    }


    return `
      <button
        style="${style}"
        onclick="checkAnswer(${index})"
        ${answered ? "disabled" : ""}
      >
        ${q.choices[index]}
      </button>
    `;

  };


  return `
    <main class="content">

      <h2>
        Compréhension Orale
      </h2>


      <h3>
        Question
        ${currentQuestion + 1}
        /
        ${examQuestions.length}
      </h3>
${QuestionPalette(
    examQuestions,
    currentQuestion
)}

      ${Timer(40)}


      ${ProgressBar(
        currentQuestion + 1,
        examQuestions.length
      )}


      ${
        mode === "practice"
          ? `
            <p>
              <strong>
                Score : ${score}
              </strong>
            </p>
          `
          : ""
      }


      <div
        style="
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          margin-bottom:15px;
        "
      >

        <button
          onclick="pauseCOExam()"
        >
          ⏸ Pause
        </button>

        <button
          onclick="startNewCOExam()"
        >
          🔄 New Exam
        </button>

      </div>


      ${AudioPlayer(
        q.transcript || ""
      )}


      ${QuestionCard(
        q.question,
        q.choices,
        renderButton
      )}


      <p
        style="
          font-size:20px;
          font-weight:bold;
        "
      >
        ${message}
      </p>


      ${
        answered &&
        mode === "practice"
          ? `
            <div class="card">

              <h3>
                📖 Explanation
              </h3>

              <p>
                ${
                  q.explanation ||
                  "No explanation available."
                }
              </p>

              ${
                Array.isArray(q.vocabulary) &&
                q.vocabulary.length > 0
                  ? `
                    <hr>

                    <h4>
                      Vocabulary
                    </h4>

                    <p>
                      ${q.vocabulary.join(" · ")}
                    </p>
                  `
                  : ""
              }

            </div>
          `
          : ""
      }


      <hr>


      <button
        onclick="favoriteQuestion()"
      >

        ${
          isFavorite(q.id)
            ? "⭐ Added"
            : "☆ Favorite"
        }

      </button>


      <button
        onclick="nextQuestion()"
        ${answered ? "" : "disabled"}
      >
        Next →
      </button>

    </main>
  `;

}


/* =========================================================
   CHECK ANSWER
========================================================= */

window.checkAnswer = function(index) {

  if (answered) {
    return;
  }


  const q =
    examQuestions[currentQuestion];

  const mode =
    getMode();


  selectedAnswer =
    index;

  q.userAnswer =
    index;


  if (
    index === q.answer
  ) {

    score++;

    removeWrongQuestion(
      q.id
    );


    if (
      mode === "practice"
    ) {

      message =
        "✅ Correct!";

    }

  } else {

    saveWrongQuestion(
      q
    );


    if (
      mode === "practice"
    ) {

      message =
        "❌ Incorrect!";

    }

  }


  answered = true;

  saveExamProgress();


  const app =
    document.getElementById("app");

  if (app) {

    app.innerHTML =
      App();

  }

};


/* =========================================================
   NEXT QUESTION
========================================================= */

window.nextQuestion = function() {

  currentQuestion++;


  if (
    currentQuestion >=
    examQuestions.length
  ) {

    setReviewQuestions(
      examQuestions
    );


    localStorage.setItem(
      "lastExamQuestions",
      JSON.stringify(
        examQuestions
      )
    );


    saveResult(
      score,
      examQuestions.length
    );


    localStorage.setItem(
      "score",
      score
    );


    localStorage.setItem(
      "total",
      examQuestions.length
    );


    localStorage.setItem(
      "currentPage",
      "result"
    );


    localStorage.removeItem(
      "coTimerEnd"
    );


    clearSavedExam();

    resetAudio();

    resetExamState();

    location.reload();

    return;

  }


  answered =
    false;

  selectedAnswer =
    -1;

  message =
    "";


  resetAudio();

  saveExamProgress();


  const app =
    document.getElementById("app");

  if (app) {

    app.innerHTML =
      App();

  }

};


/* =========================================================
   PAUSE EXAM
========================================================= */

window.pauseCOExam = function() {

  saveExamProgress();

  resetAudio();

  localStorage.setItem(
    "currentPage",
    "co"
  );

  alert(
    `Progress saved.\n\nYou can continue later from Question ${currentQuestion + 1}.`
  );

};


/* =========================================================
   START NEW EXAM
========================================================= */

window.startNewCOExam = function() {

  const confirmed =
    confirm(
      "Start a new exam?\n\nCurrent progress will be deleted."
    );

  if (!confirmed) {
    return;
  }


  clearSavedExam();

  localStorage.removeItem(
    "coTimerEnd"
  );

  resetAudio();

  resetExamState();

  document.getElementById(
    "app"
  ).innerHTML =
    App();

};


/* =========================================================
   FAVORITE
========================================================= */

window.favoriteQuestion = function() {

  const q =
    examQuestions[currentQuestion];


  if (!q) {
    return;
  }


  addFavorite(q);

  saveExamProgress();


  const app =
    document.getElementById("app");

  if (app) {

    app.innerHTML =
      App();

  }

};


/* =========================================================
   RETRY JSON LOAD
========================================================= */

window.retryCOLoad = function() {

  loadError =
    "";

  loaded =
    false;

  loading =
    false;

  questionBank =
    [];


  loadQuestionBank();

};
window.goQuestion=function(index){

    currentQuestion=index;

    resetAudio();

    document.getElementById("app").innerHTML=App();

};
