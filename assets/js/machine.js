(() => {
  'use strict';
  const machine = document.querySelector('.machine');
  const controls = document.querySelector('.controls');
  const push = document.querySelector('.push-button');
  const reset = document.querySelector('.reset-button');
  const readout = document.querySelector('.readout');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const messages = {
    balls: 'A handful of happy accidents.',
    flower: 'Oh, look. Something grew.',
    rocket: 'A very small step for a very small rocket.'
  };
  let queue = [];
  let previous = null;
  let timer = null;
  let running = false;

  function nextSurprise() {
    if (!queue.length) {
      queue = Object.keys(messages);
      for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queue[i], queue[j]] = [queue[j], queue[i]];
      }
      if (queue[0] === previous) [queue[0], queue[1]] = [queue[1], queue[0]];
    }
    previous = queue.shift();
    return previous;
  }

  function finish() {
    clearTimeout(timer);
    timer = null;
    running = false;
    machine.classList.remove('is-running');
    push.disabled = false;
    readout.textContent = messages[machine.dataset.state];
  }

  push.addEventListener('click', () => {
    if (running) return;
    machine.dataset.state = nextSurprise();
    if (motion.matches) { finish(); return; }
    running = true;
    push.disabled = true;
    readout.textContent = 'One moment. A little nonsense is on its way…';
    machine.classList.add('is-running');
    timer = setTimeout(finish, 3000);
  });

  reset.addEventListener('click', () => {
    clearTimeout(timer);
    timer = null;
    running = false;
    queue = [];
    machine.classList.remove('is-running');
    machine.dataset.state = 'idle';
    push.disabled = false;
    readout.textContent = 'Nothing yet. That’s where you come in.';
  });
  motion.addEventListener('change', () => { if (motion.matches && running) finish(); });
  controls.hidden = false;
})();
