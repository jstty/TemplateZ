
// ----------------------
// Add dom element to test
var doc = document.getElementsByTagName("body")[0];
var docObj = document.createElement("div");
docObj.setAttribute("id", "testElement");
docObj.setAttribute("style", "display:none");
doc.appendChild( docObj );
// ----------------------


// ----------------------
test( "Adding tags", function() {
  TemplateZ.on("tag", "test", {test: "test"});
  ok ( TemplateZ._customtags.hasOwnProperty("test"), "Tag exists");
});

module("Adding to DOM", {
  setup: function() {
    document.getElementById("testElement").innerHTML = "";
  }
});

test( "Elements should be correctly added to the DOM", function() {
  var example = {
    div: [{
    }]
  };

  var TzObj = TemplateZ.create(example, {});

  TzObj.appendToElementById("testElement");

  var addedObj = document.getElementById("testElement").firstChild;

  ok (!!addedObj, "Element added correctly");
});

test( "Nested Elements should be correctly added to the DOM", function() {
  var example = {
    div: [{
      span: [{

      }]
    }]
  };

  var TzObj = TemplateZ.create(example, {});

  TzObj.appendToElementById("testElement");

  var addedObj = document.getElementById("testElement").firstChild.firstChild;

  ok (!!addedObj, "Nested element added correctly");
});

test( "Text information should be correctly added to the element", function() {
  var textExample = "I love TZ!";
  var example = {
    div: textExample
  };

  var TzObj = TemplateZ.create(example, {});

  TzObj.appendToElementById("testElement");

  var addedObj = document.getElementById("testElement").firstChild;

  ok (addedObj.innerHTML == textExample, "Text added correctly");
});

test( "Styles should be added to elements", function() {
  var testColor = "rgb(1, 35, 69)";

  var example = {
    div: [{
      $style: {
        color: testColor
      }
    }]
  };

  var TzObj = TemplateZ.create(example, {});

  TzObj.appendToElementById("testElement");

  var addedObj = document.getElementById("testElement").firstChild;

  ok (addedObj.style.color == testColor, "Style added correctly");
});

test ("Ids should be appended to elements", function() {
  var testId = "testIdAdd";
  var example = {
    div: [{
      $id: testId
    }]
  };

  var TzObj = TemplateZ.create(example, {});
  TzObj.appendToElementById("testElement");

  var addedObj = document.getElementById(testId);

  ok (!!addedObj, "Id added correctly");
});

test ("Classes should be appended to elements", function() {
  var testClass = "testClassAdd";
  var example = {
    div: [{
      $class: testClass
    }]
  };

  var TzObj = TemplateZ.create(example, {});
  TzObj.appendToElementById("testElement");

  var addedObj = document.getElementsByClassName(testClass);

  ok (addedObj.length == 1, "Class added correctly");
});

test ("Templates should be appended correctly", function() {
  var template = {
    span: "Hi!"
  };

  TemplateZ.on("tag", "template", template)

  var example = {
    div: [{
      $template_template: {}
    }]
  }

  var TzObj = TemplateZ.create(example, {});
  TzObj.appendToElementById("testElement");

  var addedObj = document.getElementById("testElement").innerHTML;

  ok (addedObj == "<div><span>Hi!</span></div>", "Tempalte appended correctly");
});

test ("Data should be added correctly", function() {
  var exampleData = {
    test: "test"
  };

  var example = {
    div: function(data) {
      return data.test;
    }
  };

  var TzObj = TemplateZ.create(example, exampleData);
  TzObj.appendToElementById("testElement");

  var addedText = document.getElementById("testElement").firstChild.innerHTML;

  ok (addedText == exampleData.test, "Tempalte appended correctly");
});

