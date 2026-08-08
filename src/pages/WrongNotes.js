import { setCurrentPage } from "../services/router.js";
import {
  getWrongQuestions,
  clearWrongQuestions
} from "../services/wrongNoteService.js";
import { setQuizQuestions } from "../services/quizService.js";

window.goCOHome = function () {

  setCurrentPage("co");

  location.reload();

};

window.retryWrongNotes = function () {

  const questions = getWrongQuestions();

  if (questions.length === 0) {

    alert("No wrong questions.");

    return;

  }

  setQuizQuestions(questions);

  setCurrentPage("co-quiz");

  location.reload();

};

window.clearAllWrongNotes = function () {

  if (!confirm("Delete all wrong questions?")) {

    return;

  }

  clearWrongQuestions();

  location.reload();

};

export function WrongNotes() {

  const wrongs = getWrongQuestions();

  return `

    <main class="content">

      <h2>❌ Wrong Notes</h2>

      <div class="card">

        <h3>Total Wrong Questions</h3>

        <h1>${wrongs.length}</h1>

      </div>

      <div
      style="
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      justify-content:center;
      margin-bottom:20px;
      ">

        <button onclick="goCOHome()">
          ← CO Home
        </button>

        <button onclick="retryWrongNotes()">
          ▶ Start Wrong Quiz
        </button>

        <button onclick="clearAllWrongNotes()">
          🗑 Clear All
        </button>

      </div>

      ${
        wrongs.length === 0
          ? `
          <div class="card">

            <h3>No Wrong Questions</h3>

            <p>
              Great job! You have no wrong questions.
            </p>

          </div>
          `
          : wrongs.map((q,index)=>`

            <div class="card">

              <h3>#${index+1}</h3>

              <p>${q.question}</p>

              <hr>

              <p>

                <strong>Category :</strong>

                ${q.category || "-"}

              </p>

              <p>

                <strong>Level :</strong>

                ${q.level || "-"}

              </p>

            </div>

          `).join("")
      }

    </main>

  `;

}
