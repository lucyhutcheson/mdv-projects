/**
 * @author Lucy Hutcheson
 * Created for:  Advanced Visual Frameworks 1207
 */


var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

// Wait for PhoneGap to connect with the device
//
document.addEventListener("deviceready",onDeviceReady,false);

// PhoneGap is ready to be used!
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    
}

/****************************************************************
 * 
 * CAMERA FUNCTIONALITY                                         *
 * 
 ****************************************************************/
var confirmPic = function () {
    navigator.notification.confirm(
                                   'Please select',  // message
                                   onConfirmPic,              // callback to invoke with index of button pressed
                                   'Photo',            // title
                                   'Take a Picture, Choose Pic, Cancel'          // buttonLabels
                                   );
};
// process the confirmation dialog result
var onConfirmPic = function (buttonIndex) {
    // Take a Picture was chosen
    if (buttonIndex === 1) {
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
        
        // Choose from Library was chosen
    } else if (buttonIndex === 2) {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
                                    destinationType: destinationType.FILE_URI,
                                    sourceType: pictureSource.PHOTOLIBRARY });
    }
};


// Called when a photo is successfully retrieved
//
var onPhotoDataSuccess = function (imageData) {
    // Uncomment to view the base64 encoded image data
     console.log('pic taken: ' + imageData);
    $('#pic').val(imageData);
    $('#picture').attr('style', 'width:25%;').attr('src', imageData);
};

// Called when a photo is successfully retrieved
//
var onPhotoURISuccess = function (imageURI) {
    // Uncomment to view the image file URI 
     console.log(imageURI);
    $('#picture').attr('style', 'block').attr('src', imageURI);
    $('#pic').val(imageURI);
};

// Called if something bad happens.
// 
var onFail = function (message) {
    alert('Failed because: ' + message);
};




