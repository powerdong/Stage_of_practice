var info = '<div id="info"> <div id="score">0</div><div id="next"><div id="show"></div></div></div>';

var info = document.createElement("div");
info.id = "info";

var scorePanel = document.createElement("div");
scorePanel.id = "score";
scorePanel.innerText = 0;

var nextPanel = document.createElement("div");
nextPanel.id = "next";

var showPanel = document.createElement("div");
showPanel.id = "show";

nextPanel.appendChild(showPanel);
info.appendChild(scorePanel);
info.appendChild(nextPanel);

document.getElementsByTagName("body")[0].appendChild(info);

var tempNext = nextElement;

setInterval(function () {
    if (nextElement && tempNext != nextElement){
        tempNext = nextElement;
        showPanel.innerHTML = "";
        var temp = new nextElement.elementType(0,0,nextElement.nowStatus, nextElement.color);
        temp.show(showPanel);
        scorePanel.innerText = "" + score;
    }
}, 100);

