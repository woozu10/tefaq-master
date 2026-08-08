export function QuestionPalette(
  questions,
  currentQuestion
) {

  return `

  <div
    style="
      display:grid;
      grid-template-columns:repeat(10,1fr);
      gap:8px;
      margin:20px 0;
    "
  >

    ${questions.map((q,index)=>{

      let color="#E0E0E0";

      if(index===currentQuestion){

        color="#2196F3";

      }else if(q.userAnswer===undefined){

        color="#E0E0E0";

      }else if(q.userAnswer===q.answer){

        color="#4CAF50";

      }else{

        color="#F44336";

      }

      return`

      <button

        onclick="goQuestion(${index})"

        style="
          width:34px;
          height:34px;
          border-radius:50%;
          border:none;
          cursor:pointer;
          font-weight:bold;
          color:white;
          background:${color};
        "

      >

      ${index+1}

      </button>

      `;

    }).join("")}

  </div>

  `;

}
