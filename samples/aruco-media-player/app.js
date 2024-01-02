// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var track = null;
var detector;
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

var context = cameraSensor.getContext("2d");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            if ("srcObject" in cameraView) {
                cameraView.srcObject = stream;
            } else {
                cameraView.src = window.URL.createObjectURL(stream);
            }
          })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });

        detector = new AR.Detector();

        requestAnimationFrame(tick);

}

function tick(){
    requestAnimationFrame(tick);
    
    if (cameraView.readyState === cameraView.HAVE_ENOUGH_DATA){
      snapshot();

      var markers = detector.detect(imageData);
      console.log(markers)
      drawCorners(markers);
      drawId(markers);
    }
  }

  function snapshot(){
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    context.drawImage(cameraView, 0, 0, cameraView.videoWidth, cameraView.videoHeight);
    imageData = context.getImageData(0, 0, cameraView.videoWidth, cameraView.videoHeight);
  }

  function drawCorners(markers){
    var corners, corner, i, j;
  
    context.lineWidth = 3;

    for (i = 0; i !== markers.length; ++ i){
      corners = markers[i].corners;
      
      context.strokeStyle = "red";
      context.beginPath();
      
      for (j = 0; j !== corners.length; ++ j){
        corner = corners[j];
        context.moveTo(corner.x, corner.y);
        corner = corners[(j + 1) % corners.length];
        context.lineTo(corner.x, corner.y);
      }

      context.stroke();
      context.closePath();
      
      context.strokeStyle = "green";
      context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
    }
  }

  function drawId(markers){
    var corners, corner, x, y, i, j;
    
    context.strokeStyle = "blue";
    context.lineWidth = 1;
    
    for (i = 0; i !== markers.length; ++ i){
      corners = markers[i].corners;
      
      x = Infinity;
      y = Infinity;
      
      for (j = 0; j !== corners.length; ++ j){
        corner = corners[j];
        
        x = Math.min(x, corner.x);
        y = Math.min(y, corner.y);
      }

      context.strokeText(markers[i].id, x, y)
    }
  }

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);