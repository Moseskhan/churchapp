showmenu();
var shareMessage="";
function playsermonvideo(){
    if (getAmplifyValue('individualsermonvideotype').toLowerCase()==='youtube'){
           $("#btnvideo").hide();
        $("#divvideo").append('<iframe id="youtubeiframe" width="100%" height="360"'+
        'src="https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1"'+
       ' frameborder="0"'+
        'style="border: solid 4px #37474F"'+
        'allowfullscreen'+
        '></iframe>');
        pluginShareOptions.url=getAmplifyValue('individualsermonvideolink');
        }else if(getAmplifyValue('individualsermonvideotype').toLowerCase()==='vimeo'){
            
        $("#btnvideo").hide(); 
             var videoid=GetVimeoIDbyUrl(getAmplifyValue('individualsermonvideolink'));
    //alert(videoid+' '+amplify.store('individualsermonvideolink'));
   
        $("#divvideo").append('<iframe id="vimeovideoiframe"  width="100%" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
             $("#vimeovideoiframe").attr('src','https://player.vimeo.com/video/'+videoid+'?title=0&byline=0&portrait=0');
             pluginShareOptions.url=getAmplifyValue('individualsermonvideolink');
        }else{
            $("#btnvideo").hide();
           $("#divvideo").append(' <video controls  id="sermonvideo" autoplay ></video>');
            $("#sermonvideo").attr('poster',getAmplifyValue('allsermonslogo'));
            $("#sermonvideo").html('<source src="'+getAmplifyValue('individualsermonvideolink')+'" type="video/mp4" >');
        }
}
function GetVimeoIDbyUrl(url) {
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
  var id = false;
  $.ajax({
    url: 'https://vimeo.com/api/oembed.json?url='+url,
    type: 'GET',
    async: false,
    success: function(response) {
      if(response.video_id) {
        id = response.video_id;
      }
    }
  });
  return id;
}
    
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

$(document).ready(function()
{
   
    
       
   setAmplifyValue("sharetopiclink", null);
   setAmplifyValue("shareimagelink", null);
     showModal();
    activateclickedmenu("serieshtml");
     var churchtitle=getAmplifyValue('churchtitle');
    $("#logoimage").attr('src',getAmplifyValue('logourl'));
     var initialtitle=getAmplifyValue('allsermonstitle');
      var subtitle= getAmplifyValue("individualsermon_title_id");
      var date= getAmplifyValue('individualsermondate');
      var descr= getAmplifyValue('individualsermondescription');
      var type= getAmplifyValue('individualsermonvideotype');
     shareMessage=shareMessage+descr;
    if (getAmplifyValue('individualsermonvideolink')){
        var link= getAmplifyValue('individualsermonvideolink');
         playsermonvideo();
    }else{
        $("#btnvideo").hide();
        $("#divvideo").hide();
        $("#liVideo").hide();
    }
    if (getAmplifyValue('individualsermonaudiolink')){
        var audio= getAmplifyValue('individualsermonaudiolink');
        
    }else{
        $("#btnaudio").hide();
        $("#divaudio").hide();
        $("#liAudio").hide();
    }
    
    if (getAmplifyValue("sermonlinks").length>0){
        $("#divSermonNotes").append('<div class="list-group" id="sermonlinks"></div>');
       
        $.each(getAmplifyValue("sermonlinks"), function (key, links){
            shareMessage=shareMessage+"  "+links.url;
            if (links.linkType=="PDF"){
                
                if (getAmplifyValue("deviceplatform")=== 'android'){
                    $("#sermonlinks").append('<a class="list-group-item" onClick="navigatetochoirlink(\'https://docs.google.com/viewer?url=' + links.url + '&embedded=true\')"><span class="fa fa-file-pdf-o spancolor2"></span> '+links.linkTitle+'<span class="fa fa-chevron-right pull-right"></span></a>');
                }else{
                     $("#sermonlinks").append('<a class="list-group-item" onClick="navigatetochoirlink(\'' + links.url + '\')"><span class="fa fa-file-pdf-o spancolor2"></span> '+links.linkTitle+'<span class="fa fa-chevron-right pull-right"></span></a>');
                }
               
                setAmplifyValue("sharetopiclink", links.url);
            }else{
                $("#sermonlinks").append('<a class="list-group-item" onClick="navigatetochoirlink(\'' + links.url + '\')"><span class="fa fa-share spancolor1"></span> '+links.linkTitle+'<span class="fa fa-chevron-right pull-right"></span></a>');
            }
            
        });
    }
    else{
            //Hide Sermon links div
        $("#divSermonLinks").hide();
        $("#liSermonLinks").hide();
    }
    
    if(getAmplifyValue("sermonfiles").length>0){
        $("#mediafiles").append('<div id="imagefiles" class="row"></div><br><br>'+
         '<div id="otherfiles" ></div>');
        $.each(getAmplifyValue("sermonfiles"), function(key,filelinks) {
        
               if (filelinks.fileType=="img"){
                   pluginShareOptions.files.push(filelinks.fileUrl.toLowerCase());
                    $('#imagefiles').append('<div class="col-xs-6">'
                                      +'<img src="'+filelinks.fileUrl+'" class="img-responsive imgtopicdetails" onClick="viewimages(\''+filelinks.fileUrl+'\',\''+getAmplifyValue("individualsermon_title_id")+'\')">'
                                       +''
                                     +'</div>');
                   
               }
             
          });
    }
    else{
        $("#divMedia").hide();
        $("#liMedia").hide();
    }
    
      //alert(JSON.stringify(getAmplifyValue("sermonfiles")));
    //alert(JSON.stringify(getAmplifyValue("sermonlinks")));
      $("#churchname").html(churchtitle);
      $("#titleparentsermon").html(initialtitle+'-'+subtitle);
      $('#panelheader').html(''+subtitle+'');
   
      $('#panelbody').prepend('<p>'+descr+'</p><a onClick="share(\'' + shareMessage+ '\',\'' +subtitle + '\')"><i class="icon-custom  rounded-x icon-color-blue icon-line icon-share pull-right"></i></a><br>');
      
        
       hideModal();
    

   
	

	
		
		
	
		
	


});
