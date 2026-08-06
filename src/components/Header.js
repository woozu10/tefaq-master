import { Navigation } from "./Navigation.js";

export function Header() {
  return `
    <header class="header">
      <h2>TEFAQ Master</h2>
      ${Navigation()}
    </header>
  `;
}
