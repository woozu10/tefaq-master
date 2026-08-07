import {
  getFavorites,
  clearFavorites
} from "../services/favoriteService.js";
import { setQuizQuestions } from "../services/quizService.js";
import { setCurrentPage } from "../services/router.js";

window.retryFavorites = function () {

  const questions = getFavorites();

  if (questions.length === 0) {

    alert("No favorite questions.");

    return;

  }

  setQuizQuestions(questions);

  setCurrentPage("co-quiz");

  location.reload();

};

window.clearAllFavorites = function () {

  if (!confirm("Delete all favorites?")) {

    return;

  }

  clearFavorites();

  location.reload();

};

export function Favorites() {

  const favorites = getFavorites();

  return `

    <main class="content">

      <h2>⭐ Favorites</h2>

      <p>Total : ${favorites.length}</p>

      <button onclick="retryFavorites()">
        ▶ Practice Favorites
      </button>

      <button onclick="clearAllFavorites()">
        🗑 Clear All
      </button>

      <hr>

      ${
        favorites.length === 0
          ? "<p>No favorite questions.</p>"
          : favorites.map(q => `
              <div class="card">

                <h3>${q.question}</h3>

                <p>Level : ${q.level}</p>

              </div>
            `).join("")
      }

    </main>

  `;

}
