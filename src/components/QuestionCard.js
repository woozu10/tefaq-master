export function QuestionCard(question, choices) {

  return `

    <div class="card">

      <h3>${question}</h3>

      <button onclick="checkAnswer(0)">
        ${choices[0]}
      </button>

      <button onclick="checkAnswer(1)">
        ${choices[1]}
      </button>

      <button onclick="checkAnswer(2)">
        ${choices[2]}
      </button>

    </div>

  `;

}
