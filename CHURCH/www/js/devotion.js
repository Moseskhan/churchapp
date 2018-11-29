var shareMessage="";
var shareTitle="";
$(document).on({
    ajaxStart: function() {showModal() },
    ajaxStop: function() { hideModal() }    
});

$(document).ready(function()
{
    showmenu();
    initializeAppSettingsWithCallBack(function(){    
    $("#churchname").html(getAmplifyValue('churchtitle'));
       $("#logoimage").attr('src',getAmplifyValue('logourl'));
    $("#titledevotionpage").html(getAmplifyValue("devotion.html"));
    if(getAmplifyValue('devotion.html-info')!==undefined){
        $("#pagedescription").html(getAmplifyValue('devotion.html-info'));
       //alert(getAmplifyValue('aboutus.html-info'));
    }
    activateclickedmenu("more-menuhtml");
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
    setajaxheaders();
    $.getJSON(getAmplifyValue("apiUrl")+"/api/devotion", function() {
     
})
  .done(function(devotiondata) {
        
        $.each(devotiondata, function(key, devotions){	
        shareMessage=devotions.keyVerse.replace(/(\r\n|\n|\r)/gm," ");
        shareTitle=devotions.title.replace(/(\r\n|\n|\r)/gm," ");
			$("#devotionslist").append('<div class="panel panel-u rounded">'+
									   '<div class="panel-heading"><h3 class="panel-title devotions-title"><i class="fa fa-tasks"></i>'+ devotions.title+'</h3></div>'+
									   '<div class="panel-body">'+
									   '<div class="pull-left margin-right-5"><div class="panel panel-default">'+
									   '<div class="background-color-grey">'+devotions.devMonth+'</div>'+
									   '<div class="background-color-green"><h4 class="panel-heading panel-title">'+devotions.devDate+'</h4></div>'+
									   '</div>'+
									   '<a onClick="share(\'' + shareMessage + '\',\'' + shareTitle + '\')" ><i class="icon-custom  rounded-x icon-color-blue icon-line icon-share pull-right"></i></a>'+
									   '</div>'+
							'<div>By: <span class="color-green">'+devotions.author+'</span></div>'+
									   '<div><p class="text-justify"><strong>'+devotions.keyVerse+'</strong></p>'+
									   '<a id="link2'+devotions.devotionID+'"  class="btn btn-u-xs btn-u rounded-2x pull-right"><span class="fa fa-arrow-right"></span></a>'+
									   '</div></div></div>');
           
            $('#link2'+devotions.devotionID).click(function(){
            setAmplifyValue("devotionid", devotions.devotionID);
                window.location="devotion-view.html";
        });
        });        
    })
.error(function(error) {
        navigator.notification.alert(JSON.stringify(error));
    })
           }
	 $("#searchdevotion").on("keyup", function() {
    var g = $(this).val().toLowerCase();
	var searchCssClass = ".panel-u";
    $(".row "+searchCssClass+" .devotions-title").each(function(key,data) {
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