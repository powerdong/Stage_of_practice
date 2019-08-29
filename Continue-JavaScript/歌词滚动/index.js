var lrc = `[00:01.06]难念的经
[00:03.95]演唱：周华健
[00:06.78]
[00:30.96]笑你我枉花光心计
[00:34.15]爱竞逐镜花那美丽
[00:36.75]怕幸运会转眼远逝
[00:39.32]为贪嗔喜恶怒着迷
[00:41.99]责你我太贪功恋势
[00:44.48]怪大地众生太美丽
[00:47.00]悔旧日太执信约誓
[00:49.66]为悲欢哀怨妒着迷
[00:52.56]啊 舍不得璀灿俗世
[00:57.66]啊 躲不开痴恋的欣慰
[01:02.86]啊 找不到色相代替
[01:08.09]啊 参一生参不透这条难题
[01:13.15]吞风吻雨葬落日未曾彷徨
[01:15.73]欺山赶海践雪径也未绝望
[01:18.23]拈花把酒偏折煞世人情狂
[01:20.90]凭这两眼与百臂或千手不能防
[01:23.76]天阔阔雪漫漫共谁同航
[01:26.09]这沙滚滚水皱皱笑着浪荡
[01:28.68]贪欢一刻偏教那女儿情长埋葬
[01:32.38]
[01:34.09]吞风吻雨葬落日未曾彷徨
[01:36.50]欺山赶海践雪径也未绝望
[01:39.07]拈花把酒偏折煞世人情狂
[01:41.69]凭这两眼与百臂或千手不能防
[01:44.68]天阔阔雪漫漫共谁同航
[01:46.93]这沙滚滚水皱皱笑着浪荡
[01:49.54]贪欢一刻偏教那女儿情长埋葬
[01:53.41]
[02:15.45]笑你我枉花光心计
[02:18.53]爱竞逐镜花那美丽
[02:21.14]怕幸运会转眼远逝
[02:23.76]为贪嗔喜恶怒着迷
[02:26.43]责你我太贪功恋势
[02:28.98]怪大地众生太美丽
[02:31.60]悔旧日太执信约誓
[02:34.26]为悲欢哀怨妒着迷
[02:36.90]啊 舍不得璀灿俗世
[02:42.04]啊 躲不开痴恋的欣慰
[02:47.34]啊 找不到色相代替
[02:52.52]啊 参一生参不透这条难题
[02:57.47]吞风吻雨葬落日未曾彷徨
[03:00.05]欺山赶海践雪径也未绝望
[03:02.64]拈花把酒偏折煞世人情狂
[03:05.27]凭这两眼与百臂或千手不能防
[03:08.22]天阔阔雪漫漫共谁同航
[03:10.49]这沙滚滚水皱皱笑着浪荡
[03:13.06]贪欢一刻偏教那女儿情长埋葬
[03:18.45]吞风吻雨葬落日未曾彷徨
[03:20.90]欺山赶海践雪径也未绝望
[03:23.54]拈花把酒偏折煞世人情狂
[03:26.21]凭这两眼与百臂或千手不能防
[03:29.07]天阔阔雪漫漫共谁同航
[03:31.32]这沙滚滚水皱皱笑着浪荡
[03:33.92]贪欢一刻偏教那女儿情长埋葬
[03:39.32]吞风吻雨葬落日未曾彷徨
[03:41.84]欺山赶海践雪径也未绝望
[03:44.38]拈花把酒偏折煞世人情狂
[03:47.04]凭这两眼与百臂或千手不能防
[03:49.99]天阔阔雪漫漫共谁同航
[03:52.20]这沙滚滚水皱皱笑着浪荡
[03:54.89]贪欢一刻偏教那女儿情长埋葬
[04:00.28]吞风吻雨葬落日未曾彷徨
[04:02.68]欺山赶海践雪径也未绝望
[04:05.25]拈花把酒偏折煞世人情狂
[04:07.90]凭这两眼与百臂或千手不能防
[04:10.85]天阔阔雪漫漫共谁同航
[04:13.08]这沙滚滚水皱皱笑着浪荡
[04:15.75]贪欢一刻偏教那女儿情长埋葬
[04:19.48]`;

var ul = document.getElementById("ullrc");
var lrcArray = createLrcArray(); //得到歌词对象数组
var audio = document.getElementById("ad"); //获取audio元素

var config = {
    lrcContainerHeight: 450, //歌词容器高度
    liHeight: 35, //li的高度
    offset: 0.8, //修正值，播放时间会加上该值，然后进行比较
}
/**
 * 根据字符串变量lrc的值，计算出一个数组，数组的每一项是一个对象，对象中记录了以下信息：
 * {time:255.75, word:"贪欢一刻偏教那女儿情长埋葬"}
 */
function createLrcArray() {
    var parts = lrc.split("\n"); //用换行符切割数组
    for (var i = 0; i < parts.length; i++) {
        var str = parts[i]; //拿到这一行的字符串
        parts[i] = createLrcObject(str);
    }
    return parts;

    /**
     * 根据一个歌词字符串   [04:15.75]贪欢一刻偏教那女儿情长埋葬   ，返回一个对象
     * 对象格式：{time:255.75, word:"贪欢一刻偏教那女儿情长埋葬"}
     * @param {*} str 
     */
    function createLrcObject(str) {
        var parts = str.split("]");
        var words = parts[1]; //第二个部分是歌词
        var time = parts[0]; //第一个部分是时间
        time = time.replace("[", ""); //去掉左中括号
        var timeParts = time.split(":"); //分割时间
        var minute = parseInt(timeParts[0]); //分钟数
        var second = parseFloat(timeParts[1]); //秒数
        time = minute * 60 + second;
        return {
            time: time,
            words: words
        }
    }
}

/**
 * 根据歌词创建所有的li元素
 */
function createLrcLis() {
    for (var i = 0; i < lrcArray.length; i++) {
        var lrcObj = lrcArray[i]; //取出歌词对象
        var li = document.createElement("li");
        li.innerText = lrcObj.words; //内容为歌词
        ul.appendChild(li);
    }
}

createLrcLis();

/**
 * 根据当前播放器的播放时间，从lrcArray数组中得到对应的下标
 * 返回-1，表示不对应任何歌词（最开始的情况）
 */
function getCurrentIndex() {
    var playTime = audio.currentTime + config.offset; //得到audio元素当前播放的时间
    for (var i = lrcArray.length - 1; i >= 0; i--) {
        //倒着循环
        var lrcObj = lrcArray[i]; //取出歌词对象
        if (playTime >= lrcObj.time) {
            return i; //返回下标，结束循环
        }
    }
    return -1;
}

/**
 * 根据当前播放器的播放时间，设置当前播放歌词的效果：
 * 1. ul的margin-top
 * 2. li的active样式
 */
function setCurrent() {
    var index = getCurrentIndex(); //得到当前播放的歌词是数组的第几项（下标）
    setUlMarginTop();
    setLiActive();

    /**
     * 设置ul元素的margin-top
     */
    function setUlMarginTop() {
        var midHeight = config.lrcContainerHeight / 2 - config.liHeight / 2;
        var top = midHeight - index * config.liHeight;
        if (top > 0) {
            top = 0; //不能为正数
        }
        ul.style.marginTop = top + "px";
    }

    /**
     * 设置li的active样式
     */
    function setLiActive() {
        //1. 找到之前的具有active样式的li，去掉active
        var li = ul.querySelector(".active");
        if (li) {
            //li存在
            li.className = ""; //去掉active
        }
        //2. 找到当前的li，加上active
        if (index !== -1) {
            //有对应的歌词
            ul.children[index].className = "active";
        }
    }
}

//当播放时间发生变化时触发
audio.ontimeupdate = function(){
    setCurrent();
}