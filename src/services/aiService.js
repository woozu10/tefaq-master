export async function askAI(prompt) {

  const apiKey =
    localStorage.getItem("gemini_api_key");

  if (!apiKey) {
    throw new Error("Gemini API Key not found.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-latest:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    }
  );

  if (!response.ok) {
    throw new Error("Gemini API Error");
  }

  const result =
    await response.json();

  return result
    .candidates[0]
    .content.parts[0]
    .text;

}
