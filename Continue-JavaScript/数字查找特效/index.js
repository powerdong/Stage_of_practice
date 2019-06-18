/**
 * 开始查找
 * @param {Function} findSpector 是否满足条件的回调函数
 */
function beginFind(findSpector) {
    var num = 1;
    var colors = ["#f26395", "#62efab", "#ef7658", "#ffe868", "#80e3f7", "#d781f9"];
    var container = document.querySelector(".container");
    var centerNum = document.getElementById("centerNum");
    var duration = 50;
    var timer = setInterval(handleOne, duration);

    document.documentElement.onclick = function(){
        if(timer){
            clearInterval(timer);
            timer = null;
        }
        else{
            timer = setInterval(handleOne, duration);
        }
    }

    function handleOne() {
        var span = document.createElement("span");
        span.innerHTML = num;
        centerNum.innerHTML = num;
        container.appendChild(span);
        // document.documentElement.scrollTop = document.documentElement.scrollHeight;
        span.scrollIntoView();
        if (findSpector(num)) {
            var color = colors[getRandom(0, colors.length)];
            span.style.color = color;
            span.style.textShadow = `0 0 3px ${color}`;
            //产生逐渐消失的div
            createValishDiv(color);
        }
        num++;
    }

    function createValishDiv(color) {
        var div = document.createElement("div");
        div.style.color = color;
        div.className = "center";
        div.innerHTML = num;
        document.body.appendChild(div);
        setTimeout(() => {
            div.style.opacity = 0;
            var x = getRandom(-300, 300);
            var y = getRandom(-300, 300);
            div.style.transform = `translate(${x}px, ${y}px)`;
        }, 30);

        div.addEventListener("transitionend", function(){
            this.remove();
        })
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}