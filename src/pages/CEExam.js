import { setCurrentPage } from "../services/router.js";

window.startCEExam = function () {
  setCurrentPage("ce-quiz");
  location.reload();
};

export function CEExam() {

  return `

  <main class="content">

      <h2>CE Exam</h2>

      <div class="card">

          <p>
          Simulate the real TEFAQ Reading Exam.
          </p>

          <button onclick="startCEExam()">
              ▶ Start Exam
          </button>

      </div>

  </main>

  `;

}
