var meeting_url="http://154.8.211.55:8081/search/meeting";
var url="http://154.8.211.55:8081";
var cur_page=0;
var keyword="";
var start;
var end;
function movepage(n){
  var u=meeting_url;
  var pre_page;
  $("tbody").empty();
  if(n==0)
  {
    if(cur_page-1>=0)
    {
      pre_page=cur_page;
      cur_page=cur_page-1;
    }
  }
  else if(n==1){
      pre_page=cur_page;
      cur_page=cur_page+1;
  }
  var pre_data;
  if(keyword!="")
  {
    u=u+"?keyword="+keyword;
  }
  if(start!="")
  {
    if(u==meeting_url)
      u=u+"?startdate="+start;
    else
      u=u+"&startdate="+start;
  }
  if(end!="")
  {
    if(u==meeting_url)
      u=u+"?enddate="+end;
    else
      u=u+"&enddate="+end;
  }
  if(flag1==true)
  {
    if(u==meeting_url)
      u=u+"?isonposting=1";
    else
      u=u+"&isonposting=1";
  }
  if(flag2==true)
  {
    if(u==meeting_url)
      u=u+"?isonregist=1";
    else
      u=u+"&isonregist=1";
  }
  $.get(u,{page:cur_page,size:10},function(data)
  {
    if(!data)
    {
      alert("错误");
    }
    else
    {
      if(data.length!=0)
      {
        for(var i=0;i<data.length;i++)
        {
          var v1=data[i].meetingId;
          var v2=data[i].title;
          var v3_1=data[i].postStartDate;
          var v3_2=data[i].postEndDate;
          var v4=data[i].institution//.institutionName;
          if(v4===null)
          {
            v4="未定";
          }
          else{
            v4=data[i].institution.institutionName;
          }
          var v5=data[i].address;
          var v6=data[i].startDate;
          var v7=data[i].endDate;
          var v8_1=data[i].registStartDate;
          var v8_2=data[i].registrationDeadline;
          if(v5==="")
           v5="无";
           $("tbody").append(
             "<tr><th class='list'><div class='list-item'><dl class='dll' style='width: 88%;'><dt><h4><a href='../conference/conference-main.html?meetingId="+v1+"' target='' class='title'>"+v2+"</a></h4></dt><dd class=''><p><span class='calendar-container' style=''><i class='glyphicon glyphicon-calendar'></i><span>会议期间: </span><span id='calendar'> "+v6+" ~ "+v7+"</span></span><span class='place-container' style=''><i class='glyphicon glyphicon-map-marker'></i><span id='place'> "+v5+"</span></span></p></dd><dd><p><span><i class='glyphicon glyphicon-time'></i><span>投稿期间:<span><span> "+v3_1+" ~ "+v3_2+"</span></span></p><div class=''><span class='period_container'><p><i class='glyphicon glyphicon-time'></i><span>注册期间: </span><span id='register_period'>"+v8_1+" ~ "+v8_2+"</span></p></div></dd><dd class='institution'><div class=''><i class='glyphicon glyphicon-home'></i> "+v4+"</div></dd></dl></div></th></tr>"
           );
        }
      }
      else
      {
        cur_page=pre_page;
        $.get(u,{page:cur_page,size:10},function(data)
        {
          if(!data)
          {
            alert("错误");
          }
          else{
            for(var i=0;i<data.length;i++)
            {
              var v1=data[i].meetingId;
              var v2=data[i].title;
              var v3_1=data[i].postStartDate;
              var v3_2=data[i].postEndDate;
              var v4=data[i].institution//.institutionName;
              if(v4===null)
              {
                v4="未定";
              }
              else{
                v4=data[i].institution.institutionName;
              }
              var v5=data[i].address;
              var v6=data[i].startDate;
              var v7=data[i].endDate;
              var v8_1=data[i].registStartDate;
              var v8_2=data[i].registrationDeadline;
              if(v5==="")
               v5="无";
               $("tbody").append(
                 "<tr><th class='list'><div class='list-item'><dl class='dll' style='width: 88%;'><dt><h4><a href='../conference/conference-main.html?meetingId="+v1+"' target='' class='title'>"+v2+"</a></h4></dt><dd class=''><p><span class='calendar-container' style=''><i class='glyphicon glyphicon-calendar'></i><span>会议期间: </span><span id='calendar'> "+v6+" ~ "+v7+"</span></span><span class='place-container' style=''><i class='glyphicon glyphicon-map-marker'></i><span id='place'> "+v5+"</span></span></p></dd><dd><p><span><i class='glyphicon glyphicon-time'></i><span>投稿期间:<span><span> "+v3_1+" ~ "+v3_2+"</span></span></p><div class=''><span class='period_container'><p><i class='glyphicon glyphicon-time'></i><span>注册期间: </span><span id='register_period'>"+v8_1+" ~ "+v8_2+"</span></p></div></dd><dd class='institution'><div class=''><i class='glyphicon glyphicon-home'></i> "+v4+"</div></dd></dl></div></th></tr>"
               );
            }
          }
        });
      }
    }
  });
}
function doSearch(){
    var u=meeting_url;
    //alert(u);
    var maxsize=10;
    keyword=$("#keyword").val();
    start=$("#start").val();
    end=$("#end").val();
    flag1=$("#check1").is(":checked");
    flag2=$("#check2").is(":checked");

    $("tbody").empty();
    if(keyword!="")
    {
      u=u+"?keyword="+keyword;
    }
    if(start!="")
    {
      if(u==meeting_url)
        u=u+"?startdate="+start;
      else
        u=u+"&startdate="+start;
    }
    if(end!="")
    {
      if(u==meeting_url)
        u=u+"?enddate="+end;
      else
        u=u+"&enddate="+end;
    }
    if(flag1==true)
    {
      if(u==meeting_url)
        u=u+"?isonposting=1";
      else
        u=u+"&isonposting=1";
    }
    if(flag2==true)
    {
      if(u==meeting_url)
        u=u+"?isonregist=1";
      else
        u=u+"&isonregist=1";
    }
    if(u!=meeting_url)
    {
      $.get(u,{size:10},function(data){
        if(!data)
        {
          alert("错误");
        }
        else
        {
          for(var i=0;i<data.length;i++)
          {
            var v1=data[i].meetingId;
            var v2=data[i].title;
            var v3_1=data[i].postStartDate;
            var v3_2=data[i].postEndDate;
            var v4=data[i].institution;
            if(v4===null)
            {
              v4="未定";
            }
            else{
              v4=data[i].institution.institutionName;
            }
            var v5=data[i].address;
            var v6=data[i].startDate;
            var v7=data[i].endDate;
            var v8_1=data[i].registStartDate;
            var v8_2=data[i].registrationDeadline;
            if(v3_1===null)
              v3_1="未定";
            if(v3_2===null)
              v3_2="未定";
            if(v6===null)
              v6="未定";
            if(v7===null)
              v7="未定";
            if(v8_1===null)
               v8_1="未定";
            if(v8_2===null)
              v8_2="未定";
            if(v5==="")
              v5="未定";
            $("tbody").append(
                "<tr><th class='list'><div class='list-item'><dl class='dll' style='width: 88%;'><dt><h4><a href='../conference/conference-main.html?meetingId="+v1+"' target='' class='title'>"+v2+"</a></h4></dt><dd class=''><p><span class='calendar-container' style=''><i class='glyphicon glyphicon-calendar'></i><span>会议期间: </span><span id='calendar'> "+v6+" ~ "+v7+"</span></span><span class='place-container' style=''><i class='glyphicon glyphicon-map-marker'></i><span id='place'> "+v5+"</span></span></p></dd><dd><p><span><i class='glyphicon glyphicon-time'></i><span>投稿期间:<span><span> "+v3_1+" ~ "+v3_2+"</span></span></p><div class=''><span class='period_container'><p><i class='glyphicon glyphicon-time'></i><span>注册期间: </span><span id='register_period'>"+v8_1+" ~ "+v8_2+"</span></p></div></dd><dd class='institution'><div class=''><i class='glyphicon glyphicon-home'></i> "+v4+"</div></dd></dl></div></th></tr>"
            );
          }
        }
      });
  }
  else{
    alert("请输入搜索条件");
  }
}
function dosearchh(){
  var u=meeting_url;
  var keyword=$("#keyword2").val();
  window.location.href="../conference/search.html?keyword="+keyword;
}
function checking(n){
  var flag1=$("#check1").is(":checked");
  var flag2=$("#check2").is(":checked");
  if(n==0)
  {
    if(flag2===true){
      $("#check2").prop({checked:false});
    }
  }
  else if(n==1)
  {
    if(flag1==true){
      $("#check1").prop({checked:false});
    }
  }
}
function doClear(){
  $("#keyword").val("");
}
