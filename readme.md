# TemplateZ [![Build Status](https://secure.travis-ci.org/jstty/js-templatez.png)](http://travis-ci.org/jstty/js-templatez) [![Dependency Status](https://david-dm.org/jstty/js-templatez.png?theme=shields.io)](https://david-dm.org/jstty/js-templatez) [![devDependency Status](https://david-dm.org/jstty/js-templatez/dev-status.png?theme=shields.io)](https://david-dm.org/jstty/js-templatez#info=devDependencies)

> A javascript template library that you define the html and template functions in a JSON.

## Bower
```sh
$ bower install templatez
```

## Usage

### Basic
```js
var tempz = {
	span : function(data) {
		return "Hello "+data.name.first+" "+data.name.last;
	}
};

var dataz = {
	name: { first: "John", last: "Hall"}
};
/*
The above template and data will generate this html

<span>Hello John Hall</span>

*/

// create TemplateZ object
var TzObj = TemplateZ.create(tempz, dataz);

// compiles the template in to a dom object
/*
var domobj = TzObj.compile();
*/

// if only the id is passed in then the template is automaticlly compiled into a cached dom object
TzObj.appendToElementById("basicTemplate");
```

### Dynamic Attributes
```js
var tempz = {
	span : function(data) {
		return "Hello "+data.name.first+" "+data.name.last;
	},
	$id : function(data) {
		return data.name.first+"_"+data.name.last+"_id";
	},
	$style : "color:red"
};

var dataz = {
	name: { first: "John", last: "Hall"}
};
/*
The above template and data will generate this html

<span id="John_Hall_id" style="color:red">Hello John Hall</span>

*/

// create TemplateZ object
var TzObj = TemplateZ.create(tempz, dataz);

// compiles the template in to a dom object
/*
var domobj = TzObj.compile();
*/

// if only the id is passed in then the template is automaticlly compiled into a cached dom object
TzObj.appendToElementById("attributesTemplate");
```


### Custom Tags
```js
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
```

### For Each
```js
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
```

### Nested
```js
var users = function(item, index, list, rootData) {

	function blogs(item, index, list, rootData) {

		function comments(item, index, list, rootData){
			return {
				li: [
					{ div: "Message: "+item.content},
					{ div: "By: "+rootData.users[item.userId].info.name}
				]
			};
		}

		return {
			li: [
				{ div: item.post },
				{
					ol: [ { $tz_comments: comments } ]
				}
			]
		};
	}

	return {
		li : [
			{ div: item.info.name+" ("+item.info.email+")" },
			{
				ol: [ { $tz_blogs: blogs } ]
			}
		]
	};
}

var tempz = {
	ol: [
		{
			$tz_users: users
		}
	]
};

var dataz = {
	users : {
		123 : {
			info: {
				name: "Billy",
				email: "Billy@aol.com"
			},
			blogs: [
				{
					post: "Hello World!",
					comments: [
						{
							userId : 456,
							content: "Hi Billy!"
						},
						{
							userId : 123,
							content: "Hi Bob!"
						}
					]
				},
				{
					post: "I this sweet grilled cheese sandwich yesterday at this place downtown.",
					comments: [
						{
							userId : 456,
							content: "I had a soup from there last week. It was pretty good."
						}
					]
				}
			]
		},
		456: {
			info: {
				name: "Bob",
				email: "Bob@aol.com"
			},
			blogs: [
				{
					post: "What is this TemplateZ and why would I use it?...",
					comments: [
						{
							userId : 123,
							content: "It looks different and sort of cool"
						},
						{
							userId : 123,
							content: "On second thought, this is awesome!"
						}
					]
				}
			]
		}
	}
};

var TzObj = TemplateZ.create(tempz, dataz);
TzObj.appendToElementById("nestedTemplate");
```

### Nested Tags
```js
var tempz = {
	ol: [ {
		$tz_users: function(item, index, list, rootData){
			return { user : item };
		}
	} ]
};

var userTag = function(userData, rootData){
	return {
		li : [
			{ div: userData.info.name+" ("+userData.info.email+")" },
			{
				ol: [ {
					$tz_blogs: function(item, index, list, rootData){
						return { blog : item };
					}
				} ]
			}
		]
	};
};
TemplateZ.on('tag', "user", userTag);

var blogTag = function(blogData, rootData){
	return {
		li: [
			{ div: blogData.post },
			{
				ol: [ {
					$tz_comments: function(item, index, list, rootData){
						return { comment : item };
					}
				} ]
			}
		]
	};
};
TemplateZ.on('tag', "blog", blogTag);

var commentTag = function(commentData, rootData){
	return {
		li: [
			{ div: "Message: "+commentData.content},
			{ div: "By: "+rootData.users[commentData.userId].info.name}
		]
	};
};
TemplateZ.on('tag', "comment", commentTag);


var dataz = {
	users : {
		123 : {
			info: {
				name: "Billy",
				email: "Billy@aol.com"
			},
			blogs: [
				{
					post: "Hello World!",
					comments: [
						{
							userId : 456,
							content: "Hi Billy!"
						},
						{
							userId : 123,
							content: "Hi Bob!"
						}
					]
				},
				{
					post: "I this sweet grilled cheese sandwich yesterday at this place downtown.",
					comments: [
						{
							userId : 456,
							content: "I had a soup from there last week. It was pretty good."
						}
					]
				}
			]
		},
		456: {
			info: {
				name: "Bob",
				email: "Bob@aol.com"
			},
			blogs: [
				{
					post: "What is this TemplateZ and why would I use it?...",
					comments: [
						{
							userId : 123,
							content: "It looks different and sort of cool"
						},
						{
							userId : 123,
							content: "On second thought, this is awesome!"
						}
					]
				}
			]
		}
	}
};

var TzObj = TemplateZ.create(tempz, dataz);
TzObj.appendToElementById("nestedTemplate");
```

### Nested TemplateZ
```js
var nestedExample = {
  div : [ {
    $template_tempZ: "nest"
  },{
    div: function(data) {
      return "Now we are going to show some bands. "+data.test;
    }
  },{
    $template_bandZ: "band"
  } ]
};

var bandZ = {
  div: [ {
    span: "Band Name"
  },{
    ul: [ {
      $tz_bandList: function(item, index, list) {
        var listItem = {
          li: [
          {
            span: item.bandName
          }]
        }

        return listItem;
      }
    } ]
  } ]
};

var tempZ = {
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
            {td: ""},
            {address: null}
          ]
        }; // row template

        row.tr[0].td = item.name;
        row.tr[1].address = item.address;

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
TemplateZ.on('tag', "tempZ", tempZ);
TemplateZ.on('tag', "bandZ", bandZ);

var dataz = {
  test: "What Fun!",
  nest: {
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
  },
  band: {
    bandList: [
    {
      bandName: "Behemoth"
    },
    {
      bandName: "Amon Amarth"
    },
    {
      bandName: "Legion of the Damned"
    }]
  }
};

var TzObj = TemplateZ.create(nestedExample, dataz);
TzObj.appendToElementById("nestedTemplate");
```

## Tests

### Karma
```sh
$ npm test
```

### Mocha
Use ```Basic Web Server``` or your favorite web server to view ```index.html``` in test directory.

## Basic Web Server
```sh
$ npm start
```
