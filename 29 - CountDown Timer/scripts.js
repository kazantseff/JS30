const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

let countdown;

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(function () {
    let secondsLeft = Math.round((then - Date.now()) / 1000); // So every seconds this interval runs we subtract the Date.now()
    // Every seconds this function runs the Date.now() is getting seconds closer to 'then' variable
    // Making it countdown to zero
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  timerDisplay.innerHTML = `${minutes}:${remainderSeconds}`;
}

function displayEndTime(seconds) {
  let minutes = Math.floor(seconds / 60000);
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  hours = hours % 24;
  endTime.innerHTML = `${hours}:${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset;
});
