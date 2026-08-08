export function setReviewQuestions(questions) {

  localStorage.setItem(
    "reviewQuestions",
    JSON.stringify(questions)
  );

}

export function getReviewQuestions() {

  return JSON.parse(
    localStorage.getItem("reviewQuestions")
  ) || [];

}

export function clearReviewQuestions() {

  localStorage.removeItem("reviewQuestions");

}
