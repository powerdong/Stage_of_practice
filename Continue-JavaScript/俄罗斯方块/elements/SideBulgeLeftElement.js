class SideBulgeLeftElement extends TetrisElement {
    constructor(x, y, nowStatus, color) {
        super(x, y, nowStatus, SideBulgeLeftElement);
        this.color = color;
        // 四个旋转状态下的坐标
        this.status = [
            [{
                    offsetX: 0,
                    offsetY: 0
                }, {
                    offsetX: 0,
                    offsetY: 1
                },
                {
                    offsetX: 0,
                    offsetY: 2
                },
                {
                    offsetX: 1,
                    offsetY: 2
                }
            ],
            [{
                    offsetX: 0,
                    offsetY: 2
                }, {
                    offsetX: 1,
                    offsetY: 2
                },
                {
                    offsetX: 2,
                    offsetY: 2
                },
                {
                    offsetX: 2,
                    offsetY: 1
                }
            ],
            [{
                    offsetX: 0,
                    offsetY: 0
                }, {
                    offsetX: 0,
                    offsetY: 1
                },
                {
                    offsetX: 0,
                    offsetY: 2
                },
                {
                    offsetX: 1,
                    offsetY: 2
                }
            ],
            [{
                    offsetX: 0,
                    offsetY: 1
                }, {
                    offsetX: 1,
                    offsetY: 1
                },
                {
                    offsetX: 2,
                    offsetY: 1
                },
                {
                    offsetX: 0,
                    offsetY: 2
                }
            ]
        ]
        for (var i = 0; i < 4; i++) {
            //创建小方块
            var temp = createSquare(color,
                // 小方块的x点
                this.basePoint.x + this.status[this.nowStatus][i].offsetX,
                // 小方块的y点
                this.basePoint.y + this.status[this.nowStatus][i].offsetY);
                
            this.squareList.push(temp);
        }
    }
}

elementType.push(SideBulgeLeftElement);