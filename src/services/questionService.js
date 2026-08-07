export async function loadQuestions(level) {

  const response = await fetch(
    `/src/data/co/${level}.json`
  );

  return await response.json();

}
