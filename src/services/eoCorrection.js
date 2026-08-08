import { askAI } from "./aiService.js";

export async function correctSpeech(
  topic,
  transcript
) {

  const prompt = `
Tu es examinateur officiel du TEFAQ.

Sujet :

${topic.title}

Consigne :

${topic.instruction}

Réponse du candidat :

${transcript}

Évalue cette réponse.

Retourne uniquement :

1. Score (/450)

2. Prononciation

3. Fluidité

4. Grammaire

5. Vocabulaire

6. Cohérence

7. Points forts

8. Points à améliorer

9. Réponse modèle.
`;

  return await askAI(prompt);

}
