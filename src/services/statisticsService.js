export function saveResult(score, total) {

  const history =
    JSON.parse(localStorage.getItem("history")) || [];

  history.push({

    date: new Date().toLocaleString(),

    score,

    total,

    percent: Math.round(score / total * 100)

  });

  localStorage.setItem(
    "history",
    JSON.stringify(history)
  );

}

export function getHistory() {

  return JSON.parse(
    localStorage.getItem("history")
  ) || [];

}

export function clearHistory() {

  localStorage.removeItem("history");

}
