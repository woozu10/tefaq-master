import { ScoreGraph }
from "../components/ScoreGraph.js";
import {

  getHistory,

  clearHistory,

  getAverageScore,

  getBestScore,

  getLastScore,

  getAccuracy,

  getTotalCorrect,

  getTotalQuestions

} from "../services/statisticsService.js";

import { setCurrentPage } from "../services/router.js";

window.goCOHome = function () {

  setCurrentPage("co");

  location.reload();

};

window.goDashboard = function () {

  setCurrentPage("dashboard");

  location.reload();

};

window.clearStatistics = function () {

  if (!confirm("Delete all statistics?")) {

    return;

  }

  clearHistory();

  location.reload();

};

export function Statistics() {

  const history = getHistory();

  const average = getAverageScore();

  const best = getBestScore();

  const last = getLastScore();

  const accuracy = getAccuracy();

  const correct = getTotalCorrect();

  const totalQuestions = getTotalQuestions();

  const wrong = totalQuestions - correct;

  return `

    <main class="content">

      <div
        style="
          display:flex;
          gap:10px;
          margin-bottom:20px;
          flex-wrap:wrap;
        "
      >

        <button onclick="goCOHome()">

          ← CO

        </button>

        <button onclick="goDashboard()">

          🏠 Dashboard

        </button>

      </div>

      <h2>

        📊 Statistics

      </h2>

      <div class="card">

        <h3>

          📈 Summary

        </h3>

        <hr>

        <p>

          <b>Total Exams</b>

          ${history.length}

        </p>

        <p>

          <b>Average</b>

          ${average}%

        </p>

        <p>

          <b>Best Score</b>

          ${best}%

        </p>

        <p>

          <b>Last Score</b>

          ${last}%

        </p>

        <p>

          <b>Accuracy</b>

          ${accuracy}%

        </p>

        <p>

          <b>Questions Solved</b>

          ${totalQuestions}

        </p>

        <p>

          <b>Correct</b>

          ${correct}

        </p>

        <p>

          <b>Wrong</b>

          ${wrong}

        </p>

      </div>
      
${ScoreGraph(history)}
      <button onclick="clearStatistics()">

        🗑 Clear History

      </button>

      <hr>

      <h3>

        📜 Recent Results

      </h3>

      ${

        history.length === 0

          ? "<p>No history.</p>"

          : history

              .slice()

              .reverse()

              .map(item => `

                <div class="card">

                  <h3>

                    ${item.percent}%

                  </h3>

                  <p>

                    Score :

                    ${item.score}

                    /

                    ${item.total}

                  </p>

                  <p>

                    Accuracy :

                    ${item.percent}%

                  </p>

                  <small>

                    ${item.date}

                  </small>

                </div>

              `)

              .join("")

      }

    </main>

  `;

}
