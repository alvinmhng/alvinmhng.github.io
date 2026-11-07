// A cat lives here. Everything is one inline SVG plus a little bit of physics.

const SVG = `
<svg id="room" xmlns="http://www.w3.org/2000/svg" data-mood="idle" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A cosy illustrated room with a round cat sitting on a cushion in front of a window">
<defs>
  <pattern id="dots" width="56" height="56" patternUnits="userSpaceOnUse">
    <rect width="56" height="56" fill="#f9dccb"/><circle cx="14" cy="14" r="4" fill="#f3c6b3"/><circle cx="42" cy="42" r="4" fill="#f3c6b3"/>
  </pattern>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop id="sky0" offset="0" stop-color="#7fc8f2"/><stop id="sky1" offset="1" stop-color="#d6f1fc"/></linearGradient>
  <clipPath id="glass"><path d="M362 548V300a138 138 0 0 1 276 0v248Z"/></clipPath>
  <path id="bodyShape" d="M392 706C358 622 392 522 500 506C608 522 642 622 608 706Z"/>
  <path id="headShape" d="M374 440C371 362 430 336 500 336C570 336 629 362 626 440C623 506 570 530 500 530C430 530 377 506 374 440Z"/>
  <clipPath id="bodyClip"><use href="#bodyShape"/></clipPath>
  <clipPath id="headClip"><use href="#headShape"/></clipPath>
  <clipPath id="yarnClip"><circle r="26.5"/></clipPath>
  <radialGradient id="lampGlow"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".95"/><stop offset=".45" stop-color="#ffd38a" stop-opacity=".35"/><stop offset="1" stop-color="#ffd38a" stop-opacity="0"/></radialGradient>
  <filter id="blur" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="5"/></filter>
  <path id="heart" d="M0-4C0-11 9-12 10-5 11-12 20-11 20-4 20 4 10 10 10 14 10 10 0 4 0-4Z"/>
  <g id="cloud"><path d="M0 0a18 18 0 0 1 22-22 26 26 0 0 1 46 4 16 16 0 0 1 18 18Z" fill="#fff" class="ink" stroke-width="3"/></g>
</defs>

<!-- wall + floor -->
<rect x="-3000" y="-3000" width="7000" height="3712" fill="url(#dots)"/>
<rect x="-3000" y="704" width="7000" height="20" fill="#fff1e4"/>
<path d="M-3000 704H4000" class="ink" stroke-width="4"/>
<rect x="-3000" y="724" width="7000" height="3000" fill="#eab892"/>
<path d="M-3000 724H4000" class="ink" stroke-width="4"/>
<path d="M-3000 800H4000M-3000 900H4000M-3000 1030H4000M-3000 1190H4000" stroke="#dda37b" stroke-width="4"/>
<path d="M-200 800V900M240 900V1030M820 800V900M560 1030V1190M1300 900V1030" stroke="#dda37b" stroke-width="4"/>

<!-- left: paw frame + plant -->
<g id="pawframe">
  <circle cx="190" cy="455" r="44" fill="#fff4e6" class="ink" stroke-width="5"/>
  <circle cx="190" cy="455" r="33" fill="#cfe8ef"/>
  <g fill="#f5a9b8"><ellipse cx="190" cy="466" rx="13" ry="11"/><circle cx="174" cy="449" r="5.5"/><circle cx="185" cy="441" r="5.5"/><circle cx="197" cy="441" r="5.5"/><circle cx="207" cy="449" r="5.5"/></g>
  <path d="M190 411l-22-38h44Z" fill="none" class="ink" stroke-width="3"/>
</g>
<g id="plant">
  <g class="leaves">
    <path d="M238 640C226 590 200 560 170 548" fill="none" stroke="#5f9e6e" stroke-width="5" stroke-linecap="round"/>
    <path d="M244 640C250 580 262 540 290 516" fill="none" stroke="#5f9e6e" stroke-width="5" stroke-linecap="round"/>
    <path d="M232 640C226 600 232 560 236 520" fill="none" stroke="#5f9e6e" stroke-width="5" stroke-linecap="round"/>
    <path d="M170 548c-34-10-52 18-44 40 22 10 52-6 44-40Z" fill="#86c695" class="ink" stroke-width="4"/>
    <path d="M290 516c30-18 54 4 50 30-22 14-52 2-50-30Z" fill="#7bbd8b" class="ink" stroke-width="4"/>
    <path d="M236 520c-24-30 2-62 22-60 16 22 6 56-22 60Z" fill="#92cf9f" class="ink" stroke-width="4"/>
    <path d="M150 572q10-6 20-24M310 534q14-8 26-18M240 500q6-16 16-36" fill="none" stroke="#5f9e6e" stroke-width="3" stroke-linecap="round"/>
  </g>
  <path d="M196 640h88l-10 74h-68Z" fill="#ee8f6c" class="ink" stroke-width="5"/>
  <rect x="188" y="630" width="104" height="22" rx="8" fill="#f4a483" class="ink" stroke-width="5"/>
</g>

<!-- right: fish picture + side table + lamp -->
<g id="fishframe">
  <rect x="790" y="250" width="132" height="104" rx="12" fill="#fff4e6" class="ink" stroke-width="5"/>
  <rect x="804" y="264" width="104" height="76" rx="6" fill="#bfe3f0"/>
  <path d="M826 302c14-18 40-18 52 0-12 18-38 18-52 0Z" fill="#f7a35c" class="ink" stroke-width="3"/>
  <path d="M878 302l16-12v24Z" fill="#f7a35c" class="ink" stroke-width="3"/>
  <circle cx="840" cy="299" r="2.6" fill="#4b3434"/>
  <path d="M818 284a4 4 0 1 0 0 1M824 272a3 3 0 1 0 0 1" fill="none" stroke="#fff" stroke-width="2.5"/>
  <path d="M856 250l-12-22h24Z" fill="none" class="ink" stroke-width="3"/>
</g>
<g id="table">
  <path d="M808 586v118M914 586v118" class="ink" stroke-width="10"/>
  <path d="M808 586v118M914 586v118" stroke="#c98b63" stroke-width="5"/>
  <rect x="784" y="568" width="154" height="22" rx="8" fill="#d99a70" class="ink" stroke-width="5"/>
  <rect x="836" y="548" width="50" height="22" rx="8" fill="#fff4e6" class="ink" stroke-width="5"/>
  <path d="M861 548v-62" class="ink" stroke-width="5"/>
  <path d="M824 488l14-58h46l14 58Z" fill="#f7d48a" class="ink" stroke-width="5"/>
  <path d="M846 444l-6 32" stroke="#fff6dc" stroke-width="5" stroke-linecap="round"/>
</g>

<!-- window -->
<g id="window">
  <path d="M340 562V300a160 160 0 0 1 320 0v262Z" fill="#fff4e6" class="ink" stroke-width="5"/>
  <g clip-path="url(#glass)">
    <rect x="350" y="130" width="300" height="430" fill="url(#sky)"/>
    <g id="stars" opacity="0" fill="#fff6d6">
      <path d="M400 230l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/><path d="M586 214l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5Z"/>
      <circle cx="440" cy="290" r="2"/><circle cx="530" cy="250" r="2.4"/><circle cx="610" cy="300" r="2"/><circle cx="470" cy="210" r="1.8"/><circle cx="560" cy="330" r="1.6"/><circle cx="385" cy="330" r="1.8"/><circle cx="620" cy="250" r="1.5"/>
    </g>
    <g id="sun"><circle r="40" fill="#fff3b8" opacity=".5"/><circle r="24" fill="#ffd66e" class="ink" stroke-width="3"/></g>
    <g id="moon" opacity="0"><circle r="34" fill="#fff6d6" opacity=".25"/><path d="M4-22a22 22 0 1 0 18 34A19 19 0 0 1 4-22Z" fill="#fff1c4" class="ink" stroke-width="3"/></g>
    <g class="cloud a"><use href="#cloud" transform="translate(0 280) scale(.9)"/></g>
    <g class="cloud b"><use href="#cloud" transform="translate(0 220) scale(.65)"/></g>
    <path id="hillBack" d="M350 500q60-40 120-14t110-6 80 4V560H350Z" fill="#a9d7a0" class="ink" stroke-width="3"/>
    <g id="house"><path d="M574 470h26v-18l-13-12-13 12Z" fill="#fff4e6" class="ink" stroke-width="3"/><rect x="583" y="458" width="8" height="12" fill="#f5a9b8"/></g>
    <path id="hillFront" d="M350 528q80-30 150-4t150 0V560H350Z" fill="#8cc48a" class="ink" stroke-width="3"/>
  </g>
  <path d="M500 164V548M362 384H638" class="ink" stroke-width="18"/>
  <path d="M500 166V548M364 384H636" stroke="#fff4e6" stroke-width="9"/>
  <path d="M362 548V300a138 138 0 0 1 276 0v248Z" fill="none" class="ink" stroke-width="4"/>
  <path d="M384 336q8-70 70-116" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="8" stroke-linecap="round"/>
  <path d="M398 360q2-20 12-36" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="6" stroke-linecap="round"/>
  <rect x="318" y="548" width="364" height="24" rx="10" fill="#fff4e6" class="ink" stroke-width="5"/>
  <path d="M378 548l-4-22h36l-4 22Z" fill="#ee8f6c" class="ink" stroke-width="4"/>
  <path d="M392 526c-8-30 0-44 6-44s14 14 6 44" fill="#86c695" class="ink" stroke-width="4"/>
  <path d="M386 512c-10-2-12-12-8-16 6 0 10 6 8 16Z" fill="#86c695" class="ink" stroke-width="3"/>
  <rect x="604" y="524" width="28" height="24" rx="5" fill="#9fc6e8" class="ink" stroke-width="4"/>
  <path d="M632 530q12 0 10 9t-10 5" fill="none" class="ink" stroke-width="4"/>
  <path d="M612 516q-4-6 0-10t0-10M622 516q-4-6 0-10" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="3" stroke-linecap="round"/>
</g>

<!-- curtains -->
<path d="M262 152H738" class="ink" stroke-width="14"/>
<path d="M262 152H738" stroke="#c98b63" stroke-width="7"/>
<circle cx="256" cy="152" r="11" fill="#c98b63" class="ink" stroke-width="4"/>
<circle cx="744" cy="152" r="11" fill="#c98b63" class="ink" stroke-width="4"/>
<g id="curtainL">
  <path d="M282 152H374C370 250 352 340 348 400C354 470 342 560 320 640H262C282 560 300 470 300 405C290 330 278 240 282 152Z" fill="#f5a9b8" class="ink" stroke-width="5"/>
  <path d="M322 168C320 260 326 340 322 396M300 470C296 540 292 590 286 630M338 470C334 540 324 590 306 630" fill="none" stroke="#e78ea0" stroke-width="4" stroke-linecap="round"/>
  <path d="M298 402q26 14 52-2" fill="none" class="ink" stroke-width="13"/>
  <path d="M298 402q26 14 52-2" fill="none" stroke="#fff4e6" stroke-width="7"/>
</g>
<use href="#curtainL" transform="translate(1000 0) scale(-1 1)"/>

<!-- fairy lights -->
<path d="M290 162Q395 214 500 166Q605 214 710 162" fill="none" class="ink" stroke-width="2.5"/>
<g id="bulbs">
  ${[[342.5, 182], [395, 189], [447.5, 184], [552.5, 184], [605, 189], [657.5, 182]].map(([x, y], i) => {
    const c = ['#ffd66e', '#f48fb1', '#8fd3c9'][i % 3];
    return `<circle class="bulb-glow" cx="${x}" cy="${y + 8}" r="13" fill="${c}" filter="url(#blur)" style="animation-delay:${-i * 0.37}s"/><circle cx="${x}" cy="${y + 8}" r="6" fill="${c}" class="ink" stroke-width="2.5"/>`;
  }).join('')}
</g>

<!-- rug, cushion, bowl -->
<ellipse cx="500" cy="756" rx="306" ry="54" fill="#f7c0c8" class="ink" stroke-width="5"/>
<ellipse cx="500" cy="756" rx="272" ry="38" fill="none" stroke="#fff4e6" stroke-width="4" stroke-dasharray="1 14" stroke-linecap="round"/>
<path d="M314 712C314 672 686 672 686 712C686 750 314 750 314 712Z" fill="#a9cdea" class="ink" stroke-width="5"/>
<path d="M342 700C380 686 620 686 658 700" fill="none" stroke="#d3e7f6" stroke-width="5" stroke-linecap="round"/>
<g id="bowl">
  <ellipse cx="250" cy="795" rx="62" ry="9" fill="#4b3434" opacity=".12"/>
  <path d="M200 758 186 786Q250 804 314 786L300 758Z" fill="#8fc1d4" class="ink" stroke-width="4.5"/>
  <path d="M194 772Q250 788 306 772" fill="none" stroke="#fff4e6" stroke-width="6" stroke-linecap="round" opacity=".9"/>
  <use href="#heart" transform="translate(250 785) scale(.55) translate(-10 -4)" fill="#f2637e"/>
  <ellipse cx="250" cy="758" rx="50" ry="12" fill="#b9dce9" class="ink" stroke-width="4.5"/>
  <ellipse cx="250" cy="759.5" rx="39" ry="7.5" fill="#6aa6bf"/>
  <g fill="#c98b63" class="ink" stroke-width="1.5"><circle cx="236" cy="759" r="4"/><circle cx="247" cy="761" r="4"/><circle cx="258" cy="758" r="4"/><circle cx="267" cy="761" r="3.6"/><circle cx="243" cy="756" r="3.4"/></g>
</g>

<!-- the cat -->
<g id="cat">
  <g id="tail">
    <path d="M596 690C676 700 712 650 690 606C676 578 694 548 720 560" fill="none" class="tail-out" stroke-width="42" stroke-linecap="round"/>
    <path d="M596 690C676 700 712 650 690 606C676 578 694 548 720 560" fill="none" class="tail-in" stroke-width="32" stroke-linecap="round"/>
    <path d="M610 690C676 700 712 650 690 606C676 578 694 548 720 560" fill="none" class="tail-stripe" stroke-width="32" stroke-dasharray="7 24"/>
  </g>
  <g id="legL" class="leg" opacity="0"><path class="tail-out" fill="none" stroke-width="40" stroke-linecap="round"/><path class="tail-in" fill="none" stroke-width="30" stroke-linecap="round"/></g>
  <g id="legR" class="leg" opacity="0"><path class="tail-out" fill="none" stroke-width="40" stroke-linecap="round"/><path class="tail-in" fill="none" stroke-width="30" stroke-linecap="round"/></g>
  <g id="torso">
    <use href="#bodyShape" class="fur"/>
    <g clip-path="url(#bodyClip)">
      <ellipse cx="500" cy="632" rx="62" ry="88" class="chest"/>
      <path class="stripes" d="M396 596q26 8 42-4M392 636q28 8 46-4M392 676q24 6 40-4M604 596q-26 8-42-4M608 636q-28 8-46-4M608 676q-24 6-40-4" fill="none" stroke-width="9" stroke-linecap="round"/>
      <g class="patches"><ellipse cx="418" cy="560" rx="72" ry="58" class="p1"/><ellipse cx="604" cy="652" rx="54" ry="70" class="p2"/></g>
    </g>
    <use href="#bodyShape" fill="none" class="ink" stroke-width="5"/>
    <ellipse cx="500" cy="510" rx="86" ry="36" class="fur"/>
  </g>
  <path d="M424 526Q500 556 576 526" fill="none" class="ink" stroke-width="17"/>
  <path d="M424 526Q500 556 576 526" fill="none" class="collar" stroke-width="9" stroke-linecap="round"/>
  <g id="bell"><circle cx="500" cy="550" r="11" fill="#ffd66e" class="ink" stroke-width="3.5"/><path d="M492 552h16" class="ink" stroke-width="2.5"/></g>
  <g id="pawL"><ellipse cx="462" cy="704" rx="30" ry="18" class="paw ink" stroke-width="5"/><path d="M455 714v-8M469 714v-8" class="ink" stroke-width="3"/></g>
  <g id="pawR"><ellipse cx="538" cy="704" rx="30" ry="18" class="paw ink" stroke-width="5"/><path d="M531 714v-8M545 714v-8" class="ink" stroke-width="3"/></g>
  <g id="head">
    <g id="earL"><path d="M404 404 396 306q2-18 18-10l58 52Z" class="earl ink" stroke-width="5"/><path d="M413 380 409 324 448 356Z" fill="#f6a7b3"/></g>
    <g id="earR"><path d="M596 404 604 306q-2-18-18-10l-58 52Z" class="earr ink" stroke-width="5"/><path d="M587 380 591 324 552 356Z" fill="#f6a7b3"/></g>
    <use href="#headShape" class="fur"/>
    <g clip-path="url(#headClip)">
      <ellipse cx="500" cy="486" rx="60" ry="40" class="muzzle"/>
      <path class="stripes" d="M482 342v24M500 337v32M518 342v24M374 428h28M374 452h20M626 428h-28M626 452h-20" fill="none" stroke-width="8" stroke-linecap="round"/>
      <g class="patches"><ellipse cx="418" cy="378" rx="72" ry="60" class="p1"/><ellipse cx="592" cy="358" rx="52" ry="40" class="p2"/></g>
    </g>
    <use href="#headShape" fill="none" class="ink" stroke-width="5"/>
    <ellipse class="blush" cx="414" cy="484" rx="20" ry="11" fill="#f7a1ab"/>
    <ellipse class="blush" cx="586" cy="484" rx="20" ry="11" fill="#f7a1ab"/>
    <g class="eyes-open">
      <g><circle cx="452" cy="440" r="23" class="iris ink" stroke-width="4"/><g class="pupil"><circle cx="452" cy="440" r="15" fill="#2e2226"/><circle cx="446" cy="433" r="6" fill="#fff"/><circle cx="458" cy="446" r="2.6" fill="#fff"/></g></g>
      <g><circle cx="548" cy="440" r="23" class="iris ink" stroke-width="4"/><g class="pupil"><circle cx="548" cy="440" r="15" fill="#2e2226"/><circle cx="542" cy="433" r="6" fill="#fff"/><circle cx="554" cy="446" r="2.6" fill="#fff"/></g></g>
    </g>
    <path class="eyes-happy ink" d="M430 448Q452 420 474 448M526 448Q548 420 570 448" fill="none" stroke-width="5.5"/>
    <path class="eyes-sleep ink" d="M430 438Q452 456 474 438M526 438Q548 456 570 438" fill="none" stroke-width="5.5"/>
    <g class="eyes-love">
      <use href="#heart" transform="translate(452 437) scale(2.1) translate(-10 -4)" fill="#f2637e" class="ink" stroke-width="2"/>
      <use href="#heart" transform="translate(548 437) scale(2.1) translate(-10 -4)" fill="#f2637e" class="ink" stroke-width="2"/>
    </g>
    <path d="M490 467q10-6 20 0-4 9-10 10-6-1-10-10Z" fill="#f28b9a" class="ink" stroke-width="3"/>
    <path class="mouth-w ink" d="M484 484q8 10 16 0 8 10 16 0" fill="none" stroke-width="4"/>
    <path class="mouth-open ink" d="M486 482q14 28 28 0q-14 6-28 0Z" fill="#d9677c" stroke-width="4"/>
    <path d="M398 470 348 462M400 486 350 490M602 470 652 462M600 486 650 490" class="ink" stroke-width="3" opacity=".7"/>
  </g>
  <text id="purr" x="636" y="530">prrr</text>
</g>

<g id="treat" opacity="0">
  <path d="M-20 0C-10-14 12-14 20 0 12 14-10 14-20 0Z" fill="#f7a35c" class="ink" stroke-width="3"/>
  <path d="M-18 0-32-11V11Z" fill="#f7a35c" class="ink" stroke-width="3"/>
  <circle cx="10" cy="-2" r="2.5" fill="#4b3434"/>
</g>

<path id="thread" fill="none" stroke="#e06b97" stroke-width="3.5" stroke-linecap="round"/>
<g id="yarn"><g id="yarnSpin">
  <circle r="28" fill="#f48fb1"/>
  <g clip-path="url(#yarnClip)" fill="none" stroke="#d65f8b" stroke-width="2.6">
    <g transform="rotate(35)"><ellipse rx="29" ry="7"/><ellipse rx="29" ry="15"/><ellipse rx="29" ry="23"/></g>
    <g transform="rotate(-55)"><path d="M0-29A29 9 0 0 1 0 29M0-29A29 17 0 0 1 0 29M0-29A29 25 0 0 1 0 29"/></g>
  </g>
  <path d="M-17-12a20 20 0 0 1 12-9" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="4" stroke-linecap="round"/>
  <circle r="28" fill="none" class="ink" stroke-width="4"/>
</g></g>

<rect id="night" x="-3000" y="-3000" width="7000" height="7000" fill="#2b2558" opacity="0" pointer-events="none"/>
<circle id="lamp" cx="861" cy="470" r="260" fill="url(#lampGlow)" opacity="0" pointer-events="none"/>
<g id="fx" pointer-events="none"></g>
</svg>`;

// ---------- helpers ----------
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const hexToRgb = (h) => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
const mixHex = (a, b, t) => { const A = hexToRgb(a), B = hexToRgb(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], t))).join(',')})`; };
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const stage = document.getElementById('stage');
stage.innerHTML = SVG;
const svg = stage.querySelector('svg');
const q = (s) => svg.querySelector(s);
const el = {
  cat: q('#cat'), head: q('#head'), earL: q('#earL'), earR: q('#earR'), pawL: q('#pawL'), pawR: q('#pawR'),
  pupils: [...svg.querySelectorAll('.pupil')], yarn: q('#yarn'), spin: q('#yarnSpin'), thread: q('#thread'),
  treat: q('#treat'), fx: q('#fx'), win: q('#window'), sky0: q('#sky0'), sky1: q('#sky1'), sun: q('#sun'), moon: q('#moon'),
  stars: q('#stars'), night: q('#night'), lamp: q('#lamp'), hillBack: q('#hillBack'), hillFront: q('#hillFront'), bulbs: q('#bulbs'),
};
const ui = {
  bubble: document.getElementById('bubble'),
  name: document.getElementById('cat-name'),
  pets: document.getElementById('pets'),
  treat: document.getElementById('treat-btn'),
  another: document.getElementById('another-btn'),
  time: document.getElementById('clock-time'),
  phase: document.getElementById('clock-phase'),
};

// ---------- cats ----------
const COATS = [
  { coat: 'cream',   fur: '#fff1dc', chest: '#fffaf2', muzzle: '#fffaf2', paw: '#fffaf2', stripe: '#f0d4b0', stripes: 0, patches: 0, iris: '#9cc46e', collar: '#f2637e' },
  { coat: 'ginger',  fur: '#f7b267', chest: '#fff1dc', muzzle: '#fff1dc', paw: '#fff1dc', stripe: '#e08a3c', stripes: 1, patches: 0, iris: '#e7b13c', collar: '#6aa9e0' },
  { coat: 'grey tabby', fur: '#c9c6d6', chest: '#f4f2f8', muzzle: '#f4f2f8', paw: '#f4f2f8', stripe: '#9a97ae', stripes: 1, patches: 0, iris: '#7cc6a8', collar: '#f2637e' },
  { coat: 'midnight', fur: '#463e52', chest: '#463e52', muzzle: '#4f4760', paw: '#463e52', stripe: '#463e52', stripes: 0, patches: 0, iris: '#f2cf4a', collar: '#ff8fae' },
  { coat: 'calico',  fur: '#fffaf2', chest: '#fffaf2', muzzle: '#fffaf2', paw: '#fffaf2', stripe: '#fff', stripes: 0, patches: 1, p1: '#f3a65c', p2: '#5a4b55', earL: '#f3a65c', earR: '#5a4b55', iris: '#9cc46e', collar: '#9b7fd4' },
  { coat: 'tuxedo',  fur: '#3d3644', chest: '#fffaf2', muzzle: '#fffaf2', paw: '#fffaf2', stripe: '#3d3644', stripes: 0, patches: 0, iris: '#a9d47e', collar: '#e85d5d' },
  { coat: 'peach',   fur: '#fcd6c0', chest: '#fff6ee', muzzle: '#fff6ee', paw: '#fff6ee', stripe: '#f2b79a', stripes: 1, patches: 0, iris: '#7fb6e6', collar: '#5cc0a0' },
];
const NAMES = ['Mochi', 'Biscuit', 'Tofu', 'Pudding', 'Miso', 'Bean', 'Noodle', 'Pickle', 'Waffle', 'Dumpling', 'Sesame', 'Toast', 'Marshmallow', 'Kiwi', 'Pretzel', 'Udon', 'Clementine', 'Nugget'];

let coatIndex = -1, catName = '';
function newCat(first = false) {
  let i; do { i = Math.floor(Math.random() * COATS.length); } while (i === coatIndex);
  coatIndex = i;
  let n; do { n = pick(NAMES); } while (n === catName);
  catName = n;
  const c = COATS[i];
  const s = svg.style;
  s.setProperty('--fur', c.fur); s.setProperty('--chest', c.chest); s.setProperty('--muzzle', c.muzzle);
  s.setProperty('--paw', c.paw); s.setProperty('--stripe', c.stripe); s.setProperty('--stripes', c.stripes);
  s.setProperty('--patches', c.patches); s.setProperty('--patch1', c.p1 || c.fur); s.setProperty('--patch2', c.p2 || c.fur);
  s.setProperty('--ear-l', c.earL || c.fur); s.setProperty('--ear-r', c.earR || c.fur);
  s.setProperty('--iris', c.iris); s.setProperty('--collar', c.collar);
  if (ui.name) ui.name.textContent = catName;
  if (!first) {
    el.cat.animate([{ transform: 'scale(1,1)' }, { transform: 'scale(1.1,.86)' }, { transform: 'scale(.95,1.07)' }, { transform: 'scale(1,1)' }], { duration: 520, easing: 'ease-out' });
    wake();
    say(pick([`hi. i'm ${catName}.`, `${catName}, at your service. (not really)`, `oh. hello. ${catName} here.`, `this is ${catName}'s cushion now`]));
  }
}

// ---------- view fitting ----------
let view = { x: 0, y: 0, w: 1000, h: 1000 };
function fit() {
  if (!innerWidth || !innerHeight) return;
  const a = innerWidth / innerHeight;
  // wide screens keep a text column on the left; tall ones keep headroom above the window
  const [rw, rh, cx, cy] = a >= 1.1 ? [1040, 800, 360, 500] : [620, 1150, 500, 350];
  let w, h;
  if (a > rw / rh) { h = rh; w = h * a; } else { w = rw; h = w / a; }
  view = { x: cx - w / 2, y: cy - h / 2, w, h };
  svg.setAttribute('viewBox', `${view.x} ${view.y} ${w} ${h}`);
}
function toSvg(e) { return new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse()); }
function toScreen(x, y) { return new DOMPoint(x, y).matrixTransform(svg.getScreenCTM()); }

// ---------- mood ----------
let sleeping = false, mood = 'idle', moodUntil = 0, lastInteract = performance.now();
const isLost = document.body.dataset.page === 'lost';
if (isLost) { sleeping = true; lastInteract = -1e9; }
function setMood(m, dur = 0) { mood = m; moodUntil = dur ? performance.now() + dur : 0; svg.dataset.mood = m; }
function baseMood() { return sleeping ? 'sleep' : 'idle'; }
function wake() { lastInteract = performance.now(); if (sleeping) { sleeping = false; if (mood === 'sleep') setMood('idle'); } }

// ---------- speech bubble ----------
let bubbleTimer = 0;
function say(text) {
  const b = ui.bubble; if (!b) return;
  const p = toScreen(500, 312);
  b.textContent = text;
  b.style.left = `${p.x}px`; b.style.top = `${p.y}px`;
  b.classList.remove('show'); void b.offsetWidth; b.classList.add('show');
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => b.classList.remove('show'), 2200 + text.length * 35);
}

const THOUGHTS = [
  'mrrp?', 'is it dinner yet', 'boop received.', 'i am a loaf.', 'that sunbeam is mine.',
  'i saw a bird today. still thinking about it.', 'rent is one (1) treat.', '*slow blink*',
  'i knocked a cup off the table. no regrets.', 'if i fits, i sits.', 'the red dot will return.',
  'pet me. no, not like that. ok like that.', 'mew.', 'what if i just. sat on your keyboard',
  'i have been awake for 11 minutes. exhausting.', 'do you smell tuna',
];
const SLEEPY = ['mrrh... five more minutes', '...was having a dream about fish', 'zz- huh? oh. you.', 'mmf.'];
const TREAT_LINES = ['a fish!! for me??', 'FISH.', 'you may stay.', 'best human. confirmed.'];

// ---------- fx ----------
const NS = 'http://www.w3.org/2000/svg';
function float(node, x, y, { dx = 0, dy = -70, dur = 1000, scale = 1 } = {}) {
  const outer = document.createElementNS(NS, 'g');
  outer.setAttribute('transform', `translate(${x} ${y})`);
  outer.appendChild(node);
  el.fx.appendChild(outer);
  const a = node.animate([
    { transform: `translate(0px,0px) scale(${scale * 0.4})`, opacity: 0 },
    { transform: `translate(${dx * 0.2}px,${dy * 0.2}px) scale(${scale})`, opacity: 1, offset: 0.2 },
    { transform: `translate(${dx}px,${dy}px) scale(${scale})`, opacity: 0 },
  ], { duration: dur, easing: 'ease-out' });
  a.onfinish = () => outer.remove();
}
function heart(x, y, s = 1) {
  const u = document.createElementNS(NS, 'use');
  u.setAttribute('href', '#heart'); u.setAttribute('fill', '#f2637e'); u.setAttribute('class', 'ink'); u.setAttribute('stroke-width', '2');
  const g = document.createElementNS(NS, 'g'); g.appendChild(u); u.setAttribute('transform', 'translate(-10 -4)');
  float(g, x, y, { dx: (Math.random() - 0.5) * 50, dy: -70 - Math.random() * 40, dur: 1000 + Math.random() * 400, scale: s * (0.8 + Math.random() * 0.5) });
}
function word(text, x, y, opts) {
  const t = document.createElementNS(NS, 'text');
  t.textContent = text; t.setAttribute('class', 'fx-text'); t.setAttribute('text-anchor', 'middle');
  float(t, x, y, opts);
}

// ---------- petting & booping ----------
let petEnergy = 0, lastPetPt = null, lastHeart = 0, petClock = 0, petsToday = store.get('cat-pets', 0);
const renderPets = () => { if (ui.pets) ui.pets.textContent = petsToday; };
renderPets();
let downAt = null;

el.cat.addEventListener('pointermove', (e) => {
  if (yarn.drag) return;
  const p = toSvg(e);
  if (lastPetPt) petEnergy += Math.min(60, Math.hypot(p.x - lastPetPt.x, p.y - lastPetPt.y));
  lastPetPt = p;
  if (petEnergy > 70) {
    wake();
    if (mood !== 'love' && mood !== 'chew') setMood('happy', 700);
    const now = performance.now();
    if (now - lastHeart > 220) { heart(p.x, p.y - 10); lastHeart = now; }
  }
});
el.cat.addEventListener('pointerleave', () => { lastPetPt = null; });
el.cat.addEventListener('pointerdown', (e) => { downAt = { x: e.clientX, y: e.clientY, t: performance.now() }; });
el.cat.addEventListener('pointerup', (e) => {
  if (!downAt) return;
  const moved = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y), quick = performance.now() - downAt.t < 400;
  downAt = null;
  if (moved < 10 && quick) boop();
});
function boop() {
  if (sleeping) { wake(); say(pick(SLEEPY)); setMood('idle'); return; }
  wake();
  if (mood === 'chew' || mood === 'love') return;
  setMood('meow', 800);
  const ear = Math.random() < 0.5 ? el.earL : el.earR;
  ear.animate([{ transform: 'rotate(0)' }, { transform: `rotate(${ear === el.earL ? -14 : 14}deg)` }, { transform: 'rotate(0)' }], { duration: 300, easing: 'ease-in-out' });
  say(pick(THOUGHTS));
}

// ---------- yarn ----------
const R = 28, GROUND = 772;
const yarn = { x: 735, y: GROUND, vx: 0, vy: 0, rot: 0, drag: false, ox: 0, oy: 0, lastX: 0, lastY: 0, lastT: 0, swatCool: 0 };
const loose = { x: 668, y: GROUND + R - 2, px: 668, py: GROUND + R - 2 };
el.yarn.addEventListener('pointerdown', (e) => {
  e.stopPropagation();
  const p = toSvg(e);
  Object.assign(yarn, { drag: true, ox: p.x - yarn.x, oy: p.y - yarn.y, vx: 0, vy: 0, lastX: p.x, lastY: p.y, lastT: performance.now() });
  el.yarn.setPointerCapture(e.pointerId);
  el.yarn.classList.add('grabbing');
  wake();
});
el.yarn.addEventListener('pointermove', (e) => {
  if (!yarn.drag) return;
  const p = toSvg(e), now = performance.now(), dt = Math.max(1, now - yarn.lastT) / 1000;
  yarn.x = p.x - yarn.ox; yarn.y = Math.min(GROUND, p.y - yarn.oy);
  yarn.vx = lerp(yarn.vx, (p.x - yarn.lastX) / dt, 0.5); yarn.vy = lerp(yarn.vy, (p.y - yarn.lastY) / dt, 0.5);
  yarn.rot += (p.x - yarn.lastX) / R;
  yarn.lastX = p.x; yarn.lastY = p.y; yarn.lastT = now;
});
const drop = () => {
  if (!yarn.drag) return;
  yarn.drag = false; el.yarn.classList.remove('grabbing');
  if (performance.now() - yarn.lastT > 80) { yarn.vx = 0; yarn.vy = 0; }
  yarn.vx = clamp(yarn.vx, -2600, 2600); yarn.vy = clamp(yarn.vy, -2600, 2600);
};
el.yarn.addEventListener('pointerup', drop);
el.yarn.addEventListener('pointercancel', drop);

function stepYarn(dt) {
  if (!yarn.drag) {
    yarn.vy += 2600 * dt;
    yarn.x += yarn.vx * dt; yarn.y += yarn.vy * dt;
    if (yarn.y >= GROUND) {
      yarn.y = GROUND;
      yarn.vy = yarn.vy > 240 ? -yarn.vy * 0.42 : 0;
      yarn.vx *= Math.pow(0.3, dt);
      if (Math.abs(yarn.vx) < 4) yarn.vx = 0;
    }
    const minX = view.x + R + 8, maxX = view.x + view.w - R - 8;
    if (yarn.x < minX) { yarn.x = minX; yarn.vx = Math.abs(yarn.vx) * 0.6; }
    if (yarn.x > maxX) { yarn.x = maxX; yarn.vx = -Math.abs(yarn.vx) * 0.6; }
    if (yarn.y < view.y + R) { yarn.y = view.y + R; yarn.vy = Math.abs(yarn.vy) * 0.5; }
    yarn.rot += yarn.vx * dt / R;
  }
  el.yarn.setAttribute('transform', `translate(${yarn.x.toFixed(1)} ${yarn.y.toFixed(1)})`);
  el.spin.setAttribute('transform', `rotate(${(yarn.rot * 57.3) % 360})`);
  // the loose end trails on a short string (tiny verlet rope with one point)
  const LEN = 74, floorY = GROUND + R - 2;
  const lvx = (loose.x - loose.px) * 0.97, lvy = (loose.y - loose.py) * 0.97;
  loose.px = loose.x; loose.py = loose.y;
  loose.x += lvx; loose.y += lvy + 2600 * dt * dt;
  if (loose.y > floorY) { loose.y = floorY; loose.py = floorY; loose.px = loose.x - lvx * 0.8; }
  let ddx = loose.x - yarn.x, ddy = loose.y - yarn.y, dd = Math.hypot(ddx, ddy) || 1;
  if (dd > LEN) { loose.x = yarn.x + ddx / dd * LEN; loose.y = yarn.y + ddy / dd * LEN; ddx = loose.x - yarn.x; ddy = loose.y - yarn.y; dd = LEN; }
  const sx = yarn.x + ddx / dd * R * 0.92, sy = yarn.y + ddy / dd * R * 0.92;
  const slack = Math.max(0, LEN - dd) * 0.55 + 4;
  el.thread.setAttribute('d', `M${sx.toFixed(1)} ${sy.toFixed(1)}Q${((sx + loose.x) / 2).toFixed(1)} ${((sy + loose.y) / 2 + slack).toFixed(1)} ${loose.x.toFixed(1)} ${loose.y.toFixed(1)}`);

  // the cat swats anything that rolls too close
  yarn.swatCool -= dt;
  if (!sleeping && !yarn.drag && yarn.swatCool <= 0 && yarn.y > GROUND - 70 && Math.abs(yarn.x - 500) < 150 && mood !== 'chew' && mood !== 'love') {
    const side = yarn.x < 500 ? -1 : 1;
    swatPaw(side);
    yarn.swatCool = 0.9;
    setTimeout(() => { yarn.vx = side * (650 + Math.random() * 450); yarn.vy = -(380 + Math.random() * 320); }, 140);
    setMood('happy', 700);
    lastInteract = performance.now();
    if (Math.random() < 0.3) say(pick(['!!', 'got it', 'mine.', 'pew']));
  }
}

// a swat: the paw reaches out while a leg stretches from behind the body, so it never detaches
function swatPaw(side) {
  const paw = side < 0 ? el.pawL : el.pawR;
  const leg = svg.querySelector(side < 0 ? '#legL' : '#legR');
  const legPaths = leg.querySelectorAll('path');
  const fx = side < 0 ? 462 : 538, fy = 704;            // paw at rest
  const hx = side < 0 ? 476 : 524, hy = 640;            // hip/shoulder, hidden behind the body
  const start = performance.now(), dur = 380;
  const step = (now) => {
    const k = Math.min(1, (now - start) / dur);
    const e = Math.sin(k * Math.PI);                    // out and back
    const dx = side * 62 * e, dy = 30 * e;
    const px = fx + dx, py = fy + dy;
    paw.setAttribute('transform', `rotate(${(-side * 18 * e).toFixed(2)} ${px.toFixed(1)} ${py.toFixed(1)}) translate(${dx.toFixed(1)} ${dy.toFixed(1)})`);
    const d = `M${hx} ${hy}Q${(hx + dx * 0.4).toFixed(1)} ${(hy + 45).toFixed(1)} ${px.toFixed(1)} ${(py - 6).toFixed(1)}`;
    legPaths.forEach((p) => p.setAttribute('d', d));
    leg.setAttribute('opacity', e > 0.01 ? '1' : '0');
    if (k < 1) requestAnimationFrame(step);
    else { paw.removeAttribute('transform'); leg.setAttribute('opacity', '0'); }
  };
  requestAnimationFrame(step);
}

// ---------- treats ----------
let treatBusy = false;
ui.treat?.addEventListener('click', () => {
  if (treatBusy) return;
  treatBusy = true; wake();
  el.treat.setAttribute('opacity', '1');
  const fall = el.treat.animate([
    { transform: `translate(500px, ${view.y - 60}px) rotate(-40deg)` },
    { transform: 'translate(500px, 742px) rotate(10deg)', offset: 0.75, easing: 'ease-out' },
    { transform: 'translate(500px, 728px) rotate(0deg)', offset: 0.87, easing: 'ease-in' },
    { transform: 'translate(500px, 742px) rotate(0deg)' },
  ], { duration: 900, easing: 'cubic-bezier(.5,0,1,1)', fill: 'forwards' });
  fall.onfinish = () => {
    setMood('love', 1300);
    say(pick(TREAT_LINES));
    for (let i = 0; i < 6; i++) setTimeout(() => heart(500 + (Math.random() - 0.5) * 120, 360, 1.2), i * 90);
    setTimeout(() => {
      setMood('chew', 1500);
      el.treat.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 900, fill: 'forwards' });
      [0, 450, 900].forEach((d, i) => setTimeout(() => word('nom', 470 + i * 30, 520, { dx: 20, dy: -60, dur: 900 }), d));
    }, 1300);
    setTimeout(() => {
      fall.cancel(); el.treat.getAnimations().forEach((a) => a.cancel()); el.treat.setAttribute('opacity', '0');
      treatBusy = false; setMood('happy', 900);
    }, 3000);
  };
});
ui.another?.addEventListener('click', () => newCat());

// ---------- time of day ----------
const SKY = [
  [0, '#232456', '#3c3a7a'], [5, '#2d2f66', '#6b5c95'], [6.3, '#f6a99a', '#fde3c3'], [8, '#7fc8f2', '#d6f1fc'],
  [16.5, '#86c3ee', '#e3f2f5'], [18, '#f29b8e', '#fbd0a0'], [19.3, '#5a4a8f', '#d58a9b'], [20.5, '#272858', '#433f80'], [24, '#232456', '#3c3a7a'],
];
const PHASES = [[5, 'dream o’clock'], [7, 'breakfast demands'], [11, 'sunbeam hours'], [14, 'lunch loafing'], [17, 'nap o’clock'], [19, 'dinner demands'], [22, 'zoomies hour'], [24, 'dream o’clock']];
const clockHours = () => { const d = new Date(); return d.getHours() + d.getMinutes() / 60; };
let override = isLost ? 1.5 : null;
let hourShown = override ?? clockHours();
function nightness(h) {
  if (h >= 20.5 || h < 5) return 1;
  if (h >= 18) return (h - 18) / 2.5;
  if (h < 7) return 1 - (h - 5) / 2;
  return 0;
}
function paintSky(h) {
  let i = 0; while (h > SKY[i + 1][0]) i++;
  const [h0, a0, a1] = SKY[i], [h1, b0, b1] = SKY[i + 1];
  const f = (h - h0) / (h1 - h0);
  el.sky0.setAttribute('stop-color', mixHex(a0, b0, f));
  el.sky1.setAttribute('stop-color', mixHex(a1, b1, f));
  const n = nightness(h);
  const arc = (p) => ({ x: 380 + p * 240, y: 360 - Math.sin(Math.PI * p) * 150 });
  const sp = (h - 6) / 12, mp = (((h - 18) % 24) + 24) % 24 / 12;
  const s = arc(clamp(sp, 0, 1)), m = arc(clamp(mp, 0, 1));
  el.sun.setAttribute('transform', `translate(${s.x} ${s.y + (sp < 0 || sp > 1 ? 200 : 0)})`);
  el.moon.setAttribute('transform', `translate(${m.x} ${m.y + (mp < 0 || mp > 1 ? 200 : 0)})`);
  el.sun.setAttribute('opacity', String(1 - n));
  el.moon.setAttribute('opacity', String(n));
  el.stars.setAttribute('opacity', String(n));
  el.hillBack.setAttribute('fill', mixHex('#a9d7a0', '#3d4a72', n));
  el.hillFront.setAttribute('fill', mixHex('#8cc48a', '#323d63', n));
  el.night.setAttribute('opacity', String(n * 0.3));
  el.lamp.setAttribute('opacity', String(n));
  svg.style.setProperty('--glow', String(0.25 + n * 0.75));
  return n;
}
el.win.addEventListener('click', () => {
  const n = nightness(override ?? clockHours());
  override = n > 0.5 ? 12.5 : 22.5;
  wake();
  say(n > 0.5 ? 'who turned the sun on' : 'ooh. night time. zoomies.');
});
const fmt = (h) => { const m = Math.floor(h * 60) % 1440; return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; };

// ---------- main loop ----------
let pointer = null;
svg.addEventListener('pointermove', (e) => { pointer = toSvg(e); });
svg.addEventListener('pointerleave', () => { pointer = null; });
let tilt = 0, last = performance.now(), zTimer = 0, uiTimer = 0, night = 0;

function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  stepYarn(dt);

  // time of day eases toward its target
  const target = override ?? clockHours();
  const diff = ((target - hourShown + 36) % 24) - 12;
  hourShown = (hourShown + diff * Math.min(1, dt * 2.2) + 24) % 24;
  night = paintSky(hourShown);

  // moods
  if (moodUntil && now > moodUntil) setMood(baseMood());
  if (!sleeping && mood === 'idle' && now - lastInteract > (night > 0.6 ? 10000 : 24000)) { sleeping = true; setMood('sleep'); }
  if (sleeping && mood === 'idle') setMood('sleep');
  petEnergy *= Math.exp(-dt * 5);
  svg.toggleAttribute('data-purring', mood === 'happy' && petEnergy > 40);
  if (mood === 'happy' && petEnergy > 70) {
    petClock += dt;
    if (petClock > 1.4) { petClock = 0; petsToday++; store.set('cat-pets', petsToday); renderPets(); }
  }

  // eyes & head follow whatever is most interesting
  let tx = 500, ty = 760;
  const treatOut = el.treat.getAttribute('opacity') === '1';
  if (treatOut) { tx = 500; ty = 800; }
  else if (yarn.drag || Math.hypot(yarn.vx, yarn.vy) > 40) { tx = yarn.x; ty = yarn.y; }
  else if (pointer) { tx = pointer.x; ty = pointer.y; }
  for (const [i, p] of el.pupils.entries()) {
    const cx = i ? 548 : 452, cy = 440, dx = tx - cx, dy = ty - cy, d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 160) * 6.5;
    p.setAttribute('transform', `translate(${(dx / d * k).toFixed(2)} ${(dy / d * k).toFixed(2)})`);
  }
  // keep the head small-angled and pivoting at the neck so it never lifts off the body
  const want = sleeping ? 3 : clamp((tx - 500) / 380, -1, 1) * 3.5;
  tilt = lerp(tilt, want, Math.min(1, dt * 4));
  const t = now / 1000;
  const bob = reduced ? 0 : (Math.sin(t * (sleeping ? 1.2 : 2)) * 0.5 + 0.5) * (sleeping ? 2.2 : 1.2);
  el.head.setAttribute('transform', `translate(0 ${bob.toFixed(2)}) rotate(${tilt.toFixed(2)} 500 528)`);

  if (sleeping) {
    zTimer -= dt;
    if (zTimer <= 0) { word(pick(['z', 'Z', 'z']), 590 + Math.random() * 20, 340, { dx: 50, dy: -90, dur: 2400, scale: 0.9 + Math.random() * 0.6 }); zTimer = 1.3; }
  }

  uiTimer -= dt;
  if (uiTimer <= 0) {
    uiTimer = 1;
    if (ui.time) ui.time.textContent = fmt(hourShown);
    if (ui.phase) ui.phase.textContent = PHASES.find(([h]) => hourShown < h)[1];
  }
  requestAnimationFrame(loop);
}

newCat(true);
fit();
addEventListener('resize', fit);
if (isLost) setMood('sleep');
requestAnimationFrame((n) => { last = n; requestAnimationFrame(loop); });
setTimeout(() => { if (!isLost && !sleeping) say(`oh hi. i'm ${catName}.`); }, 1600);
