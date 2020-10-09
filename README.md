# JS-ARUCO2

**js-aruco2** is a fork of [js-aruco](https://github.com/jcmellado/js-aruco) that support also the ARUCO_MIP_36h12 dictionary and adaptable to use any other ArUco or custom dictionary.

[ArUco](http://www.uco.es/investiga/grupos/ava/node/26) is a minimal library for Augmented Reality applications based on OpenCv.

## Demos

100% JavaScript (see details bellow):

- [Webcam live demo! (ARUCO Dictionary)](https://damianofalcioni.github.io/js-aruco2/samples/getusermedia/getusermedia_ARUCO.html)

- [Webcam live demo! (ARUCO_MIP_36h12 Dictionary)](https://damianofalcioni.github.io/js-aruco2/samples/getusermedia/getusermedia_ARUCO_MIP_36h12.html)

- [Visual debugging live demo (ARUCO_MIP_36h12 Dictionary)!](https://damianofalcioni.github.io/js-aruco2/samples/debug/debug.html)

- [3D Earth (ARUCO_MIP_36h12 Dictionary)!](https://damianofalcioni.github.io/js-aruco2/samples/debug-posit/debug-posit.html)

## Markers 

A square grid with an external unused black border. Internal cells contains id information.

The markes are recognized using the dictionary specified. The library currently support the following dictionaries:
- ARUCO: 6x6 Marker with 25 bit information, minimum hamming distance between any two codes = 1 and 1024 codes.
- [ARUCO_MIP_36h12](https://sourceforge.net/projects/aruco/files/aruco_mip_36h12_dict.zip/download): 8x8 Marker with 36 bit information, minimum hamming distance between any two codes = 12 and 250 codes.

The library can be anyway easily adapted to work with any other ArUco dictionary for square markers. 

## Usage
Create an `AR.Detector` object using default ARUCO_MIP_36h12 dictionary:

```
var detector = new AR.Detector();
```
Create an `AR.Detector` object using a specific dictionary (Currently available dictionaries are 'ARUCO' and 'ARUCO_MIP_36h12'):

```
var detector = new AR.Detector('ARUCO');
```

Call `detect` function:

```
var markers = detector.detect(imageData);
```

`markers` result will be an array of `AR.Marker` objects with detected markers.

`AR.Marker` objects have two properties:

 * `id`: Marker id.
 * `corners`: 2D marker corners.

`imageData` argument must be a valid `ImageData` canvas object.

```
var canvas = document.getElementById("canvas");
    
var context = canvas.getContext("2d");

var imageData = context.getImageData(0, 0, width, height);
```

## 3D Pose Estimation
Create an `POS.Posit` object:

```
var posit = new POS.Posit(modelSize, canvas.width);
```

`modelSize` argument must be the real marker size (millimeters).

Call `pose` function:

```
var pose = posit.pose(corners);
```

`corners` must be centered on canvas:

```
var corners = marker.corners;

for (var i = 0; i < corners.length; ++ i){
  var corner = corners[i];

  corner.x = corner.x - (canvas.width / 2);
  corner.y = (canvas.height / 2) - corner.y;
}
```

`pose` result will be a `POS.Pose` object with two estimated pose (if any):

 * `bestError`: Error of the best estimated pose.
 * `bestRotation`: 3x3 rotation matrix of the best estimated pose.
 * `bestTranslation`: Translation vector of the best estimated pose.
 * `alternativeError`: Error of the alternative estimated pose.
 * `alternativeRotation`: 3x3 rotation matrix of the alternative estimated pose.
 * `alternativeTranslation`: Translation vector of the alternative estimated pose.

Note: POS namespace can be taken from posit1.js or posit2.js.
