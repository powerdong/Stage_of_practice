// 实现卡片的构造函数
function Card(imgIndex) {
    this.status = "back"; //卡片状态: back背面  front正面  clear已消除
    this.imgIndex = imgIndex; //卡片中的图片对应的数字
    this.dom = document.createElement("li");
    this.dom.innerHTML = `<img src="img/${imgIndex}.jpg" />`;

    var that = this;
    this.dom.onclick = function () {
        //要做一些事，但是，这里，并不知道要做什么事
        if (that.onClick) {
            that.onClick();
        }
    }
}

/**
 * 两个卡片的图案是否相同
 */
Card.prototype.equal = function(otherCard){
    return this.imgIndex === otherCard.imgIndex;
}

/**
 * 根据传入的新状态，改变状态
 */
Card.prototype.setStatus = function (newStatus) {
    if (newStatus === "back") {
        this.dom.className = ""; //背面是没有类样式的
    }
    else if (newStatus === "front") {
        this.dom.className = "front"; //背面是没有类样式的
    }
    else if (newStatus === "clear") {
        this.dom.className = "clear";
    }
    else {
        throw new Error("状态不正确");
    }
    this.status = newStatus;

    var that = this; //保存this指向
    //动画什么时候结束
    this.dom.addEventListener("transitionend", function () {
        //要做一些事，但是，这里，并不知道要做什么事
        if (that.onTransitionEnd) {
            that.onTransitionEnd();
        }
    }, { once: true }) //once:true，表示，注册的事件，只执行一次
}

/**
 * 将当前卡片的dom元素，加入到指定的容器中
 */
Card.prototype.appendTo = function (container) {
    container.appendChild(this.dom)
}


export default Card;