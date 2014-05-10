
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
			} ]
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
			},
			$tz_favContact: function(item, index, list) {
				var row = {
					tr: [
						{td: ""},
						{td: ""}
					]
				}; // row template

				row.tr[0].td = "* "+ index;
				row.tr[1].td = item.phone;

				return row;
			},
			$tz_$favContact: function(favContactData) {
				var row = {
					tr: [
						{td: ""},
						{td: ""}
					]
				}; // row template

				//console.log(favContactData);

				row.tr[0].td = "Total Fav Count:";
				row.tr[1].td = Object.keys(favContactData).length;

				return row;
			}
		}, {
			tfoot: [ {
				tr: [
					{th: "Footer1"},
					{th: "Footer2"}
				]
			} ]
		} ]
	} ]
};

var dataz = {
	name: "John Hall",
	contactList: [
		{ name: "Billy",
		  phone: "123-123-1234"},
		{ name: "Bob",
		  phone: "456-789-0987",
		  friend: true
		}
	],
	favContact: {
		"John": { phone: "987-654-4321"},
		"Frank": { phone: "432-321-6543"}
	}
};


var TzObj = TemplateZ.create(tempz, dataz);
TzObj.appendToElementById("foreachTemplate");

