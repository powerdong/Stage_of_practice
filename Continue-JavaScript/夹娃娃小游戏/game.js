var divToys = document.getElementById("toys");

/**
 * 全局配置
 */
var config = {
    toyWidth: 200, //一个娃娃的宽度
    divToysWidth: 470, //娃娃所在的div容器的宽度
}

var toys = []; //记录目前有的娃娃

/**
 * 创建一个娃娃对象
 */
function createToy(left) {
    var timerId; //记录计时器的id
    var dis = 1.5; //每隔一段时间移动的left值
    var toy = {
        left: left, //娃娃的横坐标
        dom: document.createElement("div"),
        show: function () {
            //显示到界面，更新dom元素的横坐标
            this.dom.style.left = this.left + "px";
        },
        autoMove: function () { //实现娃娃的自动移动
            clearInterval(timerId); //清空之前的计时器
            timerId = setInterval(function () {
                toy.left += dis; //改变left
                toy.show(); //重新显示
                if (toy.left >= config.divToysWidth) {
                    //移除
                    toy.remove();
                }
            }, 10);
        },
        stop: function () { //停止自动移动
            clearInterval(timerId);
        },
        remove: function () { //移除一个娃娃
            this.stop(); //不再移动
            this.dom.remove();//移除dom元素
            //从数组中移除
            var index = toys.indexOf(this); //找到当前这个娃娃在数组中所在的下标
            toys.splice(index, 1);

            //新加入一个娃娃
            var lastToy = toys[toys.length - 1]; //从数组中取出最后一个娃娃
            //新娃娃的横坐标 = 最后一个娃娃的横坐标 - 一个娃娃的宽度
            var left = lastToy.left - config.toyWidth;
            createToy(left)
        },
        ifCanBeCatched: function () {
            //返回一个boolean，指示这个娃娃能不能被抓住
            if (this.left >= 108 && this.left <= 140) {
                return true;
            }
            return false;
        },
        raiseUp: function () {
            //娃娃被抓起
            this.stop(); //停止横向移动
            this.dom.style.bottom = "265px";
            //1秒钟之后移除掉娃娃
            setTimeout(function () {
                toy.remove();
            }, 1000)
        }
    }
    toy.show(); //将坐标应用到dom中
    toy.autoMove(); //创建娃娃后，直接自动移动
    divToys.appendChild(toy.dom);
    toys.push(toy); //将娃娃对象加入到数组中
    return toy;
}

/**
 * 创建多个娃娃
 */
function createToys() {
    var number = 5; //一开始创建多少个娃娃
    for (var i = 0; i < number; i++) {
        var left = -(i + 1) * config.toyWidth;
        createToy(left)
    }
}

createToys();

/**
 * 爪子
 */
var claw = {
    dom: document.getElementById("claw"),
    grab: function () {
        //抓一次
        this.dom.style.height = "350px";
        setTimeout(function () {
            //爪子合拢
            //爪子合拢的时候，要判断哪个娃娃能被抓住，然后让它升起来
            claw.grabToy();
            claw.dom.classList.remove("open"); //移除掉类样式open
            claw.dom.style.height = "80px";
            setTimeout(function () {
                //爪子张开
                claw.dom.classList.add("open");
            }, 1000)
        }, 1000);
    },
    /**
     * 抓住娃娃
     */
    grabToy: function () {
        for (var i = 0; i < toys.length; i++) {
            var toy = toys[i];//拿出每一个娃娃
            if (toy.ifCanBeCatched()) {
                //如果一个娃娃能被抓住
                toy.raiseUp(); //该娃娃升起
                return;
            }
        }
    }
}

//处理按钮

var button = document.getElementById("button");

button.onclick = function () {
    //为了放置重复点击，如果已经有了类样式down，则什么也不做
    if (button.classList.contains("down")) {
        return;
    }
    button.classList.add("down");
    claw.grab();//抓娃娃
    setTimeout(function () {
        button.classList.remove("down");
    }, 2000)
}