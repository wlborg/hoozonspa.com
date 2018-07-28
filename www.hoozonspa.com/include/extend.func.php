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
/**
*  首页案例获取最新案例
*  获取全站最新案例前3条
*/
function getAllDateCase3()
{
global $dsql;
$relateproject="";
$relatetypeid = 0;
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a where a.typeid in(26,27,28,29,30,31,32,33,34,35,36) and a.arcrank=0 order by id desc limit 3");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];

$litpic =$row["litpic"];
$relateproject.='<li class="expert"><a href="'.$url.'" target="_blank" rel="nofollow"><span class="thumbnail"><img src="'.$litpic.'" alt="'.$title.'"></span><span class="expertSpan">'.$title.'</span></a></li>';
}
if($ns>0){
$relateproject=$relateproject;
}
return $relateproject;
}
