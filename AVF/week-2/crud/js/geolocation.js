/**
 * @author Lucy Hutcheson
 * Created for:  Advanced Visual Frameworks 1206
 */

/****************************************************************
 * 
 * Geolocation Page                                       *
 * 
 ****************************************************************/

        $(window).ready(function(){  
            $("#btnInit").click(initiate_geolocation);  
        });  
  
        function initiate_geolocation() {  
            navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors);  
        }  
  
        function handle_errors(error)  
        {  
            switch(error.code)  
            {  
                case error.PERMISSION_DENIED: alert("user did not share geolocation data");  
                break;  
  
                case error.POSITION_UNAVAILABLE: alert("could not detect current position");  
                break;  
  
                case error.TIMEOUT: alert("retrieving position timed out");  
                break;  
  
                default: alert("unknown error");  
                break;  
            }  
        }  
  
        function handle_geolocation_query(position){  
            alert('Lat: ' + position.coords.latitude +  
                  ' Lon: ' + position.coords.latitude);  
        }  

function handle_geolocation_query(position)  
{  
    var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," +  
                    position.coords.longitude + "&zoom=14&size=300x400&markers=color:blue|label:S|" +  
                    position.coords.latitude + ',' + position.coords.longitude;  
  
    jQuery("#map").remove();  
    jQuery(document.body).append(  
        jQuery(document.createElement("img")).attr("src", image_url).attr('id','map')  
    );  
}  
