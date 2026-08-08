export async function loadQuestions(
  module = "co",
  level = "B2"
) {

  const url =
    `${import.meta.env.BASE_URL}data/${module}/${level}.json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Cannot load ${module}/${level}.json (${response.status})`
    );
  }

  return await response.json();

}
