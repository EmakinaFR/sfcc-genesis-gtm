'use strict';

/**
 * Controller for managing GTM
 * @module controllers/GTM
 */

/* API Includes */
//var Logger = require('dw/system/Logger');

/* Script Modules */
var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');
var Site = require('dw/system/Site');

function addScript() {
    let gtmCode = Site.getCurrent().getCustomPreferenceValue('GtmCode');
    let localeObj = dw.util.Locale.getLocale(request.locale);
    let userAuthenticated = (session.customer.authenticated === true) ? "1" : "0";
    let country = localeObj.country.toUpperCase(); // ex: US
    let locale = localeObj.ID; // ex: en_US
    let language = localeObj.language; // ex: en
    let instanceType = "";

    switch (dw.system.System.instanceType) {
        case dw.system.System.DEVELOPMENT_SYSTEM:
            instanceType = "development";
            break;
        case dw.system.System.STAGING_SYSTEM:
            instanceType = "staging";
            break;
        case dw.system.System.PRODUCTION_SYSTEM:
            instanceType = "production";
            break;
    }

    app.getView({
        GtmCode: gtmCode,
        Data: {
            Country: country,
            Locale: locale,
            Language: language,
            UserAuthenticated: userAuthenticated,
            InstanceType: instanceType
        }
    }).render('gtmcode');
}

function addNoscript() {
    let gtmCode = Site.getCurrent().getCustomPreferenceValue('GtmCode');

    app.getView({
        GtmCode: gtmCode,
    }).render('gtmnoscriptcode');
}

/*
 * Export the publicly available controller methods
 */
/** @see module:controllers/GTM~addScript */
exports.AddScript = guard.ensure(['get'], addScript);

/** @see module:controllers/GTM~addNoscript */
exports.AddNoscript = guard.ensure(['get'], addNoscript);
