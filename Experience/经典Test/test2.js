// //2. 寻找一个单身狗
var arr = [1,2,3,4,5,1,2,3,4,5,5];
//
// var set = new Set();
// for (var i = 0 ; i < arr.length ; i ++) {
//     if (set.has(arr[i])) {
//         set.delete(arr[i]);
//     } else {
//         set.add(arr[i]);
//     }
// }
// // console.log(...set);
// var obj = {};
// for (var i = 0 ; i < arr.length ; i ++) {
//     if (obj[arr[i]]) {
//         delete obj[arr[i]];
//     } else {
//         obj[arr[i]] = true;
//     }
// }
// console.log(Object.keys(obj)[0]);
var result = 0;
for (var i = 0 ; i < arr.length ; i ++) {
    result ^= arr[i];
}
console.log(result);