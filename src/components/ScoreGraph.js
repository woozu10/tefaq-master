export function ScoreGraph(history) {

  if (!history || history.length === 0) {

    return `
      <div class="card">

        <h3>📈 Score Graph</h3>

        <p>No data.</p>

      </div>
    `;

  }

  const width = 600;
  const height = 220;
  const padding = 30;

  const max = 100;
  const min = 0;

  const points = history.map((item, index) => {

    const x =
      padding +
      (index * (width - padding * 2)) /
      Math.max(history.length - 1, 1);

    const y =
      height -
      padding -
      ((item.percent - min) / (max - min)) *
      (height - padding * 2);

    return `${x},${y}`;

  }).join(" ");

  return `

  <div class="card">

    <h3>📈 Score Graph</h3>

    <svg
      width="100%"
      viewBox="0 0 ${width} ${height}"
    >

      <line
        x1="${padding}"
        y1="${height-padding}"
        x2="${width-padding}"
        y2="${height-padding}"
        stroke="#888"
      />

      <line
        x1="${padding}"
        y1="${padding}"
        x2="${padding}"
        y2="${height-padding}"
        stroke="#888"
      />

      <polyline

        fill="none"

        stroke="#4CAF50"

        stroke-width="4"

        points="${points}"

      />

      ${history.map((item,index)=>{

        const x =
          padding +
          (index*(width-padding*2))/
          Math.max(history.length-1,1);

        const y =
          height -
          padding -
          (item.percent/100)*
          (height-padding*2);

        return `

          <circle

            cx="${x}"

            cy="${y}"

            r="5"

            fill="#4CAF50"

          />

          <text

            x="${x}"

            y="${y-10}"

            text-anchor="middle"

            font-size="12"

          >

            ${item.percent}

          </text>

        `;

      }).join("")}

    </svg>

  </div>

  `;

}
