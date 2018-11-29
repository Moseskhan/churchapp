
getmapsscripttag("true");
showModal();
showmenu();

   

function getdirections(address){
    window.location="directions.html";
}
 function initMap() {
     
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: getAmplifyValue("centerlat"), lng: getAmplifyValue("centerlng")},
		  draggable: false,
		  scrollwheel: false
        });
        var geocoder = new google.maps.Geocoder();

      
          geocodeAddress(geocoder, map);
       hideModal();
      }

      function geocodeAddress(geocoder, resultsMap) {
          showModaltimed();
        var address = getAmplifyValue('location');
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
              var contentString='<h4>'+getAmplifyValue('eventslocationname')+'</h4>'+
                  '<p>'+getAmplifyValue('location')+'</p><a href="directions.html">Get Directions</a>';
              var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
            resultsMap.setCenter(results[0].geometry.location);
              setAmplifyValue("destination",null);
            setAmplifyValue("destination",results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              title: getAmplifyValue('eventslocationname'),
              draggable:true,
            });
        marker.addListener('click',function(){
         infowindow.open(resultsMap, marker);
        });
          } else {
              $("#map").hide();
            //alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

$(document).ready(function()
{
   	 initializeAppSettingsWithCallBack(function(){    
     $("#churchname").html(getAmplifyValue('churchtitle'));
    $("#logoimage").attr('src',getAmplifyValue('logourl'));
    activateclickedmenu("eventshtml");
   $('#titleparentsermon').html(getAmplifyValue('eventname'));
   if (typeof getAmplifyValue("eventlogourl")!='undefined'){
        $('#eventdetails').append('<div class="col-md-6 col-sm-12 col-xs-12"><div class="panel panel-default"><div class="panel-body"><img src="'+getAmplifyValue("eventlogourl")+'" class="img-responsive" /></div></div></div>');
   }

  $('#eventdetails').append('<div class="col-md-6 col-sm-12 col-xs-12"><div class="list list-group" id="eventslistdetails"></div></div>')
  $('#eventslistdetails').append('<a class="list-group-item strong"><span class="fa fa-clock-o spacolor1 "></span>Time: <span class="fa fa-arrow-right"></span><p class="pull-right">'+getAmplifyValue('eventstarttime')+'-'+getAmplifyValue('eventstoptime')+'</p> </a>');
        $('#eventslistdetails').append('<a class="list-group-item"><span class="fa fa-calendar spancolor1"></span> Date: <span class="fa fa-arrow-right"></span><p class="pull-right">'+(getAmplifyValue('eventstartdate') == getAmplifyValue('eventstopdate')?getMomentDate(getAmplifyValue('eventstopdate')):getMomentDateWithNoYear(getAmplifyValue('eventstartdate'))+'-'+getMomentDate(getAmplifyValue('eventstopdate')))+'</p></a>');
	
   $("#eventslistdetails").append('<a class="list-group-item "><p class="list-group-item-text"><span class="fa fa-map-marker spancolor1"></span> '+getAmplifyValue('eventslocationname')+'</p></a>');
    $('#eventslistdetails').append('<a class="list-group-item " href="directions.html" ><p class="list-group-item-text"><span class="fa fa-map-marker spancolor1"></span> Address: '+getAmplifyValue('location')+'</p></a>');
     $('#eventslistdetails').append('<a class="list-group-item"><p class="list-group-item-text"><span class="fa fa-caret-square-o-right spancolor1"></span> '+getAmplifyValue('description')+'</p></a>');
    var count=0;
    $.each(getAmplifyValue("eventlinks"), function(key, eventlinks){
        count=count+1;
        if (count==1){
            $('#eventslistdetails').append('<a class="list-group-item"><h5 class="list-group-item-heading"> <span class="fa fa-mail-forward"></span> Links</h5></a>');
        }
    $('#eventslistdetails').append('<a class="list-group-item" href="#" onClick=gotoeventlink(\'' + eventlinks.linkurl + '\')><p class="list-group-item-text"><span class="	fa fa-mail-forward spancolor1"></span> '+eventlinks.linktitle+'</p></a>');
                  
   });
    var countfiles=0;
    $.each(getAmplifyValue("eventfiles"), function(key, eventfiles){
        countfiles=countfiles+1;
        if (countfiles==1){
            $('#files').append('<h5 class="breadcrumb"><span class="fa fa-mail-forward"></span> Media</h5>');
        }
		var cssClass="";
		if(getAmplifyValue("eventfiles").length > 1)
			cssClass="col-xs-6 col-sm-6"; //Only show two rows if there is more than one image
    $('#files').append('<div class="'+cssClass+'"><div class="service-block-v7 thumbnails thumbnail-style padding-bottom-0"><img src="'+eventfiles.fileurl+'" class="img-responsive" onclick="viewimages(\''+eventfiles.fileurl+'\',\''+getAmplifyValue('eventname')+'\')"</div></div>');
                  
   });
	 });
  
  });

   
	

	
		
		
	
		
	


