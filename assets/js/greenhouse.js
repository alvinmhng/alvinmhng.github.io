import { $, ready } from './lab-common.js';

let seed, initialSeed;
const newSeed = () => crypto.getRandomValues(new Uint32Array(1))[0];
function randomFrom(value) {
  return () => {value=(Math.imul(value,1664525)+1013904223)>>>0;return value/4294967296;};
}
function render() {
  const random=randomFrom(seed),height=Number($('height').value),branches=Number($('branches').value),colour=$('colour').value;
  $('height-value').textContent=height;$('branches-value').textContent=branches;
  const top=290-(height-30)*2, sway=(random()-.5)*38;
  let shapes='<rect width="800" height="560" fill="#DDF4FF"/><circle cx="620" cy="113" r="53" fill="#FFD45A" opacity=".5"/><path d="M105 40v420M695 40v420M100 285h600" stroke="#fff" stroke-width="12"/><ellipse cx="400" cy="513" rx="140" ry="14" fill="#183044" opacity=".1"/>';
  const stemX = y => 400 + sway * (448-y)/(448-top);
  shapes+=`<g stroke="#183044" stroke-width="3" stroke-linejoin="round"><path d="M400 448L${400+sway} ${top}" fill="none" stroke="#397B57" stroke-width="9"/>`;
  function flower(x,y,r) {
    let markup=`<g class="flower-head" transform="translate(${x} ${y})" fill="${colour}">`;
    // Separate rounded petals radiate around a contrasting pollen centre.
    for(let i=0;i<10;i++)markup+=`<ellipse cx="0" cy="${-r*.64}" rx="${r*.19}" ry="${r*.39}" transform="rotate(${i*36})"/>`;
    markup+=`<circle r="${r*.31}" fill="${colour==='#FFD45A'?'#9B572F':'#FFD45A'}"/>`;
    for(const [dx,dy] of [[-6,-4],[5,-6],[0,5]])markup+=`<circle cx="${dx}" cy="${dy}" r="2" fill="#183044" stroke="none" opacity=".55"/>`;
    return markup+'</g>';
  }
  for(let i=0;i<branches;i++) {
    const t=(i+1)/(branches+1),y=429-t*(429-top-58),direction=i%2 ? 1 : -1;
    const x=stemX(y),length=48+random()*24;
    const leafScale=Math.min(1,(429-top-58)/(branches+1)/16);
    const ex=x+direction*length,ey=y-23*leafScale;
    shapes+=`<g class="leaf-branch"><path d="M${x} ${y}Q${x+direction*length*.45} ${y-43*leafScale} ${ex} ${ey}Q${x+direction*length*.65} ${y+10*leafScale} ${x} ${y}Z" fill="${i%2?'#65A66D':'#81B87B'}"/><path d="M${x} ${y}Q${x+direction*length*.5} ${y-13*leafScale} ${ex} ${ey}" fill="none" stroke="#397B57" stroke-width="2"/></g>`;
  }
  shapes+=flower(400+sway,top,52+random()*5);
  shapes+='<path d="m335 442 18 66h94l18-66" fill="#FFD45A"/><rect x="326" y="430" width="148" height="22" rx="6" fill="#FFD45A"/><path d="M367 465v24" stroke="#fff" stroke-width="6"/></g>';
  $('plant').innerHTML=`<title>An odd little flowering plant</title><desc>A ${height}-height plant with ${branches} branches and ${$('colour').selectedOptions[0].text.toLowerCase()} flowers.</desc>${shapes}`;
}
for(const id of ['height','branches','colour'])$(id).addEventListener('input',render);
$('grow').addEventListener('click',()=>{seed=newSeed();render();$('status').textContent='A new seed. A different possibility.';});
$('save').addEventListener('click',()=>{
  const clone=$('plant').cloneNode(true);
  clone.setAttribute('xmlns','http://www.w3.org/2000/svg');clone.setAttribute('width','800');clone.setAttribute('height','560');clone.removeAttribute('id');
  const blob=new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml;charset=utf-8'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`alvins-plant-${seed}.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $('status').textContent='Your plant is ready to save as an SVG.';
});
$('reset').addEventListener('click',()=>{seed=initialSeed;$('height').value=65;$('branches').value=5;$('colour').value='#F87562';render();$('status').textContent='Back to your first plant.';});
seed=initialSeed=newSeed();ready();render();$('status').textContent='Your first seed is planted. Try changing a branch.';
