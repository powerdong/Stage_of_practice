/**
 * 随机生成小绿球，她的速度和left位置随机
 * 小绿球在运动过程中，回弹运动
 * 小红球拖拽，在outer的范围内
 * 小球碰撞检测
 * 时间记时
 */

var game = {
    redBall: document.getElementById('move'),
    creatTimer: null,
    timeNode: document.getElementById('timer'),
    timer: null,
    num: 0,
    movePlus: {
        outer: document.getElementById('outer'),
        iWidth: document.getElementById('outer').offsetWidth,
        iHeight: document.getElementById('outer').offsetHeight,
        speedX: 10,
        speedY: 10
    },
    init: function () {

        this.createBall(this.movePlus);
        // 拖拽小红球
        this.dragBall(this.movePlus);
        // 计时
        this.timerRun();
    },
    timerRun: function () {
        var self = this;
        this.timer = setInterval(function () {
            self.num++;
            self.timeNode.innerHTML = '已坚持' + self.num + '秒';
        }, 1000)
    },
    dragBall: function (obj) {
        var self = this;
        this.redBall.onmousedown = function (e) {
            e = e || window.event;
            var on_x = e.pageX;
            var on_y = e.pageY;

            document.onmousemove = function (e) {
                var cha_x = e.pageX - on_x;
                var cha_y = e.pageY - on_y;
                self.redBall.style.left = self.redBall.offsetLeft + cha_x + 'px';
                self.redBall.style.top = self.redBall.offsetTop + cha_y + 'px';
                on_x = e.pageX;
                on_y = e.pageY;

                // 边界检测
                if (self.redBall.offsetLeft < 0) {
                    // 左边
                    // 页面重载
                    this.clearTimer();
                    window.location.reload();
                    alert('游戏结束');

                } else if (self.redBall.offsetLeft + self.redBall.offsetWidth > obj.iWidth) {
                    // 右边
                    this.clearTimer();
                    window.location.reload();
                    alert('游戏结束');
                } else if (self.redBall.offsetTop < 0) {
                    // 上边
                    this.clearTimer();
                    window.location.reload();
                    alert('游戏结束');
                } else if (self.redBall.offsetTop + self.redBall.offsetHeight > obj.iHeight) {
                    // 下边
                    this.clearTimer();
                    window.location.reload();
                    alert('游戏结束');
                }
            }

            this.onmouseup = function () {
                document.onmousemove = null;
            }
        }
    },
    createBall: function (obj) {
        var movePlus = obj
        // 创建一个小绿球
        function Green(movePlus) {
            this.ball = document.createElement('div');
            this.ball.className = 'green';
            // 让 ball 放进 outer里 left是随机的
            this.iwCurrent = Math.floor(Math.random() * (movePlus.iWidth - 50));
            this.ball.style.left = this.iwCurrent + 'px';
            movePlus.outer.appendChild(this.ball);
            this.speedX = Math.floor(Math.random() * (movePlus.speedX));
            this.speedY = Math.floor(Math.random() * (movePlus.speedY));
            this.iWidth = movePlus.iWidth;
            this.iHeight = movePlus.iHeight;
        }

        var newBall = new Green(movePlus);
        this.moveBall(newBall, this.redBall);
        var self = this;
        this.creatTimer = setInterval(function () {
            var newBall = new Green(movePlus);
            self.moveBall(newBall, self.redBall);
        }, 2000)
    },
    moveBall: function (obj, redBall) {
        var self = this;
        obj.ball.goTimer = setInterval(function () {
            self.crashCheck(obj, redBall);
            var newLeft = obj.speedX + obj.ball.offsetLeft;
            var newTop = obj.speedY + obj.ball.offsetTop;

            // 反弹运动
            if (newLeft < 0) {
                // 左壁
                obj.speedX *= -1;
            } else if (newLeft > obj.iWidth - obj.ball.offsetWidth) {
                // 右壁
                obj.speedX *= -1;
            } else if (newTop < 0) {
                // 上壁
                obj.speedY *= -1;
            } else if (newTop > obj.iHeight - obj.ball.offsetHeight) {
                // 下壁
                obj.speedY *= -1;
            }

            obj.ball.style.left = newLeft + 'px';
            obj.ball.style.top = newTop + 'px';

        }, 100)



    },
    crashCheck: function (obj, redBall) {
        // 圆心
        var greenX1 = obj.ball.offsetLeft + Math.floor(obj.ball.offsetWidth / 2);
        var greenY1 = obj.ball.offsetTop + Math.floor(obj.ball.offsetHeight / 2);

        var redX2 = redBall.offsetLeft + Math.floor(redBall.offsetWidth / 2);
        var redY2 = redBall.offsetTop + Math.floor(redBall.offsetHeight / 2);

        var dx = Math.abs(greenX1 - redX2);
        var dy = Math.abs(greenY1 - redY2);
        // 两点间的距离
        var dis = Math.floor(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
        // 两个小球半径和
        var R = obj.ball.offsetWidth / 2 + redBall.offsetWidth / 2;
        if (dis < R) {
            this.clearTimer();
            alert('游戏结束');
            window.location.reload();
        }




    },
    clearTimer: function () {
        clearInterval(this.creatTimer);
        clearInterval(this.timer);
        var outer = this.movePlus.outer;
        var allBall = outer.getElementsByClassName('green');
        for (var i = 0; i < allBall.length; i++) {
            clearInterval(allBall[i].goTimer);
        }
    }

}

game.init();