/*
 * jQuery dashengAD plug-in
 * http://www.dasheng.com/
 *
 * Copyright (c) 2010-2012
 * Author: Dasheng
 *
 * Date: 2010-01-10
 * Revision: 0.01
 */
(function($){
	$.fn.dashengAD=function(setting){
		return this.each(function(){
			
			//分析参数并设定默认值
			var way		="fade";	//显示方式:show|fade|slide|rollh|rollv 默认值:fade
			var speed	="normal";	//显示速度:"fast"|"nomarl"|"slow"|(毫秒数) 默认值:"nomarl
			var loop	=false;		//无缝轮滚:true|false 默认值:false
			var auto	= false;	//自动滚动:true|false 默认值:false
			var delay	=3;			//自滚延时:(秒) 默认值:3
			
			if(!(typeof(setting)=="undefined")){
				if(!(typeof(setting.way)=="undefined")) way=setting.way;
				if(!(typeof(setting.speed)=="undefined")) speed=setting.speed;
				if(!(typeof(setting.loop)=="undefined")) loop=setting.loop;
				if(!(typeof(setting.auto)=="undefined")) auto=setting.auto;
				if(!(typeof(setting.delay)=="undefined")) delay=setting.delay;
			}
			if(auto) loop=true;  //若为自动,则可轮滚
			
			//获取控制按钮(可无)
			var pbtn=$(this).find("#prev_btn");
			var nbtn=$(this).find("#next_btn");
			//若无则创建之(供内部维护,防止页面出错)
			if(nbtn.length<=0) nbtn=$("<div id=next_btn></div>");
			if(pbtn.length<=0) pbtn=$("<div id=prev_btn></div>");
			//获取内容框架(必需)
			var content=$(this).find(".ds_content");
			if(content.length<=0)	return;
			
			//获取其内部标签页(可无)
			var tab=content.children("div").show();
			var count=tab.length;
			var index=0;
			var intervalID=null;
			
			//添加默认样式
			content.parent().css("position","relative");
			content.css("position","absolute");
			pbtn.attr("class","ds_prev_btn_off");
			nbtn.attr("class","ds_next_btn_off");
			
			//默认显示首页
			if(count>0) content.empty().append(tab.eq(index));
			
			//更新按钮样式
			if(count>1){
				if(loop){
					pbtn.attr("class","ds_prev_btn");
					nbtn.attr("class","ds_next_btn");
				}else{
					pbtn.attr("class","ds_prev_btn_off");
					nbtn.attr("class","ds_next_btn");
				}
			}

			//往前点击
			pbtn.click(function(){
				if(loop){
					index--;
					index=(index+count)%count;
					showEffect("prev");
				}else{
					if(index>0)
					{
						index--;
						showEffect("prev");
						
						nbtn.attr("class","ds_next_btn");
						if(index<=0)
							pbtn.attr("class","ds_prev_btn_off");
					}
				}
			});
			
			//往后点击
			nbtn.click(function(){
				if(loop){
					index++;
					index=index%count;
					showEffect("next");
				}else{
					if(index<count-1)
					{
						index++;
						showEffect("next");
						
						pbtn.attr("class","ds_prev_btn");
						if(index>=count-1)
							nbtn.attr("class","ds_next_btn_off");
					}
				}
			});
			
			//添加定时器
			if(auto){
				intervalID=setInterval(function(){
					nbtn.trigger("click");
				},1000*delay);
				
				//鼠标悬浮,清除定时器
				$(this).hover(function(){
					clearInterval(intervalID);
				},function(){
					intervalID=setInterval(function(){
						nbtn.trigger("click");
					},1000*delay);
				});
			}
			
			//切换效果
			function showEffect(direct){
				switch(way){
					case "show"://普通显示
						content.hide(speed,function(){
							content.empty().append(tab.eq(index));
							content.show(speed);
						});
						break;
					case "fade"://淡入淡出
						content.fadeOut(speed,function(){
							content.empty().append(tab.eq(index));
							content.fadeIn(speed);
						});
						break;
					case "slide"://卷帘效果
						content.slideUp(speed,function(){
							content.empty().append(tab.eq(index));
							content.slideDown(speed);
						});
						break;
					case "rollh"://水平滚动
						rollHorizontal(direct);
						break;
					case "rollv"://垂直滚动
						rollVertical(direct);
						break;
				}
			}
			
			var maskdiv=content.clone();
			//水平滚动效果
			function rollHorizontal(direct){
				content.after(maskdiv);
				maskdiv.html(content.html());
				content.empty().append(tab.eq(index));
				var d=(direct=="prev" ? -1 : 1);
				content.css({left:d*content.width(),opacity:0});
				maskdiv.animate({left:(-1)*d*content.width(),opacity:0},{duration:speed});
				content.animate({left:0,opacity:1},{duration:speed});
				maskdiv.remove();
			}
			//垂直滚动效果
			function rollVertical(direct){
				content.after(maskdiv);
				maskdiv.html(content.html());
				content.empty().append(tab.eq(index));
				var d=(direct=="prev" ? -1 : 1);
				content.css({top:d*content.height(),opacity:0});
				maskdiv.css({top:d*content.height(),opacity:0});
				maskdiv.animate({top:(-1)*d*content.height(),opacity:0},{duration:speed});
				content.animate({top:0,opacity:1},{duration:speed});
				maskdiv.remove();
			}
		});
	}
})(jQuery);