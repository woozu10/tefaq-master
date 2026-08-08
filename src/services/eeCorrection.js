import { askAI } from "./aiService.js";

export async function correctEssay(
  text,
  topic
) {

  const prompt = `
너는 TEFAQ EE 시험관이다.

주제
${topic.title}

문제
${topic.instruction}

답안
${text}

다음을 작성하라.

1. 예상 점수

2. 문법

3. 어휘

4. 자연스러운 표현

5. 개선점

6. 모범답안
`;

  return await askAI(prompt);

}
