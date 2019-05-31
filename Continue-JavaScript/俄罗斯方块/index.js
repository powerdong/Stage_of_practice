var squareSet; //游戏区域
var nextElement = null; //下一个图形
var dynamicElement = null; //上一个图形
var elementType = []; //方块样式集合
var colorType = ["#49bdff", "#fe8602"]; //颜色集合
var tetris = document.getElementById('tetris'); //游戏区域
var score = 0; //成绩
var timer = null; //定时器

/**
 * 初始化小方块区域
 * 一共有10列 20行
 * 用二维数组初始化坐标
 */
function initSquareSet() {
    squareSet = new Array(20);
    for (var i = 0; i < squareSet.length; i++) {
        squareSet[i] = new Array(10);
    }
}

class TetrisElement {
    /**
     * 
     * @param {*} x 初始位置 基准点
     * @param {*} y 
     * @param {*} nowStatus 旋转角度
     * @param {*} elementType 方块类型
     */
    constructor(x, y, nowStatus, elementType) {
        // 基准点
        this.basePoint = {
            x: x,
            y: y
        };
        // 存放小方格  每个元素自己的小方块
        this.squareList = [];
        // 每一个元素的不同旋转状态
        this.status = [];
        // 当前生成的随机状态
        this.nowStatus = nowStatus;
        this.elementType = elementType;
    }
    // 将小方块添加到区域
    show(parent) {
        for (let i = 0; i < this.squareList.length; i++) {
            parent.appendChild(this.squareList[i]);
        }
    }
    // 刷新小方块位置
    refresh() {
        for (let i = 0; i < this.squareList.length; i++) {
            // 小方块的位置 = 基准点的位置 + 当前旋转状态的位置
            this.squareList[i].x = this.basePoint.x + this.status[this.nowStatus][i].offsetX;
            this.squareList[i].y = this.basePoint.y + this.status[this.nowStatus][i].offsetY;
        }
    }
    // 旋转
    rotate() {
        this.nowStatus = (this.nowStatus + 1) % 4;
        this.refresh();
    }
    // 下落时基准点移动
    drop() {
        this.basePoint.y += 1;
        this.refresh();
    }
}

/**
 * 
 * @param {*} color 颜色值
 * @param {*} x x坐标
 * @param {*} y y坐标
 */
function createSquare(color, x, y) {
    var temp = document.createElement('div');
    temp.classList.add('square');
    temp.style.background = color;
    temp.style.left = 30 * x + 'px';
    temp.style.top = 30 * y + 'px';
    temp.x = x;
    temp.y = y;
    return temp;
}

/**
 * 方块种类随机渲染  方块、闪电、拐角
 * 方块旋转方向随机产生，
 * 方块的颜色随机产生
 * 返回一个方块对象  方块种类   初始基准点   旋转方向   颜色值
 */
function randomGenerateElement() {
    var elementTypeNum = Math.floor(Math.random() * elementType.length);
    var statusNum = Math.floor(Math.random() * 4);
    var colorTypeNum = Math.floor(Math.random() * colorType.length);
    return new elementType[elementTypeNum](5, -2, statusNum, colorType[colorTypeNum]);
}


/**
 * 
 * @param {*} all 所有元素
 * 
 * 渲染所有元素位置
 */
function render(all) {
    // 渲染当前的方块
    if (dynamicElement) {
        for (let k = 0; k < dynamicElement.squareList.length; k++) {
            dynamicElement.squareList[k].style.left = 30 * dynamicElement.squareList[k].x + 'px';
            dynamicElement.squareList[k].style.top = 30 * dynamicElement.squareList[k].y + 'px';
        }
    }
    // 渲染所有的方块
    if (all) {
        for (let i = 0; i < squareSet.length; i++) {
            for (let j = 0; j < squareSet[i].length; j++) {
                if (squareSet[i][j]) {
                    squareSet[i][j].x = j;
                    squareSet[i][j].y = i;
                    squareSet[i][j].style.left = 30 * squareSet[i][j].x + 'px';
                    squareSet[i][j].style.top = 30 * squareSet[i][j].y + 'px';
                }
            }
        }
    }
}

/**
 * 判断当前行元素的排列
 * 如果都有元素，将这一行添加到定义的数组中
 * 只要有一个空位置，则不返回
 */
function checkClear() {
    var result = [];
    for (let i = 0; i < squareSet.length; i++) {
        // 判断是否整行都有元素
        var flag = true;
        for (let j = 0; j < squareSet[i].length; j++) {
            if (!squareSet[i][j]) {
                // 如果有任意空返回false
                flag = false;
                break;
            }
        }
        if (flag) {
            result.unshift(i);
        }
    }
    return result;
}

/**
 * 
 * @param {*} result 需要清除的元素组
 * 
 * 将满行的元素数组清空
 * 遍历数组，删除数组中的元素
 * 
 * 在区域内添加新的空余位置
 * 
 * 每消除一行，成绩+10
 * 
 */
function clear(result) {
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < squareSet[result[i]].length; j++) {
            tetris.removeChild(squareSet[result[i]][j]);
        }
        squareSet.splice(result[i], 1);
    }
    for (let i = 0; i < result.length; i++) {
        var tempArr = new Array(10);
        squareSet.unshift(tempArr);
    }
    score += result.length * 10;
    render(true);
}

/**
 * 判断是否游戏结束
 * 
 * 如果游戏区域竖着的的都有元素  则为失败  返回true
 * 
 * 否则返回false
 */
function checkFinish() {
    for (let i = 0; i < 10; i++) {
        if (squareSet[0] && squareSet[0][i]) {
            return true;
        }
    }
    return false;
}

/**
 * 固定小方块
 * 
 */
function fixed() {
    try {
        for (let i = 0; i < dynamicElement.squareList.length; i++) {
            squareSet[dynamicElement.squareList[i].y][dynamicElement.squareList[i].x] = dynamicElement.squareList[i];
        }
        dynamicElement = null;
        // 清除整行
        clear(checkClear());
        // 判断游戏是否结束
        if (checkFinish()) {
            // 结束时清除定时器！
            clearInterval(timer);
            alert('游戏结束')
        }
    } catch {
        if (checkFinish()) {
            clearInterval(timer);
            alert('游戏结束')
        }
    }
}

/**
 * 判断是否下落到底 
 * 返回Boolean值
 * 判断当前小方块的位置坐标
 * 如果当前触底  固定  返回true
 * 否则返回false
 * 
 */

function isDrop() {
    for (let i = 0; i < dynamicElement.squareList.length; i++) {
        if (squareSet[dynamicElement.squareList[i].y + 1] &&
            squareSet[dynamicElement.squareList[i].y + 1][dynamicElement.squareList[i].x] ||
            dynamicElement.squareList[i].y === 19) {
            fixed();
            return true;
        }
    }
    return false;
}

/**
 * 左右边界问题
 * 
 * 如果超出边界，小方块弹回到游戏区域
 * 
 */
function checkOutOfRange() {
    var max = 0;
    for (let i = 0; i < dynamicElement.squareList.length; i++) {
        // 小方块的x坐标小于0
        if ((dynamicElement.squareList[i].x < 0 ||
                // 小方块的x坐标大于9
                dynamicElement.squareList[i].x > 9) &&
            // 小方块的中间位置  在旋转时判断会不会出界
            Math.abs(dynamicElement.squareList[i].x - 5) - 4 > Math.abs(max)) {
                // 如果出左边界，则弹回到贴着左边线   右边弹回到右边线
            max = dynamicElement.squareList[i].x < 0 ? 0 - dynamicElement.squareList[i].x : 9 - dynamicElement.squareList[i].x;
        }
    }

    dynamicElement.basePoint.x += max;
    dynamicElement.refresh();
}

function init() {
    // 初始化小方块
    initSquareSet();
    /**
     * 设置方块的运动
     */
    timer = setInterval(function () {
        // 如果下一个方块未渲染
        if (nextElement == null) {
            // 创建方块
            nextElement = randomGenerateElement();
        }
        // 如果当前没有小方块，则将下一个小方块赋到当前小方块
        // 令下一个小方块为空
        // 当前方块展示
        if (dynamicElement == null) {
            dynamicElement = nextElement;
            nextElement = null;
            dynamicElement.show(tetris);
        }
        // dynamicElement.drop();
        if (!isDrop()) {
            dynamicElement.drop();
        }
        render(true);
    }, 1000)

    // 添加键盘事件
    window.addEventListener('keydown', function (e) {
        // 当前没有元素的时候  没有键盘事件触发
        if (dynamicElement == null) {
            return;
        }
        // 上键
        if (e.key == 'ArrowUp') {
            // 方块旋转
            dynamicElement.rotate();
            render(true);
        } else if (e.key == 'ArrowLeft') {
            // 左键
            // 方块基准点左移一个单位
            dynamicElement.basePoint.x -= 1;
            dynamicElement.refresh();
            // 判断是否出界
            checkOutOfRange();
        } else if (e.key == 'ArrowRight') {
            // 右键
            // 方块基准点右移一个单位
            dynamicElement.basePoint.x += 1;
            dynamicElement.refresh();
            // 判断是否出界
            checkOutOfRange();
        } else if (e.key == 'ArrowDown') {
            // 下键
            // 如果当前已经触底  不执行
            if (isDrop()) {
                return;
            }
            // 否则执行下落
            dynamicElement.drop();
        }
        // 重新渲染所有方块
        render(true);
    })
}


window.onload = function () {
    init();
}