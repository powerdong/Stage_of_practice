//深度克隆,浅克隆
var obj = {
    name: "panda",
    age: 18,
    msg: {
        a: 1,
        b: 2,
        c: {
            x: 3,
            y: 4
        }
    },
    arr: [1,2,3]
}
// var obj2 = JSON.parse(JSON.stringify(obj));
function deepCloneObject(obj, newObj) {
    for (var temp in obj) {//遍历对象的所有属性
        if (obj.hasOwnProperty(temp)) {
            if (obj[temp] instanceof Object || obj[temp] instanceof Array) {
                var tempNewObj = {};
                newObj[temp] = deepClone(obj[temp], tempNewObj);
            } else {
                newObj[temp] = obj[temp];
            }
        }
    }
    return newObj;
}
function deepCloneArray(arr, newArr) {
    for (var i = 0 ; i < arr.length ; i ++) {
        if (arr[i] instanceof Object || arr[i] instanceof  Array) {
            var tempNewObj = {};
            newArr[i] = deepClone(arr[i], tempNewObj);
        } else {
            newArr[i] = arr[i];
        }
    }
    return newArr;
}
function deepClone(obj, newObj) {
    if (obj instanceof Array) {
        //处理数组
        newObj = [];
        return deepCloneArray(obj, newObj);
    } else if (obj instanceof Object) {
        //处理对象
        newObj = {};
        return deepCloneObject(obj, newObj);
    } else {//可能传了数，可能传了个字符串
        return newObj = obj;
    }
}
var newObj = {};

newObj = deepClone(obj, newObj);
console.log(newObj);
obj.age = 16;
obj.msg.a = 6;
obj.arr[1] = 666;
console.log(newObj);







