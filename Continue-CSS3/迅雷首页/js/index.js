var tabs = document.querySelectorAll('#btn li'),
	tabLine = document.querySelector('#btn span'),
	lis = document.querySelectorAll('#imgWrap li');

var ln = 0;	//上一个选中的索引
var cn = 0;	//当前选中的索引
var timer;	//用来存储定时器

var tabWidth = tabs[0].offsetWidth + 20;	//是因为每一个li都有一个margin

for (let i = 0; i < tabs.length; i++) {
	tabs[i].onmouseover = function () {
		clearInterval(timer);
		timer = null;

		cn = i;	//让cn的值等于当前的索引，才能切换到正确的地方
		tab();
	}
	tabs[i].onmouseout = function () {
		timer = setInterval(autoPlay, 2000);
	}
}

timer = setInterval(autoPlay, 2000);	//开启自动播放

function autoPlay() {	//自动播放
	cn++;
	if (cn == tabs.length) {
		//这个条件成立的时候说明要出错了
		cn = 0;
	}
	tab();
}

function tab() {	//专门用来切换
	tabs[ln].className = '';
	this.className = 'active';


	//tabLine.style.left=tabWidth*i+'px';
	tabLine.style.transform = 'translateX(' + tabWidth * cn + 'px)';

	lis[ln].className = '';
	lis[cn].className = 'active';


	ln = cn;	//当前次用完以后，需要把上一次的索引更新一下，为了下次能够找到上一次的索引

	footer.style.transform='translateY(100px)';	//只要发生切换，就要让底部滚下去
}


//右侧效果
var more = document.querySelector('#more'),
	listWrap = document.querySelector('nav div'),
	navLis = document.querySelectorAll('nav li'),
	circle = document.querySelector('nav span');

more.onmouseover = function () {
	listWrap.style.transform = 'translateX(0)';
};

listWrap.onmouseleave = function () {	/* mouseout事件会冒泡，所以不能用 */
	listWrap.style.transform = 'translateX(162px)';
};

for (let i = 0; i < navLis.length; i++) {
	navLis[i].onmouseover = function () {
		circle.style.display = 'block';
		circle.style.transform = 'translateY(' + this.offsetHeight * i + 'px)';
	};
}

//底部内容
var footer=document.querySelector('.footer');
mScroll(document,function(){
	footer.style.transform='translateY(0)';
},function(){
	footer.style.transform='translateY(100px)';
});

/*
	滚轮事件
	mousewheel			IE/Chrome
		滚动的方向		event.wheelDelta
						上：120（正数）
						下：-120（负数）
	
	DOMMouseScroll		FF(必需要用addEventListener添加)
		滚动的方向		event.detail
						上：-3（负数）
						下：3（正数）
*/

function mScroll(obj, callBackUp, callBackDown) {
	obj.addEventListener('mousewheel', fn, {passive: false});
	obj.addEventListener('DOMMouseScroll', fn);	//FF

	function fn(ev) {
		if (ev.wheelDelta > 0 || ev.detail < 0) {
			callBackUp.call(obj, ev);
		} else {
			callBackDown.call(obj, ev);
		}

		ev.preventDefault();	//阻止浏览器的默认行为
	};
}

mScroll(document,function(){
	console.log('你往上滚了');
},function(){
	console.log('你往下滚了');
});

