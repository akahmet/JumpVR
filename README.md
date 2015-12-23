# JumpVR
Jump With WebVR

JumpVR is a module for Three.js to sense jumping thanks to Device Acceleration for Virtual Reality application (i.e: ([WC3]))

I tested it with just CardBoard.
![Google CardBoard](https://developers.google.com/cardboard/images/one-cardboard.png)

# Demo
1. [Jump Count Example] -> [Jump Count Demo]
2. [Jump And Run Example] -> [Jump And Run Demo]

# Getting Started

```html
<script src="js/JumpVR.js"></script>
```
Attach it to html after Three.js

**Using Example**
```js

var jump = new THREE.JumpVR(function(e){
  //e.result if user jump it will return true
  //e.state.count count of jumping
  //e.state.max global max acceleration
  //e.state.min global min acceleration
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

```js
THREE.JumpVR(function(e){},{max: 3, min: -3/*g*/, TimeOut: 500/* ms */, minTime: 10/* ms */ });
```

#TO DO
1. add demo
2. 'll try to make more stabile

**Contact**</p>
you can ask any question</p>
Ahmet AK
ahmetak@gibir.com.tr

**Warning: if you are not at the World, it cannot work :)**

[My Mechatronic Blog]</p>
[GIBIR]

[Jump Count Example]: <https://github.com/akahmet/JumpVR/tree/master/Example/Jump-Count> 
[Jump Count Demo]: <https://cdn.rawgit.com/akahmet/JumpVR/master/Example/Jump-Count/index.html> 

[Jump And Run Example]: <https://github.com/akahmet/JumpVR/tree/master/Example/JumpnRUN> 
[Jump And Run Demo]: <https://cdn.rawgit.com/akahmet/JumpVR/master/Example/JumpnRUN/index.html> 


[WC3]: <http://www.w3.org/TR/orientation-event/>
[GIBIR]: <http://gibir.com.tr>
[My Mechatronic Blog]: <http://blog.mechatronian.com>
