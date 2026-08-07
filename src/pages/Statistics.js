export function Statistics() {

  const score = Number(localStorage.getItem("score")) || 0;
  const total = Number(localStorage.getItem("total")) || 0;

  const accuracy =
    total === 0
      ? 0
      : Math.round((score / total) * 100);

  return `
    <main class="content">

      <h2>📊 Statistics</h2>

      <div class="card">

        <h3>Latest Result</h3>

        <p>Correct : ${score}</p>

        <p>Total : ${total}</p>

        <p>Accuracy : ${accuracy}%</p>

      </div>

    </main>
  `;

}
