"use strict";

const ROOT = location.pathname.split("/").includes('spa-routing') ? '/spa-routing' : '';


function loadContent(content) {
	document.getElementById('content').innerHTML = content;
}

function handleNavigation(path) {
	switch(path) {
		case `${ROOT}/`:
			loadContent('<h1>Home</h1>');
			break;
		case `${ROOT}/upload`:
			loadContent('<h1>Upload</h1>');
			break;
		case `${ROOT}/gallery`:
			loadContent('<h1>Gallery</h1>');
			break;
        default:
          loadContent('<h1>404 Not Found</h1>');
	}
}

function handleLink(event) {
	event.preventDefault();
	const targetPath = `${ROOT}/${event.target.getAttribute('href')}`;
	console.log(targetPath)
	history.pushState({}, '', `${targetPath}`);
    handleNavigation(targetPath);
}

if(history.scrollRestoration) {
	history.scrollRestoration = "manual";
}

document.querySelectorAll('a').forEach(link => {
	link.addEventListener('click', handleLink)
})

handleNavigation(window.location.pathname);

window.addEventListener('popstate', ()=> {
	handleNavigation(window.location.pathname);
});