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
        while (
          outStack[transferSring[i]] <= inStack[stack[stack.length - 1]]
        ) {
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

  // 按钮点击事件
  var btn = document.getElementById("calc");
  btn.onclick = function () {
    var input = document.getElementById("display").innerText; //点击按钮后获取用户输入
    var input_alpha = alphaNum(input); //获取命题数
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
  document.getElementById("p").onclick = function () {
    tempString += "p";
    display.innerText = tempString;
  };
  document.getElementById("q").onclick = function () {
    tempString += "q";
    display.innerText = tempString;
  };
  document.getElementById("r").onclick = function () {
    tempString += "r";
    display.innerText = tempString;
  };
  document.getElementById("s").onclick = function () {
    tempString += "s";
    display.innerText = tempString;
  };
  document.getElementById("t").onclick = function () {
    tempString += "t";
    display.innerText = tempString;
  };
  document.getElementById("u").onclick = function () {
    tempString += "u";
    display.innerText = tempString;
  };
  document.getElementById("v").onclick = function () {
    tempString += "v";
    display.innerText = tempString;
  };
  document.getElementById("w").onclick = function () {
    tempString += "w";
    display.innerText = tempString;
  };
  document.getElementById("x").onclick = function () {
    tempString += "x";
    display.innerText = tempString;
  };
  document.getElementById("y").onclick = function () {
    tempString += "y";
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
    tempString = "";
    display.innerText = tempString;
    document.getElementById("conjunctiveForm").innerText = "";
    document.getElementById("disjunctiveForm").innerText = "";
  };
  document.getElementById("delete").onclick = function () {
    tempString = display.innerText.slice(0, display.innerText.length - 1);
    display.innerText = tempString;
  };