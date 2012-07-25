/**
 * @author Lucy Hutcheson
 * Created for:  Advanced Visual Frameworks 1207
 */




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
                                   'Import, Create New, Cancel'          // buttonLabels
                                   );
};

// process the confirmation dialog result
var onConfirmContact = function (buttonIndex) {
    
    if (buttonIndex === 1) {
        document.location.href='additem.html#import';		
    } else if (buttonIndex === 2){
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
                         var getFirstName = $("#contact-firstname").val();
                         var getLastName = $("#contact-lastname").val();
                         var name = $("#contact-firstname").val() + ' ' + $("#contact-lastname").val();
                         var type = "list";
                         
                         // Launch my search for my contact!
                         contactSearch(name, type);
                         
                         });



// Watch and Pick up my selected contact to import ---------------------------------------------
//
$('#selectContactForm input:radio[name=selectedContact]').live('click', function () {
        var checked = $('#selectContactForm input:radio[name=selectedContact]:checked').val();
        //$('#importDisplay #importContact').attr('onclick', 'contactSearch('+checked+',"import")');

        $('#importDisplay #importContact').click(function(event) {
             contactSearch(checked, "import");
             event.preventDefault();
        });
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
        navigator.contacts.find(filter, onContactList, onContactError, options);
    } else if (type === "import") {
        // load the selected contact
        navigator.contacts.find(filter, onContactImport, onError, options);
    }
    
};




// Display list of current contacts ---------------------------------------------
//
function onContactList(contacts) {
    
    $('<ul/>').addClass('formItems')
    .appendTo('#importDisplay #content #selectContactForm');
    
    for (var i=0; i<contacts.length; i++) {
        console.log("Formatted: " + contacts[i].name.formatted + "\n" + 
                    "Family Name: "  + contacts[i].name.familyName + "\n" + 
                    "Given Name: "  + contacts[i].name.givenName + "\n" + 
                    "Middle Name: "  + contacts[i].name.middleName + "\n" + 
                    "Suffix: "  + contacts[i].name.honorificSuffix + "\n" + 
                    "Prefix: "  + contacts[i].name.honorificPrefix);
        
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
}



// onSuccess: Populate the fields to save
//
function onContactImport(contacts) {
        
    for (var i=0; i<contacts.length; i++) {
        /*console.log("Formatted: " + contacts[i].name.formatted + "\n" + 
                    "Family Name: "  + contacts[i].name.familyName + "\n" + 
                    "Given Name: "  + contacts[i].name.givenName + "\n" + 
                    "Middle Name: "  + contacts[i].name.middleName + "\n" + 
                    "Suffix: "  + contacts[i].name.honorificSuffix + "\n" + 
                    "Prefix: "  + contacts[i].name.honorificPrefix);*/
        $('#firstname').val(contacts[i].name.givenName);
        $('#lastname').val(contacts[i].name.familyName);

        if (contacts[i].addresses != null) {
            /*for (var j=0; j<contacts[i].addresses.length; j++) {
                console.log("Pref: " + contacts[i].addresses[j].pref + "\n" +
                        "Type: " + contacts[i].addresses[j].type + "\n" +
                        "Formatted: " + contacts[i].addresses[j].formatted + "\n" + 
                        "Street Address: "  + contacts[i].addresses[j].streetAddress + "\n" + 
                        "Locality: "  + contacts[i].addresses[j].locality + "\n" + 
                        "Region: "  + contacts[i].addresses[j].region + "\n" + 
                        "Postal Code: "  + contacts[i].addresses[j].postalCode + "\n" + 
                        "Country: "  + contacts[i].addresses[j].country);
            }*/
            $('#street').val(contacts[i].addresses[0].streetAddress);
            $('#city').val(contacts[i].addresses[0].locality);
            $('#state').val(contacts[i].addresses[0].region);
            $('#zip').val(contacts[i].addresses[0].postalCode);
       }

        if (contacts[i].phoneNumbers !== null) {
            for (var k=0; k<contacts[i].phoneNumbers.length; k++) {
                $('#phone').val(contacts[i].phoneNumbers[0].value);
            }
        }

        if (contacts[i].emails !== null) {
            for (var m = 0; m < contacts[i].emails.length; m++) {
                var email = contacts[i].emails[m].type + " : " +
                contacts[i].emails[m].value;
                $('#email').val(contacts[i].emails[0].value);
            }
        }
        

        if (contacts[i].birthday !== null) {
            var birthday = new Date(contacts[i].birthday);
            $('#birthmonth option:eq('+(birthday.getMonth()+1)+')').attr("selected", "selected");
            $('#birthday').val(birthday.getDate()).attr("selected", "selected");
            $('#birthyear').val(birthday.getFullYear()).attr("selected", "selected");
        }
        
        //Set Radio to Imported
        $('input:radio[name=contact]:nth(2)').attr('checked',true);
    }
    
    document.location.href='additem.html#add-new';		
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


