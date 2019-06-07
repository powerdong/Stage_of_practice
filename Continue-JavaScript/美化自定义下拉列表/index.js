// 直接执行一些东西

var setSelectVal = (function () {
    // 找到所有需要美化的下拉列表
    var sels = document.querySelectorAll("select[data-beauty]");
    // 为每个列表项设置
    for (var i = 0; i < sels.length; i++) {
        var sel = sels[i];
        beautifySelect(sel);
    }

    /**
     * 美化单个下拉列表
     * 
     * @param sel 要美化的下拉列表
     * 
     */
    function beautifySelect(sel) {
        // 隐藏真实下拉列表
        sel.style.display = "none";
        // 生成div，放在sel前边
        var div = document.createElement('div');
        // 为div设置美化的样式类名
        div.className = "beauty-select";
        // 给div加入内容
        serContent(div, sel)
        // 给列表项之前添加div
        sel.parentNode.insertBefore(div, sel);


        //真实的下拉列表改变事件
        sel.onchange = function () {
            setDivValue(div, sel);
        }

        //点击事件
        var divBeautyValue = div.querySelector('.beauty-value')
        divBeautyValue.onclick = function () {
            if (div.classList.contains('expand')) {
                div.classList.remove('expand');
            } else {
                div.classList.add('expand');
            }
        }

        var lis = div.querySelectorAll('.beauty-options li');
        for (let i = 0; i < lis.length; i++) {
            const li = lis[i];
            li.onclick = function () {
                // 设置对应的下拉列表的选中项变为当前点击li的值
                sel.value = this.dataset.value;
                setDivValue(div, sel);

                divBeautyValue.onclick();
            }

        }
    }


    /**
     * 根据下拉列表的改变值，改变div值
     * @param {*} div 
     * @param {*} sel 
     */
    function setDivValue(div, sel) {
        // 得到选中的option
        var op = getSelectedOption(sel);
        if (op) {
            var span = div.querySelector('.beauty-value span');
            span.innerHTML = op.innerHTML;
        }
        var opts = sel.querySelectorAll("option");
        var lis = div.querySelectorAll('.beauty-options li');
        for (let i = 0; i < opts.length; i++) {
            const op = opts[i];
            if (op.selected) {
                lis[i].classList.add('active');
            } else {
                lis[i].classList.remove("active");
            }

        }
    }

    /**
     * 参数下拉列表sel内容，为div添加内容
     * @param {*} div 
     * @param {*} sel 
     */
    function serContent(div, sel) {
        // 获取选中项
        var op = getSelectedOption(sel);
        // 如果有选中项，添加，如果没有  则值为空
        var html = `
            <div class="beauty-value">
                <span>${op ? op.innerHTML : ""}</span>
                <i class="down"></i>
            </div>
        `;

        html += `<ul class="beauty-options">`;
        // 给里边的其他option设置美化样式
        var opts = sel.querySelectorAll('option');
        for (var i = 0; i < opts.length; i++) {
            var op = opts[i];
            // 将当前选中的内容项设置特殊样式
            html += `<li data-value="${op.value}" class="${op.selected ? "active" : ""}">${op.innerHTML}</li>`;
        }

        html += " </ul>"
        div.innerHTML = html;
    }

    /**
     * 得到下拉列表当前的选中option
     * @param {*} sel 
     */
    function getSelectedOption(sel) {
        // 选取所有的option内容
        var opts = sel.querySelectorAll('option');
        for (let i = 0; i < opts.length; i++) {
            const op = opts[i];
            // 如果当前是选中项返回
            if (op.selected) {
                return op;
            }

        }
    }


    /**
     * 手动下拉列表的值
     * @param {*} sel 要设置值的下拉列表
     * @param {*} value 要设置的选中值
     */
    function setSelectVal(sel, value) {
        sel.value = value;
        var div = sel.previousElementSibling;
        if (!div) {
            return;
        }
        setDivValue(div, sel);
    }

    return setSelectVal;
})();