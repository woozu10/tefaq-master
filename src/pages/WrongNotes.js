import {
  getWrongQuestions,
  clearWrongQuestions
} from "../services/wrongNoteService.js";
import { setQuizQuestions } from "../services/quizService.js";
import { setCurrentPage } from "../services/router.js";

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

      <h2>❌ Wrong Notes</h2>

      <p>Total : ${wrongQuestions.length}</p>

      <button onclick="retryWrongQuestions()">
        🔁 Retry Wrong Questions
      </button>

      <button onclick="clearWrongNotes()">
        🗑 Clear All
      </button>

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
