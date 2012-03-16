/**
 * @author Lucy Hutcheson
 * Date: 2012-03-01
 * Created for:  Mobile Interfaces and Usability 1203
 */

	//Variable defaults
	var bibleTopics = ["--Choose A Topic--", "Christian Life", "Marriage", "Family"],
		audienceValue,
		errMsg = $('errors');
	makeTopics();
	var category = getUrlVars()["cat"];
	var lessonId = getUrlVars()["lessonId"];
	var op = getUrlVars()["op"];


	function getData(audience) {
		// Update page header title
		var category = getUrlVars()["cat"];
		$('h1#headerTitle').replaceWith('<h2>'+ category + '</h2>');

		$('#errors').empty(); //Reset error messages
		if (localStorage.length === 0) {
			autoFillData(audience);
		}
		
		//Sort my localStorage		
		var jsonArray = [];
		for (var i=0, len=localStorage.length; i<len; i++){
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			jsonArray.push(value);
		}
		var sortedArray = jsonArray.sort();
		// Create list items from sorted storage array
		for (var i=0, len=sortedArray.length; i<len; i++){
			var makeDiv = document.createElement('div');
			makeDiv.setAttribute("data-role", "collapsible");
			makeDiv.setAttribute("data-theme", "c");
			$('#lesson-list').append(makeDiv);

			var value = sortedArray[i];
			// convert the string back to an object
			var obj = JSON.parse(value);
			var makeHeader = document.createElement('h3');
			var headerText = obj.name[1];
			makeDiv.appendChild(makeHeader);
			makeHeader.innerHTML = headerText;		
			
			// Add Content Details
			for(var n in obj){
				var makeSubP = document.createElement('p');
				makeSubP.setAttribute("class", "item-details ");
				makeDiv.appendChild(makeSubP);
				var optSubText = "<strong>"+obj[n][0]+" </strong> "+obj[n][1];
				makeSubP.innerHTML = optSubText;
			}
			
			var makeSubDiv = document.createElement('div');
			makeSubDiv.setAttribute("data-role", "controlgroup");
			makeSubDiv.setAttribute("data-type", "horizontal");
			makeDiv.appendChild(makeSubDiv);
			//Edit Button
			var makeEdit = document.createElement('a');
			makeEdit.setAttribute("data-role", "button");
			makeEdit.setAttribute("rel", "external");
			makeEdit.setAttribute("data-icon", "gear");
			makeEdit.setAttribute("href", "additem.html?lessonId="+key+"&op=edit");
			makeSubDiv.appendChild(makeEdit);
			var editText = "Edit";
			makeEdit.innerHTML = editText;
			//Delete Button
			var makeDelete = document.createElement('a');
			makeDelete.setAttribute("data-role", "button");
			makeDelete.setAttribute("onclick", "deleteLesson("+key+");return false;");
			makeDelete.setAttribute("rel", "external");
			makeDelete.setAttribute("data-icon", "delete");
			makeSubDiv.appendChild(makeDelete);
			var deleteText = "Delete";
			makeDelete.innerHTML = deleteText;
		}

	}

	switch (category) {
	case "Adults":
		var audience = "Adults";
		getData(json.adults.lessons);
	 	break;
	case "Men":
		var audience = "Men";
		getData(json.men.lessons);
	  	break;
	case "Women":
		var audience = "Women";
		getData(json.women.lessons);
	  	break;
	case "Youth":
		var audience = "Youth";
		getData(json.youth.lessons);
	  	break;
	case "Children":
		var audience = "Children";
		getData(json.children.lessons);
	  	break;
	}

     
	if(lessonId > 0) {
		showLesson(lessonId, category);
	}
	function showLesson(id, category){
			var lessonKey = id;
			var value = localStorage.getItem(lessonKey);
			// convert the string back to an object
			var obj = JSON.parse(value);

			var makeSubDiv = document.createElement('div'); //create sub div
		    $('#content').append(makeSubDiv);
			for(var n in obj){
				var makeSubP = document.createElement('p');
				var audienceClass = obj.audience[1];
				makeSubP.setAttribute("class", "item-details " + audienceClass.toLowerCase() );
				makeSubDiv.appendChild(makeSubP);
				var optSubText = "<strong>"+obj[n][0]+" </strong> "+obj[n][1];
				makeSubP.innerHTML = optSubText;
			}
			var makeHeader = document.createElement('h3');
			//var headerText = obj.name[1];
			makeSubDiv.appendChild(makeHeader);
			//makeHeader.innerHTML = headerText;
			$('h1#headerTitle').replaceWith('<h1>'+ obj.name[1] + '</h1>');
	}
  
	//Add default data if there is none in local storage
	function autoFillData(audience){
		//Store the JSON object in local storage
		for(var n in audience){
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(audience[n]));
		}
	} 

	
  
    //Create select field element and populate with options.
	function makeTopics(){
		var formTag = document.getElementsByTagName("form"), // formTag is an array of all form tags.
			makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "topics");
		for (var i=0, j=bibleTopics.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = bibleTopics[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		$('#select').append(makeSelect);
		
	}
	
	//  Set default date
	function setDate(){
		if (!($('#date').val()) ) {
			var now = new Date();
			$('#date').val(now);	
		}
	}
	
	//Find the value of the selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].audience;
		for (var i=0; i<radios.length; i++){
			if(radios[i].checked){
				audienceValue = radios[i].value;
			}
		}
	}
	

	//Save data into local storage.
	function storeData(key,category){
		//Create new key if one doesn't exist.
		if(!key){
			var id = Math.floor(Math.random()*10000001);
		}else{
			//Use the existing key.
			var id = key;
		}
		// Gather up all form values and labels.
		//Find the value of the selected radio button.
		var newItem = {};
			newItem.name = ["Lesson Name:", $('#lesson-name').val()];
			newItem.author = ["Author:", $('#author').val()];
			newItem.email = ["Email:", $('#email').val()];
			newItem.date = ["Date:", $('#date').val()];
			newItem.topic = ["Topics:", $('#topics').val()];
			newItem.book = ["Book:", $('#book').val()];
			newItem.audience = ["Audience:", $('input:radio[name=audience]:checked').val()];
			newItem.length = ["Lesson Length:", $('#length').val()];
			newItem.lesson = ["Lesson Text:", $('#lesson-text').val()];

		//Save data into local storage
		localStorage.setItem(id, JSON.stringify(newItem));
		alert("Bible Study Lesson successfully saved.");
		window.location.href = "lessons.html?cat="+newItem.audience[1];
	}



		
	// Make Item Links function to create edit/delete links for items 
	function makeItemLinks(key, linksLi){	
		//Add edit link
		var editLink = document.createElement('a');
		editLink.setAttribute("class", "edit-link"); //Add class for styling
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Lesson";
		editLink.addEventListener("click", editLesson);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		
		//Add delete link
		var deleteLink = document.createElement('a');
		deleteLink.setAttribute("class", "delete-link"); //Add class for styling
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Lesson";
		deleteLink.addEventListener("click", deleteLesson);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
		linksLi.setAttribute("id", "modify-links"); //Add id for styling
	}
	
	// EDIT FUNCTION
	if(op === 'edit') {
		editLesson(lessonId);
	}
	function editLesson(lessonId){
		//Grab the data from local storage
		var value = localStorage.getItem(lessonId);
		var item = JSON.parse(value);
		
		//populate the form fields with current values
		$('#lesson-name').val(item.name[1]);
		$('#author').val(item.author[1]);
		$('#email').val(item.email[1]);
		$('#date').val(item.date[1]);
		$('#topics').val(item.topic[1]);
		$('#book').val(item.book[1]);
		var radios = document.forms[0].audience;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Adults" && item.audience[1] == "Adults") {
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Children" && item.audience[1] == "Children") {
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Youth" && item.audience[1] == "Youth") {
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Men" && item.audience[1] == "Men") {
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Women" && item.audience[1] == "Women") {
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('#length').val(item.length[1]);
		$('#lesson-text').val(item.lesson[1]);
		//remove initial listener from save button
		$("#submit").unbind("click");
		//Change submit button value to edit button
		$('#submit').attr('value','Edit Lesson');
		$('#lessonForm').submit(function() {
			validateForm(lessonId);
		});
	}
		
	function deleteLesson(lessonId){
		var ask = confirm("Are you sure you want to delete this lesson?");
		if(ask){
			localStorage.removeItem(lessonId);
			alert("Lesson was successfully deleted.")
			window.location.reload();
		}else{
			alert("Lesson was NOT deleted.");
		}
	}
	
	//Clear all data
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			var ask = confirm("Are you sure you want to delete all lessons?");
			if(ask){
				localStorage.clear();
				alert("All information deleted.");
				window.location.reload();
				return false;
			}else{
				alert("Lesson was NOT deleted.");
			}
		}
	}

	function validateForm() {
		var getLessonName = $("#lesson-name").val();
		var getAuthor = $("#author").val();
		var getEmail = $("#email").val();
		var getTopic = $("#topics").val();

		//Reset error messages
		$('#errors').empty();
		$('#lesson-name').css("border", "none") ;
		$('#author').css("border", "none") ;
		$('#email').css("border", "none") ;
		$('#select > div').css("border", "none") ;

		//Get Error messages
		var messageArray = [];
		//Lesson Name validation
		if(getLessonName == ""){
			var lessonError = "Please enter a lesson name.";
			$('#lesson-name').css("border", "1px solid red") ;
			messageArray.push(lessonError);
		}
		//Author validation
		if(getAuthor == ""){
			var authorError = "Please enter an author name.";
			$('#author').css("border", "1px solid red") ;
			messageArray.push(authorError);
		}
		//Email validation
		var re = /^\w+([\.-]?]\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (getEmail == ''){
			var emailError = "Please enter a valid email address.";
			$('#email').css("border", "1px solid red") ;
			messageArray.push(emailError);
		} else if (!re.test(getEmail)) {
			var emailError = "Please enter a valid email address.";
			$('#email').css("border", "1px solid red") ;
			messageArray.push(emailError);
		}
		
		//Topic validation
		if(getTopic === "--Choose A Topic--"){
			var topicError = "Please choose a topic.";
			$('#select > div').css("border", "1px solid red") ;
			messageArray.push(topicError);
		}
		if(messageArray.length >= 1){
			for(var i=0, j=messageArray.length; i<j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageArray[i];
				$('#errors').append(txt);
			}
			event.preventDefault();
			return false;
		}else{
			//If all is validated, save the data and send the key value from editData
			storeData(this.key);
		}
	}

	// Get value from URL
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
	


	if(op != 'edit') {
		$("#submit").click(function() {
		  validateForm();
		});
	}

