
/* global dataLayer */
/* global pdpData */
/* global $ */

/**
 * @description Handler to handle the add to cart event
 */
var addToCart = function () {
    let quantity = parseInt(document.getElementById('Quantity').value, 10);

    dataLayer.push({
        event: 'addToCart',
        ecommerce: {
            currencyCode: pdpData.currency,
            add: {
                products: [{
                    name: pdpData.name,
                    id: pdpData.id,
                    price: pdpData.price,
                    brand: pdpData.brand,
                    category: pdpData.category,
                    /* 'variant': 'Gray', */
                    quantity: quantity
                }]
            }
        }
    });
};

var removeFromCart = function (e) {
    // console.log(e);

    // dwfrm_cart_shipments_i0_items_i0_deleteProduct

    // qty : dwfrm_cart_shipments_i0_items_i0_deleteProduct

    // console.log(e.currentTarget);

    /* dataLayer.push({
        'event': 'removeFromCart',
        'ecommerce': {
            'remove': {                               // 'remove' actionFieldObject measures.
                'products': [{                          //  removing a product to a shopping cart.
                    'name': 'Triblend Android T-Shirt',
                    'id': '12345',
                    'price': '15.25',
                    'brand': 'Google',
                    'category': 'Apparel',
                    'variant': 'Gray',
                    'quantity': 1
                }]
            }
        }
    }); */
};

$('.product-detail').on('click', '.add-to-cart', addToCart);
$('button[name$="deleteProduct"]').on('click', removeFromCart);
