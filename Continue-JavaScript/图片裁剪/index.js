/**
 * 与原图相关的信息
 */
var origin = {
    size: 500 //原图的宽高
}

/**
 * 用于移动和调整大小以达到剪切目的的对象
 */
var cut = {
    left: 150, //当前横坐标
    top: 150, //当前纵坐标
    size: 150, //当前的宽高（尺寸）
    dom: document.querySelector(".cut"), //对应的dom对象
    //根据当前的属性，重新设置dom对象的样式
    show: function () {
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
        this.dom.style.width = this.size + "px";
        this.dom.style.height = this.size + "px";
    },
    /**
     * 移动到指定位置
     * @param {*} left 
     * @param {*} top 
     */
    move: function (left, top) {
        //控制取值范围
        if (left < 0) {
            left = 0;
        }
        else if (left > origin.size - this.size) {
            left = origin.size - this.size;
        }
        if (top < 0) {
            top = 0;
        }
        else if (top > origin.size - this.size) {
            top = origin.size - this.size;
        }
        //上面的代码，用于保证下面的赋值一定是合理的数据
        this.left = left;
        this.top = top;
        this.show();
        result.setResult();//设置结果
    },
    /**
     * 用于注册移动事件
     */
    moveEvent: function () {
        var that = this;
        this.dom.onmousedown = function (e) {
            //事件中this始终指向注册事件的dom对象
            //记录鼠标按下时，各种信息
            var pageX = e.pageX,
                pageY = e.pageY,
                left = that.left,
                top = that.top;
            window.onmousemove = function (e) {
                var disX = e.pageX - pageX; //横向移动的距离
                var disY = e.pageY - pageY;//纵向移动的距离
                that.move(left + disX, top + disY);
            }
            window.onmouseup = function () {
                window.onmousemove = null;
            }
        }
    },
    /**
     * 重新设置尺寸
     * @param {*} newSize 
     */
    resize: function (newSize) {
        if (newSize < 50) {
            newSize = 50;
        }
        var maxX = origin.size - this.left;//横向的最大值
        var maxY = origin.size - this.top; //纵向的最大值
        var max = maxX > maxY ? maxY : maxX; //取最小
        if (newSize > max) {
            newSize = max;
        }
        this.size = newSize;
        this.show();
        result.setResult();
    },
    //注册尺寸改变事件
    resizeEvent: function () {
        var resizeDom = document.querySelector(".cut .resize");
        var that = this;
        resizeDom.onmousedown = function (e) {
            e.stopPropagation(); //阻止事件冒泡
            var pageX = e.pageX,
                pageY = e.pageY,
                size = that.size;

            window.onmousemove = function (e) {
                var disX = e.pageX - pageX,
                    disY = e.pageY - pageY; //鼠标移动距离
                var max = disX > disY ? disX : disY;//取最大值作为变化的尺寸
                that.resize(size + max);
            }

            window.onmouseup = function () {
                window.onmousemove = null;
            }
        }
    }
}

cut.moveEvent();
cut.resizeEvent();

/**
 * 截取的结果
 */
var result = {
    size: 150,
    dom: document.querySelector(".right"),
    bgSize: 0, //背景图尺寸
    bgLeft: 0,//背景图横坐标
    bgTop: 0,//背景图纵坐标
    show: function () {
        this.dom.style.backgroundSize = this.bgSize + "px " + this.bgSize + "px";
        this.dom.style.backgroundPosition = "-" + this.bgLeft + "px -" + this.bgTop + "px";
    },
    /**
     * 根据左边截图区域的信息，设置当前区域背景图的尺寸和位置
     */
    setResult: function () {
        //1.设置背景图尺寸
        this.bgSize = this.size / (cut.size / origin.size);
        //2.设置背景图位置
        this.bgLeft = cut.left / origin.size * this.bgSize;
        this.bgTop = cut.top / origin.size * this.bgSize;
        //显示
        this.show();
    }
}

result.setResult();