/*
 * @Author: Haodong.Li 
 * @Date: 2019-04-30 20:29:15 
 * @Last Modified by: Haodong.Li
 * @Last Modified time: 2019-04-30 21:20:44
 */

/**
 * 创建一个瀑布流插件
 * @param {*} areaDom 容器
 * @param {*} urls 图片的url数组
 * @param {*} everyWidth 每张图片的宽度
 */


function createWaterFall(areaDom, urls, everyWidth) {
    // 有多少列
    var colNumber;
    // 每列间隙
    var gap;


    /**
     * 创建图片的dom对象
     */
    function createImgDoms() {
        for (var i = 0; i < urls.length; i++) {
            var url = urls[i];
            // console.log(url);
            var img = document.createElement('img');
            img.src = url;
            img.style.width = everyWidth + 'px';
            img.style.position = 'absolute';

            img.onload = function () {
                setImgPosition();
            }
            // img.style.left = '';
            // img.style.top = '';
            areaDom.appendChild(img);

        }

    }


    /**
     * 计算
     */
    function cal() {
        // 有多少列？
        // colNumber = 容器的宽度 / 图片的宽度
        var containerWidth = parseInt(areaDom.clientWidth);
        // console.log(containerWidth);
        colNumber = parseInt(containerWidth / everyWidth);
        // 剩余空间  列间距
        var space = containerWidth - colNumber * everyWidth;
        gap = space / (colNumber + 1);
    }

    /**
     * 设置每张图片的坐标
     */
    function setImgPosition() {
        cal();
        // 存放的是，每一列的下一个图片的Y坐标
        var colY = new Array(colNumber);
        // 将数组的每一项填充为0
        colY.fill(0);
        // console.log(colY);

        for (var i = 0; i < areaDom.children.length; i++) {
            var img = areaDom.children[i];

            // console.log(img);

            // 找到colY中的最小值
            var y = Math.min(...colY); //y坐标
            // x坐标
            // 第几列
            var index = colY.indexOf(y);
            var x = (index + 1) * gap + index * everyWidth;
            img.style.left = x + 'px';
            img.style.top = y + 'px';

            // 更新数组
            colY[index] += parseInt(img.height) + gap;
        }
        // 找到数组中最大的数字
        var height = Math.max(...colY);
        areaDom.style.height = height + 'px';

    }


    /**
     * 
     */

     var timer = null;
    window.onresize = function () {
        if(timer ){
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            setImgPosition();
        }, 500);
    }

    setImgPosition();
    createImgDoms();
}