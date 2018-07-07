

function doPostRegister()
{
    //alert("qqq");
    var val1 = document.getElementById("username").value;
    var val2 = document.getElementById("password1").value;
    var val3 = document.getElementById("repassword").value;
    var val4 = document.getElementById("useremail").value;
    /*var val5 = document.getElementById("idnumber").value;*/
    var user = {
    "username":val1,
    "password":val2,
    "email":val4
    };
           
    user = JSON.stringify(user);
    var settings = {
            type: "POST",
            url:url+"/personal_user",
            data:user,
            error: function(XHR,textStatus,errorThrown) {
                alert("error!");
                alert(errorThrown);
            },
            success: function(data,textStatus) {
                if(data==false)
                {
                    alert("该昵称已被注册！");
                }
                else
                {
                    alert("注册成功！");
                    location.reload(); 
                }
            },
            headers: {
                "Content-Type":"application/json"
            }
            
    };
    

    var isRightForm = true;
    if(val1=="")
    {
        alert("昵称不能为空！");
        isRightForm = false;
    }
    if(val2=="")
    {
        alert("密码不能为空！");
        isRightForm = false;
    }
    if(val2!=val3)
    {
        alert("两次输入密码不相同！");
        isRightForm = false;
    }
    if(val4=="")
    {
        alert("邮箱不能为空！");
        isRightForm = false;
    }
    

    /*判断输入身份证号是否合法 */
    /*简单判断是否为18位数字 */
    /*
    if(val5.length!=18){ 
        isRightForm = false; 
    }
    if(!isNumber(val5)){ 
        isRightForm = false;
    }
    
    var reg1 = /^(\d{15}|\d{18})$/;
    if(!reg1.test(val5)){
        alert("身份证号输入错误！");
        isRightForm = false;
    }*/

    /*判断邮箱是否格式正确 */
    var reg2 = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if(!reg2.test(val4)){
        alert("邮箱格式输入错误！");
        isRightForm = false;
    }

    if(isRightForm){
        $.ajax(settings);
    }
}

function doPostLogin()
		{
			//alert("qqq");
			var val1 = document.getElementById("email_username").value;
            var val2 = document.getElementById("password").value;
            var type = $('#option input:radio:checked').val();
            document.cookie = "type="+type;
            //alert(document.cookie);

            if(type=="user_option"){
                
                $.get(url+"/personal_user?email="+val1+"&password="+val2,function(data)
                {
                    if(data==0)
                    {
                        alert("用户名或密码不正确！");
                    }
                    else
                    {
                        //alert(document.cookie);
                        document.cookie = "userId="+data;
                        alert("登录成功！");
                        location.reload();
                    }
                });	
            }
            else if(type=="institution_option"){

                $.get(url+"/institution/login?username="+val1+"&password="+val2,function(data)
                {
                    if(data==0)
                    {
                        alert("用户名或密码不正确！");
                    }
                    else
                    {
                        document.cookie = "userId="+data;
                        alert("登录成功！");
                        location.reload();
                        //window.location.href="createmeetings.html";
                    }
                });	
            }
		}
function logout() 
{
    setCookie("userId", "", -1);
    setCookie("type","",-1)
    location.reload();
}


function getCookie(c_name)
{
    let c_end;
    if(document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name+"=");
        if(c_start==-1)
            return "";
        else if(c_start!=-1){
            c_start=c_start+c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if(c_end==-1){
                c_end=document.cookie.length;
            }
        }
        return unescape(document.cookie.substring(c_start,c_end));
    }
    return "";
}

function checkName()
{
    var type = getCookie("type");
    var userid = getCookie("userId");
    //alert("userid"+userid+"  type"+type);
    if(userid=="")
    {
        var b="游客";
        return b;
    }
    else if(userid!="")
    {
        if(type=="user_option"){
            document.getElementById("SignIn").href="#";
            document.getElementById("LogIn").onclick=null;
            var c="";
            $.ajaxSettings.async=false;
            //url=url+"/personal_user";
            $.get(url+"/personal_user/info?uid="+userid,function(data,status){
                c=data['username'];
            });
            return c;
        }
        else if(type=="institution_option"){
            document.getElementById("SignIn").href="#";
            document.getElementById("LogIn").onclick=null;
            var c="";
            $.ajaxSettings.async=false;
            //url=url+"/personal_user";
            $.get(url+"/institution/info?institution_id="+userid,function(data,status){
                c=data['institutionName'];
            });
            return c;
        }
        
    }
}

function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function userLogin()
{
    $('#userLogin').modal();
}
function userRegister()
{
    $('#userRegister').modal();
}
function createMeeting()
{
    var userType = getCookie("type");
    var userid = getCookie("userId");
    if(userType=="institution_option"&&userid!=""){
        window.location.href="createmeetings.html";
    }
}
function administration()
        {
            window.location.href="Administration.html";
        }