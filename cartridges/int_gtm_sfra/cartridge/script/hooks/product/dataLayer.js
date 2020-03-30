'use strict';

/**
 * @type {dw.template.Velocity.render}
 */
var velocity = require('dw/template/Velocity');

/**
 * Hook proxy for htmlHead hook
 *
 * Executes remote include for add add-script gtm in header
 */
function htmlHead() {
    velocity.render('$velocity.remoteInclude(\'GTM-AddScript\')', { velocity: velocity });
}

/**
 * Hook proxy for afterFooter hook
 *
 * Executes remote include in order to:
 *      - add gtm noscript in footer
 *      - add PDP data if we are watching the PDP
 *      - add purchase data if we are watching the confirmation page
 *
 * @param {Object} pdict dictionary given by the controller
 */
function afterFooter(pdict) {
    var productID = (pdict.product) ? pdict.product.id : false;
    var order = (pdict.order) ? pdict.order : false;

    velocity.render('$velocity.remoteInclude(\'GTM-AddNoScript\')', { velocity: velocity });

    if (productID) {
        velocity.render(
            '$velocity.remoteInclude(\'GTM-DataProd\', \'productID\', $productID)',
            {
                velocity: velocity,
                productID: productID
            }
        );
    } else if (order) {
        velocity.render(
            '$velocity.remoteInclude(\'GTM-OrderConfirmation\', \'orderData\', $orderData)',
            {
                velocity: velocity,
                orderData: JSON.stringify(order)
            }
        );
    }
}

exports.htmlHead = htmlHead;
exports.afterFooter = afterFooter;
