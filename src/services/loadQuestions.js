export async function loadQuestions(level = "B2") {

  const response = await fetch(`/data/co/${level}.json`);

  if (!response.ok) {
    throw new Error(`Cannot load ${level}.json`);
  }

  return await response.json();

}
