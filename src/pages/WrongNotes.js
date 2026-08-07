import { setCurrentPage } from "../services/router.js";
import { setQuizQuestions } from "../services/quizService.js";
import {
  getWrongQuestions,
  clearWrongQuestions
} from "../services/wrongNoteService.js";

window.goCOHome = function () {

  setCurrentPage("co");

  location.reload();

};

window.retryWrongQuestions = function () {

  const questions = getWrongQuestions();

  if (questions.length === 0) {

    alert("No wrong questions.");

    return;

  }

  setQuizQuestions(questions);

  setCurrentPage("co-quiz");

  location.reload();

};

window.clearWrongNotes = function () {

  if (!confirm("Delete all wrong questions?")) {

    return;

  }

  clearWrongQuestions();

  location.reload();

};

export function WrongNotes() {

  const wrongQuestions = getWrongQuestions();

  return `

    <main class="content">

      <div style="display:flex;gap:10px;margin-bottom:20px;">

        <button onclick="goCOHome()">
          ← CO
        </button>

        <button onclick="retryWrongQuestions()">
          🔁 Retry Wrong Questions
        </button>

        <button onclick="clearWrongNotes()">
          🗑 Clear All
        </button>

      </div>

      <h2>❌ Wrong Notes</h2>

      <p>Total : ${wrongQuestions.length}</p>

      <hr>

      ${
        wrongQuestions.length === 0
          ? "<p>No wrong questions.</p>"
          : wrongQuestions.map(q => `
              <div class="card">

                <h3>${q.question}</h3>

                <p>Level : ${q.level}</p>

              </div>
            `).join("")
      }

    </main>

  `;

}
