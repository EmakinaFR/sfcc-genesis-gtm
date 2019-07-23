
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

$('.product-detail').on('click', '.add-to-cart', addToCart);
