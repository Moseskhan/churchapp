showmenu();
var isNew = false;
//show new topic area

function shownewtopicarea(){
       $("#topicarea").fadeIn();
     $('#btnaddnewtopic').attr('onclick', 'hidenewtopicarea()');
     $('#btnaddnewtopic').html('<span class="fa fa-plus-circle"></span> Add New <span class="fa fa-chevron-up"></span>');
   }
//hide new topic area
function hidenewtopicarea(){
    $("#topicarea").fadeOut();
     $('#btnaddnewtopic').attr('onclick', 'shownewtopicarea()');
    $('#btnaddnewtopic').html('<span class="fa fa-plus-circle"></span> Add New <span class="fa fa-chevron-down"></span>');
}
//add link functions
function generatedivid()
{
    event.preventDefault();
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function addlink(){
    var divid=generatedivid();
    $("#divlink").append('<div id="'+divid+'" class="alert alert-info alert-dismissible"><a  onClick="removediv(\'' + divid + '\')" class="close" data-dismiss="alert" aria-label="close">&times;</a><div class="form-group" id="mydiv"><input type="text" name="linktitle" placeholder="Title" class="form form-control" required/></div><div class="form-group"><input type="url" name="link" placeholder="URL/Link" class="form form-control" required /></div></div>');
}
function removediv(addlinkdiv){
    $('#'+addlinkdiv).remove();
}
//end add link functions
//begin post of topic form
function gettopicdata(){
    var topic = {
title: "",      
description: "",
churchID: getAmplifyValue("churchID"),
groupID: $("#loadtopicsgroup").val(),
UserID: "0",
links: []
};
    //turns the form data into an object
    //sampling username here*remember to collect after acccounts 
 topic.description=$("#topicmessage").val();
 topic.title=$("#topictitle").val();
    if(getAmplifyValue("user_data")){
        topic.UserID = getAmplifyValue("user_data").userID;
    }
    
 var numberoflinks=$('input[name="linktitle"]').length;
   
    
for(i=0; i<numberoflinks; i++){
    topic.links.push({
        
    
        linkTitle: $('input[name="linktitle"]')[i].value,
        url: $('input[name="link"]')[i].value
    });

}

posttopic(topic);
    
   
}
function posttopic(topicdetails) {
    //showModal();
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
  setajaxheaders();
  $.ajax({
    url: getAmplifyValue("apiUrl")+"/api/topics",
    type: 'POST',
    data: JSON.stringify(topicdetails),
    success: function(topicdata) {
     hidenewtopicarea();
        var btnclass='btn btn-u-xs btn-u rounded-2x';
        var iconsimage="";
    var iconsaudio="";
    var iconsvideo="";
        
     if (topicdata.hasImage==true){
          iconsimage='&nbsp&nbsp&nbsp&nbsp<span class="fa fa-camera spancolor1 "></span>';
     }
    if (topicdata.hasVideo==true){
        iconsvideo='&nbsp&nbsp&nbsp&nbsp<span class="fa fa-video-camera spancolor3"></span>';
    }
    if (topicdata.hasAudio==true){
        iconsaudio='&nbsp&nbsp&nbsp&nbsp<span class="fa fa-microphone spancolor3"></span>';
    }
		if(isNew == true){
			$("#choirtopiclist").html('');
			$("#choirtopiclist").removeClass('alert alert-success');
			isNew = false;
		}
		$("#choirtopiclist").prepend(getTopicHTML(topicdata,topicdata.createdBy,iconsimage,iconsaudio,iconsvideo,btnclass));
        var getcalls=0;
        $.each(imagesurls, function(key, urls){
            getcalls=getcalls+1;
           
             uploadToServer(urls.url, getAmplifyValue("apiUrl")+"/api/file?churchID="+getAmplifyValue("churchID")+"&id="+topicdata.topicID+"&type=img&rel=topic&plat="+getAmplifyValue("deviceplatform"));  
        });
         if(getAmplifyValue("audiourl") !== undefined) { 
    getcalls=getcalls+1;
        
    uploadToServer(getAmplifyValue("audiourl"), getAmplifyValue("apiUrl")+"/api/file?churchID="+getAmplifyValue("churchID")+"&id="+topicdata.topicID+"&type=aud&rel=topic&plat="+getAmplifyValue("deviceplatform"));
  getAmplifyValue("audiourl", null);
}
    if(getAmplifyValue("videourl") !== undefined) { 
    getcalls=getcalls+1;
   uploadToServer(getAmplifyValue("videourl"), getAmplifyValue("apiUrl")+"/api/file?churchID="+getAmplifyValue("churchID")+"&id="+topicdata.topicID+"&type=vid&rel=topic&plat="+getAmplifyValue("deviceplatform"));
        setAmplifyValue("videourl", null);
    }
        
         $("#btnchoir"+topicdata.topicID+"").click(function(){
    setAmplifyValue("choirpostid", topicdata.topicID);
    //alert(amplify.store('choirpostid'));
      window.location="topic-detail.html";
      
    });
         setAmplifyValue("filetransfercall", getcalls);
    $("#posttopicform").trigger("reset");
        $("#imagegallery").html("");
        $("#imagecamera").html("");
        $("#videoplayer").html("");
        $("#audioplayer").html("");
        imagesurls=[];
     //hideModal();  
             
    },
    error: function (error) {
     navigator.notification.alert(JSON.stringify(error));
    }
  });
}
}
//end of post topic
$body = $("body");

$(document).on({
    ajaxStart: function() {showModal() },
     ajaxStop: function() { hideModal() }    
});
$(document).ready(function()
{ 
    setAmplifyValue("filetransfercall",0);
	initializeAppSettingsWithCallBack(function(){
    $("#titletopicspage").html(getAmplifyValue("topic.html"));
    $("#churchname").html(getAmplifyValue('churchtitle'));
    $("#logoimage").attr('src',getAmplifyValue('logourl'));
    if(getAmplifyValue('topic.html-info')!==undefined){
        $("#pagedescription").html(getAmplifyValue('topic.html-info'));
    }
    activateclickedmenu("topichtml");
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
    setajaxheaders();
    
           }
    $('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
});

    //submit form and prevent default action
    $("#posttopicform").submit(function( event ) {
   //validate data here 
        var validate="invalid";
        if($("#topictitle").val() && $("#topicmessage").val() && $("#loadtopicsgroup").val()){ validate="valid"};
     if (validate=="valid"){
         gettopicdata();
     }else{
         if (navigator){
              navigator.notification.alert("Please! check Your Fields",function(){},"Fill All Fields","OK");
             
         }else{
             alert("Fill all fields to continue");
         }
     }
    
    event.preventDefault();
});
   $("#titletopicspage").html(getAmplifyValue("topic.html"));
     $("#churchname").html(getAmplifyValue('churchtitle'));
    $("#logoimage").attr('src',getAmplifyValue('logourl'));
    $("#divGroupStatus").hide();
    $("#lblLoginName").hide();
    //PUT A BIG IF HERE THAT CHECKS WHETHER USER HAS LOGGED IN
 if(getAmplifyValue('isValidEmail') && getAmplifyValue('isValidEmail') === "true" && getAmplifyValue("loggedInEmail") && getAmplifyValue("userID") &&  getAmplifyValue("userID")!="0"){
    loadMessagesForUser(getAmplifyValue("loggedInEmail"));
 }
else
    {
        //user has not been authenticated so lets hide the controls
        ShowHidePageControls(false);
        setPermanentAmplifyValue("referrer","topic.html");
        window.location.href="login.html";
    }

   $("#selecttopictype").change(function() {
       showModal();
       setAmplifyValue("topicsdetailsGroupID", this.value);
       var selectedgroupid=this.value;
       $("#loadtopicsgroup").val(selectedgroupid);
        if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
       setajaxheaders();
       loadMessagesByGroup(this.value,true);
           }
});
    $("#searchtopic").on("keyup", function() {
    var g = $(this).val().toLowerCase();
	var searchCssClass = ".panel";
    $(".row "+searchCssClass+" .panel-title").each(function(key,data) {
        var s = $(this).text().toLowerCase();
        
   
        if (s.indexOf(g)!==-1){
            $(this).closest(searchCssClass).show();
           
            
        }else{
            $(this).closest(searchCssClass).hide();
         
        }
    });
});
	
});
});

function loadMessagesForUser(loggedInEmailAddress)
{
     setajaxheaders();
     var initGroupID = 0;
     var userEmail={emailAddress:loggedInEmailAddress};
     $.ajax({
                url: getAmplifyValue("apiUrl")+"/api/usergroup?s=t",
                type: 'post',
                data: JSON.stringify(userEmail),
                success: function(results){
        //We have reached this this means we don't want the user to enter their email again regardless of
        //what happens
        setPermanentAmplifyValue("user_data", results);
        displayUser();
        
        if(results.groups.length == 0)
            {
                ShowHidePageControls(false);
                  $("#divGroupStatus").show();
                    $("#lblGroupStatus").text("You have not been given access to any groups yet. Please contact your church administrator");
                return;
            }

         ShowHidePageControls(true);
         $.each(results.groups, function( key, groupslist ) {
         
         $("#selecttopictype").append("<option value='"+groupslist.groupID+"'>"+groupslist.title+"</option>");
              $("#loadtopicsgroup").append("<option value='"+groupslist.groupID+"'>"+groupslist.title+"</option>");
    if (key===0){
		if(!getAmplifyValue("topicsdetailsGroupID")){
        setAmplifyValue("topicsdetailsGroupID",groupslist.groupID);
		}
        initGroupID = getAmplifyValue("topicsdetailsGroupID");
        $("#titleparentsermon").html(groupslist.title);
    }
});
        $("#selecttopictype").val(initGroupID);
	    $("#loadtopicsgroup").val(initGroupID);
		loadMessagesByGroup(initGroupID, false); 
         setAmplifyValue("allgroupsdata", results.groups);
                },
                fail:function(error){
                    alert(JSON.stringify(error));
                }
     });
         
}

function ShowHidePageControls(showControl)
{
        $("#content").toggle(showControl); // Hide div
        $("#divNewTopic").toggle(showControl);
}

function displayUser()
{
    if(getAmplifyValue("user_data"))
        {
            var user=getAmplifyValue("user_data");
            $("#lblLoginName").html("Hello - "+user.displayName+" <i class='fa fa-angle-down'></i>");
            $("#lblLoginName").show();
        }
    else
        {
           $("#lblLoginName").hide(); 
        }
}

function loadMessagesByGroup(groupID,onChange)
{
    //Check if the user has admin rights to this group then show the new topic area or not
    var user=getAmplifyValue("user_data");
    //New topic area is hidden by default
    $("#divNewTopic").hide();
    if(!user)
        {
            window.location ="topic.html";
            return;
        }
    else
        {
            var val=search_array(user.groups,"groupID",groupID);
            if(val!= -1){
                //Set the access levels of the user
               if(val.isAdmin === true ){$("#divNewTopic").show();}
            }
        }
    $.getJSON(getAmplifyValue("apiUrl")+"/api/messages?ChurchID="+getAmplifyValue("churchID")+"&GroupID="+groupID, function() {
     
})
  .done(function(choir) {
        if(onChange==true)
            {
     $("#choirtopiclist").html("");

            }
		if(choir.length ==0 ){
			$("#choirtopiclist").html("");
			$("#choirtopiclist").attr("class","alert alert-success");
            $("#choirtopiclist").html("No messages have been created for this group yet.");
			isNew = true;
		}
		else{
			$("#choirtopiclist").removeClass("alert alert-success");
		}
   var count=0;
      
$.each(choir, function(key,choirlist) {
      count=count+1;
  var btnclass='';  
if (count % 2 === 0)
{
  btnclass='btn btn-u-xs btn-u rounded-2x';
}
else
{
  btnclass='btn btn-u-xs btn-u rounded-2x';
}
    var iconsimage="";
    var iconsaudio="";
    var iconsvideo="";
     if (choirlist.hasImage==true){
          iconsimage='&nbsp&nbsp&nbsp&nbsp<span class="fa fa-camera spancolor1 "></span>';
     }
    if (choirlist.hasVideo==true){
        iconsvideo='&nbsp&nbsp&nbsp&nbsp<span class="fa fa-video-camera spancolor3"></span>';
    }
    if (choirlist.hasAudio==true){
        iconsaudio='&nbsp&nbsp&nbsp&nbsp<span class="fa fa-microphone spancolor3"></span>';
    }

		var postedBy = choirlist.createdBy;
		if(postedBy == null)
			postedBy = "Admin";
	
  		$("#choirtopiclist").append(getTopicHTML(choirlist,postedBy,iconsimage,iconsaudio,iconsvideo,btnclass));
    
    });
  $.each( choir, function( key, choirlist ) {
  
     $("#btnchoir"+choirlist.topicID+"").click(function(){
    setAmplifyValue("choirpostid", choirlist.topicID);
    //alert(amplify.store('choirpostid'));
      window.location="topic-detail.html";
      
    }); 
});
       
       
  //hideModal();
  })
  .fail(function() {
    navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
       hideModal();
    //alert( "complete" );
  });
}

function getTopicHTML(choirlist,postedBy,iconsimage,iconsaudio,iconsvideo,btnclass){
	return '<div class="panel panel-u rounded">'
								+'<div class="panel-heading"><h3 class="panel-title"><i class="fa fa-tasks"></i>'+ choirlist.title+'</h3></div>'+
								'<div class="panel-body">'+
									'<div>By: <span class="color-green">'+postedBy+'</span>&nbsp;<strong> '+getMomentTopicDate(choirlist.dateCreated)+'</strong></div>'+
									'<p class="shortTextTwoLines">'+choirlist.description+'</p><div class="pull-left"><p> '+iconsimage+iconsaudio+iconsvideo+'&nbsp&nbsp&nbsp&nbsp <a onClick="share(\'' + choirlist.description.replace(/(\r\n|\n|\r)/gm," ")+ '\',\'' + choirlist.title.replace(/(\r\n|\n|\r)/gm," ") + '\')" ><i class="icon-custom  rounded-x icon-color-blue icon-line icon-share pull-right"></i></a></p></div><div class="pull-right"><button id="btnchoir'+choirlist.topicID+'" class="'+btnclass+'" ><span class="fa fa-arrow-right"></span></button></div'+
								'</div></div>';
}