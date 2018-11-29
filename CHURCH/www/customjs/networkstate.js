
document.addEventListener("deviceready", onappready, false);
function onappready(){
    $(document).on("online", onOnline);
     $(document).on("offline", onOffline);
   
    setAmplifyValue("networkstatus", navigator.connection.type);
    //alert(getAmplifyValue("language")+getAmplifyValue("networkstatus"));
}
function networkInfo() {
   var networkState = navigator.connection.type;
   var states = {};
	
   states[Connection.UNKNOWN]  = 'Unknown connection';
   states[Connection.ETHERNET] = 'Ethernet connection';
   states[Connection.WIFI]     = 'WiFi connection';
   states[Connection.CELL_2G]  = 'Cell 2G connection';
   states[Connection.CELL_3G]  = 'Cell 3G connection';
   states[Connection.CELL_4G]  = 'Cell 4G connection';
   states[Connection.CELL]     = 'Cell generic connection';
   states[Connection.NONE]     = 'No network connection';

   navigator.notification.alert(''+ states[networkState]);
    
}
function ShowPopUpOffline(){
    $("body").append('<button id="btnmodal3" class="btn btn-primary hidden" data-toggle="modal" data-target="#networkmodal3"></button><div class="modal fade" id="networkmodal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Sorry..</h4></div><div class="modal-body"><p> No internet connection detected. </p><p>The requested data cant be displayed. Please check connectivity, and try again later</p></div><div class="modal-footer"><a  class="btn-lg btn-danger btn-block text-center"  href="offline.html">Ok</button></div></div></div></div>');
            $("#btnmodal3").trigger("click");
}
function onOffline() {
    ShowPopUpOffline();
     setAmplifyValue("networkstatus", navigator.connection.type);
   
   
}

function onOnline() {
    setAmplifyValue("networkstatus", navigator.connection.type);
    
}
