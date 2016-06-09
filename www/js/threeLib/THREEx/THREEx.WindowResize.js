// This THREEx helper makes it easy to handle window resize.
// It will update renderer and camera when window is resized.
//
// # Usage
//
// **Step 1**: Start updating renderer and camera
//
// ```var windowResize = THREEx.WindowResize(aRenderer, aCamera)```
//    
// **Step 2**: Start updating renderer and camera
//
// ```windowResize.stop()```
// # Code

//

/** @namespace */
var THREEx	= THREEx || {};

/**
 * Update renderer and camera when the window is resized
 * 
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
*/
THREEx.WindowResize	= function(renderer, camera){
	var callback	= function(){
	//	container = document.getElementById('section');
	//	var containerStyle = getComputedStyle(container,null);
	//	var SCREEN_HEIGHT = parseInt(containerStyle.getPropertyValue('height')),
    //	SCREEN_WIDTH = parseInt(containerStyle.getPropertyValue('width'));	
    	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;

		// notify the renderer of the size change
		renderer.setSize( SCREEN_WIDTH,SCREEN_HEIGHT );
		// update the camera
		camera.aspect	= SCREEN_WIDTH / SCREEN_HEIGHT;
		camera.updateProjectionMatrix();
	}
	// bind the resize event
	window.addEventListener('resize', callback, false);
	// return .stop() the function to stop watching window resize
	return {
		/**
		 * Stop watching window resize
		*/
		stop	: function(){
			window.removeEventListener('resize', callback);
		}
	};
}
