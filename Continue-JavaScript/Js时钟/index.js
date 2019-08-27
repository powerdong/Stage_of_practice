/**
 * 创建所有刻度
 */
function createMarks() {
    var markContainer = document.querySelector(".mark");
    for (var i = 0; i < 60; i++) {
        var div = document.createElement("div");
        div.style.transform = "translateY(250px) rotate(" + i * 6 + "deg)";
        if (i % 5 === 0) {
            //5的倍数，加粗
            div.className = "bold";
        }
        markContainer.appendChild(div);
    }
}

/**
 * 创建所有数字
 */
function createNumbers() {
    var numberContainer = document.querySelector(".number");
    var R = 220; //数字围绕的半径
    for (var i = 1; i <= 12; i++) {
        var div = document.createElement("div");
        div.innerHTML = i;
        //计算角度
        var degree = (i - 3) * 30;//30是每个刻度之间的角度差
        //计算弧度
        var radian = degree * Math.PI / 180;
        div.style.left = Math.cos(radian) * R + "px";
        div.style.top = Math.sin(radian) * R + "px";
        numberContainer.appendChild(div);
    }

}

createMarks();
createNumbers();

/**
 * 让时针,分针,秒针指向正确的值
 */
function setPointers() {
    var hDom = document.querySelector(".h"),
        mDom = document.querySelector(".m"),
        sDom = document.querySelector(".s");
    var now = new Date();//获取当前时间
    var zero = new Date(now.getFullYear(), now.getMonth(), now.getDate());//获取今日凌晨的时间
    var timespan = now - zero; //得到今日凌晨距离现在经过的毫秒数
    var hspan = timespan / (60 * 60 * 1000); //经过的小时数
    var mspan = timespan / (60 * 1000); //经过的分钟数
    var sspan = timespan / 1000; //经过的秒数
    var hdeg = (hspan - 3) * 30; //小数要旋转的度数
    var mdeg = (mspan - 15) * 6; //分钟要旋转的度数
    var sdeg = (sspan - 15) * 6; //秒钟要旋转的度数
    hDom.style.transform = "translateY(-50%) rotate(" + hdeg + "deg)";
    mDom.style.transform = "translateY(-50%) rotate(" + mdeg + "deg)";
    sDom.style.transform = "translateY(-50%) rotate(" + sdeg + "deg)";
}

setPointers();

setInterval(setPointers, 16);