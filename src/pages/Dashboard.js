import { Header } from "../components/Header.js";
import { Sidebar } from "../components/Sidebar.js";
import { Content } from "../components/Content.js";

export function Dashboard() {
  return `
    ${Header()}
    <div class="layout">
      ${Sidebar()}
      ${Content()}
    </div>
  `;
}
