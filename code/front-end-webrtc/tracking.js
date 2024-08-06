// This file is for the practical stuff that is relevant for the project

// Global variables
var keydown = false;
var mousedown = false;
var shiftdown = false;
var ctrldown = false;
var lastLedPosition = 7;
var frame_offsetX = 0;
var frame_offsetY = 0;
var focus_diameter = 10; 
var degreeOfView = 146;
var numberOfLedPositions = 12; 
var numOfLEDs = 1;
var static = true;
var currentLedPosition = 6;
var ledState = true;
var useLedForMovement = false;

// The below global variables are for calibrating the click and look interaction in the x & y direction
var maxTiltVideoHeight = 36.4;
var minTiltVideoHeight = -36.4;
var maxScaledTilt = 20;
var minScaledTilt = -20;
var maxTurnVideoHeight = 110;
var minTurnVideoHeight = -110;
var maxScaledTurn = 75;
var minScaledTurn = -75;

// Mouse tracking
const mouse = {
  x: 0,
  y: 0,
  dirty: false
};

const video = {
  width: 0,
  height: 0
};

// Set up the interface
setAll();

// Listeners for the interface
document.getElementById("video_frame").addEventListener('mousedown', setmousedown);
document.getElementById("container").addEventListener('dblclick', function(event){
  doubleClickLocation(event);
});
document.getElementById("video_frame").addEventListener('mouseup', function(event){
  recordTracking(event);
  mousedown = false;
});

document.addEventListener('keydown', function(event) {
  if(!keydown){
    if(event.keyCode == 37) {
      sendMoveMessage("null", -360, 0);
      keydown = true;
    } else if(event.keyCode == 38) {
      if(ctrldown){
        sendMoveMessage("null", 0, 100);
      }else{
        sendMoveMessage("forward", 0, 0);
      }
      keydown = true;
    } else if(event.keyCode == 39) {
      sendMoveMessage("null", 360, 0);
      keydown = true;
    } else if(event.keyCode == 40) {
      if(ctrldown){
        sendMoveMessage("null", 0, -100);
      }else{
        sendMoveMessage("backward", 0, 0);
      }
      keydown = true;
    }else if(event.keyCode == 16) {
      console.log("shift down");
      shiftdown = true;
      keydown = true;
      ledState = true;
      sendJSONMessage("look","null",0,0, currentLedPosition, ledState, useLedForMovement); // Send JSON message to turn on LEDs when shift is pressed
    }
    else if(event.keyCode == 17) {
      console.log("ctrl down");
      ctrldown = true;
      keydown = true;
    }
  }
});
//(up = 100, down = -100);
// listeners for release of keys
document.addEventListener('keyup', function(event) {
  if(keydown){
    if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
      sendMoveMessage("stop", 0, 0);
      keydown = false;
    }else if(event.keyCode == 16){
      console.log("Shift up")
      shiftdown = false
      ledState = false
      document.getElementById('circle').style.display = "none";
      sendJSONMessage("look", "null", 0, 0, currentLedPosition, ledState, useLedForMovement) // Send JSON message to turn off LEDs when shift is released
      keydown = false;
    }else if(event.keyCode == 17){
      ctrldown = false
      keydown = false;
    }
  }
});

// Function for setting a variable used for calculating the LED light to turn on
function setmousedown(){
  console.log("mouse set down");
  mousedown = true;
}

/**
 * Function for calculating the degree of movement in either direction based on input from the drag.js file
 */
function recordTracking(event){
  console.log("tracking location");

  console.log("movin from " + position.startX + "," + position.startY + " to " + position.endX + "," + position.endY);

  // calculating distance travelled and direction
  var directionX = calculateDirection(position.startX, position.endX);
  var directionY = calculateDirection(position.startY, position.endY);

  if(position.startX != (video.width-frame_offsetX)/2 || position.startY != video.height/2){
    console.log("double click");
    doubleClickLocation(event);
    return; 
  }

  // if user is simply clicking on the screen, do nothing
  if(directionX == 0 && directionY == 0){
    return;
  }

  // output vector
  sendMoveMessage("null", directionX, directionY);
  mousedown = false;
  animateStuff(event, directionX, directionY);
}

function calculateDistance(start, end){
  var distance = degreeOfView/1000*Math.abs(start-end);
  console.log("distance is " + distance);
  return distance;
}

function calculateDirection(start, end){
  var distance = calculateDistance(start,end);
  // The following code is used for setting the direction of the movement
  var direction = 0;
  if(start > end){
    // Moving left or up
    direction = -Math.abs(distance);
    console.log("Direction is left or up");
  } else {
    // Moving right or down
    direction = distance;
    console.log("Direction is right or down");

  }
  //console.log("Direction is " + direction);
  return direction;
}

/**
 * Function to set the filter position and send message to Pi about curser position
 */
function doubleClickLocation(event){
  // calculate distance and direction and scale it to a length that centers the point clicked at in the screen
  directionX = scaleCoordinatesToWindowSize(calculateDirection((video.width-frame_offsetX)/2, mouse.x), minTurnVideoHeight, maxTurnVideoHeight, minScaledTurn, maxScaledTurn);
  directionY = scaleCoordinatesToWindowSize(calculateDirection(video.height/2, mouse.y), minTiltVideoHeight, maxTiltVideoHeight, minScaledTilt, maxScaledTilt);

  // if user is double clicking in the already set position, do nothing
  if(directionX == 0 && directionY == 0){
    return;
  }

  // Set the filter to new position
  var blur_object = document.getElementById("blur_object");

  // blur distance and direction
  var directionLeft = -video.width + mouse.x -position.filterLeft;
  var directionTop = -video.height + mouse.y - position.filterTop;
  blur_object.style.left = directionLeft + "px";
  blur_object.style.top = directionTop + "px";

  sendMoveMessage("null", directionX, directionY);
  animateStuff(event, directionX, directionY);
}


/**
 * Some code for constantly tracking the position of the mouse. This is useful for collecting data, but not for moving the filter! That is purely done in the drag.js file
 */
document.querySelector('#video_frame').addEventListener('mousemove', (evt) => {
  // Setting the x and y value of the curser position
  mouse.x = evt.offsetX;
  mouse.y = evt.offsetY;

  if( !mouse.dirty ) {
    // If mouse has moved, process the move method
    requestAnimationFrame( move );
    mouse.dirty = false;
  }
  mouse.dirty = true;
});

/**
 * Function repeated every time the curser has changed position
 * Be limited with what you do in this function - it is best for collecting information, not setting things
 */
function move() {
  // If the filter is moving, track the horizontal position of the curser to use for setting the LED value on the robot
  if(mousedown || shiftdown){
    calculateLED();
  }
  // console.log("mouse in position: " + mouse.x + "," + mouse.y);
  // Of the filter is double clicked at any point, this function will run
  //document.getElementById("video_frame").ondblclick = function() {doubleClickLocation()};
  mouse.dirty = false;
}

function calculateLED(){
  currentLedPosition = getConstrainedLEDPosition(Math.ceil(position.endX/(video.width/numberOfLedPositions)));
  if (currentLedPosition != lastLedPosition) {
    lastLedPosition = currentLedPosition;
    sendJSONMessage("look","null",0,0, currentLedPosition, ledState, useLedForMovement);
  }
}

function getConstrainedLEDPosition(ledPosition){
  if(ledPosition > numberOfLedPositions) {
    ledPosition = numberOfLedPositions;
  }
  if(ledPosition < 0) {
    ledPosition = 0;
  }
  return ledPosition
}

function sendMoveMessage(drive, turn, tilt){
  if(drive == null){
    drive = "null";}
  
  // formattedMessage = "move:<" + drive + "," + turn + "," + tilt + ">";
  // console.log(formattedMessage);
  // sendDataToServer(formattedMessage);
  sendJSONMessage("move",drive,turn,tilt,6, true, useLedForMovement)
}

function sendJSONMessage(type, driveVal, turnVal, tiltVal, led_direction, led_on, led_for_movement){
  // Default object with placeholder items 
  var msg = {
      type:"look", 
      driveVal:"stop",
      turnVal:0,
      tiltVal: 0,
      led_direction: numberOfLedPositions/2,
      led_num: 1,
      led_on: true,
      led_for_movement: false
  };
  // populating object with specified parameters 
  msg.type = type;
  msg.driveVal = driveVal;
  msg.turnVal = turnVal;
  msg.tiltVal = tiltVal;
  msg.led_direction = led_direction;
  msg.led_num = numOfLEDs;
  msg.led_on = led_on;
  msg.led_for_movement = led_for_movement;

  stringifiedMessage = JSON.stringify(msg);

  console.log(stringifiedMessage);
  sendDataToServer(stringifiedMessage);
}

function setExperiment(status){
  // formattedMessage = "experiment:< '" + status + "' >";

  // console.log(formattedMessage);
  sendJSONMessage("experiment",status,0,0,6,3,ledState,useLedForMovement);
}

/**
 * All layout based code
 */

function setAll(){
  setUpVideo();
  setUpView();
  setUpBlurAndLedInteraction();
  closeMenu();
  setUpControlArea();
  setUpGif();
}

function displayMenu(){
  var menu = document.getElementById("toggle-menu");
  menu.style.display = "block";
}

function closeMenu(){
  document.getElementById("toggle-menu").style.display="none";
}

function setUpBlurAndLedInteraction(){
  var blur_object = document.getElementById("blur_object");
  var blur_setting = document.getElementById("input_blur_degree").value;
  var focus_diameter = document.getElementById("input_focus_diameter").value;
  var dynamic_blur = document.getElementById("input_blur_dynamic");
  
  //numOfLEDs = (focus_diameter - 4)*(13 - 1)/(52-4)+1;
  numOfLEDs = 3; // Detaching number of LEDs from WoF

  blur_object.style.position = "absolute";
  blur_object.style.padding = video.height + "px " + video.width + "px";
  blur_object.style.backdropFilter = "blur(" + blur_setting + "px)";
  blur_object.style.top = -video.height*0.5 + "px";
  blur_object.style.left = -video.width + "px";

  // setting the blur direction
  if(dynamic_blur.checked){
    // Radial gradient
    $('#blur_object').css('-webkit-mask-image',"radial-gradient(transparent, black " + focus_diameter + "%, black)");
    blur_object.style.display = "initial";
    static = false;
    useLedForMovement = true;
    return;
    }
  blur_object.style.display = "none";
  static = true;
}

function setUpVideo(){
  var video_setting = document.getElementById("remote-video");
  video.width = document.getElementById("video_input_width").value;
  video.height = document.getElementById("video_input_height").value;
  var view_height = document.getElementById("video_input_wiew_height").value;
  video_setting.style.width= video.width + "px";
  video_setting.style.height = video.height + "px";
  video_setting.style.position = "absolute";
  video_setting.style.top = -(video.height-view_height)/2 + "px";
}

function setUpView(){
  var frame = document.getElementById("video_frame");
  var border_box = document.getElementById("static_object");
  var view_width = document.getElementById("video_input_wiew_width").value;
  var view_height = document.getElementById("video_input_wiew_height").value;
  frame_offsetX = video.width - view_width;
  frame_offsetY = video.height - view_height;
  video.height = view_height;
  frame.style.width=video.width + "px";
  frame.style.height=video.height + "px";
  frame.style.position="absolute";
  frame.style.top = 0 + "px";

  border_box.style.width=view_width + "px";
  border_box.style.height=view_height + "px";
  border_box.style.position="absolute";
  border_box.style.top = 0 + "px";
  border_box.style.borderLeft=frame_offsetX/2 + "px solid black";
  border_box.style.borderRight=frame_offsetX/2 + "px solid black";
}

function setUpControlArea(){
  var control_area = document.getElementById("control_area");
  control_area.style.top = video.height + "px";
}

function setUpGif(){
  var gif = document.getElementById("background_gif");
  gif.style.position = "absolute";
  gif.style.width = video.width + "px";
  gif.style.height = video.height + "px";
  gif.style.top = 0+ "px";
  gif.style.backgroundColor = "black";
}

function hideGif(){
  var gif = document.getElementById("background_gif");
  gif.style.display = "none";
}

function showGif(){
  var gif = document.getElementById("background_gif");
  gif.style.display = "revert";
}

// Scales a number from one range into another range
function scaleCoordinatesToWindowSize(number, inMin, inMax, outMin, outMax) {
  return (number-inMin)*(outMax-outMin)/(inMax-inMin)+outMin;
}









// Javascript code to add keyframes
let styleSheet = null;
dynamicAnimation = (name,styles) => {
// Creating a style element to add the keyframes to
    if (!styleSheet){
        styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        document.head.appendChild(styleSheet);
    }
// Adding The Keyframes
    styleSheet.sheet.insertRule(`@keyframes ${name} {${styles}}`);
}

// Setting a variable to ensure all set animationnames are unique
var i = 0;

function animateStuff(event, endLeft, endTop){
    var blur_element = document.getElementById("blur_object");
    var duration = document.getElementById("animation_duration").value;
    event.preventDefault();    

    var numOfPixelsTop = -1000/degreeOfView*endTop;
    var numOfPixelsLeft = -1000/degreeOfView*endLeft;

    console.log("animating animatable stuff to " + mouse.x + "," + mouse.y);


    dynamicAnimation('newAnimation'+i, "from {transform : translate("+endLeft+","+endTop+")} to {transform : translate("+numOfPixelsLeft+"px,"+numOfPixelsTop+"px)}");
    blur_element.style.animation = 'newAnimation'+i+' ' + duration + 'ms';
    i++;

    setTimeout(function() {
        console.log("filter in new position");
        blur_element.style.top = -video.height*0.5 - position.filterTop + 'px';
        blur_element.style.left = -video.width*0.5 - position.filterLeft + 'px';

    }, duration);
}



jQuery(document).ready(function() {

  var mouseX = 0, mouseY = 0;
  var xp = 0, yp = 0;
   
  $(document).mousemove(function(e){
    mouseX = e.pageX - 30;
    mouseY = e.pageY - 30; 
  });
    
  setInterval(function(){
    xp += ((mouseX - xp)/6);
    yp += ((mouseY - yp)/6);
    if(static && shiftdown){
      document.getElementById('circle').style.display = "inherit";
      $("#circle").css({left: xp +'px', top: yp +'px'});

    }
  }, 0);

});
