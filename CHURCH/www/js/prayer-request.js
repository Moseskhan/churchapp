showmenu();
//hide for anonymous data
function hideanonymous(){

   if($("input:checkbox[name=anonymousstatus]:checked").val()==="yes"){
      $("#prayersidentity").html("");
      }else{
         $("#prayersidentity").html('<div id="prayersidentity">'+
          '<div class="row">'+
              '<div class="col-xs-12 col-sm-6 col-md-6"><div class="form-group input-group"><input type="text" id="firstname" class="form-control" placeholder="First Name" required>'+
              '<span class="input-group-addon"><span class="fa fa-tag"></span></span>'+
              '</div></div>'+
              '<div class="col-xs-12 col-sm-6 col-md-6">'+
              '<div class="form-group input-group"><input type="text" id="lastname" class="form-control" placeholder="Last Name" required><span class="input-group-addon"><span class="fa fa-tag"></span></span></div>'+
              '</div>'+
             '</div><div class="form-group input-group">'+
             '<input type="email" id="email" class="form-control" placeholder="Email" required><span class="input-group-addon"><span class="fa fa-envelope"></span></span>'+
             '</div>'+
             '<div class="form-group input-group"><input type="number" id="phonenumber" class="form-control" placeholder="Phone Number" required><span class="input-group-addon"><span class="fa fa-phone"></span></span>'+
             '</div><fieldset>'+
            '<h5> Ok To Contact  <label for="stateyes"><input type="radio" name="stateofcontacting" id="stateyes" value="true" checked>&nbsp;&nbsp;Yes&nbsp;&nbsp;</label><label for="stateno"><input type="radio" name="stateofcontacting" id="stateno" value="false">&nbsp;&nbsp;No&nbsp;&nbsp;</label></h5></fieldset></div>');
          
      }
}

//show new prayer request area
function shownewprayerarea(){
       $("#prayerarea").fadeIn();
     $('#btnaddnewprayer').attr('onclick', 'hidenewprayerarea()');
     $('#btnaddnewprayer').html('<span class="fa fa-plus-circle"></span> Add New <span class="fa fa-chevron-up"></span>');
   }
//hide new prayer request area
function hidenewprayerarea(){
    $("#prayerarea").fadeOut();
     $('#btnaddnewprayer').attr('onclick', 'shownewprayerarea()');
    $('#btnaddnewprayer').html('<span class="fa fa-plus-circle"></span> Add New <span class="fa fa-chevron-down"></span>')
}
//start post prayer
function getprayerdata(){
    if($("input:checkbox[name=anonymousstatus]:checked").val()==="yes"){
       var prayer={
        churchID: getAmplifyValue("churchID"),
        prayerDetails: $('#prayerdetails').val(),
        okToContact: false,    
    } 
        
    }else{
        var prayer={
        churchID: getAmplifyValue("churchID"),
        firstName: $("#firstname").val(),
        lastName: $("#lastname").val(),
        email: $("#email").val(),
        phoneNumber: $('#phonenumber').val(),
        prayerDetails: $('#prayerdetails').val(),
        okToContact: $("input:radio[name=stateofcontacting]:checked").val(),
        
        
    }
    }
    
postprayer(prayer);
    
}
function postprayer(prayerdetail){
    //showModal();
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
  setajaxheaders();
  $.ajax({
      
    url: getAmplifyValue("apiUrl")+"/api/prayerrequests",
    type: 'post',
   
    data: JSON.stringify(prayerdetail),
    success: function(prayerdetails) {
     hidenewprayerarea();
        var btnclass="btn btn-danger"
       var statusofcontacting;
      if(prayerdetails.okToContact===true){
          statusofcontacting="Yes";
      }else{
          statusofcontacting="No";
      }
    	$("#prayerrequestslist").html("");
		$("#prayerrequestslist").prepend('<div class="alert alert-success col-md-12 col-xs-12">'+
                                    '<h5>Thank you for submitting your prayer request. Our wonderful team will pray for you and your situation</h5>'+
                                    '</div>');


    $("#postprayerform").trigger("reset");; 
     //hideModal();   
             
    },
    error: function (error) {
     navigator.notification.alert(JSON.stringify(error));
    }
  });
}
}
$(document).on({
    ajaxStart: function() {showModal() },
     ajaxStop: function() { hideModal() }    
});
$(document).ready(function()
{
    initializeAppSettingsWithCallBack(function(){    
	$('#part1 input[type=checkbox]').click(function(){});
     $("#churchname").html(getAmplifyValue('churchtitle'));
    $("#logoimage").attr('src',getAmplifyValue('logourl'));
    $("#titleprayerspage").html(getAmplifyValue("prayer-request.html"));
    if(getAmplifyValue('prayer-request.html-info')!==undefined){
        $("#pagedescription").html(getAmplifyValue('prayer-request.html-info'));
       //alert(getAmplifyValue('aboutus.html-info'));
    }
    activateclickedmenu("more-menuhtml");
  $("#postprayerform").submit(function( event ) {
      if($("#anonymousstatus").val()){
          if ($("#prayerdetails").val()){
             getprayerdata();
          }else{
              navigator.notification.alert("Please Fill all required Fields",function(){},"Warning!","OK");
          }
      }else{
          if ($("#firstname").val() && $("#lastname").val() && $("#email").val() && validateEmail($("#email").val()) && $("#phonenumber").val()){
            
      getprayerdata();
  }else{
       navigator.notification.alert("Please Fill all required Fields",function(){},"Warning!","OK");
  }
      }
  
  
   
    
    event.preventDefault();
});
 
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }
    else{
        if(getAmplifyValue('isValidEmail') && getAmplifyValue('isValidEmail') === "true" && getAmplifyValue("loggedInEmail") && getAmplifyValue("userID") &&  getAmplifyValue("userID")!="0"){
                setajaxheaders();
                loadPrayerRequestData(getAmplifyValue("userID"));
                    }
                else
                {
                    shownewprayerarea();
                }
           }
		
	
function loadPrayerRequestData(userID){
    //OK the user is logged in lets see whether he has access to any groups. This will be done
    //in the webservice.
    $.getJSON(getAmplifyValue("apiUrl")+"/api/prayerrequests?u="+userID, function() {
     
})
  .done(function(prayerrequestdata) {
      if(prayerrequestdata.length == 0)
      {
          shownewprayerarea();
          return;
      }
    
     var count=0;
      
  $.each(prayerrequestdata, function( key, prayerdetails) {
       count=count+1;
  var btnclass='';  
if (count % 2 === 0)
{
  btnclass='btn btn-u rounded-2x  btn-u-xs';
}
else
{
  btnclass='btn btn-u rounded-2x btn-u-xs';
}
      var statusofcontacting;
      if(prayerdetails.okToContact===true){
          statusofcontacting="Yes";
      }else{
          statusofcontacting="No";
      }
   
     $("#prayerrequestslist").append('<div class="panel panel-u">'
					+'<div class="panel-heading"><h3 class="panel-title"> <i class="fa fa-user"></i>' +
					 (prayerdetails.firstName ? (prayerdetails.firstName+' '+prayerdetails.lastName):'Anonymous Request')+
								'</h3></div>'+
								'<div class="panel-body">'+
									 '<div><span class="color-green">'+getMomentTopicDetailTopDate(prayerdetails.dateCreated)+'</span></div>'+
		 '<div class="list-group">'+
		(prayerdetails.email ? ('<p class="list-group-item"><strong>Email:</strong> <a href="mailto:'+prayerdetails.email+'">'+prayerdetails.email+'</a></p>'):'')+
        (prayerdetails.phoneNumber ? ('<p class="list-group-item"><strong>Phone Number:</strong> <a href="tel:'+prayerdetails.phoneNumber+'">'+prayerdetails.phoneNumber+'</a></p>'):'')+
	    (prayerdetails.prayerDetails ? ('<p class="list-group-item"><strong>Request:</strong> '+prayerdetails.prayerDetails+'</p>'):'')+
		'<p class="list-group-item"><strong>Okay To Contact:</strong> '+statusofcontacting+'</p>'+
									'</div></div></div>');
      
    });
 // hideModal();
  })
  .fail(function(error) {
    navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
       
  });
}

});
});
