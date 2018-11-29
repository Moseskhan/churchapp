$(document).on({
    ajaxStart: function() {
    
        showModal();
       },
    ajaxStop: function () {
        hideModal();
    }
});
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
$(document).ready(function(){
	  showmenu();
    showModal();
    
  $("#logoimage").attr('src',getAmplifyValue('logourl'));
  var pageUrl;
  if (getUrlVars()["show"]){
      if (getUrlVars()['show']=="true"){
          $("#page-header").removeClass("hidden");
	  }
	  pageUrl="websiteViewer.html?id="+getUrlVars()["id"]+"&show="+getUrlVars()["show"];
	}
	else{
        pageUrl=  "websiteViewer.html?id="+getUrlVars()["id"];
      }
	 $("#iframeWebsite").attr("src",getAmplifyValue(pageUrl+"-iframeUrl"));
	
	 $("#titlewebviewpage").html(getAmplifyValue(pageUrl)); 
    
    $('#iframeWebsite').on('load', function () {
            hideModal();
        });

});