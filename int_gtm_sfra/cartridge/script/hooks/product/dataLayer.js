'use strict';
/**
 * @type {dw.template.Velocity.render}
 */
const velocity = require('dw/template/Velocity');
/**
 * Hook proxy for htmlHead hook
 * Executes remote include for 
 */

function htmlHead(/*ismlParams*/) {
    velocity.render('$velocity.remoteInclude(\'GTM-AddScript\')', {'velocity': velocity});
}

function afterFooter()
{
    velocity.render('$velocity.remoteInclude(\'GTM-AddNoScript\')', {'velocity': velocity});
}

exports.htmlHead = htmlHead;
exports.afterFooter = afterFooter;
exports.GTMmodule = GTMmodule;
