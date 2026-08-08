import { setCurrentPage } from "../services/router.js";

window.openEEPractice = function () {

  setCurrentPage("ee-practice");
  location.reload();

};

window.openEEExam = function () {

  setCurrentPage("ee-exam");
  location.reload();

};

window.openEEStatistics = function () {

  setCurrentPage("statistics");
  location.reload();

};

export function EEHome() {

  return `

    <main class="content">

      <h2>Expression Écrite</h2>

      <div class="card">

        <button onclick="openEEPractice()">
          📘 Practice
        </button>

        <button onclick="openEEExam()">
          📝 Exam
        </button>

        <button onclick="openEEStatistics()">
          📊 Statistics
        </button>

      </div>

    </main>

  `;

}
