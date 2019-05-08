/**
 * 全局函数，附着在window对象中
 * @param {*} areaDom 轮播图区域，是一个dom元素
 * @param {*} options 轮播图配置
 */
function createBannerArea(areaDom, options) {
    var imgArea = document.createElement('div'), //图片区域div
        numberArea = document.createElement('div'), //角标区域div
        curIndex = 0, //当前显示的第几张图片
        changeTimer = null,
        changeDuration = 3000, //切换时间
        timer = null;//移动动画
    // 创建一个区域，用于显示图片
    initImgs()

    // 创建一个区域，用于显示角标
    initNumbers()

    //设置状态
    setStatus();

    // 自动切换
    autoChange();

    /**
     * ------------------------------------------下面是局部函数
     * 初始化图片区域
     */
    function initImgs() {
        imgArea.style.width = '100%';
        imgArea.style.height = '100%';
        imgArea.style.display = 'flex';
        imgArea.style.overflow = 'hidden';
        for (let i = 0; i < options.length; i++) {
            var obj = options[i];
            var img = document.createElement('img');
            img.src = obj.imgUrl;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.marginLeft = '0';
            img.style.cursor = 'pointer';
            img.addEventListener('click',function(){
                location.href = options[i].link;
            })
            imgArea.appendChild(img);
        }
        imgArea.addEventListener('mouseenter', function () {
            clearInterval(changeTimer);
            changeTimer = null;
        })
        imgArea.addEventListener('mouseleave', function () {
            autoChange();
        })
        areaDom.appendChild(imgArea);
    }

    /**
     * 初始化角标区域
     */
    function initNumbers() {
        numberArea.style.textAlign = 'center';
        numberArea.style.marginTop = '-25px';

        for (var i = 0; i < options.length; i++) {
            var sp = document.createElement('span');;
            numberArea.appendChild(sp);
            sp.style.display = 'inline-block';
            sp.style.width = '12px';
            sp.style.height = '12px';
            sp.style.background = 'lightgray';
            sp.style.margin = '0 7px';
            sp.style.borderRadius = '50%';
            sp.style.cursor = 'pointer';
            (function (index) {
                sp.addEventListener('click', function () {
                    curIndex = index;
                    setStatus();
                })
            })(i)
        }
        areaDom.appendChild(numberArea);
    }


    /**
     * 设置整个区域的状态
     */
    function setStatus() {
        // 设置圆背景颜色
        for (var i = 0; i < numberArea.children.length; i++) {
            if (i == curIndex) {
                // 当前要显示的轮播图
                numberArea.children[i].style.background = '#be926f';
            } else {
                // 当前没有显示的轮播图
                numberArea.children[i].style.background = '#ccc';
            }
        }
        // 显示图片
        // var targetMarginLeft = curIndex * -100;
        var start = parseInt(imgArea.children[0].style.marginLeft);
        var end = curIndex * -100;
        var dis = end - start;
        var duration = 500;
        var speed = dis / duration;

        if(timer){
            clearInterval(timer);
        }
        timer =  setInterval(function () {
            start += speed * 20; 
            if(Math.abs(end - start) < 1){
                imgArea.children[0].style.marginLeft = end + '%';
                clearInterval(timer);
            }
        }, 20);
    }

    /**
     * 自动切换定时器
     */
    function autoChange() {
        if (changeTimer) {
            return;
        }
        changeTimer = setInterval(function () {
            if (curIndex === options.length - 1) {
                curIndex = 0;

            } else {

                curIndex++;
            }
            setStatus();

        }, changeDuration);
    }
}