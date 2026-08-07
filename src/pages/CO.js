import { App } from "../App.js";
import { coQuestions } from "../data/coQuestions.js";

let currentQuestion = 0;

export function CO() {

  const q = coQuestions[currentQuestion];

  return `
    <main class="content">

      <h2>Compréhension Orale</h2>

      <div class="card">

        <h3>${q.question}</h3>

        <button onclick="checkAnswer(0)">
          ${q.choices[0]}
        </button>

        <button onclick="checkAnswer(1)">
          ${q.choices[1]}
        </button>

        <button onclick="checkAnswer(2)">
          ${q.choices[2]}
        </button>

        <hr>

        <button onclick="nextQuestion()">
          Next →
        </button>

      </div>

    </main>
  `;
}

window.checkAnswer = function(index) {

  const q = coQuestions[currentQuestion];

  if (index === q.answer) {
    alert("✅ Correct!");
  } else {
    alert("❌ Incorrect!");
  }

};

window.nextQuestion = function() {

  currentQuestion++;

  if (currentQuestion >= coQuestions.length) {
    currentQuestion = 0;
  }

  document.getElementById("app").innerHTML = App();

};
