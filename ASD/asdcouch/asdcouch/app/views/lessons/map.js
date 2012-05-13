function(doc) {
  if (doc._id.substr(0,7) === "lesson:") {
    emit(doc._id, {
    	"name": doc.name,
    	"author": doc.author,
    	"email": doc.email,
    	"date": doc.date,
    	"topic": doc.topic,
    	"focus": doc.focus,
    	"book": doc.book,
    	"audience": doc.audience,
    	"length": doc.length,
    	"lesson": doc.lesson
   });
  }
};