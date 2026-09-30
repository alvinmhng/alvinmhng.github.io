import './machine.js';

const handle = document.querySelector('.star-handle');
const drawer = document.querySelector('#secret-drawer');
handle.hidden = false;
handle.addEventListener('click', () => {
  const open = handle.getAttribute('aria-expanded') !== 'true';
  handle.setAttribute('aria-expanded', String(open));
  handle.setAttribute('aria-label', `${open ? 'Close' : 'Open'} the little star drawer`);
  drawer.hidden = !open;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !drawer.hidden) {
    drawer.hidden = true;
    handle.setAttribute('aria-expanded', 'false');
    handle.setAttribute('aria-label', 'Open the little star drawer');
    handle.focus();
  }
});
