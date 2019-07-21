/**
 * total : 总数据量
 * current : 当前页码，最小为1
 * limit : 页容量，每页显示多少条数据
 * container : 页码容器
 * firstText : 首页显示的文字
 * pervText : 上一页显示的文字
 * nextText : 下一页显示的文字
 * lastText : 尾页显示的文字
 * panelNumber : 分页面板中，数字页码最多有多少个
 */

/**
 * 创建一个页码对象
 * @param {object} options 配置对象
 */
function Pager(options) {
  // 默认配置
  var defaultOptions = {
    total: 111, // 总数据量
    current: 1, // 当前页码
    limit: 10, // 页容量
    container: document.querySelector(".pager"), //页码容器
    firstText: "首页", // 首页文本
    pervText: "上一页", //上一页文本
    nextText: "下一页",
    lastText: "尾页",
    panelNumber: 10, //分页面板中，数字页码最多有多少个
    onPageChange:null //回调函数，页面发生变化时，执行自定义函数
  }
  // 始终把后边传入的对象覆盖前面对象相同的属性
  // 会把第一个对象参数改变 --- 副作用
  // 返回第一个对象  得到最终的配置
  this.options = Object.assign({}, defaultOptions, options)

  this.show(); //直接显示
  this.regisEvent() // 给页面元素设置点击事件
}


/**
 * 根据当前的配置，重新显示页码
 */
Pager.prototype.show = function () {
  // 渲染页面首先容器清空
  this.options.container.innerHTML = "";
  // 创建首页元素
  var disabled = ""; //首页不可点击时的额外样式
  if (this.options.current === 1) {
    // 第一页情况
    disabled = "disabled"
  }
  this.createPagerItem('first ' + disabled, this.options.firstText);
  // 创建上一页
  this.createPagerItem('prev ' + disabled, this.options.pervText);
  // 创建中间的页码
  this.createNumbers();
  // 创建下一页
  disabled = "";
  var pageNumber = this.getPageNumber(); // 总页数
  if (this.options.current === pageNumber) {
    // 当前页码等于最大页码
    disabled = "disabled"
  }
  this.createPagerItem('next ' + disabled, this.options.nextText);
  // 创建尾页
  this.createPagerItem('last ' + disabled, this.options.lastText);
  // 创建页码文本  22 / 100
  var span = document.createElement('span');
  span.className = 'pager-text'
  span.innerHTML = `<i class="current">${this.options.current}</i> 
                    / <i class="total">${pageNumber}</i>`;
  this.options.container.appendChild(span);
}



/**
 * 创建单个页码
 * @param extraClassName 额外的类名
 * content 内容
 */
Pager.prototype.createPagerItem = function (extraClassName, content) {
  // 每个元素需要是a元素
  var a = document.createElement("a");
  // 设置单个元素的特殊类型，通过css设置单独样式
  a.className = "page-item " + extraClassName;
  // 元素显示的内容
  a.innerText = content;
  // 添加元素到页面
  this.options.container.appendChild(a);
  return a;
}

Pager.prototype.createNumbers = function(){
  // 中间要显示的页面最小数据
  var min = this.options.current - Math.floor(this.options.panelNumber / 2 );
  // 控制最小为1
  if(min < 1){
    min = 1;
  }
  // 要显示的最大数字
  var max = min + this.options.panelNumber - 1;
  // 控制最大值为最大页数
  if(max > this.getPageNumber()){
    max = this.getPageNumber();
  }
  // 遍历渲染中间页码元素
  for (var i = min; i<max;i++){
    var cis = "";
    // 当前页码样式
    if(i === this.options.current){
      cis = "active"
    }
    this.createPagerItem("number " + cis,i);
  }
}

/**
 * 根据配置，得到总页数(最大页码)
 * 最大页码 = 总数据量 / 每页显示的数据
 */
Pager.prototype.getPageNumber = function () {
  return Math.ceil(this.options.total / this.options.limit)
}


/**
 * 事件委托，给容器设置点击事件
 */
Pager.prototype.regisEvent = function () {
  // 根据判断不同的类名来设置不同的点击事件
  var self = this;
  this.options.container.addEventListener('click', function (e) {
    // 事件委托
    if (e.target.classList.contains("first")) {
      // 点击元素是否包含类名first
      // 跳转页码
      self.toPage(1);
    } else if (e.target.classList.contains("prev")) {
      // 点击元素是否包含类名prev
      // 跳转到页面的上一页  页码-1
      self.toPage(self.options.current - 1);
    } else if (e.target.classList.contains("next")) {
      // 点击下一页页码增加1
      self.toPage(self.options.current + 1);
    } else if (e.target.classList.contains("last")) {
      // 点击尾页跳转到最后一页
      self.toPage(self.getPageNumber())
    }else if (e.target.classList.contains("number")) {
      // 点击元素是否包含类名number
      // 直接点击数字页面跳转到指定页面
      self.toPage(+e.target.innerText)
    }
  }
  )
}


/**
 * 跳转到指定页码
 * @param page 指定新的页码
 */
Pager.prototype.toPage = function (page) {
  // 跳转页码时要进行判断
  if (page < 1) {
    // 页面最小页码
    page = 1;
  }
  // 已经到了最后了
  var pageNumber = this.getPageNumber();
  if (page > pageNumber) {
    page = pageNumber;
  }
  if (this.options.current === page) {
    // 页码无变化
    return;
  }
  // 将当前页面显示的页码更新
  this.options.current = page;
  // 重新渲染页面
  this.show()
  // 改变页码需要执行的相应的回调函数
  if(this.options.onPageChange){
    this.options.onPageChange();
  }
}







// 通过使用构造函数生成页码
// var pager = new pager();