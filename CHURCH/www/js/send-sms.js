showmenu();
 $("#logoimage").attr('src',getAmplifyValue('logourl'));
var app = {
    sendSms: function() {
        var number = document.getElementById('numberTxt').value;
        var message = document.getElementById('messageTxt').value;
        console.log("number=" + number + ", message= " + message);

        //CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                //intent: 'INTENT'  // send SMS with the native android SMS messaging
                intent: '' // send SMS without open any other app
            }
        };

        var success = function () { navigator.notification.alert('Message sent successfully'); };
        var error = function (e) { navigator.notification.alert('Message Failed:' + e); };
        sms.send(number, message, options, success, error);
    }
};