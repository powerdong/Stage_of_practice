var oText = document.getElementById('text');
var oBtn = document.getElementById('btn');
var oScreen = document.getElementById('mainScreen');

oBtn.onclick = function(){
    sendMessage();
}

oText.onclick = function(){
    oText.value = "";
}

function sendMessage(){
    if(oText.value.trim() == ''){
        alert("请输入内容...");
    }else{
        // 如果输入内容，动态创建一个元素  span  
        // 并且将内容添加到span中，
        // 然后将span添加到 mainScreen 滚动显示
        var oDan1 = document.createElement('span');
        oDan1.innerText =  oText.value;
        // 随机文字大小
        var oFontSize = parseInt(Math.random() * 16 + 16);
        // 随机颜色     十进制转十六进制
        var oFontColor = '#' + Math.floor(Math.random() *16777215).toString(16);
        // 随机位置高度
        var oMax = oScreen.offsetHeight - oFontSize;;
        var oMin = oScreen.offsetTop;
        var oHeight = Math.floor(Math.random() * ( oMax - oMin) + oMin);
        oDan1.style.color  = oFontColor;
        oDan1.style.height = oFontSize + 'px';
        oDan1.style.fontSize = oFontSize +'px';
        oDan1.style.marginTop = oHeight + 'px';
        // 整体屏幕宽度  起始位置
        var variable = 800;
        var timer = setInterval(function(){
            oDan1.style.marginLeft = variable + 'px';
            if(variable > -oDan1.offsetWidth){
                variable -= 2;
                oScreen.appendChild(oDan1);
            }else{
                clearInterval(timer);
                oDan1.parentNode.removeChild(oDan1);
            }
        },10)

        
    }
}