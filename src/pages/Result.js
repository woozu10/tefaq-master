import { setCurrentPage } from "../services/router.js";

window.restartExam = function () {

    localStorage.removeItem("score");
    localStorage.removeItem("total");

    setCurrentPage("co");

    location.reload();

}

window.goDashboard = function () {

    setCurrentPage("dashboard");

    location.reload();

}

export function Result(score,total){

    const percent = Math.round(score/total*100);

    return `

    <main class="content">

        <h2>🎉 Test Finished</h2>

        <div class="card">

            <h3>Final Score</h3>

            <h1>${score}/${total}</h1>

            <h2>${percent}%</h2>

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
