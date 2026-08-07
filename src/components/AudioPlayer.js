let played = false;

export function resetAudio() {

  played = false;

}

export function AudioPlayer(audio) {

  return `

    <button onclick="playAudio('${audio}')">

      🔊 Play Audio

    </button>

    <audio id="exam-audio">

      <source src="${audio}" type="audio/mpeg">

    </audio>

  `;

}

window.playAudio = function(audio) {

  if (played) {

    alert("Audio can only be played once.");

    return;

  }

  played = true;

  document.getElementById("exam-audio").play();

};
