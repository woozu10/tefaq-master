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

window.adminBackDashboard = function () {

  setCurrentPage("dashboard");
  location.reload();

};

window.adminPreviewQuestion = function () {

  const question = buildQuestionFromForm();

  const error = validateAdminQuestion(question);

  if (error) {

    alert(error);
    return;

  }

  previewQuestion = question;

  saveAdminDraft(question);

  window.adminPreviewTranscript = question.transcript;

  const preview =
    document.getElementById("admin-preview");

  if (preview) {

    preview.innerHTML =
      JsonPreview(question);

  }

};

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

  utterance.lang = "fr-CA";

  speechSynthesis.speak(utterance);

};

window.adminStopPreviewAudio = function () {

  speechSynthesis.cancel();

};

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

window.adminCopyJson = async function () {

  const output =
    document.getElementById(
      "admin-json-output"
    );

  const json =
    output?.value || generatedJson;

  if (!json) {

    alert("Generate JSON first.");
    return;

  }

  await navigator.clipboard.writeText(json);

  alert("JSON copied.");

};

window.adminClearForm = function () {

  if (!confirm("Clear current data?")) {
    return;
  }

  clearAdminDraft();

  previewQuestion = null;

  generatedJson = "";

  location.reload();

};

export function Admin() {

  return `

  <main class="content">

    <div
      style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:20px;
      "
    >

      <h2>🛠 Admin CMS</h2>

      <button onclick="adminBackDashboard()">

        ← Dashboard

      </button>

    </div>

    <div class="card">

      <h3>🚧 Admin Form</h3>

      <p>

        AdminForm 기능은
        현재 제거되었습니다.

      </p>

      <p>

        다음 버전에서
        새로운 CMS를 추가합니다.

      </p>

    </div>

    <div id="admin-preview">

      ${
        previewQuestion
          ? JsonPreview(previewQuestion)
          : ""
      }

    </div>

    <div class="card">

      <h3>Generated JSON</h3>

      <textarea

        id="admin-json-output"

        rows="15"

        readonly

        style="
          width:100%;
          font-family:monospace;
        "

      >${generatedJson}</textarea>

      <br><br>

      <button onclick="adminCopyJson()">

        📋 Copy JSON

      </button>

    </div>

  </main>

  `;

}
