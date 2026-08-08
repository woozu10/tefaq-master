function escapeHtml(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


export function JsonPreview(q) {

  if (!q) {
    return "";
  }

  return `

    <div class="card">

      <h2>👁 Question Preview</h2>

      <p>
        <strong>
          #${escapeHtml(q.id)}
          · ${escapeHtml(q.category)}
          · ${escapeHtml(q.level)}
        </strong>
      </p>

      <hr>

      <button onclick="adminPlayPreviewAudio()">
        🔊 Play Audio
      </button>

      <button onclick="adminStopPreviewAudio()">
        ⏹ Stop
      </button>

      <br><br>

      <h3>
        ${escapeHtml(q.question)}
      </h3>

      <div>

        ${q.choices.map(
          (choice, index) => `

            <div
              style="
                padding:12px;
                margin:8px 0;
                border:1px solid #ddd;
                border-radius:8px;

                ${
                  index === q.answer
                    ? "background:#e8f5e9;"
                    : ""
                }
              "
            >

              <strong>
                ${String.fromCharCode(65 + index)}.
              </strong>

              ${escapeHtml(choice)}

              ${
                index === q.answer
                  ? " ✅"
                  : ""
              }

            </div>

          `
        ).join("")}

      </div>

      <hr>

      <h3>📖 Explanation</h3>

      <p>
        ${escapeHtml(
          q.explanation ||
          "No explanation."
        )}
      </p>

      ${
        Array.isArray(q.vocabulary) &&
        q.vocabulary.length > 0

          ? `

            <hr>

            <h3>📚 Vocabulary</h3>

            <ul>

              ${q.vocabulary
                .map(
                  word =>
                    `<li>${escapeHtml(word)}</li>`
                )
                .join("")}

            </ul>

          `

          : ""
      }

    </div>

  `;

}
