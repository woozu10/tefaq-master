import { getWrongQuestions } from "../services/wrongNoteService.js";

export function WrongNotes() {

  const questions = getWrongQuestions();

  if (questions.length === 0) {

    return `
      <main class="content">

        <h2>❌ Wrong Notes</h2>

        <p>No wrong questions.</p>

      </main>
    `;

  }

  return `
    <main class="content">

      <h2>❌ Wrong Notes</h2>

      ${questions.map(q => `
        <div class="card">

          <h3>${q.question}</h3>

          <p>${q.category || ""}</p>

        </div>
      `).join("")}

    </main>
  `;

}
