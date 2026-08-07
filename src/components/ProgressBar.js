export function ProgressBar(current, total) {

  const percent = Math.round((current / total) * 100);

  return `
    <div
class="progress-fill"
style="width:${percent}%">
</div>

      <div
        class="progress-fill"
        style="width:${percent}%">
      </div>

    </div>

    <p>
      Question ${current} / ${total}
    </p>
  `;
}
