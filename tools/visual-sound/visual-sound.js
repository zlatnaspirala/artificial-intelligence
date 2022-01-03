
// import { Nidza } from "../node_modules/nidza/index";
import { Nidza, Utility } from "nidza";

var nidza = new Nidza();

let myCHAR = {
  id: "myCHAR",
  size: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  parentDom: document.getElementById('testHolder')
};

document.getElementById('loader').style.display = 'none';
nidza.createNidzaIndentity(myCHAR);
nidza.access.myCHAR.setBackground('orangered');

var j = 1;
let myStarElement = nidza.access.myCHAR.addCustom2dComponent({
    id: "CUSTOM",
    // radius: 10 + j,
    // inset: 0.1 + j,
    // n: 6 + j,
    draw: (e) => {
      console.log("CUSTOM DRAW", e)
    },
    position: {
      x: 50,
      y: 50
    },
    dimension: {
      width: 180 + j,
      height: 180+ j
    }
  });

  let rotationOption = new nidza.Osc(0, 90, 0.5, "oscMax");
  window.myStarElement = myStarElement

  var TESLA = {};
  var CHANNELS = 120;
  TESLA.SOUND = {};
  var COUNT = 0
  TESLA.CUSTOM = function (s) {

   SURF.fillStyle = 'rgba(111 ,222 ,22 , 1)';
   for (var d = 0; d < CHANNELS;d++){
    SURF.fillRect( 50 + 10 * d , 120 , 3 , 5 + TESLA.SOUND['amp' + d])
    SURF.strokeStyle = 'rgba('+40+ TESLA.SOUND['amp' + d]+' ,'+11+TESLA.SOUND['amp' + d]+' ,'+1+TESLA.SOUND['amp' + d]+' , 0.8)';
    SURF.beginPath();
    SURF.arc(500, 300, 1 +  TESLA.SOUND['amp' + d], 0, 2 * Math.PI);
    SURF.stroke();
   SURF.fillRect( 50 + 10 * d , 500 , 3 , 5 - TESLA.SOUND['amp' + d])
   }
  // SURF.fill();
    SURF.rotate(90);
    COUNT++
    
  };

  //////////////////////////////////////
  // TEST
  //////////////////////////////////////
   var audioInput = function (channels) {
  
      var root = this;
  
    root.channels = channels;
    
      var audioContext = new AudioContext();
      console.log("audio is starting up ...");
      var BUFF_SIZE = 16384;
      var audioInput = null,
          micStream = null,
          gain_node = null,
          script_processor_node = null,
          script_processor_fft_node = null,
          analyserNode = null;
  
      if (!navigator.getUserMedia)
              navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia || navigator.msGetUserMedia;
  
      if (navigator.getUserMedia){
          navigator.getUserMedia({audio:true}, 
            function(stream) {
                start_microphone(stream);
            },
            function(e) {
              console.log('Error :' + e);
            }
          );
  
      } else { alert('getUserMedia not supported in this browser.'); }
  
      function show_some_data(given_typed_array, num_row_to_display, fromChannel) {
  
     if (typeof fromChannel !== 'undefined'){console.log('from c')} 
          var size_buffer = given_typed_array.length;
          var index = 0;
          var max_index = num_row_to_display;
          for (; index < max_index && index < size_buffer; index += 1) {
              //console.log(given_typed_array[index]);
        TESLA.SOUND['amp' + index] = given_typed_array[index];
          }
      }
  
      function process_microphone_buffer(event) {
  
          var i, N, inp, microphone_output_buffer;
          // just mono - 1 channel for now
          microphone_output_buffer = event.inputBuffer.getChannelData(0); 
      
          // microphone_output_buffer  <-- this buffer contains current gulp of data size BUFF_SIZE
          show_some_data(microphone_output_buffer, root.channels, "from getChannelData");
      }
  
      function start_microphone(stream){
  
        gain_node = audioContext.createGain();
        gain_node.connect( audioContext.destination );
  
        micStream = audioContext.createMediaStreamSource(stream);
        micStream.connect(gain_node); 
  
        script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE, 1, 1);
        script_processor_node.onaudioprocess = process_microphone_buffer;
  
        micStream.connect(script_processor_node);
  
        // document.getElementById('volume').addEventListener('change', function() {
      function changeVolume(value){
            var curr_volume = value;
            gain_node.gain.value = curr_volume;
            console.log("curr_volume ", curr_volume);
      }
       
        // --- setup FFT
  
        script_processor_fft_node = audioContext.createScriptProcessor(2048, 1, 1);
        script_processor_fft_node.connect(gain_node);
  
        analyserNode = audioContext.createAnalyser();
        analyserNode.smoothingTimeConstant = 0;
        analyserNode.fftSize = 2048;
  
        micStream.connect(analyserNode);
  
        analyserNode.connect(script_processor_fft_node);
  
        script_processor_fft_node.onaudioprocess = function() {
  
          // get the average for the first channel
          var array = new Uint8Array(analyserNode.frequencyBinCount);
          analyserNode.getByteFrequencyData(array);
  
          // draw the spectrogram
          if (micStream.playbackState == micStream.PLAYING_STATE) {
              show_some_data(array, root.channels);
          }
        };
      }

    };

  var Test = new audioInput (CHANNELS);
