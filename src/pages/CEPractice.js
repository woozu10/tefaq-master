import { setCurrentPage } from "../services/router.js";

window.startCEPractice = function () {
  setCurrentPage("ce-quiz");
  location.reload();
};

export function CEPractice() {

  return `

  <main class="content">

      <h2>CE Practice</h2>

      <div class="card">

          <p>
          Practice mode lets you solve questions without time limits.
          </p>

          <button onclick="startCEPractice()">
              ▶ Start Practice
          </button>

      </div>

  </main>

  `;

}
