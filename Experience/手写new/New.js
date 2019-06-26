function New(func) {
    // 创建一个全新的对象
    var res = {};
    if(func.prototype !== null){
        // 通过new创建的每个对象将链接到这个函数的prototype对象上
        res.__proto__ = func.prototype;
    }
    // 使this指向新创建的对象
    var ret = func.apply(res, Array.prototype.slice.call(arguments,1));
    if((typeof ret === 'object' || typeof ret === 'function') && ret !== null){
        // 返回该对象引用
        return ret
    }
    return res;
}

var obj = New(A,1,2);
// equals to
var obj = new A(1,2);
