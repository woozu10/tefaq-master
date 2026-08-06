import { Navigation } from "./components/Navigation.js";
import { Dashboard } from "./pages/Dashboard.js";

export function App() {
  return `
    <h1>TEFAQ Master</h1>
    ${Navigation()}
    ${Dashboard()}
  `;
}
