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
    if($newurl==''){

       $newurl='https://pc.hoozonspa.com'.'/images/defaultpic.gif';
    }else{

       $newurl='https://pc.hoozonspa.com'.$newurl;
    }
return $newurl;
}

function replacebodyurl($body)
{
    $body=preg_replace('/\/uploads\//g', 'https://pc.hoozonspa.com/uploads/', $body);
    return  $body;
}
//获取对应产品列表
function get_list_chanpings($typeid)
{
  global $dsql;
  $relateproject="";
  $imgLeft="";//图片在左
  $imgRight="";//图片在右
  $relatetypeid = 0;
  $index =0;//下标
  $dsql->SetQuery( "SELECT  * FROM #@__archives AS a,#@__addonchanping as b  where a.id =b.aid and  a.typeid='$typeid'  and a.arcrank=0 order by id desc limit 20");
  $dsql->Execute();
  $ns = $dsql->GetTotalRow();
  while($row=$dsql->GetArray())
  {
    $id = $row["id"];
    $title = cn_substr($row["title"],80,0);
    $urlarray = GetOneArchive($id);
    $url = $urlarray['arcurl'];
    $litpic =replaceurl($row['litpic']);
    $pic4 = replaceurl($row['pic4']);//产品图（详情侧边图)
    $des1 = $row['des1'];//规格：
    $des2 = $row['des2'];//产地：
    $des3 = $row['des3'];//功效：
    $des4 = $row['des4'];//适用肌肤：
    $des5 = $row['des5'];//主要成分：
     if($index%2==0){
              $relateproject.='<div class="box box1">
                    <div class="g-left">
                        <a href="" title="'.$title.'"><img src="'.$pic4.'" alt="'.$title.'"></a>
                   </div>
                    <div class="g-right">
                        <h3>'.$index.'</h3>
                       <h4>'.$title.'</h4>
                        <p><span> 规格：</span>'.$des1.'</p>
                       <p><span>产地：</span>'.$des2.'</p>
                        <p><span>功效：</span>'.$des3.'</p>
                        <p><span>适用肌肤：</span>'.$des4.'</p>
                       <p><span>主要成分：</span>'.$des5.'</p>
                    </div>
                </div>';
         }else if($index%2==1){
             $relateproject.='<div class="box box1">
                    <div class="g-right">
                        <h3>'.$index.'</h3>
                       <h4>'.$title.'</h4>
                        <p><span> 规格：</span>'.$des1.'</p>
                       <p><span>产地：</span>'.$des2.'</p>
                        <p><span>功效：</span>'.$des3.'</p>
                        <p><span>适用肌肤：</span>'.$des4.'</p>
                       <p><span>主要成分：</span>'.$des5.'</p>
                    </div>
                   </div>
                 <div class="g-left">
                        <a href="" title="'.$title.'"><img src="'.$pic4.'" alt="'.$title.'"></a>
                   </div>';
         }
  }
  if($ns>0){
    // for循环开始
    // for($index=1;$index<=$ns;$index++){

    //      if($index%2==0){
    //           $relateproject.='<div class="box box1">'+
    //                 '<div class="g-left">'+
    //                    ' <a href="" title="'.$title.'"><img src="'.$pic4.'" alt="'.$title.'"></a>'+
    //                '</div>'+
    //                 '<div class="g-right">'+
    //                    ' <h3>'.$index.'</h3>'+
    //                    '<h4>'.$title.'</h4>'+
    //                     '<p><span> 规格：</span>'.$des1.'</p>'+
    //                    ' <p><span>产地：</span>'.$des2.'</p>'+
    //                     '<p><span>功效：</span>'.$des3.'</p>'+
    //                     '<p><span>适用肌肤：</span>'.$des4.'</p>'+
    //                    '<p><span>主要成分：</span>'.$des5.'</p>'+
    //                 '</div>'+
    //            ' </div>';
    //      }else if($index%2==1){
    //          $relateproject.='<div class="box box1">'+
    //                 '<div class="g-right">'+
    //                    ' <h3>'.$index.'</h3>'+
    //                    '<h4>'.$title.'</h4>'+
    //                     '<p><span> 规格：</span>'.$des1.'</p>'+
    //                    ' <p><span>产地：</span>'.$des2.'</p>'+
    //                     '<p><span>功效：</span>'.$des3.'</p>'+
    //                     '<p><span>适用肌肤：</span>'.$des4.'</p>'+
    //                    '<p><span>主要成分：</span>'.$des5.'</p>'+
    //                 '</div>'+
    //               ' </div>'+
    //              '<div class="g-left">'+
    //                    ' <a href="" title="'.$title.'"><img src="'.$pic4.'" alt="'.$title.'"></a>'+
    //                '</div>';
    //      }
    // }
    // for循环结束
  }
    return $relateproject;
}
