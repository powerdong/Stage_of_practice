var container = document.querySelector('.container')
var zindex = 1;


// 创建默认愿望
// function createDefaultWishes(){

// }



/**
 * 创建一个愿望
 * @param {*} words 愿望的文字
 */

function createWish(words) {
    var div = document.createElement('div');
    // 设置文字
    div.className = 'item';
    div.innerHTML = words;
    container.appendChild(div);

    var span = document.createElement('span');
    span.innerHTML = 'X';
    span.className = 'close';
    div.appendChild(span);

    // 关闭按钮
    span.onclick = function () {
        container.removeChild(div);
    }
    div.onclick = function(){
        div.style.zIndex = zindex;
        zindex ++;
    }

    // 颜色随机
    div.style.background = `rgb(${getRandom(150,256)},${getRandom(150,256)},${getRandom(150,256)})`;
    // 位置随机
    var maxX = window.innerWidth - div.clientWidth;
    div.style.left = `${getRandom(0,maxX)}px`;

    var maxY = window.innerHeight - 100;
    div.style.top = `${getRandom(0,maxY)}px`;
}


function getRandom(min, max) {
    var dec = max - min;
    return Math.floor(Math.random() * dec + min);
}

/**
 * 注册文本框回车事件
 */

var txt = document.querySelector('.txt');
txt.onkeydown = function (e) {
    if(e.keyCode !== 13 ){
        // 判断是不是回车按钮
        return;
    }
    if(txt.value){
        createWish(txt.value);
        txt.value = "";
    }
}
