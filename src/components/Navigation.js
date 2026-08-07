import { setCurrentPage } from "../services/router.js";
export function Navigation() {
  return `
    <nav class="nav">

      <button data-page="dashboard">Dashboard</button>

      <button data-page="co">CO</button>

      <button data-page="ce">CE</button>

      <button data-page="eo">EO</button>

      <button data-page="ee">EE</button>

    </nav>
  `;
}

document.addEventListener("click", (e) => {

  if (e.target.dataset.page) {

    
setCurrentPage(e.target.dataset.page);

location.reload();
  }

});
