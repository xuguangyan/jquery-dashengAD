# jquery-dashengAD
<br />jQuery AdTab plug-in
<br /><b>大圣广告切换特效--dashengAD v0.01版</b>

<br />第一步、引用JS文件及CSS文件
<br /><link rel="stylesheet" type="text/css" href="css/dashengAD.css" />
<br /><script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
<br /><script type="text/javascript" src="js/jquery.dashengAD.js"></script>

<br />第二步、插入JS代码
<br /><script language="javascript">
<br />$(document).ready(function(){
<br />  $("#ds_box").dashengAD({
<br />    way:	"rollh",//显示方式:show|fade|slide|rollh|rollv 默认值:fade
<br />    speed: "slow",	//显示速度:"fast"|"nomarl"|"slow"|(毫秒数) 默认值:"nomarl"
<br />    loop:true,	//无缝轮滚:true|false 默认值:false
<br />    auto:true,	//自动滚动:true|false 默认值:false
<br />    delay:2	//自滚延时:(秒) 默认值:3
<br />  });
<br />});
<br /></script>
