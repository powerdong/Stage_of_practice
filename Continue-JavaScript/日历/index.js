var selMonth = document.getElementById('selMonth');
var selYear = document.getElementById('selYear');
var divContent = document.getElementById('divContent');
var btnToday = document.getElementById('btnToday');

// 要计算一个月有几天  1号是周几

/**
 * @description: 添加一个option，到指定的下拉列表中
 * @param {type} 
 * @return: 
 */
function appendToSelect(num, selDom) {
    var option = document.createElement('option');
    option.innerHTML = num;
    option.value = num;
    selDom.appendChild(option);
    return option;
}


/**
 * @description: 设置选择区域
 * @param {type} 
 * @return: 
 */
function setSelectArea() {
    // 生成月份
    for (var i = 1; i <= 12; i++) {
        appendToSelect(i, selMonth);
    }
    // 生成年份
    var d = new Date();
    var year = d.getFullYear(); //当前年
    var month = d.getMonth() + 1; //月份从0开始 需要加1 
    for (var i = year - 100; i <= year + 100; i++) {
        appendToSelect(i, selYear);
    }
    // 设置默认选中
    selYear.value = year;
    selMonth.value = month;

    // 设置事件
    selYear.onchange = function () {
        setCalendarContent();
    }
    selMonth.onchange = function () {
        setCalendarContent();
    }

    btnToday.onclick = function(){
        selYear.value = year;
        selMonth.value = month;
        setCalendarContent();
    }
}


/**
 * 
 * @description: 根据选中的年份和月份，设置日期的内容部分
 * @param {type} 
 * @return: 
 */
function setCalendarContent() {
    var obj = getInfo();
    /**
     * days: 31
        isLeap: false
        month: 5
        year: 2019
     */


    // 根据当前月的天数设置内容区
    divContent.innerHTML = "";
    // 加空的span
    for (var i = 0; i < obj.dayOfWeek - 1; i++) {
        var span = document.createElement('span');
        span.innerHTML = "";
        divContent.appendChild(span);
    }
    // 加日
    // 今年 当月
    var y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var day = new Date().getDate();
    for (var i = 1; i <= obj.days; i++) {
        var span = document.createElement('span');
        span.innerHTML = i;
        divContent.appendChild(span);

        if (obj.year === y && obj.month === m && i === day) {
            span.className = 'active';
        }
    }


}


/**
 * @description: 根据选中的年份和月份得到一些有用的信息，返回信息对象
 * @param {type} 
 * @return: 
 */
function getInfo() {
    var year = parseInt(selYear.value);
    var month = parseInt(selMonth.value);
    var obj = {
        year,
        month
    }
    // 是不是闰年,4年一闰，百年不闰，400年一闰
    // 是否是闰年，添加一个属性
    obj.isLeap = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;

    // 本月有多少天
    if (month === 2) {
        obj.days = obj.isLeap ? 29 : 28;
        // if (obj.isLeap) {
        //     obj.days = 29;
        // } else {
        //     obj.days = 28;
        // }
    } else if (month <= 7) {
        // 单数月31天
        obj.days = month % 2 === 0 ? 30 : 31;
    } else {
        obj.days = month % 2 === 0 ? 31 : 30;
    }

    // 本月1号是星期几

    var d = new Date(year, month - 1, 1);
    obj.dayOfWeek = d.getDay();
    if (obj.dayOfWeek === 0) {
        obj.dayOfWeek = 7;
    }

    return obj;
}

setSelectArea();
setCalendarContent();