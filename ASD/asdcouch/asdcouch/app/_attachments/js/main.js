$('#home').live('pageinit', function (event) {
	$.ajax({
		"url": "_view/categories",
		"dataType": "json",
		"success": function(data) {
			console.log(data);
			$.each(data.rows, function(index,category){
				var name = category.value.name;
				var description = category.value.description;
				$('#categoryList').append(
					$('<li>').append(
						$('<a>').attr("href", "#lessons?cat="+name).attr("data-transition", "slide")
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

$('#lessons').live('pageinit', function (event) {
alert('categories');
	var category = getUrlVars()["cat"];
	$.ajax({
		"url": "_view/lessons",
		"dataType": "json",
		"success": function(data) {
			console.log(data);
			$.each(data.rows, function(index,lesson){
				var key = lesson.key;
				var name = lesson.value.name[1];
				var topic = lesson.value.topic[1];
				var description = lesson.value.lesson[1];
				var date = lesson.value.date[1];
				$('#lessons #lessonList').append(
					$('<li>').append(
						$('<a>').attr("href", "#").attr("data-transition", "slide").append(
								$('<h3>').addClass(key).attr("data-transition", "slide")
								.text(name),
							$('<p>').addClass('subhead ' + key).html('<strong>Topic:</strong> '+ topic),
							$('<p>').addClass('ui-li-desc ' + key).text(description),
							$('<p>').addClass('date ui-li-aside ' + key).text(date)
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


// Get value from URL
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m,key,value) {
		vars[key] = value;
	});
	return vars;
}
