import { generateQuestion } from "../ai/tefaqGenerator.js";

export function getQuestion(level) {
  return generateQuestion(level);
}
