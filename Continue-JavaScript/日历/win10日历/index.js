var time1 = document.querySelector('.time1'),
			time2 = document.querySelector('.time2'),
			number = document.querySelector('.number'),
			btns = document.querySelectorAll('.time3 span'),
			strong = document.querySelector('.time3 strong');


function time() {
    
    time1.innerHTML = `${formatting(new Date().getHours())}:${formatting(new Date().getMinutes())}:${formatting(new Date().getSeconds())}`;
    setTimeout(time,1000);
}
time();

//格式化时间
function formatting(v) {
    return v < 10 ? '0' + v : v;
}

//即时日期
var d1 = new Date();
time2.innerHTML = d1.getFullYear() + '年' + (d1.getMonth() + 1) + '月' + d1.getDate() + '日，星期' + formatWeek(d1.getDay());


function formatWeek(v) {
    return ['日', '一', '二', '三', '四', '五', '六'][v];
}

// 获取某个月份的天数
function getEndDay(year, month) {
    return new Date(year, month, 0).getDate();
}

// 某个月第一天的星期几
function getFirstWeek(year, month) {
    return new Date(year, month - 1, 1).getDay();
}


function setDate(d) {
    var lastMonthDay = getEndDay(d.getFullYear(), d.getMonth());
    var nowMonthDay = getEndDay(d.getFullYear(), d.getMonth() + 1);

    var week = getFirstWeek(d.getFullYear(), d.getMonth() + 1);


    var beginDay = 1;
    var strDay = '';
    var lastMonthNum = week - 1;


    // 第一天是周天,前边空6个
    if(lastMonthNum < 0){
        lastMonthNum = 6; 
    }
    for (var i = 0; i < 42; i++) {
        if (i < lastMonthNum) {
            // 这个条件成立，存放上个月的日期
            strDay = '<span class="color">' + (lastMonthDay--) + '</span>' + strDay;
        } else if (i >= lastMonthNum + nowMonthDay) {
            // 这个条件成立，存放下个月的日期
            strDay += '<span class="color">' + (beginDay++) + '</span>';
        } else {
            // 这个条件成立，存放这个月的日期
            var cl = new Date().getDate() === i - lastMonthNum + 1 ? 'active' : '';

            if(d.getFullYear() !== new Date().getFullYear() || d.getMonth() !== new Date().getMonth()){
                cl = '';
            }
            strDay += '<span class="'+ cl +'">' + (i - lastMonthNum + 1) + '</span>';
        }
    }

    number.innerHTML = strDay;
    strong.innerHTML = d.getFullYear()+'年'+(d.getMonth()+1)+'月';

}

var d = new Date();
setDate(d);


//点击上个月
btns[0].onclick=function(){
    d.setMonth(d.getMonth()-1);
    setDate(d);
};

//点击下个月
btns[1].onclick=function(){
    d.setMonth(d.getMonth()+1);
    setDate(d);
};
