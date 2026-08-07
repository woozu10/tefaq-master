import { AnswerButton } from "./AnswerButton.js";

export function QuestionCard(
    question,
    choices,
    renderButton
){

    return `

    <div class="card">

        <h3>${question}</h3>

        ${AnswerButton(choices[0],0,renderButton)}

        ${AnswerButton(choices[1],1,renderButton)}

        ${AnswerButton(choices[2],2,renderButton)}

    </div>

    `;

}
