/**
 * 
 * @param {*} func 回调功能函数
 * @param {*} time 延迟时间
 * @param {*} flag 是否立即执行   true->立即执行 false->不立即执行
 */

/**
 * 使用方法：
 * 在外部使用变量接收   var setUserAction = debounce(cb,3000,true);
 * 
 * 设置取消执行事件  btn.onclick = setUserAction.cancel;
 * 设置正常执行事件  search.oninput = setUserAction;
 * 
 */

function debounce(func, time, flag) {
    var timer = null;
    var debounced = function () {
        var _this = this,
            argu = arguments;
        clearTimeout(timer);
        if (flag) {
            if (!timer) func.apply(_this, argu);
            timer = setTimeout(function () {
                timer = null;
            }, time);
        } else {
            timer = setTimeout(function () {
                func.apply(_this, argu);
            }, time)
        }
    }
    debounced.cancel = function () {
        clearTimeout(timer);
        timer = null;
    }
    return debounced;
}