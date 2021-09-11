//行不通的方法
// function animation() {
//   const items = document.querySelectorAll(".item");
//   const order = [0, 1, 2, 4, 7, 6, 5, 3];
//   const speed = 600;
//   order.forEach((i, j) => {
//     setTimeout(() => {
//       items[i].classList.add("focus");
//     }, j * speed);
//     setTimeout(() => {
//       items[i].classList.remove("focus");
//     }, (j + 1) * speed);
//   });
// }
function animation(num) {
  const items = document.querySelectorAll(".item");
  const order = [0, 1, 2, 4, 7, 6, 5, 3]; //动画依次经过数字的index值
  const speed = 100 //转动速度
  let i = 0
  const around = setInterval(()=>{
    if(i > num-1) {
      clearInterval(around)
      document.querySelector("#display").innerText = '抽中了'+(num%8==0?8:num%8)
      return
    }
    items.forEach((item)=>{
        item.classList.remove("focus")
    })
    items[order[i%8]].classList.add("focus")
    i++
  },speed)
}
function start() {
    const round = 3;//设定在第几轮抽中
    const number = Math.floor(Math.random()*8+1)//设定抽中第几个数字
    animation((round-1)*8+number)
}

document.querySelector("#button").addEventListener('click',start)