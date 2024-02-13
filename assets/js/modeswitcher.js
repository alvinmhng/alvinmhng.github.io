/* 
Copied from https://github.com/derekkedziora/jekyll-demo/blob/master/scripts/mode-switcher.js
https://github.com/derekkedziora/jekyll-demo
Creative Commons Attribution 4.0 International License
*/

let systemInitiatedDark = window.matchMedia("(prefers-color-scheme: dark)"); 
let theme = sessionStorage.getItem('theme');

function changeIconImgSrc(src) {
	document.getElementById("theme-toggle-img").src = src;
	document.getElementById("theme-toggle-img--mobile").src = src;
}

if (systemInitiatedDark.matches) {
	changeIconImgSrc("https://alvinmhng.com/assets/img/moon.svg");
} else {
	changeIconImgSrc("https://alvinmhng.com/assets/img/sun.svg");
}

function prefersColorTest(systemInitiatedDark) {
  if (systemInitiatedDark.matches) {
  	document.documentElement.setAttribute('data-theme', 'dark');		
   	changeIconImgSrc("https://alvinmhng.com/assets/img/moon.svg");
   	sessionStorage.setItem('theme', '');
  } else {
  	document.documentElement.setAttribute('data-theme', 'light');
    changeIconImgSrc("https://alvinmhng.com/assets/img/sun.svg");
    sessionStorage.setItem('theme', '');
  }
}
systemInitiatedDark.addListener(prefersColorTest);


function modeSwitcher() {
	let theme = sessionStorage.getItem('theme');
	if (theme === "dark") {
		document.documentElement.setAttribute('data-theme', 'light');
		sessionStorage.setItem('theme', 'light');
		changeIconImgSrc("https://alvinmhng.com/assets/img/sun.svg");
	}	else if (theme === "light") {
		document.documentElement.setAttribute('data-theme', 'dark');
		sessionStorage.setItem('theme', 'dark');
		changeIconImgSrc("https://alvinmhng.com/assets/img/moon.svg");
	} else if (systemInitiatedDark.matches) {	
		document.documentElement.setAttribute('data-theme', 'light');
		sessionStorage.setItem('theme', 'light');
		changeIconImgSrc("https://alvinmhng.com/assets/img/sun.svg");
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
		sessionStorage.setItem('theme', 'dark');
		changeIconImgSrc("https://alvinmhng.com/assets/img/moon.svg");
	}
}

if (theme === "dark") {
	document.documentElement.setAttribute('data-theme', 'dark');
	sessionStorage.setItem('theme', 'dark');
	changeIconImgSrc("https://alvinmhng.com/assets/img/moon.svg");
} else if (theme === "light") {
	document.documentElement.setAttribute('data-theme', 'light');
	sessionStorage.setItem('theme', 'light');
	changeIconImgSrc("https://alvinmhng.com/assets/img/sun.svg");
}
