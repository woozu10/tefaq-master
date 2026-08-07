import { setCurrentPage } from "../services/router.js";
import { setMode } from "../services/modeService.js";

window.startB2 = function () {

  localStorage.removeItem("score");
  localStorage.removeItem("total");
  localStorage.removeItem("coTimerEnd");

  setMode("practice");

  setCurrentPage("co-quiz");

  location.reload();

};
export function COPractice() {

  return `
    <main class="content">

      <h2>Practice Mode</h2>

      <div class="card">

        <button onclick="startB2()">
          🇫🇷 B2 Practice
        </button>

      </div>

    </main>
  `;

}
