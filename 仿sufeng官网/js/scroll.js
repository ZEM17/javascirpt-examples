var nav = document.getElementById("nav");
var navList = document.getElementById("nav_ul");
var speed = 1;
var timer1,
  timer2 = null;
function up() {
  if (nav.offsetHeight == 100) {
    return;
  }
  nav.style.height = nav.offsetHeight + speed + "px"; //nav和navList的高度同时变化
  navList.style.height = nav.offsetHeight + speed + "px";
  setTimeout(up, 5);
}
function down() {
  if (nav.offsetHeight == 80) {
    return;
  }
  nav.style.height = nav.offsetHeight - speed + "px"; //nav和navList的高度同时变化
  navList.style.height = nav.offsetHeight - speed + "px";
  setTimeout(down, 5);
}
document.onscroll = function () {
  var e = e || window.event;

  if (document.documentElement.scrollTop < 100) {
    //滚动条距离顶部距离小于100时放大导航栏
    if (nav.offsetHeight == 80) {
      up();
    }
  } else if (document.documentElement.scrollTop >= 100) {
    //滚动条距离顶部距离大于等于100时放大导航栏
    if (nav.offsetHeight == 100) {
      down();
    }
  }
};
