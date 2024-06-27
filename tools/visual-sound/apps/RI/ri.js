// --------------------------------------------
// Vanillajs ECMA6 min
// --------------------------------------------
let byId = (id) => document.getElementById(id);



let canvas = byId('canvas')
canvas.setAttribute('width', '800')
canvas.setAttribute('height', '800')
canvas.style.border = 'solid 5px gray';
canvas.style.width = '800px';
canvas.style.height = '800px';
let ctx = canvas.getContext('2d');

// Global object
let RI = {
	SIZE: 55
};

RI.timeData = () => new Date().getTime();
RI.ran1 = (min, max) => {return Math.floor(Math.random() * (max - min)) + min};
RI.ranS = () => Math.random().toString(36).slice(2)
RI.ranSSingle = () => Math.random().toString(36).slice(2)[0]
RI.ranS2 = (length) => {
	let result = '';
	// const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const charactersLength = characters.length;
	let counter = 0;
	while(counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

let kvantum = () => {
	ctx.clearRect(0, 0, 1000, 1000)
	ctx.fillStyle = 'red';
	// ctx.strokeStyle = `rgb(${RI.ran1(0, 250)} , ${RI.ran1(0, 250)}, ${RI.ran1(0, 250)} )`;
	// Single pass - ne re render for now
	for(var j = 50;j < RI.SIZE;j++) {
		ctx.beginPath();
		ctx.moveTo(RI.ran1(50, 700), RI.ran1(50, 700));
		for(var z = 50;z < RI.SIZE;z++) {
			ctx.strokeStyle = `rgb(${RI.ran1(0, 250)} , ${RI.ran1(0, 250)}, ${RI.ran1(0, 250)} )`;
			// ctx.fillText('.', RI.ran1(j, j + 1 ), RI.ran1(z, z + 1 ), 202, 202)
			let LOCAX = RI.ran1(50, 700), LOCAY =  RI.ran1(50, 700);
			ctx.lineTo(LOCAX, LOCAY);
			// Draw the Path
			ctx.fillText(RI.ranS2(1), LOCAX, LOCAY, 200, 200)
		}
		ctx.stroke();
	}

	ctx.font = '30px Arial';
	ctx.fillText('->' + RI.ranS2(1), 10, 30, 230, 111)
};

let kvantum2 = () => {
	ctx.clearRect(0, 0, 1000, 1000)
	ctx.fillStyle = 'red';
	// ctx.strokeStyle = `rgb(${RI.ran1(0, 250)} , ${RI.ran1(0, 250)}, ${RI.ran1(0, 250)} )`;
	// Single pass - ne re render for now
	for(var j = 50;j < RI.SIZE;j++) {
		ctx.beginPath();
		ctx.moveTo(RI.ran1(50, 700), RI.ran1(50, 700));
		for(var z = 50;z < RI.SIZE;z++) {
			ctx.strokeStyle = `rgb(${RI.ran1(0, 255)} , ${RI.ran1(0, 255)}, ${RI.ran1(0, 255)} )`;
			// ctx.fillText('.', RI.ran1(j, j + 1 ), RI.ran1(z, z + 1 ), 202, 202)
			let LOCAX = RI.ran1(50, 700), LOCAY =  RI.ran1(50, 700);
			ctx.lineTo(LOCAX, LOCAY);
			// Draw the Path
			ctx.fillText(RI.ranS2(1), LOCAX, LOCAY, 200, 200)

			ctx.arc(LOCAX, LOCAY, RI.ran1(0, 155), RI.ran1(0, 155), RI.ran1(155, 360))
		}
		ctx.stroke();
	}

	ctx.font = '30px Arial';
	ctx.fillText('->' + RI.ranS2(1), 10, 30, 230, 111)
};