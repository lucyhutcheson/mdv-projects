$('#home').live('pageinit', function (event) {
	$.ajax({
		"url": "_view/categories",
		"dataType": "json",
		"success": function(data) {
			$.each(data.rows, function(index,category){
				var name = category.value.name;
				var description = category.value.description;
				$('#categoryList').append(
					$('<li>').append(
						$('<a>').attr("href", "#lessons?cat="+name)
							.attr("data-transition", "slide")
							.attr('rel', 'external')
							.text(name)
					)
				);
			});
			$('#categoryList').listview('refresh');
		},
		"error": function(result){
			console.log(result);
		} 
	});

});
$('#lessons').live('pagehide', function (event) {
	$('#lessons #header #title').remove();
	$('#lessonList').empty();
	var category = '';
});

$('#lessons').live('pageshow', function (event) {
	var category = getUrlVars()["cat"];
	var catUrl = "_view/"+category.toLowerCase();
	$('<h1></h1>').addClass('ui-title')
		.attr('data-theme','f')
		.attr('role', 'heading')
		.attr('id', 'title')
		.attr('aria-level', 1)
		.text(category).prependTo('#lessons #header').trigger('create');

	$.ajax({
		"url": catUrl,
		"dataType": "json",
		"success": function(data) {
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
		"error": function(result){
			console.log(result);
		} 
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
			console.log(data);
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
			});

		},
		"error": function(result){
			console.log(result);
		} 
	});

	//Create Edit button
	//$("#navbar ul").append('<li id="edit-list" class="ui-block-c"><a id="edit" href="additem.html?lessonId='+lessonId+'&op=edit" title="Edit Lesson" class="ui-btn ui-btn-up-c ui-btn-icon-top" rel="external" data-icon="gear" data-corners="false" data-shadow="false" data-iconshadow="true" data-inline="false" data-wrapperels="span" data-iconpos="top"><span class="ui-btn-inner"><span class="ui-btn-text">Edit</span><span class="ui-icon ui-icon-edit ui-icon-shadow"></span></span></a></li>');
	
});


// Get value from URL
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m,key,value) {
		vars[key] = value;
	});
	return vars;
}
