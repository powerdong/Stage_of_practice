(function () {
    var ele_container = document.getElementsByClassName('container')[0];
    var ele_content = document.getElementsByClassName('content')[0];
    var ele_duration = document.getElementsByClassName('duration')[0];
    var ele_bar = document.getElementsByClassName('bar')[0];
    var percentH = Math.floor((ele_container.offsetHeight / ele_content.offsetHeight) * ele_duration.offsetHeight);


    ele_bar.style.height = percentH + 'px';


    init();


    function init() {
        // 滚动条拖拽函数
        scrollDrage(ele_bar);
        // 滚动条点击
        scrollClick(ele_bar);
        // 滚动条滑轮
        scrollWheel(ele_container, ele_bar);
    }


    function scrollDrage(item) {

        item.onmousedown = function (e) {
            // 兼容
            e = e || window.event;
            // 取消默认事件
            e.preventDefault();
            // 记录鼠标点
            var e_y = e.pageY;
            document.onmousemove = function (e) {
                // 差值
                var chay = e.pageY - e_y;
                item.style.top = item.offsetTop + chay + 'px';
                e_y = e.pageY;

                // 临界值判断
                if (item.offsetTop < 0) {
                    item.style.top = 0 + 'px';
                } else if (item.offsetTop + item.offsetHeight > ele_duration.offsetHeight) {
                    item.style.top = ele_duration.offsetHeight - item.offsetHeight + 'px';
                }

                // 内容区域跟随
                contentMove(item);
            }

            document.onmouseup = function () {
                document.onmousemove = null;
            }

        }
    }

    function contentMove(item) {
        var percentHeight = item.offsetTop / (ele_duration.offsetHeight - item.offsetHeight);
        var moveHeight = Math.floor(percentHeight * (ele_content.offsetHeight - ele_container.offsetHeight));
        ele_content.style.top = -moveHeight + 'px';
    }

    // 点击部分
    function scrollClick(item) {
        var ele_scroll = document.getElementsByClassName('scroll')[0];
        var speed = 5;
        ele_scroll.onclick = function (e) {
            // console.log(e.target.id);
            if (e.target.id == 'up_img') {
                // 点击up按钮
                item.style.top = item.offsetTop - speed + 'px';
                if (item.offsetTop < 0) {
                    item.style.top = 0 + 'px';
                }
            } else if (e.target.id == 'down_img') {
                // 点击down按钮
                item.style.top = item.offsetTop + speed + 'px';
                if (item.offsetTop + item.offsetHeight > ele_duration.offsetHeight) {
                    item.style.top = ele_duration.offsetHeight - item.offsetHeight + 'px';
                }
            }
            contentMove(item);
        }
    }

    // 滑轮部分
    function scrollWheel(container, item) {
        container.onmousewheel = function (e) {
            var speed = 5;
            // console.log(e.wheelDelta);
            if (e.wheelDelta > 0) {
                // 向上滑
                item.style.top = item.offsetTop - speed + 'px';
                if (item.offsetTop < 0) {
                    item.style.top = 0 + 'px';
                }
            } else {
                // 向下滑
                item.style.top = item.offsetTop + speed + 'px';
                if (item.offsetTop + item.offsetHeight > ele_duration.offsetHeight) {
                    item.style.top = ele_duration.offsetHeight - item.offsetHeight + 'px';
                }
            }
            contentMove(item);

        }
    }
})()