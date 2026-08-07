export function saveWrongQuestion(question) {

  const wrongNotes =
    JSON.parse(localStorage.getItem("wrongNotes")) || [];

  wrongNotes.push(question);

  localStorage.setItem(
    "wrongNotes",
    JSON.stringify(wrongNotes)
  );

}

export function getWrongQuestions() {

  return JSON.parse(
    localStorage.getItem("wrongNotes")
  ) || [];

}

export function clearWrongQuestions() {

  localStorage.removeItem("wrongNotes");

}
