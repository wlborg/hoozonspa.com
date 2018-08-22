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
$newurl='//pc.hoozonspa.com'.$newurl;
return $newurl;
}
/**
*  首页项目模块
*  获取纹眉、眼、唇最新6条
*
*/
function getLinetHeBrows4()
{
global $dsql;
$relateproject="";
$relatetypeid = 0;
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a where a.typeid in(154,155,156,157,158,159,160,161,162,163,164,165,166,264) and a.arcrank=0 order by id desc limit 4");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];

$litpic =$row["litpic"];
$relateproject.='<li class="expert"><a href="'.$url.'" target="_blank" rel="nofollow"><span class="thumbnail"><img src="'.$litpic.'" alt="'.$title.'"></span><span class="expertSpan line-limit-length">'.$title.'</span></a></li>';
}
if($ns>0){
$relateproject=$relateproject;
}
return $relateproject;
}
