export async function loadQuestions(level = "B2") {

  const url =
    `${import.meta.env.BASE_URL}data/co/${level}.json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Cannot load ${level}.json (${response.status})`
    );
  }

  return await response.json();

}
