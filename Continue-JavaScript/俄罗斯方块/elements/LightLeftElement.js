class LightLeftElement extends TetrisElement {
    constructor(x, y, nowStatus, color) {
        super(x, y, nowStatus, LightLeftElement);
        this.status = [//四种状态的位置相对坐标，相对于基准点的。
            [{offsetX: 0, offsetY: 0},{offsetX: 0, offsetY: 1},{offsetX: 1, offsetY: 1},{offsetX: 1, offsetY: 2}],//1号状态
            [{offsetX: 0, offsetY: 2},{offsetX: 1, offsetY: 2},{offsetX: 1, offsetY: 1},{offsetX: 2, offsetY: 1}],//2号状态
            [{offsetX: 0, offsetY: 0},{offsetX: 0, offsetY: 1},{offsetX: 1, offsetY: 1},{offsetX: 1, offsetY: 2}],//3号状态
            [{offsetX: 0, offsetY: 2},{offsetX: 1, offsetY: 2},{offsetX: 1, offsetY: 1},{offsetX: 2, offsetY: 1}]//4号状态
        ];
        for (var i = 0 ; i < 4 ; i ++) {//创建小方块，并且添加进小方块列表
            var temp = createSquare(color, this.basePoint.x + this.status[this.nowStatus][i].offsetX, this.basePoint.y + this.status[this.nowStatus][i].offsetY);
            this.squareList.push(temp);
        }
   }
}
elementType.push(LightLeftElement);//将当前的类，注册进类别数组中。