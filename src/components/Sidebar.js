import { setCurrentPage } from "../services/router.js";

window.goDashboard = function () {
  setCurrentPage("dashboard");
  location.reload();
};

window.goCO = function () {
  setCurrentPage("co");
  location.reload();
};

window.goCE = function () {
  setCurrentPage("ce");
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

export function Sidebar() {

  return `

    <aside class="sidebar">

      <button onclick="goDashboard()">
        🏠 Dashboard
      </button>

      <button onclick="goCO()">
        🎧 Listening (CO)
      </button>

      <button onclick="goCE()">
        📖 Reading (CE)
      </button>

      <button onclick="goFavorites()">
        ⭐ Favorites
      </button>

      <button onclick="goWrongNotes()">
        ❌ Wrong Notes
      </button>

      <button onclick="goStatistics()">
        📊 Statistics
      </button>

    </aside>

  `;

}
