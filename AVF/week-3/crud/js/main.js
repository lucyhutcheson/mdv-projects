/**
 * @author Lucy Hutcheson
 * Created for:  Advanced Visual Frameworks 1206
 */






/****************************************************************
 * 
 * List of Disciples Page                                       *
 * 
 ****************************************************************/
$('#disciples').live('pagehide', function (event) {
                     $('#discipleList').empty();
 					// Clear out old stuff
					sessionStorage.clear();
                    });

$('#disciples').live('pageshow', function (event) {

                     getLocalData();
                     $('#discipleList').listview();
                     $('#discipleList').listview('refresh');
                     });




/****************************************************************
 * 
 * View Single Disciple Page                                        *
 * 
 ****************************************************************/

$('#viewDisciple').live('pagehide', function (event) {
                        $('#viewDisciple #content .content-container').remove();
                        $('#viewDisciple #content .message').remove();

                        });

$('#viewDisciple').live('pageshow', function (event) {
                        
						
						// If saved to session storage, use this instead
                        if (checkSessionStorage() && (sessionStorage.length > 0)) {
							// Get session storage for andriod
							var viewSession = getSession();
							
                        	var discipleId = viewSession.id[1];
                        	
                       } else {
                        	
                        	// Get ID from url parameter
                        	var discipleId = getUrlVars()["id"];   

                        }
                         
                        var value = localStorage.getItem(discipleId);
                        // convert the string back to an object
                        var obj = JSON.parse(value);
                        
                        $('<div/>').addClass('content-container ui-btn  ui-li ui-corner-top ui-corner-bottom ui-btn-up-c '+discipleId)
                        .appendTo('#viewDisciple #content');
                        
                        var lessonString = $('<div data-role="collapsible" data-theme="g">' +
                                             '<h3>' + obj.firstname[1] + ' ' + obj.lastname[1] + '</h3>' +
                                             '<p><strong>Email:</strong> ' + obj.email[1] + '</p>' +
                                             '<p><strong>Phone:</strong> ' + obj.phone[1] + '</p>' +
                                             '<p><strong>Address:</strong> ' + obj.street[1] + '<br/>' +
                                             obj.city[1] + ', ' + obj.state[1] + ' ' + obj.zip[1] + '</p>' +
                                             '<p><strong>Birthday:</strong> ' + obj.birthmonth[1] + ' ' +
                                             obj.birthday[1] + ', ' + obj.birthyear[1] + '</p>' +
                                             '<p><strong>School Status:</strong> ' + obj.schoolstatus[1] + '</p>' +
                                             '<p><strong>Gender:</strong> ' + obj.gender[1] + '</p>' +
                                             '<p><strong>Born Again Birthday:</strong> ' + obj.bornagain[1] + '</p>' +
                                             '<p><strong>Frequency:</strong> ' + obj.frequency[1] + '</p>' +
                                             '<p><strong>Notes:</strong> ' + obj.notes[1] + '</p>' +
                                             '</div>').appendTo('#viewDisciple #content div.'+discipleId);
                                                
						// If saved to session storage, use this instead
                        if (checkSessionStorage() && (sessionStorage.length > 0) && (viewSession.op[1] === 'save')) {
	                        	$('#viewDisciple #content div.' + discipleId).before('<div class="message">Disciple info successfully saved.</div>');
	                        
                       } else {

 	                   		if (getUrlVars()["op"]  === "save") {
	                       		$('#viewDisciple #content div.' + discipleId).before('<div class="message">Disciple info successfully saved.</div>');
	                        }
                        }
                        
                        $('#viewDisciple #edit').attr('href', 'additem.html?id='+discipleId+'&op=edit');

                        //$('#viewDisciple #edit').attr('onclick', 'saveSession('+ discipleId +', "edit", "")');

                        });

var checkSessionStorage = function () {
	   return window.sessionStorage;
	}



/****************************************************************
 * 
 * Add New Disciple Page                                        *
 * 
 ****************************************************************/
$('#add-new').live('pageinit', function (event) {
                   $('#discipleid-container').hide();
                   });
$('#add-new').live('pageshow', function (event) {
                   var op = getUrlVars()["op"];
                   var discipleId = getUrlVars()["id"];
                   if(op === 'edit') {
                   $('input[name=gender').removeAttr('checked');
                   //Change submit button value to edit button
                   $('#pageTitle').text('Edit Disciple');
                   editDisciple(discipleId);
                   }
                   $('#submit').on('click', validateForm);
                   
                   });



/****************************************************************
 * 
 * FUNCTIONS		                                            *
 * 
 ****************************************************************/

// Get Lessons and Build list
var getLocalData = function () {
    $('#errors').empty(); //Reset error messages
    
    if (localStorage.length > 0) {
        // Create list items from sorted storage array
        for (var i=0, len=localStorage.length; i<len; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            // convert the string back to an object
            var obj = JSON.parse(value);
            
            // $ Create list items
            $('#disciples #discipleList').append(
                                                 $('<li>').append(
                                                                  $('<a>').attr("href", "#viewDisciple?id="+key).attr('rel', 'external').attr("data-transition", "slide").append(
                                                                                                                                                                                 $('<h4>').addClass(key).attr("data-transition", "slide").text(obj.firstname[1] + ' ' + obj.lastname[1])
                                                                                                                                                                                 )
                                                                  )
                                                 );
        }
        
        // Sort my lesson list after it has been created
        var mylist = $('#discipleList');
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
        
        $('#discipleList').listview();
        $('#discipleList').listview('refresh');
        
    } else {
        $('#disciples #discipleList').append(
                                             $('<li>').attr('data-theme', 'a').append(
                                                                                      $('<h4>').text("There are currently no disciples saved.")
                                                                                      )
                                             );		
    }
    
};




// EDIT FUNCTION
var editDisciple = function (discipleId) {
    $('#pageTitle').html('Edit Info');
    
    console.log(discipleId);
    //Grab the data from local storage
    var value = localStorage.getItem(discipleId);
    var item = JSON.parse(value);
    
    //populate the form fields with current values
    $('#firstname').val(item.firstname[1]);
    $('#lastname').val(item.lastname[1]);
    $('#email').val(item.email[1]);
    $('#phone').val(item.phone[1]);
    $('#street').val(item.street[1]);
    $('#city').val(item.city[1]);
    $('#state').val(item.state[1]);
    $('#zip').val(item.zip[1]);
    $('select').selectmenu('refresh', true); 
    
    $('#birthmonth').val(item.birthmonth[1]);
    $('#birthday').val(item.birthday[1]);
    $('#birthyear').val(item.birthyear[1]);
    $('select').selectmenu('refresh', true); 
    
    $('#schoolstatus').val(item.schoolstatus[1]);
    $('select').selectmenu('refresh', true); 
    $('input[value="'+item.gender[1]+'"]').attr('checked', true).checkboxradio('refresh');
    
    $('#bornagain').val(item.bornagain[1]);
    $('#frequency').val(item.frequency[1]);
    $('select').selectmenu('refresh', true); 
    $('#notes').val(item.notes[1]);
    $('#disciple-id').val(discipleId);
};



// GET RADIO FUNCTION
var getRadio = function () {
    return($('input:radio[name=gender]:checked').val());
};



// SET RADIO FUNCTION
var setRadio = function (myRadio) {
    switch(myRadio)
    {
		case "Male":
			$('input:radio[name=gender]:nth(0)').attr('checked', true);
			$('input:radio[name=gender]').checkboxradio('refresh');
			break;
		case "Female":
			$('input:radio[name=audience]:nth(1)').attr('checked', true);
			$('input:radio[name=audience]').checkboxradio('refresh');
			break;
    }
};




// VALIDATE FUNCTION
var validateForm = function (e) {
    var getFirstName = $("#firstname").val();
    var getLastName = $("#lastname").val();
    var getEmail = $("#email").val();
    var formErrors = $('#formErrors');
    
    //Reset error messages
    $(".error").hide();
    var hasError = false;
    $('#errors').empty();
    $('#firstname').css("border", "none") ;
    $('#lastname').css("border", "none") ;
    $('#email').css("border", "none") ;
    
    //Get Error messages
    var messageArray = [];
    //First Name validation
    if (getFirstName === "") {
        $('#firstname').after('<span class="error">Please enter a first name.</span>');
        $('#firstname').css("border", "1px solid red") ;
        hasError = true;
    }
    //Last Name validation
    if (getLastName === "") {
        $('#lastname').after('<span class="error">Please enter a last name.</span>');
        $('#lastname').css("border", "1px solid red") ;
        hasError = true;
    }
    //Email validation
    //var re = /^\w+([\-]?]\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //if ((getEmail === '') || (!re.test(getEmail))) {
        //$('#email').after('<span class="error">Please enter a valid email address.</span>');
        //$('#email').css("border", "1px solid red") ;
        //hasError = true;
    //} 
    
    //Email validation
    var atpos=getEmail.indexOf("@");
    var dotpos=getEmail.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=getEmail.length) {
        $('#email').after('<span class="error">Please enter a valid email address.</span>');
        $('#email').css("border", "1px solid red") ;
        hasError = true;
    } 

    //Set Errors
    if (hasError === true) {
        showAlert();
        $('body,html').animate({scrollTop:0}, 800);
        e.preventDefault();
        return false;
        
    } else {
        //If all is validated, save the data and send the key value from editData
        storeData();
    }
};



// STORE FUNCTION
var storeData = function () {
    
    // Get Lesson Id of existing lesson to edit
    if( $('#disciple-id').val().length > 0 ) {
        var id = $('#disciple-id').val();
    } else {
        var id = Math.floor(Math.random()*10000001);
    }
    
    // Gather up all form values and labels.
    //Find the value of the selected radio button.
    var newItem = {};
    newItem.firstname =  ["First Name:", $('#firstname').val()];
    newItem.lastname = ["Last Name:", $('#lastname').val()];
    newItem.email = ["Email: ", $('#email').val()];
    newItem.phone = ["Phone:", $('#phone').val()];
    newItem.street = ["Street:", $('#street').val()];
    newItem.city = ["City:", $('#city').val()];
    newItem.state = ["State:", $('#state').val()];
    newItem.zip =  ["Zip:", $('#zip').val()];
    newItem.birthmonth = ["Birth Month:", $('#birthmonth').val()];
    newItem.birthday = ["Birth Date:", $('#birthday').val()];
    newItem.birthyear = ["Birth Year:", $('#birthyear').val()];
    newItem.schoolstatus = ["School Status:", $('#schoolstatus').val()];
    newItem.gender = ["Gender:", getRadio()];
    newItem.bornagain = ["Born Again Date:", $('#bornagain').val()];
    newItem.frequency = ["Contact Frequency:", $('#frequency').val()];
    newItem.notes = ["Notes:", $('#notes').val()];
    
    //Save data into local storage
    localStorage.setItem(id, JSON.stringify(newItem));        
	saveSession(id, "save", "#viewDisciple");

    //document.location.href='index.html#viewDisciple?id='+id+'&op=save';	
    document.location.href='index.html#viewDisciple';	
    
};


// Save info to session so that Android doesn't break on url parameters
var saveSession = function (id, op, page) {
	// Clear out old stuff
    sessionStorage.clear();

    // Save id and op in session variable for android
    var sessionInfo = {};
    sessionInfo.id = ["ID:", id];
    sessionInfo.op = ["Op: ", op];
    sessionInfo.page = ["Page: ", page];
    sessionStorage.setItem('store', JSON.stringify(sessionInfo));
    
}
var getSession = function () {
    var sessionInfo = sessionStorage.getItem('store');
    var viewSession = JSON.parse(sessionInfo);
    return viewSession;
}



// CLEAR ALL FUNCTION
$("#clear").on('click', function () {
	if (localStorage.length === 0) {
		alert("There is no data to clear.");
	} else {
		var ask = confirm("Are you sure you want to delete all lessons?");
		if (ask) {
			localStorage.clear();
			alert("All information deleted.");
			window.location.href = "index.html";
			return false;
		} else {
			alert("Lesson was NOT deleted.");
		}
	}
});


// DELETE FUNCTION
$("#delete").on('click', function () {

	// Native Notification Feature, uncommented in Xcode
	//showConfirm();
	
	var ask = confirm("Are you sure you want to delete this lesson?");
	if (ask) {
        var discipleId = getUrlVars()["id"];
		localStorage.removeItem(discipleId);
		alert("Lesson was successfully deleted.");
		
		// If there are no more disciples left, redirect to home.
		if (localStorage.length === 0) {
			window.location.href = "index.html";
		} else {
			// Otherwise, send me back to my list of disciples.
			parent.history.back();
		}
	} else {
		alert("Lesson was NOT deleted.");
	}
});
	


// NOTIFICATION ----------------------------------------

// process the confirmation dialog result
var onConfirm = function (buttonIndex) {
    if (buttonIndex === 1) {
        alert("Disciple was NOT deleted.");
    } else {
        var discipleId = getUrlVars()["id"];
        localStorage.removeItem(discipleId);
        
        alert("Disciple was successfully deleted.");
        if (localStorage.length === 0) {
            window.location.href = "index.html";
        } else {
            parent.history.back();
        }
    }
};



// Show a custom confirmation dialog
//
var showConfirm = function () {
   navigator.notification.beep(3);
   navigator.notification.confirm(
                                   'Are you sure you want to delete this disciple?',  // message
                                   onConfirm,              // callback to invoke with index of button pressed
                                   'Delete',            // title
                                   'No go back, Yes I\'m sure'          // buttonLabels
                                   );
};

var alertDismissed = function () {
    // do something
};
var showAlert = function () {
	if (navigator.notification) {
		// Android / BlackBerry WebWorks (OS 5.0 and higher) / iPhone
		//
		navigator.notification.alert(
		    'Please enter the required information.',  // message
		    alertDismissed,         // callback
		    'Error',            // title
		    'Done'                  // buttonName
		);
	
		// BlackBerry (OS 4.6) / webOS
		//
		navigator.notification.alert('Error: Please enter the required information.');
	} else {
		$('#addForm').before('<span class="error">Please correct the errors below.</span>');
	}

};



// Get value from URL
var getUrlVars = function () {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m,key,value) {
                                             vars[key] = value;
                                             });
    return vars;
};



