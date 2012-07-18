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

function showAlert() {
        navigator.notification.alert(
                                     'You have been alerted!',  
                                     alertDismissed,
                                     'Notification',            
                                     'Done'                  
        );
}
function alertDismissed() {
    
}


// process the confirmation dialog result
function onConfirm(button) {
}

// Show a custom confirmation dialog
//
function showConfirm() {
    navigator.notification.confirm(
                                   'You are the winner!',  // message
                                   onConfirm,              // callback to invoke with index of button pressed
                                   'Game Over',            // title
                                   'Restart,Exit'          // buttonLabels
                                   );
}

// Beep three times
//
function playBeep() {
    navigator.notification.beep(3);
}

// Vibrate for 2 seconds
//
function vibrate() {
    navigator.notification.vibrate(2000);
}






