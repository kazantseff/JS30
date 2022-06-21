const triggers = document.querySelectorAll(".cool > li");
const background = document.querySelector(".dropdownBackground");
const nav = document.querySelector(".top");

function handleEnter() {
  this.classList.add("trigger-enter");
  setTimeout(
    () =>
      this.classList.contains("trigger-enter") && // Basically the IF statement
      this.classList.add("trigger-enter-active"),
    120
  ); //Setting timeout so opacity will appear after some time to make it look nicer
  const navCoords = nav.getBoundingClientRect();
  const dropdownCords = this.querySelector(".dropdown").getBoundingClientRect();
  const coords = {
    // We can't assume that everything is going to be anchored to the top of the actual page
    // Navigation is pushed down by the <h2> in our case
    // We get the coordinates of the nav
    // And offset the dropdown coords with the nav.top
    // So if the top.nav is "30px" we know that is was bumped down 30px
    // So the top of dropdown needs to be moved UP 30px
    width: dropdownCords.width,
    height: dropdownCords.height,
    top: dropdownCords.top - navCoords.top,
    left: dropdownCords.left - navCoords.left,
  };
  background.classList.add("open");
  background.style.width = `${coords.width}px`;
  background.style.height = `${coords.height}px`;
  background.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

function handleLeave() {
  this.classList.remove("trigger-enter", "trigger-enter-active");
  background.classList.remove("open");
}

triggers.forEach((trigger) =>
  trigger.addEventListener("mouseenter", handleEnter)
);
triggers.forEach((trigger) =>
  trigger.addEventListener("mouseleave", handleLeave)
);
