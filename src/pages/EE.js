let draft =
  localStorage.getItem("eeDraft") || "";

/* =========================================
   WORD / CHARACTER COUNTER
========================================= */

function updateCounter() {

  const text =
    document.getElementById("essay").value;

  const words =
    text.trim() === ""
      ? 0
      : text.trim().split(/\s+/).length;

  const chars =
    text.length;

  document.getElementById("wordCount").innerHTML =
    words;

  document.getElementById("charCount").innerHTML =
    chars;

}

/* =========================================
   AUTO SAVE
========================================= */

window.autoSave = function () {

  const text =
    document.getElementById("essay").value;

  localStorage.setItem(
    "eeDraft",
    text
  );

};

/* =========================================
   SAVE BUTTON
========================================= */

window.saveDraft = function () {

  autoSave();

  alert("Draft saved.");

};

/* =========================================
   CLEAR
========================================= */

window.clearEssay = function () {

  if (!confirm("Delete draft?")) {
    return;
  }

  localStorage.removeItem("eeDraft");

  location.reload();

};

/* =========================================
   PAGE
========================================= */

export function EE() {

  return `

    <main class="content">

      <h2>📝 Expression Écrite</h2>

      <div class="card">

        <div
          id="timer"
          style="
            font-size:28px;
            font-weight:bold;
            margin-bottom:20px;
          "
        >
          30:00
        </div>

        <h3>Today's Task</h3>

        <p>

          Vous avez reçu un colis en retard.

          Écrivez un courriel de réclamation.

          (150 à 200 mots)

        </p>

      </div>

      <div class="card">

        <textarea

          id="essay"

          rows="18"

          style="width:100%;"

          oninput="
            updateCounter();
            autoSave();
          "

        >${draft}</textarea>

        <hr>

        <p>

          Words :
          <b id="wordCount">0</b>

          &nbsp;&nbsp;

          Characters :
          <b id="charCount">0</b>

        </p>

        <br>

        <button onclick="saveDraft()">

          💾 Save Draft

        </button>

        &nbsp;

        <button onclick="clearEssay()">

          🗑 Clear

        </button>

      </div>

    </main>

  `;

}
