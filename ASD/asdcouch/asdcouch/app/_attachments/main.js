$db = $.couch.db('pocketministry');

$('#home').live('pageshow', function(){
	// Couch Database
	$db.view('lessons/categories', {
		success: function(data) {
			$('#categoryList').empty();
			var header = $('<li class="ui-li ui-li-divider ui-bar-f ui-corner-top" data-role="list-divider" role="heading">Categories</li>').appendTo('#categoryList');
			$.each(data.rows, function(index,category){
				var name = category.value.name;
				$('#categoryList').append(
					$('<li>').append(
						$('<a>').attr("href", "#lessons?cat="+name)
							.attr("data-transition", "slide").attr('rel', 'external')
							.text(name)
					)
				);
			});
			$('#categoryList').listview('refresh');
		}
	});
});

$('#lessons').live('pagehide', function (event) {
	$('#lessons #header #title').remove();
	$('#lessonList').empty();
	var category = '';
	var catUrl = '';
});

$('#lessons').live('pageshow', function (event) {
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
				$('#lessons #lessonList').append(
					$('<li>').append(
						$('<a>').attr("href", "#viewLesson?id="+id).attr('rel', 'external').attr("data-transition", "slide").append(
								$('<h3>').addClass(id).attr("data-transition", "slide")
								.text(name),
							$('<p>').addClass('subhead ' + id).html('<strong>Topic:</strong> '+ topic),
							$('<p>').addClass('ui-li-desc ' + id).text(description),
							$('<p>').addClass('date ui-li-aside ' + id).text(date)
						)
					)
				);
			});
			$('#lessons #lessonList').listview('refresh');
		},
	});
});

$('#viewLesson').live('pagehide', function (event) {
	$('#viewLesson #content .content-container').remove();
});

$('#viewLesson').live('pageshow', function (event) {
	var lessonId = getUrlVars()["id"];
	var lessonUrl = '/pocketministry/_all_docs?include_docs=true&key="lesson:'+lessonId+'"';
	$('<div></div>').addClass('content-container ui-btn  ui-li ui-corner-top ui-corner-bottom ui-btn-up-c '+lessonId).prependTo('#viewLesson #content');

	$.ajax({
		"url": lessonUrl,
		"dataType": "json",
		"success": function(data) {
			//console.log(data);
			var rev = data.rows[0].doc._rev;
			$.each(data.rows, function(index,lesson){
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
				  '<p><strong>Additional Info:</strong><br/>' +
				  '<strong>ID:</strong> ' + id + '<br/>' +
				  '<strong>Rev:</strong> ' + rev + '</p>' +
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

$('#addLesson').live('pageinit', function (event) {
	// Responsive Disclosure
	var bible_book_disclosure = function () {
		if ($("#focus").val() === "Old Testament") {
			$("#ot-books").show();
			$("#nt-books").hide();
		} else if ($("#focus").val() === "New Testament") {
			$("#nt-books").show();
			$("#ot-books").hide();
		}
	}
	$('#ot-books').hide();
	$('#nt-books').hide();
	$("#focus").change(function () {
		bible_book_disclosure();
	});
	$('#lessonid-container').hide();
	$('#lessonrev-container').hide();
	makeTopics();
	setDate();
});
$('#addLesson').live('pageshow', function (event) {
	var op = getUrlVars()["op"];
	var lessonId = getUrlVars()["lessonId"];
	if(op === 'edit') {
		$('#lessonid-container').show();
		$('#lessonrev-container').show();
		$('input[name=audience').removeAttr('checked');
		//Change submit button value to edit button
		$('#submit').addClass('edit-button').text('Edit Lesson');
		$('input[value="Adults"]').removeAttr('checked').checkboxradio('refresh');
		editLesson(lessonId);
	}

});

// EDIT Function
function editLesson(lessonId){
	var lessonUrl = '/pocketministry/_all_docs?include_docs=true&key="lesson:'+lessonId+'"';
	$.ajax({
		"url": lessonUrl,
		"dataType": "json",
		"success": function(data) {
			var rev = data.rows[0].doc._rev;
			$.each(data.rows, function(index,lesson){
				//populate the form fields with current values
				$('#lesson-name').val(lesson.doc.name[1]);
				$('#author').val(lesson.doc.author[1]);
				$('#email').val(lesson.doc.email[1]);
				$('#date').val(lesson.doc.date[1]);

				$('#topics').val(lesson.doc.topic[1]);
				setTopic(lesson.doc.topic[1]);

				$('#focus').val(lesson.doc.focus[1]);
					
				if ($('#focus').val() === "Old Testament") {
					$("#nt-books").hide();
					$("#ot-books").show();
					$('#book-ot').val(lesson.doc.book[1]);
				} else if ($('#focus').val() === "New Testament") {
					$("#ot-books").hide();
					$("#nt-books").show();
					$('#book-nt').val(lesson.doc.book[1]);
				}
				$('select').selectmenu('refresh');

				$('input[value="'+lesson.doc.audience[1]+'"]').attr('checked', true).checkboxradio('refresh');
				/*var radios = document.forms[0].audience;
				for(var i=0; i<radios.length; i++){
					if(radios[i].value == "Adults" && lesson.doc.audience[1] == "Adults") {
						radios[i].setAttribute("checked", "checked");
					}else if(radios[i].value == "Children" && lesson.doc.audience[1] == "Children") {
						radios[i].setAttribute("checked", "checked");
					}else if(radios[i].value == "Youth" && lesson.doc.audience[1] == "Youth") {
						radios[i].setAttribute("checked", "checked");
					}else if(radios[i].value == "Men" && lesson.doc.audience[1] == "Men") {
						radios[i].setAttribute("checked", "checked");
					}else if(radios[i].value == "Women" && lesson.doc.audience[1] == "Women") {
						radios[i].setAttribute("checked", "checked");
					}
				}
				$(radios).checkboxradio('refresh');*/
				$('#length').val(lesson.doc.length[1]);
				$('#lesson-text').val(lesson.doc.lesson[1]);
				$('#lesson-id').val(lesson.doc._id);
				$('#lesson-rev').val(lesson.doc._rev);
			});
		},
		"error": function(result){
			console.log(result);
		} 
	});
}

// VALIDATE FUNCTION
var validateForm = function (lessonId) {
	var getLessonName = $("#lesson-name").val();
	var getAuthor = $("#author").val();
	var getEmail = $("#email").val();
	var getTopic = $("#topics").val();
	var formErrors = $('#formErrors');

	//Reset error messages
	$(".error").hide();
	var hasError = false;
	$('#errors').empty();
	$('#lesson-name').css("border", "none") ;
	$('#author').css("border", "none") ;
	$('#email').css("border", "none") ;
	$('#select > div').css("border", "none") ;

	//Get Error messages
	var messageArray = [];
	//Lesson Name validation
	if (getLessonName === "") {
		$('#lesson-name').after('<br/><span class="error">Please enter a lesson name.</span>');
		$('#lesson-name').css("border", "1px solid red") ;
		hasError = true;
	}
	//Author validation
	if (getAuthor === "") {
	 	$('#author').after('<br/><span class="error">Please enter an author name.</span>');
		$('#author').css("border", "1px solid red") ;
		hasError = true;
	}
	//Email validation
	var re = /^\w+([\.-]?]\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if ((getEmail === '') || (!re.test(getEmail))) {
		$('#email').after('<br/><span class="error">Please enter a valid email address.</span>');
		$('#email').css("border", "1px solid red") ;
		hasError = true;
	} 
	
	//Topic validation
	if (getTopic === "--Choose A Topic--") {
		$('#select > div').after('<br/><span class="error">Please choose a topic.</span>');
		var topicError = "Please choose a topic.";
		$('#select > div').css("border", "1px solid red") ;
		hasError = true;
	}

	//Set Errors
	if (hasError === true) {
		$('#submit-container').after('<br/><span class="error">Please correct the errors above.</span>');
		event.preventDefault();
		return false;
	} else {
		//If all is validated, save the data and send the key value from editData
		return true;
	}
}

// STORE FUNCTION
$('#submit').live('click', function () {
		
		validateForm();
		
		if ($('#focus').val() === 'New Testament') {
			var book = $('#book-nt').val();
		} else if ($('#focus').val() === 'Old Testament') {
			var book = $('#book-ot').val();
		}
		
		// Get Lesson Id of existing lesson to edit
		if( $('#lesson-id').val().length > 0 ) {
			var lessonIdSet = $('#lesson-id').val();
		} else {
			var lessonIdSet = 'lesson:'+($('#lesson-name').val().toLowerCase()).replace( /\s/g, "").split(',').join('').replace(/[^a-zA-Z 0-9]+/g,'');
		}
		
		// Gather up all form values and labels.
		//Find the value of the selected radio button.
		var newLesson = {};
			newLesson._id = lessonIdSet;
			newLesson.name = ["Lesson Name:", $('#lesson-name').val()];
			newLesson.author = ["Author:", $('#author').val()];
			newLesson.email = ["Email:", $('#email').val()];
			newLesson.date = ["Date:", $('#date').val()];
			newLesson.topic = ["Topics:", $('#topics').val()];
			newLesson.focus = ["Focus:", $('#focus').val()];
			newLesson.book = ["Book:", book];
			newLesson.audience = ["Audience:", getRadio()];
			newLesson.length = ["Lesson Length:", $('#length').val()];
			newLesson.lesson = ["Lesson Text:", $('#lesson-text').val()];
			// Get revision info of existing lesson to edit
			if( $('#lesson-rev').val().length > 0 ) {
				var revText = {_rev:$('#lesson-rev').val()};
				$.extend(newLesson, revText) ;
			}

			//Save data into Couch DB
		$db.saveDoc(newLesson,{
			success: function(data) {
				//console.log(data);
			},
			error: function(status) {
				console.log(status);
			}
		});  
		alert("Bible Study Lesson successfully saved.");
        document.location.href='#lessons?cat='+getRadio().toLowerCase();
});


// DELETE FUNCTION
$("#delete").on('click', function () {
	var lessonId = 'lesson:'+getUrlVars()["id"];
	var page = ("#" + $(this).attr('rel')).toLowerCase();

	areYouSure("Are you sure?", "This action cannot be undone.", "Yes, Delete this Lesson", function() {
		$.couch.db('pocketministry').openDoc(lessonId, {
			success: function(document){
				//console.log(document);
				$.couch.db("pocketministry").removeDoc(document, {
				     success: function() {
				 		alert("Lesson was successfully deleted.");
				 		history.back();
				     },
				     error: function(status){
				    	 //console.log(status);
				    	 alert("Could not remove lesson with id: "+lessonId);
				     }
				 });
		    },
		    error: function(status) {
		        console.log(status);
		        alert('Could not find lesson with id: ' + lessonId);
		    }
		});
	});
});


// Get Radio value for store function
var getRadio = function () {
	return($('input:radio[name=audience]:checked').val());
}

var setRadio = function (myRadio) {
	switch(myRadio)
	{
	case "Adults":
		$('input:radio[name=audience]:nth(0)').attr('checked', true);
		$('input:radio[name=audience]').checkboxradio('refresh');
		break;
	case "Men":
		$('input:radio[name=audience]:nth(1)').attr('checked', true);
		$('input:radio[name=audience]').checkboxradio('refresh');
		break;
	case "Women":
		$('input:radio[name=audience]:nth(2)').attr('checked', true);
		$('input:radio[name=audience]').checkboxradio('refresh');
		break;
	case "Youth":
		$('input:radio[name=audience]:nth(3)').attr('checked', true);
		$('input:radio[name=audience]').checkboxradio('refresh');
		break;
	case "Children":
		$('input:radio[name=audience]:nth(4)').attr('checked', true);
		$('input:radio[name=audience]').checkboxradio('refresh');
		break;
	}
}

var setTopic = function (myTopic) {
	switch(myTopic)
	{
	case "Christian Life":
		$("#topics").val("Christian Life").attr("selected", "selected");
		$('#topics').selectmenu('refresh');
		break;
	case "Marriage":
		$("#topics").val("Marriage").attr("selected", "selected");
		$('#topics').selectmenu('refresh');
		break;
	case "Family":
		$("#topics").val("Family").attr("selected", "selected");
		$('#topics').selectmenu('refresh');
		break;
	}
}

//Create select field element and populate with options.
function makeTopics() {
	var bibleTopics = ["--Choose A Topic--", "Christian Life", "Marriage", "Family"];
	$('<select></select>').attr('id', 'topics').attr('data-theme', 'c').attr('data-native-menu',false).appendTo('#select');
	for (var i=0, j=bibleTopics.length; i<j; i++) {
		var optText = bibleTopics[i];
		$('<option></option>').attr('value', optText).attr('id', optText).attr('data-theme', 'c').appendTo('select#topics');
		$('#topics option:last-child').html(optText);
	}
	var selectTopics = $('select#topics');
	selectTopics.selectmenu();
	selectTopics.selectmenu('refresh');
}


//  Set default date
function setDate() {
	if (!($('#date').val()) ) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;//January is 0!
		var yyyy = today.getFullYear();
		if(dd<10) {dd='0'+dd;}
		if(mm<10) {mm='0'+mm;}
		$('#date').val(mm+'/'+dd+'/'+yyyy);
	}
}


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