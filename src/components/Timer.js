let timerInterval = null;

export function Timer(minutes = 40) {

  let endTime = localStorage.getItem("coTimerEnd");

  if (!endTime) {
    endTime = Date.now() + minutes * 60 * 1000;
    localStorage.setItem("coTimerEnd", endTime);
  }

  setTimeout(() => {
    startTimer();
  }, 0);

  return `
    <div id="exam-timer" class="timer">
      ⏱ 40:00
    </div>
  `;
}

function startTimer() {

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  updateTimer();

  timerInterval = setInterval(() => {
    updateTimer();
  }, 1000);
}

function updateTimer() {

  const timer = document.getElementById("exam-timer");

  if (!timer) {
    clearInterval(timerInterval);
    return;
  }

  const endTime = Number(localStorage.getItem("coTimerEnd"));

  let remaining = Math.max(
    0,
    Math.floor((endTime - Date.now()) / 1000)
  );

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  timer.innerHTML =
    `⏱ ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
if (remaining <= 0) {

    clearInterval(timerInterval);

    localStorage.removeItem("coTimerEnd");

    localStorage.setItem("currentPage", "result");

    location.reload();

}
 
}
