# JumpVR
Jumping On webVR

Three.js Library for Sensing jumping with Device Acceleration (i.e: (http://www.w3.org/TR/orientation-event/))

# Getting Started
```js

var jump = new THREE.JumpVR(function(e){
  //e.result if user jump it will return true
  //e.count count of jumping
  //e.event is devicemotion event
  if (e.result){
    console.log(e);
  }
});

```
