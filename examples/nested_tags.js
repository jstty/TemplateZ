
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

