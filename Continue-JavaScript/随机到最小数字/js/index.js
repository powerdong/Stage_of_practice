(function () {
    var btn = document.getElementsByClassName('logo')[0];
    var mask = document.getElementsByClassName('mask')[0];
    var closed = document.getElementById('close');
    var button = document.getElementsByTagName('button')[0];
    var numArr = [];
    var ul_Dom = document.getElementsByTagName('ul')[0];
    var mini = null;
    var index = null;
    btn.onclick = function () {
        mask.style.display = 'block';
        closed.onclick = function () {
            mask.style.display = 'none';
        }
    }

    button.onmouseenter = function () {
        this.style.backgroundPosition = '0 ' + (-40) + 'px';
        this.onmouseleave = function () {
            this.style.backgroundPosition = '0 ' + 0 + 'px';
        }
    }
    button.onmousedown = function () {
        this.style.backgroundPosition = '0 ' + (-80) + 'px';
        creatNum();//生成随机数
        this.onmouseup = function () {
            this.style.backgroundPosition = '0 ' + (-40) + 'px';
        }
    }

    function creatNum() {
        var num = Math.floor(Math.random() * 100);
        if(num == mini){
            creatNum();
            return false;
        }
        numArr.push(num);
        // console.log(numArr);
        mini = numArr.mini();//获取数组中最小值
        console.log(mini);
        if(numArr.length>11){
            if(num>mini && index == 0){
                numArr.splice(1,1)
            }else{
                numArr.shift();
            }
        }
        index = numArr.indexOf(mini);
        refurbishDom(numArr,index);//刷新dom

    }

    function refurbishDom(arr,index) {
        var listStr = '';
        ul_Dom.innerHTML = '';
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            listStr += '<li> 扔出一个'+ arr[i]+'</li>';
        }
        ul_Dom.innerHTML = listStr;
        ul_Dom.getElementsByTagName('li')[index].className = 'takeout';
    }

    Array.prototype.mini = function(){
         var mini = this[0];
         for(var i = 0;i<this.length;i++){
             if(mini>this[i]){
                mini = this[i];
             }
         }  
         return mini; 
    }

})()