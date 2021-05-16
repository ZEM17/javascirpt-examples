var img = document.getElementById("img");
img.addEventListener("mouseenter",enterHandler);
img.addEventListener("mousemove",moveHandler);
img.addEventListener("mouseleave",leaveHandler);
function enterHandler(e) {
    e.target.setAttribute("zoomed", 1);
}
function moveHandler(e) {
    var imgPosition = e.target.getBoundingClientRect();
    var x = e.offsetX/imgPosition.width;
    var y = e.offsetY/imgPosition.height;
    e.target.style.setProperty('--x',x);
    e.target.style.setProperty('--y',y);   
}
function leaveHandler(e) {
    e.target.removeAttribute("zoomed");
}