/*
 * @Author: 李浩栋 
 * @Date: 2019-05-05 18:13:53 
 * @Last Modified by: 李浩栋
 * @Last Modified time: 2019-05-05 18:14:13
 */


/**
 * 
 * 小方块旋转的demo
 * 
 * 通过改变class类来实现动画
 * 
 */
var oLI = Array.prototype.slice.call(document.getElementsByTagName('li'));

oLI.forEach(function (ele, index) {
    ele.addEventListener('mouseenter', function (e) {
        addClass(this, e, 'in');
    })
    ele.addEventListener('mouseleave', function (e) {
        addClass(this, e, 'out');
    })
})



function addClass(ele, e, state) {

    // console.log(e.offsetX);

    var x = e.offsetX - ele.offsetWidth / 2;
    var y = e.offsetY - ele.offsetHeight / 2;

    // console.log(Math.atan2(y,x));
    // console.log(180/Math.PI);


    // 判断方向
    var d = (Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90) + 3) % 4;
    var direction;
    switch (d) {
        case 0:
            direction = 'top';
            break;
        case 1:
            direction = 'right';
            break;
        case 2:
            direction = 'bottom';
            break;
        case 3:
            direction = 'left';
            break;
    }


    // console.log(x);
    // console.log(y);


    ele.className = state + '-' + direction;



}