let ENTER_X,
    CURRENT_X,
    offset;


$(document).ready(function(){
    $("#videoBox").mouseenter(function(e){
        $("#videoBox").css("transition","");
        ENTER_X=e.pageX;
    })

    $("#videoBox").mousemove(function(e){
        CURRENT_X=e.pageX;
        offset=(CURRENT_X-ENTER_X)/21;
        $("#videoBox").css('transform',`translateX(${offset}px)`)
    })
    
    $("#videoBox").mouseleave(function(e){
        $("#videoBox").css("transition","0.3s");
        $("#videoBox").css('transform',"");
    })
})

