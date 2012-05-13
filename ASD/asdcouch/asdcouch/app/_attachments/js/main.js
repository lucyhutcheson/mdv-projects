$(document).ready(function() {
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
						$('<a>').attr("href", "#")
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