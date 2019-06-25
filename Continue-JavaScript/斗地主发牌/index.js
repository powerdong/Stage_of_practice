var config = {
    containerWidth: 1000, //容器宽度
    containerHeight: 700,   //容器高度
    pokerWidth: 105,  //扑克牌的宽度
    pokerHeight: 150,  //扑克牌的高度
    duration: 0.25, //动画持续时间
    container: document.getElementById("divGame"),
    //初始化发牌面板
    init: function () {
        this.container.style.border = "1px solid #ccc";
        this.container.style.width = this.containerWidth + "px";
        this.container.style.height = this.containerHeight + "px";
        this.container.style.margin = "0 auto";
        this.container.style.position = "relative";
    },
    /**
     * 得到扑克牌位于中心点时的左上角坐标
     */
    getCenterPointer() {
        return {
            left: (this.containerWidth - this.pokerWidth) / 2,
            top: (this.containerHeight - this.pokerHeight) / 2
        }
    }
};
config.init();

/**
 * 创建一张扑克牌
 * @param {number} number 牌面，1~15，14：小王，15：大王
 * @param {number} color 花色，1~4，如果是小王或大王，花色固定为1
 */
function Poker(number, color, left = 0, top = 0, zIndex = 0) {
    this.number = number;
    this.color = color;
    //设置花色为正确的值
    if (this.number >= 14) {
        //大小王
        this.color = 1;
    }

    //dom元素
    this.dom = document.createElement("img");
    this.dom.style.width = config.pokerWidth + "px";
    this.dom.style.height = config.pokerHeight + "px";
    this.dom.style.position = "absolute";
    this.dom.style.borderRadius = "5px";
    this.dom.style.transition = config.duration + "s";
    this.dom.src = `img/${this.number}_${this.color}.jpg`;
    this.setPosition(left, top); //设置位置
    this.setZIndex(zIndex);
    config.container.appendChild(this.dom);
}
/**
 * 设置位置
 */
Poker.prototype.setPosition = function (left, top) {
    this.left = left;
    this.top = top;
    this.dom.style.left = left + "px";
    this.dom.style.top = top + "px";
}
/**
 * 设置z-index
 */
Poker.prototype.setZIndex = function (zIndex) {
    this.zIndex = zIndex;
    this.dom.style.zIndex = zIndex;
}

/**
 * 设置动画延迟时间
 */
Poker.prototype.setDelay = function (delay) {
    this.dom.style.transitionDelay = delay + "s";
}


/**
 * 一副牌构造函数
 */
function Deck() {
    this.pokers = []; //扑克牌数组
    for (var i = 1; i <= 15; i++) { //循环牌面
        for (var j = 1; j <= 4; j++) {  //循环花色
            var poker = new Poker(i, j);
            this.pokers.push(poker);
            //坐标
            if (i >= 14) { //大小王的花色只有1
                break;
            }
        }
    }

    this.pokers.sort(function () {
        return Math.random() - 0.5; // -0.5~0.5
    })
    this.setPositions(); //设置位置
}

/**
 * 设置所有扑克牌的坐标
 */
Deck.prototype.setPositions = function () {
    var centerPoint = config.getCenterPointer();
    for (var i = 0; i < this.pokers.length; i++) {
        var p = this.pokers[i];
        p.setPosition(centerPoint.left + i * 0.2, centerPoint.top + i * 0.2);
        p.setZIndex(this.pokers.length - i);
        //设置延迟
        p.setDelay(i * config.duration);
    }
}

/**
 * 发牌
 */
Deck.prototype.deal = function () {
    var players = [
        new Player("bottom", 17, 30),
        new Player("left", 17, 30),
        new Player("right", 17, 30),
        new Player("top", 3, 150)
    ];
    var next = 0; //下一张牌发给谁
    for (var i = 0; i < this.pokers.length; i++) {
        if (i >= this.pokers.length - 3) {
            //最后三张牌
            next = 3; //固定为3
        }
        var player = players[next];
        player.getPoker(this.pokers[i]);
        next = (next + 1) % 3; //轮换

        //判断是否是最后一张牌
        if (i === this.pokers.length - 1) {
            //最后一张牌动画结束后，所有玩家排序
            this.pokers[i].dom.addEventListener("transitionend", function () {
                //所有玩家
                players[0].sort();
                players[1].sort();
                players[2].sort();
            })
        }
    }
}

/**
 * 玩家
 * @param {string} direction 方向：left、right、bottom、top
 * @param {number} totalNumber 一共发多少张牌
 * @param {number} gap 牌之间的间隙
 */
function Player(direction, totalNumber, gap) {
    this.direction = direction;
    this.totalNumber = totalNumber;
    this.gap = gap;
    this.pokers = []; //该玩家的扑克牌数组
    //计算firstX、firstY
    if (direction === "top" || direction === "bottom") {
        //计算发完牌的总宽度
        var w = (totalNumber - 1) * gap + config.pokerWidth;
        this.firstX = (config.containerWidth - w) / 2;
        if (direction === "top") {
            this.firstY = 0;
        }
        else {
            this.firstY = config.containerHeight - config.pokerHeight;
        }
    }
    else {
        var h = (totalNumber - 1) * gap + config.pokerHeight;
        this.firstY = (config.containerHeight - h) / 2;
        if (direction === "left") {
            this.firstX = 0;
        }
        else {
            this.firstX = config.containerWidth - config.pokerWidth;
        }
    }
}

/**
 * 给我一张牌
 */
Player.prototype.getPoker = function (poker) {
    this.pokers.push(poker);
    this.setPositions();//重新设置坐标
}

/**
 * 重新设置每一张牌的坐标和zIndex
 */
Player.prototype.setPositions = function () {
    for (var i = 0; i < this.pokers.length; i++) {
        var p = this.pokers[i];
        (function (p, i) {
            setTimeout(function () {
                p.setZIndex(i + 1);
            }, config.duration * 1000 / 2);
        }(p, i))
        //坐标
        if (this.direction === "left" || this.direction === "right") {
            p.setPosition(this.firstX, this.firstY + i * this.gap);
        }
        else {
            p.setPosition(this.firstX + i * this.gap, this.firstY);
        }
    }
}

/**
 * 排序
 */
Player.prototype.sort = function () {
    //去掉延时
    for (var i = 0; i < this.pokers.length; i++) {
        this.pokers[i].setDelay(0);
    }
    this.pokers.sort(function (a, b) {
        if (a.number === b.number) {
            return a.color - b.color; //牌面一样，花色相减
        }
        else {
            return a.number - b.number;
        }
    });
    this.setPositions();
}


var deck = new Deck();
var isDealing = false; //是否正在发牌
config.container.onclick = function () {
    if(!isDealing){
        deck.deal();
        isDealing = true;
    }
}



