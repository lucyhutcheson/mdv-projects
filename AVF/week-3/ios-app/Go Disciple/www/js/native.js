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
                                   'Take a Picture, Choose Pic'          // buttonLabels
                                   );
};
// process the confirmation dialog result
var onConfirmPic = function (buttonIndex) {
    // Take a Picture was chosen
    if (buttonIndex === 1) {
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
        
        // Choose from Library was chosen
    } else {
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



/****************************************************************
 * 
 * CONTACTS FUNCTIONALITY                                       *
 * 
 ****************************************************************/

var confirmContact = function () {
    navigator.notification.confirm(
                                   'Please select',  // message
                                   onConfirmContact,              // callback to invoke with index of button pressed
                                   'New Disciple',            // title
                                   'Import, Create New'          // buttonLabels
                                   );
};

// process the confirmation dialog result
var onConfirmContact = function (buttonIndex) {
    
    if (buttonIndex === 1) {
        document.location.href='#import';		
    } else {
        document.location.href='additem.html';		
    }
};


/****************************************************************
 * 
 * Import Contacts Page                                        *
 * 
 ****************************************************************/
$('#importDisplay').live('pagehide', function () {
                  $('#importDisplay #content .formItems').remove();
                  });
$('#importDisplay').live('pageshow', function () {
                         var getFirstName = $("#firstname").val();
                         var getLastName = $("#lastname").val();
                         
                         // specify contact search criteria
                         var options = new ContactFindOptions();
                         options.filter= getFirstName + " " + getLastName;          // empty search string returns all contacts
                         options.multiple=true;      // return multiple results
                         filter = ["displayName", "name"];   // return contact.displayName field
                         
                         // find contacts
                         navigator.contacts.find(filter, onContactSuccess, onError, options);
                         
                         
                         //$('#importDisplay #importContact').attr('href', 'additem.html?contact='+discipleId+'&op=edit');
                         $('#importDisplay #importContact').attr('onclick', 'importContact()');
                         });




// onSuccess: Get a snapshot of the current contacts
//
function onSuccess(contacts) {
    for (var i=0; i<contacts.length; i++) {
        console.log("Formatted: " + contacts[i].name.formatted);
    }
}

// onError: Failed to get the contacts
//
function onError(contactError) {
    alert('onError!');
}




// onSuccess: Display list of current contacts
//
function onContactSuccess(contacts) {
    
    $('<div/>').addClass('formItems')
    .appendTo('#importDisplay #content #selectContactForm');

    for (var i=0; i<contacts.length; i++) {
        console.log("Formatted: " + contacts[i].name.formatted + "\n" + 
              "Family Name: "  + contacts[i].name.familyName + "\n" + 
              "Given Name: "  + contacts[i].name.givenName + "\n" + 
              "Middle Name: "  + contacts[i].name.middleName + "\n" + 
              "Suffix: "  + contacts[i].name.honorificSuffix + "\n" + 
              "Prefix: "  + contacts[i].name.honorificPrefix);

           var contactString = $('<div data-role="fieldcontain"><fieldset data-role="controlgroup">' +
                    '<input type="checkbox" name="selectedContact" id="selectedContact" value="' + contacts[i].name.formatted + '"/>' +
                    '<label for="selectedContact">' + contacts[i].name.formatted + '</label></fieldset>'+
                    '</div>').appendTo('#importDisplay #selectContactForm .formItems');
    }
    document.location.href='#importDisplay';		
}


// Get selected contact information
var importContact = function () {

    // Get name of checked contact
    var checked = $('input:checkbox:checked').val();

    
    // Import from Contacts
    var options = new ContactFindOptions();
    options.filter= checked;
    var filter = ["displayName","name","addresses", "phoneNumbers", "emails"];

    navigator.contacts.find(filter, onFindSuccess, onContactError, options);
};

// onSuccess: Populate the fields to save
//
function onFindSuccess(contacts) {
    for (var i=0; i<contacts.length; i++) {
        alert("Formatted: " + contacts[i].name.formatted + "\n" + 
                    "Family Name: "  + contacts[i].name.familyName + "\n" + 
                    "Given Name: "  + contacts[i].name.givenName + "\n" + 
                    "Middle Name: "  + contacts[i].name.middleName + "\n" + 
                    "Suffix: "  + contacts[i].name.honorificSuffix + "\n" + 
                    "Prefix: "  + contacts[i].name.honorificPrefix);
        
           for (var j=0; j<contacts[i].addresses.length; j++) {
                alert("Pref: " + contacts[i].addresses[j].pref + "\n" +
                      "Type: " + contacts[i].addresses[j].type + "\n" +
                      "Formatted: " + contacts[i].addresses[j].formatted + "\n" + 
                      "Street Address: "  + contacts[i].addresses[j].streetAddress + "\n" + 
                      "Locality: "  + contacts[i].addresses[j].locality + "\n" + 
                      "Region: "  + contacts[i].addresses[j].region + "\n" + 
                      "Postal Code: "  + contacts[i].addresses[j].postalCode + "\n" + 
                      "Country: "  + contacts[i].addresses[j].country);
            }
        for (var k=0; k<contacts[i].phoneNumbers.length; k++) {
            alert("Type: " + contacts[i].phoneNumbers[k].type + "\n" + 
                  "Value: "  + contacts[i].phoneNumbers[k].value + "\n" + 
                  "Preferred: "  + contacts[i].phoneNumbers[k].pref);
        }

        for (var m = 0; m < contacts[i].emails.length; m++) {
            var email = contacts[i].emails[m].type + " : " +
            contacts[i].emails[m].value;
            alert(email);

        }
        /*$('#pageTitle').html('Edit Info');
        
        //populate the form fields with contact values
        $('#firstname').val(contacts[i].name.givenName);
        $('#lastname').val(contacts[i].name.familyName);
        $('#email').val(contactsArray[i].emails[1].value);
        $('#phone').val(item.phone[1]);
        $('#street').val(item.street[1]);
        $('#city').val(item.city[1]);
        $('#state').val(item.state[1]);
        $('#zip').val(item.zip[1]);
        $('select').selectmenu('refresh', true); */
        
        

    }
    //document.location.href='additem.html';		
}


// onError: Failed to get the contacts
//
function onContactError(contactError) {
    alert('onError!');
}

