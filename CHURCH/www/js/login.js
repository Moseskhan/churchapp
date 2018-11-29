showmenu();
$(document).on({
    ajaxStart: function() {showModal() },
    ajaxStop: function() { hideModal() }    
});
$(document).ready(function(){
     $("#logoimage").attr('src',getAmplifyValue('logourl'));
    //We will hide the enter password fields by default
    $("#PasswordEntry").hide();
    $("#divEmailStatus").hide();
    
  }
);
function checkEmail()
{
    if($("#txtEmail").val() === "")
        navigator.notification.alert("Enter valid email");
	else if(!validateEmail($("#txtEmail").val())){
		  navigator.notification.alert("Please enter a valid email");
	}
    else
        {
            //Lets check if this is valid email and that it has been set up. If it's a valid email give user the option to login
            var isValidEmail;
            var userEmail={
                    emailAddress:$("#txtEmail").val()};
            setajaxheaders();
            $.ajax({
                url: getAmplifyValue("apiUrl")+"/api/uservalidate",
                type: 'POST',
                data: JSON.stringify(userEmail),
                success: function(results)
                {
                isValidEmail = results.status;
                if(isValidEmail === "Yes")
                {
                $("#divEmailStatus").hide();
                switch(results.provider.toLowerCase())
                {
                    case "google":
                        loginToGoogle(results.emailAddress, results.userID, results.isAdmin); 
                        break;
                    case "microsoft":
                        alert("Microsoft not support yet.");
                        break;
                     case "facebook":
                        loginToFacebook(results.emailAddress, results.userID, results.isAdmin);
                        break;
                    case "twitter":
                        alert("Twitter not supported yet");
                        break;
                    default:
                        setPermanentAmplifyValue('loggedInEmail',results.emailAddress);
                        setPermanentAmplifyValue('loggedInName',results.name);
                        $("#lblLoggedInName").html("Nice to have you<b> "+results.name +"</b>.Please enter your password to login");
                        //Now here we will give the user the option to put in his password
                        $("#PasswordEntry").show();
                        $("#divPwdStatus").hide();//Only show this when there is an error
                        $("#EmailEntry").hide();// Hide fields for email entry because the user has logged in
                        //$("#divEmailStatus").hide();//Hide the field for email status because email has been verified
                        

                        break;
                }
                }
            else
                {
                    $("#divEmailStatus").show();
                    $("#lblEmailStatus").text("Your email has not been set up yet. Please contact your church administrator");

                }
                },
                error: function(error)
                {
                   alert(JSON.stringify(error)); 
                }
            });                    
        }
}

function loginToGoogle(emailAddress, userID, isAdmin)
{
var azureClient = new WindowsAzure.MobileServiceClient(getAmplifyValue("apiUrl"));
azureClient.login("google").done(function (results){
   //alert("You are now logged in as "+JSON.stringify(results)); 
var url = getAmplifyValue("apiUrl")+"/.auth/me";
var headers = new Headers();
headers.append('X-ZUMO-AUTH', results.mobileServiceAuthenticationToken);
   
fetch(url, { headers: headers })
    .then(function (data) {
    //alert("data object has"+ JSON.stringify(data));
    return data.json();
   })
   .then(function (user) {
      // The user object contains the claims for the authenticated user
      //var obj = JSON.parse(user);
      //alert("user object has"+ JSON.stringify(user));
      //alert("user access token has"+ user[0].access_token);
      //alert("user access expires on has"+ user[0].expires_on);
      //alert("user id token expires on has"+ user[0].id_token);
      //alert("user id token expires on has"+ user[0].user_id);
    if(user[0].user_id.toLowerCase() == emailAddress.toLowerCase()){
        //This is a valid user. Let's check the groups they have access to and store the user object in memory
        //amplify.store('isValidEmail',"true");
        //setPermanentAmplifyValue('isValidEmail',"true");
        //setPermanentAmplifyValue('loggedInEmail',emailAddress.toLocaleLowerCase());
        //setPermanentAmplifyValue('loggedInEmail',emailAddress.toLocaleLowerCase());
        //setPermanentAmplifyValue("userID",userID);
        //setPermanentAmplifyValue("isAdmin",isAdmin);
		storeUserDetails(userID,isAdmin,profilePic,emailAddress);

        reDirectToPage();
    }
    else
        {
            return navigator.notification.alert("Please login with a valid email");
        }
    });
});
}

function loginToFacebook(emailAddress, userID, isAdmin)
{
var azureClient = new WindowsAzure.MobileServiceClient(getAmplifyValue("apiUrl"));

azureClient.login("facebook").done(function (results){
var url = getAmplifyValue("apiUrl")+"/.auth/me";
var headers = new Headers();
headers.append('X-ZUMO-AUTH', results.mobileServiceAuthenticationToken);
fetch(url, { headers: headers })
    .then(function (data) {
    return data.json();
   })
   .then(function (user) {
    if(user[0].user_id.toLowerCase() == emailAddress.toLowerCase()){
        //This is a valid user. Let's check the groups they have access to and store the user object in memory
        //amplify.store('isValidEmail',"true");
        //setPermanentAmplifyValue('isValidEmail',"true");
        //setPermanentAmplifyValue('loggedInEmail',emailAddress.toLocaleLowerCase());
        //setPermanentAmplifyValue('loggedInEmail',emailAddress.toLocaleLowerCase());
        //setPermanentAmplifyValue("userID",userID);
        //setPermanentAmplifyValue("isAdmin",isAdmin);
		var profilePic= "";
		storeUserDetails(userID,isAdmin,profilePic,emailAddress);


        reDirectToPage();
    }
    else
        {
            return navigator.notification.alert("Please login with a valid email");
        }
    });
});
}

function loginToApp()
{
   if($("#txtPassword").val() === "")
       navigator.notification.alert("Enter valid password");
    else
        {
            //Lets check if this is valid email and that it has been set up. If it's a valid email give user the option to login
            var isValidEmail;
            var user={
                    emailAddress:getAmplifyValue('loggedInEmail'),
                    passWord: $("#txtPassword").val()
            };
            setajaxheaders();
            $.ajax({
                url: getAmplifyValue("apiUrl")+"/api/userauth",
                type: 'POST',
                data: JSON.stringify(user),
                success: function(results){
                isValidEmail = results.status;
                if(isValidEmail === "Yes"){
                    //User has logged in successfully
					storeUserDetails(results.userID,results.isAdmin,results.profilePic,results.emailAddress);
                    reDirectToPage();
                }
                else
                    {
                 setPermanentAmplifyValue('isValidEmail',null);
                //Display message that user could not be logged in
                    $("#txtPassword").val("");
                    $("#divPwdStatus").show();
                    $("#lblPwdStatus").text("Incorrect password. Please try again or contact your church administrator!"); 
                    }
                },
                error: function(error){
                  navigator.notification.alert(JSON.stringify(error));
                }
            });
            }
}

function reDirectToPage(){
    if(getAmplifyValue("referrer"))
        window.location.href = getAmplifyValue("referrer");
    else
        window.location.href = "index.html";
}

function storeUserDetails(userID,isAdmin,profilePicture,emailAddress){
	   setPermanentAmplifyValue('isValidEmail',"true");
       setPermanentAmplifyValue("userID",userID);
       setPermanentAmplifyValue("isAdmin",isAdmin);
	   setPermanentAmplifyValue("profilePic",profilePicture);
	   setPermanentAmplifyValue('loggedInEmail',emailAddress);
}