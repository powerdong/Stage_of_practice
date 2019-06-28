// pending状态 => resolved / rejected
// 如果不作处理一直是pending
// Promise 对象 调用then (fn1, fn2)
// 调用then  返回 Promise对象，可以链式调用

function myPromise(fn) {
    if (typeof fn !== 'function') {
        throw Error(`Promise resolver ${fn} is not a function`);
    }
    var self = this;
    this.status = 'pending';
    this.data = null;
    this.resolvedArr = [];
    this.rejectedArr = [];

    function resolved(data) {
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'resolved';
                self.data = data;
                self.resolvedArr.forEach(fn => fn());
            }
        }, 0);
    }

    function rejected(err) {
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'rejected';
                self.data = err;
            }
        }, 0);
    }
    fn(resolved, rejected)
}

myPromise.prototype.then = function (onResolved, onRejected) {
    var self = this;
    if (this.status === 'resolved') {
        return new myPromise(function (resolved, rejected) {
            var res = onResolved(self.data);
            if (res instanceof myPromise) {
                res.then(resolved, rejected);
            } else {
                resolved(res);
            }
        })
    }

    if (this.status === 'rejected') {
        return new myPromise(function (resolved, rejected) {
            var res = onRejected(self.data);
            if (res instanceof myPromise) {
                res.then(resolved, rejected);
            } else {
                resolved()
            }
        })
    }

    if (this.status === 'pending') {
        // 如果现在是pending状态 属于异步
        // 把要做的事情用立即函数存起来  让它执行对应状态下的函数
        return new myPromise(function (resolved, rejected) {
            self.resolvedArr.push((function (onResolved) {
                return function () {
                    var res = onResolved(self.data);
                    if (res instanceof myPromise) {
                        res.then(resolved, rejected);
                    } else {
                        resolved(res);
                    }
                }
            }(onResolved)))

            self.rejectedArr.push((function (onRejected) {
                return function () {
                    var res = onRejected(self.data);
                    if (res instanceof myPromise) {
                        res.then(resolved, rejected);
                    } else {
                        resolved(res);
                    }
                }
            }(onRejected)))
        })
    }
}

var mp = new myPromise(function (resolved, rejected) {
    setTimeout(() => {
        resolved(123)
    }, 3000);
});

mp.then(data => console.log(data))