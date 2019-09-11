var video = document.querySelector('.container video'); //video元素
var divModal = document.querySelector('.container .modal');//蒙层
var iconPlay = document.querySelector('.container .iconbofang1');//工具栏整体
var divToolBar = document.querySelector('.container .tool-bar')
var spanCur = document.querySelector('#spancur');
var spanTotal = document.querySelector('#spantotal')
var progressBg = document.querySelector('.bg');
var progressSlider = document.querySelector('.slider');//进度条滑块
var progressBar = document.querySelector('.progress-bar');//整个进度条
var sliderVolume = document.querySelector("#volume"); //得到音量控制块
var lis = document.querySelectorAll(".iconicon_set_up li[data-value]"); //选中所有倍速播放的li
var full = document.querySelector(".iconquanping"); //全屏图标
var container = document.querySelector(".container"); //全屏图标

var timer;

var total;


// 注册事件区域

// 给蒙层的事件 和 播放图标的点击事件
divModal.onclick = iconPlay.onclick = function () {
    if (video.paused) {
        video.play();
        divModal.classList.remove('pause');
        iconPlay.classList.remove('iconbofang1');
        iconPlay.classList.add('iconzanting');

    } else {
        video.pause();
        divModal.classList.add('pause');
        iconPlay.classList.add('iconbofang1');
        iconPlay.classList.remove('iconzanting');
    }
}


// 工具条整体事件阻止事件冒泡
divToolBar.onclick = function (e) {
    e.stopPropagation(); //阻止事件冒泡   

}

// 视频事件
video.ondurationchange = function () {
    total = video.duration;
    setTime();
};

/**
 * 播放进度改变
 */
video.ontimeupdate = function () {
    setTime();
    setProgress();
}

// 工具函数
/**
 *根据秒数得到合适的时间字符串
 * @param {*} seconds 
 */
function getTime(seconds) {
    seconds = parseInt(seconds);
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    parseInt(minutes);
    var second = seconds - minutes * 60;
    if (second < 10) {
        second = "0" + second;
    }

    return minutes + ":" + second;
}

/**
 * 设置时间
 */
function setTime() {
    // 将设置好的时间格式添加到页面
    var cur = getTime(video.currentTime);
    var Total = getTime(total);
    spanCur.innerText = cur;
    spanTotal.innerText = Total;
}

/**
 * 根据视频当前的播放时间，设置进度条位置
 */

function setProgress() {
    var percent = video.currentTime / total * 100;
    // 根据播放时间比例设置进度条位置
    progressBg.style.width = percent + '%';
    progressSlider.style.left = percent + "%";

}

// 进度条的点击事件
progressBar.onmousedown = function (e) {
    setCurrentTime(e);
    // 是给整个区域注册鼠标移动移动事件
    divModal.onmousemove = function (e) {
        setCurrentTime(e);
    }

    divModal.onmouseup = divModal.onmouseleave =  function(){
        divModal.onmousemove =  undefined;
    }
}


function setCurrentTime(e) {
    //  鼠标点击位置距离页面左边的距离
    var offsetX = e.pageX - divModal.getBoundingClientRect().left;
    video.currentTime = offsetX / divModal.clientWidth * total;
    setProgress();
}

/**
 * 音量值
 * 
 */

 function setVolume(){
    video.volume = sliderVolume.value / 100;
 }

 setVolume();
//  音量改变事件
 sliderVolume.onchange = function(){
     setVolume();
 }


//  倍速播放点击事件
for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function(){
        setRate(this.dataset.value);
    }
}

/**
 * 根据你设置的值，重新设置倍速播放
 * @param {*} val 倍速值
 */
function setRate(val){
    video.playbackRate = val;
    for (let i = 0; i < lis.length; i++) {
        var li = lis[i];
        if(li.dataset.val === val){
            li.classList.add('active')
        }else{
            li.classList.remove('active');
        }
    }
}


/**全屏 */
full.onclick = function(){
    if(document.fullscreen){
        // 退出全屏
        document.exitFullscreen();
    }
    else{
        // 进入全屏
        container.requestFullscreen();
    }
}

// 全屏时变化事件

container.onfullscreenchange = function(){
    if(document.fullscreen){
        hideBar();
    }else{
        if(timer){
            clearTimeout(timer);
        }
        divToolBar.style.display ="";
        divModal.style.display ="";
    }
}

container.onmousemove = function(){
    if(document.fullscreen){
        hideBar();
    }
}

/**
 * 一段时间后，隐藏工具条
 */
function hideBar(){
    divToolBar.style.display = 'block';
    divModal.style.cursor = 'pointer';
    if(timer){
        clearTimeout(timer);
    }
    timer = setTimeout(function(){
        divToolBar.style.display = 'none';
        divModal.style.cursor = 'none';    
    },2000);
}