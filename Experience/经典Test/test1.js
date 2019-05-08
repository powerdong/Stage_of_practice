//1.数组乱序
//面对面笔试，在线笔试(能多快就多快)
var arr = [1,2,3,4,5,6,7,8,9];
//这种算法，适合面对面笔试。
// var newArr = [];
// while(arr.length > 0) {
//     var num = Math.floor(Math.random() * arr.length);
//     newArr.push(arr[num]);
//     arr.splice(num, 1);
// }
// console.log(newArr);
arr.sort(function (a, b) {
    return Math.random() > 0.5 ? 1 : -1;
});
console.log(arr);
