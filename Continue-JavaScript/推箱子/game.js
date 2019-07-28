/**
 * 游戏的DOM元素
 */
var gameDom = document.getElementById("game");

/**
 * 地图数据，当前的游戏区域中有哪些东西，每个东西的位置
 * 0. 空白
 * 1. 玩家
 * 2. 墙
 * 3. 箱子
 */
var map = [
    [0, 0, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 2, 0, 1, 0, 2, 0, 0],
    [0, 0, 2, 0, 3, 0, 2, 0, 0],
    [2, 2, 2, 0, 0, 0, 2, 2, 2],
    [2, 0, 0, 0, 3, 0, 0, 0, 2],
    [2, 0, 3, 3, 3, 3, 3, 0, 2],
    [2, 0, 0, 0, 3, 0, 0, 0, 2],
    [2, 2, 0, 3, 3, 3, 0, 2, 2],
    [0, 2, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 0, 0, 3, 0, 0, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 0]
];
/**
 * 记录正确位置的数据
 */
var correct = [
    { row: 3, col: 4 },
    { row: 4, col: 4 },
    { row: 5, col: 2 },
    { row: 5, col: 3 },
    { row: 5, col: 4 },
    { row: 5, col: 5 },
    { row: 5, col: 6 },
    { row: 6, col: 4 },
    { row: 7, col: 4 },
    { row: 8, col: 4 },
    { row: 9, col: 4 },
    { row: 10, col: 4 }
];

/**
 * 记录玩家的坐标
 */
var playerPoint = {
    row: 1,
    col: 4
}

/**
 * 根据某些东西，渲染整个游戏区域
 * 生成某些DOM元素，加入到游戏div中
 */
function render() {
    var width = 45, height = 45;
    //1. 将整个游戏区域清空
    gameDom.innerHTML = "";
    //2. 需要一个能够标识游戏区域中各种元素的数据
    for (var r = 0; r < map.length; r++) {
        //r表示行的编号
        var row = map[r]; //row是这一行中的数组
        for (var c = 0; c < row.length; c++) {
            //c表示列的编号
            var iscrt = isCorrect(r, c);//当前行当前列是否是正确位置
            //创建元素
            if (row[c] === 0 && !iscrt) {
                //空白
                continue; //这次循环就算了，创建一个没有任何内容的div，没啥意义
            }
            var div = document.createElement("div");
            div.className = "item";
            if (row[c] === 2) { //判断当前对应的数字是不是一堵墙
                div.classList.add("wall"); //添加类样式
            }
            else if (row[c] === 1) {//玩家
                div.classList.add("player")
            }
            else if (row[c] === 3) {//箱子
                if (iscrt) {//箱子在正确位置上
                    div.classList.add("correct-box")
                }
                else {//箱子不在正确位置上
                    div.classList.add("box")
                }
            }
            else {
                //正确位置的空白
                div.classList.add("correct");
            }
            //设置div的位置
            div.style.left = width * c + "px"
            div.style.top = height * r + "px";
            gameDom.appendChild(div);
        }
    }
    //3. 设置整个容器的宽高
    gameDom.style.height = map.length * height + "px";
    gameDom.style.width = map[0].length * width + "px";
}

/**
 * 判断某个位置是否是正确位置
 * @param row 行的编号
 * @param col 列的编号
 */
function isCorrect(row, col) {
    //判断参数row和col是否能在数组correct中找到
    for (var i = 0; i < correct.length; i++) {
        var point = correct[i];
        if (point.row === row && point.col === col) {
            return true;
        }
    }
    return false;
}

/**
 * 玩家移动
 * @param direction up down left right 移动方向
 */
function playerMove(direction) {
    //得到移动的目标点的坐标
    var targetPoint = getNewPoint(playerPoint.row, playerPoint.col, direction);
    //从地图中取出该位置的内容
    var target = map[targetPoint.row][targetPoint.col]
    //判断
    if (target === 0) {
        //目标点是空白
        //交换当前玩家和目标点的内容
        exchange(playerPoint, targetPoint);
        //更新玩家坐标
        playerPoint.row = targetPoint.row;
        playerPoint.col = targetPoint.col;
        render();//重新渲染
    }
    else if (target === 3) {
        //目标点是箱子
        //箱子前面的坐标
        var boxForwardPoint = getNewPoint(targetPoint.row, targetPoint.col, direction)
        //箱子前面的东西
        var boxForward = map[boxForwardPoint.row][boxForwardPoint.col];
        if (boxForward === 0) {
            //只有箱子前面是空白才能移动
            exchange(targetPoint, boxForwardPoint);
            exchange(playerPoint, targetPoint);
            playerPoint.row = targetPoint.row;
            playerPoint.col = targetPoint.col;
            render();
        }
    }
}

/**
 * 交换两个坐标的数据
 * @param {*} point1 
 * @param {*} point2 
 */
function exchange(point1, point2) {
    var temp = map[point1.row][point1.col];
    map[point1.row][point1.col] = map[point2.row][point2.col];
    map[point2.row][point2.col] = temp;
}

/**
 * 根据指定坐标、方向、得到新的坐标
 * @param {*} row 
 * @param {*} col 
 * @param {*} direction 
 */
function getNewPoint(row, col, direction) {
    var point;
    if (direction === "left") {
        point = {
            row: row,
            col: col - 1
        }
    }
    else if (direction === "right") {
        point = {
            row: row,
            col: col + 1
        }
    }
    else if (direction === "up") {
        point = {
            row: row - 1,
            col: col
        }
    }
    else {
        point = {
            row: row + 1,
            col: col
        }
    }
    return point;
}

render();

/**
 * 游戏是否胜利
 */
function isWin() {
    //判断是否所有正确位置上都有箱子
    for (var i = 0; i < correct.length; i++) {
        var cr = correct[i];
        if (map[cr.row][cr.col] !== 3) {
            //这个正确位置上没有箱子
            return false;
        }
    }
    return true;
}

window.onkeydown = function (e) {
    if (e.key === "ArrowUp") {
        playerMove("up");
    }
    else if (e.key === "ArrowDown") {
        playerMove("down");
    }
    else if (e.key === "ArrowLeft") {
        playerMove("left");
    }
    else if (e.key === "ArrowRight") {
        playerMove("right");
    }

    if (isWin()) {
        console.log("游戏胜利！");
        window.onkeydown = null;//取消按键事件
    }
}