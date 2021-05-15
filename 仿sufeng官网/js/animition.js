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