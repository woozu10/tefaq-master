import { setCurrentPage } from "../services/router.js";

window.openCEPractice = function () {
  setCurrentPage("ce-practice");
  location.reload();
};

window.openCEExam = function () {
  setCurrentPage("ce-exam");
  location.reload();
};

window.openWrongNotes = function () {
  setCurrentPage("wrong-notes");
  location.reload();
};

window.openFavorites = function () {
  setCurrentPage("favorites");
  location.reload();
};

window.openStatistics = function () {
  setCurrentPage("statistics");
  location.reload();
};

export function CEHome() {

  return `

    <main class="content">

      <h2>Compréhension Écrite</h2>

      <div class="card">

        <button onclick="openCEPractice()">
          📘 Practice
        </button>

        <button onclick="openCEExam()">
          📝 Exam
        </button>

        <button onclick="openWrongNotes()">
          ❌ Wrong Notes
        </button>

        <button onclick="openFavorites()">
          ⭐ Favorites
        </button>

        <button onclick="openStatistics()">
          📊 Statistics
        </button>

      </div>

    </main>

  `;

}
