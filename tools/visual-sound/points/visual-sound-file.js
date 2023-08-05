
// import { Nidza } from "nidza";
import {Nidza, Utility} from "../node_modules/nidza/index";
import { TESLA, CHANNELS, AudioInputMic } from "../js/ai-mic.js";
import {AudioInputFile} from "../js/ai-audio";

var nidza = new Nidza();

let AISound = {
  id: "experimental1",
  size: {
    width: window.innerWidth * 2,
    height: window.innerHeight * 15
  },
  parentDom: document.getElementById('testHolder')
};

document.getElementById('loader').style.display = 'none';
nidza.createNidzaIndentity(AISound);
nidza.access.experimental1.setBackground('black');
nidza.access.experimental1.clearOnUpdate = false;

window.nidza = nidza;

// Visual params
var sLineWidth = 1,
    sSpace = 3;
var countSamples = 0
var j = 1;

// Construct it
var attachAudioInputFile = function(spath) {
  // var TestMicrophone = new AudioInputMic(CHANNELS);
  nidza.access.experimental1.testAudioFile = new AudioInputFile(CHANNELS, spath);

  var visualIncY = 0;
  let mySamplerSeparator = nidza.access.experimental1.addCustom2dComponent({
    id: "separator",
    draw: function(e) {
      var injector = nidza.access.experimental1.testAudioFile;
      if (!e) return;
      var bar_pos = 0, bar_width = 0, bar_height = 0;
      var fbc_array = new Uint8Array(injector.analyser.frequencyBinCount);
      var bar_count = 480; // window.innerWidth * 0.3;
      injector.analyser.getByteFrequencyData(fbc_array);

      // Check level of zeros
      var zerosAMP = 0;

      // e.clearRect(0, 0, window.innerWidth, window.innerHeight * 5);
      e.fillStyle = "#ffffff";
      for (var i = 0; i < bar_count; i++) {
        bar_pos = i * sSpace;
        bar_width = 1;
        bar_height = -(fbc_array[i] / 1);
        var testbefore = (fbc_array[i-1] / 1);
        var testnext = (fbc_array[i+1] / 1);

        if (bar_height == 0) {
          zerosAMP++;
        }

        if (Math.abs(bar_height) > testbefore && Math.abs(bar_height) > testnext) {
          e.fillStyle = "white";
          e.fillText( "T" + i.toString() , bar_pos, visualIncY + 50, 30, 30)
          e.fillStyle = "red";
        } else {
          e.fillStyle = "rgba(12,55,122,0.5)";
        }

        e.fillRect(bar_pos, visualIncY + 50, bar_width, bar_height);

        if (bar_count - 1 == i) {
          e.fillText("Sample " + countSamples, bar_pos + 100, visualIncY, 100, 100);
        }

      }

      countSamples++;
      // console.log('LOW DETECT LIMIT => ', zerosAMP);
      if (zerosAMP < 150) {
        visualIncY = visualIncY + 250;
      }

    },
    position: {
      x: 5,
      y: 140
    },
    dimension: {
      width: 1,
      height: 1
    }
  });
  window.mySamplerSeparator = mySamplerSeparator;

  mySamplerSeparator.activeDraw();
}
// First user request
// addEventListener('click', attachAudioInputFile);

// A Fonet
function sample1Fon(fon) {
  attachAudioInputFile('../../../data/uniqs/' + fon + '.m4a');
}

document.getElementById('attacherAudioFileA').
  addEventListener('click', () => {
    sample1Fon('a');
  });

  document.getElementById('attacherAudioFileB').
  addEventListener('click', () => {
    sample1Fon('b');
  });