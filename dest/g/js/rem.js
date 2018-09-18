/** 
 * @desc
 * 移动端适配方案, 可根据设计稿与设计稿针对的目标设备的宽度, 计算并设置html元素font-size
 * 最终编码在使用rem时, 就直接使用设计稿标注/100的数值, 如标注稿为300px, css编码使用3rem
 * 设计稿默认以750px为基准，有特殊项目非750的，可以通过设置全局变量PAGE_DESIGN.width为项目自己的设计稿标准尺寸
 * 设计稿默认normal模式（即不做全屏显示），有需要全屏显示需求的，可以通过设置全局变量PAGE_DESIGN.model = "fullpage"
*/
!function(win, doc) {
    var doc_e = doc.documentElement,//页面根元素，html
    dpr = win.devicePixelRatio || 1;//设备独立像素比，默认是1
	//对外公开设计稿尺寸&模式设置
	win.PAGE_DESIGN = {};
	Object.defineProperty(win.PAGE_DESIGN,"width",{
		configurable:false,
		enumerable:true,
		get:function(){
			return width;
		},
		set:function(value){
			width = value;
			//每次重新设置值时,重置一下rem单位值
			init_fontsize();
		}
	});
	Object.defineProperty(win.PAGE_DESIGN,"model",{
		configurable:false,
		enumerable:true,
		get:function(){
			return model;
		},
		set:function(value){
			model = value;
			//为fullpage模式时,重置一下rem单位值
			value == "fullpage" && init_fontsize();
		}
	});
	/**
	*设置html根元素font-size大小
	*/
    function init_fontsize() {
		var clientWidth = doc_e.clientWidth,
			clientHeight = doc_e.clientHeight,
			rem_val =  ((clientWidth > 640)?640:clientWidth) / (PAGE_DESIGN.width/100);

		doc_e.style.fontSize = rem_val + "px";
		if(PAGE_DESIGN.model == "fullpage"){
			var st = setTimeout(function(){
				clearTimeout(st);
				st = null;
				var offsetHeight = doc_e.offsetHeight;

				if(offsetHeight <= clientHeight){
					return;
				}
				rem_val = rem_val * (1-(offsetHeight - clientHeight)/offsetHeight);
				doc_e.style.fontSize = rem_val + "px";	
			},16);
		}
    }
    if (function e() {
			doc.body ? doc.body.style.fontSize = "16px": doc.addEventListener("DOMContentLoaded", e)
		}(), 
		function(){
			PAGE_DESIGN.model = "normal";//默认为正常模式
			PAGE_DESIGN.width = 750;//默认设计稿的尺寸
		}(), 
		win.addEventListener("resize", init_fontsize), 
		win.addEventListener("pageshow",function(e) {
			win.persisted && init_fontsize()
		}), 
		dpr >= 2) {
			doc.documentElement.setAttribute("dpr",dpr);
    }
} (window, document)