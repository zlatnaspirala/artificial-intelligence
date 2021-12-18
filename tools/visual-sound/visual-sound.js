window.START = function(){

  // SYS.DOM.CREATE_SURFACE( "SURF" , "HELLO_WORLD" , 100 , 99.4 , "DIAMETRIC" );
  //NOW HELLO_WORLD IS OBJECT WITH ONE CANVAS TAG
  // HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
  // var SMODULE = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER"); 
  // SMODULE.NEW_OBJECT("TESLA" , 45 , 35 , 20 , 10 , 10);
  // TESLA.TYPE_OF_GAME_OBJECT = 'CUSTOM';

  var CHANNELS = 120;
  TESLA.SOUND = {};

  // HELLO_WORLD.MAP.CLEAR_MAP = true;
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

   var Test = new audioInput (CHANNELS)
   }
  
  setTimeout (function (){
      window.START();
  } , 1);

  setTimeout (function (){
      window.START();
  }, 1100);