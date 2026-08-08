const STORAGE_KEY = "tefaq-history";

/* ===============================
   Load History
================================ */

export function getHistory() {

  try {

    return JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ) || [];

  } catch {

    return [];

  }

}

/* ===============================
   Save Result
================================ */

export function saveResult(score, total) {

  const history = getHistory();

  const percent =
    Math.round(score / total * 100);

  const result = {

    score,

    total,

    percent,

    date: new Date().toLocaleDateString(),

    timestamp: Date.now(),

    duration:
      Number(
        localStorage.getItem("studyTime") || 0
      ),

    mode:
      localStorage.getItem("mode") || "practice",

    category:
      localStorage.getItem("category") || "ALL"

  };

  history.push(result);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );

}

/* ===============================
   Clear History
================================ */

export function clearHistory() {

  localStorage.removeItem(STORAGE_KEY);

}

/* ===============================
   Best Score
================================ */

export function getBestScore() {

  const history = getHistory();

  if (history.length === 0) {

    return 0;

  }

  return Math.max(
    ...history.map(item => item.percent)
  );

}

/* ===============================
   Average Score
================================ */

export function getAverageScore() {

  const history = getHistory();

  if (history.length === 0) {

    return 0;

  }

  const total =
    history.reduce(
      (sum, item) =>
        sum + item.percent,
      0
    );

  return Math.round(
    total / history.length
  );

}

/* ===============================
   Last Score
================================ */

export function getLastScore() {

  const history = getHistory();

  if (history.length === 0) {

    return 0;

  }

  return history[
    history.length - 1
  ].percent;

}

/* ===============================
   Total Questions
================================ */

export function getTotalQuestions() {

  const history = getHistory();

  return history.reduce(

    (sum, item) =>

      sum + item.total,

    0

  );

}

/* ===============================
   Total Correct
================================ */

export function getTotalCorrect() {

  const history = getHistory();

  return history.reduce(

    (sum, item) =>

      sum + item.score,

    0

  );

}

/* ===============================
   Accuracy
================================ */

export function getAccuracy() {

  const total =
    getTotalQuestions();

  if (total === 0) {

    return 0;

  }

  return Math.round(

    getTotalCorrect() /

    total *

    100

  );

}
