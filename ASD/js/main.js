/**
 * @author Lucy Hutcheson
 * Created for:  Advanced Scalable Data Infrastructures 1205
 */

$(document).ready(function() {

	//Variable defaults
	var bibleTopics = ["--Choose A Topic--", "Christian Life", "Marriage", "Family"],
		audienceValue;
	var category = getUrlVars()["cat"];
	var lessonId = getUrlVars()["lessonId"];
	var op = getUrlVars()["op"];


	if(op != 'edit') {
		$("#submit").click(function() {
		  validateForm();
		});
	}

	// Operator Functions
	$("#delete").click(function() {
	  deleteLesson();
	});
	$('#clear').click(function() {
	  clearLocal();
	});


	// Get value from URL
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}

	// Responsive Disclosure
	function bible_book_disclosure() {
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
	$("#focus").change(function(){
		bible_book_disclosure();
	});
	
	
	// Pull the right JSON Data
	switch (category) {
		case "Adults":
			localStorage.clear();
			var audience = "Adults";
			getData();
		 	break;
		case "Men":
			var audience = "Men";
			getData();
		  	break;
		case "Women":
			var audience = "Women";
			getData();
		  	break;
		case "Youth":
			localStorage.clear();
			var audience = "Youth";
			getData();
		  	break;
		case "Children":
			localStorage.clear();
			var audience = "Children";
			getData();
		  	break;
	}

	//Add default data if there is none in local storage
	function autoFillData(category){
		switch(category) {
			case 'Adults':
				$.ajax({
				     type: "GET",
				     url: 'js/xhr/data.json',
				     async: false,
				     beforeSend: function(x) {
					      if(x && x.overrideMimeType) {
					          x.overrideMimeType("application/j-son;charset=UTF-8");
					      }
					 },
				 	dataType: "json",
				 	success: function(data, status){
						//Store the JSON object in local storage
						for(var n in data.lessons){
							var id = Math.floor(Math.random()*10000001);
							localStorage.setItem(id, JSON.stringify(data.lessons[n]));
						}
					 }
				});
						var loaded = true;
						getData(loaded);
				break;
			case 'Men':
					// XML file
					var url = "js/xhr/men.xml";
					// handle response
					function XHRhandler() {
						if (xhr.readyState == 4) {
							var obj = XML2jsobj(xhr.responseXML.documentElement);
							Display(obj);
							xhr = null;
						}
					}
					
					// AJAX request
					var xhr = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
					xhr.onreadystatechange = XHRhandler;
					xhr.open("GET", url, true);
					xhr.send(null);
					function Display(data) {
						if (data && data.lessons) {
							if (data.lessons.length) {
								for (var i=0, sl=data.lessons.length; i < sl; i++) {
									store(data.lessons[i]);
								}
							} else {
								store(data.lessons);
							}
						}
						// store item
						function store(lessons) {
							var id = Math.floor(Math.random()*10000001);
							localStorage.setItem(id, JSON.stringify(lessons));
						}
					}
					var loaded = "true";
					getData(loaded);
					location.reload();
					break;
			case 'Women':
					// XML file
					var url = "js/xhr/women.xml";
					// handle response
					function XHRhandler() {
						if (xhr.readyState == 4) {
							var obj = XML2jsobj(xhr.responseXML.documentElement);
							Display(obj);
							xhr = null;
						}
					}
					// AJAX request
					var xhr = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
					xhr.onreadystatechange = XHRhandler;
					xhr.open("GET", url, true);
					xhr.send(null);
					function Display(data) {
						if (data && data.lessons) {
							if (data.lessons.length) {
								for (var i=0, sl=data.lessons.length; i < sl; i++) {
									store(data.lessons[i]);
								}
							} else {
								store(data.lessons);
							}
						}
						// store item
						function store(lessons) {
							var id = Math.floor(Math.random()*10000001);
							localStorage.setItem(id, JSON.stringify(lessons));
						}
					}
					var loaded = "true";
					getData(loaded);
					location.reload();
					break;
			}
	} 
	
	
	// Get Lessons and Build list
	function getData(loaded) {
		// Update page header title
		var category = getUrlVars()["cat"];
		$('h1#headerTitle').html(category);
		$('#errors').empty(); //Reset error messages
		
		if (loaded != "true") {
			if (category === "Adults") {
				var buttonText = "Load JSON Data";
			} else {
				var buttonText = "Load XML Data";
			}
			$("#getdata-button .ui-btn-text").text(buttonText);
			$('#getdata-button').click(function() {
				localStorage.clear();
				autoFillData(category);
			});
		}
		// Create list items from sorted storage array
		for (var i=0, len=localStorage.length; i<len; i++){
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// convert the string back to an object
			var obj = JSON.parse(value);
		 	 // $ Create list item
		 	$('<li></li>').addClass('lesson '+key).attr('data-theme','c').appendTo('#lesson-list');
			// $ Create anchor
			$('<a></a>').addClass('anchor '+key).attr('rel','external').attr('href', 'view.html?lessonId='+key+'&cat='+category).attr('data-url', 'view.html?lessonId='+key+'&cat='+category).appendTo('#lesson-list li.'+key);
			
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
		listitems.sort(function(a, b) {
			var compA = $(a).text().toUpperCase();
			var compB = $(b).text().toUpperCase();
			// Currently set to descending date based on the > < symbols
			// return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
			// Set to < > to sort ascending
			return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
		});
		$.each(listitems, function(idx, itm) { 
			mylist.append(itm); 
		});

		$('#lesson-list').listview()
		$('#lesson-list').listview('refresh');

	}


	// SHOW INDIVIDUAL LESSON FUNCTION
	if(lessonId > 0) {
		showLesson(lessonId);
	}
	function showLesson(id, cat){
		var category = getUrlVars()["cat"];
		var lessonKey = id;
		var value = localStorage.getItem(lessonKey);
		// convert the string back to an object
		var obj = JSON.parse(value);
		
		$('<div></div>').addClass('content-container ui-btn  ui-li ui-corner-top ui-corner-bottom ui-btn-up-c '+lessonKey).appendTo('#content');
		if (category === "Adults") {
			for(var n in obj){
				$('<p></p>').addClass('item-details '+lessonKey+' '+obj[n][0]).appendTo('div.'+lessonKey);
				var optSubText = "<strong>"+obj[n][0]+" </strong> "+obj[n][1];
				$('p:last').html(optSubText);
			}
			$('h1#headerTitle').replaceWith('<h1 class="ui-title" tabindex="0" role="heading" aria-level="1">'+ obj.name[1] + '</h1>');
		} else if (category === "Men" || category === "Women") {
			for(var n in obj){
				$('<p></p>').addClass('item-details '+lessonKey+' '+obj[n]).appendTo('div.'+lessonKey);
				var optSubText = obj[n];
				$('p:last').html(optSubText);
			}
			$('h1#headerTitle').replaceWith('<h1 class="ui-title" tabindex="0" role="heading" aria-level="1">'+ obj.name + '</h1>');
		}
		
		//Create Edit button
		$("#navbar ul").append('<li class="ui-block-c"><a id="edit" href="additem.html?lessonId='+id+'&op=edit" title="Edit Lesson" class="ui-btn ui-btn-up-c ui-btn-icon-top" rel="external" data-icon="gear" data-corners="false" data-shadow="false" data-iconshadow="true" data-inline="false" data-wrapperels="span" data-iconpos="top"><span class="ui-btn-inner"><span class="ui-btn-text">Edit</span><span class="ui-icon ui-icon-edit ui-icon-shadow"></span></span></a></li>');
	}
   	

	// EDIT FUNCTION
	if(op === 'edit') {
		editLesson(lessonId);
	}
	function editLesson(lessonId){
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
		$("#submit").unbind("click");

		//Change submit button value to edit button
		$('#submit').val('Save Editted Lesson');
		$('#submit').button('refresh');
		$('#lessonForm').submit(function() {
			validateForm(lessonId);
		});
	}
	
	function getRadio(){
		return($('input:radio[name=audience]:checked').val());
	}
	
	function setRadio(myRadio){
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
	
	function setTopic(myTopic){
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


	// DELETE FUNCTION
	function deleteLesson() {
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
	}
	
	// CLEAR ALL FUNCTION
	function clearLocal() {
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
	}

	// VALIDATE FUNCTION
	function validateForm(lessonId) {
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
		if ((getEmail === '') || (!re.test(getEmail))){
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
	function storeData(key){
		//Create new key if one doesn't exist.
		if(!key){
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
	
	//Create select field element and populate with options.
	function makeTopics(){
		$('<select></select>').attr('id', 'topics').attr('data-theme', 'c').attr('data-native-menu',false).appendTo('#select');
		for (var i=0, j=bibleTopics.length; i<j; i++){
			var optText = bibleTopics[i];
			$('<option></option>').attr('value', optText).attr('id', optText).attr('data-theme', 'c').appendTo('select#topics');
			$('#topics option:last-child').html(optText);
		}
		var selectTopics = $('select#topics');
		selectTopics.selectmenu();
		selectTopics.selectmenu('refresh');
	}


	//  Set default date
	function setDate(){
		if (!($('#date').val()) ) {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;//January is 0!
			var yyyy = today.getFullYear();
			if(dd<10){dd='0'+dd;}
			if(mm<10){mm='0'+mm;}
			$('#date').val(mm+'/'+dd+'/'+yyyy);
		}
	}
	

	makeTopics();
	setDate();


});