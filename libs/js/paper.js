//upload-download js
function checkIDCard(idcode)
{
    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];
    var code = idcode + "";
    var last = idcode[17]; 
    var seventeen = code.substring(0,17);
    var arr = seventeen.split("");
    var len = arr.length;
    var num = 0;
    for(var i = 0; i < len; i++)
    {
        num = num + arr[i] * weight_factor[i];
    }
    var resisue = num%11;
    var last_no = check_code[resisue];
    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
    var format = idcard_patter.test(idcode);
    return last === last_no&&format?true:false;
}
function documentupload()
{
    $('#upload').modal();
}
function paperChange(pid)
{
    $('#change').modal();
    PId=pid;
}
function upLoad()
{
    var val1 = document.getElementById("author1").value;
    var val2 = document.getElementById("organ1").value;
    var val3 = document.getElementById("title").value;
    var val4 = document.getElementById("paperAbstract").value;		
    var val7 = document.getElementById("authorid1").value;
    var val8 = document.getElementById("multipartFile").value;
    var customizedAuthorList = [];
    var user_authorname;
    $.get(url+"/personal_user/info?uid="+userid,function(data){
        user_authorname=data.username;
    });
    var namenum = 0;
    for(var i=1;i<=authornum;i++)
    {
        if(document.getElementById("author"+i).value!=user_authorname)
        {
            namenum++;
        }
        customizedAuthorList.push({"authorName":document.getElementById("author"+i).value,"identificationNumber":document.getElementById("authorid"+i).value,"organization":document.getElementById("organ"+i).value});
    }
    if(val1=="")
    {
        alert("至少有一个作者！");
    }
    else if(namenum==authornum)
    {
        alert("您必须是作者之一！");
    }
    else
    {
        if(val7=="")
        {
            alert("身份证号不能为空！");
        }
        else
        {
            if(checkIDCard(val7)==false)
            {
                alert("身份证号不合法！");
            }
            else if(val3=="")
            {
                alert("稿件题目不能为空！");
            }
            else
            {
                if(val8.length==0)
                {
                    alert("上传稿件不能为空！");
                }
                else
                {
                    $.post(url+"/paper/author?userId="+userid+"&meetingId="+meetingid,{"customizedAuthorList":JSON.stringify(customizedAuthorList)},function(data){
                        document.getElementById("infile").action=url+"/paper/submission?paperId="+data;
                        $("#infile").ajaxForm(function(){
                            alert("提交成功！");
                            window.location="conference-main.html?meetingid="+meetingid;
                        });
                    });
                }
            }
        }
    }
}
function Change()
{
    var val1 = document.getElementById("reauthor1").value;
    var val2 = document.getElementById("reorgan1").value;
    var val3 = document.getElementById("title").value;
    var val4 = document.getElementById("paperAbstract").value;	
    var val7 = document.getElementById("reauthorid1").value;
    var val8 = document.getElementById("multipartFile").value;
    var customizedAuthorList = [];
    for(var i=1;i<=reauthornum;i++)
    {
        customizedAuthorList.push({"authorName":document.getElementById("reauthor"+i).value,"identificationNumber":document.getElementById("reauthorid"+i).value,"organization":document.getElementById("reorgan"+i).value});
    }
    if(val1=="")
    {
        alert("至少有一个作者！");
    }
    else
    {
        if(val7=="")
        {
            alert("身份证号不能为空！");
        }
        else
        {
            if(checkIDCard(val7)==false)
            {
                alert("身份证号不合法！");
            }
            else if(val3=="")
            {
                alert("稿件题目不能为空！");
            }
            else
            {
                if(val8.length==0)
                {
                    alert("上传稿件不能为空！");
                }
                else
                {
                    $.post(url+"/paper/author?userId="+userid+"&meetingId="+meetingid,{"customizedAuthorList":JSON.stringify(customizedAuthorList)},function(data){
                        document.getElementById("infile").action=url+"/paper/submission?paperId="+data;
                        $("#infile").ajaxForm(function(){
                            alert("提交成功！");
                            window.location="uploaddocument.html";
                        });
                    });
                }
            }
        }
    }
}
function Add()
{
    authornum++;
    $("#subbtn").attr("disabled",false);
    $("#add").append(
        "<div class='form-group' id='add"+authornum+"'>"+
        "<i class='fa fa-user fa-lg'></i>"+
        "<input class='form-control' style='width:15%; float:left;' type='text' placeholder='请输入姓名' id='author"+authornum+"' name='author"+authornum+"' autofocus maxlength='20'/>"+
        "<input class='form-control' style='width:25%; float:left; margin-left:2%' type='text' placeholder='请输入身份证号' id='authorid"+authornum+"' name='authorid"+authornum+"' autofocus maxlength='20'/>"+
        "<input class='form-control' style='width:40%; float:left; margin-left:2%' type='text' placeholder='请输入单位名称' id='organ"+authornum+"' name='organ"+authornum+"' autofocus maxlength='20'/>"+
        "</div>"
    )
}
function Sub()
{
    $("#add"+authornum).remove();
    authornum--;
    if(authornum==1)
    {
        $("#subbtn").attr("disabled",true);
    }
}
function reAdd()
{
    reauthornum++;
    $("#resubbtn").attr("disabled",false);
    $("#readd").append(
        "<div class='form-group' id='readd"+reauthornum+"'>"+
        "<i class='fa fa-user fa-lg'></i>"+
        "<input class='form-control' style='width:15%; float:left;' type='text' placeholder='请输入姓名' id='reauthor"+reauthornum+"' name='reauthor"+reauthornum+"' autofocus maxlength='20'/>"+
        "<input class='form-control' style='width:25%; float:left; margin-left:2%' type='text' placeholder='请输入身份证号' id='reauthorid"+reauthornum+"' name='reauthorid"+reauthornum+"' autofocus maxlength='20'/>"+
        "<input class='form-control' style='width:40%; float:left; margin-left:2%' type='text' placeholder='请输入单位名称' id='reorgan"+reauthornum+"' name='reorgan"+reauthornum+"' autofocus maxlength='20'/>"+
        "</div>"
    )
}
function reSub()
{
    $("#readd"+reauthornum).remove();
    reauthornum--;
    if(reauthornum==1)
    {
        $("#resubbtn").attr("disabled",true);
    }
}
function userpaperShow()
{
    $("#usertable").append("<caption style='text-align:center;'><h2>投稿录用情况</h2></caption><thead><tr style='height:30px'><td style='width:100px'>投稿编号</td><td style='width:200px'>题目</td><td style='width:400px'>摘要</td><td style='width:100px'>作者</td><td style='width:200px'>单位</td><td style='width:100px'>状态</td><td style='width:100px'>可能操作</td></tr></thead><tbody>");
    $.get(url+"/paper/display?userId="+userid+"&meetingId="+meetingid,function(data){
        for(var i=0;i<data.length;i++)
        {
            var splitArray1 = new Array();
            var splitArray2 = new Array();
            var stringname = data[i].names;
            var stringorgan = data[i].organizations;
            var regex = ",";
            splitArray1 = stringname.split(regex);
            splitArray2 = stringorgan.split(regex);
            var namestring = splitArray1.join("<br />");
            var organstring = splitArray2.join("<br />");
            var col = "";
            var t = "";
            if(data[i].status==1)
            {
                t="已录用";
            }
            else if(data[i].status==2)
            {
                t="修改后录用";
            }
            else if(data[i].status==3)
            {
                t="审核中";
            }
            else
            {
                t="未录用";
            }
            if(data[i].status==1)
            {
                col = "green";
            }
            else if(data[i].status==2)
            {
                col = "#F90";
            }
            else if(data[i].status==3)
            {
                col = "gray";
            }
            else
            {
                col = "red";
            }
            $("#usertable").append("<tr><td style='vertical-align:middle;'>"+(i+1)+
                    "</td><td style='vertical-align:middle;'>"+data[i].title+
                    "</td><td style='vertical-align:middle;'>"+data[i].paperAbstract+
                    "</td><td style='vertical-align:middle;'>"+namestring+
                    "</td><td style='vertical-align:middle;'>"+organstring+
                    "</td><td style='vertical-align:middle;'>"+"<font color='"+col+"'>"+t+"</font>"+
                    "</td><td style='vertical-align:middle;'>"+"<button id='reloadbtn"+i+"' type='submit' class='btn btn-info btn-sm' name='submit' onClick='paperChange("+data[i].paperId+")'>修改重投</button>"+
                    "</td></tr>")
            if(data[i].status!=2)
            {
                $("#reloadbtn"+i).attr("style","display:none;");
            }
        }
    }); 
}
function meetingpaperShow()
{
    $("#meetingtable").append("<caption style='text-align:center;'><h2>投稿审核情况</h2></caption><thead><tr style='height:30px'><td style='width:100px'>投稿编号</td><td style='width:200px'>题目</td><td style='width:400px'>摘要</td><td style='width:100px'>作者</td><td style='width:200px'>单位</td><td style='width:100px'>下载</td><td style='width:100px'>审核</td></tr></thead><tbody>");
    $.get(url+"/paper/"+meetingid,function(data){
        for(var i=0;i<data.length;i++)
        {
            var splitArray1 = new Array();
            var splitArray2 = new Array();
            var stringname = data[i].names;
            var stringorgan = data[i].organizations;
            var regex = ",";
            splitArray1 = stringname.split(regex);
            splitArray2 = stringorgan.split(regex);
            var namestring = splitArray1.join("<br />");
            var organstring = splitArray2.join("<br />");
            $("#meetingtable").append("<tr><td style='vertical-align:middle;'>"+(i+1)+
                    "</td><td style='vertical-align:middle;'>"+data[i].title+
                    "</td><td style='vertical-align:middle;'>"+data[i].paperAbstract+
                    "</td><td style='vertical-align:middle;'>"+namestring+
                    "</td><td style='vertical-align:middle;'>"+organstring+
                    "</td><td style='vertical-align:middle;'>"+"<button id='downloadbtn"+i+"' class='btn btn-info btn-sm' name='submit'>下载</button>"+
                    "</td><td style='vertical-align:middle;'>"+"<button id='checkbtn"+i+"' class='btn btn-success btn-sm' name='submit' onClick='Check("+data[i].paperId+")'>待审核</button>"+
                    "</td></tr>")
            if(data[i].status!=3)
            {
                $("#checkbtn"+i).attr("disabled",true);
                $("#checkbtn"+i).css("background-color","red");
                $("#checkbtn"+i).css("border-color","red");
                document.getElementById("checkbtn"+i).innerHTML = "已审核";
            }
            var downurl = data[i].downloadUrl;
            $("#downloadbtn"+i).click(function(){				
                var $eleForm = $("<form method='get'></form>");
                $eleForm.attr("action",downurl);
                $(document.body).append($eleForm);
                $eleForm.submit();
            });
        }
    }); 
}
function Check(pid)
{
}
//end