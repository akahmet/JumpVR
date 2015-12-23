/* globals THREE */
/**
 * JumpVR - Sensing Jump with Device acceleration
 *
 * @param {Object, Object}
 * @constructor
 *
 * @author Ahmet AK / http://blog.mechatronian.com/
 *
 * W3C Device Orientation event
 * (http://www.w3.org/TR/orientation-event/)
 */

 
 
(function() {
		
	THREE.JumpVR = function(event,options) {
		this.options = options || {max: 3, min: -3/*g*/, TimeOut: 500/* ms */, minTime: 10/* ms */ }
		this.FeedBack = event;
		this.count = 0;
		this.TimeOut = 0;
		this.Up = false; //
		this.orient = {x: 90, y:0, z:0 };
		this.Millis=function() {
			return new Date().getTime();
		};
		
		this.onOrientation = function (e){
			console.log(e);
			this.orient={x: e.gamma, y: e.alpha, z: e.beta }
		}.bind(this);
		
		this.onMotion = function (e){
			var Ax=e.acceleration.x;
			var Ay=e.acceleration.y;
			var Az=e.acceleration.z;
			
			var result = false;
			var calc=Ax*Math.sin(Math.abs(this.orient.x)) + Az * Math.cos(Math.abs(this.orient.x)) + Ay * Math.sin(this.orient.z);
			
			if (calc > this.options.max){
				this.Up = true;
				this.TimeOut = this.Millis();
				//this.count++;
			}
						
			if ((this.Millis()-this.TimeOut) > this.options.TimeOut){
				this.Up = false;
			}
			
			if (this.Up == true && calc < this.options.min && (this.Millis()-this.TimeOut) > this.options.minTime){
				this.count++;
				this.Up = false;
				result = true;
			}
			
			
			this.FeedBack({result: result,count: this.count,event: e});
		}.bind(this);
		
		window.addEventListener('devicemotion', this.onMotion, false);
		window.addEventListener('deviceorientation', this.onOrientation, false);

	}
})();
