import { $, ready } from './lab-common.js';

let seed, initialSeed;
const fields=['height','branches','colour','variety','bloom'];
const history=[];
const storageKey='alvin-greenhouse-v1';
let lastState;
const snapshot=()=>({seed,...Object.fromEntries(fields.map(id=>[id,$(id).value]))});
function apply(state){seed=state.seed;for(const id of fields)$(id).value=state[id];render();lastState=snapshot();}
function remember(){history.push(lastState);if(history.length>40)history.shift();$('undo').disabled=false;}
function valid(s){return s&&Number.isInteger(s.seed)&&s.seed>=0&&s.seed<=4294967295&&['daisy','sunflower','cosmos'].includes(s.variety)&&['#F87562','#FFD45A','#2864DC'].includes(s.colour)&&[['height',30,100],['branches',2,9],['bloom',0,100]].every(([key,min,max])=>s[key]!==''&&Number.isFinite(Number(s[key]))&&Number(s[key])>=min&&Number(s[key])<=max&&Number.isInteger(Number(s[key])));}
const newSeed = () => crypto.getRandomValues(new Uint32Array(1))[0];
function randomFrom(value) {
  return () => {value=(Math.imul(value,1664525)+1013904223)>>>0;return value/4294967296;};
}
function render() {
  const random=randomFrom(seed),height=Number($('height').value),branches=Number($('branches').value),colour=$('colour').value;
  $('height-value').textContent=height;$('branches-value').textContent=branches;
  const bloom=Number($('bloom').value)/100,variety=$('variety').value;
  $('bloom-value').textContent=`${Math.round(bloom*100)}%`;
  const top=290-(height-30)*2, sway=(random()-.5)*38;
  let shapes=`<defs><clipPath id="greenhouse-window"><path d="M170 390V150Q170 45 275 45H525Q630 45 630 150V390Z"/></clipPath></defs>
    <rect width="800" height="560" fill="#EDF7FA"/>
    <g clip-path="url(#greenhouse-window)">
      <rect x="170" y="45" width="460" height="345" fill="#BCE2F4"/>
      <circle cx="547" cy="112" r="28" fill="#FFD45A"/>
      <path d="M207 151Q207 139 220 139Q221 120 239 122Q256 122 258 139Q278 137 278 151Z" fill="#fff"/>
      <path d="M502 203Q502 192 515 192Q519 175 535 180Q549 179 553 193Q571 191 573 203Z" fill="#fff"/>
      <path d="M150 350Q252 285 348 345T650 318V400H150Z" fill="#99BCAC"/>
      <path d="M150 383Q310 330 440 373T650 357V400H150Z" fill="#729F8A"/>
      <path d="M285 45V390M515 45V390M170 263H630" fill="none" stroke="#7599AB" stroke-width="3"/>
    </g>
    <path d="M170 390V150Q170 45 275 45H525Q630 45 630 150V390Z" fill="none" stroke="#183044" stroke-width="4"/>
    <rect x="158" y="390" width="484" height="13" rx="4" fill="#fff" stroke="#183044" stroke-width="3"/>
    <path d="M118 524V560M682 524V560" stroke="#183044" stroke-width="10"/>
    <rect x="90" y="508" width="620" height="17" rx="5" fill="#E7C989" stroke="#183044" stroke-width="3"/>
    <ellipse cx="400" cy="510" rx="92" ry="6" fill="#183044" opacity=".12"/>`;
  const stemX = y => 400 + sway * (448-y)/(448-top);
  shapes+=`<g stroke="#183044" stroke-width="3" stroke-linejoin="round"><path d="M400 448L${400+sway} ${top}" fill="none" stroke="#397B57" stroke-width="9"/>`;
  function flower(x,y,r) {
    if(bloom===0)return `<g class="flower-head" transform="translate(${x} ${y})"><path d="M0 19Q-23 6-12-18Q0-34 12-18Q23 6 0 19Z" fill="${colour}"/><path d="M0 19Q-19 7-19-5L0 6L19-5Q19 7 0 19Z" fill="#65A66D"/></g>`;
    const petals=variety==='sunflower'?16:variety==='cosmos'?8:10;
    const spread=.3+.7*bloom;
    let markup=`<g class="flower-head" transform="translate(${x} ${y})" fill="${colour}">`;
    // Separate rounded petals radiate around a contrasting pollen centre.
    for(let i=0;i<petals;i++)markup+=`<ellipse cx="0" cy="${-r*.64*spread}" rx="${r*(variety==='cosmos'?.28:variety==='sunflower'?.13:.19)*spread}" ry="${r*.39*spread}" transform="rotate(${i*360/petals})"/>`;
    markup+=`<circle r="${r*(variety==='sunflower'?.43:.31)*spread}" fill="${variety==='sunflower'||colour==='#FFD45A'?'#9B572F':'#FFD45A'}"/>`;
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
  const description=`${$('variety').selectedOptions[0].text}, ${branches} leaves, ${Math.round(bloom*100)}% open, ${$('colour').selectedOptions[0].text.toLowerCase()} petals.`;
  $('plant').setAttribute('aria-label',description);
  $('plant').innerHTML=`<title>Your ${variety}</title><desc>${description}</desc>${shapes}`;
}
for(const id of fields)$(id).addEventListener('input',()=>{remember();if(id==='variety')$('colour').value=$('variety').value==='sunflower'?'#FFD45A':'#F87562';render();lastState=snapshot();});
$('grow').addEventListener('click',()=>{remember();seed=newSeed();render();lastState=snapshot();$('status').textContent='A new plant with your chosen settings. Undo brings the previous one back.';});
$('undo').addEventListener('click',()=>{if(!history.length)return;apply(history.pop());$('undo').disabled=!history.length;$('status').textContent='Previous plant restored.';});
$('keep').addEventListener('click',()=>{try{localStorage.setItem(storageKey,JSON.stringify(snapshot()));$('restore').disabled=false;$('status').textContent='Saved in this browser. You can restore it after reopening the page.';}catch{$('status').textContent='Browser storage is unavailable. Use Save SVG to keep your artwork.';}});
$('restore').addEventListener('click',()=>{try{const saved=JSON.parse(localStorage.getItem(storageKey));if(!valid(saved))throw new Error('Invalid plant');remember();apply(saved);$('status').textContent='Your saved plant is back.';}catch{$('status').textContent='No readable saved plant was found. Your current plant is unchanged.';}});
$('save').addEventListener('click',()=>{
  const clone=$('plant').cloneNode(true);
  clone.setAttribute('xmlns','http://www.w3.org/2000/svg');clone.setAttribute('width','800');clone.setAttribute('height','560');clone.removeAttribute('id');
  const blob=new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml;charset=utf-8'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`alvins-plant-${seed}.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $('status').textContent='Your plant is ready to save as an SVG.';
});
$('reset').addEventListener('click',()=>{remember();apply({seed:initialSeed,height:'65',branches:'5',colour:'#F87562',variety:'daisy',bloom:'100'});$('status').textContent='Back to your first plant. Your saved favourite is unchanged.';});
seed=initialSeed=newSeed();ready();render();lastState=snapshot();
try{$('restore').disabled=!valid(JSON.parse(localStorage.getItem(storageKey)));}catch{$('restore').disabled=true;}
$('status').textContent='Try a flower variety, or move Bloom to watch a bud open.';
