// This file is for moving the filter

const position = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  filterTop: 0,
  filterLeft: 0
};

var shiftdown = false;

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 16) {
      console.log("Initialise tracking");
      shiftdown = true;
      dragElement(document.getElementById("filter"));
  }
});

document.addEventListener('keyup', function(event) {
  if(event.keyCode == 16) {
    console.log("finishing tracking");
    shiftdown = false;
}
});

document.getElementById("container").addEventListener('mousedown', function(event) {
  dragElement(document.getElementById("filter"));

});



function dragElement(elmnt) {
  // Setting the four  possible positions of the mouse
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  dragMouseDown();

  

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onkeyup = closeDragElement;

    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    // set values to be read by tracking.js
    position.startX = pos3;
    position.startY = pos4;

    console.log("mouse start in " + position.startX + "," + position.startY);

  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    if(shiftdown){
      position.endX = pos3;
      position.endY = pos4;
    }
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    position.filterTop = elmnt.offsetTop - pos2;
    position.filterLeft = elmnt.offsetLeft - pos1;

    position.endX = pos3;
    position.endY = pos4;
    //console.log("new position in " + pos3 + ","+pos4);
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    shiftdown = false;
    document.onmouseup = null;
    document.onmousemove = null;
    // set values to be read by tracking.js
  }
}