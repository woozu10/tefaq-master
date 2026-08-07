import { App } from "../App.js";
import { coQuestions } from "../data/coQuestions.js";

let currentQuestion = 0;
let score = 0;
let message = "";
let answered = false;
let selectedAnswer = -1;

export function CO() {

  const q = coQuestions[currentQuestion];

  const renderButton = (index) => {

    let style = "";

    if (answered) {

      if (index === q.answer) {
        style = "background:#4CAF50;color:white;";
      } else if (index === selectedAnswer) {
        style = "background:#F44336;color:white;";
      }

    }

    return `
      <button
        style="${style}"
        onclick="checkAnswer(${index})"
        ${answered ? "disabled" : ""}
      >
        ${q.choices[index]}
      </button>
    `;
  };

  return `
    <main class="content">

      <h2>Compréhension Orale</h2>

      <p><strong>Question ${currentQuestion + 1} / ${coQuestions.length}</strong></p>
<div style="
    width:100%;
    height:12px;
    background:#444;
    border-radius:10px;
    margin:15px 0;
">
    <div style="
        width:${((currentQuestion+1)/coQuestions.length)*100}%;
        height:12px;
        background:#4CAF50;
        border-radius:10px;
        transition:0.3s;
    ">
    </div>
</div>

      <p><strong>Score : ${score}</strong></p>

      <div class="card">

        <h3>${q.question}</h3>

        ${renderButton(0)}
        ${renderButton(1)}
        ${renderButton(2)}

        <p style="font-size:20px;font-weight:bold;">
          ${message}
        </p>

        <hr>

        <button
          onclick="nextQuestion()"
          ${answered ? "" : "disabled"}
        >
          Next →
        </button>

      </div>

    </main>
  `;
}

window.checkAnswer = function(index) {

  if (answered) return;

  const q = coQuestions[currentQuestion];

  selectedAnswer = index;

  if (index === q.answer) {

    score++;
    message = "✅ Correct!";

  } else {

    message = "❌ Incorrect!";

  }

  answered = true;

  document.getElementById("app").innerHTML = App();

};

window.nextQuestion = function() {

  currentQuestion++;

  if (currentQuestion >= coQuestions.length) {

    localStorage.setItem("score", score);

localStorage.setItem("total", coQuestions.length);

localStorage.setItem("currentPage","result");

location.reload();

    currentQuestion = 0;
    score = 0;

  }

  answered = false;
  selectedAnswer = -1;
  message = "";

  document.getElementById("app").innerHTML = App();

};
