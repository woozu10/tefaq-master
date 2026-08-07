export function AudioPlayer(audio) {

  return `
    <div class="audio-player">

      <button id="play-btn" onclick="playAudio('${audio}')">
        🔊 Play Audio
      </button>

      <audio id="audio-player">
        <source src="${audio}" type="audio/mpeg">
      </audio>

    </div>
  `;

}

window.playAudio = function(audio){

  const player = document.getElementById("audio-player");
  const button = document.getElementById("play-btn");

  player.play();

  button.disabled = true;
  button.innerText = "▶ Playing...";

  player.onended = () => {

    button.innerText = "✔ Played";

  };

}
