var c1 = document.getElementById('c1'),
    c2 = document.getElementById('c2'),
    c3 = document.getElementById('c3');

// 最小宽度
var minWidth = 60;
// 每增加一个编号，宽度增加的值
var stepWidth = 40;
// 定义显示的个数
var num = 3;
// 表示每根柱子上的方块编号数组
var columns = {
    c1: [],
    c2: [],
    c3: []
}
for (var i = 1; i <= num; i++) {
    columns.c1.unshift(i);
}

/**
 * 根据columns里的数字显示界面
 */
function render() {

    creatDom(c1, columns.c1);
    creatDom(c2, columns.c2);
    creatDom(c3, columns.c3);

    // for (var n of columns.c1) {
    //     var div = document.createElement('div');
    // }

    function creatDom(container, arr) {
        container.innerHTML = "";
        for (var i = 0; i < arr.length; i++) {
            var n = arr[i];
            var div = document.createElement('div');
            div.style.width = minWidth + (n - 1) * stepWidth + 'px';
            container.appendChild(div);
        }
    }
}

render();


var btnS = document.querySelectorAll('button');

for (var i = 0; i < btnS.length; i++) {
    var btn = btnS[i];
    btn.onclick = function () {
        // 打印该按钮的自定属性
        // 得到从哪个数组中拿出
        var from = columns[this.dataset.from];
        var to = columns[this.dataset.to];
        move(from, to)
    }
}


function move(from, to) {
    if (from.length === 0) {
        return;
    }
    if (to.length === 0) {
        to.push(from.pop());
        render();
        // 胜负判断
        win();
    } else {
        // 拿到两个数组的最后一项
        var fromLast = from[from.length - 1];
        var toLast = to[to.length - 1];
        if (fromLast < toLast) {
            to.push(from.pop());
            render();
            // 胜负判断
            win();
        }
    }
}

function win() {
    if (columns.c1.length === 0 && columns.c2.length === 0) {
        alert('win');
    }
}