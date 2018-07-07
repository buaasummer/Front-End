var url="http://154.8.211.55:8081";
var pagecount=0;
var lastpage=-1;
var institutionid;



window.onload = function(){
    $('#topnav').load('./topnav-mat.txt',function(){
        var a=checkName();
        $("#uname").append(a);
        let userType = getCookie('type');
        let userid = getCookie('userId');
        if(userType == "user_option")
        {
            $('#institutionIn').attr('style','display:none');
            $('#instutionadd').attr('style','display:none');
        }
        else if(userType == "institution_option")
        {
            $('#institutionIn a').attr('href','institution-main.html?ins='+userid+'&page=0&size=9');
        
        }
        else
        {
            $('#institutionIn').attr('style','display:none');
            $('#instutionadd').attr('style','display:none');

        }
    });
    pagecount=0;
    institutionid = location.search.split('=')[1].split('&')[0];
    if(institutionid=="")
    {
        window.location = 'http://www.baidu.com';
    }
    let cl = $('#conference-list');
    cl.empty();
    doget();
    $.get('http://154.8.211.55:8081/institution/info?institution_id='+institutionid,function(data){
        if(data.logo==null || data.logo=="")
        {
            $('#touxiang').attr('src','../libs/img/logo.png');
        }
        else{
            $('#touxiang').attr('src',data.logo);
        }
        $('#iname').html('&nbsp;'+data.institutionName);
        if(data.description==null)
            $('#ibrief').text('这个机构暂时没有简介');
        else
            $('#ibrief').text(data.description);
    })
    $('#touxiangform').attr('action',url+'/institution/set_logo/'+institutionid);
    $('#briefform').attr('action',url+'/institution/set_description/'+institutionid);
}

function changebrief(){
    alert('a');
    $('#briefform').submit();
}



function changetouxinag(){
    $('#touxiangform').submit();
    setTimeout(function(){},3000);
    location.reload();
}

function prevpage(){
    if(pagecount!=0)
    {
        let cl = $('#conference-list');
        cl.empty();
        pagecount--;
        lastpage=-1;
        doget();
    }
}

function nextpage(){
    let cl = $('#conference-list');
    cl.empty();
    if(lastpage==-1)
        pagecount++;
    doget();
}

function doget(){
    $.get('http://154.8.211.55:8081/institution/meetings?institution_id='+institutionid+'&page='+pagecount+'&size=9',function(data){
        let length = data.length;
        let cl = $('#conference-list');
        if(length==0)
        {    
            lastpage=pagecount;
        }
        for(let x=0;x<length;x++)
        {
            cl.append(
            `<div class="col-sm-4">
                <div class="card" style='margin-top:20px'>
                <div class='card-header bg-info' style='height:130px'>
                    <h4 class="card-title"><a style='color:#333' href='conference-main.html?meetingid=${data[x].meetingId}#general'>${data[x].title}</a></h4>
                </div>
                    <div class="card-body bg-light">
                        
                        <p class="card-text">
                            <span>
                                <img src="../libs/img/calendar.png" alt="time" style="width:16px;height:16px;">
                                <span>${data[x].startDate}</span>
                            </span><br>
                            <span>
                                <img src="../libs/img/sit.png" alt="place" style="width:16px;height:16px;">
                                <span>${data[x].address}</span>
                            </span>
                            <p>
                                ${data[x].institution.institutionName}
                            </p>
                        </p>
                        <p class='buttons'>
                            <a href="modifymeetings.html?meetingid=${data[x].meetingId}" class="btn pmd-btn-fab pmd-btn-raised btn-success" title="修改会议信息">
                                <i class="material-icons pmd-xs">
                                    <img src="../libs/img/pen.png" alt="Modify">
                                </i>
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="conference-main.html?meetingid=${data[x].meetingId}#registerpeople" class="btn pmd-btn-fab pmd-btn-raised btn-primary" title="审核注册人员">
                                <i class="material-icons pmd-sm">
                                    <img src="../libs/img/addpeople.png" alt="Modify">
                                </i>
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="conference-main.html?meetingid=${data[x].meetingId}#postPaper" class="btn pmd-btn-fab pmd-btn-raised btn-warning" title="审核论文">
                                <i class="material-icons pmd-sm">
                                    <img src="../libs/img/addpaper.png" alt="Modify">
                                </i>
                            </a>
                        </p>
                    </div>
                </div>
            </div>`
            );
        }
        let userType =getCookie('type');
        let userid = getCookie('userId');
        if(userType=="" || userType=="user_option")
        {
            $('.buttons').hide();
            $('#ibrief').attr('disabled','disabled');
            $('#ibrief').attr('style','color:black;');
            $('#touxiangbtn').attr('disabled','disabled');
        }
        else{
            if(userid!=institutionid)
            {
                $('.buttons').hide();
                $('#ibrief').attr('disabled','disabled');
                $('#ibrief').attr('style','color:black;');
                $('#touxiangbtn').attr('disabled','disabled');
            }
        }
    });
    
}

