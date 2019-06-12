var ctx;

var reqs = [130, 147, 165, 175, 196, 220, 246, 262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1047];



var lis = document.querySelectorAll('.piano li');

for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    li.onmousedown = function(){
        initContext();
        makeSound(i);
        this.style.backgroundColor = "#ccc";
    }
    li.onmouseup = function(){
        this.style.backgroundColor = "#fff";
    }
    
}

// 创建音频上下文
function initContext(){
    if(ctx){
        return ;
    }
    ctx = new AudioContext();
}

/**
 * 发出声音
 * @param index 音频下标
 */
function makeSound(index){
    // 得到一个振荡器
     var osc =  ctx.createOscillator();
    //  得到一个音量控制器
     var g = ctx.createGain();

    //  连接振荡器和音量控制器
    osc.connect(g);
    // 设置声波的波形
    osc.type = "sine";
    // 设置频率   单位HZ
    osc.frequency.value = reqs[index];
    // 将音量控制器连接到相应的扬声器
    g.connect(ctx.destination);
    
    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(0.5,ctx.currentTime + 0.01);
    // 立刻播放
    osc.start();
    // 1.5s之后音量变化到0
    g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime + 1.5);
    // 1.5s后停止
    osc.stop(ctx.currentTime + 1.5);
    
}

document.documentElement.onkeydown = function(e){
    for (let i = 0; i < lis.length; i++) {
        const li = lis[i];
        if(li.dataset.key === e.key){
            initContext();
            makeSound(li.dataset.index);
        }
        
    }
}   