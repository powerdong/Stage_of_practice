window.onload = function () {
    init();
}
var wrap;
// 行和列
var rows = 7;
var cols = 12;
// 图片种类
var types = 20;
// 存放行和列的数组
var squareSet;
// 存放两次点击的图片
var chooseOne = null;
var chooseTwo = null;

// 存放四个方向的行和列
var TowardEnum = { NONE: null, UP: { row: -1, col: 0 }, RIGHT: { row: 0, col: 1 }, DOWN: { row: 1, col: 0 }, LEFT: { row: 0, col: -1 } };


function init() {
    wrap = document.getElementById('wrap');
    // 所有格子个数为偶数
    if (rows * cols % 2 != 0) {
        alert('输入数量不能为奇数！');
    }
    // 初始化棋盘
    initSquareSet();
};

function initSquareSet() {
    // 根据传入行和列 设置父级宽高
    wrap.style.width = 86 * cols + 'px';
    wrap.style.height = 78 * rows + 'px';

    // 创建代表小方块的随机数字数组
    var numSet = generateSquareNumSet();
    // 初始化二维数组  行列均+2  前后分别多增加一行或一列
    squareSet = new Array(rows + 2);
    // 每一位再创建一个数组
    for (var i = 0; i < squareSet.length; i++) {
        squareSet[i] = new Array(cols + 2);
    }
    // 创建小方块  上下前后各空一行一列  
    // 所以for循环从1开始 从rows/cols结束
    for (var i = 1; i <= rows; i++) {
        for (var j = 1; j <= cols; j++) {
            // 传入参数随机数，位置
            var temp = createSquare(numSet.pop(), i, j);
            squareSet[i][j] = temp;
            wrap.append(temp);
            // 为每一个图片增加点击事件
            temp.onclick = function () {
                // 点击为第一个图片  没有图片被点击或者两次点击图片num不一样更改第一张图片
                if (chooseOne == null || chooseOne.num != this.num) {
                    chooseOne = this;
                } else {
                    // 点击为第二张图片
                    chooseTwo = this;
                    // 两次点击不为同一个图片并且判断可以清除
                    if (chooseOne != chooseTwo && checkLine(chooseOne.row, chooseOne.col, 0, TowardEnum.NONE, [])) {
                        // 清除两张消除图片 
                        clearSquare(chooseOne.row, chooseOne.col);
                        clearSquare(chooseTwo.row, chooseTwo.col);
                    }
                    // one和two一样但是不能消除  置为null
                    chooseOne = null;
                    chooseTwo = null;
                }
                // 修改点击后的图片的样式
                render();
                // 每次点击后判断是否游戏结束
                if (checkFinish()) {
                    alert('恭喜你~游戏结束');
                }
            }
        }
    }

};

// 创建存放随机数的数组
function generateSquareNumSet() {
    // 数组存放
    var temp = [];
    for (var i = 0; i < rows * cols / 2; i++) {
        var num = Math.floor(Math.random() * types);
        // 一半个数的随机数放到数组中  每一个存放两次
        temp.push(num);
        temp.push(num);
    }
    // 打乱数组
    temp.sort(function () {
        return Math.random() - 0.5;
    });
    return temp;
}

// 创建小方块
function createSquare(num, row, col) {
    // 创建dom元素  设置class类名
    var temp = document.createElement('div');
    temp.classList.add('square');
    // 设置每一个小方块的位置left  top;
    temp.style.left = 86 * col + 'px';
    temp.style.top = 76 * row + 'px';
    // 根据随机数组传进来的随机数设置随机的背景图片
    temp.style.backgroundImage = `url("./img/${num}.png")`;
    temp.num = num;
    temp.row = row;
    temp.col = col;
    return temp;
}

// 将选中的图片设置透明度
function render() {
    for (var i = 0; i < squareSet.length; i++) {
        for (var j = 0; j < squareSet[i].length; j++) {
            if (squareSet[i][j] && squareSet[i][j] == chooseOne) {
                squareSet[i][j].style.opacity = '0.5';
            } else if (squareSet[i][j]) {
                squareSet[i][j].style.opacity = '1';
            }
        }
    }
}

// 判断是否结束
function checkFinish() {
    for (var i = 0; i < squareSet.length; i++) {
        for (var j = 0; j < squareSet[i].length; j++) {
            if (squareSet[i][j]) {
                return false;
            }
        }
    }
    // 所有的都被清除了 返回true
    return true;
}

// 检查是否能消除
// 传入参数开始元素的行和列 方向改变次数 当前的方向 存放路径的数组
function checkLine(row, col, changeTimes, nowToward, path) {
    if (isExist(row, col) && squareSet[row][col] == chooseTwo && changeTimes <= 3) {
        return true;
    }
    if (isExist(row, col) && squareSet[row][col] != chooseOne
        || changeTimes > 3
        || row < 0 || col < 0 || row >= squareSet.length || col >= squareSet[0].length
        || path.indexOf(getLocaiton(row, col)) > -1) {
        path.pop();
        return false;
    }
    path.push(getLocaiton(row, col));
    // 利用或连接 分别判断四个方向 有一个方向为true 返回true;
    return checkLine(row - 1, col, nowToward == TowardEnum.UP ? changeTimes : changeTimes + 1, TowardEnum.UP, path) //up
        || checkLine(row, col + 1, nowToward == TowardEnum.RIGHT ? changeTimes : changeTimes + 1, TowardEnum.RIGHT, path) //right
        || checkLine(row + 1, col, nowToward == TowardEnum.DOWN ? changeTimes : changeTimes + 1, TowardEnum.DOWN, path) //right
        || checkLine(row, col - 1, nowToward == TowardEnum.LEFT ? changeTimes : changeTimes + 1, TowardEnum.LEFT, path); //right;
}

// 清除图片
function clearSquare(row, col) {
    wrap.removeChild(squareSet[row][col]);
    squareSet[row][col] = null;
}

// 判断当前位置是否存放
function isExist(row, col) {
    if (row > 0 && row < squareSet.length && col > 0 && col < squareSet[0].length && squareSet[row] && squareSet[row][col]) {
        return true;
    }
    return false;
}
// 返回路径字符串
function getLocaiton(row, col) {
    return "" + row + "," + col;
}