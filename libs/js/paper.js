//upload-download js
$.ajaxSetup({  
    async:false
}); 

function cancel1()
{
    $('#upload').modal('hide');
}
function cancel2()
{
    $('#change').modal('hide');
}

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
    var val7 = document.getElementById("email1").value;
    var val8 = document.getElementById("multipartFile").value;
    var customizedAuthorList = [];
    var Email;
    var Isemail = 0;
    $.get(url+"/personal_user/info?uid="+userid,function(data){
        Email=data.email;
    });
    for(var i=1;i<=authornum;i++)
    {
        customizedAuthorList.push({"authorName":document.getElementById("author"+i).value,"organization":document.getElementById("organ"+i).value,"email":document.getElementById("email"+i).value});
        if(document.getElementById("email"+i).value!=Email)
        {
            Isemail++;
        }
    }
    if(val1=="")
    {
        layer.tips('至少有一个作者！', '#author1', {
            tips: [3, '#000']
        });
    }
    else
    {
        if(val7=="")
        {
            layer.tips('邮箱不能为空！', '#email1', {
                tips: [3, '#000']
            });
        }
        else if(checkemail(val7)==false)
        {
            layer.tips('邮箱格式不合法！', '#email1', {
                tips: [3, '#000']
            });
        }
        else if(Isemail==authornum)
        {
            layer.tips('用户必须是作者之一！', '#author'+authornum, {
                tips: [3, '#000']
            });
        }
        else if(val3=="")
            {
                layer.tips('稿件题目不能为空！', '#title', {
                    tips: [3, '#000']
                });
            }
            else
            {
                if(val8.length==0)
                {
                    layer.tips('上传稿件不能为空！', '#multipartFile', {
                        tips: [3, '#000']
                    });
                }
                else
                {
                    $.post(url+"/paper/author?userId="+userid+"&meetingId="+meetingid,{"customizedAuthorList":JSON.stringify(customizedAuthorList)},function(data){
                        document.getElementById("infile").action=url+"/paper/submission?paperId="+data;
                        $("#infile").ajaxForm(function(){
                            layer.msg('提交成功！3秒后刷新页面...', {
                                icon: 16,
                                shade: 0.01,
                                skin: 'layui-layer-setmybg'
                            });
                            setTimeout(function(){
                                location.reload();
                            }, 3000);
                        });
                    });
                }
            }
    }
}
function Change()
{
    var val3 = document.getElementById("retitle").value;
    var val4 = document.getElementById("repaperAbstract").value;
    var val8 = document.getElementById("remultipartFile").value;
        if(val3=="")
        {
            layer.tips('稿件题目不能为空！', '#title', {
                tips: [3, '#000']
            });
        }
        else
        {
            if(val8.length==0)
            {
                layer.tips('上传稿件不能为空！', '#multipartFile', {
                    tips: [3, '#000']
                });
            }
            else
            {
                document.getElementById("refile").action=url+"/paper/update?paperId="+PId;
                $("#refile").ajaxForm(function(){
                    layer.msg('修改重投成功！3秒后刷新页面...', {
                        icon: 16,
                        shade: 0.01,
                        skin: 'layui-layer-setmybg'
                    });
                    setTimeout(function(){
                        loaction.reload();
                    }, 3000);
                });
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
        "<input class='form-control' style='width:35%; float:left; margin-left:2%' type='text' placeholder='请输入单位名称' id='organ"+authornum+"' name='organ"+authornum+"' autofocus maxlength='20'/>"+
        "<input class='form-control' style='width:30%; float:left; margin-left:2%' type='text' placeholder='请输入邮箱' id='email"+authornum+"' name='email"+authornum+"' autofocus maxlength='30'/>"+
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

function userpaperShow()
{
    $("#usertable").append("<caption style='text-align:center;'><h2>投稿录用情况</h2></caption><thead><tr style='height:30px'><td style='width:30px'>论文编号</td><td style='width:100px'>题目</td><td style='width:300px'>摘要</td><td style='width:100px'>作者</td><td style='width:100px'>单位</td><td style='width:100px'>状态</td><td style='width:100px'>可能操作</td></tr></thead><tbody>");
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
            else if(data[i].status==4)
            {
                t="未录用";
            }
            else if(data[i].status==5)
            {
                t="待修改";
            }
            else if(data[i].status==6)
            {
                t="修改后审核中";
            }
            if(data[i].status==1||data[i].status==2)
            {
                col = "green";
            }
            else if(data[i].status==5)
            {
                col = "#F90";
            }
            else if(data[i].status==3||data[i].status==6)
            {
                col = "gray";
            }
            else
            {
                col = "red";
            }
            $("#usertable").append("<tr><td style='vertical-align:middle;'>"+data[i].number+
                    "</td><td style='vertical-align:middle;'>"+data[i].title+
                    "</td><td style='vertical-align:middle;'>"+data[i].paperAbstract+
                    "</td><td style='vertical-align:middle;'>"+namestring+
                    "</td><td style='vertical-align:middle;'>"+organstring+
                    "</td><td style='vertical-align:middle;'>"+"<font color='"+col+"'>"+t+"</font>"+
                    "</td><td style='vertical-align:middle;'>"+"<button id='reloadbtn"+i+"' type='submit' class='btn btn-info btn-sm' name='submit' onClick='paperChange("+data[i].paperId+")'>修改重投</button>"+
                    "</td></tr>")
            if(data[i].status!=5)
            {
                $("#reloadbtn"+i).attr("style","display:none;");
            }
        }
    });
}
function meetingpaperShow()
{
    $("#meetingtable").append("<caption style='text-align:center;'><h2>投稿审核情况</h2></caption><thead><tr style='height:30px'><td style='width:50px'>论文编号</td><td style='width:100px'>题目</td><td style='width:200px'>摘要</td><td style='width:100px'>作者</td><td style='width:200px'>单位</td><td style='width:200px'>投稿人邮箱</td><td style='width:100px'>下载</td><td style='width:100px'>审核状态</td><td style='width:100px'>操作</td></tr></thead><tbody>");
    $.get(url+"/paper/"+meetingid,function(data){
        for(var i=0;i<data.length;i++)
        {
            var col = "";
            var t = "";
            if(data[i].status==1)
            {
                t="录用";
            }
            else if(data[i].status==2)
            {
                t="修改后录用";
            }
            else if(data[i].status==3)
            {
                t="待审核";
            }
            else if(data[i].status==4)
            {
                t="不录用";
            }
            else if(data[i].status==5)
            {
                t="待修改";
            }
            else if(data[i].status==6)
            {
                t="已修改待审核";
            }
            if(data[i].status==1||data[i].status==2)
            {
                col = "green";
            }
            else if(data[i].status==5)
            {
                col = "#F90";
            }
            else if(data[i].status==3||data[i].status==6)
            {
                col = "gray";
            }
            else
            {
                col = "red";
            }
            var splitArray1 = new Array();
            var splitArray2 = new Array();
            var stringname = data[i].names;
            var stringorgan = data[i].organizations;
            var regex = ",";
            splitArray1 = stringname.split(regex);
            splitArray2 = stringorgan.split(regex);
            var namestring = splitArray1.join("<br />");
            var organstring = splitArray2.join("<br />");
            $("#meetingtable").append("<tr><td style='vertical-align:middle;'>"+data[i].number+
                    "</td><td style='vertical-align:middle;'>"+data[i].title+
                    "</td><td style='vertical-align:middle;'>"+data[i].paperAbstract+
                    "</td><td style='vertical-align:middle;'>"+namestring+
                    "</td><td style='vertical-align:middle;'>"+organstring+
                    "</td><td style='vertical-align:middle;'>"+data[i].email+
                    "</td><td style='vertical-align:middle;'>"+"<button id='downloadbtn"+i+"' class='btn btn-info btn-sm' name='submit'>下载</button>"+
                    "</td><td style='vertical-align:middle;'>"+"<font color='"+col+"'>"+t+"</font>"+
                    "</td><td style='vertical-align:middle;'>"+"<button id='checkbtn"+i+"' class='btn btn-default btn-sm' name='submit' onClick='Check("+data[i].paperId+")'>审核</button>"+
                    "</td></tr>")
            if(data[i].status!=3&&data[i].status!=6)
            {
                $("#checkbtn"+i).attr("style","display:none;");
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
    $('#checkpaper').modal();
    PId=pid;
}
function checkemail(obj)
{
    var result = false;
    if(obj!=""){
        var str = obj;
        if(str.indexOf("@") != -1 && str.indexOf(".") != -1){
            var a = str.split("@");
            if(a[0].length > 0){
                if(a[1].length > 0){
                    var b = a[1].split(".");
                    if(b[0].length > 0){
                        if(b[1].length > 1){
                            result = true;
                        }
                    }
                }
            }
        }
    }
    return result;
}
function sendemail()
{
var advice = document.getElementById("advice").value;
var value=0;
var result = document.getElementsByName("checkresult");
for(var i = 0;i<result.length;i++)
{
    if(result[i].checked==true)
    {
        value = result[i].value;
        break;
    }
}
if(advice=="")
{
    layer.tips('评价不能为空！', '#advice', {
        tips: [3, '#000']
    });
}
$.post(url+"/paper/review?paperId="+PId+"&status="+value,{"mes":advice},function(data){
    layer.msg('审核成功！3秒后刷新页面...', {
        icon: 16,
        shade: 0.01,
        skin: 'layui-layer-setmybg'
    });
    setTimeout(function(){
        location.reload();
    }, 3000);
});
}
//end