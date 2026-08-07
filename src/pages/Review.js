import {
  getReviewQuestions,
  clearReviewQuestions
} from "../services/reviewService.js";

import { setCurrentPage } from "../services/router.js";

import {
  AudioPlayer,
  resetAudio
} from "../components/AudioPlayer.js";

let current = 0;

window.nextReview = function () {

  if (current < getReviewQuestions().length - 1) {

    current++;

    resetAudio();

    document.getElementById("app").innerHTML = Review();

  }

};

window.previousReview = function () {

  if (current > 0) {

    current--;

    resetAudio();

    document.getElementById("app").innerHTML = Review();

  }

};

window.finishReview = function () {

  clearReviewQuestions();

  current = 0;

  setCurrentPage("co");

  location.reload();

};

export function Review() {

  const questions = getReviewQuestions();

  const q = questions[current];

  if (!q) {

    return `
      <main class="content">

        <h2>No review data.</h2>

      </main>
    `;

  }

  return `

    <main class="content">

      <h2>📖 Review Answers</h2>

      <h3>

        Question ${current + 1} / ${questions.length}

      </h3>

    
      ${AudioPlayer(q.transcript)}

      <div class="card">

        <h3>${q.question}</h3>
        

        <hr>

        <h3>Your Answer</h3>

        <p>

          ${
            q.userAnswer === q.answer
              ? "✅"
              : "❌"
          }

          ${q.choices[q.userAnswer]}

        </p>

        <hr>

        <h3>Correct Answer</h3>

        <p>

          ✅ ${q.choices[q.answer]}

        </p>

        <hr>

        <h3>Explanation</h3>

        <p>

          ${q.explanation || "No explanation."}

        </p>

      </div>

      <button onclick="previousReview()">

        ← Previous

      </button>

      <button onclick="nextReview()">

        Next →

      </button>

      <button onclick="finishReview()">

        Finish

      </button>

    </main>

  `;

}
