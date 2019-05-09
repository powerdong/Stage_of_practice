function User() {}
User.prototype.sayHello = function() {}

const u1 = new User();
const u2 = new User();

console.log(u1.sayHello === u2.sayHello); //true
console.log(User.prototype.constructor); // User本身
console.log(User.prototype === Function.prototype); //false
console.log(User.__proto__ === Function.prototype); //true
console.log(User.__proto__ === Function.__proto__); //true
console.log(u1.__proto__ === u2.__proto__); //true
console.log(u1.__proto__ === User.__proto__); //false
console.log(Function.__proto__ === Object.__proto__); //true
console.log(Function.prototype.__proto__ === Object.prototype.__proto__);
//false
console.log(Function.prototype.__proto__ === Object.prototype);
//true