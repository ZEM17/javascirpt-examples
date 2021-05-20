var liDot = document.querySelectorAll(".li_dot");
var historyList = document.querySelectorAll(".history_list");
// var historyRecord = document.getElementsByClassName('history_record')[0];//尝试用事件委托
for(var i = 0; i < historyList.length;i++){
    historyList[i].i=i;
    historyList[i].onmousemove = function(){
        liDot[this.i].className = "li_dot_active";
    }
    historyList[i].onmouseleave = function () {
        liDot[this.i].className = "li_dot";
      };
}
//滚动缩放导航栏
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
