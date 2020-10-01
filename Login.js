$(document).ready(function(){
    
    var $PasswordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
    var $EmailIdRegEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,10})(\]?)$/;
    

    var TxtUserNameFlag = false,TxtPasswordFlag = false;
    
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace.
    specialKeys.push(9); //Tab.
    specialKeys.push(46); //Delete.
    specialKeys.push(16); //Shift.
    specialKeys.push(20); //Caps Lock.
    specialKeys.push(37); //Right Arrow.
    specialKeys.push(39); //Left Arrow.

    $("#TxtUserName").blur(function(){
        $("#TxtUserNameValidate").empty();
        if ($("#TxtUserName").val() == "") {
            TxtUserNameFlag = false;
            $("#TxtUserNameValidate").html('(*) UserName Required..!!');
        }
        else {
            if (!$("#TxtUserName").val().match($EmailIdRegEx)) {
                $("#TxtUserNameValidate").html('Invalid UserName..!!');
                TxtUserNameFlag = false;
            }
            else {
                TxtUserNameFlag = true;
            }
        }
    });
    $("#TxtPassword").blur(function(){
        $("#TxtPasswordValidate").empty();
        if ($("#TxtPassword").val() == "") {
            $("#TxtPasswordValidate").html("(*) Password Required..!!");
            TxtPasswordFlag = false;
        }
        else {
            if (!$("#TxtPassword").val().match($PasswordRegEx)) {
                TxtPasswordFlag = false;
                $("#TxtPasswordValidate").html('-- Invalid Password..!!<br/><ul style="padding:20px;"><li> Minimum 8 Maximum 12 Character Required.</li><li> Atleast One Uppercase Required.</li><li> Atleast One Lowercase Required.</li><li> Atleast One Numeric Required.</li><li> NO SPECIAL CHARACTERS ALLOWED.</li></ul>');
            }
            else {
                TxtPasswordFlag = true;
            }
        }
    });

    $("#BtnLogin").click(function () {
        if ($("#TxtUserName").val() == "") {
            TxtUserNameFlag = false;
            $("#TxtUserNameValidate").html('(*) UserName Required..!!');
        }
        else {
            if (!$("#TxtUserName").val().match($EmailIdRegEx)) {
                $("#TxtUserNameValidate").html('Invalid UserName..!!');
                TxtUserNameFlag = false;
            }
            else {
                TxtUserNameFlag = true;
            }
        }
        if ($("#TxtPassword").val() == "") {
            $("#TxtPasswordValidate").html("(*) Password Required..!!");
            TxtPasswordFlag = false;
        }
        else {
            if (!$("#TxtPassword").val().match($PasswordRegEx)) {
                TxtPasswordFlag = false;
                $("#TxtPasswordValidate").html('-- Invalid Password..!!<br/><ul style="padding:20px;"><li> Minimum 8 Maximum 12 Character Required.</li><li> Atleast One Uppercase Required.</li><li> Atleast One Lowercase Required.</li><li> Atleast One Numeric Required.</li><li> NO SPECIAL CHARACTERS ALLOWED.</li></ul>');
            }
            else {
                TxtPasswordFlag = true;
            }
        }

        if(TxtUserNameFlag == true && TxtPasswordFlag == true)
        {
            LoginData($("#TxtUserName").val().trim(),$("#TxtPassword").val().trim());
        }
        else
        {
            alert("incorrect.....");
        }
    });
});

const LoginData = (TxtUserName,TxtPassword)=>{
    
    $.ajax({
        url:'/Login_Api',
        type:'post',
        dataTye:"JSON",
        cached:false,
        data:{TxtUserName:TxtUserName,TxtPassword:TxtPassword},
        success:(data)=>{
            console.log(data);
           
            if(data == "Email"){
                alert("Incorrect EmailId or Password...");
            }
            else if(data == "Password"){
                alert("Incorrect EmailId or Password...");
            }
            else{
                window.location.replace(`http://localhost:3000/UserProfile`);
            }
        },
        failure:()=>{
            alert("Sorry for Inconviency...Please Refresh Page");
        }
    });
    return true;
    
}
