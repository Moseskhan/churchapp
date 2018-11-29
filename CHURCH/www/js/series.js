


$(document).on({
    ajaxStart: function() {
    
        showModal();
       },
    ajaxStop: function () {
        hideModal();
    }
});
$(document).ready(function(){    
showmenu();
    initializeAppSettingsWithCallBack(function(){    
    $("#titlesermonpage").html(getAmplifyValue("series.html"));
     $("#churchname").html(getAmplifyValue('churchtitle'));
    if(getAmplifyValue('series.html-info')!==undefined){
        $("#pagedescription").html(getAmplifyValue('series.html-info'));
       //alert(getAmplifyValue('aboutus.html-info'));
    }
    activateclickedmenu("serieshtml");
    if (getAmplifyValue("networkstatus")=="none"){
        ShowPopUp();
    }else{
        setajaxheaders();
        $.getJSON(getAmplifyValue("apiUrl")+"/api/series", function() {
     
})
  .done(function(data) {
       
      
      
      var churchserie=data.series;
      
     var count=0;
    $.each( churchserie, function(key,Allsermons) {
    
      count=count+1;
  var btnclass='';  
if (count % 2 === 0)
{
  btnclass='btn btn-u rounded-2x';
}
else
{
  btnclass='btn btn-u rounded-2x';
}
    
   
  
    $("#sermontitle").append('<div class="col-xs-6 col-md-4">'+
                '<div class="service-block-v7 thumbnails thumbnail-style"><a><img src="'+Allsermons.imagePath+'" alt="'+Allsermons.title+'" class="img-responsive"></a>'+
            '<h4><a id="title'+Allsermons.id+'">'+Allsermons.title+'</a></h4>'+
            '<p><a  id="'+Allsermons.id+'" class="'+btnclass+' pull-center"><span class="fa fa-arrow-right"></span></a></p>'+
          '</div></div>');
    });
		
  $.each( churchserie, function( key, allsermonsclick ) {
   
     $("#"+allsermonsclick.id+"").click(function(){
        setAmplifyValue("sermon_title_id",allsermonsclick.id);
       
       window.location='summons.html';
      
    }); 
      $("#title"+allsermonsclick.id+"").click(function(){
        setAmplifyValue("sermon_title_id",allsermonsclick.id);
       
       window.location='summons.html';
      
    }); 
});
  //hideModal();
  })
  .fail(function(error) {
   navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
       hideModal();
    //Do this at the end so that we give a chance for the ChurchDetails webservice in ShowMenu to complete
    $("#logoimage").attr('src',getAmplifyValue('logourl'));
  });
    }
});
});