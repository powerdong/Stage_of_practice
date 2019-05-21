window.onload = function () {
    // 验证成功
    // 验证失败
    // 触发事件   onmousedown onmousemove onmouseup
    var btn = document.querySelector(".btn");
    var box = document.querySelector('.box');
    var text = document.querySelector('.text');
    var bg = document.querySelector('.bg');
    var flag = false; //默认验证成功

    btn.onmousedown = function (e) {
        var downX = e.clientX;
        btn.onmousemove = function (e) {
            e = e || window.event;
            var x = e.clientX - downX;
            if (x > 0) {
                this.style.left = x + 'px';
                bg.style.width = x + 'px';

                if (x >= box.offsetWidth - this.offsetWidth) {
                    // 验证成功
                    flag = true;
                    // 文字提醒
                    text.innerText = '通过验证';
                    text.style.color = '#fff';
                    // 事件清除
                    this.onmousemove = null;
                    this.onmousedown = null;
                }
            }
        }
    };
    btn.onmouseup = function (e) {
        this.onmousemove = null;
        // 判断验证是否成功
        if (flag) return;
        this.style.left = 0 + 'px';
        bg.style.width = 0 + 'px';
    }
}