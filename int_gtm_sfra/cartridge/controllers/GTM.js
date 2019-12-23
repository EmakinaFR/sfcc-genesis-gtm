'use strict';

/**
 * Controller for managing GTM
 * @module controllers/GTM
 */
var server = require('server');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.get(
    'AddScript',
    server.middleware.https,
    consentTracking.consent,
    function (req, res, next) {
        var Site = require('dw/system/Site');
        var System = require('dw/system/System');
        var Locale = require('dw/util/Locale');

        var gtmCode = Site.getCurrent().getCustomPreferenceValue('GtmCode');
        var localeObj = Locale.getLocale(req.locale.id);
        var userAuthenticated = (session.customer.authenticated === true) ? '1' : '0'; // eslint-disable-line no-undef
        var country = localeObj.country.toUpperCase(); // ex: US
        var locale = localeObj.ID; // ex: en_US
        var language = localeObj.language; // ex: en

        var instanceType = '';
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

        res.render('header/gtmcode', {
            GtmCode: gtmCode,
            Data: {
                Country: country,
                Locale: locale,
                Language: language,
                UserAuthenticated: userAuthenticated,
                InstanceType: instanceType
            }
        });

        next();
    }
);

server.get(
    'AddNoscript',
    server.middleware.https,
    consentTracking.consent,
    function (req, res, next) {
        var Site = require('dw/system/Site');

        var gtmCode = Site.getCurrent().getCustomPreferenceValue('GtmCode');

        res.render('header/gtmnoscriptcode', {
            GtmCode: gtmCode
        });

        next();
    }
);

module.exports = server.exports();
