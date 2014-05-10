var data = {
	name: "John Hall",
	contactList: app._contactList  // {name:"Billy", phone: "123-123-1234"}
};

var source = document.getElementById("bench-template").innerHTML;
var template = Handlebars.compile(source);
var html = template(data);

var doc = document.getElementsByTagName("body")[0];
doc.innerHTML = html;


app._endTime = performance.now();
console.log("Handlebars Inner Time:", app._endTime - app._startTime, "ms");
