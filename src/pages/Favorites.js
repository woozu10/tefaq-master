import { getFavorites } from "../services/favoriteService.js";

export function Favorites() {

  const favorites = getFavorites();

  if (favorites.length === 0) {

    return `
      <main class="content">

        <h2>⭐ Favorites</h2>

        <p>No favorite questions yet.</p>

      </main>
    `;

  }

  return `
    <main class="content">

      <h2>⭐ Favorites</h2>

      ${favorites.map(q => `
        <div class="card">

          <h3>${q.question}</h3>

          <p>${q.category}</p>

        </div>
      `).join("")}

    </main>
  `;

}
