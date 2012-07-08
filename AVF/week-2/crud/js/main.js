/**
 * @author Lucy Hutcheson
 * Created for:  Advanced Visual Frameworks 1206
 */

$(document).bind("mobileinit", function(){
    $.mobile.ajaxLinksEnabled=false;
});
    
    
    
/****************************************************************
 * 
 * List of Disciples Page                                       *
 * 
 ****************************************************************/
$('#disciples').live('pagehide', function (event) {
	$('#discipleList').empty();
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
});

$('#viewDisciple').live('pageshow', function (event) {
	var discipleId = getUrlVars()["id"];
	var value = localStorage.getItem(discipleId);
	// convert the string back to an object
	var obj = JSON.parse(value);

	$('<div></div>').addClass('content-container ui-btn  ui-li ui-corner-top ui-corner-bottom ui-btn-up-c '+discipleId).appendTo('#viewDisciple #content');

	for(var n in obj) {
		$('<p></p>').addClass('item-details '+discipleId+' '+obj[n][0]).appendTo('div.'+discipleId);
		var optSubText = "<strong>"+obj[n][0]+" </strong> "+obj[n][1];
		$("p.item-details:last").html(optSubText);
	}

	$('#viewDisciple #edit').attr('href', 'additem.html?id='+discipleId+'&op=edit');

});



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
			$('#disciples #content').append(
				$('<div>').append(
					$('<h4>').text("There are currently no disciples saved.")
				)
			);
			$('#disciples #content').append(
				$('<div>').html('<a href="additem.html" rel="external" data-role="button" data-theme="a">Add New Disciple</a>')
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
			var id = $('#disciple-id').val();
			alert(id);
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
		alert("Disciple info successfully saved.");
		parent.history.back();
		

	};
		

	


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
			var discipleId = getUrlVars()["id"];
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


