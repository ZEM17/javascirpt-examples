function Person(name,comment,pic){
    this.name=name;
    this.comment=comment;
    this.pic=pic;
}
var users = [];
var user1 = new Person('user1',"宿蜂是一款非常轻便的小程序，一键发单，接单速度快，准时高效，为我的生活提供了很多便利。","./img/users1.jpg");
var user2 = new Person('user2',"刚接触宿蜂是被朋友安利的，听说是一群学姐学长创业做的，就尝试了一下。发现真的很人性化，减少了很多沟通的成本。现在一有快递，就想到去宿蜂发单。偶尔自己取快递的时候，也会接别人发的订单，顺路送一下。","./img/users2.jpg");
var user3 = new Person('user3',"相比于我之前用过的校园跑腿小程序来说，宿蜂更加值得信赖，只要是在两个方面，第一：接单的人都有宿蜂平台的审核，确保是学生才会审核通过；第二：完善的发单接单流程，有人接单后，会把接单员的一些信息告知给发单人，体验很好，不用担心包裹丢失。","./img/users3.jpg");
var user4 = new Person('user4',"我是宿蜂的认证接单员，在宿蜂平台上通过接单，算是也赚到了一些生活费。一开始也只是试试的态度，但接触到了宿蜂创业团队的成员，也是跟我差不多大的学生，我觉得他们是在做一件很了不起的事情。","./img/users4.jpg");
var user5 = new Person('user5',"宿蜂的主要特色就是顺路带物，互帮互助。平台的“宿蜂榜”真的超级吸引人，多劳多得被完美诠释出来，并且并没有什么套路，简单粗暴，希望宿蜂能够继续这样下去。","./img/users5.jpg");
users.push(user1);
users.push(user2);
users.push(user3);
users.push(user4);
users.push(user5);
console.log(users);
$(document).ready(function(){
//评论
$(".gradient_text li").each(function(){
    // console.log($(this).index());
    $(this).append('<div class="gradient_img"></div><span>“</span>'+users[$(this).index()].comment+'<span>”</span>');
    // $(this).css("color","red");
});

//头像
var i = 0;
$("div.gradient_img").each(function(){
    
    console.log($(this).index());
    $(this).css("background-image",'url("'+users[i++].pic+'")');
});
})