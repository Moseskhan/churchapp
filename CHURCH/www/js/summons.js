showmenu();


$(document).ready(function(){
    showModal();
   initializeAppSettingsWithCallBack(function(){    
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
  setajaxheaders();
    
   $.getJSON(getAmplifyValue("apiUrl")+"/api/series", function() {
     
})
  .done(function(data) {
      setAmplifyValue('churchtitle',data.title );
      setAmplifyValue('logourl',data.logo);
     $("#churchname").html(getAmplifyValue('churchtitle'));
       $("#logoimage").attr('src',getAmplifyValue('logourl'));
       activateclickedmenu("serieshtml");
      var churchserie=data.series;
      
     var count=0;
       var myid=0;
       $("#")
    $.each( churchserie, function(key,Allsermons) {
    
       //alert(getAmplifyValue("sermon_title_id"));
  if (getAmplifyValue("sermon_title_id")===Allsermons.id){
    $('#titleparentsermon').html(Allsermons.title);
    setAmplifyValue('allsermonstitle',Allsermons.title)
      var listofsermons=Allsermons.sermons;
     setAmplifyValue('allsermonslogo',Allsermons.imagePath);
      $('#parentsermoncourousel').append('<div id="mycarousel" class="carousel slide" data-ride="carousel"><div class="carousel-inner"><div class="item active block-grid-v1"><img src="'+Allsermons.imagePath+'" alt="'+Allsermons.title+'" class="img-responsive"><div class="carousel-caption"></div></div></div></div>');
      
      $.each(listofsermons, function(key,individualsermonlisting){
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
          $("#childsermonstitles").append('<br><div class="panel panel-default-dark rounded"><div class="panel-heading"><h5 class="panel-title"> <span class="fa fa-star"></span> '+individualsermonlisting.title+' </h5></div><div class=" panel-body"><p><i>'+getMomentDate(individualsermonlisting.date)+' - '+ individualsermonlisting.preacher + '</i></p><p class="shortTextTwoLines">'+individualsermonlisting.description+'</p><div class="clearfix"><a class="btn '+btnclass+' pull-right" href="#" id="link'+count+'" title="'+individualsermonlisting.description+'" > <span class="fa fa-arrow-right fa 2x"></span></a></div></div></div>');


      });
      
      $.each( listofsermons, function( key,individualsermonlistingclick) {
   myid=myid+1;
     $("#link"+myid+"").click(function(){
        setAmplifyValue("individualsermon_title_id",individualsermonlistingclick.title);
      setAmplifyValue('individualsermondate',individualsermonlistingclick.date);
       setAmplifyValue('individualsermondescription',individualsermonlistingclick.description);
       setAmplifyValue('individualsermonvideotype',individualsermonlistingclick.videoType);
       setAmplifyValue('individualsermonvideolink',individualsermonlistingclick.videoLink);
       setAmplifyValue('individualsermonaudiolink',individualsermonlistingclick.audioLink);
       setAmplifyValue("sermonlinks",individualsermonlistingclick.links);
       setAmplifyValue("sermonfiles",individualsermonlistingclick.files);
         
       window.location='ViewOptions.html';
        
       
    }); 
});
  }

    
  
    
    });
  
  hideModal();
  })
  .fail(function(error) {
    navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
      
    
  });

}
});
});
