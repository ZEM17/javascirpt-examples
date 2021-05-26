var banner = document.getElementsByClassName("banner")[0];
var video = document.getElementsByTagName("video")[0];
var startPosition;
var moveX;
banner.addEventListener("mousemove",moveHandler);
banner.addEventListener("mouseenter",enterHandler);
banner.addEventListener("mouseleave",leaveHandler);
function moveHandler(e){
    moveX=(36-(e.offsetX-startPosition)/21);
    // document.write(moveX);
    video.style.transform="translateX("+moveX+"px) translateY(-4.5px)";
    // video.style.height="100px";
}
function enterHandler(e){
    startPosition=e.offsetX+143;
}
function leaveHandler(e){
    video.style.transform="translateX(36px) translateY(-4.5px)";
    
}
// function leaveAdjust(leaveX){
//     if(leaveX>36) return 1;
//     leaveX=leaveX+0.05;
//     console.log(leaveX);
//     video.style.transform='translateX('+leaveX+'px) translateY(-4.5px)';
//     setTimeout(leaveAdjust(leaveX),10);
// }