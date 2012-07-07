var $db = $.couch.db('godisciple');


$('#disciples').live('pagehide', function (event) {
	$('#disciples #header #title').remove();
	$('#discipleList').empty();
	var category = '';
	var catUrl = '';
});

$('#disciples').live('pageshow', function (event) {
	var category = getUrlVars()["cat"];
	var catUrl = "lessons/"+category.toLowerCase();
	$('<h1></h1>').addClass('ui-title').attr('data-theme','f')
		.attr('role', 'heading').attr('id', 'title')
		.attr('aria-level', 1).text(category.substr(0,1).toUpperCase() + category.substr(1)).prependTo('#lessons #header').trigger('create');
	// Couch Database
	$db.view(catUrl, {
		"success": function(data) {
			//console.log(data);
			$.each(data.rows, function(index,lesson){
				var id = lesson.id.substr(7,lesson.id.length);
				var name = lesson.value.name[1];
				var topic = lesson.value.topic[1];
				var description = lesson.value.lesson[1];
				var date = lesson.value.date[1];
				$('#disciples #discipleList').append(
					$('<li>').append(
						$('<a>').attr("href", "#viewDisciple?id="+id).attr('rel', 'external').attr("data-transition", "slide").append(
							$('<h4>').addClass(id).attr("data-transition", "slide").text(firstname)
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
	var lessonUrl = '/pocketministry/_all_docs?include_docs=true&key="disciple:'+discipleId+'"';
	$('<div></div>').addClass('content-container ui-btn  ui-li ui-corner-top ui-corner-bottom ui-btn-up-c '+discipleId).prependTo('#viewDisciple #content');

	$.ajax({
		"url": discipleUrl,
		"dataType": "json",
		"success": function(data) {
			//console.log(data);
			//var rev = data.rows[0].doc._rev;
			$.each(data.rows, function(index,disciple){
				var name = lesson.doc.name[1];
				var author = lesson.doc.author[1];
				var email = lesson.doc.email[1];
				var date = lesson.doc.date[1];
				var topic = lesson.doc.topic[1];
				var focus = lesson.doc.focus[1];
				var book = lesson.doc.book[1];
				var audience = lesson.doc.audience[1];
				var length = lesson.doc.length[1];
				var lessonText = lesson.doc.lesson[1];
				var id = lesson.doc._id;
				var rev = lesson.doc._rev;
				//create the DOM insertion just like json data
				var lessonString = $('<div data-role="collapsible" data-theme="c">' +
				  '<h3>' + name + '</h3>' +
				  '<p><strong>Author:</strong> ' + author + '</p>' +
				  '<p><strong>Email:</strong> ' + email + '</p>' +
				  '<p><strong>Date:</strong> ' + date + '</p>' +
				  '<p><strong>Topics:</strong> ' + topic + '</p>' +
				  '<p><strong>Focus:</strong> ' + focus + '</p>' +
				  '<p><strong>Book:</strong> ' + book + '</p>' +
				  '<p><strong>Audience:</strong> ' + audience + '</p>' +
				  '<p><strong>Length:</strong> ' + length + '</p>' +
				  '<p><strong>Lesson Text:</strong> ' + lessonText + '</p>' +
				  '</div>').appendTo('#viewLesson #content .content-container');
				//Add ID's to Edit and Delete button
				$('#viewLesson #edit').attr('href', 'additem.html?lessonId='+lessonId+'&op=edit');
				$('#viewLesson #delete').attr('rel', audience);

			});
		},
		"error": function(result){
			console.log(result);
		} 
	});
});

$('#addDisciple').live('pageinit', function (event) {
	$('#discipleid-container').hide();
	$('#disciplerev-container').hide();
});
$('#addDisciple').live('pageshow', function (event) {
    var op = getUrlVars()["op"];
	var discipleId = getUrlVars()["discipleId"];
	if(op === 'edit') {
		$('input[name=gender').removeAttr('checked');
		//Change submit button value to edit button
		$('#submit').addClass('edit-button').text('Edit Disciple');
		editDisciple(discipleId);
	}
	$('#submit').on('click', validateForm);

});

// EDIT Function
function editDisciple(discipleId){
	var discipleUrl = '/pocketministry/_all_docs?include_docs=true&key="disciple:'+discipleId+'"';
	$.ajax({
		"url": discipleUrl,
		"dataType": "json",
		"success": function(data) {
			var rev = data.rows[0].doc._rev;
			$.each(data.rows, function(index,disciple){
				//populate the form fields with current values
				$('#firstname').val(item.firstname[1]);
				$('#lastname').val(item.lastname[1]);
				$('#email').val(item.email[1]);
				$('#phone').val(item.phone[1]);
				$('#street').val(item.street[1]);
				$('#city').val(item.city[1]);
				$('#state').val(item.state[1]);
				$('#zip').val(item.zip[1]);
				
				$('#birthmonth').val(item.birthmonth[1]);
				$('#birthday').val(item.birthday[1]);
				$('#birthyear').val(item.birthyear[1]);
					
				$('#schoolstatus').val(item.schoolstatus[1]);

				$('input[value="'+disciple.doc.gender[1]+'"]').attr('checked', true).checkboxradio('refresh');
				$('#bornagain').val(item.bornagain[1]);
				$('#frequency').val(item.frequency[1]);
				$('#notes').val(item.notes[1]);
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
			var discipleIdSet = 'disciple:'+($('#firstname').val().toLowerCase()).replace( /\s/g, "").split(',').join('').replace(/[^a-zA-Z 0-9]+/g,'');
		}
		
		// Gather up all form values and labels.
		//Find the value of the selected radio button.
		var newDisciple = {};
			newDisciple._id = discipleIdSet;
			newDisciple.firstname = ["First Name:", $('#firstname').val()];
			newDisciple.lastname = ["Last Name:", $('#lastname').val()];
			newDisciple.email = ["Email:", $('#email').val()];
			newDisciple.phone = ["Phone:", $('#phone').val()];
			newDisciple.street = ["Street Address:", $('#street').val()];
			newDisciple.city = ["City:", $('#city').val()];
			newDisciple.state = ["State:", $('#state').val()];
			newDisciple.zip = ["Zip:", $('#zip').val()];
			newDisciple.birthmonth = ["Birth Month:", $('#birthmonth').val()];
			newDisciple.birthday = ["Birth Day:", $('#birthday').val()];
			newDisciple.birthyear = ["Birth Year:", $('#birthyear').val()];
			newDisciple.schoolstatus = ["School Status:", $('#schoolstatus').val()];
			newDisciple.gender = ["Gender:", getRadio()];
			newDisciple.bornagain = ["Born Again Birthday:", $('#bornagain').val()];
			newDisciple.frequency = ["Contact Frequency:", $('#frequency').val()];
			newDisciple.notes = ["Notes:", $('#notes').val()];
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
        document.location.href='#disciples;
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
