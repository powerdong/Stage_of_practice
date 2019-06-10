window.onload = function(){
    var screenW = document.documentElement.clientWidth;
    var screenH = document.documentElement.clientHeight;

    
    for (var i = 0; i < 200; i++) {
        var span = document.createElement('span');
        document.body.appendChild(span);
        var x = parseInt(Math.random() * screenW);
        var y = parseInt(Math.random() * screenH);
        span.style.top = y + 'px';
        span.style.left = x + 'px';
        

        var scale = Math.random() * 1.5;
        span.style.transform = "scale("+ scale+"," +scale+")";

        var rate = Math.random()*1.5;

        span.style.animationDelay = rate + 's';
    }

}