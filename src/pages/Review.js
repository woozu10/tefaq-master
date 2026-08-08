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

window.goReviewQuestion = function (index) {

  current = index;

  resetAudio();

  document.getElementById("app").innerHTML = Review();

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

      <div
        style="
          display:flex;
          flex-wrap:wrap;
          gap:6px;
          justify-content:center;
          margin-bottom:20px;
        "
      >

      ${questions.map((question,index)=>`

        <button

          onclick="goReviewQuestion(${index})"

          style="
            width:36px;
            height:36px;
            border-radius:50%;
            border:none;
            cursor:pointer;
            font-weight:bold;
            color:white;

            background:

            ${
              question.userAnswer === question.answer
                ? "#4CAF50"
                : "#F44336"
            };

          "

        >

          ${index+1}

        </button>

      `).join("")}

      </div>

      ${AudioPlayer(q.transcript)}

      <div class="card">

        <h3>${q.question}</h3>

        <hr>

        <h3>Your Answer</h3>

        <p
          style="
            color:${
              q.userAnswer === q.answer
                ? "#4CAF50"
                : "#F44336"
            };
            font-weight:bold;
          "
        >

          ${
            q.userAnswer === q.answer
              ? "✅"
              : "❌"
          }

          ${
            q.userAnswer >= 0
              ? q.choices[q.userAnswer]
              : "No Answer"
          }

        </p>

        <hr>

        <h3>Correct Answer</h3>

        <p
          style="
            color:#4CAF50;
            font-weight:bold;
          "
        >

          ✅ ${q.choices[q.answer]}

        </p>

        <hr>

        <h3>📖 Explanation</h3>

        <p>

          ${q.explanation || "No explanation."}

        </p>

        ${
          Array.isArray(q.vocabulary) &&
          q.vocabulary.length > 0
            ? `
              <hr>

              <h3>📚 Vocabulary</h3>

              <ul style="text-align:left;">

                ${q.vocabulary
                  .map(word => `<li>${word}</li>`)
                  .join("")}

              </ul>
            `
            : ""
        }

      </div>

      <div
        style="
          display:flex;
          justify-content:center;
          gap:10px;
          margin-top:20px;
          flex-wrap:wrap;
        "
      >

        ${
          current > 0
            ? `
              <button onclick="previousReview()">
                ← Previous
              </button>
            `
            : ""
        }

        ${
          current < questions.length - 1
            ? `
              <button onclick="nextReview()">
                Next →
              </button>
            `
            : ""
        }

        <button
          style="
            background:#4CAF50;
            color:white;
          "
          onclick="finishReview()"
        >
          ✅ Finish Review
        </button>

      </div>

    </main>

  `;

}
