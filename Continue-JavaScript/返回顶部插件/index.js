/**
 * 将某个元素的滚动条，设置到某个位置
 * 
 * 
 * 滚动某个元素到指定位置
 * 
 * interval 帧率
 * @param {*} scrollTop 返回位置
 * @param {*} options   配置对象 默认值为{}
 * 
 */
function scroll(scrollTop, options = {}) {


    // 默认元素
    var defaultOptions = {
        dom: document.documentElement, //滚动的元素
        duration: 1000, //总时长
        tick: 16, //多少毫秒变化一次
        onStart: undefined, //开始回调函数
        onEnd: undefined //结束回调函数
    }
    // 混合 defaultOptions 和 options
    var options = Object.assign(defaultOptions, options);

    // 开始滚动
    startScroll()
    /**
     * 开始滚动
     */
    function startScroll() {

        // 判断当前元素是否正在滚动
        if (options.dom.isScroll) {
            return;
        }
        if (options.onStart) {
            // 开始时调用开始函数，
            // 如果是异步的  在setTimeout后调用传的函数
            options.onStart(start);
        }else{
            start();
        }

        function start(){
            // 每次变化的量 = 总量 / 次数
            // 总量
            var total = scrollTop - options.dom.scrollTop;
            // 次数
            var times = Math.ceil(options.duration / options.tick);
            // 每次变化的量
            var dis = total / times;
            // 记录当前的次数
            var curTimes = 0;
            options.dom.isScroll = true;
            var timer = setInterval(function () {
                options.dom.scrollTop += dis;
                curTimes++;
                if (curTimes === times) {
                    clearInterval(timer);
                    options.dom.isScroll = false;
                    if (options.onEnd) {
                        // 结束时调用结束回调函数
                        options.onEnd();
                    }
                }
            }, options.tick);
        }

    }
}