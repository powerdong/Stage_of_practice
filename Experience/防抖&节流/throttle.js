/**
 * 
 * @param {*} func 回调功能函数
 * @param {*} wait 等待时间
 */

/**
 * 
 *  如何使用  
 * 
 * dom.onmousemove = throttle(function(){
 *      this.innerHTML = this.innerHTML ++;
 * },100)
 */

 
// function throttle(func,wait){
//     var lastTime = 0;
//     return function(){
//         var nowTime = +new Date();
//         if(nowTime - lastTime > wait){
//             func.apply(this,arguments);
//             lastTime = nowTime;
//         }
//     }
// }


function throttle(func, wait) {
    var timer = null;
    return function () {
        var _this = this,
            argu = arguments;
        if (!timer){
            timer = setTimeout(function(){
                func.apply(_this,argu);
                timer = null;
            },wait);
        }
    }
}