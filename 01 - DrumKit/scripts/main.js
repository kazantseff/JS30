function playSound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; // Stops the function from running 
    audio.currentTime = 0; // Rewind to the start before playing
    audio.play();
    key.classList.add('playing');
}

const keys = document.querySelectorAll('.key');

keys.forEach(key =>{
    key.addEventListener('transitionend', () => key.classList.remove('playing'));
});

window.addEventListener('keydown', playSound);