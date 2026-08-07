export function QuestionCard(
  question,
  choices,
  renderButton
) {

  return `
    <div class="card">

      <h3>${question}</h3>

      ${renderButton(0)}
      ${renderButton(1)}
      ${renderButton(2)}

    </div>
  `;

}
