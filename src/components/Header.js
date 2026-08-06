import { Navigation } from "./Navigation.js";

export function Header() {
  return `
    <header class="header">
      <h1>TEFAQ Master</h1>
      ${Navigation()}
    </header>
  `;
}
