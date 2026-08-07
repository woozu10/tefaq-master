export function AudioPlayer(audio) {

  return `
    <button onclick="playAudio('${audio}')">
      🔊 Play Audio
    </button>
  `;

}

window.playAudio = function(audio){

  const player = new Audio(audio);

  player.play();

}
