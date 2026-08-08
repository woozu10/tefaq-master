export function buildQuestionFromForm() {

  const id =
    Number(
      document.getElementById("admin-id")?.value
    );

  const category =
    document.getElementById("admin-category")?.value?.trim();

  const level =
    document.getElementById("admin-level")?.value || "B2";

  const duration =
    Number(
      document.getElementById("admin-duration")?.value || 45
    );

  const transcript =
    document.getElementById("admin-transcript")?.value?.trim();

  const question =
    document.getElementById("admin-question")?.value?.trim();

  const choiceA =
    document.getElementById("admin-choice-a")?.value?.trim();

  const choiceB =
    document.getElementById("admin-choice-b")?.value?.trim();

  const choiceC =
    document.getElementById("admin-choice-c")?.value?.trim();

  const choiceD =
    document.getElementById("admin-choice-d")?.value?.trim();

  const answer =
    Number(
      document.getElementById("admin-answer")?.value || 0
    );

  const explanation =
    document.getElementById("admin-explanation")?.value?.trim();

  const vocabularyText =
    document.getElementById("admin-vocabulary")?.value || "";

  const vocabulary =
    vocabularyText
      .split(/[\n,]+/)
      .map(word => word.trim())
      .filter(Boolean);

  const choices =
    [choiceA, choiceB, choiceC, choiceD]
      .filter(choice => choice);

  return {
    id,
    category,
    level,
    duration,
    transcript,
    question,
    choices,
    answer,
    explanation,
    vocabulary
  };

}


export function validateAdminQuestion(q) {

  if (!Number.isInteger(q.id) || q.id <= 0) {
    return "ID를 입력하세요.";
  }

  if (!q.category) {
    return "Category를 입력하세요.";
  }

  if (!q.transcript) {
    return "Transcript를 입력하세요.";
  }

  if (!q.question) {
    return "Question을 입력하세요.";
  }

  if (!Array.isArray(q.choices) || q.choices.length < 3) {
    return "최소 3개의 Choice가 필요합니다.";
  }

  if (
    q.answer < 0 ||
    q.answer >= q.choices.length
  ) {
    return "Correct Answer가 올바르지 않습니다.";
  }

  return null;

}


export function questionToJson(question) {

  return JSON.stringify(
    question,
    null,
    2
  );

}


export function saveAdminDraft(question) {

  localStorage.setItem(
    "adminQuestionDraft",
    JSON.stringify(question)
  );

}


export function getAdminDraft() {

  try {

    return JSON.parse(
      localStorage.getItem("adminQuestionDraft")
    );

  } catch {

    return null;

  }

}


export function clearAdminDraft() {

  localStorage.removeItem(
    "adminQuestionDraft"
  );

}
