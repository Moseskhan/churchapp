var shareMessage="";

function deleteReply(topicdetailid){
    navigator.notification.confirm('Are You Sure You Want To Delete This  Comment?', function(results){
		if (results==1){
            
             if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
   setajaxheaders();
  $.ajax({
      
    url: getAmplifyValue("apiUrl")+"/api/topicsdetail?id="+topicdetailid,
    type: 'DELETE',
    success: function(data) {
       window.location.reload(); 
    },
    error: function () {
      navigator.notification.alert(JSON.stringify(error));
    }
  });
           }
        }
			
   
		}
	, 'Confirm Delete', ['Ok','Cancel']                // defaultText
);
   
}
function playvideo(videourl){
   //alert(videourl); 
   setAmplifyValue('individualsermonvideolink', videourl);
    window.location="viewvideo.html";
}
function playaudio(audiourl){
   setAmplifyValue('individualsermonaudiolink',audiourl);

    window.location="playaudio.html";
}
 function showcommentingarea(){
       $("#commentingarea").fadeIn();
     $('#btnclickcomments').attr('onclick', 'hidecommentarea()');
     $('#btnclickcomments').html('<span class="fa fa-comment"></span> Comments <span class="fa fa-chevron-up"></span>');
   }
function hidecommentarea(){
    $("#commentingarea").fadeOut();
     $('#btnclickcomments').attr('onclick', 'showcommentingarea()');
    $('#btnclickcomments').html('<span class="fa fa-comment"></span> Comments <span class="fa fa-chevron-down"></span>')
}
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
//begin post comments functions
//object to store data


function getcommentdata(){
    if(!getAmplifyValue("userID"))
        {
        setAmplifyValue("referrer","topic-detail.html");
        window.location ="login.html";
        }
    var comment = {
topicID : "",
message: "",
churchID: getAmplifyValue("churchID"),
UserID: getAmplifyValue("userID"),
links: []
};
    //turns the form data into an object
    //sampling username here*remember to collect after acccounts 
    
 comment.message=$("#commenttext").val();
 comment.topicID=getAmplifyValue("choirpostid");
 
 
    var numberoflinks=$('input[name="linktitle"]').length;
   
    
for(i=0; i<numberoflinks; i++){
    comment.links.push({
        linkTitle: $('input[name="linktitle"]')[i].value,
        url: $('input[name="link"]')[i].value
    });

}

 
postcomment(comment);
    
   
}
function postcomment(commentdetails) {
    //showModal();
     if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
   setajaxheaders();
  $.ajax({
      
    url: getAmplifyValue("apiUrl")+"/api/topicsdetail",
    type: 'post',
   
    data: JSON.stringify(commentdetails),
    success: function(data) {
      hidecommentarea();
        var date = new Date().toJSON().slice(0,10);
        var commentlinksid=generatedivid();
      $('#choirreplieslisting').append('<div class="profile-blog blog-border margin-bottom-30 col-xs-12">'+
									'<div class="new-bg-color-light2"><img class="rounded-x pull-left img-responsive topicDetailImg" src="'+data.profilePicUrl+'" alt="">'+
									'<div class="name-location">'+
										'<strong>'+data.userName+'</strong>'+
									'<span><i class="fa fa-map-marker"></i></span><strong>'+getMomentTopicDetailTopDate(data.dateCreated)+
									'</strong></div></div><hr>'+
									'<div class="clearfix margin-bottom-20"></div>'+
									'<p class="text-muted">'+data.message+'</p>'+
									'<hr>'+
									'<ul class="list-inline share-list">'+
										'<li><i class="fa fa-share-alt"></i><a onclick="share(\'' + data.message + '\',\'' + data.title + '\')">Share</a></li>'+
									'</ul>'+
						'<div id="commentlinks'+data.topicDetailID+'"></div>'+
						'<div id="imagefiles'+data.topicDetailID+'" class="row container"></div>'+
						'<div id="otherfiles'+data.topicDetailID+'" class="row container"></div>'+
                                               '</div></div></div>');
    
        var getcalls=0;
        $.each(imagesurls, function(key, urls){
            getcalls=getcalls+1
            uploadToServer(urls.url, getAmplifyValue("apiUrl")+"/api/file?churchID="+getAmplifyValue("churchID")+"&id="+data.topicDetailID+"&type=img&rel=topicdetail&plat="+getAmplifyValue("deviceplatform"));
        });
         if(getAmplifyValue("audiourl") !== undefined) { 
             getcalls=getcalls+1;
                       uploadToServer(getAmplifyValue("audiourl"), getAmplifyValue("apiUrl")+"/api/file?churchID="+getAmplifyValue("churchID")+"&id="+data.topicDetailID+"&type=aud&rel=topicdetail&plat="+getAmplifyValue("deviceplatform"));
             setAmplifyValue("audiourl", null);
}
    if(getAmplifyValue("videourl") !== undefined) { 
        getcalls=getcalls+1;
                  uploadToServer(getAmplifyValue("videourl"), getAmplifyValue("apiUrl")+"/api/file?churchID="+getAmplifyValue("churchID")+"&id="+data.topicDetailID+"&type=vid&rel=topicdetail&plat="+getAmplifyValue("deviceplatform"));
        setAmplifyValue("audiourl", null);
}
        setAmplifyValue("filetransfercall", getcalls);
        $("#formpostcomments").trigger("reset");
         $("#imagegallery").html("");
        $("#imagecamera").html("");
        $("#videoplayer").html("");
        $("#audioplayer").html("");
        
        imagesurls=[];
       //hideModal();
    },
    error: function () {
      navigator.notification.alert(JSON.stringify(error));
    }
  });
           }
}
$(document).on({
    ajaxStart: function() { showModal() },
    ajaxStop: function() { hideModal() }    
});
//end post form functions
$(document).ready(function()
{
   showmenu();
   initializeAppSettingsWithCallBack(function(){
   setAmplifyValue("filetransfercall",0);
             
  setAmplifyValue("shareimagelink",null);
   setAmplifyValue("sharetopiclink",null); 
     $("#churchname").html(getAmplifyValue('churchtitle'));
    $("#logoimage").attr('src',getAmplifyValue('logourl'));
    activateclickedmenu("topichtml");
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
               if(getAmplifyValue('isValidEmail') && getAmplifyValue('isValidEmail') === "true" && getAmplifyValue("loggedInEmail") && getAmplifyValue("userID") &&  getAmplifyValue("userID")!="0"){
                     loadTopicDetails(); 
               }
               else{
                   //UnAuthenticated user. Force them to login.
                    setAmplifyValue("referrer","topic-detail.html");
                    window.location.href="login.html";
               }
               
           }
function loadTopicDetails()
    {
        setajaxheaders();
   $.getJSON(getAmplifyValue("apiUrl")+"/api/messages?ChurchID="+getAmplifyValue("churchID")+"&GroupID="+getAmplifyValue("topicsdetailsGroupID"), function() {
     
})
  .done(function(choir) {
    
   var count=0;
      
$.each(choir, function(key,choirlist) {
      count=count+1;
  var btnclass='';  
if (count % 2 === 0)
{
  btnclass='btn btn-info';
}
else
{
  btnclass='btn btn-success';
}
      
      if (choirlist.topicID===getAmplifyValue("choirpostid")){
          setAmplifyValue("topictitle", choirlist.title);
		  shareMessage=shareMessage+" "+choirlist.description;
		   $("#choirloadonetopic").append('<div class="panel panel-u rounded">'
		+'<div class="panel-heading"><img class="rounded-x pull-left img-responsive topicDetailImg" src="'+choirlist.profilePicUrl+'" alt=""><h3 class="panel-title">&nbsp;<i class="fa fa-comments"></i>'+ choirlist.title+'</h3></div>'+
		 '<div class="panel-body">'+
					'<div>By: <span class="color-green">'+choirlist.createdBy+'</span> &nbsp;<strong> '+getMomentTopicDetailTopDate(choirlist.dateCreated)+'</strong></div>'+
					'<p>'+choirlist.description+'</p>'+
		'<div class="list-group" id="links"></div>'+
         '<div class="pull-right" id="shareDiv"></div><br>'+
		'<div id="imagefiles"></div>'+
         '<div id="otherfiles"></div>'+
		'</div></div>');
		  
		  
		  
		  $("#choirloadonetopic").append('<div id="detailsdv"></div>');
          if (choirlist.links.length>0){
              $('#links').append('<h5><strong><span class="fa fa-share spancolor1"></span> Links</strong></h5>');
              $.each(choirlist.links, function(key,choirlinks) {
                  shareMessage=shareMessage+" "+choirlinks.url;
                 
              $('#links').append('<a class="list-group-item" href="#" onClick="navigatetochoirlink(\'' + choirlinks.url + '\')">'+choirlinks.linkTitle+' <span class="fa fa-external-link-square spancolor1"></span><strong class="choirlinks">'+choirlinks.url+'</strong></a>');
              setAmplifyValue("sharetopiclink", choirlinks.url);
          });
          }
          if (choirlist.files.length>0){
              $("#imagefiles").append('<h5 class="breadcrumb">Media</h5>');
			  
			  
              $.each(choirlist.files, function(key,filelinks) {
                 
               if (filelinks.fileType=="img"){
                    pluginShareOptions.files.push(filelinks.fileUrl);
                    $('#imagefiles').append('<div class="col-xs-6 col-sm-6"><div class="service-block-v7 thumbnails thumbnail-style padding-bottom-0">'
                                      +'<img src="'+filelinks.fileUrl+'" class="img-responsive" onclick="viewimages(\''+filelinks.fileUrl+'\',\''+getAmplifyValue("topictitle")+'\')">'
                                       +''
                                     +'</div></div>');
                   setAmplifyValue("shareimagelink", filelinks.fileUrl);
               }else if (filelinks.fileType=="vid"){
                 setAmplifyValue('individualsermon_title_id',choirlist.title);
                   $('#otherfiles').append('<div class="col-sm-6 col-xs-6"><button class="btn btn-u btn-u-xs" onclick="playvideo(\'' + filelinks.fileUrl + '\')"><span class="fa fa-play-circle"></span> Watch Video</button></div>');
               }else if(filelinks.fileType=="aud"){
                   setAmplifyValue('individualsermon_title_id',choirlist.title);
                   $('#otherfiles').append('<div class="col-xs-6 col-sm-6">'+
                                          '<button class="btn btn-u btn-u-xs" onclick="playaudio(\'' + filelinks.fileUrl + '\')"><span class="fa fa-microphone"></span> Listen Audio</button>'
                                          +'</div>');
               }
             
          });
          }
          shareMessage=shareMessage.replace(/(\r\n|\n|\r)/gm," ");
          
          $("#shareDiv").append('<a onclick="share(\'' + shareMessage + '\',\'' + choirlist.title.replace(/(\r\n|\n|\r)/gm," ") + '\')"><i class="icon-custom  rounded-x icon-color-blue icon-line icon-share pull-right"></i></a>');
           
          if(choirlist.allowComments==true){
              $("#detailsdv").append('<h5 class="breadcrumb">Comments</h5><div class="col-sm-offset-1 col-md-offset-4 col-xs-offset-1 profile profile-body margin-bottom-20" id="choirreplieslisting"></div>');
          }
          
         $.each(choirlist.topicDetails, function(key,choirreplies){
              
			  $('#choirreplieslisting').append(''+
								'<div class="profile-blog blog-border margin-bottom-30 col-xs-12 rounded-2x arrow left">'+
									'<div class="new-bg-color-light2"><img class="rounded-x pull-left img-responsive topicDetailImg" src="'+choirreplies.profilePicUrl+'" alt="">'+
									'<div class="name-location">'+
										'<strong>'+choirreplies.userName+'</strong>'+
									'<span><i class="fa fa-map-marker"></i></span>'+getMomentTopicDetailDate(choirreplies.dateCreated)+
									'</div></div><hr>'+
									'<div class="clearfix margin-bottom-20"></div>'+
									'<p class="text-muted">'+choirreplies.message+'</p>'+
									'<hr>'+
									/*'<ul class="list-inline share-list">'+
										'<li><i class="fa fa-share-alt"></i><a onclick="share(\'' + choirreplies.message + '\',\'' + choirlist.title + '\')">Share</a></li>'+
									'</ul>'+*/
						'<div id="commentlinks'+choirreplies.topicDetailID+'"></div>'+
                        '<div id="deletediv'+choirreplies.topicDetailID+'" class="pull-right"><button class="btn btn-u btn-u-xs rounded-xs" onClick="deleteReply(\'' + choirreplies.topicDetailID + '\')"><span class="fa fa-trash"></span></button></div>'+
						'<div id="imagefiles'+choirreplies.topicDetailID+'" class="row container"></div>'+
						'<div id="otherfiles'+choirreplies.topicDetailID+'" class="row container"></div>'+
                                               '</div></div></div>');
			 if (getAmplifyValue("userID")!=choirreplies.userID || getAmplifyValue("isAdmin")!=true){
                 $('#deletediv'+choirreplies.topicDetailID).hide();
             }
			  
              if (choirreplies.links.length>0){
				  $("#commentlinks"+choirreplies.topicDetailID).append('<br/>');
                  $("#commentlinks"+choirreplies.topicDetailID).append('<div><strong>Links</strong></div>');
                  $.each(choirreplies.links, function(key,replieslinks){
                  $("#commentlinks"+choirreplies.topicDetailID).append('<a href="#" onClick="navigatetochoirlink(\'' + replieslinks.url + '\')"><span class="fa fa-external-link-square spancolor2"></span> ' +replieslinks.linkTitle+'</a><br>');
              });
              }
			 else{
				 $("#commentlinks"+choirreplies.topicDetailID).hide();
			 }
              
             if(choirreplies.files.length > 0){ 
			 $.each(choirreplies.files, function(key,filelinks) {
                  //alert("am a file");
                
               if (filelinks.fileType=="img"){
                   
                    $("#imagefiles"+choirreplies.topicDetailID).append('<div class="col-xs-6 col-sm-6">'
                                      +'<img src="'+filelinks.fileUrl+'" class="img-responsive imgtopicdetails" onclick="viewimages(\''+filelinks.fileUrl+'\',\''+getAmplifyValue("topictitle")+'\')">'
                                       +''
                                     +'</div>');
               }else if (filelinks.fileType=="vid"){
                  setAmplifyValue('individualsermon_title_id',choirlist.title);
                   $("#otherfiles"+choirreplies.topicDetailID).append('<div class="col-sm-6 col-xs-6"><button class="btn btn-u btn-u-xs rounded-xs" onclick="playvideo(\'' + filelinks.fileUrl + '\')"><span class="icon-control-play"></span> Watch Video</button></div>');
               }else if(filelinks.fileType=="aud"){
                   setAmplifyValue('individualsermon_title_id',choirlist.title);
                   $("#otherfiles"+choirreplies.topicDetailID).append('<div class="col-xs-6 col-sm-6">'+
                                          '<button class="btn btn-u btn-u-xs rounded-xs" onclick="playaudio(\'' + filelinks.fileUrl + '\')"><span class="fa fa-microphone"></span> Listen Audio</button>'
                                          +'</div>');
               }
          });
			 }
		else{
			$("#imagefiles"+choirreplies.topicDetailID).hide();
			$("#otherfiles"+choirreplies.topicDetailID).hide(); 
		}
         });
          $("#detailsdv").append('<div class="clearfix">'+
                             '<button class="btn btn-u pull-right" onclick="hidecommentarea()" id="btnclickcomments"><span class="fa fa-comment"></span> Comments <span class="fa fa-chevron-up"></span></button>'+
                                 '</div>'+
                                 '<div id="commentingarea" class="service-block-v8 thumbnails thumbnail-style">'+
                                 '<form id="formpostcomments" action="#"><br/><br/>'+
                                 '<textarea required class="form form-control" placeholder="Post Your Comment" rows="5"  id="commenttext" name="commenttext"></textarea><br/>'+
                                 '<div id="divlink"></div><a class="btn btn-u btn-u-xs" id="addlink" onClick="addlink()" ><span class="fa fa-plus"></span>Add Link</a><br/>'+
                                 '<div class="tabbable-panel margin-top-20 margin-bottom-0"><h5>Add Media</h5>'+
                                  ' <div class="tabbable-line">'+
  '<ul class="nav nav-tabs" role="tablist" >'+
    '<li role="presentation" ><a href="#gallerydiv" aria-controls="profile" role="tab" data-toggle="tab" ><span class="fa fa-camera fa-xs"></span></a></li>'+
    '<li role="presentation" ><a href="#videodiv" aria-controls="messages" role="tab" data-toggle="tab"><span class="fa fa-video-camera fa-xs"></span></a></li>'+
   ' <li role="presentation"><a href="#audiodiv" aria-controls="settings" role="tab" data-toggle="tab"><span class="fa fa-microphone fa-xs"></span></a></li>'+
 ' </ul>'+
  '<div class="tab-content">'+
   ' <div role="tabpanel" class="tab-pane" id="gallerydiv">'+
        '<br>'+
        '<div class="row">'+
        '<div class="col-xs-6 col-md-6">'+
                '<a class="btn btn-u btn-u-xs rounded-2x" onclick="capturePhoto()"><span class="fa fa-camera fa-xs"></span>&nbsp;Take Photo</a>'+
            '</div>'+
        '<div class="col-xs-6 col-md-6">'+
            '<a class="btn btn-u btn-u-xs rounded-2x" onclick="getPhoto(pictureSource.PHOTOLIBRARY);"><span class="fa fa-file-image-o fa-xs"></span>&nbsp;Select Photo</a>'+
            '</div>'+
        '</div>'+
       '<br><br>'+
        '<div id="imagegallery" class="row" >'+
           '</div>'+
        '</div>'+
    '<div role="tabpanel" class="tab-pane" id="videodiv">'+
         '<br>'+
        '<div class="row">'+
            '<div class="col-xs-6 col-md-6">'+
                '<a class="btn btn-u btn-u-xs rounded-2x" onclick="capturevideo()"><span class="fa fa-video-camera fa-xs"></span>&nbsp;Record Video</a>'+
           ' </div>'+
            '<div class="col-xs-6 col-md-6">'+
                '<a class="btn btn-u btn-u-xs rounded-2x" onclick="getvideo()"><span class="fa fa-file-video-o fa-xs"></span>&nbsp;Select Video</a>'+
            '</div>'+
        '</div>'+
       ' <br><br>'+
        '<div  id="videoplayer" class="container">'+
                               '  </div>'+
     ' </div>'+
    '<div role="tabpanel" class="tab-pane" id="audiodiv">'+
      '<br>'+
        '<a class="btn btn-u btn-u-xs rounded-2x" onclick="captureaudio()"><span class="fa fa-microphone fa-xs"></span> Record  Audio</a>'+
        '<br><br>'+
        '<div  id="audioplayer" class="container-fluid">'+
    '</div>'+
      '</div>'+
  '</div>'+
'</div>'+
'</div>'+
'<div class="clearfix"><button class="btn btn-u pull-right" id="btnpostcomments">Post Comment</button></div>'+
'</form></div>');
		  $("#detailsdv").append('<div class="col-xs-12 col-md-4" class="scrollerdiv"><br><br><br></div>');	
      }
  });
  
       
       //submit form to prevent default action and call functions
$("#formpostcomments").submit(function( event ) {
   var validate="invalid";
    if ($("#commenttext").val()){ validate="valid"};
    if (validate=="valid"){ getcommentdata() }else{
        if (navigator){
              navigator.notification.alert("Please! check Your Fields",function(){},"Fill All Fields","OK");
             
         }else{
             navigator.notification.alert("fill all fields to continue");
         }
    };
    
    event.preventDefault();
});
  //hideModal();
  })
  .fail(function(error) {
    
    navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
  
  });
    }
});
});
