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

server.get(
    'DataProd',
    server.middleware.https,
    consentTracking.consent,
    function (req, res, next) {
        var ProductMgr = require('dw/catalog/ProductMgr');

        var productId = request.httpParameterMap.productID.stringValue;
        var currentProduct = ProductMgr.getProduct(productId);

        if (currentProduct == null) {
            next();
        }

        var productData = {
            product_ID: null,
            product_Name: null,
            product_Price: null,
            product_Brand: null,
            product_Category: null
        };

        // Data of the product
        var productCategory = currentProduct.classificationCategory !== null ? currentProduct.classificationCategory.ID : '';

        productData.product_ID = currentProduct.ID;
        productData.product_Name = currentProduct.name;
        productData.product_Price = currentProduct.priceModel.getPrice().value;
        productData.product_Brand = currentProduct.brand;
        productData.product_Category = productCategory;

        // Check if product is Variant Product or Variant Group
        if (currentProduct.isVariant() || currentProduct.isVariationGroup()) {
            var variantAttr = currentProduct.variationModel.getProductVariationAttributes();

            for (var i = 0; i < variantAttr.getLength(); i += 1) {
                var value = currentProduct.getVariationModel().getSelectedValue(variantAttr[i]);
                if (value != null) {
                    var variantName = 'variant_' + variantAttr[i].displayName;
                    productData[variantName] = value.displayValue;
                }
            }
        } else if (currentProduct.isBundle()) { // Check if product is Bundle Product
            var currProdBundle = currentProduct.bundledProducts;

            var bundledProduct = [];
            for (var n = 0; n < currProdBundle.getLength(); n += 1) {
                bundledProduct.push({
                    bundle_id: currProdBundle[n].ID,
                    bundle_name: currProdBundle[n].name,
                    bundle_price: currProdBundle[n].priceModel.getPrice().value,
                    bundle_brand: currProdBundle[n].brand
                });
            }
            productData.bundledProduct = bundledProduct;
        } else if (currentProduct.isProductSet()) { // Check if product is Product Set
            var currProdSet = currentProduct.productSetProducts;

            var partProductSet = [];
            for (var x = 0; x < currProdSet.getLength(); x += 1) {
                partProductSet.push({
                    productset_id: currProdSet[x].ID,
                    productset_name: currProdSet[x].name,
                    productset_price: currProdSet[x].priceModel.getPrice().value,
                    productset_brand: currProdSet[x].brand
                });
            }
            productData.partProductSet = partProductSet;
        }

        // Check if product is Option Product
        if (currentProduct.isOptionProduct()) {
            var optionAttr = currentProduct.optionModel.getOptions();
            for (var y = 0; y < optionAttr.getLength(); y += 1) {
                var optionName = 'option_' + optionAttr[y].displayName;
                productData[optionName] = currentProduct.optionModel.getSelectedOptionValue(optionAttr[y]).displayValue;
            }
        }

        var dataProduct = JSON.stringify(productData);

        res.render('footer/gtmdataproduct', {
            Product_Data: dataProduct
        });
        next();
    }
);
module.exports = server.exports();
