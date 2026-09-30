export const colours = ['#F87562', '#2864DC', '#FFD45A'];
export const motion = matchMedia('(prefers-reduced-motion: reduce)');
export const $ = id => document.getElementById(id);
export function ready() {
  document.querySelector('fieldset').disabled = false;
  document.querySelectorAll('.lab-nav a').forEach(link => {
    if (link.pathname === location.pathname) link.setAttribute('aria-current', 'page');
  });
}
export function canvasScene() {
  const canvas = $('scene');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is unavailable');
  // Keep simulation coordinates stable through resize and use device pixels for drawing.
  const resize = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(800 * ratio);
    canvas.height = Math.round(560 * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);
  return {canvas, ctx};
}
export function animate(update, draw) {
  let previous = null;
  draw();
  window.addEventListener('resize', draw);
  function frame(now) {
    const dt = previous === null ? 0 : Math.min((now - previous) / 1000, 1 / 30);
    previous = now;
    if (!document.hidden) { update(dt); draw(); }
    requestAnimationFrame(frame);
  }
  document.addEventListener('visibilitychange', () => { previous = null; });
  requestAnimationFrame(frame);
}
