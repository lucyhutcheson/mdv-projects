/**
 * @author Lucy Hutcheson
 * Date: 2012-03-01
 * Created for:  Mobile Interfaces and Usability 1203
 */

// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
	//getElementById Function
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}
	//Create select field element and populate with options.
	function makeTopics(){
		var formTag = document.getElementsByTagName("form"), // formTag is an array of all form tags.
			selectLi = $('select'),
		makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "topics");
		for (var i=0, j=bibleTopics.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = bibleTopics[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
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
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('lessonForm').style.display = "none";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "block";
				$('required').style.display = "none";
				document.getElementById("pageTitle").innerHTML="Submitted Bible Study Lessons";
				break;
			case "off":
				$('lessonForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}

	//Save data into local storage.
	function storeData(key){
		//Create new key if one doesn't exist.
		if(!key){
			var id = Math.floor(Math.random()*10000001);
		}else{
			//Use the existing key.
			id = key;
		}
		// Gather up all form values and labels.
		getSelectedRadio();
		var item = {};
			item.name = ["Lesson Name:", $('lesson-name').value];
			item.author = ["Author:", $('author').value];
			item.email = ["Email:", $('email').value];
			item.date = ["Date:", $('date').value];
			item.topic = ["Topics:", $('topics').value];
			item.book = ["Book:", $('book').value];
			item.audience = ["Audience:", audienceValue];
			item.length = ["Lesson Length:", $('length').value];
			item.lesson = ["Lesson Text:", $('lesson-text').value];
		//Save data into local storage
		localStorage.setItem(id, JSON.stringify(item));
		alert("Bible Study Lesson successfully saved.");
	}
	
	//Retrieve data for display
	function getData(){
		toggleControls("on");
		errMsg.innerHTML = ""; //Reset error messages
		if(localStorage.length === 0){
			alert("There is no data inlocal storage so default data was added.")
			autoFillData();
		}
		
		//write Data from Local Storage to the browser
		var contentDiv = $('content');
		var makeDiv = document.createElement('div'); // Create div
		makeDiv.setAttribute("id", "items"); //set ID
		var makeList = document.createElement('ul'); //create list
		makeList.setAttribute("class", "results");
		makeDiv.appendChild(makeList); //Add list to div
		contentDiv.appendChild(makeDiv)
		$('items').style.display = "block"; //Make sure items display when getData
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// convert the string back to an object
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul'); //create sub ul
			makeSubList.setAttribute("class", "results-details");
			makeli.appendChild(makeSubList); // add sub ul to li
			getImage(obj.audience[1], makeSubList); // Get images for audience
			for(var n in obj){
				var makeSubli = document.createElement('li');
				var audienceClass = obj.audience[1];
				makeSubli.setAttribute("class", "item-details " + audienceClass.toLowerCase() );
				makeSubList.appendChild(makeSubli);
				var optSubText = "<strong>"+obj[n][0]+" </strong> "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete links for each item in local storage.
		}
	}
	
	//Get the image for the right audience
	function getImage(audience, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ audience + ".png");
		imageLi.appendChild(newImg);
	}
	
	//Add default data if there is none in local storage
	function autoFillData(){
		//Store the JSON object in local storage
		for(var n in json.adults.lessons){
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json.adults.lessons[n]));
		}
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
	
	function editLesson(){
		//Grab the data from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
	
		//Show the form
		toggleControls("off");
		
		//populate the form fields with current values
		$('lesson-name').value = item.name[1];
		$('author').value = item.author[1]
		$('email').value = item.email[1];
		$('date').value = item.date[1];
		$('topics').value = item.topic[1];
		$('book').value = item.book[1];
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
		$('length').value = item.length[1];
		$('lesson-text').value = item.lesson[1];
		//remove initial listener from save button
		save.removeEventListener("click", storeData);
		//Change submit button value to edit button
		$('submit').value = "Edit Lesson";
		var editSubmit= $('submit');
		editSubmit.addEventListener("click", validateForm);
		editSubmit.key = this.key;
	}
	
	function deleteLesson(){
		var ask = confirm("Are you sure you want to delete this lesson?");
		if(ask){
			localStorage.removeItem(this.key);
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

	function validateForm(e) {
		var getLessonName = $('lesson-name');
		var getAuthor = $('author');
		var getEmail = $('email');
		var getTopic = $('topics');
		
		//Reset error messages
		errMsg.innerHTML = "";
		getLessonName.style.border = "";
		getAuthor.style.border = "";
		getEmail.style.border = "";
		getTopic.style.border = "";
		
		//Get Error messages
		var messageArray = [];
		//Lesson Name validation
		if(getLessonName.value === ""){
			var lessonError = "Please enter a lesson name.";
			getLessonName.style.border = "1px solid red";
			messageArray.push(lessonError);
		}
		//Author validation
		if(getAuthor.value === ""){
			var authorError = "Please enter an author name.";
			getAuthor.style.border = "1px solid red";
			messageArray.push(authorError);
		}
		//Email validation
		var re = /^\w+([\.-]?]\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageArray.push(emailError);
		}
		//Topic validation
		if(getTopic.value === "--Choose A Topic--"){
			var topicError = "Please choose a topic.";
			getTopic.style.border = "1px solid red";
			messageArray.push(topicError);
		}
		if(messageArray.length >= 1){
			for(var i=0, j=messageArray.length; i<j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageArray[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			//If all is validated, save the data and send the key value from editData
			storeData(this.key);
		}
	}

	//Variable defaults
	var bibleTopics = ["--Choose A Topic--", "Christian Life", "Marriage", "Family"],
		audienceValue,
		errMsg = $('errors');
	
	// Hide these functions from lessons page.
	if (!(audience)) {
		makeTopics();

		//Set Link & Submit Click Events
		var displayLink = $('displayLink');
		displayLink.addEventListener("click", getData);
		var clearLink = $('clear');
		clearLink.addEventListener("click", clearLocal);
		var save = $('submit');
		save.addEventListener("click", validateForm);
	}
	
});

	var category = getUrlVars()["cat"];
	var lessonId = getUrlVars()["lessonId"];
	var op = getUrlVars()["op"];

	function getJQMData(audience) {
		// Update page header title
		var category = getUrlVars()["cat"];
		$('h1#headerTitle').replaceWith('<h2>'+ category + '</h2>');

		$('#errors').empty(); //Reset error messages
		if (localStorage.length === 0) {
			autoFillJQMData(audience);
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
		}

	}
	switch (category) {
	case "Adults":
		var audience = "Adults";
		getJQMData(json.adults.lessons);
	 	break;
	case "Men":
		var audience = "Men";
		getJQMData(json.men.lessons);
	  	break;
	case "Women":
		var audience = "Women";
		getJQMData(json.women.lessons);
	  	break;
	case "Youth":
		var audience = "Youth";
		getJQMData(json.youth.lessons);
	  	break;
	case "Children":
		var audience = "Children";
		getJQMData(json.children.lessons);
	  	break;
	}

     

	//Add default data if there is none in local storage
	function autoFillJQMData(audience){
		//Store the JSON object in local storage
		for(var n in audience){
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(audience[n]));
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
	
	$('#clear-all').click(function() {
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			var ask = confirm("Are you sure you want to delete all lessons?");
			if(ask){
				localStorage.clear();
				alert("All information deleted.");
				window.location.href="index.html";
				return false;
			}else{
				alert("Lesson was NOT deleted.");
			}
		}
	});
