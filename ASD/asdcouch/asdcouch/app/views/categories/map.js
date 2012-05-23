function(doc) {
  if (doc._id.substr(0,9) === "category:") {
	    emit(doc._id.substr(9), {
	    	"name": doc.name,
	    	"description": doc.description
	   });
  }
};