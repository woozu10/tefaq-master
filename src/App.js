import { Header } from "./components/Header.js";
import { Navigation } from "./components/Navigation.js";
import { Dashboard } from "./pages/Dashboard.js";

export function App() {
  return `
    ${Header()}
    ${Navigation()}
    <main>
      ${Dashboard()}
    </main>
  `;
}
