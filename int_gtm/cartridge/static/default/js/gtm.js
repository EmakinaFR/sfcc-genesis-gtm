
/* global dataLayer */
/* global pdpData */
/* global $ */

/**
 * @description Function that is used to mutualize dataLayer.push
 * for addToCart event
 * @param {Object} product  Product data to send to dataLayer
 * @param {string} qty      Quantity added to cart for this product
 */
function sendAddToCartToDataLayer(product, qty) {
    dataLayer.push({
        event: 'addToCart',
        ecommerce: {
            currencyCode: product.currency,
            add: {
                products: [{
                    name: product.name,
                    id: product.id,
                    price: product.price,
                    brand: product.brand,
                    category: product.category,
                    /* 'variant': 'Gray', */
                    quantity: qty
                }]
            }
        }
    });
}

/**
 * @description Handler to handle the add to cart event
 * @param {Object} e  Click event object
 */
var addToCart = function (e) {
    e.preventDefault();

    var iProduct = 0;
    var $form = $(this).closest('form');
    var formID = $form.attr('id');
    var $qty = $form.find('input[name="Quantity"]');
    var $productForms = $('#product-set-list').find('form').toArray();

    if ($qty.length === 0 || Number.isNaN($qty.val()) || parseInt($qty.val(), 10) === 0) {
        $qty.val('1');
    }

    if (pdpData.length !== 1 && $productForms.length && $productForms.length === pdpData.length) {
        for (var i = 0; i < pdpData.length; i += 1) {
            if ($($productForms[i]).attr('id') === formID) {
                iProduct = i;
                break;
            }
        }
    }

    sendAddToCartToDataLayer(pdpData[iProduct], $qty.val());
};

/**
 * @description Handler to handle the add all to cart event (for product set)
 * @param {Object} e  Click event object
 */
var addAllToCart = function (e) {
    e.preventDefault();

    var l = pdpData.length;
    var $productForms = $('#product-set-list').find('form').toArray();

    if (l === $productForms.length) {
        for (var i = 0; i < l; i += 1) {
            var $form = $($productForms[i]);
            var $qty = $form.find('input[name="Quantity"]');
            if ($qty.length === 0 || Number.isNaN($qty.val()) || parseInt($qty.val(), 10) === 0) {
                $qty.val('1');
            }
            sendAddToCartToDataLayer(pdpData[i], $qty.val());
        }
    }
};

/**
 * @description Handler to handle the remove from cart event
 * @param {Object} e  Click event object
 */
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
$('#add-all-to-cart').on('click', addAllToCart);
$('button[name$="deleteProduct"]').on('click', removeFromCart);
