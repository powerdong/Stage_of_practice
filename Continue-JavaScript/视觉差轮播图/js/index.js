var lis=document.querySelectorAll('.nav li'),
	active=document.querySelector('.active'),
	h2s=document.querySelectorAll('.text h2'),
	ps=document.querySelectorAll('.text p'),
	as=document.querySelectorAll('.text a'),
	imgs=document.querySelectorAll('.img img');

var ln=0;	//上一个运动对象的索引

var bg = ['#191919', '#0d0d0d', '#391b1b', '#1b373a', '#1c391b', '#1b2638', '#361b3a', '#1a3929'];


for(let i=0;i<lis.length;i++){
	lis[i].onclick=function(){
		active.style.left=this.offsetLeft+'px';
		document.body.style.background=bg[i];

		//点击的时候先让三行文字往下走
		h2s[ln].className=ps[ln].className=as[ln].className='toBottom';

		//让当前的文字先走到上面
		h2s[i].className=ps[i].className=as[i].className='toTop';

		//再让当前的文字走到中间，走到中间的时候需要有一个延迟
		setTimeout(function(){
			h2s[i].className=ps[i].className=as[i].className='toCenter';
			ln=i;	//当前的走完了，需要把ln的值更新一下，为了下次的时候能继续往下走
		},400);


		//点击的时候先让上一个图片往左边走
		imgs[ln].className='toLeft';

		//让当前的图片先走到右边
		imgs[i].className='toRight';

		//再让当前的图片走到中间，走到中间的时候需要有一个延迟
		setTimeout(function(){
			imgs[i].className='toCenter';
		},400);
		

	};
}
