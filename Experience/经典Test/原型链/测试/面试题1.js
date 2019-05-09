var F = function () {}
Object.prototype.a = function () {}
Function.prototype.b = function () {}

var f = new F();
// f对象有没有a -> F.prototype ->  Object.prototype
console.log(f.a, f.b, F.a, F.b);