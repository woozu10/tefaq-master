import coB2 from "../../public/data/co/B2.json";

const DATA = {
  CO: {
    B2: coB2
  }
};

export function getQuestion(level = "B2", module = "CO") {

  const questions = DATA[module][level];

  const index = Math.floor(Math.random() * questions.length);

  return questions[index];

}

export function getQuestions(level = "B2", module = "CO") {

  return DATA[module][level];

}
