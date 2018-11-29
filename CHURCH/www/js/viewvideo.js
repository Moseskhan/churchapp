showmenu();

$(document).ready(function()
{
    showModaltimed();
    
    $("#logoimage").attr('src',getAmplifyValue('logourl'));
    $("#titleparentsermon").html(getAmplifyValue('individualsermon_title_id'));
   
    $("#sermonvideo").attr('poster',getAmplifyValue('allsermonslogo'));
    $("#sermonvideo").html('<source src="'+getAmplifyValue('individualsermonvideolink')+'" type="video/mp4" >');
   
});


