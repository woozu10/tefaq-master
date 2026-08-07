export function AudioPlayer(audio) {

  return `
    <div class="audio-player">

      <audio controls preload="none">

        <source src="${audio}" type="audio/mpeg">

        Your browser does not support audio.

      </audio>

    </div>
  `;

}
