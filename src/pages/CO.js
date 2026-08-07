import { Timer } from "../components/Timer.js";
import { App } from "../App.js";
import { ProgressBar } from "../components/ProgressBar.js";
import { AudioPlayer } from "../components/AudioPlayer.js";
import { QuestionCard } from "../components/QuestionCard.js";
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
${Timer()}
      ${ProgressBar(currentQuestion + 1, coQuestions.length)}

      <p><strong>Score : ${score}</strong></p>

      ${AudioPlayer(q.audio)}

      ${QuestionCard(
        q.question,
        q.choices,
        renderButton
      )}

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
    localStorage.setItem("currentPage", "result");

    location.reload();
    return;
  }

  answered = false;
  selectedAnswer = -1;
  message = "";

  document.getElementById("app").innerHTML = App();

};
