/**
 * 游戏配置
 */
var gameConfig = {
    width: 640, //整个游戏面板的宽度
    minSpeed: 300, //土豆向上的最小速度
    maxSpeed: 1000, //土豆向上的最大速度
}

/**
 * 大地对象
 */
var land = {
    left: 0, //大地的横坐标
    dom: document.querySelector(".land"), //大地的dom元素
    /**
     * 让大地向左移动
     * @param {*} distance 向左移动的距离
     * @param {*} duration 完成移动的时间(单位：秒)
     */
    move: function (distance, duration) {
        this.left -= distance; //得到新的left值
        this.dom.style.transition = duration + "s linear";//设置过渡效果，linear表示匀速运动
        this.dom.style.marginLeft = this.left + "px";//更新marginLeft
    },
    //初始化
    init: function () {
        var that = this;
        //当该元素的过渡效果结束后运行的事件
        this.dom.addEventListener("transitionend", function () {
            that.left = that.left % gameConfig.width;
            //重新设置marginLeft，主要的目的是让大地回去
            that.dom.style.marginLeft = that.left + "px";
            //回去的时候不需要动画，取消过渡
            that.dom.style.transition = "";
        })
    }
}

land.init();//初始化大地

/**
 * 蓄力条
 */
var bar = {
    dom: document.querySelector(".bar-content"),
    width: 0, //当前的百分比宽度 0~100
    timer: null, //记录蓄力条变化的计时器id
    /**
     * 开始变化蓄力条（变化的实际上是width）
     */
    start: function () {
        clearInterval(this.timer); //清空之前的计时器，不管有没有
        var dis = 2; //记录宽度每次变化的值
        var that = this; //记录this指向
        this.timer = setInterval(function () {
            that.width += dis;//变化宽度
            if (that.width >= 100) {
                that.width = 100;//不能超过100%
                dis = -dis; //变化反向
            }
            else if (that.width <= 0) {
                that.width = 0;
                dis = -dis;
            }
            that.dom.style.width = that.width + "%";
        }, 16)
    },
    stop: function () {
        clearInterval(this.timer);
    },
    clear: function () {
        this.width = 0;
        this.dom.style.width = 0;
    }
}

/**
 * 土豆
 */
var tudou = {
    dom: document.querySelector(".tudou"),
    top: 466, //土豆的纵坐标（通过尺寸计算可得）
    maxTop: 466, //土豆能有的最大纵坐标
    timer: null, //跳跃的计时器id
    rotate: 0, //记录目前旋转的角度
    /**
     * 让该土豆跳起来
     * @param v 向上的速度（单位，像素/秒），速度为负数
     */
    jump: function (v) {
        if (this.timer) {
            //正在跳，结束
            return;
        }
        var tick = 0.016; //每次移动的间隔时间(单位秒)
        var g = 2000; //向下的重力加速度（单位  像素/平方秒）
        var that = this;
        //大地顺便移动一下
        //规定水平速度为垂直速度的一半
        var hv = -v / 2; //水平速度
        //计算土豆落地的时间
        var duration = 2 * -v / g;
        land.move(hv * duration, duration);

        //旋转
        //仅针对transform属性使用过渡效果
        this.dom.style.transition = "transform " + duration + "s linear";
        this.rotate += 90;
        //旋转
        this.dom.style.transform = "rotate(" + this.rotate + "deg)";
        this.timer = setInterval(function () {
            var dis = v * tick + 0.5 * g * tick * tick; //计算这一次移动的距离
            v = g * tick + v;//更新速度的值
            that.top += dis;
            if (that.top >= that.maxTop) {
                //落地了
                that.top = that.maxTop;
                clearInterval(that.timer);//停止计时
                that.timer = null; //表示没有跳跃了
                bar.clear();
            }
            that.dom.style.top = that.top + "px";
        }, tick * 1000)
    }
}

//鼠标按下
window.onmousedown = function () {
    if (tudou.timer) {
        //正在跳
        return;
    }
    bar.start();
}

window.onmouseup = function () {
    if (tudou.timer) {
        //正在跳
        return;
    }
    bar.stop();
    //300 + 700 *百分比%
    var v = gameConfig.minSpeed + (gameConfig.maxSpeed - gameConfig.minSpeed) * bar.width / 100
    v = -v; //速度是负数
    tudou.jump(v);
}