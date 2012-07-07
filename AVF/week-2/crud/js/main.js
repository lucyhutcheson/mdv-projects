/**
 * @author Lucy Hutcheson
 * Created for:  Advanced Visual Frameworks 1206
 */

$(document).bind("mobileinit", function(){
    $.mobile.ajaxLinksEnabled=false;
});
    
    
	// Get value from URL
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m,key,value) {
			vars[key] = value;
		});
		return vars;
	}


	//Variable defaults
	var discipleId = getUrlVars()["discipleId"];

$('#viewLesson').live('pagehide', function (event) {
	$('#viewLesson #content').remove();
});

$('#viewLesson').live('pageshow', function (event) {
	$('<div></div>').attr('id', 'content').appendTo('#viewLesson').trigger('create');
	var discipleId = getUrlVars()["discipleId"];
	var value = localStorage.getItem(discipleId);

	// convert the string back to an object
	var obj = JSON.parse(value);

	$('<div></div>').addClass('content-container ui-btn  ui-li ui-corner-top ui-corner-bottom ui-btn-up-c '+discipleId).appendTo('#viewLesson #content');

	if (category === "Adults") {
		for(var n in obj) {
			$('<p></p>').addClass('item-details '+discipleId+' '+obj[n][0]).appendTo('div.'+discipleId);
			var optSubText = "<strong>"+obj[n][0]+" </strong> "+obj[n][1];
			$('p:last').html(optSubText);
		}
	} else if (category === "Men" || category === "Women") {
		for(var n in obj) {
			$('<p></p>').addClass('item-details '+discipleId).appendTo('div.'+discipleId);
			var optSubText = obj[n];
			$('p:last').html(optSubText);
		}
	}
		
	//Create Edit button
	//$("#navbar ul").append('<li id="edit-list" class="ui-block-c"><a id="edit" href="additem.html?discipleId='+discipleId+'&op=edit" title="Edit Lesson" class="ui-btn ui-btn-up-c ui-btn-icon-top" rel="external" data-icon="gear" data-corners="false" data-shadow="false" data-iconshadow="true" data-inline="false" data-wrapperels="span" data-iconpos="top"><span class="ui-btn-inner"><span class="ui-btn-text">Edit</span><span class="ui-icon ui-icon-edit ui-icon-shadow"></span></span></a></li>');
	
});







$('#addLesson').live('pageinit', function (event) {
	var op = getUrlVars()["op"];
	if(op === 'edit') {
		editLesson(discipleId);
	}
});

	
	
	// Get Lessons and Build list
	var getLocalData = function (category) {
		$('#errors').empty(); //Reset error messages

		// Create list items from sorted storage array
		for (var i=0, len=localStorage.length; i<len; i++) {
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// convert the string back to an object
			var obj = JSON.parse(value);

	 	 	// $ Create list item
		 	$('<li></li>').addClass('lesson '+key).attr('data-theme','c').appendTo('#lesson-list');
			// $ Create anchor
			$('<a></a>').addClass('anchor '+key).attr('rel','external').attr('href', 'index.html#viewLesson?discipleId='+key+'&cat='+category).attr('data-cache', 'false').attr('data-ajax', false).appendTo('#lesson-list li.'+key);
			
			// Move date to the bottom if you want to sort based on Header Text
			if (category === "Adults") {
				// HEADER TEXT
				var headerText = obj.firstname[1] + " " + obj.lastname[1];
				$('<h3></h3>').addClass(key).appendTo('li.'+key+' a.'+key);
				$('h3.'+key).html(headerText);

				
			} 
		}


		// Sort my lesson list after it has been created
		var mylist = $('#lesson-list');
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

		$('#lesson-list').listview()
		$('#lesson-list').listview('refresh');

	}


   	

	// EDIT FUNCTION
	var editLesson = function (discipleId) {
		$('#pageTitle').html('Edit Info');

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
		
		$('#birthmonth').val(item.birthmonth[1]);
		$('#birthday').val(item.birthday[1]);
		$('#birthyear').val(item.birthyear[1]);
			
		$('#schoolstatus').val(item.schoolstatus[1]);

		$('input:radio[name=gender]').removeAttr('checked');
		$('input:radio[name=gender]').checkboxradio('refresh');
		setRadio(item.gender[1]);

		$('#bornagain').val(item.bornagain[1]);
		$('#frequency').val(item.frequency[1]);
		$('#notes').val(item.notes[1]);
				
		//remove initial listener from save button

		//Change submit button value to edit button
		$('#submit').val('Save Editted Info');
		$('#submit').button('refresh');
		$('#addForm').submit(function () {
			validateForm(discipleId);
		});
	}
	
	var getRadio = function () {
		return($('input:radio[name=gender]:checked').val());
	}
	
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
	}
	



	// VALIDATE FUNCTION
	var validateForm = function (discipleId) {
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
			$('#submit-container').after('<span class="error">Please correct the errors above.</span>');
			event.preventDefault();
			return false;
		} else {
			//If all is validated, save the data and send the key value from editData
			storeData(discipleId);
		}
	}

	// STORE FUNCTION
	$('#submit').on('click', function storeData(key) {

		if(validateForm()) {
			//Create new key if one doesn't exist.
			if(!key) {
				var id = Math.floor(Math.random()*10000001);
			}else{
				//Use the existing key.
				var id = key;
			}
			
			// Gather up all form values and labels.
			//Find the value of the selected radio button.
			var newItem = {};
				newItem.firstname = ["First Name:", $('#firstname').val()];
				newItem.lastname = ["Last Name:", $('#lastname').val()];
				newItem.email = ["Email:", $('#email').val()];
				newItem.phone = ["Phone:", $('#phone').val()];
				newItem.street = ["Street Address:", $('#street').val()];
				newItem.city = ["City:", $('#city').val()];
				newItem.state = ["State:", $('#state').val()];
				newItem.zip = ["Zip:", $('#zip').val()];
				newItem.birthmonth = ["Birth Month:", $('#birthmonth').val()];
				newItem.birthday = ["Birth Day:", $('#birthday').val()];
				newItem.birthyear = ["Birth Year:", $('#birthyear').val()];
				newItem.schoolstatus = ["School Status:", $('#schoolstatus').val()];
				newItem.gender = ["Gender:", getRadio()];
				newItem.bornagain = ["Born Again Birthday:", $('#bornagain').val()];
				newItem.frequency = ["Contact Frequency:", $('#frequency').val()];
				newItem.notes = ["Notes:", $('#notes').val()];
	
			//Save data into local storage
			localStorage.setItem(id, JSON.stringify(newItem));
			alert("Disciple info successfully saved.");
			parent.history.back();
		}

	});
		

	


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
		var ask = confirm("Are you sure you want to delete this disciple?");
		if (ask) {
			localStorage.removeItem(discipleId);
			alert("Disciple was successfully deleted.");
			if (localStorage.length === 0) {
				window.location.href = "index.html";
			} else {
				parent.history.back();
			}
		} else {
			alert("Disciple was NOT deleted.");
		}
	});
	



