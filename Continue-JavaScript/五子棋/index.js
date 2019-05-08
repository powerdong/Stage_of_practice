var chess,
    grid, // 棋盘行列数
    gridNum = 15,
    count = 0;

var block = false;

window.onload = function () {
    chess = document.getElementById('chess');
    init();
}

function init() {
    // 创建空数组
    grid = new Array(gridNum);
    // console.log(grid);
    
    for (var i = 0; i < grid.length; i++) {
        // i代表x
        grid[i] = new Array(gridNum);
        for (var j = 0; j < grid[i].length; j++) {
            // j代表y
            // x  y  控制left和top值
            // 遍历每个棋格  创建棋子
            grid[i][j] = createGrid(i, j);
            // 为每个div添加点击事件
            // 落棋子
            grid[i][j].onclick = function () {
                if (this.value > 0 || block) {
                    // 如果已经有棋子 退出
                    return;
                }
                block = true;
                // 渲染棋子
                this.style.backgroundImage = "url('./img/" + (count % 2 + 1) + ".png')";
                this.value = count % 2 + 1;
                count += 1;
                // 检查游戏是否结束
                var result = checkFinish();
                if (result == 0) {
                    block = false;
                } else {
                    setTimeout(function () {
                        alert(result == 1 ? '黑棋胜利' : '白棋胜利')
                    }, 200);
                }
            }
            chess.appendChild(grid[i][j]);
        }
    }

}

/**
 * 
 * @param {*} x 棋子dom元素的x坐标
 * @param {*} y 棋子dom元素的y坐标
 */
function createGrid(x, y) {
    // left--x   top--y;
    // 创建divDom
    var temp = document.createElement('div');
    temp.classList.add('grid');

    temp.style.left = x * 50 + 7 + 'px';
    temp.style.top = y * 50 + 7 + 'px';
    // 标记当前背景元素  0代表什么都没有
    // 1 黑   2  白
    temp.value = 0;
    return temp;
}

function checkFinish() {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            if (grid[i][j].value == 0) {
                continue;
            }
            // 判断是否有连在一起的
            var result = checkLine(i, j);
            if (result > 0) {
                return result;
            }
        }
    }
    return 0;
}

// 0(00)  1(01)  2(10)    3-->11
function checkLine(x, y) {
    var result1 = 3, //横向
        result2 = 3, //纵向
        result3 = 3, //斜上
        result4 = 3; //斜下

    for (var i = 0; i < 5; i++) {
        result1 &= x + i > 14 ? 0 : grid[x + i][y].value;
        result2 &= y + i > 14 ? 0 : grid[x][y + i].value;
        result3 &= x + i > 14 || y - i < 0 ? 0 : grid[x + i][y - i].value;
        result4 &= x + i > 14 || y + i > 14 ? 0 : grid[x + i][y + i].value;
    }

    return result1 | result2 | result3 | result4;
}