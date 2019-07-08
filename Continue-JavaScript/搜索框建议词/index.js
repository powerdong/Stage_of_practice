//文本框dom元素
var input = document.querySelector(".container input");
var ul = document.querySelector(".container ul.list");
var curIndex = -1; //当前选中的结果的下标
/**
 * 词库
 */
var words = [
    "1建设清洁美丽世界，习主席这些话字字珠玑",
    "1垃圾分类分出首饰",
    "1不和同事吃饭被批",
    "1秋瓷炫求婚于晓光",
    "1乐视体育被吊执照",
    "1言承旭拍片被围观",
    "1迪拜酋长王妃出逃",
    "1黄晓明辟谣离婚",
    "1基因编辑清除HIV",
    "1史上最贵离婚生效",
    "1上海下放户籍审批",
    "1河北高温红色预警",
];

/**
 * 根据文本框当前的文本进行搜索
 */
function search() {
    curIndex = -1; //还原为-1
    var key = input.value; //文本框的文本
    if (!key) {
        //不会搜索
        hideList();
        return;
    }
    //有文本
    var result = words.filter(function (item) {
        //判断item是否满足条件
        return item.includes(key);
    });
    //ES6
    // var result = words.filter(it=>it.includes(key));

    if (result.length === 0) {
        //无搜索结果
        hideList();
        return;
    }
    //动态创建li元素
    createLis(result, key);
}
/**
 * 动态创建LI
 * @param {Array} searchResult 搜索结果的数组（字符串数组）
 */
function createLis(searchResult) {
    //清空之前的搜索结果
    ul.innerHTML = "";
    var key = input.value;
    //遍历数组
    searchResult.forEach(function (item) {
        var li = document.createElement("li");
        //用span替换关键词
        li.innerHTML = item.replace(new RegExp(key, "g"), function (r) {
            return `<span class="key">${r}</span>`;
        });
        ul.appendChild(li);
    })
    ul.style.display = "block"; //显示ul
}

/**
 * 隐藏搜索结果
 */
function hideList() {
    ul.style.display = "none";
}

/**
 * 根据curIndex的值，设置li的状态
 */
function setLiStatus() {
    //去掉之前选中的
    var li = ul.querySelector(".active");
    if (li) {
        li.classList.remove("active");
    }
    li = ul.children[curIndex]; //得到要选中的li
    if (li) {
        li.classList.add("active");
    }
}

/**
 * 确定目前选中的li
 */
function sure() {
    var li = ul.children[curIndex];
    if (li) {
        input.value = li.innerText; //将文本复制过去
        hideList();
    }
}

//事件

/**
 * 聚焦事件
 */
input.onfocus = function () {
    search();
}

/**
 * 失去焦点
 */
input.onblur = function () {
    hideList();
}

var timer = null; //函数防抖的计时器
/**
 * 输入事件
 */
input.oninput = function () {
    clearTimeout(timer); //之前的不要等了
    timer = setTimeout(search, 500);
}

input.onkeydown = function (e) {
    if (e.key === "ArrowUp") {
        //向上
        curIndex--;
        if (curIndex < 0) {
            curIndex = 0;
        }
        setLiStatus();
        var li = ul.children[curIndex];
        if (li.offsetTop < ul.scrollTop) {
            ul.scrollTop = li.offsetTop;
        }
    }
    else if (e.key === "ArrowDown") {
        //向下
        curIndex++;
        if (curIndex >= ul.children.length) {
            curIndex = ul.children.length - 1;
        }
        setLiStatus();
        //处理滚动条
        var li = ul.children[curIndex];
        if (li.offsetTop - ul.scrollTop > ul.clientHeight - li.clientHeight) {
            ul.scrollTop = li.offsetTop - (ul.clientHeight - li.clientHeight);
        }
    }
    else if (e.key === "Enter") {
        sure();
    }
    else {
        return true;
    }
    return false; //阻止默认行为
}

//事件委托

ul.onmouseover = function (e) {
    if (e.target.tagName === "LI") {
        var li = e.target;
        var children = Array.from(ul.children); //类数组->真数组
        curIndex = children.indexOf(li);
        setLiStatus();
    }
}


ul.onmousedown = function (e) {
    if (e.target.tagName === "LI") {
        sure();
    }
}