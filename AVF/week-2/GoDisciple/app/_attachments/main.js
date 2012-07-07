/**
 * @author Lucy Hutcheson
 * Created for:  Advanced Visual Frameworks 1206
 */

$db = $.couch.db('godisciple');


$('#disciples').live('pagehide', function (event) {
	$('#disciples #header #title').remove();
	$('#discipleList').empty();
	var discipleUrl = '';
});

$('#disciples').live('pageshow', function (event) {
	var discipleUrl = "app/list";
	// Couch Database
	$db.view(discipleUrl, {
		"success": function(data) {
			//console.log(data);
			$.each(data.rows, function(index,disciple){
				var id = disciple.id.substr(9,disciple.id.length);
				var firstname = disciple.value.firstname;
				var lastname = disciple.value.lastname;
				$('#disciples #discipleList').append(
					$('<li>').append(
						$('<a>').attr("href", "#viewDisciple?id="+id).attr('rel', 'external').attr("data-transition", "slide").append(
							$('<h4>').addClass(id).attr("data-transition", "slide").text(firstname + ' ' + lastname)
							/*,$('<p>').addClass('date ui-li-aside ' + id).text(date)*/
						)
					)
				);
			});
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

			$('#disciples #discipleList').listview('refresh');
		}
	});
});

$('#viewDisciple').live('pagehide', function (event) {
	$('#viewDisciple #content .content-container').remove();
});

$('#viewDisciple').live('pageshow', function (event) {
	var discipleId = getUrlVars()["id"];
	var discipleUrl = '/godisciple/_all_docs?include_docs=true&key="disciple:'+discipleId+'"';
	$('<div></div>').addClass('content-container ui-btn  ui-li ui-corner-top ui-corner-bottom ui-btn-up-c '+discipleId).prependTo('#viewDisciple #content');

	$.ajax({
		"url": discipleUrl,
		"dataType": "json",
		"success": function(data) {
			//console.log(data);
			//var rev = data.rows[0].doc._rev;
			$.each(data.rows, function(index,disciple){
				var firstname = disciple.doc.firstname;
				var lastname = disciple.doc.lastname;
				var email = disciple.doc.email;
				var phone = disciple.doc.phone;
				var street = disciple.doc.street;
				var city = disciple.doc.city;
				var state = disciple.doc.state;
				var zip = disciple.doc.zip;
				var birthmonth = disciple.doc.birthmonth;
				var birthday = disciple.doc.birthday;
				var birthyear = disciple.doc.birthyear;
				var schoolstatus = disciple.doc.schoolstatus;
				var gender = disciple.doc.gender;
				var bornagain = disciple.doc.bornagain;
				var frequency = disciple.doc.frequency;
				var notes = disciple.doc.notes;
				var id = disciple.doc._id;
				var rev = disciple.doc._rev;
				//create the DOM insertion just like json data
				var lessonString = $('<div data-role="collapsible" data-theme="g">' +
				  '<h3>' + firstname + ' ' + lastname + '</h3>' +
				  '<p><strong>Email:</strong> ' + email + '</p>' +
				  '<p><strong>Phone:</strong> ' + phone + '</p>' +
				  '<p><strong>Street:</strong> ' + street + '</p>' +
				  '<p><strong>City:</strong> ' + city + '</p>' +
				  '<p><strong>State:</strong> ' + state + '</p>' +
				  '<p><strong>Zip:</strong> ' + zip + '</p>' +
				  '<p><strong>Birth Month:</strong> ' + birthmonth + '</p>' +
				  '<p><strong>Birth Date:</strong> ' + birthday + '</p>' +
				  '<p><strong>Birth Year:</strong> ' + birthyear + '</p>' +
				  '<p><strong>School Status:</strong> ' + schoolstatus + '</p>' +
				  '<p><strong>Gender:</strong> ' + gender + '</p>' +
				  '<p><strong>Born Again Birthday:</strong> ' + bornagain + '</p>' +
				  '<p><strong>Frequency:</strong> ' + frequency + '</p>' +
				  '<p><strong>Notes:</strong> ' + notes + '</p>' +
				  '</div>').appendTo('#viewDisciple #content .content-container');
				//Add ID's to Edit and Delete button
				$('#viewDisciple #edit').attr('href', 'additem.html?discipleId='+discipleId+'&op=edit');

			});
		},
		"error": function(result){
			console.log(result);
		} 
	});
});

$('#add-new').live('pageinit', function (event) {
	$('#discipleid-container').hide();
	$('#disciplerev-container').hide();
});
$('#add-new').live('pageshow', function (event) {
    var op = getUrlVars()["op"];
	var discipleId = getUrlVars()["discipleId"];
	if(op === 'edit') {
		$('input[name=gender').removeAttr('checked');
		//Change submit button value to edit button
		$('#pageTitle').text('Edit Disciple');
		editDisciple(discipleId);
	}
	$('#submit').on('click', validateForm);

});

// EDIT Function
function editDisciple(discipleId){
	var discipleUrl = '/godisciple/_all_docs?include_docs=true&key="disciple:'+discipleId+'"';
	$.ajax({
		"url": discipleUrl,
		"dataType": "json",
		"success": function(data) {
			//console.log(data);
			var rev = data.rows[0].doc._rev;
			$.each(data.rows, function(index,disciple){
				//populate the form fields with current values
				$('#firstname').val(disciple.doc.firstname);
				$('#lastname').val(disciple.doc.lastname);
				$('#email').val(disciple.doc.email);
				$('#phone').val(disciple.doc.phone);
				$('#street').val(disciple.doc.street);
				$('#city').val(disciple.doc.city);
				$('#state').val(disciple.doc.state);
				$('#zip').val(disciple.doc.zip);
				$('select').selectmenu('refresh', true); 
				
				$('#birthmonth').val(disciple.doc.birthmonth);
				$('#birthday').val(disciple.doc.birthday);
				$('#birthyear').val(disciple.doc.birthyear);
				$('select').selectmenu('refresh', true); 
					
				$('#schoolstatus').val(disciple.doc.schoolstatus);
				$('input[value="'+disciple.doc.gender+'"]').attr('checked', true).checkboxradio('refresh');
				$('#bornagain').val(disciple.doc.bornagain);
				$('#frequency').val(disciple.doc.frequency);
				
				// Refresh select lists
				$('select').selectmenu('refresh', true); 

				$('#notes').val(disciple.doc.notes);
				$('#disciple-id').val(disciple.doc._id);
				$('#disciple-rev').val(disciple.doc._rev);
			});
		},
		"error": function(result){
			console.log(result);
		} 
	});
}

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
	var re = /^\w+([\.-]?]\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if ((getEmail === '') || (!re.test(getEmail))) {
		$('#email').after('<span class="error">Please enter a valid email address.</span>');
		$('#email').css("border", "1px solid red") ;
		hasError = true;
	} 

	//Set Errors
	if (hasError === true) {
		$('#submit-container').before('<br/><span class="error">Please correct the errors above.</span>');
		$('body,html').animate({scrollTop:0}, 800);
		e.preventDefault();
		return false;
	} else {
		//If all is validated, save the data and send the key value from editData
		storeData();
	}
};

// STORE FUNCTION
function storeData() {
		
		// Get Lesson Id of existing lesson to edit
		if( $('#disciple-id').val().length > 0 ) {
			var discipleIdSet = $('#disciple-id').val();
		} else {
			var discipleIdSet = 'disciple:'+(($('#firstname').val().toLowerCase())+($('#lastname').val().toLowerCase())).replace( /\s/g, "").split(',').join('').replace(/[^a-zA-Z 0-9]+/g,'');
		}
		
		// Gather up all form values and labels.
		//Find the value of the selected radio button.
		var newDisciple = {};
			newDisciple._id = discipleIdSet;
			newDisciple.firstname = $('#firstname').val();
			newDisciple.lastname =  $('#lastname').val();
			newDisciple.email = $('#email').val();
			newDisciple.phone =  $('#phone').val();
			newDisciple.street = $('#street').val();
			newDisciple.city = $('#city').val();
			newDisciple.state = $('#state').val();
			newDisciple.zip = $('#zip').val();
			newDisciple.birthmonth = $('#birthmonth').val();
			newDisciple.birthday =  $('#birthday').val();
			newDisciple.birthyear =  $('#birthyear').val();
			newDisciple.schoolstatus = $('#schoolstatus').val();
			newDisciple.gender = getRadio();
			newDisciple.bornagain =  $('#bornagain').val();
			newDisciple.frequency =  $('#frequency').val();
			newDisciple.notes =  $('#notes').val();
			// Get revision info of existing lesson to edit
			if( $('#disciple-rev').val().length > 0 ) {
				var revText = {_rev:$('#disciple-rev').val()};
				$.extend(newDisciple, revText) ;
			}

			//Save data into Couch DB
		$db.saveDoc(newDisciple,{
			success: function(data) {
				//console.log(data);
			},
			error: function(status) {
				console.log(status);
			}
		});  
		alert("Disciple info successfully saved.");
        document.location.href='#viewDisciple?id='+($('#firstname').val()+$('#lastname').val()).toLowerCase();
		
};


// DELETE FUNCTION
$("#delete").on('click', function () {
	var discipleId = 'disciple:'+getUrlVars()["id"];
	var page = ("#" + $(this).attr('rel')).toLowerCase();

	areYouSure("Are you sure?", "This action cannot be undone.", "Yes, Delete this disciple", function() {
		$db.openDoc(discipleId, {
			success: function(document){
				//console.log(document);
				$db.removeDoc(document, {
				     success: function() {
				 		alert("Disciple was successfully deleted.");
				 		history.back();
				     },
				     error: function(status){
				    	 //console.log(status);
				    	 alert("Could not remove disciple with id: "+discipleId);
				     }
				 });
		    },
		    error: function(status) {
		        console.log(status);
		        alert('Could not find disciple with id: ' + discipleId);
		    }
		});
	});
});


// Get Radio value for store function
var getRadio = function () {
	return($('input:radio[name=gender]:checked').val());
};

var setRadio = function (myRadio) {
	switch(myRadio)
	{
	case "Male":
		$('input:radio[name=gender]:nth(0)').attr('checked', true);
		$('input:radio[name=gender]').checkboxradio('refresh');
		break;
	case "Female":
		$('input:radio[name=gender]:nth(1)').attr('checked', true);
		$('input:radio[name=gender]').checkboxradio('refresh');
		break;
	}
};



// Get value from URL
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m,key,value) {
		vars[key] = value;
	});
	return vars;
}

// Function for confirmation dialog box
function areYouSure(text1, text2, button, callback) {
	$("#sure .sure-1").text(text1);
	$("#sure .sure-2").text(text2);
	$("#sure .sure-do").text(button).on("click.sure", function() {
		callback();
		$(this).off("click.sure");
	});
	$.mobile.changePage("#sure");
}
