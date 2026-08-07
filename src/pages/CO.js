let selected = -1;
import { coQuestions } from "../data/coQuestions.js";

export function CO(){

    const q=coQuestions[0];

    return `

    <main class="content">

        <h2>Compréhension Orale</h2>

        <div class="card">

            <h3>${q.question}</h3>

<button onclick="checkAnswer(1)">
${q.choices[1]}
</button>

<button onclick="checkAnswer(2)">
${q.choices[2]}
</button>

<button onclick="checkAnswer(3)">
${q.choices[3]}
</button>

        </div>

    </main>

    `;

}

window.checkAnswer = function(index){

    const q = coQuestions[0];

    if(index===q.answer){

        alert("✅ Correct!");

    }else{

        alert("❌ Incorrect");

    }

}
