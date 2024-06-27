
window.addEventListener('message', e => {
	const key = e.message ? 'message' : 'data';
	const data = e[key];

	console.log('PARENT CATCH', data)
	console.log('PARENT CATCH', e)

},false);


var AINidzaGlobals = {};

function byId(id) {return document.getElementById(id)}
byId('showAudioFile').addEventListener('click', showAudioFile)
byId('showAudioMic').addEventListener('click', showAudioMic)
byId('showFD').addEventListener('click', showFD)

function showAudioFile() {
	byId('currentTool').style.display = 'block';
	byId('currentTool').src = "frame/audio-file.html";

}
function showAudioMic() {
	byId('currentTool').style.display = 'block';
	byId('currentTool').src = "frame/audio-mic.html";
}
function showHideMenu() {
	if(byId('ainidzaMenu').classList.contains('closed') == true) {
		byId('ainidzaMenu').classList.remove('closed')
	} else {
		byId('ainidzaMenu').classList.add('closed')
	}
}

let showRandomResolve8Q = () => {
	byId('currentTool').style.display = 'none';
	var loc = document.createElement('div');
	loc.innerHTML = ` <iframe style="width: 100%;height:100vh" scrolling="no" title="AI 8 queens with old visualJS" src="https://codepen.io/zlatnaspirala/embed/QWyjpwb?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/zlatnaspirala/pen/QWyjpwb">
  AI 8 queens with old visualJS</a> by Nikola Lukic (<a href="https://codepen.io/zlatnaspirala">@zlatnaspirala</a>)
  on <a href="https://codepen.io">CodePen</a>.
  </iframe> `

	byId('currentTool').parentElement.append(
		loc
	)

};
function showFD() {
	// How to use it like tool
	byId('currentTool').style.display = 'block';
	byId('currentTool').onload = () => {
		console.log('<<<<<<<<<<<<onmessage<<<<<<<<ATTACHED<<<');
		AINidzaGlobals.frameWindow = document.getElementById("currentTool").contentWindow;
		AINidzaGlobals.frameWindow.onmessage = function(e) {
			console.log('FD frame :' + e.data);
		};
		// AINidzaGlobals.frameWindow.postMessage("Hello from same domain", "http://localhost.com");
	}
	byId('currentTool').src = "apps/tensorflow/fd/fd.html";
}