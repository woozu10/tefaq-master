import { coQuestions } from "../data/coQuestions.js";

export function CO(){

    const q=coQuestions[0];

    return `

    <main class="content">

        <h2>Compréhension Orale</h2>

        <div class="card">

            <h3>${q.question}</h3>

            <button>${q.choices[0]}</button>

            <button>${q.choices[1]}</button>

            <button>${q.choices[2]}</button>

        </div>

    </main>

    `;

}
