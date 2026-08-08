import { Header } from "../components/Header.js";
import { Sidebar } from "../components/Sidebar.js";
import { Content } from "../components/Content.js";
import { setCurrentPage } from "../services/router.js";

window.openCO = function () {
  setCurrentPage("co");
  location.reload();
};

window.openCE = function () {
  setCurrentPage("ce");
  location.reload();
};

window.openEE = function () {
  setCurrentPage("ee");
  location.reload();
};

window.openEO = function () {
  setCurrentPage("eo");
  location.reload();
};

export function Dashboard() {

  return `

    ${Header()}

    <div class="layout">

      ${Sidebar()}

      <main class="content">

        <h2>TEFAQ MASTER</h2>

        <div class="card">

          <button onclick="openCO()">
            🎧 Compréhension Orale
          </button>

          <button onclick="openCE()">
            📖 Compréhension Écrite
          </button>

          <button onclick="openEE()">
            ✍️ Expression Écrite
          </button>

          <button onclick="openEO()">
            🎤 Expression Orale
          </button>

        </div>

        ${Content()}

      </main>

    </div>

  `;

}
