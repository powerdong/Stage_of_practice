var gameDom = document.getElementById('game');
// 图片数组，数组中包含图片的相关信息
var imgObjs;
// 总数
var totalNumber = 36;
// 图片最大编号
var imgMaxNo = 6;

/**
 * 返回一个最小值到最大值之间的随机数
 * @param {*} min 
 * @param {*} max 
 */
function getRandom(min, max) {
    var dec = max - min;
    return Math.floor(Math.random() * dec + min);
}

/**
 * 初始化图片数组
 */
function initImgObjs() {
    imgObjs = new Array(totalNumber);
    for (let i = 0; i < imgObjs.length; i += 2) {
        var n = getRandom(1, imgMaxNo + 1);
        imgObjs[i] = {
            // 图片编号
            number: n,
            // 图片状态为背面  front:正面   
            // flipping：转动中    success：已消除
            status: "back",
        }
        imgObjs[i + 1] = {
            number: n,
            status: "back",
        }
    }
    // 打乱数组
    imgObjs.sort(function () {
        return Math.random() - 0.5;
    });

}


/**
 * 创建一系列 li元素
 */
function createLis() {
    // 需要一个图片编号的数组
    initImgObjs();
    for (let i = 0; i < imgObjs.length; i++) {
        const obj = imgObjs[i];
        // 生成li
        var li = document.createElement('li');
        li.innerHTML = '<img src = "images/' + obj.number + '.jpg">';

        gameDom.appendChild(li);
        // 设置对象关联的li元素
        obj.dom = li;
    }
}

/**
 * 给所有li注册事件
 */
function regEvents() {
    for (let i = 0; i < imgObjs.length; i++) {
        var obj = imgObjs[i];
        regEvent(obj);
    }
}

/**
 * 通过指定的图片对象，完成事件注册
 * @param {*} obj 
 */
function regEvent(obj) {
    obj.dom.onclick = function () {
        // 判断是否能翻转
        if (obj.status !== 'back') {
            // 无法翻转
            return;
        }
        // 当前已经存在两个已翻转  正面，正在翻转
        var num = 0;
        for (let i = 0; i < imgObjs.length; i++) {
            const o = imgObjs[i];
            if (o.status === 'front' || o.status === 'flipping') {
                num++;
            }

        }
        if (num >= 2) {
            return;
        }


        obj.dom.classList.add('flip');
        // 设置为正在翻转
        obj.status = 'flipping';

        setTimeout(function () {
            obj.status = 'front';

            // 后续处理
            handleResult();

        }, 500);

    }
}


/**
 * 翻转之后的处理
 */
function handleResult() {
    // 得到正面的图片数量
    var fronts = imgObjs.filter(function (item) {
        return item.status === "front";
    })
    if (fronts.length < 2) {
        return;
    }
    
    if (fronts[0].number === fronts[1].number) {
        // 消除
        handleResult(fronts[0], fronts[1]);
    } else {
        // 回去
        handleBack(fronts[0], fronts[1]);
    }
}


/**
 * 消除
 * @param {*} obj1 第一张图片
 * @param {*} obj2 第二张图片
 */
function handleSuccess(obj1, obj2) {
    obj1.status = "success";
    obj2.status = "success";
    obj1.dom.classList.add('success');
    obj2.dom.classList.add('success');

    // 判断是否胜利
    var objs=  imgObjs.filter(function(item){
        return item.status === "success";
    })

    if(objs.length === 0 ){
        setTimeout(function(){
            alert('游戏胜利');
        },50)
    }
}

/**
 * 回去
 * @param {*} obj1 
 * @param {*} obj2 
 */
function handleBack(obj1, obj2) {
    obj1.status = "flipping";
    obj2.status = "flipping";
    obj1.dom.classList.remove('flip');
    obj2.dom.classList.remove('flip');

    setTimeout(function () {
        obj1.status = "back";
        obj2.status = "back";
    }, 500);
}
/**
 * 初始化整个游戏
 */
function init() {
    //生成li元素  加入到gameDom
    createLis();
    // 给li注册事件
    regEvents();
}
init();