

function opennavigator(){
    //alert(getAmplifyValue('destination').lat);
    //alert(getAmplifyValue('destination').lng);
    if (getAmplifyValue('destination')){
        launchnavigator.navigate([getAmplifyValue('destination').lat,getAmplifyValue('destination').lng]);
        
    }else{
        launchnavigator.navigate(getAmplifyValue("location"));
    }
    //
}
function initMap() {
          
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: getAmplifyValue("centerlat"), lng: getAmplifyValue("centerlat")}
        });
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));
       

        
          calculateAndDisplayRoute(directionsService, directionsDisplay);
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
          //alert(getAmplifyValue("latitude"));
          //alert(getAmplifyValue('location'));
          
          if (getAmplifyValue("latitude")=='undefined'){
             navigator.notification.alert("Directions Couldnt be Shown, Make Sure Your GPS is turned on",function(){
                 goBack();
             },"Sorry..","OK");
          }
          if (getAmplifyValue("destination")=='undefined'){
             navigator.notification.alert("Directions Couldnt be Shown, Make Sure Your GPS is turned on",function(){
                 goBack();
             },"Sorry..","OK");
          }
          
        directionsService.route({
          origin: {lat: getAmplifyValue("latitude"), lng: getAmplifyValue("longitude")},
          destination: getAmplifyValue('destination'),
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          }
        else if (status === 'ZERO_RESULTS') {
             navigator.notification.alert("No directions were found.",function(){
                 goBack();
             },"Sorry..","OK");
          }
            else {
            navigator.notification.alert("Directions Couldnt be Shown, An Error Occured",function(){
                 goBack();
             },"Sorry..","OK");
          }
        });
      }


document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        
        console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
function onSuccess(position) {
   setAmplifyValue("latitude", position.coords.latitude);
   setAmplifyValue("longitude", position.coords.longitude);
    showModaltimed();
    getmapsscripttag();
    
    
}
function onError(error) {
   navigator.notification.alert("Directions Couldnt be Shown, Make Sure Your GPS is turned on",function(){
                 goBack();
             },"Sorry..","OK");
        
}
 