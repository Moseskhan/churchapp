var shareMessage="";
var shareTitle="";

$(document).on({
    ajaxStart: function() {showModal() },
    ajaxStop: function() { hideModal() }    
});


function playvideo(videourl){
   //alert(videourl); 
   setAmplifyValue('individualsermonvideolink', videourl);
    window.location="viewvideo.html";
}
function playaudio(audiourl){
   setAmplifyValue('individualsermonaudiolink',audiourl);

    window.location="playaudio.html";
}

$(document).ready(function()
{
    showmenu();
	initializeAppSettingsWithCallBack(function(){    
    setAmplifyValue("shareimagelink",null);
   setAmplifyValue("sharetopiclink",null); 
    $("#churchname").html(getAmplifyValue('churchtitle'));
       $("#logoimage").attr('src',getAmplifyValue('logourl'));
    activateclickedmenu("more-menuhtml");
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
               
    setajaxheaders();
    $.getJSON(getAmplifyValue("apiUrl")+"/api/devotion", function() {
     
})
  .done(function(devotiondata) {
        
        $.each(devotiondata, function(key, devotions){
            if (devotions.devotionID==getAmplifyValue("devotionid")){
                shareMessage=shareMessage+devotions.title+' '+devotions.description +' BIBLE VERSE: '+devotions.keyVerse;
                setAmplifyValue("devotiontitle",devotions.title);
             	$("#devotionTitle").text("Devotion - " + getMomentDate(devotions.devotionDate));
				 $("#devotionslist").append('<div class="panel panel-u rounded"><div class="panel-heading"><h3 class="panel-title">'+devotions.title+' </h3></div><div class="panel-body">By: <span class="color-green">'+devotions.author+'</span> <br><p class="italics text-justify"><strong><em>'+devotions.keyVerse+'</strong></em></p>'+
				(devotions.titleImage!==null?'<div class="service-block-v7 thumbnails thumbnail-style padding-bottom-0"><img src="'+devotions.titleImage+'" class="img-responsive"/></div>':'')+  
             '<p class="text-justify"> '+devotions.description+'</p>'+
              (devotions.prayer!==null?'<h5><strong>Prayer: '+devotions.prayer+'</strong></h5>':'')+
              '<div id="links" class="list-group"></div>'+
            '<div class="pull-left" id="shareDiv"></div><br><br>'+
              '<br>'+
             '<div class="row" id="files"></div>'+'</div></div>'+		
				'</div>');
				 $("#devotionslist").append('<div class="row" id="imgfiles"></div>');
				$("#devotionslist").append('<div class="col-xs-12 col-md-4" class="scrollerdiv"><br><br><br></div>');
               pluginShareOptions.files.push(devotions.titleImage);
                count=0;
                $.each(devotions.links, function(key,links){
                    shareMessage=shareMessage+'  '+links.url;
                    count=count+1;
                    if (count==1){
            $('#links').append('<a class="list-group-item"><h5 class="list-group-item-heading"> <span class="fa fa-mail-forward"></span> Links</h5></a>');
        }
    $('#links').append('<a class="list-group-item" href="#" onClick=gotoeventlink(\'' + links.url + '\')><p class="list-group-item-text"><span class="	fa fa-mail-forward spancolor2"></span> '+links.linkTitle+'</p></a>');
                    
                })
               $.each(devotions.files, function(key,filelinks) {
                   
               if (filelinks.fileType=="img"){
                   pluginShareOptions.files.push(filelinks.fileUrl);
                    $('#imgfiles').append('<div class="col-xs-6 col-sm-6"><div class="service-block-v7 thumbnails thumbnail-style padding-bottom-0">'
                                      +'<img src="'+filelinks.fileUrl+'" class="img-responsive" onclick="viewimages(\''+filelinks.fileUrl+'\',\''+getAmplifyValue("devotiontitle")+'\')">'
                                       +''
                                     +'</div></div>');
                   
               }else if (filelinks.fileType=="vid"){
                   
                  setAmplifyValue('individualsermon_title_id',devotions.title);
                   $('#files').append('<div class="col-sm-6 col-xs-6"><button class="btn btn-u-xs btn-u rounded-2x" onclick="playvideo(\'' + filelinks.fileUrl + '\')"><span class="fa fa-play-circle"></span> Watch Video</button></div>');
               }else if(filelinks.fileType=="aud"){
                   setAmplifyValue('individualsermon_title_id',devotions.title);
                   $('#files').append('<div class="col-xs-6 col-sm-6">'+
                                          '<button class="btn btn-u-xs btn-u rounded-2x" onclick="playaudio(\'' + filelinks.fileUrl + '\')"><span class="fa fa-microphone"></span> Listen Audio</button>'
                                          +'</div>');
               }
             
          }); 
               shareMessage=shareMessage.replace(/(\r\n|\n|\r)/gm," ");
              shareTitle=devotions.title.replace(/(\r\n|\n|\r)/gm," ");
            $("#shareDiv").append('<a onClick="share(\'' + shareMessage + '\',\'' + shareTitle + '\')"><i class="icon-custom  rounded-2x icon-color-blue icon-line icon-share pull-left spancolor1"></i></a>');  
            }
            
            
        });
        
        
    })
.error(function(error) {
        navigator.notification.alert(JSON.stringify(error));
    })
           }
	});
});