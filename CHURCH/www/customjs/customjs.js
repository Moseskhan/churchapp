var tokenID="";
var client;         // Connection to the Azure Mobile App backend
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
       
        function onEvent(){
            
        }
        document.addEventListener("online", onEvent, false);
        setAmplifyValue("deviceplatform",device.platform.toLowerCase());
       
        client = new WindowsAzure.MobileServiceClient(getAmplifyValue("apiUrl"));
        // Initialize Push Notifications
      
            var push = PushNotification.init({
    android: {
        "senderID": getAmplifyValue("senderID")
    },
    ios: {
        "alert": "true",
        "badge": "true",
        "sound": "true"
    },
    windows: {}
});

push.on('registration', function(data) {
    alert("registration id -"+data.registrationId);
    
    var pns = 'gcm'; // the default
    if (device.platform.toLowerCase() === 'ios') pns = 'apns';
    if (device.platform.toLowerCase() === 'windows') pns = 'wns';
    
    //Call webservice to handle registrations
    var apiOptions = {
            method: 'POST',
            body: {
                pushChannel: data.registrationId,
                platForm: device.platform.toLowerCase(),
                tags: ['all']
            },
            headers:{
                "ChurchID":getAmplifyValue("churchID"),
                "userID": getAmplifyValue("userID")?getAmplifyValue("userID"):'0'
            }
        };

        var success = function (results) {
            //alert('Push Registered');
        };
        var failure = function (error) {
            //alert('Push Failed: ' + error.message);
        };

        client.invokeApi("register", apiOptions).then(success, failure);
});
            
 push.on('notification', function(data) {
    // do something with the push data
    // data.message,
    // data.title,
    // data.count,
    // data.sound,
    // data.image,
    // data.additionalData
    // then call finish to let the OS know we are done
    if(navigator)
        navigator.notification.alert(data.message,function(){},data.title,"OK");
     else
         alert(data.message);
    push.finish(function() {
        //No need to implement anything here
    }, function() {
        //This is the error callback function. We will call the error webservice here when its ready.
  }, data.additionalData.notId);
});
push.on('error', function(e) {
    alert(e.message);
    //Will call web service for error handling here later on
});
        
    }
};
app.initialize();
