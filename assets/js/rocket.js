import { $, motion, ready, canvasScene, animate } from './lab-common.js';

const {ctx}=canvasScene();
const ground=463, origin=70, gravity=42;
let flight, trail, running=false, paused=false;
function labels(){ $('angle-value').textContent=`${$('angle').value}°`;$('power-value').textContent=$('power').value; }
function controls(){ $('launch').disabled=running;$('pause').disabled=!running;$('pause').textContent=paused?'Resume flight':'Pause flight'; }
function reset(){running=false;paused=false;flight={x:0,y:0,vx:0,vy:0,max:0};trail=[];$('angle').value=55;$('power').value=55;labels();stats();controls();$('status').textContent='On the launch stand. Ready when you are.';}
function stats(){ $('max-height').textContent=flight.max.toFixed(1);$('distance').textContent=flight.x.toFixed(1); }
function launch(){ const angle=Number($('angle').value)*Math.PI/180,power=Number($('power').value)*1.65;flight={x:0,y:0,vx:Math.cos(angle)*power,vy:Math.sin(angle)*power,max:0};trail=[{x:0,y:0}];running=true;paused=false;controls();$('status').textContent='Liftoff. Let’s see where this goes.'; }
function finish(reason){running=false;paused=false;controls();stats();$('status').textContent=`${reason} Distance ${flight.x.toFixed(1)}, maximum height ${flight.max.toFixed(1)} toy units. Try another launch.`;}
function update(dt){
  if(!running||paused||!dt)return;
  const previous={...flight};
  flight.x+=flight.vx*dt;flight.y+=flight.vy*dt-.5*gravity*dt*dt;flight.vy-=gravity*dt;flight.max=Math.max(flight.max,flight.y);
  if(flight.y<0){const fraction=previous.y/(previous.y-flight.y);flight.x=previous.x+(flight.x-previous.x)*fraction;flight.y=0;finish('Touchdown.');}
  else if(flight.x>350 || flight.y>215)finish('Out of the little picture.');
  trail.push({x:flight.x,y:flight.y});if(trail.length>1200)trail.shift();stats();
}
function draw(){
  ctx.clearRect(0,0,800,560);ctx.fillStyle='#DDF4FF';ctx.fillRect(0,0,800,560);
  ctx.fillStyle='#FFD45A';ctx.beginPath();ctx.arc(665,87,37,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff';for(const [x,y] of [[190,90],[500,156]]){ctx.beginPath();ctx.roundRect(x,y,95,24,12);ctx.fill();ctx.beginPath();ctx.arc(x+40,y,22,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle='#c2e2ee';ctx.beginPath();ctx.moveTo(0,ground);ctx.quadraticCurveTo(190,345,345,ground);ctx.quadraticCurveTo(570,370,800,ground);ctx.fill();
  ctx.fillStyle='#fff9';ctx.fillRect(0,ground,800,97);ctx.strokeStyle='#183044';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,ground);ctx.lineTo(800,ground);ctx.stroke();
  ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillStyle='#35556a';for(let i=0;i<=300;i+=50){const x=origin+i*2;ctx.beginPath();ctx.moveTo(x,ground);ctx.lineTo(x,ground+8);ctx.stroke();ctx.fillText(String(i),x,ground+28);}
  ctx.strokeStyle='#2864DC';ctx.lineWidth=3;ctx.setLineDash([5,7]);ctx.beginPath();trail.forEach((p,i)=>{const x=origin+p.x*2,y=ground-p.y*2;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();ctx.setLineDash([]);
  const x=origin+flight.x*2,y=ground-flight.y*2;
  const angle=running||trail.length ? Math.atan2(-flight.vy,flight.vx) : -Number($('angle').value)*Math.PI/180;
  ctx.save();ctx.translate(x,y-13);ctx.rotate(angle+Math.PI/2);ctx.strokeStyle='#183044';ctx.lineWidth=2.5;
  if(running&&!paused){ctx.fillStyle='#FFD45A';ctx.beginPath();ctx.moveTo(-6,15);ctx.lineTo(0,30);ctx.lineTo(6,15);ctx.fill();ctx.stroke();}
  ctx.fillStyle='#2864DC';ctx.beginPath();ctx.moveTo(-8,2);ctx.lineTo(-17,18);ctx.lineTo(17,18);ctx.lineTo(8,2);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='white';ctx.beginPath();ctx.moveTo(-8,17);ctx.lineTo(-8,-9);ctx.quadraticCurveTo(-6,-24,0,-30);ctx.quadraticCurveTo(6,-24,8,-9);ctx.lineTo(8,17);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#F87562';ctx.beginPath();ctx.moveTo(-7,-13);ctx.lineTo(0,-30);ctx.lineTo(7,-13);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#DDF4FF';ctx.beginPath();ctx.arc(0,-3,4,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore();
}
$('launch').addEventListener('click',launch);
$('pause').addEventListener('click',()=>{paused=!paused;controls();$('status').textContent=paused?'Flight paused.':'Flight resumed.';});
for(const id of ['angle','power'])$(id).addEventListener('input',labels);
$('reset').addEventListener('click',reset);
motion.addEventListener('change',()=>{if(motion.matches&&running){paused=true;controls();$('status').textContent='Paused for reduced motion. Resume when you like.';}});
ready();reset();animate(update,draw);
