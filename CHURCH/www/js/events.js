showmenu();

function showrecurringdays(){
   if($("input:checkbox[name=isrecurringevent]:checked").val()==="true"){
      $("#divnumberofrecurringdays").html('<div class="form-group"><input type="number" class="form form-control" id="recurringdays" required placeholder="recurring days from today"></div>');
      }else{
         $("#divnumberofrecurringdays").html("");
      } 
}
//add link functions
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
    $("#divlink").append('<div id="'+divid+'" class="alert alert-info alert-dismissible"><a  onClick="removediv(\'' + divid + '\')" class="close" data-dismiss="alert" aria-label="close">&times;</a><div class="form-group" id="mydiv"><input type="text" name="linktitle" placeholder="link title here" class="form form-control" required/></div><div class="form-group"><input type="url" name="link"  placeholder="link here" class="form form-control" required /></div></div>');
}
function removediv(addlinkdiv){
    $('#'+addlinkdiv).remove();
}
//end add link functions
//show new event area
function showpostevent(){
       $("#postevent").fadeIn();
     $('#btnaddnewevent').attr('onclick', 'hidepostevent()');
     $('#btnaddnewevent').html('<span class="fa fa-plus-circle"></span> Add New <span class="fa fa-chevron-up"></span>');
   }
//hide new topic area
function hidepostevent(){
    $("#postevent").fadeOut();
     $('#btnaddnewevent').attr('onclick', 'showpostevent()');
    $('#btnaddnewevent').html('<span class="fa fa-plus-circle"></span> Add New <span class="fa fa-chevron-down"></span>');
}
//begin post event
function geteventdata(){
    //showModal();
    var recurring_status=false;
    var recurring_days=0;
    if($("input:checkbox[name=isrecurringevent]:checked").val()==="true"){
        recurring_status=true;
        recurring_days=$("#recurringdays").val();
    }else{
        recurring_status=false;
        recurring_days=0;
    }
//alert(recurring_status+recurring_days);
    //post recurring_status and recurring_days
var event = {
name: "",      
description: "",
IsRecurring: recurring_status,
RepeatIntervalInDays: recurring_days,
churchID: getAmplifyValue("churchID"),
startDate: "",
endDate: "",
startTime: "",
endTime: "",
locationName: $("#locationName").val(),
Links: [],
groupID: $("#selectgroupid").val(),
address: {
    AddressLine1: $("#addressline1").val(),
    City: $("#city").val(),
    PostCode: $("#postalcode").val(),
    CountryID: $("#countryid").val()
}
};
    //turns the form data into an object
    //sampling username here*remember to collect after acccounts 
//amplify.store("userid","Moses Khan");
 event.description=$("#eventdescription").val();
 event.name=$("#eventname").val();
 event.startDate=$("#eventstartdate").val();
 event.endDate=$("#eventsenddate").val();
event.startTime=$("#eventstarttime").val();
event.endTime=$("#eventendtime").val();

var numberoflinks=$('input[name="linktitle"]').length;
 
    
for(i=0; i<numberoflinks; i++){
    event.Links.push({
        LinkTitle: $('input[name="linktitle"]')[i].value,
        URL: $('input[name="link"]')[i].value
    });

}

 
postevent(event);
    
   
}
function postevent(eventdetails) {
    
setajaxheaders();
  $.ajax({
    url: getAmplifyValue("apiUrl")+"/api/events",
    type: 'POST',
    data: JSON.stringify(eventdetails),
    success: function(eventslist) {
         setAmplifyValue("eventfiles", null);
             setAmplifyValue("eventlinks",null);
    hidepostevent();
        var eventdates='';
    if (eventslist.endDate===eventslist.startDate){
        eventdates=eventslist.startTime+'-'+eventslist.endTime;
    
    }else{
        eventdates=eventslist.startDate+'-'+eventslist.endDate;
    }
    
   var btnclass="btn btn-u btn-u-xs rounded-2x";
	$("#currentevents").prepend(getEventHTML(eventslist,btnclass,eventdates));
  var eventlist=eventslist;
        var getcalls=0;
        $.each(imagesurls, function(key, urls){
            getcalls=getcalls+1;
           
             uploadToServer(urls.url, getAmplifyValue("apiUrl")+"/api/file?churchID="+getAmplifyValue("churchID")+"&id="+eventlist.id+"&type=img&rel=event&plat="+getAmplifyValue("deviceplatform"));  
        });
         setAmplifyValue("filetransfercall", getcalls);
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

$.each(eventlist.links, function(key,eventlinks){

   eventlink = {       
      linktitle: eventlinks.linkTitle,
      linkurl: eventlinks.url,
                        
   };

  eventslinkarray.push(eventlink);        

});


             setAmplifyValue("eventlinks",eventslinkarray);
         if (eventlist.logo===''){
              
         }else{
             setAmplifyValue("eventlogourl",eventlist.logo);
         }
       window.location='events-single-view.html';
      
    }); 
    
    $("#posteventform").trigger("reset");
        imagesurls=[];
      //hideModal();       
    },
    error: function (error) {
      navigator.notification.alert(JSON.stringify(error));
    }
  });
}
//end postevent
$(document).on({
    ajaxStart: function() {showModal() },
     ajaxStop: function() { hideModal() }    
});
$(document).ready(function()
{
    initializeAppSettingsWithCallBack(function(){    
	$("#churchname").html(getAmplifyValue('churchtitle'));
    $("#logoimage").attr('src',getAmplifyValue('logourl'));
    $("#titleeventspage").html(getAmplifyValue("events.html"));
    if(getAmplifyValue('events.html-info')!==undefined){
        $("#pagedescription").html(getAmplifyValue('events.html-info'));
       //alert(getAmplifyValue('aboutus.html-info'));
    }
    activateclickedmenu("eventshtml");
    //$( "#isrecurringevent" ).checkboxradio();
    //showModal();
   
    $("#posteventform").submit(function( event ) {
  //alert ('am working');
  if($("#eventname").val() && $("#eventdescription").val() && $("#selectgroupid") && $("#eventstarttime").val() && $("#eventendtime").val() && $("#eventsenddate").val() && $("#eventstartdate").val() && $("#locationName").val() && $("#addressline1").val() && $("#city").val() && $("#postalcode").val() && $("#countryid").val()){
      if($("#isrecurringevent").prop("checked")){
          
          if($("#recurringdays").val()){
             geteventdata();
          }else{
             navigator.notification.alert("Please all the fields to continue",function(){
        
             },"Warning..","OK"); 
          }
          
      }else{
        geteventdata(); 
      }
       
   }else{
       navigator.notification.alert("Please all the fields to continue",function(){
        
             },"Warning..","OK");
   }
    //geteventdata();
    event.preventDefault();
});
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
    }else{
     setajaxheaders();
        if(getAmplifyValue('isValidEmail') && getAmplifyValue('isValidEmail') === "true" && getAmplifyValue("loggedInEmail") && getAmplifyValue("userID") &&  getAmplifyValue("userID")!="0" && getAmplifyValue("isAdmin") &&  getAmplifyValue("isAdmin")=== true){
    loadGroupsAndCountries();
    $("#divNewEvent").show();
        }
    else
        {
            $("#divNewEvent").hide();
        }
    
   $.getJSON(getAmplifyValue("apiUrl")+"/api/events", function() {
     
})
  .done(function(events) {
      
   var count=0;
     // alert(events);
$.each(events.current, function(key,eventslist) {
    
      count=count+1;
  var btnclass='';  
if (count % 2 === 0)
{
  btnclass='btn btn-u-xs btn-u rounded-2x';
}
else
{
  btnclass='btn btn-u-xs btn-u rounded-2x';
}
    var eventdate='';
    if (eventslist.endDate===eventslist.startDate){
        eventdates=eventslist.startTime+'-'+eventslist.endTime;
    
    }else{
        eventdates=getMomentDateWithNoYear(eventslist.startDate)+' - '+getMomentDate(eventslist.endDate)+"<br/><span class='fa fa-clock-o spancolor1'>&nbsp;</span> "+eventslist.startTime+' - '+eventslist.endTime;
    }
   
   $("#currentevents").append(getEventHTML(eventslist,btnclass,eventdates));
  
    
    });
$.each(events.past, function(key,eventslist) {
    
      count=count+1;
  var btnclass='';  
if (count % 2 === 0)
{
  btnclass='btn btn-u-xs btn-u rounded-2x';
}
else
{
  btnclass='btn btn-u-xs btn-u rounded-2x';
}
    var eventdate='';
    if (eventslist.endDate===eventslist.startDate){
        eventdates=eventslist.startTime+'-'+eventslist.endTime;
    
    }else{
        eventdates=getMomentDate(eventslist.startDate)+'-'+getMomentDate(eventslist.endDate);
    }
   
   $("#pastevents").append(getEventHTML(eventslist,btnclass,eventdates));
  
    
    });
       $.each(events.current, function( key, eventlist ) {
  
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
  $.each(events.past, function( key, eventlist ) {
  
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
         //alert(eventlist.locationName);
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
  //hideModal();
  })
  .fail(function(error) {
    
   navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
      
  });

   
}

$("#searchevents").on("keyup", function() {
    var g = $(this).val().toLowerCase();
	var searchCssClass = ".service-block-v8";
    $(""+searchCssClass+" .event-name").each(function(key,data) {
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

function getEventHTML(eventslist, btnclass,eventdates){
    var strEvent = '<div class="service-block-v8 thumbnails thumbnail-style rounded-2x"><div><h5 class="strong"><strong><span class="pull-left event-name">'+eventslist.name+'</span></strong>&nbsp;&nbsp;<span class="pull-right"><span class="fa fa-calendar spancolor1"></span> '+getMomentDate(eventslist.startDate)+' </span></h5></div><div class="panel-body"><p><span class="fa fa-clock-o spancolor1"></span>&nbsp;&nbsp;'+eventdates+'<br/><button class="'+btnclass+' btn-sm pull-right" id="'+eventslist.id+'"><span class="fa fa-arrow-right"></></button></p></div></div>';
    return strEvent;
}

function loadGroupsAndCountries()
{
    $.getJSON(getAmplifyValue("apiUrl")+"/api/groups?ChurchID="+getAmplifyValue("churchID"), function() {
     
})
    .done(function(groups) {
         $.each(groups, function( key, groupslist ) {
        
         $("#selectgroupid").append("<option value='"+groupslist.groupID+"'>"+groupslist.title+"</option>");
              
    
      
   
});
         //alert(amplify.store("openinggroupid"));
         setAmplifyValue("allgroupsdata", groups);
     })
 .fail(function(error) {
    
  navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
      
  });
   
   $( function() {
    $( "#eventstartdate" ).datepicker();
        $( "#eventsenddate" ).datepicker();
       $('#eventstarttime').timepicker({ timeFormat: 'HH:mm' });
       $('#eventendtime').timepicker({ timeFormat: 'HH:mm' });
  } );
     $("#churchname").html(getAmplifyValue('churchtitle'));
    $("#logoimage").attr('src',getAmplifyValue('logourl'));
    setAmplifyValue('eventstartdate', null);
    setAmplifyValue('eventstopdate', null);
    setAmplifyValue('eventlogourl', null);
    setAmplifyValue('eventlink', null);

    $.getJSON(getAmplifyValue("apiUrl")+"/api/countries", function() {
     //showModal();
})
  .done(function(countriesdata) {
        $.each(countriesdata, function(key,country){
            
            $("#countryid").append('<option value="'+country.countryID+'">'+country.countryName+'</option');
        })
        
    })
    .fail(function(error) {
    navigator.notification.alert(JSON.stringify(error));
    
  })
  .always(function() {
    //alert( "complete" );
  });
}
