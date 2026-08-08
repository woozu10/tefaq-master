import { AdminForm } from "../components/AdminForm.js";

import { JsonPreview } from "../components/JsonPreview.js";

import {
  buildQuestionFromForm,
  validateAdminQuestion,
  questionToJson,
  saveAdminDraft,
  clearAdminDraft
} from "../services/adminService.js";

import {
  setCurrentPage
} from "../services/router.js";


let previewQuestion = null;

let generatedJson = "";


/* =========================================================
   BACK
========================================================= */

window.adminBackDashboard = function () {

  setCurrentPage("dashboard");

  location.reload();

};


/* =========================================================
   PREVIEW
========================================================= */

window.adminPreviewQuestion = function () {

  const question =
    buildQuestionFromForm();

  const error =
    validateAdminQuestion(question);

  if (error) {

    alert(error);

    return;

  }

  previewQuestion =
    question;

  saveAdminDraft(question);

  window.adminPreviewTranscript =
    question.transcript;

  const preview =
    document.getElementById(
      "admin-preview"
    );

  if (preview) {

    preview.innerHTML =
      JsonPreview(question);

  }

};


/* =========================================================
   AUDIO
========================================================= */

window.adminPlayPreviewAudio = function () {

  if (!window.adminPreviewTranscript) {

    alert("No transcript.");

    return;

  }

  speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(
      window.adminPreviewTranscript
    );

  utterance.lang =
    "fr-CA";

  utterance.rate =
    1.0;

  utterance.pitch =
    1.0;

  const voices =
    speechSynthesis.getVoices();

  const voice =

    voices.find(
      v => v.lang === "fr-CA"
    )

    ||

    voices.find(
      v => v.lang === "fr-FR"
    );

  if (voice) {

    utterance.voice =
      voice;

  }

  speechSynthesis.speak(
    utterance
  );

};


window.adminStopPreviewAudio = function () {

  speechSynthesis.cancel();

};


/* =========================================================
   GENERATE JSON
========================================================= */

window.adminGenerateJson = function () {

  const question =
    buildQuestionFromForm();

  const error =
    validateAdminQuestion(question);

  if (error) {

    alert(error);

    return;

  }

  generatedJson =
    questionToJson(question);

  saveAdminDraft(question);

  const output =
    document.getElementById(
      "admin-json-output"
    );

  if (output) {

    output.value =
      generatedJson;

  }

};


/* =========================================================
   COPY JSON
========================================================= */

window.adminCopyJson = async function () {

  const output =
    document.getElementById(
      "admin-json-output"
    );

  const json =
    output?.value ||
    generatedJson;

  if (!json) {

    alert(
      "Generate JSON first."
    );

    return;

  }


  try {

    await navigator.clipboard.writeText(
      json
    );

    alert(
      "JSON copied."
    );

  } catch {

    output.focus();

    output.select();

    document.execCommand(
      "copy"
    );

    alert(
      "JSON copied."
    );

  }

};


/* =========================================================
   CLEAR
========================================================= */

window.adminClearForm = function () {

  if (
    !confirm(
      "Clear the current question?"
    )
  ) {
    return;
  }

  clearAdminDraft();

  previewQuestion =
    null;

  generatedJson =
    "";

  setCurrentPage(
    "admin"
  );

  location.reload();

};


/* =========================================================
   ADMIN PAGE
========================================================= */

export function Admin() {

  return `

    <main class="content">

      <div
        style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;
          margin-bottom:20px;
        "
      >

        <h1>
          🛠 Admin CMS
        </h1>

        <button
          onclick="adminBackDashboard()"
        >
          ← Dashboard
        </button>

      </div>


      <div class="card">

        <h3>
          Question Manager
        </h3>

        <p>
          CO 문제를 작성하고 JSON을 생성합니다.
        </p>

        <p>
          현재 GitHub Pages 버전에서는
          Generate → Copy → B2.json에 추가하는 방식입니다.
        </p>

      </div>


      ${AdminForm()}


      <div
        id="admin-preview"
      >

        ${
          previewQuestion
            ? JsonPreview(
                previewQuestion
              )
            : ""
        }

      </div>


      <div class="card">

        <h2>
          🧩 Generated JSON
        </h2>

        <textarea
          id="admin-json-output"
          rows="20"
          readonly
          style="
            width:100%;
            box-sizing:border-box;
            font-family:monospace;
          "
        >${generatedJson}</textarea>

        <br><br>

        <button
          onclick="adminCopyJson()"
        >
          📋 Copy JSON
        </button>

      </div>

    </main>

  `;

}
