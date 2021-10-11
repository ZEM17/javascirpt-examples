//absolute实现
const itemArr = [...document.querySelectorAll(".item")]
const container = document.querySelector(".container")
const containerWidth = container.offsetWidth
const itemWidth = itemArr[0].offsetWidth
const colNum = Math.floor(containerWidth/itemWidth)
const leftGap = 10
const topGap = 10



//计算出哪列高度小，选择该列
window.onload=function(){
    let heights = []
    let minHeight
    let minIndex  //minIndex也是col
    itemArr.forEach((item,index)=>{
        if(index<colNum) {
            item.style.left=index*(itemWidth+leftGap)+"px"
            heights.push(item.offsetHeight+topGap)
            return
        }
        minIndex = 0
        minHeight = heights[0]
        heights.forEach((height,index)=>{
            if(height<minHeight){
                minHeight = height
                minIndex=index
            }
        })
        item.style.left=minIndex*(itemWidth+leftGap)+"px"
        item.style.top=heights[minIndex]+"px"
        heights[minIndex] = heights[minIndex] + item.offsetHeight + topGap 
    })
}

//reduce第三个参数是index














//错误思路
// const row = (index-index%3)/3
//     const filterArr = itemArr.filter((item,index)=>{
//         if(index<(row-1)*3||index>((row-1)*3)+2) return false
//         return true
//     })
//     let aboveItem = filterArr.reduce((last,next)=>{
//         return last.offsetHeight<next.offsetHeight?last:next
//     })
//     selected.push(aboveItem)
//     const aboveItemHeight = aboveItem.offsetHeight
//     const aboveItemTop = aboveItem.offsetTop
//     const col = itemArr.indexOf(aboveItem)%3
//     // handleItem(aboveItem,col,row,aboveItemTop,aboveItemHeight)
//     console.log(aboveItem) //top属性用offsetTop获取
//     // console.log(selected)
//     // console.log(row)
//     //这里错了，每次选完后就不考虑，可以用filter
//     // for(let i = (row-1)*3; i < ((row-1)*3)+2;i++) {
//     //     if(itemArr[i].offsetHeight < aboveItemHeight) {
//     //         aboveItemHeight = itemArr[i].offsetHeight
//     //         col = i
//     //     }
//     // }

//     // handleItem(item,col,row,aboveItemHeight)