
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
	byId('currentTool').src = "frame/audio-file.html";
}
function showAudioMic() {
	byId('currentTool').src = "frame/audio-mic.html";
}
function showHideMenu() {
	if(byId('ainidzaMenu').classList.contains('closed') == true) {
		byId('ainidzaMenu').classList.remove('closed')
	} else {
		byId('ainidzaMenu').classList.add('closed')
	}
}
function showFD() {
	// How to use it like tool 
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