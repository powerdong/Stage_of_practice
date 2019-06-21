var container = document.getElementById("divcontainer");
/**
 * 得到允许拖拽的dom元素，如果没有，返回undefined
 */
function getAllowedDom(target) {
    if (target.dataset.allowed === "true") {
        return target;
    }
    if (target.parentNode.dataset.allowed === "true") {
        return target.parentNode;
    }
}
var curDiv; //拖放源
container.ondragstart = function (e) {
    curDiv = e.target;
}

container.ondragover = function (e) {
    e.preventDefault(); //阻止默认拖拽行为
    var dom = getAllowedDom(e.target);
    if (dom) {
        e.dataTransfer.dropEffect = dom.tagName === "DIV" ? "move" : "copy";
    }
    else {
        e.dataTransfer.dropEffect = "none";

    }
}

//拖放进入的时候
var beforeEnter;//记录的是之前背景改变的td
container.ondragenter = function (e) {
    var dom = getAllowedDom(e.target);
    if(beforeEnter){
        beforeEnter.style.background = "";
    }
    if (dom && dom.tagName === "TD") {
        dom.style.background = "#666";
        beforeEnter = dom;
    }
}
//拖放出去的时候
// container.ondragleave = function (e) {
//     var dom = getAllowedDom(e.target);
//     if (dom && dom.tagName === "TD" && e.target.tagName === "TD") {
//         dom.style.background = "";
//     }
// }

container.ondrop = function (e) {
    var dom = getAllowedDom(e.target);
    if (!dom) {
        return;
    }
    beforeEnter = null;
    dom.style.background = "";
    if (curDiv.parentNode.tagName === "DIV" && dom.tagName === "TD") {
        //复制
        dom.innerHTML = "";
        var newDiv = curDiv.cloneNode(true);
        dom.appendChild(newDiv);
    }
    else if (dom.tagName === "TD") {
        //移动
        var before = dom.innerHTML;
        var parent = curDiv.parentNode;
        dom.innerHTML = "";
        dom.appendChild(curDiv);
        parent.innerHTML = before;
    }
    else {
        curDiv.remove();
    }
}

