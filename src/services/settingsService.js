const DEFAULT_VOICE_SPEED = 1.0;
const DEFAULT_QUESTION_COUNT = 40;

export function getVoiceSpeed() {

  return Number(
    localStorage.getItem("voiceSpeed")
  ) || DEFAULT_VOICE_SPEED;

}

export function setVoiceSpeed(speed) {

  localStorage.setItem(
    "voiceSpeed",
    speed
  );

}

export function getQuestionCount() {

  return Number(
    localStorage.getItem("questionCount")
  ) || DEFAULT_QUESTION_COUNT;

}

export function setQuestionCount(count) {

  localStorage.setItem(
    "questionCount",
    count
  );

}
