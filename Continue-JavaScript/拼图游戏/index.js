/**
 * 全局配置
 */
var config = {
    width: 500,
    height: 500,
    row: 3, //行数
    col: 3, //列数
    img: "./img/img.png", //图片路径
    gameDom: document.getElementById('game') //游戏的根元素
}

// 每一个小块的宽度
config.blockWidth = config.width / config.col;
// 每一个小块的高度
config.blockHeight = config.height / config.row;
// 总共的小格数
config.total = config.row * config.col;
// 建立一个空的dom的位置，用来交换位置
var emptyBlock = {};

/**
 * 
 * @param {*} x 小格子的位置left
 * @param {*} y 小格子的位置top
 * @param {*} appendToPage 是否创建dom  true false  false 时建立空dom
 * @param {*} correctX 存下来本来应该的正确位置left
 * @param {*} correctY 存下来本来应该的正确位置top
 */
function creatBlockDom(x, y, appendToPage, correctX, correctY) {
    // 创建div对象  是每个小格子图片
    var dom = document.createElement('div');
    dom.style.width = config.blockWidth + 'px';
    dom.style.height = config.blockHeight + 'px';
    dom.style.background = `url(${config.img})`;
    dom.style.border = '1px solid #fff';
    // 设置该样式是为了让宽高包含宽高地尺寸
    dom.style.boxSizing = 'border-box';
    dom.style.position = 'absolute';
    dom.style.left = x + 'px';
    dom.style.top = y + 'px';
    // 正确位置
    dom.correctX = correctX;
    dom.correctY = correctY;
    // 移动时有缓冲效果
    dom.style.transition = "all 0.3s";
    // 背景图位置
    dom.style.backgroundPosition = `-${correctX}px -${correctY}px`;
    dom.style.cursor = 'pointer';

    dom.onclick = function () {
        // 判断是否相邻 
        var xdis = Math.abs(parseFloat(dom.style.left) - parseFloat(emptyBlock.style.left));
        xdis = parseInt(xdis);
        var ydis = Math.abs(parseFloat(dom.style.top) - parseFloat(emptyBlock.style.top));
        ydis = parseInt(ydis);
        console.log(xdis);
        // 如果不相邻 退出
        if (xdis + ydis !== parseInt(config.blockHeight) &&
            xdis + ydis !== parseInt(config.blockWidth)) {
            return;
        }
        // 否则 将当前元素的坐标，与空白坐标交换
        var x = dom.style.left;
        var y = dom.style.top;
        dom.style.left = emptyBlock.style.left;
        dom.style.top = emptyBlock.style.top;
        emptyBlock.style.left = x;
        emptyBlock.style.top = y;

        if (isWin()) {
            // 判断是否结束
            setTimeout(function () {
                console.log(123);
            }, 300)
        }
    }

    if (appendToPage) {
        config.gameDom.appendChild(dom);
    } else {
        emptyBlock = dom;
    }
}

/**
 * 判断是否结束
 */
function isWin() {
    // 获取每个小格子的位置与本来应该的位置比较
    for (var i = 0; i < config.gameDom.children.length; i++) {
        var dom = config.gameDom.children[i];
        if (parseInt(dom.correctX) !== parseInt(dom.style.left) &&
            parseInt(dom.correctY) !== parseInt(dom.style.top)) {
            return false;
        }
    }
    return true;
}


/**
 * 得到一个数组，数组中包含所有正确的坐标
 */
function getCorrectPoints() {
    var arr = [];
    // 循环行和列
    for (var i = 0; i < config.row; i++) {
        for (var j = 0; j < config.col; j++) {
            // 小格子的正确位置
            arr.push({
                x: j * config.blockWidth,
                y: i * config.blockHeight
            })
        }
    }
    return arr;
}


/**
 * 根据最大值和最小值得到一个随机数 (最大值取不到)
 * @param {*} min 
 * @param {*} max 
 */
function getRandom(min, max) {
    var dec = max - min;
    return Math.floor(Math.random() * dec + min);
}

/**
 * 洗牌(打乱数组)
 */
function shuffle(arr) {
    // 只打乱前8个  最后一个是空
    for (var i = 0; i < arr.length - 1; i++) {
        var ele = arr[i];
        // 随机生成下标，交换
        var index = getRandom(0, arr.length - 1);
        var temp = ele;
        arr[i] = arr[index];
        arr[index] = ele;
    }
}


/**
 * 生成游戏区域
 */
function setGameArea() {
    // 1.初始化游戏根元素
    config.gameDom.style.width = config.width + 'px';
    config.gameDom.style.height = config.height + 'px';
    config.gameDom.style.border = "2px solid #ccc";
    config.gameDom.style.position = 'relative';
    // 生成小方块(gameDom的子元素)
    // 元素位置     从一个有限的坐标中随机取一个
    var points = getCorrectPoints(); //得到正确坐标的数组
    // 打乱数组
    shuffle(points);
    // 保存正确的数据
    var correctPoints = getCorrectPoints();
    // 创建添加小格子  通过 true 和 false 来判定是否是空
    for (var i = 0; i < config.total; i++) {
        if (i < config.total - 1) {
            creatBlockDom(points[i].x, points[i].y, true,
                correctPoints[i].x, correctPoints[i].y);
        } else {
            creatBlockDom(points[i].x, points[i].y, false, correctPoints[i].x, correctPoints[i].y);
        }
    }
}

setGameArea();