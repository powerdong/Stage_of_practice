var total = 12,
    liWidth = ($('ul').width() - 24) / 4;


function render() {
    var str = '';
    for (var i = 1; i < total; i++) {
        str += '<li style = "height : '+ liWidth +'px"><img src="./images/' + i + '.jpg" /></li>'
    }
    $(str).appendTo($('.wrapper'));

}

render();

