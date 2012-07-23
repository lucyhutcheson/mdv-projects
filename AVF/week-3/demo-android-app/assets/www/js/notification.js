/**
 * @author Lucy Hutcheson
 * Created for:  Advanced Visual Frameworks 1207
 */

// Wait for PhoneGap to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() {
    // Empty
}

$("#alert").on('click', function() {
               showAlert();
               playBeep();
               });

var showAlert = function () {
        navigator.notification.alert(
                                     'You have been alerted!',  
                                     alertDismissed,
                                     'Notification',            
                                     'Done'                  
        );
}
var alertDismissed = function () {
    
}


// process the confirmation dialog result
var onConfirm = function (button) {
}

// Show a custom confirmation dialog
//
var showConfirm = function () {
    navigator.notification.confirm(
                                   'You are the winner!',  // message
                                   onConfirm,              // callback to invoke with index of button pressed
                                   'Game Over',            // title
                                   'Restart,Exit'          // buttonLabels
                                   );
}

// Beep three times
//
var playBeep = function () {
    navigator.notification.beep(3);
}

// Vibrate for 2 seconds
//
var vibrate = function () {
    navigator.notification.vibrate(2000);
}






