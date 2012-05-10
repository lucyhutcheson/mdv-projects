/**
 * @author Lucy Hutcheson
 * Created for:  Advanced Scalable Data Infrastructures 1205
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
	var bibleTopics = ["--Choose A Topic--", "Christian Life", "Marriage", "Family"];
	var lessonId = getUrlVars()["lessonId"];
	var category = getUrlVars()["cat"];

$('#viewLesson').live('pagehide', function (event) {
	$('#viewLesson #content').remove();
});

$('#viewLesson').live('pageshow', function (event) {
	$('<div></div>').attr('id', 'content').appendTo('#viewLesson').trigger('create');
	var lessonId = getUrlVars()["lessonId"];
	var category = getUrlVars()["cat"];
	var value = localStorage.getItem(lessonId);

	// convert the string back to an object
	var obj = JSON.parse(value);

	$('<div></div>').addClass('content-container ui-btn  ui-li ui-corner-top ui-corner-bottom ui-btn-up-c '+lessonId).appendTo('#viewLesson #content');

	if (category === "Adults") {
		for(var n in obj) {
			$('<p></p>').addClass('item-details '+lessonId+' '+obj[n][0]).appendTo('div.'+lessonId);
			var optSubText = "<strong>"+obj[n][0]+" </strong> "+obj[n][1];
			$('p:last').html(optSubText);
		}
	} else if (category === "Men" || category === "Women") {
		for(var n in obj) {
			$('<p></p>').addClass('item-details '+lessonId).appendTo('div.'+lessonId);
			var optSubText = obj[n];
			$('p:last').html(optSubText);
		}
	}
		
	//Create Edit button
	//$("#navbar ul").append('<li id="edit-list" class="ui-block-c"><a id="edit" href="additem.html?lessonId='+lessonId+'&op=edit" title="Edit Lesson" class="ui-btn ui-btn-up-c ui-btn-icon-top" rel="external" data-icon="gear" data-corners="false" data-shadow="false" data-iconshadow="true" data-inline="false" data-wrapperels="span" data-iconpos="top"><span class="ui-btn-inner"><span class="ui-btn-text">Edit</span><span class="ui-icon ui-icon-edit ui-icon-shadow"></span></span></a></li>');
	
});

$('div[data-role="page"]').live('pageshow', function (event) {
	if (localStorage.length > 0){
		$('#getdata_button').hide();
	} else {
		$('#getdata_button').show();
	}
});

$('#Adults').live('pageinit', function (event) {
	localStorage.clear();

	$("#load-adults").on("click", function () {

		$('#getdata_button').hide();
	    
	    //Add ajax call for json data
	    $.ajax({
			url: 'js/xhr/adults.json',
			type: 'GET',
			dataType: 'json',
			success: function (lessonData) {
			    for (var i=0, j=lessonData.lessons.length; i<j; i++) {
					var jsonData = lessonData.lessons[i];
					// Store data in localStorage for viewing or editting
					var key = Math.floor(Math.random()*10000001);
					localStorage.setItem(key, JSON.stringify(lessonData.lessons[i]));
				}
				getLocalData('Adults');
				$('#lesson-list').listview()
				$('#lesson-list').listview('refresh');
		    }
		});
	    
	});

});



$('#Men').live('pageinit', function (event) {
	localStorage.clear();
	
	$("#load-men").on("click", function () {

		$('#Men #getdata_button').hide();
	    
	    //Add ajax call for json data
	    $.ajax({
			url: 'js/xhr/men.xml',
			type: 'GET',
			dataType: 'xml',
			success: function (lessonData) {

		  	    $(lessonData).find("lessons").each(function(){
					//have to declare variables for each field, then insert into the DOM with <li> tags
					var name = $(this).find('name').text();
					var author = $(this).find('author').text();
					var email = $(this).find('email').text();
					var date = $(this).find('date').text();
					var topic = $(this).find('topic').text();
					var focus = $(this).find('focus').text();
					var book = $(this).find('book').text();
					var audience = $(this).find('audience').text();
					var length = $(this).find('length').text();
					var text = $(this).find('lesson').text();
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
					  '<p><strong>Lesson Text:</strong> ' + text + '</p>' +
					  '</div>').appendTo('#Men #men-lesson-list');
					  $('#Men #men-lesson-list').collapsibleset('refresh');
					var key = Math.floor(Math.random()*10000001);
					localStorage.setItem(key, JSON.stringify(lessonString));
				});
			}
	    }); // end of ajax   
	});
});

$('#Women').live('pageinit', function (event) {
	localStorage.clear();
	$("#load-women").on("click", function () {
		$('#Women #getdata_button').hide();
	    
	    //Add ajax call for json data
	    $.ajax({
			url: 'js/xhr/women.xml',
			type: 'GET',
			dataType: 'xml',
			success: function (lessonData) {
		  	    $(lessonData).find("lessons").each(function(){
					//have to declare variables for each field, then insert into the DOM with <li> tags
					var name = $(this).find('name').text();
					var author = $(this).find('author').text();
					var email = $(this).find('email').text();
					var date = $(this).find('date').text();
					var topic = $(this).find('topic').text();
					var focus = $(this).find('focus').text();
					var book = $(this).find('book').text();
					var audience = $(this).find('audience').text();
					var length = $(this).find('length').text();
					var text = $(this).find('lesson').text();
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
					  '<p><strong>Lesson Text:</strong> ' + text + '</p>' +
					  '</div>').appendTo('#Women #women-lesson-list');
					  $('#Women #women-lesson-list').collapsibleset('refresh');
					var key = Math.floor(Math.random()*10000001);
					localStorage.setItem(key, JSON.stringify(lessonString));
				});
			}
	    }); // end of ajax   
	});
});

$('#Youth').live('pageinit', function (event) {
	localStorage.clear();
	$("#load-youth").on("click", function () {
	    //have to clear data in case user clicks different button
		$('#Youth #getdata_button').hide();
	    
	   $.ajax({
	    	url: 'js/xhr/youth.csv',
	    	type: 'GET',
	    	dataType: 'text',
	    	success: function (lessons) {
				var text = [];
		        var csvData = lessons.split(/[\r\n]+/);
		    	var firstLine = csvData[0].split('|');
			    //create loop to cycle through csv data
			    for (var i=1; i<csvData.length; i++) {
					var data = csvData[i].split('|');
					if (data.length == firstLine.length) {
					    var lessonList = []; 
					    for (var j=0; j<firstLine.length; j++) {
					    	lessonList.push(data[j]); 
					    }
					    text.push(lessonList); 
					}
			    }
			 	 // $ Create list item
			    for (var k=0; k<text.length; k++) {
			    	var key = Math.floor(Math.random()*10000001);
					localStorage.setItem(key, JSON.stringify(text[k]));
					var lessons = text[k];
					
					
			 		$('<div></div>').addClass('lesson '+key).attr('data-theme','c').attr('data-role','collapsible').appendTo('#Youth #youth-lesson-list');
					//using same dom loader as json and xml
					var headerText = lessons[0];
					$('<h3></h3>').addClass('header '+key).appendTo('div.lesson.'+key);
					$('h3.header.'+key).html(headerText);
	
					// AUTHOR
					var authorText = "<strong>Author:</strong> " + lessons[1];
					$('<p></p>').addClass('author '+key).appendTo('div.lesson.'+key);
					$('p.author.'+key).html(authorText);

					// EMAIL
					var emailText = "<strong>Email:</strong> " + lessons[2];			
					$('<p></p>').addClass('email '+key).appendTo('div.lesson.'+key);
					$('p.email.'+key).html(emailText);

					// DATE
					var dateText = "<strong>Date:</strong> " + lessons[3];			
					$('<p></p>').addClass('date '+key).appendTo('div.lesson.'+key);
					$('p.date.'+key).html(dateText);

					// TOPIC
					var topicText = "<strong>Topic:</strong> " + lessons[4];
					$('<p></p>').addClass('topic '+key).appendTo('div.lesson.'+key);
					$('p.topic.'+key).html(topicText);
					
					// FOCUS
					var focusText = "<strong>Focus:</strong> " + lessons[5];
					$('<p></p>').addClass('focus '+key).appendTo('div.lesson.'+key);
					$('p.focus.'+key).html(focusText);
					
					// BOOK
					var bookText = "<strong>Book:</strong> " + lessons[6];
					$('<p></p>').addClass('book '+key).appendTo('div.lesson.'+key);
					$('p.book.'+key).html(bookText);
					
					// AUDIENCE
					var audienceText = "<strong>Audience:</strong> " + lessons[7];
					$('<p></p>').addClass('audience '+key).appendTo('div.lesson.'+key);
					$('p.audience.'+key).html(audienceText);
					
					// LENGTH
					var lengthText = "<strong>Length:</strong> " + lessons[8];
					$('<p></p>').addClass('length '+key).appendTo('div.lesson.'+key);
					$('p.length.'+key).html(lengthText);
					
					// LESSON TEXT
					var lessonText = "<strong>Lesson Text:</strong> " + lessons[9];
					$('<p></p>').addClass('lesson-text '+key).appendTo('div.lesson.'+key);
					$('p.lesson-text.'+key).html(lessonText);
		
			    }
		
				$('#Youth #youth-lesson-list').collapsibleset('refresh');

	    	},
	   	});  
	});
});

$('#Children').live('pageinit', function (event) {
	localStorage.clear();
	$("#load-children").on("click", function () {
		$('#Children #getdata_button').hide();
	    
	   $.ajax({
	    	url: 'js/xhr/children.csv',
	    	type: 'GET',
	    	dataType: 'text',
	    	success: function (lessons) {
				var text = [];
		        var csvData = lessons.split(/[\r\n]+/);
		    	var firstLine = csvData[0].split('|');
			    for (var i=1; i<csvData.length; i++) {
					var data = csvData[i].split('|');
					if (data.length == firstLine.length) {
					    var lessonList = []; 
					    for (var j=0; j<firstLine.length; j++) {
					    	lessonList.push(data[j]); 
					    }
					    text.push(lessonList); 
					}
			    }
			 	 // $ Create list item
			    for (var k=0; k<text.length; k++) {
			    	var key = Math.floor(Math.random()*10000001);
					localStorage.setItem(key, JSON.stringify(text[k]));
					var lessons = text[k];
					
			 		$('<div></div>').addClass('lesson '+key).attr('data-theme','c').attr('data-role','collapsible').appendTo('#Children #children-lesson-list');
					//using same dom loader as json and xml
					var headerText = lessons[0];
					$('<h3></h3>').addClass('header '+key).appendTo('div.lesson.'+key);
					$('h3.header.'+key).html(headerText);
	
					// AUTHOR
					var authorText = "<strong>Author:</strong> " + lessons[1];
					$('<p></p>').addClass('author '+key).appendTo('div.lesson.'+key);
					$('p.author.'+key).html(authorText);

					// EMAIL
					var emailText = "<strong>Email:</strong> " + lessons[2];			
					$('<p></p>').addClass('email '+key).appendTo('div.lesson.'+key);
					$('p.email.'+key).html(emailText);

					// DATE
					var dateText = "<strong>Date:</strong> " + lessons[3];			
					$('<p></p>').addClass('date '+key).appendTo('div.lesson.'+key);
					$('p.date.'+key).html(dateText);

					// TOPIC
					var topicText = "<strong>Topic:</strong> " + lessons[4];
					$('<p></p>').addClass('topic '+key).appendTo('div.lesson.'+key);
					$('p.topic.'+key).html(topicText);
					
					// FOCUS
					var focusText = "<strong>Focus:</strong> " + lessons[5];
					$('<p></p>').addClass('focus '+key).appendTo('div.lesson.'+key);
					$('p.focus.'+key).html(focusText);
					
					// BOOK
					var bookText = "<strong>Book:</strong> " + lessons[6];
					$('<p></p>').addClass('book '+key).appendTo('div.lesson.'+key);
					$('p.book.'+key).html(bookText);
					
					// AUDIENCE
					var audienceText = "<strong>Audience:</strong> " + lessons[7];
					$('<p></p>').addClass('audience '+key).appendTo('div.lesson.'+key);
					$('p.audience.'+key).html(audienceText);
					
					// LENGTH
					var lengthText = "<strong>Length:</strong> " + lessons[8];
					$('<p></p>').addClass('length '+key).appendTo('div.lesson.'+key);
					$('p.length.'+key).html(lengthText);
					
					// LESSON TEXT
					var lessonText = "<strong>Lesson Text:</strong> " + lessons[9];
					$('<p></p>').addClass('lesson-text '+key).appendTo('div.lesson.'+key);
					$('p.lesson-text.'+key).html(lessonText);
		
			    }
		
				$('#Children #children-lesson-list').collapsibleset('refresh');

	    	},
	   	});  
	});
});

$('#addLesson').live('pageinit', function (event) {
	var op = getUrlVars()["op"];
	if(op === 'edit') {
		editLesson(lessonId);
	}


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

	makeTopics();
	setDate();

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
			$('<a></a>').addClass('anchor '+key).attr('rel','external').attr('href', '../~admin/index.html#viewLesson?lessonId='+key+'&cat='+category).attr('data-cache', 'false').attr('data-ajax', false).appendTo('#lesson-list li.'+key);
			
			// Move date to the bottom if you want to sort based on Header Text
			if (category === "Adults") {
				// HEADER TEXT
				var headerText = obj.name[1];
				$('<h3></h3>').addClass(key).appendTo('li.'+key+' a.'+key);
				$('h3.'+key).html(headerText);

				// SUB HEAD
				var strongPText = obj.topic[0] + " " + obj.topic[1];
				$('<p></p>').addClass('subhead '+key).attr('style', 'font-weight: bold;').appendTo('li.'+key+' a.'+key);
				$('p.subhead.'+key).html(strongPText);
				
				// LESSON DESCRIPTION
				var descText = obj.lesson[1];
				$('<p></p>').addClass('ui-li-desc '+key).appendTo('li.'+key+' a.'+key);
				$('p.ui-li-desc.'+key).html(descText);
	
				// DATE
				var dateText = obj.date[1];			
				$('<p></p>').addClass('date ui-li-aside '+key).appendTo('li.'+key+' a.'+key);
				$('p.date.ui-li-aside.'+key).html(dateText);
				
			} else if (category === "Men" || category === "Women") {
				// HEADER TEXT
				var headerText = obj.name;
				$('<h3></h3>').addClass(key).appendTo('li.'+key+' a.'+key);
				$('h3.'+key).html(headerText);
				
				// SUB HEAD
				var strongPText = "Topic: " + obj.topic;
				$('<p></p>').addClass('subhead '+key).attr('style', 'font-weight: bold;').appendTo('li.'+key+' a.'+key);
				$('p.subhead.'+key).html(strongPText);
				
				// LESSON DESCRIPTION
				var descText = obj.lesson;
				$('<p></p>').addClass('ui-li-desc '+key).appendTo('li.'+key+' a.'+key);
				$('p.ui-li-desc.'+key).html(descText);
	
				// DATE
				var dateText = obj.date;			
				$('<p></p>').addClass('date ui-li-aside '+key).appendTo('li.'+key+' a.'+key);
				$('p.date.ui-li-aside.'+key).html(dateText);
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
	var editLesson = function (lessonId) {
		$('#pageTitle').html('Edit Lesson');

		//Grab the data from local storage
		var value = localStorage.getItem(lessonId);
		var item = JSON.parse(value);

		//populate the form fields with current values
		$('#lesson-name').val(item.name[1]);
		$('#author').val(item.author[1]);
		$('#email').val(item.email[1]);
		$('#date').val(item.date[1]);
		
		console.log(item.topic[1]);
		$('#topics').val(item.topic[1]);
		setTopic(item.topic[1]);

		$('#focus').val(item.focus[1]);
			
		if ($('#focus').val() === "Old Testament") {
			$("#nt-books").hide();
			$("#ot-books").show();
			$('#book-ot').val(item.book[1]);
		} else if ($('#focus').val() === "New Testament") {
			$("#ot-books").hide();
			$("#nt-books").show();
			$('#book-nt').val(item.book[1]);
		}
		$('select').selectmenu('refresh');

		$('input:radio[name=audience]').removeAttr('checked');
		$('input:radio[name=audience]').checkboxradio('refresh');
		setRadio(item.audience[1]);

		$('#length').val(item.length[1]);
		$('#lesson-text').val(item.lesson[1]);
		
		var selectFocus = $('select#focus');
		selectFocus.selectmenu();
		selectFocus.selectmenu('refresh');
		var selectBook = $('select#book');
		selectBook.selectmenu();
		selectBook.selectmenu('refresh');
		
		//remove initial listener from save button

		//Change submit button value to edit button
		$('#submit').val('Save Editted Lesson');
		$('#submit').button('refresh');
		$('#lessonForm').submit(function () {
			validateForm(lessonId);
		});
	}
	
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
			$('#lesson-name').after('<span class="error">Please enter a lesson name.</span>');
			$('#lesson-name').css("border", "1px solid red") ;
			hasError = true;
		}
		//Author validation
		if (getAuthor === "") {
		 	$('#author').after('<span class="error">Please enter an author name.</span>');
			$('#author').css("border", "1px solid red") ;
			hasError = true;
		}
		//Email validation
		var re = /^\w+([\.-]?]\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if ((getEmail === '') || (!re.test(getEmail))) {
			$('#email').after('<span class="error">Please enter a valid email address.</span>');
			$('#email').css("border", "1px solid red") ;
			hasError = true;
		} 
		
		//Topic validation
		if (getTopic === "--Choose A Topic--") {
			$('#select > div').after('<span class="error">Please choose a topic.</span>');
			var topicError = "Please choose a topic.";
			$('#select > div').css("border", "1px solid red") ;
			hasError = true;
		}

		//Set Errors
		if (hasError === true) {
			$('#submit-container').after('<span class="error">Please correct the errors above.</span>');
			event.preventDefault();
			return false;
		} else {
			//If all is validated, save the data and send the key value from editData
			storeData(lessonId);
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
			
			if ($('#focus').val() === 'New Testament') {
				var book = $('#book-nt').val();
			} else if ($('#focus').val() === 'Old Testament') {
				var book = $('#book-ot').val();
			}
	
			// Gather up all form values and labels.
			//Find the value of the selected radio button.
			var newItem = {};
				newItem.name = ["Lesson Name:", $('#lesson-name').val()];
				newItem.author = ["Author:", $('#author').val()];
				newItem.email = ["Email:", $('#email').val()];
				newItem.date = ["Date:", $('#date').val()];
				newItem.topic = ["Topics:", $('#topics').val()];
				newItem.focus = ["Focus:", $('#focus').val()];
				newItem.book = ["Book:", book];
				newItem.audience = ["Audience:", getRadio()];
				newItem.length = ["Lesson Length:", $('#length').val()];
				newItem.lesson = ["Lesson Text:", $('#lesson-text').val()];
	
			//Save data into local storage
			localStorage.setItem(id, JSON.stringify(newItem));
			alert("Bible Study Lesson successfully saved.");
	        parent.history.back();
		}

	});
		

	
	//Create select field element and populate with options.
	function makeTopics() {
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
		var ask = confirm("Are you sure you want to delete this lesson?");
		if (ask) {
			localStorage.removeItem(lessonId);
			alert("Lesson was successfully deleted.");
			if (localStorage.length === 0) {
				window.location.href = "index.html";
			} else {
        		parent.history.back();
			}
		} else {
			alert("Lesson was NOT deleted.");
		}
	});
	



