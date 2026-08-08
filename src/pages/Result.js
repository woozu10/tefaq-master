import { setCurrentPage } from "../services/router.js";
import { setReviewQuestions } from "../services/reviewService.js";

window.restartExam = function () {

  localStorage.removeItem("score");
  localStorage.removeItem("total");
  localStorage.removeItem("coTimerEnd");

  setCurrentPage("co");

  location.reload();

};

window.goDashboard = function () {

  setCurrentPage("dashboard");

  location.reload();

};

window.reviewAnswers = function () {

  const questions =
    JSON.parse(
      localStorage.getItem("lastExamQuestions")
    ) || [];

  setReviewQuestions(questions);

  setCurrentPage("review");

  location.reload();

};

export function Result(score, total) {

  const percent =
    total === 0
      ? 0
      : Math.round((score / total) * 100);

  let message = "";
  let color = "";

  if (percent >= 90) {
    message = "🌟 Excellent!";
    color = "#4CAF50";
  } else if (percent >= 80) {
    message = "🎉 Very Good!";
    color = "#4CAF50";
  } else if (percent >= 60) {
    message = "👍 Good Job!";
    color = "#FF9800";
  } else {
    message = "💪 Keep Practicing!";
    color = "#F44336";
  }

  return `

  <main class="content">

    <h2>🎉 Exam Finished</h2>

    <div class="card">

      <h3>Final Score</h3>

      <h1>${score} / ${total}</h1>

      <h2
        style="
          color:${color};
          font-size:42px;
        "
      >
        ${percent}%
      </h2>

      <h3>${message}</h3>

      <hr>

      <p><strong>Correct :</strong> ${score}</p>

      <p><strong>Wrong :</strong> ${total - score}</p>

      <p><strong>Total :</strong> ${total}</p>

      <hr>

      <button onclick="reviewAnswers()">
        📖 Review Answers
      </button>

      <br><br>

      <button onclick="restartExam()">
        🔄 Try Again
      </button>

      <br><br>

      <button onclick="goDashboard()">
        🏠 Dashboard
      </button>

    </div>

  </main>

  `;

}
