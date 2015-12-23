# JumpVR
Jump With WebVR

JumpVR is a module for Three.js to sense jumping thanks to Device Acceleration (i.e: ([WC3]))

# Getting Started

```html
<script src="js/JumpVR.js"></script>
```
Attach it to html after Three.js

**Using Example**
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

**Options**

```js
THREE.JumpVR(Event,Options);
```

```js
{max: 3, min: -3/*g*/, TimeOut: 500/* ms */, minTime: 10/* ms */ }
```

**Contact**</p>
you can ask any question</p>
Ahmet Ak
ahmetak@gibir.com.tr

**Warning: if you are not at the World, it cannot work :)**

[My Mechatronic Blog]</p>
[GIBIR]

[WC3]: <http://www.w3.org/TR/orientation-event/>
[GIBIR]: <http://gibir.com.tr>
[My Mechatronic Blog]: <http://blog.mechatronian.com>
