export async function loadCOQuestions() {

  const response = await fetch("./src/data/co.json");

  if (!response.ok) {

    throw new Error("Failed to load questions.");

  }

  return await response.json();

}
