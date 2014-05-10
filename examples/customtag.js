
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
					{th: "Address"}
				]
			} ]
		},{
			$tz_contactList: function(item, index, list) {
				var row = {
					tr: [
						{td: item.name},
						{address: item.address}
					]
				}; // row template

				return row;
			}
		} ]
	} ]
};

var addressTag = function(addressData){
	var addressTz = {
		div: [
			{div: ""},
			{div: ""}
		]
	};

	addressTz.div[0].div = addressData.street1;
	if(addressData.street2.length > 0)
		addressTz.div[0].div += "<br>" + addressData.street2;

	addressTz.div[1].div = addressData.city + ", " + addressData.state + " " + addressData.zipcode;

	return addressTz;
};
TemplateZ.on('tag', "address", addressTag);


var dataz = {
	name: "John Hall",
	contactList: [
		{ name: "Billy",
		  address: {
		  	street1: "1234 Way",
		  	street2: "",
		  	city: "AnyTown",
		  	state: "Ca",
		  	zipcode: "92167"
		  }
		},
		{ name: "Bob",
		  address: {
			street1: "4567 AnyRoad",
		  	street2: "Apt #7",
		  	city: "New York",
		  	state: "Ny",
		  	zipcode: "38764"
		  }
		}
	]
};


var TzObj = TemplateZ.create(tempz, dataz);
TzObj.appendToElementById("customtagTemplate");

