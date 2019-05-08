// 超出部分隐藏
window.onload = function () {
    $('ul li:gt(3)').hide();
    // 内容总体内容
    var total_q = $('ul li').length;
    var current_page = 4; //每页显示的数据数目
    var current_num = 1; //起始页
    var total_page = Math.round(total_q / current_page); //总页数
    // var next = $('.next');
    // var prev = $('.prev');
    $('.total').text(total_page);
    $('.current_page').text(current_num);
    $('.next').click(function () {
        if (current_num == 7) {
            $('.next').css({
                // backgroundColor:'#000',
            })
            return false;
        } else {
            $('.current_page').text(++current_num);
            $.each($('ul li'), function (index, item) {
                var start = current_page * (current_num - 1);
                var end = current_page * current_num;
                if (index >= start && index < end) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })
        }

    })
    $('.prev').click(function () {
        if (current_num == 1) {
            $('.prev').css({

            })
            return false;
        } else {
            $('.current_page').text(--current_num);
            $.each($('ul li'), function (index, item) {
                var start = current_page * (current_num - 1);
                var end = current_page * current_num;
                if (index >= start && index < end) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })
        }
    })
}