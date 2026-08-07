import { getQuestion } from "../services/tefaqService.js";

export function Content() {

  const sample = getQuestion("B2");

  return `
    <main class="content">

      <h2>Dashboard</h2>

      <div class="card">
        <h3>${sample.title}</h3>
        <p>${sample.question}</p>
      </div>

      <div class="card">
        <h3>Compréhension Écrite (CE)</h3>
        <p>Practice Reading</p>
      </div>

      <div class="card">
        <h3>Expression Orale (EO)</h3>
        <p>Practice Speaking</p>
      </div>

      <div class="card">
        <h3>Expression Écrite (EE)</h3>
        <p>Practice Writing</p>
      </div>

    </main>
  `;
}
