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
import { coQuestions } from "../data/coQuestions.js";
import { createExamQuestions } from "../services/examService.js";
import { shuffleChoices } from "../services/shuffleService.js";

let examQuestions = [];

let currentQuestion = 0;
let score = 0;
let message = "";
let answered = false;
let selectedAnswer = -1;

export function CO() {

  if (examQuestions.length === 0) {

    const customQuiz = getQuizQuestions();

    if (customQuiz.length > 0) {

      examQuestions = customQuiz.map(question =>
        shuffleChoices(question)
      );

      clearQuizQuestions();

    } else {

      examQuestions =
        createExamQuestions(coQuestions, 20)
          .map(question => shuffleChoices(question));

    }

  }

  const q = examQuestions[currentQuestion];
  const mode = getMode();

  const renderButton = (index) => {

    let style = "";

    if (answered && mode === "practice") {

      if (index === q.answer) {
        style = "background:#4CAF50;color:white;";
      } else if (index === selectedAnswer) {
        style = "background:#F44336;color:white;";
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

      <h2>Compréhension Orale</h2>

      <h3>
        Question ${currentQuestion + 1} / ${examQuestions.length}
      </h3>

      ${Timer(40)}

      ${ProgressBar(currentQuestion + 1, examQuestions.length)}

      ${
        mode === "practice"
          ? `<p><strong>Score : ${score}</strong></p>`
          : ""
      }

      ${AudioPlayer(q.audio)}

      ${QuestionCard(
        q.question,
        q.choices,
        renderButton
      )}

      <p style="font-size:20px;font-weight:bold;">
        ${message}
      </p>

      ${
        answered && mode === "practice"
          ? `
          <div class="card">
            <h3>📖 Explanation</h3>
            <p>${q.explanation || "No explanation available."}</p>
          </div>
          `
          : ""
      }

      <hr>

      <button onclick="favoriteQuestion()">
        ⭐ Favorite
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

window.checkAnswer = function(index) {

  if (answered) return;

  const q = examQuestions[currentQuestion];
  const mode = getMode();

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

  document.getElementById("app").innerHTML = App();

};

window.nextQuestion = function() {

  currentQuestion++;

  if (currentQuestion >= examQuestions.length) {

    setReviewQuestions(examQuestions);

    localStorage.setItem(
      "lastExamQuestions",
      JSON.stringify(examQuestions)
    );

    saveResult(score, examQuestions.length);

    localStorage.setItem("score", score);
    localStorage.setItem("total", examQuestions.length);
    localStorage.setItem("currentPage", "result");
    localStorage.removeItem("coTimerEnd");

    examQuestions = [];

    currentQuestion = 0;
    score = 0;
    answered = false;
    selectedAnswer = -1;
    message = "";

    location.reload();

    return;

  }

  answered = false;
  selectedAnswer = -1;
  message = "";

  resetAudio();

  document.getElementById("app").innerHTML = App();

};

window.favoriteQuestion = function () {

  const q = examQuestions[currentQuestion];

  addFavorite(q);

  document.getElementById("app").innerHTML = App();

};
