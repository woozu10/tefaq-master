import { getQuestion } from "../services/tefaqService.js";
import { getFavorites } from "../services/favoriteService.js";
import { getWrongQuestions } from "../services/wrongNoteService.js";
import { getHistory } from "../services/statisticsService.js";
import { setCurrentPage } from "../services/router.js";

window.goCO = function () {

  setCurrentPage("co");

  location.reload();

};

window.goFavorites = function () {

  setCurrentPage("favorites");

  location.reload();

};

window.goWrongNotes = function () {

  setCurrentPage("wrong-notes");

  location.reload();

};

window.goStatistics = function () {

  setCurrentPage("statistics");

  location.reload();

};

window.goSettings = function () {

  setCurrentPage("settings");

  location.reload();

};

export function Content() {

  const sample = getQuestion("B2");

  const favorites = getFavorites().length;

  const wrongs = getWrongQuestions().length;

  const history = getHistory();

  const lastScore =
    history.length === 0
      ? "-"
      : history[history.length - 1].percent + "%";

  const bestScore =
    history.length === 0
      ? "-"
      : Math.max(...history.map(h => h.percent)) + "%";

  return `

    <main class="content">

      <h2>📚 TEFAQ MASTER</h2>

      <div class="card">

        <h3>🎯 Continue Learning</h3>

        <button onclick="goCO()">

          ▶ Continue Practice

        </button>

      </div>

      <div class="card">

        <h3>📊 Last Score</h3>

        <h1>${lastScore}</h1>

      </div>

      <div class="card">

        <h3>🏆 Best Score</h3>

        <h1>${bestScore}</h1>

      </div>

      <div class="card">

        <h3>⭐ Favorites</h3>

        <h1>${favorites}</h1>

      </div>

      <div class="card">

        <h3>❌ Wrong Notes</h3>

        <h1>${wrongs}</h1>

      </div>

      <div class="card">

        <h3>🚀 Quick Start</h3>

        <button onclick="goCO()">

          🎧 Practice Listening

        </button>

        <br><br>

        <button onclick="goFavorites()">

          ⭐ Favorites

        </button>

        <br><br>

        <button onclick="goWrongNotes()">

          ❌ Wrong Notes

        </button>

        <br><br>

        <button onclick="goStatistics()">

          📊 Statistics

        </button>

        <br><br>

        <button onclick="goSettings()">

          ⚙ Settings

        </button>

      </div>

      <div class="card">

        <h3>📈 Study Progress</h3>

        <p>Total Exams : ${history.length}</p>

      </div>

      <div class="card">

        <h3>📝 Sample Question</h3>

        <p>${sample.title || ""}</p>

        <p>${sample.question || ""}</p>

      </div>

    </main>

  `;

}
