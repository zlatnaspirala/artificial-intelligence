## AINidza platform tool

## Face Detect alias FD

### Based on tensorflow.js / canvas2d min ECMA5

### Client AI micro service

### Client web browser JS used.

### Send path to the specific image and iframe will return results.

### Usage from iframe:

Send command to iframe:

```js
AINidzaGlobals.frameWindow.postMessage(
  {project: "AINIdza", action: "FD", img: "../../../imgs/1.jpg"},
  "http://localhost"
);
```

Or VanillaJS

```js
byId("IFRAME_ID").onload = () => {
  console.log("<<<<<<<<<<<<onmessage<<<<<<<<ATTACHED<<<");
  let frameWindow =
    document.getElementById("IFRAME_ID").contentWindow;
  frameWindow.onmessage = function (e) {
    console.log("FD frame :" + e.data);
  };
};
byId("IFRAME_ID").src = "apps/tensorflow/fd/fd.html";
```

Attach event from parent:
````js
AINidzaGlobals.frameWindow.postMessage( { project: "AINIdza", action: "FD" , img: "../../../imgs/1.jpg"}, "http://localhost");
```

Returns:
```js
 {project: 'AI Nidza', faces: Array(1), imageData: ImageData}
```
