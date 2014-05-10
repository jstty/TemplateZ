
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

