let played = false;

export function resetAudio() {

  played = false;

}

export function AudioPlayer(audio) {

  return `

    <button onclick="playAudio()">

      🔊 Play Audio

    </button>

    <audio id="exam-audio">

      <source src="${audio}" type="audio/mpeg">

    </audio>

  `;

}

window.playAudio = async function () {

  if (played) {

    alert("Audio can only be played once.");

    return;

  }

  const player = document.getElementById("exam-audio");

  try {

    await player.play();

    played = true;

  } catch (e) {

    console.error(e);

    alert("Unable to play audio.");

  }

};
