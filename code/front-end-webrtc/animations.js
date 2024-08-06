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
var blur_element = document.getElementById("blur_object");

function animateStuff(event, endLeft, endTop){
    var duration = document.getElementById("animation_duration").value;
    event.preventDefault();    

    var numOfPixelsTop = -1000/180*endTop;
    var numOfPixelsLeft = -1000/180*endLeft;

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