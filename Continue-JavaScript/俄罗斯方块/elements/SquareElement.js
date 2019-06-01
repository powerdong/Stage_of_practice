class SquareElement extends TetrisElement {
    constructor(x, y, nowStatus, color) {
        super(x, y, nowStatus, SquareElement);
        this.status = [
            [{offsetX: 0, offsetY: 0},{offsetX: 1, offsetY: 0},{offsetX: 0, offsetY: 1},{offsetX: 1, offsetY: 1}],
            [{offsetX: 0, offsetY: 0},{offsetX: 1, offsetY: 0},{offsetX: 0, offsetY: 1},{offsetX: 1, offsetY: 1}],
            [{offsetX: 0, offsetY: 0},{offsetX: 1, offsetY: 0},{offsetX: 0, offsetY: 1},{offsetX: 1, offsetY: 1}],
            [{offsetX: 0, offsetY: 0},{offsetX: 1, offsetY: 0},{offsetX: 0, offsetY: 1},{offsetX: 1, offsetY: 1}]
        ];
        for (var i = 0 ; i < 4 ; i ++) {
            var temp = createSquare(color, this.basePoint.x + this.status[this.nowStatus][i].offsetX, this.basePoint.y + this.status[this.nowStatus][i].offsetY);
            this.squareList.push(temp);
        }
    }
}

elementType.push(SquareElement);