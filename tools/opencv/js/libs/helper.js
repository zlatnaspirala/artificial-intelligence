
export function asyncLoad(path, callback) {

  if (typeof callback === "undefined") {
    callback = function() {
      console.info("Opencvjs is ready.")
    }
  }

  var nuiScript = document.createElement("script")
  nuiScript.src = path
  document.head.appendChild(nuiScript)
  nuiScript.onload = function() {
    callback()
  }

}