showmenu();




$(document).ready(function()
{
    showModaltimed();
     initializeAppSettingsWithCallBack(function(){    
    $("#logoimage").attr('src',getAmplifyValue('logourl'));
    $("#titleparentsermon").html(getAmplifyValue('individualsermon_title_id'));
   
    $("#sermonvideo").attr('poster',getAmplifyValue('allsermonslogo'));
    $("#id_audio-url").html('<source src="'+getAmplifyValue('individualsermonaudiolink')+'" />');
});
});

