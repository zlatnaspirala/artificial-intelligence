/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 * 
 * 
 * Modification by Nikola Lukic 2024
 * Put all in one func.
 * This can be used like client/web tool from iframe or other way.
 * 
 * Usage:
 *  AINidzaFD('imgs/1.png')
 * Return promise
 * 
 */
function byId(id) {return document.getElementById(id)}

addEventListener('message', function(e) {
	console.log('FD frame [integrated]:' + e.data);
	if(e.data.project == "AINIdza" && e.data.action == 'FD') {
		AINidzaFD(e.data.img).then((r) => {
			console.log("ALL DONE", r)
		})
	}
})

document.getElementById('OUTPUT').innerText = `
 AINidza FD is web project based on tensorflow.js library.
 It is idea to be client micro service (no server code).
 Every user will use it on client side.

 You can manual image to get results or 
 Use it in iframe . Communication is already handled.
 Readme.md for more details
`;

let _IMAGE_INPUT_ = null;
byId('inputImage').onchange = function(e) {
	console.log('TEST', e)
	const file = e.target.files[0];
	let fileReader = new FileReader();
	fileReader.readAsDataURL(file);
	fileReader.onload = function() {

		 _IMAGE_INPUT_ = fileReader.result;
		 // Call procedure from manual action
		 AINidzaFD(_IMAGE_INPUT_)
		// images[0].setAttribute('src', fileReader.result);
		// images[0].setAttribute('style', `background-image: url('${fileReader.result}')`);
	}

}

function AINidzaFD(imgSrc) {
	return new Promise((resolve, reject) => {
		try {
			const canvas = document.getElementById("output");
			const ctx = canvas.getContext("2d");
			const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
			const detectorConfig = {
				runtime: 'tfjs',
			};
			faceDetection.createDetector(model, detectorConfig).then((e) => {
				const estimationConfig = {flipHorizontal: false};
				let image = new Image();
				image.src = imgSrc;
				image.onload = () => {
					canvas.width = image.width;
					canvas.height = image.height;
					e.estimateFaces(image, estimationConfig).then((faces) => {
						console.log("faces ", faces)
						dispatchEvent(new CustomEvent('run-visual', {
							detail: {
								faces: faces,
								image: image
							}
						}))
					});
				}
			});

			addEventListener('run-visual', (f) => {
				if (f.detail.faces.length == 0) {
					ctx.fillText("NO FACES DETECTED !", 20, 20, 300, 50)
					resolve({
						project: "AI Nidza",
						faces: [],
						imageData: 'no image data'
					})
					return;
				}
				console.log('Draw results ', f.detail.faces[0])
				ctx.drawImage(f.detail.image, f.detail.faces[0].box.xMin,
					f.detail.faces[0].box.yMin, f.detail.faces[0].box.width, f.detail.faces[0].box.height, 0, 0, 200, 200)

				const imageData = ctx.getImageData(0, 0, 200, 200);
				resolve({
					project: "AI Nidza",
					faces: f.detail.faces,
					imageData: imageData
				})
			})
		} catch(err) {
			reject({error: err})
		}
	})
}