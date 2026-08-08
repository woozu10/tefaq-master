import { setCurrentPage } from "../services/router.js";
import {
  getFavorites,
  clearFavorites
} from "../services/favoriteService.js";
import { setQuizQuestions } from "../services/quizService.js";

window.goCOHome = function () {

  setCurrentPage("co");

  location.reload();

};

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

      <h2>⭐ Favorite Questions</h2>

      <div class="card">

        <h3>Total Favorites</h3>

        <h1>${favorites.length}</h1>

      </div>

      <div
      style="
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      justify-content:center;
      margin-bottom:20px;
      ">

        <button onclick="goCOHome()">
          ← CO Home
        </button>

        <button onclick="retryFavorites()">
          ▶ Start Favorite Quiz
        </button>

        <button onclick="clearAllFavorites()">
          🗑 Clear All
        </button>

      </div>

      ${
        favorites.length === 0
          ? `
          <div class="card">

            <h3>No Favorite Questions</h3>

            <p>
              Add favorite questions while studying.
            </p>

          </div>
          `
          : favorites.map((q,index)=>`

            <div class="card">

              <h3>

                #${index+1}

              </h3>

              <p>

                ${q.question}

              </p>

              <hr>

              <p>

                <strong>Category :</strong>

                ${q.category || "-"}

              </p>

              <p>

                <strong>Level :</strong>

                ${q.level || "-"}

              </p>

            </div>

          `).join("")
      }

    </main>

  `;

}
