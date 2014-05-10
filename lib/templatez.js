var TemplateZ = TemplateZ || {};

(function(){

// add performance for all browsers with old timer fallback
window.performance = window.performance || {};
performance.now = (function() {
  return performance.now       ||
         performance.mozNow    ||
         performance.msNow     ||
         performance.oNow      ||
         performance.webkitNow ||
         function() { return new Date().getTime(); };
})();

var Tz = TzBase = function(options){

	this._rootTzTree = (!!options.tzTree) ? options.tzTree : null;
	this._rootData   = (!!options.data) ? options.data : null;
	this._rootDomObj     = null;
	this._customtags = [];
	if(options.customtags)
	{
		for(var item in options.customtags)
		{
			this._customtags[item] = options.customtags[item];
		}
	}

	this.logging     = (options.logging) ? true : false;
};

Tz.prototype = {
	on : function(type, name, func)
	{
		if(type == 'tag'){
			this._customtags[name] = func;
		}
	},

	compile : function()
	{
		this._rootDomObj = this._generateDom(this._rootTzTree, this._rootData);
		return this._rootDomObj;
	},

	updateTz : function(tzTree)
	{
		this._rootTzTree = tzTree;
		this.compile();
	},

	updateData : function(data)
	{
		this._rootData = data;
		this.compile();
	},

	appendToElementById : function(elementID, docObj) {
		if(!docObj) {
			if(!this._rootDomObj) {
				this.compile();
			}
			docObj = this._rootDomObj;
		}

		var doc = document.getElementById(elementID);
		doc.appendChild( docObj );
	},

	_generateDom : function(tmzTree, data, rootObj){
		rootObj = rootObj || null; // create root if null

		var tagObj = null;
		for(var p in tmzTree)
		{
			var isTag = true;
			if(p.charAt(0) == "$") isTag = false;

			if(isTag &&
			   this._customtags.hasOwnProperty(p) )
			{
				if(this.logging) console.log("Custom Tag:", p + " = " + tmzTree[p]);

				if(typeof(tmzTree[p]) == "string")
				{
					if(tmzTree[p].substring(0, 5) == "$tz_$")
					{
						var varName = tmzTree[p].substring(5);
						tmzTree[p] = data[varName];

						if(this.logging) console.log("Retreved data from:", varName + " = " + tmzTree[p]);
					}
				}

				var customObj = this._customtags[p]( tmzTree[p], this._rootData ); // run custom function
				return this._generateDom(customObj, tmzTree[p], rootObj);
			}

			if(isTag &&
			   (tmzTree[p] instanceof Array)) // if array then tag
			{
				if(this.logging) console.log("Tag:", p + " = " + tmzTree[p]);

				tagObj = document.createElement(p);
				for(var i = 0; i < tmzTree[p].length; i++)
				{
					//console.log(i + " = " + tmzTree[p][i]);
					// process sub tree
					this._generateDom(tmzTree[p][i], data, tagObj);
				}
			}
			else if(isTag &&
				    (typeof(tmzTree[p]) == "function"))
			{
				if(this.logging) console.log("Tag with Function:", p + " = " + tmzTree[p]);

				var tagFuncOut = tmzTree[p](data, this._rootData); // run tag function
				if(typeof(tagFuncOut) == "object")
				{

					tagObj = document.createElement(p);
					this._generateDom(tagFuncOut, data, tagObj);

				} else { // not object gets converted to string

					if(this.logging) console.log("Function returned text - Tag:", p + " = " + tagFuncOut);

					tagObj = document.createElement(p);
					tagObj.innerHTML = tagFuncOut;
					//var textNode = document.createTextNode( tagFuncOut );
					//tagObj.appendChild( textNode );
				}
			}
			else if(isTag)
			{
				if(this.logging) console.log("Text Node - Tag:", p + " = " + tmzTree[p]);

				tagObj = document.createElement(p);
				tagObj.innerHTML = tmzTree[p];
				//var textNode = document.createTextNode( tmzTree[p] );
				//tagObj.appendChild( textNode );
			}
			else if(!isTag) // not tag
			{ // then attribute (should start with $)
				if(p.substring(0, 3) == "$tz") // if array then tag
				{
					var dataObject = p.substring(4)
					if(this.logging) console.log("Template over ", dataObject);

					var isList = true;
					if(dataObject.charAt(0) == "$"){
 						isList = false;
 						dataObject = dataObject.substring(1); // removed $
					}

					var dataSubObj = data[ dataObject ];
					var itemObj = null;
					// if sub data is array then call function as array
					if(isList &&
					   (typeof(dataSubObj) == "object"))
					{
						for(var i in dataSubObj)
						{
							itemObj = tmzTree[p](dataSubObj[i], i, dataSubObj, this._rootData); // run template function, as list
							//console.log(itemObj);

							this._generateDom(itemObj, dataSubObj[i], rootObj);
						}
					} else {
						itemObj = tmzTree[p](dataSubObj, this._rootData); // run template function
						console.log(itemObj);

						this._generateDom(itemObj, dataSubObj, rootObj);
					}
				}
				else if (p.substring(0, 9) == "$template") {
					// We have a nested template
					var nestedIndex = p.substring(10);
					if (this.logging) console.log("Nesting for saved template:"+nestedIndex);
					var customTemplate = this._customtags[nestedIndex];

					// Template was not found
					if (!customTemplate) {
						console.log("Template "+nestedIndex+" does not exist");
					}

					var dataIndex = tmzTree[p];
					this._generateDom(customTemplate, data[dataIndex], rootObj);
				}
				else if (p == "$style") {
					// Styling for parent node
					for (var i in tmzTree[p]) {
						var styleValue = tmzTree[p][i];
						
						rootObj.style[i] = styleValue;
					}
				}
				else if(!! tagObj) // tag not null, meaning a tag was previously defined, and this is not a template Attribute
				{
					if(this.logging) console.log("Attribute:", p + " = " + tmzTree[p]);
					var attributeName = p.substring(1); // sub to remove $

					// if function run function then pass return to setAtt
					tagObj.setAttribute(attributeName, ((typeof(tmzTree[p]) == "function") ? tmzTree[p](data) : tmzTree[p]) );
				}
				else if(! tagObj && rootObj) {
					if(this.logging) console.log("Attribute to root:", p + " = " + tmzTree[p]);
					var attributeName = p.substring(1); // sub to remove $

					// if function run function then pass return to setAtt
					rootObj.setAttribute(attributeName, ((typeof(tmzTree[p]) == "function") ? tmzTree[p](data) : tmzTree[p]) );
				}
			}

			if(!! tagObj && isTag) // tagObj not null, and isTag
			{
				if(!! rootObj) // root not null
				{
					rootObj.appendChild( tagObj );
				} else {
					rootObj = tagObj;
				}
			}
		}

		return rootObj;
	},
};


var TzBase = function(){
	this._startTime  = performance.now();
	this._customtags = {};

	this.logging     = true;
};

TzBase.prototype = {
	on : function(type, name, func)
	{
		if(type == 'tag'){
			this._customtags[name] = func;
		}
	},

	create : function(tzTree, data){
		return new Tz({tzTree:tzTree, data:data, loggin:this.logging, customtags:this._customtags});
	}
};

TemplateZ = new TzBase();

})();
