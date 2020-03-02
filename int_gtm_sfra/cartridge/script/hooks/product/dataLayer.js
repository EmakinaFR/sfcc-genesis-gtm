'use strict';

/**
 * @type {dw.template.Velocity.render}
 */
var velocity = require('dw/template/Velocity');

/**
 * Hook proxy for htmlHead hook
 * Executes remote include for add add-script gtm in header
 */
function htmlHead() {
    velocity.render('$velocity.remoteInclude(\'GTM-AddScript\')', { velocity: velocity });
}

/**
 * Hook proxy for htmlHead hook
 * Executes remote include in order to add gtm noscript in footer
 */
/**
 * @param {Object} productID id product
 */
function afterFooter(productID) {
    velocity.render('$velocity.remoteInclude(\'GTM-AddNoScript\')', { velocity: velocity });
    velocity.render('$velocity.remoteInclude(\'GTM-DataProd\', \'productID\', $productID)', { velocity: velocity, productID: productID });
}

/**
 * @param {Object} orderData order data
 */
function confirmation(orderData) {
    var orderDataString = JSON.stringify(orderData);
    velocity.render('$velocity.remoteInclude(\'GTM-OrderConfirmation\', \'orderData\', $orderData)', { velocity: velocity, orderData: orderDataString });
}

exports.htmlHead = htmlHead;
exports.afterFooter = afterFooter;
exports.confirmation = confirmation;
