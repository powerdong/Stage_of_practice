/*
 * @Author: 李浩栋
 * @Begin: 2019-08-27 20:03:52
 * @Update: 2019-08-27 21:26:52
 * @Update log: 更新日志
 */

/**
 * 全局配置
 */
const config = {
  // 定义一个统计打中地鼠数量的变量
  num: 0,
  // 定义一个让地鼠冒出来的定时器
  t: null,
  // 让地鼠缩回去的定时器
  t1: null,
  // 定义一局多久
  time : 60,
  mouse1 : './img/mouse.png',
  mouse2 : './img/mouse2.png',
  mouse3 : './img/mouse3.png',
  mouseDom: document.getElementsByClassName('mouse'),
  mouseLen: document.getElementsByClassName('mouse').length,
  startGame: document.getElementsByClassName('start')[0]
}



// 给地鼠添加点击事件
for (let index = 0; index < config.mouseLen; index++) {
  config.mouseDom[index].onclick = clickMouse
}

// 开始游戏点击事件
config.startGame.onclick = showMouse

/**
 * 开始游戏
 */
function showMouse() {
  const doc = document
  // 游戏重置
  reset()
  // 新游戏开始
  // 获取游戏的难度值
  const level = getById('level').value
  // 第一步需要让地鼠出来(换图片)
  config.t = setInterval(() => {
    // 时间值 减少
    config.time--
    getById('time').innerText = config.time
    // 判断是否归 0
    if (config.time === 0) {
      // 程序停止 => 停止定时器
      clearInterval(config.t)
      clearTimeout(config.t1)
    }
    // 生成一个 0 - 19 的地鼠洞值
    const rad = parseInt(Math.random() * config.mouseLen)
    // 让地鼠冒出来
    doc.getElementsByClassName('mouse')[rad].src = config.mouse2
    // 让地鼠返回去
    config.t1 = setTimeout(() => {
      doc.getElementsByClassName('mouse')[rad].src = config.mouse1
    }, level);
  }, 1000)
}

/**
 * 单击图片
 */
function clickMouse(e) {
  if(e.target.src.indexOf('mouse2') !== -1){
    config.num++
    getById('num').innerText = config.num
    e.target.src = config.mouse3
  }
  
}
/**
 * 游戏重置
 */
function reset() {
  // 时间重置
  config.time = 60
  getById('time').innerText = config.time
  config.num = 0
  getById('num').innerHTML = config.num
  // 定时器的停止
  clearInterval(config.t)
  clearTimeout(config.t1)
}

function getById(id) {
  return document.getElementById(id)
}