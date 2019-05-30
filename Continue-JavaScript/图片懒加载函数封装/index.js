// 所有具有data-src属性的都需要懒加载
// 大图需要预加载，添加data-src为小图，data-original为大图
/**
 * 开始图片懒加载
 * @param defaultImg 默认图片参数
 */
function startLazy(defaultImg) {
    // 先得到所有需要懒加载的图片
    var imgs = document.querySelectorAll('img[data-src]');
    // 将其转换为真实数组
    // Array.from函数返回真实数组
    imgs = Array.from(imgs);

    /* 设置默认图片 */
    setDefaultImgs();

    /* 懒加载所有 */
    loadAllImgs();

    /* 滚动事件 */
    var timer = null;
    document.body.onscroll = function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            // 停止滚动500秒后再加载
            loadAllImgs();
        }, 500)
    }
    /* 函数区
       设置默认图片
    */
    function setDefaultImgs() {
        if (!defaultImg) {
            /* 没有默认图片 */
            return;
        }
        /* 得到所有需要懒加载的图片 */
        // 设置默认图片
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            img.src = defaultImg;

        }
    }

    /**
     * 懒加载所有图片
     */
    function loadAllImgs() {
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            if (loadImg(img)) {
                // 去除掉已经加载的图片
                // 加载了图片
                imgs.splice(i, 1);
                i--;
            };
        }
    }

    /**
     * 懒加载一张图片
     * 自行判断是否应该加载
     * @param img 图片的dom对象
     */
    function loadImg(img) {
        // 判断该图片是否能够加载
        // 判断的实际是该图片是否在可视区域内
        // 每个dom对象都有一个函数，
        var rect = img.getBoundingClientRect();
        if (rect.bottom <= 0) {
            return false;
        }
        if (rect.top >= document.documentElement.clientHeight) {
            return false;
        }
        img.src = img.dataset.src;

        // 判断是否有原图
        // 预加载
        if(img.dataset.original){
            // 等待图片加载完成
            img.onload = function(){
                img.src = img.dataset.original;
                // 加载完成后清除事件
                img.onload = null;
            }
        }
        return true;
    }
}