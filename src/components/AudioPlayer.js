export function AudioPlayer(audio) {

  return `
    <div class="card">

      <button onclick="playAudio()">
        🔊 Play Audio
      </button>

    </div>
  `;

}

window.playAudio = function() {

  alert("MP3 will be played here.");

}
