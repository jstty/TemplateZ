var productTag = function(productData, rootData) {
  var productName = {
    p : productData.name
  };

  var buttonTag = {
      button: "Click to buy!",
      $id: function(data) {
        return data.id;
      },
      $onclick: function(data) {
        return "updatePrice(this)";
      },
      $data : function(data) {
        return data.price;
      }
    };

  if (productData.isOOS) {
    productName["p"] = [ {
      b : productData.name+" is out of stock!"
    } ];

    buttonTag.$disabled = "";
  }

  var productPrice = {
    p : [ {
      span: "$"+productData.price,
      $class: function(data) {
        return "price";
      }
    } ]
  };

  if (productData.isOnSale) {
    productPrice["p"].unshift({
      b : "On sale for "
    });
  }

  return {
    li : [
      productName,
      {
      div : [ {
        div : productData.description
        },
        productPrice,
        buttonTag,
      ]
    }, {
      $style: {
        color: "#888888",
        listStyle: "none",
        height: '180px',
        width: '150px',
        border: '2px solid black',
        display: "inline-block",
        float: "left",
        margin: "2px 4px 4px 2px",
        padding: "5px"
      }
    } ]
  };
}
TemplateZ.on('tag', "product", productTag);

var noSelection = {

}

var cart = {
  div : [ {
    p : function(data) {
      return "Cart Total: $"+data.cartPrice.toFixed(2)
    }
  },
  {
    $style:  {
      display: "block"
    }
  }]
};
TemplateZ.on('tag', "cart", cart);

var productListing = {
  div: [ {
    ol : [ {
      $tz_products: function(item, index, list, rootData) {
        return { product : item };
      }
    },
    {
      $style: {
        overflow: "auto",
        width: "100%"
      }
    } ],
    $template_cart: "cart",
  } ]
}


g_listingTZ = TemplateZ.create(productListing, getData());
g_listingTZ.appendToElementById("productListing");

