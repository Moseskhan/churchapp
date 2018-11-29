$(document).on({
    ajaxStart: function() {showModal() },
    ajaxStop: function() { hideModal() }    
});
function getcommentdata(){
    var contactdata={
        FirstName: $("#firstname").val(),
        LastName: $("#lastname").val(),
        Email: $("#email").val(),
        //Occupation: $("#occupation").val(),
        AddressLine1: $("#addressline1").val(),
        //AddressLine2: $("#addressline2").val(),
        City: $("#city").val(),
        State: $("#state").val(),
        CountryID: $("#countryid").val(),
        PhoneNumber: $("#phonenumber").val(),
        CategoryID: $("#groupcategory").val(),
        ContactText: $("#contacttext").val(),
        Share: "true"
        
    }
    
    postcommentdata(contactdata);
   
}
function postcommentdata(contactdata){
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
             setajaxheaders();
  $.ajax({
      
    url: getAmplifyValue("apiUrl")+"/api/contact",
    type: 'post',
   
    data: JSON.stringify(contactdata),
    success: function(feedbackdata) {
		$("#contactuscontent").html('');
        $("#contactuscontent").html('<div class="container"><div class="alert alert-success col-md-12 col-xs-12">'+
                                    '<h5>Thank you! We have received your message. If required someone from the church office will contact you.</h5>'+
                                    '</div></div>');
    },
    error: function(error){
       navigator.notification.alert(JSON.stringify(error)); 
    }
});  
               
           }
    
         }
$(document).ready(function()
                  {
    
    showmenu();
	initializeAppSettingsWithCallBack(function(){    
    
    $("#churchname").html(getAmplifyValue('churchtitle'));
       $("#logoimage").attr('src',getAmplifyValue('logourl'));
    $("#titlecontactpage").html(getAmplifyValue("Contact.html"));
	//alert("Page description is:"+getAmplifyValue('Contact.html-info'));
    if(getAmplifyValue('Contact.html-info')!==undefined){
        $("#pagedescription").html(getAmplifyValue('Contact.html-info'));
       //alert(getAmplifyValue('aboutus.html-info'));
    }
    activateclickedmenu("more-menuhtml");
    $("#postcontactform").submit(function( event ) {
        if($("#firstname").val() && $("#lastname").val() && $("#email").val() && validateEmail($("#email").val()) && $("#addressline1").val() && $("#city").val() && $("#state").val() && $("#countryid").val() && $("#phonenumber").val() && $("#groupcategory").val() && $("#contacttext").val()){
        if ($("#groupcategory").val()==0 || $("#countryid").val()==0 ){
             if (navigator){
              navigator.notification.alert("Please! Select Your Country or Ministry",function(){},"Fill All Fields","OK");
             
         }else{
             alert("Fill all fields to continue");
         }
        }else{
            getcommentdata();
        }
        
    }else{
        navigator.notification.alert("Please! Fill All Fields To Continue",function(){},"Fill All Fields","OK");
    }
        
        event.preventDefault();
    });
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
    setajaxheaders();
     $.getJSON(getAmplifyValue("apiUrl")+"/api/categories", function() {})
    .done(function(groups) {
         $.each(groups, function( key, groupslist ) {
        
         $("#groupcategory").append("<option value='"+groupslist.categoryID+"'>"+groupslist.description+"</option>");
              
    
      
   
});
        
     })
 .fail(function(error) {
    
    navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
       //hideModal();
    //alert( "complete" );
  });
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
  }); }
});
	});