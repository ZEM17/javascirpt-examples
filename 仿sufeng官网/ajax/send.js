var btn = document.getElementById("send");
btn.onclick = function(){
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open('get','ajax.php');
    ajaxObj.send();
    ajaxObj.onreadystatechange=function(){
        if(ajaxObj.readyState == 4&&ajaxObj.status == 200){
            console.log(ajaxObj);
            document.getElementsByTagName("div")[0].innerText=ajaxObj.responseText;
            
        }
    }
}