import {
  getHistory,
  clearHistory
} from "../services/statisticsService.js";

window.clearStatistics = function () {

  if (!confirm("Delete all statistics?")) {

    return;

  }

  clearHistory();

  location.reload();

};

export function Statistics() {

  const history = getHistory();

  const average =
    history.length === 0
      ? 0
      : Math.round(
          history.reduce(
            (sum, item) => sum + item.percent,
            0
          ) / history.length
        );

  return `

    <main class="content">

      <h2>📊 Statistics</h2>

      <div class="card">

        <h3>Total Exams</h3>

        <h1>${history.length}</h1>

        <h3>Average</h3>

        <h2>${average}%</h2>

      </div>

      <button onclick="clearStatistics()">
        🗑 Clear History
      </button>

      <hr>

      ${
        history.length === 0
          ? "<p>No history.</p>"
          : history.map(item => `
            <div class="card">

              <h3>${item.percent}%</h3>

              <p>${item.score}/${item.total}</p>

              <small>${item.date}</small>

            </div>
          `).join("")
      }

    </main>

  `;

}
