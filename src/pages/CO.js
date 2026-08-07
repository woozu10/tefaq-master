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
   LOAD JSON QUESTION BANK
========================================================= */

async function loadQuestionBank() {

  if (loaded || loading) {
    return;
  }

  loading = true;
  loadError = "";

  try {

    const data = await loadQuestions("B2");

    if (!Array.isArray(data)) {
      throw new Error("B2.json must contain a JSON array.");
    }

    if (data.length === 0) {
      throw new Error("B2.json contains no questions.");
    }

    questionBank = data;

    loaded = true;

  } catch (error) {

    console.error("CO question loading error:", error);

    loadError =
      error?.message ||
      "Unable to load B2 questions.";

  } finally {

    loading = false;

    const app = document.getElementById("app");

    if (app) {
      app.innerHTML = App();
    }

  }

}


/* =========================================================
   CREATE EXAM
========================================================= */

function createCOExam() {

  /*
   * First priority:
   * custom quiz created from Favorites / Wrong Notes etc.
   */

  const customQuiz = getQuizQuestions();

  if (
    Array.isArray(customQuiz) &&
    customQuiz.length > 0
  ) {

    examQuestions = customQuiz.map(question =>
      shuffleChoices(question)
    );

    clearQuizQuestions();

    return;
  }


  /*
   * Normal CO exam
   */

  const category = getCategory();

  let questions = [...questionBank];


  /*
   * Category filtering
   */

  if (
    category &&
    category !== "ALL"
  ) {

    questions = questions.filter(
      question =>
        question.category === category
    );

  }


  /*
   * If selected category has no questions,
   * use all questions instead.
   */

  if (questions.length === 0) {

    console.warn(
      `No questions found for category: ${category}. Using ALL.`
    );

    questions = [...questionBank];

  }


  /*
   * Random 40 questions.
   *
   * createExamQuestions already handles
   * banks smaller than requested count.
   */

  examQuestions =
    createExamQuestions(questions, 40)
      .map(question =>
        shuffleChoices(question)
      );

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

  /*
   * JSON not loaded yet
   */

  if (!loaded) {

    if (!loading && !loadError) {

      loadQuestionBank();

    }


    if (loadError) {

      return `
        <main class="content">

          <h2>Compréhension Orale</h2>

          <div class="card">

            <h3>❌ Question Loading Error</h3>

            <p>
              ${loadError}
            </p>

            <br>

            <p>
              Check:
              <strong>public/data/co/B2.json</strong>
            </p>

            <br>

            <button onclick="retryCOLoad()">
              Retry
            </button>

          </div>

        </main>
      `;

    }


    return `
      <main class="content">

        <h2>Compréhension Orale</h2>

        <div class="card">

          <h3>Loading Questions...</h3>

          <p>
            B2 question bank is loading.
          </p>

        </div>

      </main>
    `;

  }


  /*
   * Create exam only once
   */

  if (examQuestions.length === 0) {

    createCOExam();

  }


  /*
   * Safety check
   */

  if (examQuestions.length === 0) {

    return `
      <main class="content">

        <h2>Compréhension Orale</h2>

        <div class="card">

          <h3>No Questions</h3>

          <p>
            No CO questions are available.
          </p>

        </div>

      </main>
    `;

  }


  const q = examQuestions[currentQuestion];

  const mode = getMode();


  /* =======================================================
     ANSWER BUTTON
  ======================================================= */

  const renderButton = (index) => {

    let style = "";

    if (
      answered &&
      mode === "practice"
    ) {

      if (index === q.answer) {

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


  /* =======================================================
     PAGE HTML
  ======================================================= */

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


  selectedAnswer = index;

  q.userAnswer = index;


  if (index === q.answer) {

    score++;

    removeWrongQuestion(q.id);


    if (mode === "practice") {

      message = "✅ Correct!";

    }

  } else {

    saveWrongQuestion(q);


    if (mode === "practice") {

      message = "❌ Incorrect!";

    }

  }


  answered = true;


  const app =
    document.getElementById("app");

  if (app) {

    app.innerHTML = App();

  }

};


/* =========================================================
   NEXT QUESTION
========================================================= */

window.nextQuestion = function() {

  currentQuestion++;


  /*
   * Exam completed
   */

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


    resetAudio();

    resetExamState();


    location.reload();

    return;

  }


  /*
   * Next question
   */

  answered = false;

  selectedAnswer = -1;

  message = "";


  resetAudio();


  const app =
    document.getElementById("app");

  if (app) {

    app.innerHTML = App();

  }

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


  const app =
    document.getElementById("app");

  if (app) {

    app.innerHTML = App();

  }

};


/* =========================================================
   RETRY JSON LOAD
========================================================= */

window.retryCOLoad = function() {

  loadError = "";

  loaded = false;

  loading = false;

  questionBank = [];


  loadQuestionBank();

};
