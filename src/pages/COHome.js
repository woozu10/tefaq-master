import { setCurrentPage } from "../services/router.js";

window.openPractice = function(){

    setCurrentPage("co-practice");

    location.reload();

}

window.openExam = function(){

    setCurrentPage("co-exam");

    location.reload();

}

export function COHome(){

    return `

    <main class="content">

        <h2>Compréhension Orale</h2>

        <div class="card">

            <button onclick="openPractice()">
                📘 Practice
            </button>

            <button onclick="openExam()">
                📝 Exam
            </button>

            <button disabled>
                ❌ Wrong Notes
            </button>

            <button disabled>
                ⭐ Favorites
            </button>

            <button disabled>
                📊 Statistics
            </button>

        </div>

    </main>

    `;

}
