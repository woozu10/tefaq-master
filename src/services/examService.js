export function createExamQuestions(questions, count = 20) {

  const shuffled = [...questions]
    .sort(() => Math.random() - 0.5);

  return shuffled.slice(
    0,
    Math.min(count, shuffled.length)
  );

}
