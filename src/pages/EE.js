let draft = localStorage.getItem("eeDraft") || "";

window.saveDraft = function () {

  const text =
    document.getElementById("essay").value;

  localStorage.setItem("eeDraft", text);

  alert("Draft saved.");

};

export function EE() {

  return `

    <main class="content">

      <h2>📝 Expression Écrite</h2>

      <div class="card">

        <h3>Writing Task</h3>

        <p>

          Vous avez reçu un colis en retard.

          Écrivez un courriel de réclamation.

        </p>

      </div>

      <div class="card">

        <textarea

          id="essay"

          rows="18"

          style="width:100%;"

        >${draft}</textarea>

        <br><br>

        <button onclick="saveDraft()">

          💾 Save Draft

        </button>

      </div>

    </main>

  `;

}
