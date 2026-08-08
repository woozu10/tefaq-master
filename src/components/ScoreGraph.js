export function ScoreGraph(history) {

  if (!history || history.length === 0) {

    return `
      <div class="card">

        <h3>📈 Score Graph</h3>

        <p>No history.</p>

      </div>
    `;

  }

  const max = 100;

  const width = 100;

  const height = 60;

  const step =
    history.length === 1
      ? 0
      : width / (history.length - 1);

  const points = history.map((item, index) => {

    const x = index * step;

    const y =
      height -
      (item.percent / max) * height;

    return {

      x,

      y,

      score: item.percent

    };

  });

  const line = points
    .map(point => `${point.x},${point.y}`)
    .join(" ");

  return `

  <div class="card">

    <h3>📈 Score Graph</h3>

    <svg
      viewBox="0 0 100 60"
      width="100%"
      style="overflow:visible;"
    >

      <polyline

        fill="none"

        stroke="#4CAF50"

        stroke-width="2"

        points="${line}"

      />

      ${points.map(point=>`

        <circle

          cx="${point.x}"

          cy="${point.y}"

          r="1.8"

          fill="#4CAF50"

        />

      `).join("")}

    </svg>

    <div

      style="
        display:flex;
        justify-content:space-between;
        font-size:12px;
        margin-top:8px;
      "

    >

      ${history.map((item,index)=>`

        <div>

          ${index+1}

        </div>

      `).join("")}

    </div>

  </div>

  `;

}
