/**
 * 得到一件商品的信息，返回的是一个对象
 * @param {*} trDom 
 */
function getProductInfo(trDom) {
    //积分
    var score = +trDom.querySelector(".cart_td_4").innerText;
    //单价
    var unitPrice = +trDom.querySelector(".cart_td_5").innerText;
    //数量
    var number = +trDom.querySelector(".cart_td_6 input").value;
    //总价
    var totalPrice = unitPrice * number;
    //是否选中
    var checked = trDom.querySelector(".cart_td_1 input").checked;
    return {
        score, //属性名和属性值来源的变量名，可以省略变量名
        unitPrice,
        number,
        totalPrice,
        checked,
        tr: trDom //保存dom对象
    }
}

/**
 * 计算某个商品的总价，将数据填充到对应的位置
 * @param {object} info 一个商品的信息对象
 */
function calProductTotal(info) {
    info.tr.querySelector(".cart_td_7").innerText =
        info.totalPrice.toFixed(2);
}

/**
 * 得到所有商品的信息，返回一个对象数组
 */
function getAllProducts() {
    var result = [];
    //选中所有表格中，具有id属性的tr，得到一个伪数组
    var trs = document.getElementById("shopping").querySelectorAll("tr[id]")
    for (var i = 0; i < trs.length; i++) {
        var trDom = trs[i];
        var info = getProductInfo(trDom); //获取单件商品信息
        result.push(info);
    }
    return result;
}


/**
 * 计算所有总价
 */
function calAllProducts() {
    //每一件商品的总价
    var sumPrice = 0, sumScore = 0;
    var infoes = getAllProducts(); //获取所有商品信息
    for (var i = 0; i < infoes.length; i++) {
        var info = infoes[i];
        calProductTotal(info);
        if (info.checked) {
            //该商品如果被选中了
            sumPrice += info.totalPrice; //累计总价
            sumScore += info.score * info.number; //累计积分
        }
    }
    //计算所有商品总价之和
    document.getElementById("total").innerText = sumPrice.toFixed(2);
    document.getElementById("integral").innerText = sumScore.toFixed(2);
}

calAllProducts();

/**
 * 改变某件商品的数量
 * @param {*} clickDom 点击的dom元素
 * @param {*} increaseMent 增加的数量
 */
function changeNumber(clickDom, increaseMent) {
    var input = clickDom.parentElement.querySelector("input");
    //获取之前的数量
    var curNumber = +input.value;
    var newNumber = curNumber + increaseMent;//计算新的数量
    if (newNumber < 1) {
        newNumber = 1; //设置最小值
    }
    input.value = newNumber;
    calAllProducts(); //重新计算总价
}

//注册事件
var tab = document.getElementById("shopping");
tab.onclick = function (e) {
    if (e.target.alt === "add") {
        //点击+
        changeNumber(e.target, 1);
    }
    else if (e.target.alt === "minus") {
        //点击-
        changeNumber(e.target, -1);
    }
    else if (e.target.parentElement.className === "cart_td_8") {
        //删除
        deleteProduct(e.target.parentElement.parentElement);
    }
    else if (e.target.alt === "delete") {
        //删除所选
        var infoes = getAllProducts(); //获取所有商品对象
        for (var i = 0; i < infoes.length; i++) {
            var info = infoes[i]
            if (info.checked) {
                //当前商品被选中
                deleteProduct(info.tr);
            }
        }
    }
}

/**
 * 删除某件商品
 * @param {object} tr 商品所在的tr
 */
function deleteProduct(tr) {
    tr.previousElementSibling.remove(); //兄弟，你先去
    tr.remove(); //我随后就来
    calAllProducts();
}

tab.onchange = function (e) {
    if (e.target.name === "cartCheckBox") {
        //改变的是某件商品的复选框
        calAllProducts();//重新计算
    }
    else if (e.target.id === "allCheckBox") {
        //全选
        //设置所有的复选框的选中状态，与全选复选框一致
        var cbs = tab.querySelectorAll("input[name='cartCheckBox']")
        for (var i = 0; i < cbs.length; i++) {
            cbs[i].checked = e.target.checked; //选中状态一致
        }
        calAllProducts();
    }
}