showmenu();

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
$(document).ready(function()
{
   
    $("#logoimage").attr('src',getAmplifyValue('logourl'));
    $("#titleparentsermon").html(getAmplifyValue('individualsermon_title_id'));
    activateclickedmenu("serieshtml");
    
    //alert(videoid);
    
});