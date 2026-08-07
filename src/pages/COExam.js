import { setCurrentPage } from "../services/router.js";
import { setMode } from "../services/modeService.js";

window.startExam = function () {

  localStorage.removeItem("score");
  localStorage.removeItem("total");
  localStorage.removeItem("coTimerEnd");

  setMode("exam");

  setCurrentPage("co-quiz");

  location.reload();

};

export function COExam() {

  return `
    <main class="content">

      <h2>CO Exam Mode</h2>

      <div class="card">

        <p>
          📋 20 Questions
        </p>

        <p>
          ⏱ Time Limit : 40 Minutes
        </p>

        <button onclick="startExam()">
          ▶ Start Exam
        </button>

      </div>

    </main>
  `;

}
