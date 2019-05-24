$(function () {
    // 提交留言
    $('#submit').click(function () {
        // 昵称   内容
        var _name = $('#exampleFormControlInput1').val(),
            _msg = $('#exampleFormControlTextarea1').val();

        localStorage.setItem(_name, _msg);
        showList();

    })

    showList();

    function showList() {
        var str = "";
        for (let i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            str += `<li class="list-group-item">昵称：${key}内容:${value}</li>`
        }
        $('.list-group').html(str);
    }
    $('#del').click(function () {
        localStorage.clear();
        showList();
    })

    $('#showAll').click(function () {
        var name =  $('#exampleFormControlInput1').val();
        
        $('.list-group').html(localStorage.getItem(name));

    })


})