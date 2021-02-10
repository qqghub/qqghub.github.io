Date.prototype.format = function(fmt)
{
　　var o = {
　　　　"M+" : this.getMonth()+1, //月份
　　　　"d+" : this.getDate(), //日
　　　　"h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小時
　　　　"H+" : this.getHours(), //小時
　　　　"m+" : this.getMinutes(), //分
　　　　"s+" : this.getSeconds(), //秒
　　　　"q+" : Math.floor((this.getMonth()+3)/3), //季度
　　　　"S" : this.getMilliseconds() //毫秒
　　};
　　if(/(y+)/.test(fmt))
　　　　fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
　　for(var k in o)
　　　　if(new RegExp("("+ k +")").test(fmt))
　　fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
　　return fmt;
}

var datanls = function (key, value) {
    var a;
    var hhmm = 
    if (typeof value === 'string') {
        a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
        if (a) {
            var hm = new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6])).format("yyyy-MM-dd HH:mm:ss");
            var hh=hm.getHours();
　          var mm=hm.getMinutes();
             return hh + ":" + mm
        }
    }
    return value;
};

function timezone(){
      var content = document.getElementById("UTCtime");
      var options = { 
      timeZone: "Asia/Taipei", 
      year: 'numeric', month: 'numeric', day: 'numeric', 
      hour: 'numeric', minute: 'numeric', second: 'numeric' 
      };
         var formatter = new Intl.DateTimeFormat([], options);
         var localTime = formatter.format(new Date(content.value));
         document.getElementById("tzok").textContent=localTime.toString();
}   
<!-- 取得現在時間 -->
function gettime(){  
     var d = new Date();
     var h=d.getHours();
　   var m=d.getMinutes();
     document.getElementById("nowt").innerHTML = h +'時:' + m + '分'; 
}

function result()
{
var name = document.getElementById("name");
var xmlhttp;

        if (window.XMLHttpRequest)
          {// code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp=new XMLHttpRequest();
          }
        else
          {// code for IE6, IE5
          xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
          }
        xmlhttp.onreadystatechange=function()
          {
                  if (xmlhttp.readyState==4 && xmlhttp.status==200)      
                  {
                        var result=xmlhttp.responseText;
                        var obj = JSON.parse(result,datanls);//解析json字串為json物件形式
                                                
                        var html = '<table border=1 width=100%>';//
                        
                        for (var i = 0; i < obj.length; i ++ ) {//
                                html  += '<tr>';//
                                for(j=0;j<obj[i].data.length;j++)
                                {                               
                                  html+= '<td>'+obj[i].data[j]+'</td>'; 
                                }
                                html  += '</tr>';            
                        }
                        html+="</table>";
                        
                        document.getElementById("result").innerHTML=html;
                        if(obj.length==1) //只有一筆代表查不到資料
                                alert('查無資料');
                  }

          }
    var url="https://script.google.com/macros/s/AKfycbyi3y8R1B5QhM9NwS_92_0Xu8Boo53qybHI1XB_pgpqLyzv3xZW8ZUs/exec";
        xmlhttp.open("get",url+"?name="+encodeURIComponent(name.value),true);
        xmlhttp.send();
}

