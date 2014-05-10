
var expect = chai.expect;

// ----------------------
// Add dom element to test
var doc = document.getElementsByTagName("body")[0];
var docObj = document.createElement("div");
docObj.setAttribute("id", "testElement");
docObj.setAttribute("style", "display:none");
doc.appendChild( docObj );
// ----------------------

// ----------------------
describe( "Adding tags", function() {
  TemplateZ.on("tag", "test", {test: "test"});

    it( "Tag exists", function() {
       expect ( TemplateZ._customtags).to.have.property("test");
    });
});

describe("Adding to DOM", function() {
        it( "Elements should be correctly added to the DOM", function() {
            // reset testElement
            document.getElementById("testElement").innerHTML = "";

            var example = {
                div: [{
                }]
            };

            var TzObj = TemplateZ.create(example, {});
            TzObj.appendToElementById("testElement");
            var addedObj = document.getElementById("testElement").firstChild;

            // Element added correctly
            expect(addedObj).to.be.a('object');
        });

        it( "Nested Elements should be correctly added to the DOM", function() {
            // reset testElement
            document.getElementById("testElement").innerHTML = "";

            var example = {
                div: [{
                    span: [{

                    }]
                }]
            };

            var TzObj = TemplateZ.create(example, {});
            TzObj.appendToElementById("testElement");
            var addedObj = document.getElementById("testElement").firstChild.firstChild;

            // Nested element added correctly
            expect(addedObj).to.be.a('object');
        });

        it( "Text information should be correctly added to the element", function() {
            // reset testElement
            document.getElementById("testElement").innerHTML = "";

            var textExample = "I love TZ!";
            var example = {
                div: textExample
            };

            var TzObj = TemplateZ.create(example, {});
            TzObj.appendToElementById("testElement");
            var addedObj = document.getElementById("testElement").firstChild;

            // Text added correctly
            expect(addedObj.innerHTML).to.equal(textExample);
        });

        it( "Styles should be added to elements", function() {
            // reset testElement
            document.getElementById("testElement").innerHTML = "";
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

            // Style added correctly
            expect(addedObj.style.color).to.equal(testColor);
        });

        it("Ids should be appended to elements", function() {
            // reset testElement
            document.getElementById("testElement").innerHTML = "";

            var testId = "testIdAdd";
            var example = {
                div: [{
                    $id: testId
                }]
            };

            var TzObj = TemplateZ.create(example, {});
            TzObj.appendToElementById("testElement");
            var addedObj = document.getElementById(testId);

            // Id added correctly
            expect(addedObj).to.be.a('object');
        });

        describe("Classes should be appended to elements", function() {
            // reset testElement
            document.getElementById("testElement").innerHTML = "";

            var testClass = "testClassAdd";
            var example = {
                div: [{
                    $class: testClass
                }]
            };

            var TzObj = TemplateZ.create(example, {});
            TzObj.appendToElementById("testElement");
            var addedObj = document.getElementsByClassName(testClass);

            // Class added correctly
            expect(addedObj).to.have.length(1);
        });

        it("Templates should be appended correctly", function() {
            // reset testElement
            document.getElementById("testElement").innerHTML = "";

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

            // Template appended correctly
            expect(addedObj).to.equal("<div><span>Hi!</span></div>");
        });

        it("Data should be added correctly", function() {
            // reset testElement
            document.getElementById("testElement").innerHTML = "";

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

            // Template appended correctly
            expect(addedText).to.equal(exampleData.test);
        });
    }
);
