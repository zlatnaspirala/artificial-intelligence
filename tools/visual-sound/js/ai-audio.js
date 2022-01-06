/**
 * @description Start mic stream.
 */

export var TESLA = {SOUND: {}};
export var CHANNELS = 120;

export var AudioInputFile = function(channels, srcPath) {
  var root = this;
  root.channels = channels;
  var audioContext = new AudioContext();
  console.info("Audio context starting up ...");
  var BUFF_SIZE = 16384;
  // Handle style
  var controllerDom = document.getElementById('controller');
  var audioHolder = document.createElement('div');
  audioHolder.setAttribute('style', 'width:100%;display:flex;');
  // Create audio
  var audio = new Audio();
  audio.src = srcPath;
  audio.controls = false;
  audio.loop = false;
  audio.autoplay = true;
  audioHolder.append(audio);
  var descTitle = document.createElement("div");
  // descTitle.innerHTML = `Current file: ` + srcPath + `.`;
  controllerDom.append(descTitle);
  controllerDom.append(audioHolder);
  this.audio = audio;
  // Audio context/connect
  this.context = new AudioContext();
  this.analyser = this.context.createAnalyser();
  this.source = this.context.createMediaElementSource(audio);
  this.source.connect(this.analyser);
  this.analyser.connect(this.context.destination);
}
