const video = document.querySelector("video");
const playBtn = document.querySelector(".toggle");
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackSlider = document.querySelector('input[name="playbackRate"]');
const buttons = document.querySelectorAll("button[data-skip]"); // Two button to go back and forth
const player = document.querySelector(".player");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress div");
const fullscreenBtn = document.querySelector(".fullscreen");

function playPause() {
  if (video.paused) {
    video.play();
    playBtn.textContent = "►";
  } else {
    video.pause();
    playBtn.textContent = "\u23F8";
  }

  if (playBtn.textContent === "►") {
    playBtn.textContent = "\u23F8";
  } else {
    playBtn.textContent = "►";
  }
}

function changeVolume() {
  let value = this.value;
  video.volume = value;
}

function changeSpeed() {
  let value = this.value;
  video.playbackRate = value;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    videoCurrentTime = video.currentTime; // Set the video current time to a variable to change it going forward
    if (button.getAttribute("data-skip") === -10) {
      video.currentTime = videoCurrentTime - 10;
    } else {
      video.currentTime = videoCurrentTime + 25;
    }
  });
});

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleFullscreen() {
  video.requestFullscreen();
}

video.addEventListener("click", playPause);
video.addEventListener("timeupdate", handleProgress);
playBtn.addEventListener("click", playPause);
volumeSlider.addEventListener("input", changeVolume);
playbackSlider.addEventListener("input", changeSpeed);
video.addEventListener("dblclick", () => video.requestFullscreen());

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e)); // If the first variable in x && y is true => move to second variable
// Essentially the if() statement;
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
fullscreenBtn.addEventListener("click", handleFullscreen);
