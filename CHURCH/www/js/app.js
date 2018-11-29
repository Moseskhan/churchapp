/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */


// For improved debugging and maintenance of your app, it is highly
// recommended that you separate your JavaScript from your HTML files.
// Use the addEventListener() method to associate events with DOM elements.

// For example:

// var el ;
// el = document.getElementById("id_myButton") ;
// el.addEventListener("click", myEventHandler, false) ;



// The function below is an example of the best way to "start" your app.
// This example is calling the standard Cordova "hide splashscreen" function.
// You can add other code to it or add additional functions that are triggered
// by the same event or other events.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var amplifystoragearray=[];
var pictureSource;   // picture source
var imagesurls=[];
var closedialog;
var pluginShareOptions={
    message: "",
    subject: "",
    files: [],
    url: ""
};
var destinationType;
var filetransfer;
var mediatype;
function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        setTimeout(function() { navigator.splashscreen.hide(); }, 7000);
    }
    
     if( window.intel && intel.xdk && intel.xdk.device ) {           // Intel XDK device API detected, but...
        if( intel.xdk.device.hideSplashScreen )                     // ...hideSplashScreen() is inside the base plugin
        setTimeout(function() { intel.xdk.device.hideSplashScreen(); }, 7000);
    }
    
    pictureSource=navigator.camera.PictureSourceType;

	        destinationType=navigator.camera.DestinationType;
    mediatype=CAMERA.MediaType;
         console.log(navigator.device.capture); 
         console.log(navigator.notification.alert());
     setAmplifyValue("networkstatus", navigator.connection.type);
    
     declarevariables();   
}
document.addEventListener("app.Ready", onAppReady, false);

function emulatorAlert() {
    alert("This feature is not supported on the emulator. Please test on app preview or as a built app");
}


function goBack() {
    window.history.back();
}

function navigatetochoirlink(link){
    "use strict";
    var fName = "navigatetochoirlink():";
    console.log(fName, "entry");
    try {
        var ref = window.open(link, '_blank', 'location=yes');
        console.log(fName, "try, success");
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
    
}
function listenaudiolink() {
    "use strict";
    var fName = "listenaudiolink():";
    console.log(fName, "entry");
    try {
        
         window.location="playaudio.html";
          
       
         console.log(fName, "try, success");
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}
function gotoeventlink(link) {
    "use strict";
    var fName = "gotoeventlink():";
    console.log(fName, "entry");
    try {
        
         var ref = window.open(link, '_blank', 'location=yes');
          
       
         console.log(fName, "try, success");
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";

}

$(function() {
  $('#ChangeToggle').click(function() {
    $('#navbar-hamburger').toggleClass('hidden');
    $('#navbar-close').toggleClass('hidden');  
  });
});
app.initNativeAudio = function() {
    "use strict";
    var fName = "app.initNativeAudio():";
    app.consoleLog(fName, "entry");

    var items, i, asset ;
    function success(msg) { app.consoleLog(fName, msg) ; }
    function error(msg)   { app.consoleLog(fName, 'Error: ' + msg) ; }

    if( window.plugins && window.plugins.NativeAudio ) {
        try {
            items = ['boot-sound', 'sound-bowl'];
            for( i = 0; i < items.length; i++ ) {
                asset = 'sounds/' + items[i] + '.wav' ;
//                asset = getWebRoot() + '/sounds/' + items[i] + '.wav' ;
                app.consoleLog(fName, "Preloading ", asset);
                window.plugins.NativeAudio.preloadSimple(items[i], asset, success, error) ;
            }
            app.consoleLog(fName, "Preloaded low latency audio");
        }
        catch(e) {
            app.consoleLog(fName, "catch, failure");
        }
    }

    app.consoleLog(fName, "exit");
} ;



app.playNativeAudioButton = function() { app.playNativeAudio(this.getAttribute("data-sound")); } ;
app.playNativeAudio = function(aud) {
    "use strict";
    var fName = "app.playNativeAudio():";
    app.consoleLog(fName, "entry");

    if( window.tinyHippos )
        app.thirdPartyAlert(fName) ;

    else if( /file:\/\/.*\/com\.intel\.html5tools\.apppreview/i.test(getWebRoot()) )
        app.debugAlert(fName) ;

    else if( !(window.plugins) || !(window.plugins.NativeAudio) )
        app.thirdPartyAlert() ;

    else {
        try {
            window.plugins.NativeAudio.play(aud);
        }
        catch (e) {
            app.thirdPartyAlert();
            app.consoleLog(fName, "catch, failure");
        }
    }

    app.consoleLog(fName, "exit");
} ;



app.playConcurrentButton = function() { app.playConcurrent(this.getAttribute("data-sound1"),this.getAttribute("data-sound2")); } ;
app.playConcurrent = function(aud1, aud2) {
    "use strict";
    var fName = "app.playConcurrent():";
    app.consoleLog(fName, "entry");

    if( window.tinyHippos )
        app.thirdPartyAlert(fName) ;

    else if( /file:\/\/.*\/com\.intel\.html5tools\.apppreview/i.test(getWebRoot()) )
        app.debugAlert(fName) ;

    else if( !(window.plugins) || !(window.plugins.NativeAudio) )
        app.thirdPartyAlert() ;

    else {
        try {
            window.plugins.NativeAudio.play(aud1);
            window.plugins.NativeAudio.play(aud2);
        }
        catch (e) {
            app.thirdPartyAlert();
            app.consoleLog(fName, "catch, failure");
        }
    }

    app.consoleLog(fName, "exit");
} ;



// Cordova Media API audio player methods

app.my_media = null;
app.mediaTimer = null;

app.playCordovaAudioButton = function() { app.playCordovaAudio(this.getAttribute("data-sound")); } ;
app.playCordovaAudio = function(src) {
    "use strict";
    var fName = "app.playCordovaAudio():";
    app.consoleLog(fName, "entry");

    var x = navigator.userAgent ;
    var z = getWebRoot() ;

    if( window.cordova && cordova.file ) {                  // if Cordova file plugin present
        if( !(/^https?:/i.test(src)) ) {                    // if local file to be played...
            if( x.match(/(ios)|(iphone)|(ipod)|(ipad)/ig) ) { // if on iOS device...
                if( window.tinyHippos )                     // ...AND in the Emulate tab
                    src = z + "/" + src ;                   // correct file location for Emulate tab
            }
            else                                            // for everything else...
                src = z + "/" + src ;                       // add absolute path prefix on non-iOS
        }

        if( window.tinyHippos && /.*\.mp3$/i.test(src) )    // if mp3 file AND in Emulate tab
            app.emulateAlert(fName) ;                       // no-can-do... (won't play mp3 files)

        else {
            try {
                app.my_media = new Media(src, mediaSuccess, mediaError, mediaStatus) ;
                app.my_media.play() ;
            }
            catch (e) {
                app.consoleLog(fName, "catch, failure");
            }
        }
    }

    else
        app.missingPluginAlert(fName) ;                     // no file plugin, in a browser?


// private functions for our media object

    function mediaSuccess() {
        app.my_media.stop() ;
        app.my_media.release() ;
        app.consoleLog(fName, "mediaSuccess") ;
    }
    function mediaError(err) {
        app.my_media.stop() ;
        app.my_media.release() ;
        var msg = "undefined" ;
        switch(status) {
            case 1:     msg = "MEDIA_ERR_ABORTED" ;         break ;
            case 2:     msg = "MEDIA_ERR_NETWORK" ;         break ;
            case 3:     msg = "MEDIA_ERR_DECODE" ;          break ;
            case 4:     msg = "MEDIA_ERR_NONE_SUPPORTED" ;  break ;
            default:    msg = "MEDIA_ERR_undefined" ;
        }
        app.consoleLog(fName, "mediaError:err.code: " + err.code + ": " + msg + " ; " + "mediaError:err.message: " + err.message) ;
    }
    function mediaStatus(status) {
        var msg = "undefined" ;
        switch(status) {
            case 0:     msg = "MEDIA_NONE" ;        break ;
            case 1:     msg = "MEDIA_STARTING" ;    break ;
            case 2:     msg = "MEDIA_RUNNING" ;     break ;
            case 3:     msg = "MEDIA_PAUSED" ;      break ;
            case 4:     msg = "MEDIA_STOPPED" ;     break ;
            default:    msg = "MEDIA_undefined" ;
        }
        app.consoleLog(fName, "mediaStatus: " + status + " = " + msg) ;
    }

    app.consoleLog(fName, "exit");
} ;



app.pauseCordovaAudio = function() {
    "use strict";
    var fName = "app.pauseCordovaAudio():";
    app.consoleLog(fName, "entry");

    if( window.cordova && cordova.file ) {                  // if Cordova file plugin present
        try {
            app.my_media.pause() ;
        }
        catch (e) {
            app.consoleLog(fName, "catch, failure");
        }
    }
    else
        app.missingPluginAlert(fName) ;                     // no file plugin, in a browser?

    app.consoleLog(fName, "exit");
} ;



app.stopCordovaAudio = function() {
    "use strict";
    var fName = "app.stopCordovaAudio():";
    app.consoleLog(fName, "entry");

    if( window.cordova && cordova.file ) {                  // if Cordova file plugin present
        try {
            app.my_media.stop() ;
            app.my_media.release() ;
        }
        catch (e) {
            app.consoleLog(fName, "catch, failure");
        }
    }
    else
        app.missingPluginAlert(fName) ;                     // no file plugin, in a browser?

    app.consoleLog(fName, "exit");
} ;



// HTML5 audio
// see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

app.playHtml5AudioButton = function() { app.playHtml5Audio(this.getAttribute("data-id")); } ;
app.playHtml5Audio = function(id) {
    "use strict" ;
    var fName = "app.playHtml5Audio():" ;
    app.consoleLog(fName, "entry") ;

    if( window.tinyHippos && id == "id_audio-url" )
        app.emulateAlert(fName) ;

    else {
        var a = document.getElementById(id) ;
        a.play() ;
    }

    app.consoleLog(fName, "exit") ;
} ;



app.pauseHtml5AudioButton = function() { app.pauseHtml5Audio(this.getAttribute("data-id")); } ;
app.pauseHtml5Audio = function(id) {
    "use strict" ;
    var fName = "app.pauseHtml5Audio():" ;
    app.consoleLog(fName, "entry") ;

    var a = document.getElementById(id) ;
    a.pause() ;

    app.consoleLog(fName, "exit") ;
} ;



app.restartHtml5AudioButton = function() { app.restartHtml5Audio(this.getAttribute("data-id")); } ;
app.restartHtml5Audio = function(id) {
    "use strict" ;
    var fName = "app.restartHtml5Audio():" ;
    app.consoleLog(fName, "entry") ;

    var a = document.getElementById(id) ;
    a.load() ;

    app.consoleLog(fName, "exit") ;
} ;

    


// just a bunch of helper functions

app.emulateAlert = function(fName) {
    var str = "This demo component plays an mp3 file. The Emulate tab only supports wav and ogg files. Please test using Intel App Preview or in a built app." ;
    alert(str) ;
    app.consoleLog(fName, str) ;
} ;

app.debugAlert = function(fName) {
    var str = "This demo component is incompatible with the Debug tab. Please test it in a built app." ;
    alert(str) ;
    app.consoleLog(fName, str) ;
} ;

app.thirdPartyAlert = function(fName) {
    var str = "This feature uses a third party audio plugin. Third party plugins are not supported in the Emulate tab or Intel App Preview. Please build the app to test this feature." ;
    alert(str) ;
    app.consoleLog(fName, str) ;
} ;

app.missingPluginAlert = function(fName) {
    var str = "This feature requires a Cordova plugin that is not present. You may be running in a browser or forgot to include the plugin in your app configuration." ;
    alert(str) ;
    app.consoleLog(fName, str) ;
} ;


function showModal() {
        $('body').loadingModal({text: 'Please Wait Loading...'});

        
    }
function hideModal(){
    $('body').loadingModal('destroy');
}
function showModaltimed() {
        $('body').loadingModal({text: 'Please Wait Loading...'});

        var delay = function(ms){ return new Promise(function(r) { setTimeout(r, ms) }) };
        var time = 2000;

        delay(time)
                
                
                .then(function() { $('body').loadingModal('animation', 'fadingCircle').loadingModal('backgroundColor', 'gray'); return delay(time);})
                
                .then(function() { $('body').loadingModal('hide'); return delay(time); } )
                .then(function() { $('body').loadingModal('destroy') ;} );
    }
function activateclickedmenu(clickedlink){
    $('#'+clickedlink).addClass("activemenu");
    
   
}
function showbacktotop(){
    $('body').prepend('<a href="#" class="back-to-top"><span class="fa fa-chevron-up"></span></a>');
     var amountScrolled = 300;

     $(window).scroll(function () {
         if ($(window).scrollTop() > amountScrolled) {
             $('a.back-to-top').fadeIn('slow');
         } else {
             $('a.back-to-top').fadeOut('slow');
         }
     });
     $('a.back-to-top').click(function () {
         $('html, body').animate({
             scrollTop: 0
         }, 700);
         return false;
     });
}
 function showmenu(){
     
     showbacktotop();
        
     if ($("#menudiv")){
         if (getAmplifyValue("menulistdata")){
             
             appendmenu();
         }else{
           if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
               setajaxheaders();
              $.getJSON(getAmplifyValue("apiUrl")+"/api/menus", function() {
     
})
    .done(function(menudata) {
                 setAmplifyValue("menulistdata",menudata);
            appendmenu();
                 
             })
    .error(function(error) {
                 
               navigator.notification.alert("An Error Occured",function(){},"","OK");
             }) 
           }
             
             
             
             
         }
    
     
     }
    
}
//camera
function appendmenu(){
	hideImageDiv();
	$("#shownetworkstatus").hide();
    $("#menudiv").html('<div id="footer" class="footer"><div class="col-xs-12 navbar-inverse navbar-inverse-footer navbar-fixed-bottom"><div class="row"  id="bottomNav"></div></div></div>');
             $.each(getAmplifyValue("menulistdata"), function(key, menulist){
                 menuid=menulist.url;
                 menuid=menuid.split('.').join("");
                 //alert(menuid);
                 $("#bottomNav").append('<div class="col-xs-2 text-center">'+
                                         '<a href="'+menulist.url+'" ><i class="'+menulist.fontAwesomeCssIconClass+'" id="'+menuid+'" >'+
                                         '</i><br><i class="hidden-xs">'+menulist.title+'</i></a></a>'+
                                         '</div>'); 
                 
               
                 setAmplifyValue(menulist.url, menulist.title);
                 setAmplifyValue(menulist.url+"-iframeUrl", menulist.iFrameUrl);
                 setAmplifyValue(menulist.url+'-info', menulist.subTitle);
                $.each(menulist.childMenus, function(key,othermenus){
                         setAmplifyValue(othermenus.url, othermenus.title);
                          setAmplifyValue(othermenus.url+'-info', othermenus.subTitle);
						  setAmplifyValue(othermenus.url+"-iframeUrl", othermenus.iFrameUrl);

                     });
                
             }); 
                
}
    
   

 function onPhotoDataSuccess(imageData) {
     var id=getRandomInt(1000,1499);
$("#imagegallery").append('<div id="'+id+'" class="col-md-6 col-xs-6 col-sm-6"><img   src="data:image/jpeg;base64,'+imageData+'"  class="img-responsive img-rounded"/><br></div>');
	       imagesurls.push({
                keyid: id,
                url: "data:image/jpeg;base64," + imageData
            });
            
	      
var div=id;
      var storename=id;
            $("#"+id).append('<br><a class="btn btn-u btn-u-xs rounded-2x" onclick="removemedia(\'' + div+ '\',\''+storename+'\')"><span class="fa fa-remove"></span> Remove Photo</a>');
	    }

	 

	    // Called when a photo is successfully retrieved

	    //

	    function onPhotoURISuccess(imageURI) {

	      // Uncomment to view the image file URI

	      // console.log(imageURI);

	 

	      // Get image handle

	      //
            
         
	    
            var id=getRandomInt(500,1500);
         $("#imagegallery").append('<div id="'+id+'" class="col-md-6 col-xs-6 col-sm-6"><img  src="'+imageURI+'"  class="img-responsive img-rounded" id="'+id+'"/><br></div>');
             imagesurls.push({
                keyid: id,
                url:  imageURI
            });
            
            // alert(imagesurls);
           //uploadPhoto(imageURI);
            var div=id;
      var storename=id;
            $("#"+id).append('<br><a class="btn btn-u btn-u-xs rounded-2x" onclick="removemedia(\'' + div+ '\',\''+storename+'\')"><span class="fa fa-remove"></span> Remove Image</a>');
           
            
    
	    }

	    // A button will call this function

	    //

	    function capturePhoto() {

	      // Take picture using device camera and retrieve image as base64-encoded string
         var count=0;
            $.each(imagesurls , function(key, urls){
               count=count+1;
               
           });
	      //alert(count);
           if (count>=getAmplifyValue("maximumimages")){
                   navigator.notification.alert("you have selected the maximum images",function(){}, "Sorry..", "OK");
            }else{
	      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,

	        destinationType: destinationType.DATA_URL });

	    }

}

function getPhotoprofile(source) {

	      // Retrieve image file location from specified source
            var count=0;
            $.each(imagesurls , function(key, urls){
               count=count+1;
               
           });
	      //alert(count);
           if (count>=1){
                   navigator.notification.alert("You Have Selected Maximum Number of Images",function(){},"Image Selection Status","OK");
            }else{
                  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,

	        destinationType: destinationType.FILE_URI,
            sourceType: source,
             }); 
               }
	    }
	    function getPhoto(source) {

	      // Retrieve image file location from specified source
            var count=0;
            $.each(imagesurls , function(key, urls){
               count=count+1;
               
           });
	      //alert(count);
           if (count>=getAmplifyValue("maximumimages")){
                   navigator.notification.alert("Sorry..only "+getAmplifyValue("maximumimages")+ " can be uploaded.",function(){},"Image Selection Status","OK");
            }else{
                  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,

	        destinationType: destinationType.FILE_URI,
            sourceType: source,
             }); 
               }
	    }
       
	 

	    // Called if something bad happens.

	    //

	    function onFail(message) {
			if(message.toLowerCase()!="no image selected")
	      		navigator.notification.alert("Selection Failed because "+message,function(){},"Image Selection Status","OK"); 
	    }



///upload image

function uploadToServer(imageURI,serverUrl) {

 var options = new FileUploadOptions();
 options.fileKey = "file";
 options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
 
 options.chunkedMode = false;
var headers={
	 'Zumo-Api-Version':getAmplifyValue("Zumo-Api-Version"),
	 'ChurchID': getAmplifyValue("churchID"),
	 'API_Key': '1234'
};
options.headers = headers;
var ft = new FileTransfer();
    
    ft.onprogress = function(progressEvent) {
    $('body').loadingModal({text: 'Please Wait Uploading Files...'});
    
};
 ft.upload(imageURI, serverUrl, function(result){
 //alert(JSON.stringify(result));
 var remainingcalls=getAmplifyValue("filetransfercall")-1;
setAmplifyValue("filetransfercall",remainingcalls);
 if(remainingcalls<1){
    imagesurls=[];
    setAmplifyValue("videourl", null);
    setAmplifyValue("audiourl", null);
   //$('body').loadingModal('destroy');
   window.location.reload(); 
        
                }
 }, function(error){
 if (navigator){
      navigator.notification.alert("File could not be uploaded. Please try again later",function(){},"File Upload Status","OK");
     $('body').loadingModal('destroy');
     
 }
    
 }, options);
 }

//upload image 2
//capture video functions
// capture callback
function capturevideo(){
   
  var captureSuccess = function(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        // do something interesting with the file
    }
      window.resolveLocalFileSystemURI(path, function(fileEntry) {
        fileEntry.file(function(fileObj) {
            if (fileObj.size>20000000){
             navigator.notification.alert("File Exceeds the maximum allowed size of 20MB",function(){},"Video Size Limit","OK");
            }else{
        setAmplifyValue("videourl",null);
        $("#videoplayer").html("<video controls id='topicvideo' ><source src='"+path+"'></video>");
       setAmplifyValue("videourl",path);
      //$("#topicvideo").video();
      
      var div="videoplayer";
      var storename="videourl";
       $("#videoplayer").append('<hr><a class="btn btn-u btn-u-xs rounded-2x" onclick="removemedia(\'' + div+ '\',\''+storename+'\')"> <span class="fa fa-remove"></span> Remove Video</a>'); 
            }
        });
    });
      
};

// capture error callback
var captureError = function(error) {
    navigator.notification.alert('Video Capture Error', null, 'Capture Error');
};

// start video capture
navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});  
}
function captureaudio(){
  var captureSuccess = function(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        // do something interesting with the file
    }
      $("#audioplayer").html("<audio controls id='topicaudio'><source src='"+path+"'></source></audio>");
      setAmplifyValue("audiourl",path);
      var div="audioplayer";
      var storename="audiourl";
       $("#audioplayer").append('<br><a class="btn btn-u btn-u-xs rounded-2x" onclick="removemedia(\'' + div+ '\',\''+storename+'\')"><span class="fa fa-remove"></span> Remove audio</a>');
      //alert(path);
};

// capture error callback
var captureError = function(error) {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
};

// start video capture
navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1});  
}
function removemedia(div,storename){
    $('#'+div).hide();
    setAmplifyValue(storename, null);
    $.each(imagesurls, function(key,urls){
        //alert(key);
        if(urls.keyid==div){
           imagesurls.splice(key,1);
        }
        
    });
    
   //alert(imagesurls);


    //alert(amplify.store(storename));
}
function setajaxheaders(){
$.ajaxSetup({
  headers : {
    'Content-Type' : 'application/json',
    'Zumo-Api-Version' : getAmplifyValue("Zumo-Api-Version"),
    'ChurchID': getAmplifyValue("churchID"),
    'Language': navigator.language,
    'UserID': getAmplifyValue("userID")?getAmplifyValue("userID"):'0',
    'utc_offset': getutc(),
	'API_Key': '1234'
  },
  timeout: 30000,
  
}); 
       
}

function initializeAppSettingsWithCallBack(someFunction){
//Recreate amplify if it's null
if(!getAmplifyValue("apiUrl")){
	setPermanentAmplifyValue("churchPrefix", "ft");
	setPermanentAmplifyValue("churchID", "1");
	setAmplifyValue("Zumo-Api-Version","2.0.0");
	setAmplifyValue("apiUrl","https://churchwebservices.blessededge.com");
	setAmplifyValue("senderID","340681154272");
	setAmplifyValue("googlemapsapikey","AIzaSyD9QXOQ-AQYzJH3Wad6iGCH51bewQZff_k");    
		if (getAmplifyValue("aboutchurch")){
			someFunction();
		}else{
			if (getAmplifyValue("networkstatus")=="none"){
				   ShowPopUp();
			   }else{

					setajaxheaders();
		  $.getJSON(getAmplifyValue("apiUrl")+"/api/churchdetails", function() {

	})
	  .done(function(settings) {
		  setAmplifyValue("aboutchurch", settings);
		  setAmplifyValue('churchtitle',settings.title );
		  setAmplifyValue('logourl',settings.logo);
		  someFunction();
		})
	  .error(function(error) {

		})   
			   }

		}
	}
	else{//Do nothing there is a value in amplify
		someFunction();
	}
}


function setAmplifyValue(key, value){
    key=amplify.store("churchPrefix")+'_'+key;
    amplify.store(key, value, {expires: 86400000});
    amplifystoragearray.push({
                key: key,
                value:  value
            });
}
function setPermanentAmplifyValue(key, value){
    key=amplify.store("churchPrefix")+'_'+key;
    amplify.store(key, value);
    amplifystoragearray.push({
                key: key,
                value:  value
            });
}
function getAmplifyValue(key){
     key=amplify.store("churchPrefix")+'_'+key;
     return amplify.store(key);
}
function deleteAmplify(){
    $.each(amplifystoragearray, function(key, storagearray){
       amplify.store(storagearray.key, null); 
    });
}
function ShowPopUp(){
   
    $("body").append('<button id="btnmodal2" class="btn btn-primary hidden" data-toggle="modal" data-target="#networkmodal2"></button><div class="modal fade" id="networkmodal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Sorry..</h4></div><div class="modal-body"><p> No internet connection detected. </p><p>The requested data cant be displayed. Please check connectivity, and try again later</p></div><div class="modal-footer"><a type="button" class="btn-lg btn-danger btn-block text-center"  href="offline.html">Ok</a></div></div></div></div>');
     
    $("#btnmodal2").trigger("click");
     
}
function search_array(array,keyField,valueToFind) {
    for (i = 0; i < array.length; i++) {
        if (array[i][keyField] == valueToFind) {
            return array[i];
        }
    }
    return -1;
}
function getmapsscripttag(){
    
        $('head').append('<script type="application/javascript" src="https://maps.googleapis.com/maps/api/js?key='+getAmplifyValue("googlemapsapikey")+'&callback=initMap"></script>');
   
    
}
function logOut()
{
    navigator.notification.confirm(
    'Are you sure you want to log out?', // message
     function(buttonindex){
         if(buttonindex==1){
            var azureClient = new WindowsAzure.MobileServiceClient(getAmplifyValue("apiUrl"));
    azureClient.logout().then(function () {
    window.cookies.clear(function() {
        
    });
});
        //Clear amplify values
        setPermanentAmplifyValue("user_data",null);
        setPermanentAmplifyValue('isValidEmail',null);
        setPermanentAmplifyValue('loggedInEmail',null);
        setPermanentAmplifyValue("isAdmin",null);
        setPermanentAmplifyValue("userID",null)
        window.location.href = "index.html"; 
         }
     },            // callback to invoke with index of button pressed
    'Log Out',           // title
    ['Ok','Cancel']     // buttonLabels
);
   
}
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function getutc(){
 var date=new Date();
 var timeoffset= date.getTimezoneOffset();
return timeoffset;
  
}

var mediaType;



function declarevariables() {
    
    mediaType = navigator.camera.MediaType;
   // this is declaring the mediatype on device ready,for use in the  selecting 
}
function getvideo(){
navigator.camera.getPicture(on2PhotoURISuccess, on2Fail, { quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    mediaType: Camera.MediaType.VIDEO
  });
}
function on2PhotoURISuccess(path) {
    var videolink=path;
    if(window){
        window.resolveLocalFileSystemURI(videolink, function(fileEntry) {
        alert("loading resolvelocalfile");
        fileEntry.file(function(fileObj) {
           if (fileObj.size>20000000){
             navigator.notification.alert("File Exceeds the maximum allowed size of 20MB",function(){},"Video Size Limit","OK");
            }
            else{
        setAmplifyValue("videourl",null);
        $("#videoplayer").html("<video controls id='topicvideo' ><source src='"+path+"'></video>");
       setAmplifyValue("videourl",videolink);
      //$("#topicvideo").video();
      
      var div="videoplayer";
      var storename="videourl";
       $("#videoplayer").append('<hr><a class="btn btn-u btn-u-xs rounded-2x" onclick="removemedia(\'' + div+ '\',\''+storename+'\')"> <span class="fa fa-remove"></span> Remove Video</a>'); 
            }
           //alert("Size = " + fileObj.size);
        });
    });
    }else{
        alert("cant load window function");
    }
     
     
}

function on2Fail(message) {
   navigator.notification.alert('Video Capture Error', null, 'Capture Error');
}
function saveimage(){
	navigator.notification.confirm('Are You Sure You Want To Save Image?', function(results){
		if (results==1){
			window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
     navigator.notification.alert(
    'Image Saved Successfully',  // message
    function(){},         // callback
    'Status',            // title
    'Ok'                  // buttonName
);
        },
        function(err){
            navigator.notification.alert(
    'Image was not saved',  // message
    function(){},         // callback
    'Sorry...',            // title
    'Ok'                  // buttonName
); 
        },
        document.getElementById('myCanvas')
    );
		}
	}, 'Save Image', ['Ok','Cancel']                // defaultText
);
	
}
var closedialog;
function viewimages(imageurl,imagetitle){
	$("#showImage").show();
    var imagesdialog = $("#showImage");
   imagesdialog.attr("title", imagetitle);


 var c=document.getElementById('myCanvas');
	var img=new Image();
	img.src=imageurl;
	c.width = img.width;
    c.height =img.height;
	if(c){
		var cxt=c.getContext('2d');
img.onload = function() { 
    cxt.drawImage(img,0,0,c.width, c.height);
};

	}else{
		navigator.notification.alert("undefined canvas");
	}
imagesdialog.dialog({
    width: "100%",
   autoOpen: false,
    open: function() {
        closedialog = 1;
        $(document).bind('click', overlayclickclose);
    },
    focus: function() {
        closedialog = 0;
    },
    close: function() {
        $(document).unbind('click', overlayclickclose);
    },

});
    imagesdialog.dialog('open');
    closedialog = 0;
}


function overlayclickclose() {
    if (closedialog) {
        $("#showImage").dialog('close');
    }

    //set to one because click on dialog box sets to zero 
    closedialog = 1;
}
function hideImageDiv(){
	$("#showImage").hide();
}
function share(message, title){
    pluginShareOptions.subject=title;
    pluginShareOptions.message=message;
    
    
    
var onSuccess = function(result) {
}

var onError = function(msg) {
navigator.notification.alert("An error occured",function(){},"Status","OK");
}

window.plugins.socialsharing.shareWithOptions(pluginShareOptions, onSuccess, onError);
   
    
    
}
function getFileExtension(name){
  var found = name.lastIndexOf('.') + 1;
  return (parseInt(found) > 0 ? name.substr(found) : "");
}

function getMomentDate(inputDate){
	return moment(inputDate).format("LL");
}

function getMomentDateWithNoYear(inputDate){
	return moment(inputDate).format("MMMM DD");
}
function getMomentTopicDate(inputDate){
	return moment(inputDate).subtract(0,'days').calendar();
}
function getMomentTopicDetailDate(inputDate){
		return moment(inputDate).subtract(0,'days').calendar();

}
function getMomentTopicDetailTopDate(inputDate){
	return moment(inputDate).format("LLLL");
}
