// 点击开始游戏 -->startpage消失 -->游戏开始
// 随即出现食物,出现三节蛇运动
// 上下左右-->改变方向运动
// 判断吃到食物 -->食物消失 蛇加一
// 判断游戏结束,弹出框


// 提取元素
var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var scoreBox = document.getElementById('score');
var snakeMove;
var speed = 200;
var lose = document.getElementById('lose');
var loserScore = document.getElementById('loserScore');
var close = document.getElementById('close');
var startP = document.getElementById('startP');
var startBtn = document.getElementById('startBtn');
var startGameBool = true;
var startPushBool = true;


// 存初始化函数
init();

function init() {
    // 提取地图
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //设置食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //设置蛇样式
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [
        [4, 1, 'head'],
        [3, 1, 'body'],
        [2, 1, 'body']
    ];

    //游戏属性 默认向右运动
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    //初始成绩0
    this.score = 0;
    scoreBox.innerHTML = this.score;

    bindEvent();

}

function startGame() {
    // 隐藏开始页面
    startPage.style.display = 'none';
    // 显示左上角按钮 进去游戏页面 
    startP.style.display = 'block';
    // 调用食物 蛇 函数 加载页面
    food();
    snake();

}


function food() {
    // 创建食物div
    var food = document.createElement('div');
    // 设置食物样式
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    // 食物随机出现
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    // 设置食物位置
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    // 给食物div创建class
    this.mapDiv.appendChild(food).setAttribute('class', 'food');

}

function snake() {
    // 遍历蛇数组
    for (var i = 0; i < this.snakeBody.length; i++) {
        // 创建蛇div
        var snake = document.createElement('div');
        // 设置蛇样式
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        // 蛇各个对象的位置
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        // 为snake添加class类名
        snake.classList.add(this.snakeBody[i][2]);
        // 创建div  为div增加class类名
        this.mapDiv.appendChild(snake).classList.add('snake');
        // 设置运动过程中蛇头旋转角度
        switch (this.direct) {
            case 'right':
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)'
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)'
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)'
                break;
            default:
                break;
        }
    }
}

// 移动规则
function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        // 蛇尾跟随蛇头动  上一个属性走过的位置等于下一个的位置
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    // 设置蛇头移动规则
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    // 瞬间清除snake  然后再次创建snake
    removeClass('snake');
    snake();
    // 移动过程中如果蛇头位置与食物位置重合 增加一个body元素
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        // 提取最后一个尾巴的位置
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        // 设置在不同情况下蛇尾增加的位置
        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            default:
                break;
        }
        //同时成绩加一
        this.score += 1;
        //写入页面
        scoreBox.innerHTML = this.score;
        // 重新显示food
        removeClass('food');
        food();
    }

    // 当出界时重新开始
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
        relodGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
        relodGame();
    }
    // 提取蛇头位置
    var snakeHX = snakeBody[0][0];
    var snakeHY = snakeBody[0][1];
    // 当蛇头与蛇尾相遇时重新开始
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]) {
            relodGame();
        }
    }

}

function relodGame() {
    // 重新开始时删除蛇 食物 清除定时器  数据恢复原始值
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.snakeBody = [
        [4, 1, 'head'],
        [3, 1, 'body'],
        [2, 1, 'body']
    ];
    // 显示分数页面
    lose.style.display = 'block';
    loserScore.innerHTML = this.score;
    // 成绩归0
    this.score = 0;
    scoreBox.innerHTML = this.score;
    // 游戏状态
    startGameBool = true;
    startPushBool = true;

    startP.setAttribute('src', './images/start.png');
}

function removeClass(calssName) {
    // 清除样式
    var ele = document.getElementsByClassName(calssName);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

function setDerict(code) {
    // 键盘按键事件
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;

            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;

            }
            break;

        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;

            }
            break;

        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}

function bindEvent() {
    // 关闭成绩页面
    close.onclick = function() {
            lose.style.display = 'none';
        }
        // 开始按钮
    startBtn.onclick = function() {
            startAndPaush();
        }
        // 暂停界面
    startP.onclick = function() {
        startAndPaush();
    }

}

function startAndPaush() {
    if (startPushBool) {
        if (startGameBool) {
            // 开始游戏
            startGame();
            startGameBool = false;
        }
        startP.setAttribute('src', './images/pause.png');
        document.onkeydown = function(e) {
            var code = e.keyCode
            setDerict(code);
        }
        snakeMove = setInterval(function() {
            move();
        }, speed);
        startPushBool = false;
    } else {
        startP.setAttribute('src', './images/start.png');
        clearInterval(snakeMove);
        document.onkeydown = function(e) {
            e.returnValue = false;
            return false;
        };
        startPushBool = true;
    }
}