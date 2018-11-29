

function getsignupdata(){
   var signup={
       "firstName": $("#firstname").val(),
       "lastName": $("#lastname").val(),
       "emailAddress": $("#email").val(),
       "phoneNumber":$("#phonenumber").val(),
       "gender": $("input[name='optgender']").val(),
       "password": $("#password").val(),
       "displayName": $("#displayname").val(),
       "groupsUser":[]
   };
    
    var numberofgroups=$('input[name="groupid"]:checked').length;
   //alert(numberofgroups);
    //alert($("input[name='optgender']").val());
for(i=0; i<numberofgroups; i++){
    signup.groupsUser.push($('input[name="groupid"]:checked')[i].value);

} 
    postsignup(signup);
   
}
function postsignup(signupdata){
     if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
   setajaxheaders();
  $.ajax({
      
    url: getAmplifyValue("apiUrl")+"/api/user",
    type: 'post',
   
    data: JSON.stringify(signupdata),
    success: function(data) {
    
          //alert((imagesurls));
         //$('body').append(JSON.stringify(data)+'<hr><hr><hr>');
        if(data.userID<=0){
            $("#lblstatus").show();
            $("#lblstatus").append(data.message);
        }else{
           $.each(imagesurls, function(key, urls){
           //alert(urls.url);
             uploadToServer(urls.url, getAmplifyValue("apiUrl")+"/api/file?churchID="+getAmplifyValue("churchID")+"&id="+data.userID+"&type=img&rel=user&plat="+getAmplifyValue("deviceplatform"));
               })
            setAmplifyValue("filetransfercall", 1);
             $("#signupform").html('<div class="alert alert-success">Your Account '+data.fullName+' was created Successfully. <br><a href="login.html">Click Here To Login</a></div>');
        }
             
       
          
        
    

},
    error: function (error) {
     alert(JSON.stringify(error));
    },
     

           

});
}

}
$(document).on({
    ajaxStart: function() {showModal() },
     ajaxStop: function() { hideModal() }    
});
             
$(document).ready(function(){
	 initializeAppSettingsWithCallBack(function(){
	if(getReffererPage()=="login.html"){
 	$("#titlechurchname").text("Sign Up");
	}
	else{
		 	$("#titlechurchname").text("Update Profile");
	}
    showmenu();
    getgroups();
   $("#lblstatus").hide();
    if(getAmplifyValue("userID") &&  getAmplifyValue("userID")!="0"){
        
    getuserdata();    
	}
    
    
 $("#logoimage").attr('src',getAmplifyValue('logourl'));
     

});
});
function postupdateprofile(){
    var updatedata={
        firstName: $("#firstname").val(),
        lastName: $("#lastname").val(),
        phoneNumber: $("#phonenumber").val(),
        "displayName": $("#displayname").val(),
        gender: $("input[name='optgender']:checked").val(),
        userID: getAmplifyValue("userID"),
        groupsUser:[]  
    }
     var numberofgroups=$('input[name="groupid"]:checked').length;
  //alert(getAmplifyValue("userID"));
for(i=0; i<numberofgroups; i++){
    updatedata.groupsUser.push($('input[name="groupid"]:checked')[i].value);

} 
   updateuser(updatedata);
}
function updateuser(userdata){
   if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
   setajaxheaders();
  $.ajax({
      
    url: getAmplifyValue("apiUrl")+"/api/user",
    type: 'put',
   
    data: JSON.stringify(userdata),
    success: function(data) {
           $.each(imagesurls, function(key, urls){
           
             uploadToServer(urls.url, getAmplifyValue("apiUrl")+"/api/file?churchID="+getAmplifyValue("churchID")+"&id="+data.userID+"&type=img&rel=user&plat="+getAmplifyValue("deviceplatform"));
               })
            setAmplifyValue("filetransfercall", 1);
             $("#signupform").html('<div class="alert alert-success">'+data.displayName+' - Your account has been updated successfully.</div>');
},
    error: function (error) {
    navigator.notification.alert(JSON.stringify(error));
    },
     

           

}); 
}

}
function updateprofile(){
    if ($("#firstname").val() && $("#lastname").val() && $("#displayname").val() && $("input[name='optgender']:checked").val()){
        postupdateprofile();
    }else{
        navigator.notification.alert("Please! check Your Fields ",function(){},"Fill All Fields","OK");
    }
}
function getuserdata(){
    $("#divpassword").hide();
        $("#divemail").hide();
        $("#divcemail").hide();
        
        $("#btnsubmit").attr("onclick", "updateprofile()");
       
        $("#btnsubmit").html('Update Profile <span class="fa fa-user"></span>');
        
        $("#uploadpicdiv").html("");
    setajaxheaders();
    $.getJSON(getAmplifyValue("apiUrl")+"/api/user/"+getAmplifyValue("userID")+"",function() {
  console.log( "success" );})
    .done(function(userdata) {
        $("#firstname").val(userdata.firstName);
        $("#lastname").val(userdata.lastName);
        $("#displayname").val(userdata.displayName);
        $("#phonenumber").val(userdata.phoneNumber);
		if(userdata.gender!=null && $("#"+userdata.gender)){
		$("#"+userdata.gender).prop("checked","true");
		}
        $("#divimg").append('<div class="panel panel-default-default"><div class="panel-body"><img src="'+userdata.photoUrl+'" class="rounded-2x img-responsive rounded-x"><div class="headline"></div>'+
                '<a class="btn btn-u btn-u-xs rounded-2x" onclick="getPhotoprofile(pictureSource.PHOTOLIBRARY);"><span class="fa fa-camera"></span> Change Profile Photo</a><br><br>'+
                '<div id="imagegallery" class="row">'+
                '</div></div></div>');
        
        $.each(userdata.groupsUser, function(key, groupid){
            $("#"+groupid).prop("checked", true);
            
        });
     })
 .fail(function(error) {
    
    navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
       //hideModal();
    //alert( "complete" );
  });
}
function getgroups(){
    
    setajaxheaders();
    $.getJSON(getAmplifyValue("apiUrl")+"/api/groups?s=t",function() {
  console.log( "success" );})
    .done(function(groups) {
         $.each(groups, function( key, groupslist ) {
        
         $("#groupiddiv").append('<label class="checkbox-inline"><input type="checkbox" value="'+groupslist.groupID+'" name="groupid" id="'+groupslist.groupID+'">'+groupslist.title+'</label>');
              
    
      
   
});
        
     })
 .fail(function(error) {
    
    navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
       //hideModal();
    //alert( "complete" );
  });
}
function submitsignup(){
    
   
    
        if($("#firstname").val() && $("#lastname").val() && $("#email").val() && $("#confirmemail").val() && $("#displayname").val() && $("#password").val() && $("input[name='optgender']:checked").val()){ 
            var password=$("#password").val();
           if($("#email").val()!==$("#confirmemail").val()){
               
                navigator.notification.alert("Oops sorry! The email addresses are not the same",function(){},"Fill All Fields","OK");
           }else if(password.length<6){
             navigator.notification.alert("Oops sorry! Password has to be more than 6 characters",function(){},"Password","OK");  
               
           }else{
               getsignupdata();
           }
                                                                                     
        }
      else
        {
            
            navigator.notification.alert("Please! check Your Fields",function(){},"Fill All Fields","OK");
        }
}
function getReffererPage(){
var a=document.createElement('a');
a.href=document.referrer;
var referrer = a.pathname.replace("/","");
a='';
return referrer;
}