<?php
function litimgurls($imgid=0)
{
    global $lit_imglist,$dsql;
    //获取附加表
    $row = $dsql->GetOne("SELECT c.addtable FROM #@__archives AS a LEFT JOIN #@__channeltype AS c
                                                            ON a.channel=c.id where a.id='$imgid'");
    $addtable = trim($row['addtable']);

    //获取图片附加表imgurls字段内容进行处理
    $row = $dsql->GetOne("Select imgurls From `$addtable` where aid='$imgid'");

    //调用inc_channel_unit.php中ChannelUnit类
    $ChannelUnit = new ChannelUnit(2,$imgid);

    //调用ChannelUnit类中GetlitImgLinks方法处理缩略图
    $lit_imglist = $ChannelUnit->GetlitImgLinks($row['imgurls']);

    //返回结果
    return $lit_imglist;
}

function replaceurl($newurl)
{
$newurl='//www.hoozonspa.com'.$newurl;
return $newurl;
}
/**
*  首页热门项目模块
*  获取纹眉、眼、唇最新6条
*
*/
function getLinetHeBrows4($typeid)
{
global $dsql,$title2;
$relateproject="";
$relatetypeid = 0;
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a,#@__addonproject AS b where a.typeid=b.typeid in(154,155,156,157,158,159,160,161,162,163,164,165,166,264,172,173,167,168,170,171,188,240,241,242,243,244,245,246,234,235,236,237,238,239,227,228,229,230,231,232,233) and a.arcrank=0 order by id desc limit 6");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$title2 =$row["title2"];
$title =$row["title"];
$litpic =$row["litpic"];
 $relateproject.='<div class="swiper-slide slider-item"><a href="'.$url.'"><div class="item"><div class="front"><p>'.$title2.'</p><h3>'.$title.'</h3><div class="line"></div></div><div class="back"><img src="'.$litpic.'" alt="'.$title.'"></div></div></a></div>';

}
if($ns>0){
$relateproject=$relateproject;
}
return $relateproject;
}
/**
*  首页热门项目模块
*  获取光电美肤最新6条
*
*/
function getOptoelectskin4()
{
global $dsql;
$relateproject="";
$relatetypeid = 0;
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a where a.typeid in(133,134,135,136,137,138,139,140,141,142,143,144,146,147,148,149,150,151,152,153,213,214,215,216,217,218,265,266,267,268,269,270,219,220,223,224,225,226) and a.arcrank=0 order by id desc limit 6");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$title2 =$row["title2"];
$title =$row["title"];
$litpic =$row["litpic"];
 $relateproject.='<div class="swiper-slide slider-item"><a href="'.$url.'"><div class="item"><div class="front"><p>'.$title2.'</p><h3>'.$title.'</h3><div class="line"></div></div><div class="back"><img src="'.$litpic.'" alt="'.$title.'"></div></div></a></div>';

}
if($ns>0){
$relateproject=$relateproject;
}
return $relateproject;
}
/**
*  首页热门项目模块
*  获取光电美肤最新6条
*
*/
function getBeautySpa4()
{
global $dsql,$title2;
$relateproject="";
$relatetypeid = 0;
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a where a.typeid in(120,121,122,123,125,126,127,182,183,185,186,256,128,129,130,131,132,187,194,195,196,197,198,199,200,201,202,203,204,257,258,259,210,211,212,261,262,263) and a.arcrank=0 order by id desc limit 6");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$title2 =$row["title2"];
$title =$row["title"];
$litpic =$row["litpic"];
 $relateproject.='<div class="swiper-slide slider-item"><a href="'.$url.'"><div class="item"><div class="front"><p>'.$title2.'</p><h3>'.$title.'</h3><div class="line"></div></div><div class="back"><img src="'.$litpic.'" alt="'.$title.'"></div></div></a></div>';

}
if($ns>0){
$relateproject=$relateproject;
}
return $relateproject;
}
/**
*  首页热门项目模块
*  获取科技瘦身最新6条
*
*/
function Scienti()
{
global $dsql,$title2;
$relateproject="";
$relatetypeid = 0;
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a where a.typeid in(151,152,153,224,225,226) and a.arcrank=0 order by id desc limit 6");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$title2 =$row["title2"];
$title =$row["title"];
$litpic =$row["litpic"];
 $relateproject.='<div class="swiper-slide slider-item"><a href="'.$url.'"><div class="item"><div class="front"><p>'.$title2.'</p><h3>'.$title.'</h3><div class="line"></div></div><div class="back"><img src="'.$litpic.'" alt="'.$title.'"></div></div></a></div>';

}
if($ns>0){
$relateproject=$relateproject;
}
return $relateproject;
}
// 环境详情页
