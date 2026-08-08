import B2 from "../../public/data/co/B2.json";

export function getQuestion(level = "B2") {

  const questions = B2;

  const index = Math.floor(Math.random() * questions.length);

  return questions[index];

}

export function getQuestions(level = "B2") {

  return B2;

}
