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
                                   '',  // message
                                   onConfirmContact,              // callback to invoke with index of button pressed
                                   'Add Disciple',            // title
                                   'Import, Create New'          // buttonLabels
                                   );
};

// process the confirmation dialog result
var onConfirmContact = function (buttonIndex) {
    
    if (buttonIndex === 1) {
        document.location.href='contacts.html';		
    } else {
        document.location.href='additem.html';		
    }
};


/****************************************************************
 * 
 * DISPLAY Import Contacts Page                                 *
 * 
 ****************************************************************/
$('#importDisplay').live('pagehide', function () {
                  $('#importDisplay #content .formItems').remove();
                  });
$('#importDisplay').live('pageshow', function () {
                         var getFirstName = $("#firstname").val();
                         var getLastName = $("#lastname").val();
                         var name = $("#firstname").val() + ' ' + $("#lastname").val();
                         var type = "list";
                         // Launch my search for my contact!
                         contactSearch(name, type);
                         
                         });


// Watch and Pick up my selected contact to import ---------------------------------------------
//
$('#selectContactForm input:radio[name=selectedContact]').live('click', function () {
        //$('#importContact').toggleClass('disabled', !$('#selectContactForm input:checkbox:checked').length);
        var checked = $('#selectContactForm input:radio[name=selectedContact]:checked').val();
        $('#importDisplay #importContact').attr('href', 'additem.html?op=import&contact='+checked);
});



// Multi use search function ---------------------------------------------
//
var contactSearch = function (name, type) {
    
    // specify contact search criteria
    var options = new ContactFindOptions();
    options.filter= name;          // empty search string returns all contacts
    options.multiple=true;      // return multiple results

    var filter = ["displayName","name", "addresses", "phoneNumbers", "emails", "birthday", "photos"];
    
    if (type === "list") {
        // list all contacts
        navigator.contacts.find(filter, onContactList, onError, options);
    } else if (type === "import") {
        navigator.contacts.find(filter, onSuccess, onError, options);
        //importContact(name);
    }
    
};




// Display list of current contacts ---------------------------------------------
//
function onContactList(contacts) {
	 $('<ul/>').addClass('formItems')
	    .appendTo('#importDisplay #content #selectContactForm');

 if (contacts.length > 0) {

    for (var i=0; i<contacts.length; i++) {
        /*console.log("Formatted: " + contacts[i].name.formatted + "\n" + 
              "Family Name: "  + contacts[i].name.familyName + "\n" + 
              "Given Name: "  + contacts[i].name.givenName + "\n" + 
              "Middle Name: "  + contacts[i].name.middleName + "\n" + 
              "Suffix: "  + contacts[i].name.honorificSuffix + "\n" + 
              "Prefix: "  + contacts[i].name.honorificPrefix);*/

           var contactString = $('<li><div data-role="fieldcontain"><fieldset data-role="controlgroup">' +
                    '<input type="radio" name="selectedContact" id="selectedContact" value="' + contacts[i].name.formatted + '"/>' +
                    '<label for="selectedContact">' + contacts[i].name.formatted + '</label></fieldset>'+
                    '</div></li>').appendTo('#importDisplay #selectContactForm .formItems');
    }
    // Sort my list after it has been created
    var mylist = $('.formItems');
    var listitems = mylist.children('li').get();
    listitems.sort(function (a, b) {
                   var compA = $(a).text().toUpperCase();
                   var compB = $(b).text().toUpperCase();
                   // Currently set to descending date based on the > < symbols
                   // return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
                   // Set to < > to sort ascending
                   return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
                   });
    $.each(listitems, function (idx, itm) { 
           mylist.append(itm); 
           });
    
    $('.formItems').listview();
    $('.formItems').listview('refresh');

    document.location.href='#importDisplay';	
 } else {
     var contactString = $('<li>There are currently no contacts saved.</li>').appendTo('#importDisplay #selectContactForm .formItems');

 }
}



// Get selected contact information
function importContact(selectedContact) {
    //alert('importContact: ' + selectedContact);

    
    // Import from Contacts
    var obj = new ContactFindOptions();
    obj.filter= selectedContact;
    var fields = ["*"];
    var fields = ["displayName","name", "addresses", "phoneNumbers", "emails", "birthday", "photos"];
    //alert('importcontact again!!!');

    navigator.contacts.find(fields, onSuccess, onError, obj);
};

// onSuccess: Populate the fields to save
//
function onContactImport(contacts) {
    
    alert('onContactImport');
    
    for (var i=0; i<contacts.length; i++) {
       console.log("Formatted: " + contacts[i].name.formatted + "\n" + 
                    "Family Name: "  + contacts[i].name.familyName + "\n" + 
                    "Given Name: "  + contacts[i].name.givenName + "\n" + 
                    "Middle Name: "  + contacts[i].name.middleName + "\n" + 
                    "Suffix: "  + contacts[i].name.honorificSuffix + "\n" + 
                    "Prefix: "  + contacts[i].name.honorificPrefix);
            for (var j=0; j<contacts[i].addresses.length; j++) {
                console.log("Pref: " + contacts[i].addresses[j].pref + "\n" +
                            "Type: " + contacts[i].addresses[j].type + "\n" +
                            "Formatted: " + contacts[i].addresses[j].formatted + "\n" + 
                            "Street Address: "  + contacts[i].addresses[j].streetAddress + "\n" + 
                            "Locality: "  + contacts[i].addresses[j].locality + "\n" + 
                            "Region: "  + contacts[i].addresses[j].region + "\n" + 
                            "Postal Code: "  + contacts[i].addresses[j].postalCode + "\n" + 
                            "Country: "  + contacts[i].addresses[j].country);
            }
            for (var k=0; k<contacts[i].phoneNumbers.length; k++) {
                console.log("Type: " + contacts[i].phoneNumbers[k].type + "\n" + 
                            "Value: "  + contacts[i].phoneNumbers[k].value + "\n" + 
                            "Preferred: "  + contacts[i].phoneNumbers[k].pref);
            }
            for (var m = 0; m < contacts[i].emails.length; m++) {
                var email = contacts[i].emails[m].type + " : " +
                contacts[i].emails[m].value;
                console.log(email);
            }
        
        var birthday = new Date(contacts[i].birthday);
        console.log(birthday);
        
        
        //populate the form fields with contact values
        $('#firstname').val(contacts[i].name.givenName);
        $('#lastname').val(contacts[i].name.familyName);
        $('#email').val(contacts[i].emails[0].value);
        $('#phone').val(contacts[i].phoneNumbers[0].value);
        $('#street').val(contacts[i].addresses[0].streetAddress);
        $('#city').val(contacts[i].addresses[0].locality);
        $('#state').val(contacts[i].addresses[0].region);
        $('#zip').val(contacts[i].addresses[0].postalCode);
        $('select').selectmenu('refresh', true); 
        

    }
    document.location.href='#add-new';		
}


// onError: Failed to get the contacts
//
function onContactError(contactError) {
    alert('onError!');
}


// Default: Get a snapshot of the current contacts ---------------------------------------------
//
function onSuccess(contacts) {
    for (var i=0; i<contacts.length; i++) {
        console.log("Formatted: " + contacts[i].name.formatted);
    }
}

// Default onError: Failed to get the contacts ---------------------------------------------
//
function onError(contactError) {
    alert('onError!');
}


