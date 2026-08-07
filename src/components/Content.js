import { getQuestion } from "../services/tefaqService.js";
import { getFavorites } from "../services/favoriteService.js";
import { getWrongQuestions } from "../services/wrongNoteService.js";
import { getHistory } from "../services/statisticsService.js";

export function Content() {

  const sample = getQuestion("B2");

  const favorites = getFavorites().length;
  const wrongs = getWrongQuestions().length;
  const history = getHistory();

  const lastScore =
    history.length === 0
      ? "-"
      : history[history.length - 1].percent + "%";

  return `

    <main class="content">

      <h2>📚 TEFAQ MASTER</h2>

      <div class="card">
        <h3>⭐ Favorites</h3>
        <h1>${favorites}</h1>
      </div>

      <div class="card">
        <h3>❌ Wrong Notes</h3>
        <h1>${wrongs}</h1>
      </div>

      <div class="card">
        <h3>📊 Last Score</h3>
        <h1>${lastScore}</h1>
      </div>

      <hr>

      <div class="card">
        <h3>${sample.title}</h3>
        <p>${sample.question}</p>
      </div>

    </main>

  `;

}
