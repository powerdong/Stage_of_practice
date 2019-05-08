var canvas = document.getElementById('mom');
// 返回一个用于在画布上的画笔工具   画笔方法
var context = canvas.getContext("2d");

// 获取当前浏览器宽度高度
var W = window.innerWidth;
var H = window.innerHeight;

// 设置canvas区域
canvas.width = W;
canvas.height = H;

// 设置文字大小
var fontSize = 16;

// 计算显示文字列数     向下取整
var colunm = Math.floor(W / fontSize);
// 存取y坐标值
var drops = [];

for (var i = 0; i < colunm; i++) {
    // 初始位置
    drops[i] = 1;
}

// 运动的文字
var str = "qwtykllkjhgfdsdfghjk[]{}_+-";

// 添加内容到页面   
function draw() {
    // 填充背景
    context.fillStyle = "rgba(0,0,0,0.05)";
    // 绘制已经填色的矩形  X Y W H
    context.fillRect(0, 0, W, H);
    // 给文字内容添加样式
    context.font =  fontSize + "px 微软雅黑";
    // 文字颜色  笔
    context.fillStyle = randColor();
    // 设置出现文字   随机出现
    for (var i = 0; i < colunm; i++) {
        // 让字符串中的内容随机出现
        var index = Math.floor(Math.random() * str.length);
        // 列宽 x位置
        var x = i * fontSize;
        // y的位置
        var y = drops[i] * fontSize;
        //                内容 绘制的x  y
        context.fillText(str[index], x, y);

        if (y >= canvas.height && Math.random() > 0.99) {
            drops[i] = 0;
        }
        drops[i]++;
    }
};

function randColor() {

    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

draw();
setInterval(draw, 20);