export function saveWrongQuestion(question) {

  const wrongNotes =
    JSON.parse(localStorage.getItem("wrongNotes")) || [];

  if (!wrongNotes.find(q => q.id === question.id)) {

    wrongNotes.push(question);

  }

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

export function removeWrongQuestion(id) {

  const wrongNotes = getWrongQuestions()
    .filter(q => q.id !== id);

  localStorage.setItem(
    "wrongNotes",
    JSON.stringify(wrongNotes)
  );

}

export function clearWrongQuestions() {

  localStorage.removeItem("wrongNotes");

}
