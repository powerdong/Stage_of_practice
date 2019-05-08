var drawingBoard = {
    cavs: document.getElementById('cavs'),
    ctx: this.cavs.getContext('2d'),
    colorchange: document.getElementById('colorchange'),
    lineRuler: document.getElementById('lineRuler'),
    bool: false,
    imgArr: [],
    init: function () {
        // console.log(this.cavs);
        // 绘画
        this.drawing();
        this.btnsAllFn();
        // 线条起始样式
        this.ctx.lineCap = 'round';
        // 线条转弯处圆滑
        this.ctx.lineJoin = 'round';

    },
    btnsAllFn: function () {
        var self = this;
        this.colorchange.onchange = function () {
            // console.log(this.value);
            self.ctx.strokeStyle = this.value;


        }
        this.lineRuler.onchange = function () {
            // console.log(this.value);
            self.ctx.lineWidth = this.value;
        }

        var btnsUlNode = document.getElementsByTagName('ul')[0];
        btnsUlNode.onclick = function (e) {
            // console.log(e.target);
            switch (e.target.id) {
                case 'cleanBoard':
                    self.ctx.clearRect(0, 0, self.cavs.offsetWidth, self.cavs.offsetHeight);
                    break;
                case 'eraser':
                    // self.ctx.strokeStyle = '#fff';
                    break;
                case 'rescind':
                    if (self.imgArr.length > 0) {
                        self.ctx.putImageData(self.imgArr.pop(), 0, 0);
                    }
                    break;
            }
        }

    },
    drawing: function () {
        var self = this;
        var c_left = this.cavs.offsetLeft;
        var c_top = this.cavs.offsetTop;

        this.cavs.onmousedown = function (e) {
            self.bool = true;
            var e = e || window.event;
            self.ctx.beginPath();
            self.ctx.moveTo(e.pageX - c_left, e.pageY - c_top);
            var imgData = self.ctx.getImageData(0, 0, self.cavs.offsetWidth, self.cavs.offsetHeight)
            self.imgArr.push(imgData);

            this.onmousemove = function (e) {
                if (self.bool) {

                    self.ctx.lineTo(e.pageX - c_left, e.pageY - c_top);
                    self.ctx.stroke();
                }



            }
            this.onmouseup = function () {
                self.ctx.closePath();
                this.onmousemove = null;
                self.bool = false;
            }
            this.onmouseleave = function () {
                self.ctx.closePath();
                this.onmousemove = null;
                self.bool = false;
            }

        }

    }

}

drawingBoard.init();