$(document).on({
    ajaxStart: function() {showModal();},
    ajaxStop: function () {hideModal();}
});
function validateNotification(){
    var numberofgroups=$('input[name="groupID"]:checked').length;
    if ($("#message").val().length<20 || numberofgroups<1 || $("#title").val().length<5 ){
        navigator.notification.alert("Please enter a minimum of 20 characters and Select a group",function(){
        
             },"Warning..","OK");
        
        
    }else{
        var notification={
             "notificationTitle": $("#title").val(),
             "notificationText": $("#message").val() ,
             "groupIds":[]
        }
        var numberofgroups=$('input[name="groupID"]:checked').length;
   
for(i=0; i<numberofgroups; i++){
    notification.groupIds.push($('input[name="groupID"]:checked')[i].value);

} 
        //alert(JSON.stringify(notification));
        sendNotification(notification);
    }
}
function sendNotification(notification){
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
   setajaxheaders();
  $.ajax({
      
    url: getAmplifyValue("apiUrl")+"/api/notification",
    type: 'post',
   
    data: JSON.stringify(notification),
    success: function(data) {
          
    $("#status").removeClass("hidden");
    $("#status").attr("class","alert alert-success");
         $("#title").val('');
        $("#message").val('');
        $("#status").html('Your Notification was sent successfully');
             
       
          
        
    

},
    error: function (error) {
     navigator.notification.alert(JSON.stringify(error));
    },
     

           

});
}
}

function loadData(){
    $("#sendbtn").hide();
    $("#notificationdiv").hide();
    
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
    setajaxheaders();
        $.getJSON(getAmplifyValue("apiUrl")+"/api/usergroup", function() {
     
})
  .done(function(usergroup) {
            setAmplifyValue("usergroups", usergroup);
       if(usergroup.emailAddress===null){
           //$("#selectGroupID").append('<option value="0">ALL</option>');
          
          loadNotificationsByGroup(0);
       }else{
            $("#groupsSelectionDiv").removeClass("hidden");
            $("#selectGroupID").append('<option value="0">ALL</option>');
           $.each(usergroup.groups, function(key, groups){
              if(groups.isAdmin==true){
                   $("#groupsdiv").append('<label class="checkbox-inline"><input type="checkbox" name="groupID" value="'+groups.groupID+'">'+groups.title+'</label>');
              }
              
               $("#selectGroupID").append('<option value="'+groups.groupID+'">'+groups.title+'</option>');
           });
           if (usergroup.isAdmin==true){
                $("#groupsdiv").append('<label class="checkbox-inline"><input type="checkbox" name="groupID" value="0">All</label>');
               $("#sendbtn").show();
           }
          
           loadNotificationsByGroup(0);
       }
            
      
      
  })
  .fail(function(error) {
   navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
  });
           
           }
}


$(document).ready(function()
{
    showmenu();
   initializeAppSettingsWithCallBack(function(){    
   $("#churchname").html(getAmplifyValue('churchtitle'));
       $("#logoimage").attr('src',getAmplifyValue('logourl'));
    $("#titlenotificationpage").html(getAmplifyValue("notification.html"));
    loadData();
  $("#selectGroupID").change(function(){
      var groupID=this.value;
      loadNotificationsByGroup(this.value);
        $.each(getAmplifyValue("usergroups").groups, function(key, groups){
           
         if (groupID==groups.groupID) {
           
             if (groups.isAdmin===true){
                 $("#sendbtn").show();
                 //alert(groups.isAdmin);
             }else{
                 $("#sendbtn").hide();
             $("#notificationdiv").hide();
             }
             
            
         }
      });
      if(groupID==0){
          if(getAmplifyValue("usergroups").isAdmin==true){
          $("#sendbtn").show();
      }else{
          $("#sendbtn").hide();
           $("#notificationdiv").hide();
      }
      }
      
     
     
  })
   
});
});
function showSendNotifications(){
    $("#notificationdiv").show();
    
}
function loadNotificationsByGroup(groupID){
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
    $.getJSON(''+getAmplifyValue("apiUrl")+'/api/notification?id='+groupID+'', function() {
     
})
  .done(function(notificationslist) {
          $("#notificationslist").html("");
        $("#notificationslist").removeClass("alert alert-success") ;
        if (notificationslist.length==0){
            $("#notificationslist").attr("class","alert alert-success") ;
            $("#notificationslist").html("There are no notifications available");
        }
          $.each(notificationslist, function(key, notification){
              $("#notificationslist").append('<div class="panel panel-default-dark rounded-2x">'+
              '<div class="panel-heading rounded-2x"><h5 class="panel-title rounded-2x"> '+notification.notificationTitle+' <span class="pull-right">'+notification.dateCreated+'</span> </h5></div>'+
                  '<div class="panel-body">'+
                   '<h5>'+notification.notificationText+'</h5>'+
                  '</div>'+
             ' </div>');
          });
           
               
            })
  .fail(function(error) {
   navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
       hideModal();
    

  });
}
}