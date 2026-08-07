export function shuffleChoices(question) {

  const choices = question.choices.map((text, index) => ({
    text,
    originalIndex: index
  }));

  for (let i = choices.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [choices[i], choices[j]] =
      [choices[j], choices[i]];

  }

  return {
    ...question,
    choices: choices.map(c => c.text),
    answer: choices.findIndex(
      c => c.originalIndex === question.answer
    )
  };

}
