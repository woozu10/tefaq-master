let played = false;

export function resetAudio() {

  played = false;

  speechSynthesis.cancel();

}

function getBestFrenchVoice() {

  const voices = speechSynthesis.getVoices();

  return (

    voices.find(v =>
      v.name.includes("Microsoft Denise")
    ) ||

    voices.find(v =>
      v.name.includes("Microsoft Claude")
    ) ||

    voices.find(v =>
      v.name.includes("Microsoft Sylvie")
    ) ||

    voices.find(v =>
      v.name.includes("Microsoft Henri")
    ) ||

    voices.find(v =>
      v.lang === "fr-CA"
    ) ||

    voices.find(v =>
      v.lang === "fr-FR"
    ) ||

    null

  );

}

export function AudioPlayer(transcript) {

  window.currentTranscript = transcript;

  return `

    <div style="display:flex;gap:10px;flex-wrap:wrap;">

      <button onclick="playAudio()">
        🔊 Play
      </button>

      <button onclick="stopAudio()">
        ⏹ Stop
      </button>

      <select id="speechRate">

        <option value="0.8">0.8x</option>

        <option value="0.9">0.9x</option>

        <option value="1" selected>1.0x</option>

        <option value="1.1">1.1x</option>

        <option value="1.2">1.2x</option>

      </select>

    </div>

  `;

}

window.stopAudio = function () {

  speechSynthesis.cancel();

};

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

  const utterance =
    new SpeechSynthesisUtterance(
      window.currentTranscript
    );

  utterance.lang = "fr-CA";

  const rate =
    Number(
      document.getElementById("speechRate")?.value || 1
    );

  utterance.rate = rate;

  utterance.pitch = 1;

  utterance.volume = 1;

  const voice =
    getBestFrenchVoice();

  if (voice) {

    utterance.voice = voice;

    console.log("Voice :", voice.name);

  }

  utterance.onend = function () {

    played = true;

  };

  speechSynthesis.speak(utterance);

};

speechSynthesis.onvoiceschanged = function () {

  speechSynthesis.getVoices();

};
