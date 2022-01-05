
// import { Nidza } from "nidza";
import {Nidza, Utility} from "../node_modules/nidza/index";

import { TESLA, CHANNELS, AudioInputMic } from "../js/ai-mic";
// import { AudioInputFile } from "../js/ai-audio";

var nidza = new Nidza();

let AISound = {
  id: "myCHAR1",
  size: {
    width: window.innerWidth,
    height: window.innerHeight 
  },
  parentDom: document.getElementById('testHolder')
};

document.getElementById('loader').style.display = 'none';
nidza.createNidzaIndentity(AISound);
nidza.access.myCHAR1.setBackground('orangered');
nidza.access.myCHAR1.clearOnUpdate = false;

window.nidza = nidza;

// Visual params
var sLineWidth = 1,
    sSpace = 5;
var COUNT = 0
var j = 1;



let rotationOption = new nidza.Osc(0, 90, 0.5, "oscMax");

addEventListener('click', () => {

  var t = new AudioInputMic(CHANNELS);

  let myStarElement = nidza.access.myCHAR1.addCustom2dComponent({
    id: "CUSTOM",
    radius: 10,
    draw: function(e) {
      // console.log("CUSTOM DRAW", TESLA.SOUND)
      if(!e) return;
      e.fillStyle = 'rgba(111 ,222 ,22 , 1)';
      for(var d = 0;d < CHANNELS;d++) {
        e.fillRect(this.position.getX() + sSpace * d, this.position.getY(), sLineWidth, 1 + TESLA.SOUND['amp' + d])
        e.strokeStyle = 'rgba(' + 40 + TESLA.SOUND['amp' + d] + ' ,' + 11 + TESLA.SOUND['amp' + d] + ' ,' + 1 + TESLA.SOUND['amp' + d] + ' , 0.8)';
        e.beginPath();
        e.arc(500, this.position.getY(), 1 + TESLA.SOUND['amp' + d], 0, 2 * Math.PI);
        e.stroke();
        e.fillRect(this.position.getX() + sSpace * d, this.position.getY() + 90, sLineWidth, 1 - TESLA.SOUND['amp' + d])
      }
      COUNT++;
    },
    position: {
      x: 1,
      y: 1
    },
    dimension: {
      width: 1,
      height: 1
    }
  });

  window.myStarElement = myStarElement;
  myStarElement.activeDraw()
});



var invrementatorY = 0;
/*
// Construct it
var attachAudioInputFile = function() {
  // var TestMicrophone = new AudioInputMic(CHANNELS);
  nidza.access.myCHAR1.testAudioFile = new AudioInputFile(CHANNELS, '../../data/uniqs/a.m4a');

  var visualIncY = 0;
  let mySamplerSeparator = nidza.access.myCHAR1.addCustom2dComponent({
    id: "separator",
    draw: function(e) {
      var injector = nidza.access.myCHAR1.testAudioFile;
      if (!e) return;
      var bar_pos = 0, bar_width = 0, bar_height = 0;
      // console.log("CUSTOM DRAW -> ", injector)
      // console.log("CUSTOM DRAW e  -> ", e)
      var fbc_array = new Uint8Array(injector.analyser.frequencyBinCount);
      var bar_count = window.innerWidth * 0.3;
      injector.analyser.getByteFrequencyData(fbc_array);

      // e.clearRect(0, 0, window.innerWidth, window.innerHeight * 5);
      e.fillStyle = "#ffffff";
      for (var i = 0; i < bar_count; i++) {
        bar_pos = i * 4;
        bar_width = 1;
        bar_height = -(fbc_array[i] / 2);
        e.fillRect(bar_pos, visualIncY + 50, bar_width, bar_height);
      }

      // console.log('LOW DETECT LIMIT', bar_height);
      if (bar_height != 0) {
        visualIncY = visualIncY + 200;
      }
    },
    position: {
      x: 1,
      y: 30
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
//addEventListener('click', attachAudioInputFile);

document.getElementById('attacherAudioFile').
  addEventListener('click', attachAudioInputFile);
*/