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
    $("#titlegroupspage").html(getAmplifyValue("groups.html"));
    if(getAmplifyValue('group.html-info')!==undefined){
        $("#pagedescription").html(getAmplifyValue('group.html-info'));
       //alert(getAmplifyValue('aboutus.html-info'));
    }
    activateclickedmenu("groupshtml");
    if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
    setajaxheaders();
     $.getJSON(getAmplifyValue("apiUrl")+"/api/groups?s=g", function() {
     
})
  .done(function(groupsdata) {
         var count=0;
         $.each(groupsdata, function(key, groupslist){
             count=count+1;
             var divclass="";
if (count % 2 === 0)
{
  divclass='groupsdiv1';
}
else
{
  divclass='groupsdiv2';
}
             $("#accordion").append('<div class="row  '+divclass+'">'+
      
          '<div class="col-xs-12 col-sm-12">'+
            '<a data-toggle="collapse" data-parent="#accordion" href="#'+count+'" ><h4> '+groupslist.title+' <span class="fa fa-chevron-down pull-right"></span></h4></a>'+  
        '</div>'+
      '</div>');
             
             
             $("#accordion").append('<div id="'+count+'" class="panel-collapse collapse bg-color-white">'+
			'<div class="service-block-v7 thumbnails thumbnail-style padding-bottom-0">'+
            '<img src="'+groupslist.logoPath+'" class="img-responsive img-rounded"></div>'+
			'<div class="container">'+groupslist.description+'</div>'+
            '<div class="list-group">'+(groupslist.leader!==null?
            '<a class="list-group-item"><span class="fa fa-user"></span>&nbsp; ' +groupslist.leader+'</a>':'')+(groupslist.phoneNumber!==null ?
            '<a class="list-group-item" href="tel:'+groupslist.phoneNumber+'"> <span class="fa fa-phone"></span>&nbsp; '+groupslist.phoneNumber+'</a>':'')+(groupslist.email!==null ?
            '<a class="list-group-item" href="mailto:'+groupslist.email+'"><span class="fa fa-envelope"></span>&nbsp; ' +groupslist.email+'</a>':'')+
                                    '</div>'+
            '');
         });
     })
     .fail(function(error) {
    navigator.notification.alert(JSON.stringify(error));
  })
  .always(function() {
       
  });}
 });
});