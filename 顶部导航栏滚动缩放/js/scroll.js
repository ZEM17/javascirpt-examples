var nav = document.getElementById("nav");
var navList = document.getElementById("nav_ul");
var speed = 1;
var timer = null;

document.onmousewheel = function () {
  var e = e || window.event;
  if (document.documentElement.scrollTop < 120) {
    //滚动条距离顶部距离小于120时放大导航栏
    if (nav.offsetHeight == 80) {
      timer = setInterval(function () {
        nav.style.height = nav.offsetHeight + speed + "px"; //nav和navList的高度同时变化
        navList.style.height = nav.offsetHeight + speed + "px";
        if (nav.offsetHeight == 100) {
          clearInterval(timer);
        }
      }, 10);
      //
    }
  } else if (e.wheelDelta < 0) {
    //向下滚动
    if (nav.offsetHeight == 100) {
      //防止设置多个定时器
      timer = setInterval(function () {
        nav.style.height = nav.offsetHeight - speed + "px"; //nav和navList的高度同时变化
        navList.style.height = nav.offsetHeight - speed + "px";
        if (nav.offsetHeight == 80) {
          clearInterval(timer);
        }
      }, 10);
    }
  }
};
