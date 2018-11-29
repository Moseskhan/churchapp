$(document).on({
    ajaxStart: function() { showModal() },
    ajaxStop: function() { hideModal() }    
});
//end post form functions
$(document).ready(function()
{
     $("#logoimage").attr('src',getAmplifyValue('logourl'));
    showmenu();
    setajaxheaders();
    $.getJSON(getAmplifyValue("apiUrl")+"/api/bulletin", function() {
     //showModal();
})
  .done(function(bulletin) {
       
         $("#bulletinTitle").html(bulletin.title);
        $("#bulletinDate").html("Bulletin -"+ getMomentDateWithNoYear(bulletin.startDate)+'-'+getMomentDate(bulletin.endDate));
         $("#messageDiv").append(bulletin.message);
        $.each(bulletin.pastorMessages, function(key, messages){
            $("#divMessage").append('<div class="panel panel-default-dark rounded-2x">'+
              '<div class="panel-heading rounded-2x"><h5 class="panel-title rounded-2x"> '+messages.title+' </h5></div>'+
                  '<div class="panel-body">'+
                   '<h5 class="text-justify">'+messages.message+'</h5>'+
				'<div>'+messages.author+
				'<br/>'+getMomentTopicDetailTopDate(messages.dateCreated)+'</div>'+
             ' </div></div>');
        });
        var bullettinEvents=bulletin.events;
         $.each(bullettinEvents.current, function(key, eventlist){
             var eventdate='';
    if (eventlist.endDate===eventlist.startDate){
        eventdates=eventlist.startTime+'-'+eventlist.endTime;
    
    }else{
        eventdates=getMomentDate(eventlist.startDate)+'-'+getMomentDate(eventlist.endDate);
    }
           $("#divEvents").append('<div class="service-block-v8 thumbnails thumbnail-style rounded-2x"><div><h5 class="strong"><strong><span class="pull-left event-name">'+eventlist.name+'</span></strong>&nbsp;&nbsp;<span class="pull-right"><span class="fa fa-calendar spancolor1"></span> '+getMomentDate(eventlist.startDate)+' </span></h5></div><div class="panel-body"><p><span class="fa fa-clock-o spancolor1"></span>&nbsp;&nbsp;'+eventdates+'<br/><button class="btn btn-u btn-sm pull-right rounded-2x" id="'+eventlist.id+'"><span class="fa fa-arrow-right"></></button></p></div></div>');
             $("#"+eventlist.id+"").click(function(){
        setAmplifyValue("eventname",eventlist.name);
       setAmplifyValue("eventid",eventlist.id);
        
         setAmplifyValue("eventstartdate",eventlist.startDate);
         if (eventlist.endDate===''){
            
         }else{
             setAmplifyValue("eventstopdate",eventlist.endDate);
         }
        
         setAmplifyValue("eventstoptime", eventlist.endTime);
         setAmplifyValue("eventstarttime",eventlist.startTime);
         setAmplifyValue("location", null);
        setAmplifyValue("location", eventlist.location);
         setAmplifyValue("description",eventlist.description);
         setAmplifyValue("eventslocationname",eventlist.locationName);
         var eventslinkarray = new Array();
         var eventsfilesarray=new Array();
$.each(eventlist.links, function(key,eventlinks){

   eventlink = {       
      linktitle: eventlinks.linkTitle,
      linkurl: eventlinks.url,
                        
   };

  eventslinkarray.push(eventlink);        

});
$.each(eventlist.files, function(key,eventfiles){

   eventfiles = {       
      fileurl: eventfiles.fileUrl,
      fileid: eventfiles.fileID,
                        
   };

  eventsfilesarray.push(eventfiles);        

});
             setAmplifyValue("eventfiles", eventsfilesarray);
             setAmplifyValue("eventlinks",eventslinkarray);
         
         if (eventlist.logo===''){
              
         }else{
             setAmplifyValue("eventlogourl",eventlist.logo);
         }
       window.location='events-single-view.html';
      
    }); 
      
    }); 
         
        $.each(bulletin.announcements, function(key,announcement){
            $("#divAnnouncements").append('<div class="panel panel-default-dark rounded-2x">'+
              '<div class="panel-heading rounded-2x"><h5 class="panel-title rounded-2x"> '+announcement.title+' </h5></div>'+
                  '<div class="panel-body">'+
                   '<h5>'+announcement.message+'</h5>'+
                   '<div id="announcementLinks'+announcement.announcementID+'" class="list-group"></div>'+
                    '<div id="announcementPics'+announcement.announcementID+'" class="row"></div>'+
                  '</div>'+
             ' </div>');
            if(announcement.links.length>0){
                $('#announcementLinks'+announcement.announcementID).append('<a class="list-group-item"><h5 class="list-group-item-heading"> <span class="fa fa-mail-forward"></span> Links</h5></a>');
                $.each(announcement.links,function(key, links){
                     $('#announcementLinks'+announcement.announcementID).append('<a class="list-group-item" href="#" onClick=gotoeventlink(\'' + links.linkurl + '\')><p class="list-group-item-text"><span class="	fa fa-mail-forward spancolor1"></span> '+links.linktitle+'</p></a>');
                })
            }
            if(announcement.pictures.length>0){
                $.each(announcement.pictures,function(key, pics){
                     $('#announcementPics'+announcement.announcementID).append('<div class="col-xs-6 col-md-6"><div class="service-block-v7 thumbnails thumbnail-style padding-bottom-0"><img src="'+pics.fileUrl+'" class="img-responsive" onclick="viewimages(\''+pics.fileUrl+'\',\''+announcement.title+'\')"</div></div>');
                });
            }
            
        });
        if(bulletin.pictures.length>0){
         $.each(bulletin.pictures, function(key, pictures){
             $("#divMedia").append('<div class="col-xs-6 col-md-6"><div class="service-block-v7 thumbnails thumbnail-style padding-bottom-0"><img src="'+pictures.fileUrl+'" class="img-responsive" onclick="viewimages(\''+pictures.fileUrl+'\',\''+bulletin.title+'\')"</div></div>');
         });
        }
    })
    .fail(function(error) {
    
   navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
    //alert( "complete" );
  });
});