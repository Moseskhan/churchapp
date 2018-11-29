$(document).on({
    ajaxStart: function() {
    
        showModal();
       },
    ajaxStop: function () {
        hideModal();
    }
});
$(document).ready(function()
                  {    
initializeAppSettingsWithCallBack(loadHomepageData);    
});

function loadHomepageData(){
    if ($("#menus")){
         if (getAmplifyValue("homemenulistdata")){
             loadMenu();
             if(getAmplifyValue("clickedlink")){
                 $("#"+getAmplifyValue("clickedlink")).addClass("activemenu");
             }else{
                 getAmplifyValue("clickedlink", "link1");
                 $("#"+getAmplifyValue("clickedlink")).addClass("activemenu");
             }
            $("#logoimage").attr('src',getAmplifyValue('logourl')); 
         }else{
           if (getAmplifyValue("networkstatus")=="none"){
               ShowPopUp();
           }else{
               setajaxheaders();
              $.getJSON(getAmplifyValue("apiUrl")+"/api/HomeMenu/", function() {
     
})
    .done(function(menudata) {
                 setAmplifyValue("homemenulistdata",menudata);
                  loadMenu();              
             })
    .error(function(error) {
                 
               navigator.notification.alert("An Error Occured",function(){},"","OK");
             }) 
    .always(function(){
    $("#logoimage").attr('src',getAmplifyValue('logourl'));  
              });
           }
             
         }
    
     
     }
}

function loadMenu(){
    var i=1;
    var open=false;
  $.each(getAmplifyValue("homemenulistdata"), function(key, menulist){
      if(i===1 ||  open===true){
            $("#menus").append('<div class="row">');
            open = false;
      }                 $("#menus").append('<div class="col-sm-4 col-md-6 col-xs-4 md-margin-bottom-50">'+
                    '<a href="'+menulist.url+'"><div class="features">'+
                    '<div class="counters">'+
                    '<span class="features-info text-center color-light shortTextTwoLines">'+menulist.title+'</span>'+
                    '</div>'+
                    '</div></a>'+
                '</div>');
                 setAmplifyValue(menulist.url, menulist.title);
       setAmplifyValue(menulist.url+"-iframeUrl", menulist.iFrameUrl);
            if(i%3 === 0)
                {
                $("#menus").append('</div>');
                open=true;
                }
      
                i++;
             });  
}