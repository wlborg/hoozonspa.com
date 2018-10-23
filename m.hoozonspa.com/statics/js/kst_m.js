$(function(){
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isiOS){
      //if(typeof KS!=='undefined'){
        var timer = null;
        //  检查dom是否执行完成
        function check() {
            var dom = document.getElementById('div7');
            if(dom) {
                 //  执行dom加载完成后的操作,重写快商通
//                      var re_kst="<div id='_ks_ol_inviteWin_fl'><div id='divbg' style='HEIGHT: 11.562rem; WIDTH: 12.8rem; BACKGROUND-IMAGE: url(m.hoozonspa.com/swt/swtbg2.png);background-size: 100% 100%;background-repeat: no-repeat; POSITION: relative' action='frame' name='背景图片' >"+
//"<div id='div1' style='height: 32px; width: 110px; position: absolute; left: 168px; top: 225px; cursor: pointer; line-height: 0px;' name='在线咨询按钮' orig_x='168' orig_y='225' orig_index=''></div>"+
//"<div id='div2' style='height: 23px; width: 23px; position: absolute; left: 272px; top: 0px; cursor: pointer; line-height: 0px;' name='关闭按钮' orig_x='272' orig_y='0' orig_index=''></div>"+
//"<div id='div5' style='HEIGHT: 24px; WIDTH: 80px; POSITION: absolute; LEFT: 30px; TOP: 160px' name='电话回拨' orig_x='30' orig_y='160' orig_index=''><a class='closeSwtBtn' style='HEIGHT: 24px; WIDTH: 80px; DISPLAY: block' href='tel:089866291502'></a></div>"+
//"<div id='div6' style='HEIGHT: 94px; WIDTH: 242px; POSITION: absolute; LEFT: 0px; TOP: 24px' name='链接' orig_x='0' orig_y='24' orig_index=''><a href='https://hztk5.kuaishang.cn/bs/im.htm?cas=56596___868330&amp;fi=65110'  target='_blank' style='width:100%;height:100%;display:block;'></a></div>"+
//"<div id='div7' style='height: 35px; width: 110px; position: absolute; left: 20px; top: 225px; cursor: pointer; line-height: 0px;' name='稍后了解' orig_x='20' orig_y='225' orig_index=''></div></div></div>";
$('#_ks_ol_inviteWin').html("1");
                //  清除定时器
                if(!timer) {
                    clearTimeout(timer);
                }
            } else {
                //  自我调用
                timer = setTimeout(check, 0);
            }
        }
        //  首次执行
        check();
      }
//}

});

