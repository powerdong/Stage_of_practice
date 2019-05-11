/**
 * 项目思路：
 * 首先将背景图片添加至canvas区域
 * 上面加上一个遮罩层
 * 需要在图片加载完成之后才能触发一系列的函数
 * 由于在快速移动过程中  move事件触发不能完整的刮开区域  所以需要将没有刮开区域用直线链接   
 * 
 * 鼠标落下
 * 获取当前坐标(旧坐标)
 * 触发move up 事件
 * 新旧像素合成问题转换
 * 
 * 鼠标移动
 * 获取当前坐标(新坐标)
 * 开始一个新的绘图区域
 * 画出圆 进行滑动绘制
 * 将现在的坐标赋值给旧的坐标
 * 
 * 鼠标抬起
 * 清除move 和 up事件
 * 判断刮开区域大小
 * 
 * 如果刮开区域大于70%  自动将画布清除  显示背景
 * 通过获取当前canvas区域的像素值  比例比较
 */

var myCanvas = document.getElementById('myCanvas'),
    ctx = myCanvas.getContext('2d'),
    w = myCanvas.width,
    h = myCanvas.height,
    lastPoint = {},
    nowPoint = {};

function init() {
    // 创建遮罩层
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'destination-out';

    // 创建背景图片
    var img = new Image();
    img.src = './1.png';
    img.onload = function () {
        myCanvas.style.backgroundImage = 'url(' + img.src + ')';

        myCanvas.addEventListener('mousedown', downFunc, false);
    }
}

init();

/**
 * 鼠标按下事件
 * 
 */
function downFunc(e) {
    lastPoint.x = e.clientX - myCanvas.offsetLeft;
    lastPoint.y = e.clientY - myCanvas.offsetTop;

    myCanvas.addEventListener('mousemove', moveFunc, false);
    document.addEventListener('mouseup', upFunc, false);

}

/**
 * 移动事件
 */
function moveFunc(e) {
    nowPoint.x = e.clientX - myCanvas.offsetLeft;
    nowPoint.y = e.clientY - myCanvas.offsetTop;



    ctx.beginPath();
    // 将上次坐标点与新坐标点连线
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(nowPoint.x, nowPoint.y);
    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.fillStyle = 'red';
    // 绘制一个圆
    ctx.arc(nowPoint.x, nowPoint.y, 20, 0, Math.PI * 2, 0);
    ctx.closePath();
    ctx.fill();

    // 重新定义旧的坐标点
    lastPoint.x = nowPoint.x;
    lastPoint.y = nowPoint.y;

}

/**
 * 鼠标抬起事件
 */

function upFunc() {
    myCanvas.removeEventListener('mousemove', moveFunc, false);
    document.removeEventListener('mouseup', upFunc, false);

    clearCanvas();
}

/**
 * 清除画布区域
 * 
 * 如果刮开区域大于70%   则自动清除
 */


function clearCanvas() {
    var d = ctx.getImageData(0, 0, w, h),
        c = 0,
        len = d.data.length;

    for (let i = 0; i < len; i += 4) {
        if (d.data[i] === 0) {
            c++;
        }
    }

    if (c > len / 4 * 0.7) {
        ctx.clearRect(0, 0, w, h);
    }
}