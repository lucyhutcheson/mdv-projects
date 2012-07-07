function(doc) {
  if (doc._id.substr(0,9) === "disciple:") {
	    emit(doc._id.substr(9), {
	    	"id": doc._id,
	    	"firstname": doc.firstname,
	    	"lastname": doc.lastname,
	    	"email": doc.email,
	    	"phone": doc.phone,
	    	"street": doc.street,
	    	"city": doc.city,
	    	"state": doc.state,
	    	"zip": doc.zip,
	    	"birthmonth": doc.birthmonth,
	    	"birthday": doc.birthday,
	    	"birthyear": doc.birthyear,
	    	"schoolstatus": doc.schoolstatus,
	    	"gender": doc.gender,
	    	"bornagain": doc.bornagain,
	    	"frequency": doc.frequency,
	    	"notes": doc.notes
	   });
  }
};