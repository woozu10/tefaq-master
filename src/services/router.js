export function setCurrentPage(page) {
  localStorage.setItem("currentPage", page);
}

export function getCurrentPage() {
  return localStorage.getItem("currentPage") || "dashboard";
}
