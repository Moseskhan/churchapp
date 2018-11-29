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
    $("#titlemorepage").html(getAmplifyValue("more-menu.html"));
    if(getAmplifyValue('more-menu.html-info')!==undefined){
        $("#pagedescription").html(getAmplifyValue('more-menu.html-info'));
       //alert(getAmplifyValue('aboutus.html-info'));
    }
    activateclickedmenu("more-menuhtml");
    $.each(getAmplifyValue("menulistdata"),function(key, menulinks){
       
        if (menulinks.childMenus.length > 0){
           // alert("load more menu links here");
             
            $.each(menulinks.childMenus, function(keychild, morelinks){
                
                $("#moremenulist").append('<div class="col-xs-6 col-sm-6">'+
           '<div class="text-center"><a href="'+morelinks.url+'" class="btn btn-u btn-u-xs rounded-2x"><span class="'+morelinks.fontAwesomeCssIconClass+' "></span></a></div>'+
              ''+
              '<div class="text-center"><h5 class="shortTextOneLine"><strong><a class="" href="'+morelinks.url+'">'+morelinks.title+'</a></strong></h5></div>'+
           '</div>');
            });
        }
    });
});
});