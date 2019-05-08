var table; //游戏桌面
var squareWidth = 50; //每个方块的宽度
var boardWidth = 10; //有多少行和列的方块
var squareSet = []; //当前桌面上的方块集合（二维数组，最左下角是0，0位置）
var timer = null; //闪烁定时器
var choose = []; //被选中的方块
var flag = true; //对点击事件加锁，消除过程中不允许有其他移入和点击操作
var tempSquare = null; //消除过程中如果输入移入其他方块，进行记录
var baseScore = 5; //基础分数
var stepScore = 10; //一次每多消除一个额外增加的分数
var totalScore = 0; //当前总分数
var targetScore = 2000; //目标分数

function isFinish() { //判断游戏是否结束
    var flag = true;
    for (var i = 0; i < squareSet.length; i++) {
        for (var j = 0; j < squareSet[i].length; j++) {
            var temp = [];
            checkLinked(squareSet[i][j], temp);
            if (temp.length > 1) {
                return false;
            }
        }
    }
    return flag;
}

function move() { //方块纵向下落与横向合并
    for (var i = 0; i < boardWidth; i++) { //纵向移动
        var pointer = 0;
        for (var j = 0; j < boardWidth; j++) {
            if (squareSet[j][i] != null) {
                if (j != pointer) {
                    squareSet[pointer][i] = squareSet[j][i];
                    squareSet[j][i].row = pointer;
                    squareSet[j][i] = null;
                }
                pointer++;
            }
        }
    }
    for (var i = 0; i < squareSet[0].length;) { //横向移动
        if (squareSet[0][i] == null) {
            for (var j = 0; j < boardWidth; j++) {
                squareSet[j].splice(i, 1);
            }
            continue;
        }
        i++;
    }
    refresh();
}

function goBack() { //将所有的小方块的样式还原
    if (timer != null) {
        clearInterval(timer);
    }
    for (var i = 0; i < squareSet.length; i++) {
        for (var j = 0; j < squareSet[i].length; j++) {
            if (squareSet[i][j] == null) {
                continue;
            }
            squareSet[i][j].style.transform = "scale(0.95)";
            squareSet[i][j].style.border = "0px solid white";
        }
    }
}

function flicker(arr) { //小方块闪烁
    var num = 0;
    timer = setInterval(function () {
        for (var i = 0; i < arr.length; i++) {
            arr[i].style.border = "3px solid #BFEFFF";
            arr[i].style.transform = "scale(" + (0.90 + 0.05 * Math.pow(-1, num)) + ")";
        }
        num++;
    }, 300);
}

function checkLinked(square, arr) { //检查相连的相同颜色的小方块，使用递归的方式
    if (square == null) {
        return;
    }
    arr.push(square);
    //判断左侧
    if (square.col > 0 && squareSet[square.row][square.col - 1] && squareSet[square.row][square.col - 1].num == square.num && arr.indexOf(squareSet[square.row][square.col - 1]) == -1) {
        checkLinked(squareSet[square.row][square.col - 1], arr);
    }
    //判断右侧
    if (square.col < boardWidth - 1 && squareSet[square.row][square.col + 1] && squareSet[square.row][square.col + 1].num == square.num && arr.indexOf(squareSet[square.row][square.col + 1]) == -1) {
        checkLinked(squareSet[square.row][square.col + 1], arr);
    }
    //判断下方
    if (square.row < boardWidth - 1 && squareSet[square.row + 1][square.col] && squareSet[square.row + 1][square.col].num == square.num && arr.indexOf(squareSet[square.row + 1][square.col]) == -1) {
        checkLinked(squareSet[square.row + 1][square.col], arr);
    }
    //判断上方
    if (square.row > 0 && squareSet[square.row - 1][square.col] && squareSet[square.row - 1][square.col].num == square.num && arr.indexOf(squareSet[square.row - 1][square.col]) == -1) {
        checkLinked(squareSet[square.row - 1][square.col], arr);
    }
}

function refresh() { //所有的小方块样式还原
    for (var i = 0; i < squareSet.length; i++) {
        for (var j = 0; j < squareSet[i].length; j++) {
            if (squareSet[i][j] == null) {
                continue;
            }

            squareSet[i][j].row = i;
            squareSet[i][j].col = j;
            squareSet[i][j].style.transition = "left 0.3s, bottom 0.3s";
            squareSet[i][j].style.left = squareSet[i][j].col * squareWidth + "px";
            squareSet[i][j].style.bottom = squareSet[i][j].row * squareWidth + "px";
            squareSet[i][j].style.backgroundImage = "url('./pic/" + squareSet[i][j].num + ".png')";
            squareSet[i][j].style.backgroundSize = "cover";
            squareSet[i][j].style.transform = "scale(0.95)";

        }
    }
}

function createSquare(value, row, col) { //创建小方块

    var temp = document.createElement("div");
    temp.style.width = squareWidth + "px";
    temp.style.height = squareWidth + "px";
    temp.style.display = "inline-block";
    temp.style.position = "absolute";
    temp.style.boxSizing = "border-box";
    temp.style.borderRadius = "12px";
    temp.num = value;
    temp.row = row;
    temp.col = col;

    return temp;

}

function selectScore() { //选中部分分数计算并显示
    var score = 0;
    for (var i = 0; i < choose.length; i++) {
        score += baseScore + i * stepScore;
    }
    if (score == 0) {
        return;
    }
    document.getElementById("selectScore").innerHTML = choose.length + "块 " + score + "分";
    document.getElementById("selectScore").style.transition = null;
    document.getElementById("selectScore").style.opacity = 1;
    setTimeout(function () {
        document.getElementById("selectScore").style.transition = "opacity 1s";
        document.getElementById("selectScore").style.opacity = 0;
    }, 1000);
}

function mouseOver(obj) { //鼠标在小方块上方
    if (!flag) {
        tempSquare = obj;
        return;
    }
    goBack(); //所有样式还原
    choose = [];
    checkLinked(obj, choose); //检查相连的小方块
    if (choose.length <= 1) {
        choose = [];
        return;
    }
    flicker(choose); //闪烁
    selectScore(); //显示分数
}

function init() {
    table = document.getElementById("pop_star");
    document.getElementById("targetScore").innerHTML = "目标分数：" + targetScore;
    //初始化小方块
    for (var i = 0; i < boardWidth; i++) {
        squareSet[i] = new Array();

        for (var j = 0; j < boardWidth; j++) {
            var square = createSquare(Math.floor(Math.random() * 5), i, j);
            square.onmouseover = function () {
                mouseOver(this);
            };
            square.onclick = function () {
                if (!flag || choose.length == 0) {
                    return;
                }
                flag = false;
                tempSquare = null;
                var score = 0;
                for (var i = 0; i < choose.length; i++) { //加分数
                    score += baseScore + i * stepScore;
                }
                totalScore += score;
                document.getElementById("nowScore").innerHTML = "当前分数：" + totalScore;
                for (var i = 0; i < choose.length; i++) { //对每个选中的方块进行移除操作
                    (function (i) {
                        setTimeout(function () {
                            squareSet[choose[i].row][choose[i].col] = null;
                            table.removeChild(choose[i]);
                        }, i * 100);
                    })(i);
                }
                setTimeout(function () {
                    move();
                    setTimeout(function () {
                        var is = isFinish();
                        if (is) {
                            if (totalScore > targetScore) {
                                alert("恭喜获胜");
                            } else {
                                alert("游戏失败");
                            }
                        } else {
                            choose = [];
                            flag = true;
                            mouseOver(tempSquare);

                        }
                    }, 300 + choose.length * 150);
                }, choose.length * 100);
            }
            squareSet[i][j] = square;
            table.appendChild(square);
        }

    }
    refresh();
}

window.onload = function () {
    init();
}