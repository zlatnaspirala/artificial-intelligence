/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

/********************************************************************
 * Demo created by Jason Mayes 2020.
 *
 * Got questions? Reach out to me on social:
 * Twitter: @jason_mayes
 * LinkedIn: https://www.linkedin.com/in/creativetech
 ********************************************************************/

const demosSection = document.getElementById('demos');
var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
cocoSsd.load().then(function(loadedModel) {
	model = loadedModel;
	demosSection.classList.remove('invisible');
});

const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');

function hasGetUserMedia() {
	return !!(navigator.mediaDevices &&
		navigator.mediaDevices.getUserMedia);
}

var children = [];
if(hasGetUserMedia()) {
	const enableWebcamButton = document.getElementById('webcamButton');
	enableWebcamButton.addEventListener('click', enableCam);
} else {
	console.warn('getUserMedia() is not supported by your browser');
}

function enableCam(event) {
	if(!model) {
		console.log('Wait! Model not loaded yet.')
		return;
	}
	event.target.classList.add('removed');
	const constraints = {
		video: true
	};
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		video.srcObject = stream;
		video.addEventListener('loadeddata', predictWebcam);
	});
}

function predictWebcam() {
	model.detect(video).then(function(predictions) {
		for(let i = 0;i < children.length;i++) {
			liveView.removeChild(children[i]);
		}
		children.splice(0);
		for(let n = 0;n < predictions.length;n++) {
			// If we are over 66% sure we are sure we classified it right, draw it!
			if(predictions[n].score > 0.66) {
				const p = document.createElement('p');
				p.innerText = predictions[n].class + ' - with '
					+ Math.round(parseFloat(predictions[n].score) * 100)
					+ '% confidence.';
				// Draw in top left of bounding box outline.
				p.style = 'left: ' + predictions[n].bbox[0] + 'px;' +
					'top: ' + predictions[n].bbox[1] + 'px;' +
					'width: ' + (predictions[n].bbox[2] - 10) + 'px;';
				// Draw the actual bounding box.
				const highlighter = document.createElement('div');
				highlighter.setAttribute('class', 'highlighter');
				highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
					+ predictions[n].bbox[1] + 'px; width: '
					+ predictions[n].bbox[2] + 'px; height: '
					+ predictions[n].bbox[3] + 'px;';

				liveView.appendChild(highlighter);
				liveView.appendChild(p);
				children.push(highlighter);
				children.push(p);
			}
		}
		window.requestAnimationFrame(predictWebcam);
	});
}
