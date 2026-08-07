export function Result(score, total) {

  const percent = Math.round(score / total * 100);

  return `
    <main class="content">

      <h2>🎉 Test Finished</h2>

      <div class="card">

        <h3>Score</h3>

        <p style="font-size:40px;">
          ${score} / ${total}
        </p>

        <h2>${percent}%</h2>

        <button onclick="location.reload()">
          Restart
        </button>

      </div>

    </main>
  `;

}
