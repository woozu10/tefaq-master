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
        JSON.parse(localStorage.getItem("lastExamQuestions")) || [];

    setReviewQuestions(questions);

    setCurrentPage("review");

    location.reload();

};

export function Result(score, total) {

    const percent =
        total === 0
            ? 0
            : Math.round((score / total) * 100);

    return `

    <main class="content">

        <h2>🎉 Test Finished</h2>

        <div class="card">

            <h3>Final Score</h3>

            <h1>${score}/${total}</h1>

            <h2 style="
color:
${
percent >= 80
? '#4CAF50'
: percent >= 60
? '#FF9800'
: '#F44336'
};
">

${percent}%

</h2>

            <p>
                Accuracy : ${percent}%
            </p>

            <button onclick="reviewAnswers()">
                📖 Review Answers
            </button>

            <br><br>

            <button onclick="restartExam()">
                Try Again
            </button>

            <br><br>

            <button onclick="goDashboard()">
                Dashboard
            </button>

        </div>

    </main>

    `;

}
