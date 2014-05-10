# TemplateZ
[![Build Status](https://secure.travis-ci.org/jstty/js-templatez.png)](http://travis-ci.org/jstty/js-templatez)
[![Dependency Status](https://david-dm.org/jstty/js-templatez.png?theme=shields.io)](https://david-dm.org/jstty/js-templatez)
[![devDependency Status](https://david-dm.org/jstty/js-templatez/dev-status.png?theme=shields.io)](https://david-dm.org/jstty/js-templatez#info=devDependencies)

> This is all Javascript Template library which you define the html and template functions in a JSON object.

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
