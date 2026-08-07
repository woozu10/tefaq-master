import { getHistory } from "../services/statisticsService.js";

export function Statistics() {

  const history = getHistory();

  return `
    <main class="content">

      <h2>📊 Statistics</h2>

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
