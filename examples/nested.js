
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

