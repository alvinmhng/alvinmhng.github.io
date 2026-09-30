import { $, colours, motion, ready, canvasScene, animate } from './lab-common.js';

const {canvas, ctx} = canvasScene();
const bounds = {left:65, right:735, top:48, bottom:510};
let balls = [], paused = motion.matches, drag = null;
const radius = 22;
function addBall() {
  if (balls.length >= 20) return;
  const index = balls.length;
  // A separated grid also makes rapid additions predictable.
  balls.push({x:140 + index % 7 * 83, y:105 + Math.floor(index / 7) * 78,
    vx:(index % 2 ? 1 : -1) * 55, vy:0, r:radius, colour:colours[index % colours.length]});
  updateControls();
}
function updateControls() {
  $('ball-count').textContent = `${balls.length} / 20 balls`;
  $('add').disabled = balls.length >= 20;
  $('pause').textContent = paused ? 'Play' : 'Pause';
}
function gravityLabel() {
  const value = Number($('gravity').value);
  $('gravity-value').textContent = value === 0 ? 'Zero gravity' : `${value < 0 ? 'Upward' : 'Downward'} · ${Math.abs(value).toFixed(1)}`;
}
function release() {
  if (!drag) return;
  if (canvas.hasPointerCapture(drag.pointerId)) canvas.releasePointerCapture(drag.pointerId);
  drag = null;
}
function reset() {
  release(); balls = []; paused = motion.matches;
  $('gravity').value = 1;
  for (let i=0; i<3; i++) addBall();
  gravityLabel(); updateControls();
  $('status').textContent = paused ? 'Ready when you are. Press Play to start.' : 'Drag a ball, or give them all a nudge.';
}
function contain(ball) {
  const {left,right,top,bottom} = bounds;
  if (ball.x < left+ball.r) {ball.x=left+ball.r;ball.vx=Math.abs(ball.vx)*.8;}
  if (ball.x > right-ball.r) {ball.x=right-ball.r;ball.vx=-Math.abs(ball.vx)*.8;}
  if (ball.y < top+ball.r) {ball.y=top+ball.r;ball.vy=Math.abs(ball.vy)*.8;}
  if (ball.y > bottom-ball.r) {ball.y=bottom-ball.r;ball.vy=-Math.abs(ball.vy)*.8;}
}
function update(dt) {
  if (paused || !dt) return;
  // Small substeps keep fast throws from skipping collisions.
  const steps = Math.ceil(dt / (1/180)), step = dt / steps;
  for (let n=0;n<steps;n++) {
    for (const b of balls) {
      if (drag?.ball === b) continue;
      b.vy += Number($('gravity').value) * 600 * step;
      b.x += b.vx * step; b.y += b.vy * step;
      b.vx *= Math.exp(-.12*step); b.vy *= Math.exp(-.05*step);
      contain(b);
    }
    for (let i=0;i<balls.length;i++) for (let j=i+1;j<balls.length;j++) {
      const a=balls[i],b=balls[j],dx=b.x-a.x,dy=b.y-a.y;
      const distance=Math.hypot(dx,dy), overlap=a.r+b.r-distance;
      if (overlap<=0) continue;
      const nx=distance ? dx/distance : 1, ny=distance ? dy/distance : 0;
      const wa=drag?.ball===a ? 0 : 1, wb=drag?.ball===b ? 0 : 1, weight=wa+wb;
      if (!weight) continue;
      a.x-=nx*overlap*wa/weight;a.y-=ny*overlap*wa/weight;
      b.x+=nx*overlap*wb/weight;b.y+=ny*overlap*wb/weight;
      const velocity=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
      if (velocity<0) {
        const impulse=-(1+.85)*velocity/weight;
        a.vx-=impulse*nx*wa;a.vy-=impulse*ny*wa;
        b.vx+=impulse*nx*wb;b.vy+=impulse*ny*wb;
      }
      contain(a);contain(b);
    }
  }
}
function draw() {
  ctx.clearRect(0,0,800,560);
  ctx.fillStyle='#DDF4FF';ctx.fillRect(0,0,800,560);
  ctx.fillStyle='#ffffff99';ctx.strokeStyle='#183044';ctx.lineWidth=4;
  ctx.beginPath();ctx.roundRect(63,46,674,466,25);ctx.fill();ctx.stroke();
  ctx.fillStyle='#FFD45A';ctx.beginPath();ctx.roundRect(54,28,692,23,7);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#fff';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(86,80);ctx.lineTo(86,177);ctx.stroke();
  for (const b of balls) {
    ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fillStyle=b.colour;ctx.fill();ctx.lineWidth=3;ctx.strokeStyle='#183044';ctx.stroke();
    ctx.beginPath();ctx.arc(b.x-3,b.y-3,b.r*.6,Math.PI,Math.PI*1.5);ctx.strokeStyle='#fff9';ctx.lineWidth=4;ctx.stroke();
  }
  if(paused){ctx.fillStyle='#183044';ctx.font='16px system-ui';ctx.textAlign='center';ctx.fillText('Paused · arrange a ball, then press Play',400,542);}
}
function point(event) {
  const rect=canvas.getBoundingClientRect();
  return {x:(event.clientX-rect.left)*800/rect.width,y:(event.clientY-rect.top)*560/rect.height};
}
canvas.addEventListener('pointerdown',event=>{
  if (drag) return;
  const p=point(event),ball=[...balls].reverse().find(b=>Math.hypot(p.x-b.x,p.y-b.y)<=b.r+8);
  if(!ball) return;
  canvas.setPointerCapture(event.pointerId);
  drag={ball,pointerId:event.pointerId,time:event.timeStamp};ball.vx=ball.vy=0;
});
canvas.addEventListener('pointermove',event=>{
  if(!drag || event.pointerId!==drag.pointerId)return;
  const p=point(event),b=drag.ball,dt=Math.max((event.timeStamp-drag.time)/1000,.008);
  const x=Math.max(bounds.left+b.r,Math.min(bounds.right-b.r,p.x));
  const y=Math.max(bounds.top+b.r,Math.min(bounds.bottom-b.r,p.y));
  b.vx=Math.max(-900,Math.min(900,(x-b.x)/dt));b.vy=Math.max(-900,Math.min(900,(y-b.y)/dt));
  b.x=x;b.y=y;drag.time=event.timeStamp;
});
canvas.addEventListener('pointerup',event=>{if(drag?.pointerId===event.pointerId){if(event.timeStamp-drag.time>100)drag.ball.vx=drag.ball.vy=0;release();}});
canvas.addEventListener('pointercancel',release);
canvas.addEventListener('lostpointercapture',()=>{drag=null;});
$('add').addEventListener('click',()=>{addBall();$('status').textContent=balls.length===20?'The jar is full. Twenty is plenty.':`${balls.length} balls in the jar.`;});
$('scatter').addEventListener('click',()=>{balls.forEach(b=>{b.vx=(Math.random()-.5)*650;b.vy=(Math.random()-.5)*650;});$('status').textContent=paused?'Nudge ready. Press Play to set them moving.':'A little energy goes a long way.';});
$('pause').addEventListener('click',()=>{paused=!paused;updateControls();$('status').textContent=paused?'Paused. You can still arrange the balls.':'The jar is in motion.';});
$('gravity').addEventListener('input',gravityLabel);
$('reset').addEventListener('click',reset);
motion.addEventListener('change',()=>{if(motion.matches){paused=true;updateControls();$('status').textContent='Paused for reduced motion. Press Play whenever you like.';}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)release();});
ready();reset();animate(update,draw);
