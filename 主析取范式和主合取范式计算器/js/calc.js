var inStack = {
  "#": 0,
  "(": 1,
  "﹁": 10,
  "∧": 8,
  "∨": 6,
  "→": 4,
  "⇔": 2,
  ")": 12,
};
var outStack = {
  "#": 0,
  "(": 12,
  "﹁": 11,
  "∧": 9,
  "∨": 7,
  "→": 5,
  "⇔": 3,
  ")": 1,
};
var map = {
  false: false,
  true: true,
};
//二叉树结点定义
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}
var calcString = ""; //用户输入的字符串
var disjunctiveForm = ""; //主析取范式
var conjunctiveForm = ""; //主合取范式
//计算不重复的字母数量(即命题数)
function alphaNum(string) {
  var alphas = [];
  var num = 0;
  for (var i = 0; i < string.length; i++) {
    if (
      string[i] != "(" &&
      string[i] != "﹁" &&
      string[i] != "∨" &&
      string[i] != "∧" &&
      string[i] != "→" &&
      string[i] != "⇔" &&
      string[i] != ")"
    ) {
      if (alphas.indexOf(string[i]) == -1) {
        alphas[num++] = string[i];
      }
    }
  }
  return alphas;
}

//转换为后缀表达式
function transfer(transferSring) {
  var stack = [];
  stack.push("#");
  var outputString = "";
  for (var i = 0; i < transferSring.length; i++) {
    if (
      transferSring[i] != "(" &&
      transferSring[i] != "﹁" &&
      transferSring[i] != "∨" &&
      transferSring[i] != "∧" &&
      transferSring[i] != "→" &&
      transferSring[i] != "⇔" &&
      transferSring[i] != ")"
    ) {
      outputString += transferSring[i];
    } else if (transferSring[i] == ")") {
      while (stack[stack.length - 1] != "(") {
        outputString += stack.pop();
      }
      stack.pop();
    } else {
      while (outStack[transferSring[i]] <= inStack[stack[stack.length - 1]]) {
        outputString += stack.pop();
      }
      stack.push(transferSring[i]);
    }
  }
  while (stack.length > 1) {
    outputString += stack.pop();
  }
  return outputString;
}
//calc中用于计算双目操作符
function doubleCalc(operate, left, right) {
  if (operate == "∧") {
    return map[left] && map[right];
  } else if (operate == "∨") {
    return map[left] || map[right];
  } else if (operate == "→") {
    return !map[left] || map[right];
  } else if (operate == "⇔") {
    return (!map[left] || map[right]) && (!map[right] || map[left]);
  }
}

//计算后缀表达式结果
function calc(string) {
  console.log(string);
  var stack = [];
  for (var i = 0; i < string.length; i++) {
    if (
      string[i] != "﹁" &&
      string[i] != "∨" &&
      string[i] != "∧" &&
      string[i] != "→" &&
      string[i] != "⇔"
    ) {
      stack.push(string[i]);
    } else {
      if (string[i] == "﹁") {
        //单目运算只有非，直接判断
        var singleTemp = !map[stack.pop()];
        stack.push(singleTemp.toString());
      } else {
        //双目运算调用doubleCalc进一步判断
        var tempRight = stack.pop();
        var tempLeft = stack.pop();
        stack.push(doubleCalc(string[i], tempLeft, tempRight));
      }
    }
  }
  return stack.pop();
}

//根据输入的命题数量n动态生成n+1层遍历二叉树(左儿子全为true，右儿子全为false)
function treeNode(n, data) {
  var root = new Node(data);
  if (n == 0) return null;
  root.left = treeNode(n - 1, true);
  root.right = treeNode(n - 1, false);
  return root;
}
function initTraverTree(n) {
  var root = new Node(null);
  root.left = treeNode(n, true);
  root.right = treeNode(n, false);
  return root;
}
//DFS遍历得出真值表
function DFS(root, alphas, i) {
  if (i == 1) {
    //遍历到叶结点时调用calc计算后缀表达式
    map[alphas[i - 1]] = root.data;
    var result = calc(transfer(calcString));
    output(result); //输出每项结果
    return;
  }
  map[alphas[i - 1]] = root.data;
  DFS(root.left, alphas, i - 1);
  DFS(root.right, alphas, i - 1);
}
function traver(root, alphas) {
  console.log(alphas);
  DFS(root.left, alphas, alphas.length);
  DFS(root.right, alphas, alphas.length);
}
//逆序排序方便枚举对象和符合阅读顺序
function objReverse(obj) {
  var arr = [];
  for (var i in obj) {
    arr.push([obj[i], i]);
  }
  arr.reverse();
  var len = arr.length;
  var obj = {};
  for (var i = 0; i < len; i++) {
    obj[arr[i][1]] = arr[i][0];
  }
  return obj;
}
//根据结果是true还是false输出主析取范式或主合取范式
function output(result) {
  var obj = objReverse(map);
  var outPut = "";
  outPut += "(";
  if (result == true) {
    //主析取范式
    for (var i in obj) {
      if (i == "false" || i == "true") {
        outPut = outPut.slice(0, outPut.length - 1);
        break;
      }
      if (obj[i] == false) {
        outPut += "﹁" + i + "∧";
      } else {
        outPut += i + "∧";
      }
    }
    outPut += ")";
    disjunctiveForm += outPut + "∨";
  }
  if (result == false) {
    //主合取范式
    for (var i in obj) {
      if (i == "false" || i == "true") {
        outPut = outPut.slice(0, outPut.length - 1);
        break;
      }
      if (obj[i] == true) {
        outPut += "﹁" + i + "∨";
      } else {
        outPut += i + "∨";
      }
    }
    outPut += ")";
    conjunctiveForm += outPut + "∧";
  }
}
function verify(string) {
  var alpha=['A','B','C','D','E','F','G','H','I','J','K','R','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var bracketStack=[];
  for (var i = 0; i < string.length; i++) {
    //括号是否成对出现,且右括号前面有左括号
    if (string[i] == "(") {
      if(string[i+1]==")"||string[i+1]=="∧"||string[i+1]=="∨"||string[i+1]=="→"||string[i+1]=="⇔") return false;
      bracketStack.push("(");
    }else if(string[i] == ")") {
      if(bracketStack.pop()==undefined){
        return false;
      }
    }  else if (
      //双目运算符两边只允许出现字母
      string[i] == "∧" ||
      string[i] == "∨" ||
      string[i] == "→" ||
      string[i] == "⇔"
    ) {
      if (
        string[i - 1] == "∧" ||
        string[i - 1] == "∨" ||
        string[i - 1] == "→" ||
        string[i - 1] == "⇔" ||
        string[i - 1] == "﹁" ||
        string[i - 1] == "(" ||
        string[i + 1] == "∧" ||
        string[i + 1] == "∨" ||
        string[i + 1] == "→" ||
        string[i + 1] == "⇔" ||
        string[i + 1] == ")" 
      ) {
        return false;
      }
    }else if(string[i]=="﹁"){
      if(alpha.indexOf(string[i+1])==-1&&string[i+1]!="﹁"){
        return false;
      }
      if(alpha.indexOf(string[i-1])!=-1){
        return false;
      }
      }else if(alpha.indexOf(string[i])!=-1){
        if(alpha.indexOf(string[i+1])!=-1){
          return false;
        }
    }
  }
  if(bracketStack.pop()!=undefined){return false;}
  return true;
}
// 按钮点击事件
var btn = document.getElementById("calc");
btn.onclick = function () {
  var input = document.getElementById("display").innerText; //点击按钮后获取用户输入
  if (!verify(input)) {
    document.getElementById("display").innerText="输入格式错误！";
    return false;
  }
  var input_alpha = alphaNum(input); //获取命题数
  if(input_alpha.length<2){
    document.getElementById("display").innerText="输入格式错误！";
    return false;
  }else if(input_alpha.length>10){
    document.getElementById("display").innerText="输入命题数过多，无法计算";
    return false;
  }
  var input_traverTree = initTraverTree(input_alpha.length); //根据命题数动态生成遍历二叉树
  //map用于后缀表达式，遍历二叉树时会添加或更改对应命题的真假，默认有false和true是为了计算后缀表达式时将已判断出真假的式子和后序命题进行运算
  map = {
    false: false,
    true: true,
  };
  disjunctiveForm = ""; //设置主析取范式div内容为空白字符串
  conjunctiveForm = ""; //设置主合取范式div内容为空白字符串
  calcString = input;
  traver(input_traverTree, input_alpha); //遍历二叉树获取真值表，根据真值表生成主析取范式和主合取范式
  //打印结果到网页
  document.getElementById("display").innerText =
    "主合取范式：" +
    "\n" +
    conjunctiveForm.slice(0, conjunctiveForm.length - 1) +
    "\n" +
    "主析取范式：" +
    "\n" +
    disjunctiveForm.slice(0, disjunctiveForm.length - 1);
};

var tempString = "";
var display = document.getElementById("display");
document.getElementById("a").onclick = function () {
  tempString += "A";
  display.innerText = tempString;
};
document.getElementById("b").onclick = function () {
  tempString += "B";
  display.innerText = tempString;
};
document.getElementById("c").onclick = function () {
  tempString += "C";
  display.innerText = tempString;
};
document.getElementById("d").onclick = function () {
  tempString += "D";
  display.innerText = tempString;
};
document.getElementById("e").onclick = function () {
  tempString += "E";
  display.innerText = tempString;
};
document.getElementById("f").onclick = function () {
  tempString += "F";
  display.innerText = tempString;
};
document.getElementById("g").onclick = function () {
  tempString += "G";
  display.innerText = tempString;
};
document.getElementById("h").onclick = function () {
  tempString += "H";
  display.innerText = tempString;
};
document.getElementById("i").onclick = function () {
  tempString += "I";
  display.innerText = tempString;
};
document.getElementById("j").onclick = function () {
  tempString += "J";
  display.innerText = tempString;
};
document.getElementById("k").onclick = function () {
  tempString += "K";
  display.innerText = tempString;
};
document.getElementById("rr").onclick = function () {
  tempString += "R";
  display.innerText = tempString;
};
document.getElementById("m").onclick = function () {
  tempString += "M";
  display.innerText = tempString;
};
document.getElementById("nn").onclick = function () {
  tempString += "N";
  display.innerText = tempString;
};
document.getElementById("o").onclick = function () {
  tempString += "O";
  display.innerText = tempString;
};
document.getElementById("p").onclick = function () {
  tempString += "P";
  display.innerText = tempString;
};
document.getElementById("q").onclick = function () {
  tempString += "Q";
  display.innerText = tempString;
};
document.getElementById("r").onclick = function () {
  tempString += "R";
  display.innerText = tempString;
};
document.getElementById("s").onclick = function () {
  tempString += "S";
  display.innerText = tempString;
};
document.getElementById("t").onclick = function () {
  tempString += "T";
  display.innerText = tempString;
};
document.getElementById("u").onclick = function () {
  tempString += "U";
  display.innerText = tempString;
};
document.getElementById("v").onclick = function () {
  tempString += "V";
  display.innerText = tempString;
};
document.getElementById("w").onclick = function () {
  tempString += "W";
  display.innerText = tempString;
};
document.getElementById("x").onclick = function () {
  tempString += "X";
  display.innerText = tempString;
};
document.getElementById("y").onclick = function () {
  tempString += "Y";
  display.innerText = tempString;
};
document.getElementById("z").onclick = function () {
  tempString += "Z";
  display.innerText = tempString;
};
document.getElementById("(").onclick = function () {
  tempString += "(";
  display.innerText = tempString;
};
document.getElementById(")").onclick = function () {
  tempString += ")";
  display.innerText = tempString;
};
document.getElementById("﹁").onclick = function () {
  tempString += "﹁";
  display.innerText = tempString;
};
document.getElementById("∧").onclick = function () {
  tempString += "∧";
  display.innerText = tempString;
};
document.getElementById("∨").onclick = function () {
  tempString += "∨";
  display.innerText = tempString;
};
document.getElementById("→").onclick = function () {
  tempString += "→";
  display.innerText = tempString;
};
document.getElementById("eq").onclick = function () {
  tempString += "⇔";
  display.innerText = tempString;
};
document.getElementById("clear").onclick = function () {
  tempString = " ";
  display.innerText = tempString;
};
document.getElementById("delete").onclick = function () {
  tempString = display.innerText.slice(0, display.innerText.length - 1);
  display.innerText = tempString;
};
document.getElementById("more").onclick = function() {

    document.getElementsByClassName("more")[0].style.visibility="visible";

}
document.getElementById("hide").onclick=function(){
  document.getElementsByClassName("more")[0].style.visibility="hidden";
}