var index = 0;
var imgWidth = 400;
var maxlen =
  document.getElementById("carousel_img_ul").getElementsByTagName("li").length -
  1;
var img_ul = document.getElementById("carousel_img_ul");
var buttonL = document.getElementById("carousel_left");
var buttonR = document.getElementById("carousel_right");
var autoPlay;

//切换到下一张图片
function next() {
  img_ul.style.marginLeft = "-" + imgWidth * index + "px";
  img_ul.style.transition = "0.3s";
}

//向右切换到最后一张图片后
function resetR() {
  next();
  setTimeout(function () {
    img_ul.style.marginLeft = "0px";
    img_ul.style.transition = "0s";
    index = 0;
  }, 300);
}
//向左切换到第一张图片后
function resetL() {
  index = 4;
  img_ul.style.transition = "0s";
  img_ul.style.marginLeft = "-" + imgWidth * index + "px";
  index--;
  setTimeout(function () {
    img_ul.style.transition = "0.3s";
    img_ul.style.marginLeft = "-" + imgWidth * index + "px";
  }, 10);
}

//自动切换图片
function changeAuto() {
  if (index < maxlen) {
    index++;
    next();
  } else {
    resetR();
  }
}

//按钮点击切换,被点击时停止自动切换
buttonL.onclick = function () {
  clearInterval(autoPlay);
  autoPlay = null;
  index--;
  if (index == -1) {
    resetL();
  } else {
    next();
  }
};
buttonR.onclick = function () {
  clearInterval(autoPlay);
  autoPlay = null;
  index++;
  if (index == maxlen) {
    resetR();
  } else {
    next();
  }
};
//鼠标移出按钮时开始自动切换
buttonR.onmouseout = function () {
  if (autoPlay == null) {
    autoPlay = setInterval(changeAuto, 3000);
  }
};
buttonL.onmouseout = function () {
  if (autoPlay == null) {
    autoPlay = setInterval(changeAuto, 3000);
  }
};
autoPlay = setInterval(changeAuto, 3000);

//grandient
var grandientText = document.getElementsByClassName("gradient_text")[0].children;
var pointers = document.getElementsByClassName("curdots_li");
for (var i = 0; i < pointers.length; i++) {
  (function (i) {
    pointers[i].onclick = function () {
      for(j = 0;j < pointers.length; j++){
        grandientText[j].style.opacity="0";
        pointers[j].style.backgroundColor="rgb(247,247,247)";
      }
      this.style.backgroundColor="rgb(255, 209, 51)";
      grandientText[i].style.opacity="1";
    };
  }(i));
}
var originIndex=1;
setInterval(function(){
  for(j = 0;j < pointers.length; j++){
    grandientText[j].style.opacity="0";
    pointers[j].style.backgroundColor="rgb(247,247,247)";
  }
  pointers[originIndex].style.backgroundColor="rgb(255, 209, 51)";
  grandientText[originIndex].style.opacity="1";
  if(originIndex==4){
    originIndex=0;
  }else{
    originIndex++;
  }
},5000)