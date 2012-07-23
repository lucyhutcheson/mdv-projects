/**
 * @author Lucy Hutcheson
 * Created for:  Advanced Visual Frameworks 1207
 */

/****************************************************************
 * 
 * Geolocation Page                                       *
 * 
 ****************************************************************/

$(window).ready(function(){  
    getLocation();  
});  


var x=document.getElementById("text");

var getLocation = function () {
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
    else{x.innerHTML="Geolocation is not supported by this browser.";}
};

var showPosition = function (position) {
    
    $('<div/>').attr('id','mapcanvas').attr('style', 'height:400px;').addClass('map-canvas').appendTo('#content');

  
  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeControl: false,
    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
  
  var marker = new google.maps.Marker({
      position: latlng, 
      map: map, 
      title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
  });
  
};



var showError = function (error) {
    $('<div/>').attr('id', 'x').appendTo('#content');
    switch(error.code) 
    {
        case error.PERMISSION_DENIED:
            $('#x').html("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            $('#x').html("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            $('#x').html("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            $('#x').html("An unknown error occurred.");
            break;
    }
};




  
 
	