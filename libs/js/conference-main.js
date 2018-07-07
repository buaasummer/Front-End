var url="http://154.8.211.55:8081";
var meetingid = -1;
var userType;
var userid;
var authornum=1;
var reauthornum=1;
var PId;

$.ajaxSetup({  
    async:false
}); 

window.onload=function()
{
    $('#leftnav').load('./leftnav.txt',function(){
        $('#topnav').load('./topnav.txt',function(){
            $('#maincontent').load('./maincontent.txt',function(){
            var a=checkName();
            $("#uname").append(a);
            doooget();	
            $.ajaxSetup({  
                async:false
            }); 
            userType=getCookie('type');
            userid = getCookie('userId');
            if(userType == "user_option")
            {
                $('#institutionIn').attr('style','display:none');
                userpaperShow();
            }
            else if(userType == "institution_option")
            {
                $('#institutionIn a').attr('href','institution-main.html?ins='+userid+'&page=0&size=9');
                $("#uploadbtn").attr("style","display:none;");
                $.get(url+"/meeting/isMatch?meetingId="+meetingid+"&institutionId="+userid,function(data){
                    if(data==true)
                    {
                        meetingpaperShow();
                    }
                });
            }
            else
            {
                $('#institutionIn').attr('style','display:none');
                $("#uploadbtn").attr("style","display:none;");
                $('#postPaperH4').attr('style','display:none');
            }
        })
    })
})              
}

function doooget(){
    meetingid = location.search.split('=')[1];
    $.get(url+'/meeting/info?meeting_id='+meetingid, function(data){
        $('#general-show h1').text(data.title);
        $('#general-show p').text(data.introduction);
        $('#essay_description').text(data.paperInfo);
        var startdate = data.startDate;
        var poststartdate = data.postStartDate;
        var postenddate = data.postEndDate;
        var informdate = data.informDate;
        var registstartdate=data.registStartDate;
        var registrationdeadline = data.registrationDeadline;
        var enddate = data.endDate;
        if(startdate!=null)
            $('#important_table').append('<tr><td>会议开始时间</td><td>'+startdate+'</td></tr>');
        else
            $('#important_table').append('<tr><td>会议开始时间</td><td>未定</td></tr>');
        if(poststartdate!=null)
            $('#important_table').append('<tr><td>投稿开始日期</td><td>'+poststartdate+'</td></tr>');
        else
            $('#important_table').append('<tr><td>投稿开始日期</td><td>未定</td></tr>');
        if(postenddate!=null)
            $('#important_table').append('<tr><td>投稿结束日期</td><td>'+postenddate+'</td></tr>');
        else
            $('#important_table').append('<tr><td>投稿结束日期</td><td>未定</td></tr>');
        if(informdate!=null)
            $('#important_table').append('<tr><td>公示投稿结果日期</td><td>'+data.informDate+'</td></tr>');
        else
            $('#important_table').append('<tr><td>公示投稿结果日期</td><td>未定</td></tr>');
        if(registstartdate!=null)
            $('#important_table').append('<tr><td>注册开始日期</td><td>'+data.registStartDate+'</td></tr>');
        else
            $('#important_table').append('<tr><td>注册开始日期</td><td>未定</td></tr>');
        if(registrationdeadline!=null)
            $('#important_table').append('<tr><td>注册截止日期</td><td>'+data.registrationDeadline+'</td></tr>');
        else
            $('#important_table').append('<tr><td>注册截止日期</td><td>未定</td></tr>');
        if(enddate!=null)
            $('#important_table').append('<tr><td>会议结束日期</td><td>'+data.endDate+'</td></tr>')
        else
            $('#important_table').append('<tr><td>会议结束日期</td><td>未定</td></tr>');
        $('#schedule_table').append('<tr><td>'+data.schedule+'</td></tr>');

        //暂时只返回了一个机构的信息，ins是一个对象而不是数组，后面可以改成数组
        var ins = data.institution;
        if(ins!=null && ins!=undefined)
        {
            var inn=document.createElement('div');
            $(inn).append('<h3>'+ins.institutionName+'</h3>')
            $(inn).append('<h4>组织编码: '+'&nbsp;&nbsp;&nbsp;'+ins.organizationCode+'</h3>')
            $(inn).append('<h4>法人信息: '+'&nbsp;&nbsp;&nbsp;'+ins.legalPersonName+'&nbsp;&nbsp;&nbsp;'+ins.legalPersonEmail+'&nbsp;&nbsp;&nbsp;'+ins.legalPersonPhoneNumber+'</h4>')
            $(inn).append('<h4>组织地址: '+'&nbsp;&nbsp;&nbsp;'+ins.postalAddress+'</h3>')
            $('#organization_list').append(inn);

            $('#register-btn').html('&nbsp;&nbsp;Register for the Conference&nbsp;&nbsp;$'+data.registrationFee);
            $('#contact_address').text(data.address);
            $('#contact_name').text(data.contactPerson);
            $('#contact_email').text(data.email);
            $('#contact_phone').text(data.phone);
        }
    });
    
}

