// bindEvent(拖拽)--->覆盖百分比  left -->  change(per){audio.volume,background-color}

var obj = {
    init: function () {
        this.moon = document.getElementsByClassName('moon')[0];
        this.sun = document.getElementsByClassName('sun')[0];
        this.bindEvent();
    },
    bindEvent: function (e) {
        var moon = this.moon;
        var body = document.getElementsByTagName('body')[0];
        var dis;
        var flag = false;
        var self = this;
        moon.onmousedown = function (e) {
            // console.log(e.clientX);
            flag = true;
            dis = e.clientX - moon.offsetLeft;

        };
        body.onmousemove = function (e) {
            if (!flag) {
                return;
            }
            moon.style.left = e.clientX - dis + 'px';
            self.getPer();
        };
        body.onmouseup = function () {
            flag = false;
        };
    },
    getPer: function () {
        var self = this;
        var per;
        var moon = self.moon,
            sun = self.sun;
        var d = moon.clientWidth,
            mL = moon.offsetLeft,
            mR = moon.offsetLeft + d,
            sL = sun.offsetLeft,
            sR = sun.offsetLeft + d;
        // 相离
        if (sL > mR || mL > sR) {
            per = 0;
        } else {
            // 重合
            if (sL < mL) {
                // 从右向左
                per = (sR - mL) / d;
            } else if (mR > sL) {
                // 从左向右
                per = (mR - sL) / d;
            }
        }
        self.change(per);
    },
    change: function (per) {
        // console.log(per);
        var moon = this.moon;
        var body = document.getElementsByTagName('body')[0];
        var audio = document.getElementsByTagName('audio')[0];
        per > 0 ? audio.play() : audio.pause();
        audio.volume = per;
        moon.style.background = "hsl(194,66%," + (1 - per) * 60 + "%)";
        body.style.background = "hsl(" + (194 + Math.floor(166 * per)) + ", 66%, " + (1 - per) * 50 + "%)";
    }

}

obj.init();