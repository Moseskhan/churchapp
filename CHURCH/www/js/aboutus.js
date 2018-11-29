getmapsscripttag();
function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: getAmplifyValue("centerlat"), lng: getAmplifyValue("centerlong")}
        });
        var geocoder = new google.maps.Geocoder();

      
          geocodeAddress(geocoder, map);
       hideModal();
      }

      function geocodeAddress(geocoder, resultsMap) {
          showModaltimed();
        var address = getAmplifyValue('locationaboutus');
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
              var contentString='<h4>'+getAmplifyValue('churchtitle')+'</h4>'+
                  '<p>'+address+'</p><a href="directions.html">Get Directions</a>';
              var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
            resultsMap.setCenter(results[0].geometry.location);
              setAmplifyValue("destination",null);
            setAmplifyValue("destination",results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              title: getAmplifyValue('churchtitle'),
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
    var aboutchurch=getAmplifyValue("aboutchurch");
    setAmplifyValue('locationaboutus', aboutchurch.location);
    setAmplifyValue('location', aboutchurch.location);
    $("#titleaboutuspage").html(getAmplifyValue("aboutus.html"));
    
    if(getAmplifyValue('aboutus.html-info')!==undefined){
        $("#pagedescription").html(getAmplifyValue('aboutus.html-info'));
       //alert(getAmplifyValue('aboutus.html-info'));
    }
   activateclickedmenu("more-menuhtml");
   
    if (aboutchurch.showLogo==false){
        
    }else{
        $("#aboutuscontent").append('<div class="col-xs-12 col-md-12">'+
           '<img src="'+aboutchurch.logo+'" class="img-responsive"></div>');
    }
    if(aboutchurch.mapCenterLat){
        setAmplifyValue("centerlat", aboutchurch.mapCenterLat);
    }
    if (aboutchurch.mapcenterLong){
        setAmplifyValue("centerlong", aboutchurch.mapCenterLong);
    }
    var facebookicon="";
    var twittericon="";
    var instagramicon="";
    if (aboutchurch.facebook!==null){ 
      facebookicon=' <li><a href="#" onClick=gotoeventlink(\'' + aboutchurch.facebook + '\') data-original-title="Facebook" class="rounded social_facebook"></a></li>';
    }
    if (aboutchurch.twitter!==null){ 
      twittericon='<li><a href="#" onClick=gotoeventlink(\'' + aboutchurch.twitter + '\') data-original-title="Twitter" class="rounded social_twitter"></a></li>';
    }
    if (aboutchurch.instagram!==null){  
      instagramicon='<li><a href="#" data-original-title="Instagram" onClick=gotoeventlink(\'' + aboutchurch.instagram+ '\') class="rounded social_instagram"></a></li>';
    }
    $("#aboutuscontent").append('<div class="col-xs-12 col-md-12">'+
              '<div class="list-group">'+
                  '<br>'+
             '<a href="#" class="list-group-item">'+
    '<h4 class="list-group-item-heading"><span class="fa fa-institution pull-left spancolor1"></span>&nbsp&nbsp&nbsp'+aboutchurch.title+'</h4>'+
    '</a>'+
    '<a href="tel:'+aboutchurch.phoneNumber+'" class="list-group-item">'+
    '<h4 class="list-group-item-heading"><span class="fa fa-phone pull-left spancolor1"></span> &nbsp&nbsp&nbsp'+aboutchurch.phoneNumber+'</h4></a>'+
    '<a href="mailto:'+aboutchurch.email+'" class="list-group-item">'+
    '<h4 class="list-group-item-heading"><span class="fa fa-envelope pull-left spancolor1"></span>&nbsp&nbsp&nbsp'+aboutchurch.email+'</h4></a>'+
    '<a href="#" class="list-group-item">'+
    '<h4 class="list-group-item-heading">'+aboutchurch.desciption+'</h4></a>'+
    
    '<a href="directions.html" class="list-group-item">'+
    '<h4 class="list-group-item-heading" ><span class="fa fa-map-marker pull-left spancolor1"></span>&nbsp&nbsp'+aboutchurch.location+' </h4></a>'+
    ''+
    '</div>'+
    ' <ul class="social-icons social-icons-color">'+facebookicon+twittericon+instagramicon+
    '</ul>'+
    '<div id="map"></div></div>');
    initMap();
	});
});