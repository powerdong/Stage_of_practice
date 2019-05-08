// 设置图片   用数组索引
var arr = [
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/1.png',
    './img/2.png',
];

// 用字符串形式动态创建dom
var str = '';
for (var i = 0; i < arr.length; i++) {
    str += "<div class='tab_right'><img src=" + arr[i] + "></div>";
}

$('.scroll').append(str);


// 左侧tab
$('.tab .box .menus li').each(function () {
    // 设置移入效果
    $('.tab .box .menus li').mouseover(function () {
        // 首先删除样式
        $('.tab .box .menus li').removeClass('bg');
        // 再添加样式   前端执行一段代码平均时间0.006s
        $(this).addClass('bg');

        // 获取tab索引
        var index = $(this).index();
        // 改变mt  实现切换
        $('.tab .scroll').css('margin-top', -index * 640 + 'px');

        $('.tab').css('background-image', 'url(' + arr[index] + ')');
    })
})