
import { Nidza } from "nidza";
// import {Nidza, Utility} from "../node_modules/nidza/index";
import { TESLA, CHANNELS, AudioInputMic } from "../js/ai-mic.js";

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

// let rotationOption = new nidza.Osc(0, 90, 0.5, "oscMax");
document.getElementById('attacherAudioMic').addEventListener('click', () => {

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
      x: 25,
      y: 25
    },
    dimension: {
      width: 1,
      height: 1
    }
  });

  window.myStarElement = myStarElement;
  myStarElement.activeDraw()
});
