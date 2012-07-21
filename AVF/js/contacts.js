/****************************************************************
 * 
 * CONTACTS FUNCTIONALITY                                       *
 * 
 ****************************************************************/


// Wait for PhoneGap to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() {
    $('#contactsButton').attr('onclick', 'getContacts()');
}

if (!(onDeviceReady())) {
		alert("This device is not supported.");
}

// Get my contacts!
// 
var getContacts = function () {
	    $('#contactsList').empty();
	
	    // specify contact search criteria
	    var options = new ContactFindOptions();
	    options.filter= name;          // empty search string returns all contacts
	    options.multiple=true;      // return multiple results
	
	    var fields = ["displayName", "name"];
	    navigator.contacts.find(fields, onSuccess, onError, options);

};

// onSuccess: Get a snapshot of the current contacts
//
var onSuccess = function (contacts) {
    
    if (contacts.length > 0) {
           
        for (var i=0; i<contacts.length; i++) {
        
            var contactString = $('<li>' + contacts[i].name.formatted + '</li>').appendTo('#content #contactsList');
        }
    
        // Sort my list after it has been created
        var mylist = $('#contactsList');
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
    
        $('#contactsList').listview();
        $('#contactsList').listview('refresh');
    } else {
        var contactString = $('<li>There are currently no contacts saved.</li>').appendTo('#content #contactsList');
    }

};

// onError: Failed to get the contacts
//
var onError = function (contactError) {
    alert('onError!');
};
