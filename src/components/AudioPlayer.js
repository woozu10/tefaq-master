let played = false;

export function resetAudio() {

  played = false;

  speechSynthesis.cancel();

}

export function AudioPlayer(transcript) {

  window.currentTranscript = transcript;

  return `

    <button onclick="playAudio()">

      🔊 Play Audio

    </button>

  `;

}

window.playAudio = function () {

  if (played) {

    alert("Audio can only be played once.");

    return;

  }

  if (!window.currentTranscript) {

    alert("No transcript.");

    return;

  }

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(
    window.currentTranscript
  );

  utterance.lang = "fr-CA";

  utterance.rate = 1.0;

  utterance.pitch = 1.0;

  utterance.onend = function () {

    played = true;

  };

  speechSynthesis.speak(utterance);

};
