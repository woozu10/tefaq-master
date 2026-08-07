let seconds = 40 * 60;

export function Timer() {

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return `
    <div class="timer">
      ⏱ ${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}
    </div>
  `;

}
