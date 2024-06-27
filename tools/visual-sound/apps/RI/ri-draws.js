// --------------------------------------------
// Vanillajs ECMA6 min
// --------------------------------------------
function OSCILLATOR(min, max, step) {
  if((typeof min === 'string' || typeof min === 'number') && (typeof max === 'string' || typeof max === 'number') && (typeof step === 'string' || typeof step === 'number')) {
    var ROOT = this;
    this.min = parseFloat(min);
    this.max = parseFloat(max);
    this.step = parseFloat(step);
    this.value_ = parseFloat(min);
    this.status = 0;
    this.on_maximum_value = function() {};
    this.on_minimum_value = function() {};
    this.UPDATE = function(STATUS_) {
      if(STATUS_ === undefined) {
        if(this.status == 0 && this.value_ < this.max) {
          this.value_ = this.value_ + this.step;
          if(this.value_ >= this.max) {
            this.value_ = this.max;
            this.status = 1;
            ROOT.on_maximum_value();
          }
          return this.value_;
        } else if(this.status == 1 && this.value_ > this.min) {
          this.value_ = this.value_ - this.step;
          if(this.value_ <= this.min) {
            this.value_ = this.min;
            this.status = 0;
            ROOT.on_minimum_value();
          }
          return this.value_;
        }
      } else {
        return this.value_;
      }
    };
  } else {
    console.log("Desciption : Replace object with string or number, min >> ");
  }
}


let PARAM1 = new OSCILLATOR(0,1, 0.001)

let PARAM2 = new OSCILLATOR(0,360, 0.2)

let PARAM3 = new OSCILLATOR(1,5, 0.01)

let kvantum3 = () => {

	RI.SIZE = 22;
	// ctx.clearRect(0, 0, 1000, 1000)
	ctx.fillStyle = 'black';
	
	  ctx.fillRect(0, 0, 1000, 1000)
	// ctx.strokeStyle = `rgb(${RI.ran1(0, 250)} , ${RI.ran1(0, 250)}, ${RI.ran1(0, 250)} )`;
	// Single pass - ne re render for now
	for(var j = 0;j < RI.SIZE;j++) {
		
		for(var z = 0;z < RI.SIZE;z++) {
			ctx.lineWidth = PARAM3.UPDATE();
			ctx.strokeStyle = `rgb(${RI.ran1(222, 222)} , ${RI.ran1(22, 22)}, ${RI.ran1(22, 22)} )`;
			// ctx.fillText('.', RI.ran1(j, j + 1 ), RI.ran1(z, z + 1 ), 202, 202)
			let LOCAX = PARAM2.UPDATE(), LOCAY = PARAM2.UPDATE();
			 ctx.beginPath();
			 ctx.arc(2 * j , 400 ,  3  , 1 * Math.PI / 360 , PARAM2.UPDATE()* Math.PI/ 180)
			 ctx.stroke();
			// Draw the Path
			// ctx.fillText(RI.ranS2(1), LOCAX, LOCAY, 200, 200)

			// ctx.lineWidth = PARAM3.UPDATE();
			// ctx.beginPath();
			// ctx.arc(400, 350 ,  88, PARAM1.UPDATE() * Math.PI,  0 *  Math.PI)
			// ctx.stroke();

			// ctx.beginPath();
			// ctx.arc(200 + PARAM2.UPDATE(), 300 , RI.ran1(0, 1155), PARAM1.UPDATE(), PARAM1.UPDATE())
			// ctx.stroke();
		}
		// ctx.stroke();
	}

	ctx.font = '30px Arial';
	// ctx.fillText('->' + RI.ranS2(1), 10, 30, 230, 111)
	activateRedraw()
};

activateRedraw = () => {
	setTimeout(() => {
		kvantum3();
	},1)
}