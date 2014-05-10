var tempz = {
	span : [ {
		div: function(data) {
			//console.log(data.name);
			return data.name+"'s Contact List";
		}
	}, {
		table: [ {
			thead: [ {
				tr: [
					{th: "Name"},
					{th: "Phone"}
				]
			} ],
			$id : "testHeaderID"
		},{
			$tz_contactList: function(item, index, list) {
				var row = {
					tr: [
						{td: ""},
						{td: ""}
					]
				}; // row template

				if(item.friend) // if friend add bolding
				{
					row.tr[0].td = [
						{ b : item.name }
					];
				} else {
					row.tr[0].td = item.name;
				}
				row.tr[1].td = item.phone;

				return row;
			}
		}, {
			tfoot: [ {
				tr: [
					{th: "Footer1"},
					{th: "Footer2"}
				]
			} ]
		} ],
		$id : "testTableID"
	} ]
};

var dataz = {
	name: "John Hall",
	contactList: app._contactList
};

TemplateZ.logging = false;

var TzObj = TemplateZ.create(tempz, dataz);
TzObj.appendToElementById("benchmarkTemplate");

app._endTime = performance.now();
console.log("TemplateZ Inner Time:", app._endTime - app._startTime, "ms");
