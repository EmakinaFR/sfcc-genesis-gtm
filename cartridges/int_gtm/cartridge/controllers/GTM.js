'use strict';

/**
 * Controller for managing GTM
 * @module controllers/GTM
 */

/* global request */
/* global session */

/* Script Modules */
var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');
var Site = require('dw/system/Site');
var System = require('dw/system/System');
var Locale = require('dw/util/Locale');

/**
 * Displays a template rendering GTM code (if GTM tag is configured inside Business Manager) and
 * add a dataLayer.
 */
function addScript() {
    let gtmCode = Site.getCurrent().getCustomPreferenceValue('GtmCode');
    let localeObj = Locale.getLocale(request.locale);
    let userAuthenticated = (session.customer.authenticated === true) ? '1' : '0';
    let country = localeObj.country.toUpperCase(); // ex: US
    let locale = localeObj.ID; // ex: en_US
    let language = localeObj.language; // ex: en
    let instanceType = '';

    switch (System.instanceType) {
        case System.DEVELOPMENT_SYSTEM:
            instanceType = 'development';
            break;
        case System.STAGING_SYSTEM:
            instanceType = 'staging';
            break;
        case System.PRODUCTION_SYSTEM:
            instanceType = 'production';
            break;
        default:
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

/**
 * Displays a template rendering GTM noscript code.
 */
function addNoscript() {
    let gtmCode = Site.getCurrent().getCustomPreferenceValue('GtmCode');

    app.getView({
        GtmCode: gtmCode
    }).render('gtmnoscriptcode');
}

/*
 * Export the publicly available controller methods
 */
/** @see module:controllers/GTM~addScript */
exports.AddScript = guard.ensure(['get'], addScript);

/** @see module:controllers/GTM~addNoscript */
exports.AddNoscript = guard.ensure(['get'], addNoscript);
