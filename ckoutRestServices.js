/**
 * CkoutRestServices
 *
 * Dependencies:
 *   - jQuery 1.3.2 (or newer)
 *   - jquery.cookie
 *
 * Author: Bruno Naponiello
 */
 
function CkoutRestServices() {

    /*
     * GLOBAL ATTRIBUTES
     */
    var _this = this; // fix js 'this bug'
    _this.domainUrl = typeof (acecIndexInformation) != 'undefined' ? acecIndexInformation.cartDomainUrl : ''; // cart domain url
    _this.ajaxError = {
        status: "ERROR",
        message: "Some error has ocurred"
    }; // default error JSON parameter
    _this.st = jQuery.cookie('st'); // extracts the store id of the st cookie
    _this.isRequestLocked = false; //lock multiple user request
    _this.restFacesUrl = {
        shoppingCart: 'updateItems.xhtml',
        addUpdateItems: 'addUpdateItemsJson.xhtml',
        removeAllItems: 'removeAllItems.xhtml',
        removeItems: 'removeItemsJson.xhtml',
        calculateFreight: 'calculateFreightJson.xhtml',
        doLogin: 'doLoginJson.xhtml',
        newRegister: 'newRegisterJson.xhtml',
        findAddress: 'findAddressJson.xhtml',
        chooseAddress: 'chooseAddressJson.xhtml',
        chooseFreight: 'chooseFreightJson.xhtml',
        toPayment: 'toPaymentJson.xhtml',
        checkoutBill: 'checkoutBillJson.xhtml',
        checkoutCreditCard: 'checkoutCreditCardJson.xhtml',
        chooseCreditCardBrand: 'chooseCreditCardBrandJson.xhtml',
        checkoutDebit: 'checkoutDebitJson.xhtml',
        getVouchersList: 'getVouchersListJson.xhtml',
        selectVouchers: 'selectVouchersJson.xhtml',
        updateAddress: 'updateAddressJson.xhtml',
        invalidateSession: 'invalidateSessionJson.xhtml',
        endSession: 'endSessionJson.xhtml',
        removeAddress: 'removeAddressJson.xhtml',
        updateChooseAddress: 'updateChooseAddressJson.xhtml',
        setCouponDu: 'couponDuJson.xhtml',
        getShopList: 'getShopListJson.xhtml',
        setShopDelivery: 'setShopDeliveryJson.xhtml',
        getOrderConfirmation: 'getOrderConfirmationJson.xhtml',
        setAgreeTerm: 'setAgreeTermJson.xhtml',
        forgotPassword: 'forgotPasswordJson.xhtml',
		prepareScheduledDelivery: 'prepareScheduledDelivery.xhtml',
        getSlotsByDate: 'getSlotsByDate.xhtml',
        chooseSlot: 'chooseSlot.xhtml'
    };

    /*
     * PUBLIC/MAIN FUNCTIONS
     */
    /** 
     * Initial method. Sets the params of the class.
     */
    this.init = function (params) {
        // change the domain address
        _this.domainUrl = params.domainUrl;
    }

    /*
     *  SPECIFIC METHODS (methods with discrete parameters and the callback)
     */
    /**
     * Get ShoppingCart
     */
    this.getShoppingCart = function (callback) {
        var lock = _this.isRequestLocked;
        _this.isRequestLocked = false;
        _this.getShoppingCartAjax(callback);
        _this.isRequestLocked = lock;
    }

    /** 
     * Adds an or more itens in cart
     *
     * Ex: Add 1 item: ckoutRestServices.addItem(27528, 1, null)
     * Ex: Add 3 itens: ckoutRestServices.addItem([27528, 27530, 27534], [1, 2, 2], [null, null, null])
     *
     */
    this.addItem = function (skuProduct, quantity, skuWarranty, callback) {
        var jsonData;
        if (typeof (skuProduct) == 'object' && typeof (quantity) == 'object' && typeof (skuWarranty) == 'object') { // if is an array of skus, add many at same time
            var concat = "";
            $(skuProduct).each(function (i, sku) {
                concat += '{' + skuProduct[i] + ',' + quantity[i] + ',' + skuWarranty[i] + '}';
            });
            jsonData = {
                'skus': concat
            };
        } else {
            jsonData = {
                'skus': '{' + skuProduct + ',' + quantity + ',' + skuWarranty + '}'
            };
        }
        _this.addUpdateItemAjax(jsonData, callback);
    }

    /** 
     * Updates an item of cart.
     * Obs.: If quantity parameter value is negative, removes the value quantity of the item
     */
    this.updateItem = function (skuProduct, quantity, callback) {
        var jsonData = {
            'skus': '{' + skuProduct + ',' + quantity + ',}'
        };
        _this.addUpdateItemAjax(jsonData, callback);
    }

    /** 
     * Removes all itens of cart
     */
    this.removeAllItens = function (callback) {
        _this.removeAllItensAjax(callback);
    }

    /** 
     * Removes an item of cart
     */
    this.removeItem = function (skuProduct, callback) {
        var jsonData = {
            'skus': '{' + skuProduct + ',,}'
        };
        _this.removeItemAjax(jsonData, callback);
    }

    /** 
     * Calculate the freight of cart
     */
    this.calculateFreight = function (postalCode, callback) {
        var jsonData = {
            'postalCode': postalCode.toString()
        };
        _this.calculateFreightAjax(jsonData, callback);
    }

    /** 
     * Do login
     */
    this.doLogin = function (login, password, callback) {
        var jsonData = {
            'login': login,
            'password': password
        };
        _this.doLoginAjax(jsonData, callback);
    }

    /** 
     * Find an address
     */
    this.findAddress = function (postalCode, callback) {
        var jsonData = {
            'postalCode': postalCode
        };
        _this.findAddressAjax(jsonData, callback);
    }

    /**
     * Choose address
     */
    this.chooseAddress = function (addressId, callback) {
        var jsonData = {
            'addressId': addressId
        };
        _this.chooseAddressAjax(jsonData, callback);
    }

    /**
     * Choose freight
     */
    this.chooseFreight = function (serviceCode, callback) {
        var jsonData = {
            'serviceCode': serviceCode
        };
        _this.chooseFreightAjax(jsonData, callback);
    }

    /**
     * Go to payment
     */
    this.toPayment = function (callback) {
        _this.toPaymentAjax(callback);
    }

    /**
     * Cart checkout with the payment type bill
     */
    this.checkoutBill = function (callback) {
        _this.checkoutBillAjax(callback);
    }

    /**
     * Choose the credit card flag by the paymentKey (example: VISA, MASTER)
     */
    this.chooseCreditCardBrand = function (paymentKey, callback) {
        var jsonData = {
            'paymentKey': paymentKey
        };
        _this.chooseCreditCardBrandAjax(jsonData, callback);
    }

    /**
     * Cart checkout with credit card type
     */
    this.checkoutCreditCard = function (installmentQuantity, number, cardOwnersName, expirationMonthDate, expirationYearDate, cardSecurityCode, callback) {
        var jsonData = {
            'installmentQuantity': installmentQuantity,
            'number': number,
            'cardOwnersName': cardOwnersName,
            'expirationMonthDate': expirationMonthDate,
            'expirationYearDate': expirationYearDate,
            'cardSecurityCode': cardSecurityCode
        };
        _this.checkoutCreditCardAjax(jsonData, callback);
    }

    /**
     * Cart checkout with debit
     */
    this.checkoutDebit = function (paymentKey, callback) {
        var jsonData = {
            'paymentKey': paymentKey
        };
        _this.checkoutDebitAjax(jsonData, callback);
    }

    /**
     * Do the logout
     */
    this.endSession = function (callback) {
        _this.endSessionAjax(callback);
    }

    /**
     * Get the vouchers list
     */
    this.getVouchersList = function (password, callback) {
        var jsonData = {
            'password': password
        };
        _this.getVouchersListAjax(jsonData, callback);
    }

    /**
     * Select one voucher
     */
    this.selectVoucher = function (voucherNumberId, callback) {
        var jsonData = {
            'vouchers': [{
                'voucherNumberId': voucherNumberId
            }]
        }
        _this.selectVouchersAjax(jsonData, callback);
    }

    /**
     * Invalidate user's Session
     */
    this.invalidateSession = function (callback) {
        _this.invalidateSessionAjax(callback);
    }

    /**
     * Remove an Address
     */
    this.removeAddress = function (addressId, callback) {
        var jsonData = {
            'address': {
                'addressId': addressId
            }
        };
        _this.removeAddressAjax(jsonData, callback);
    }

    /**
     * Set the CouponDu
     */
    this.setCouponDu = function (couponCodeEntered, callback) {
        var jsonData = {
            'couponCodeEntered': couponCodeEntered
        };
        _this.setCouponDuAjax(jsonData, callback);
    }

    /**
     * Search the shop by term
     */
    this.searchShopByTerm = function (searchTerm, callback) {
        var jsonData = {
            'searchTerm': searchTerm
        };
        _this.getShopListAjax(jsonData, callback);
    }

    /**
     * Search the shop by postalCd and city and shopName
     */
    this.searchShop = function (postalCd, city, shopName, callback) {
        var jsonData = {
            'postalCd': postalCd,
            'city': city,
            'shopName': shopName
        };
        _this.getShopListAjax(jsonData, callback);
    }

    /**
     * Get the list of shops by postal code
     */
    this.searchShopByPostalCd = function (postalCd, callback) {
        var jsonData = {
            'postalCd': postalCd
        };
        _this.getShopListAjax(jsonData, callback);
    }

    /**
     * Get the list of shops by city name
     */
    this.searchShopByCity = function (city, callback) {
        var jsonData = {
            'city': city
        };
        _this.getShopListAjax(jsonData, callback);
    }

    /**
     * Get the list of shops by the shop name
     */
    this.searchShopByShopName = function (shopName, callback) {
        var jsonData = {
            'shopName': shopName
        };
        _this.getShopListAjax(jsonData, callback);
    }

    /**
     * Get the list of shops by ShopCode
     */
    this.searchShopByCode = function (shopCode, callback) {
        var jsonData = {
            'shopCode': shopCode
        };
        _this.getShopListAjax(jsonData, callback);
    }

    /**
     * Get the list of all shops
     */
    this.getShopList = function (callback) {
        var jsonData = {};
        _this.getShopListAjax(jsonData, callback);
    }

    /**
     * Set the shop choosed
     */
    this.setShopDelivery = function (shopId, callback) {
        var jsonData = {
            'shopId': shopId
        };
        _this.setShopDeliveryAjax(jsonData, callback);
    }

    /**
     * Get the order confirmation
     */
    this.getOrderConfirmation = function (callback) {
        _this.getOrderConfirmationAjax(callback);
    }

    /**
     * Set the agreeTerm
     */
    this.setAgreeTerm = function (agreeTerm, callback) {
        var jsonData = {
            'agreeTerm': agreeTerm
        };
        _this.setAgreeTermAjax(jsonData, callback);
    }

    /**
     * Send the password of the informed email or document
     */
    this.forgotPassword = function (emailOrDocumentNr, callback) {
        var jsonData = {
            'emailOrDocumentNr': emailOrDocumentNr
        };
        _this.forgotPasswordAjax(jsonData, callback);
    }

    /**
     * Get the shop by the shopId
     */
    this.getShop = function (shopId, callback) {
        var jsonData = {
            'shopId': shopId
        };
        _this.getShopListAjax(jsonData, callback);
    }
    /*
     * GENERIC METHODS (methods with JSON parameter and the callback)
     */
    /**
     * Function to send the password of the informed email or document
     */
    this.forgotPasswordAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.forgotPassword, 'jsonp', jsonData, callback);
    }

    /**
     * Function to set the user's agree term
     */
    this.setAgreeTermAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.setAgreeTerm, 'jsonp', jsonData, callback);
    }

    /**
     * Function to get the order confirmation
     */
    this.getOrderConfirmationAjax = function (callback) {
        _this.sendAjax('GET', _this.restFacesUrl.getOrderConfirmation, 'jsonp', {}, callback);
    }

    /**
     * Method to get the list of shops
     */
    this.getShopListAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.getShopList, 'jsonp', jsonData, callback);
    }

    /**
     * Method to set the shop delivery
     */
    this.setShopDeliveryAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.setShopDelivery, 'jsonp', jsonData, callback);
    }

    /**
     * Method to set the CouponDu
     */
    this.setCouponDuAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.setCouponDu, 'jsonp', jsonData, callback);
    }

    /**
     * Method to update the address
     */
    this.updateChooseAddressAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.updateChooseAddress, 'jsonp', jsonData, callback);
    }

    /**
     * Method to remove address
     */
    this.removeAddressAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.removeAddress, 'jsonp', jsonData, callback);
    }

    /**
     * Method to invalidate user's Session
     */
    this.invalidateSessionAjax = function (callback) {
        _this.sendAjax('GET', _this.restFacesUrl.invalidateSession, 'jsonp', {}, callback);
    }

    /**
     * Method to update an address
     */
    this.updateAddressAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.updateAddress, 'jsonp', jsonData, callback);
    }

    /**
     * Method to get the VoucherList
     *
     * The jsonData is like:
     * {'password':'123456'}
     */
    this.getVouchersListAjax = function (jsonData, callback) {
        _this.sendAjax('POST', _this.restFacesUrl.getVouchersList, 'json', jsonData, callback);
    }

    /**
     * Method do select the vouchers
     *
     * The jsonData is like:
     * {'vouchers':[{'voucherNumberId':'123214'},{'voucherNumberId':'22344'}]}
     */
    this.selectVouchersAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.selectVouchers, 'jsonp', jsonData, callback);
    }

    /**
     * Method to get the ShoppingCart
     */
    this.getShoppingCartAjax = function (callback) {
        _this.sendAjax('GET', _this.restFacesUrl.shoppingCart, 'jsonp', {}, function (jsonData) {
            jsonData = _this.insertIsSelectedInAddresses(jsonData);
            jsonData = _this.insertIsSelectedInFreights(jsonData);
            (callback)(jsonData);
        });
    }

    /** 
     * Method to add or update itens in cart
     */
    this.addUpdateItemAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.addUpdateItems, 'jsonp', jsonData, callback);
    }

    /** 
     * Method to remove all itens in cart
     */
    this.removeAllItensAjax = function (callback) {
        _this.sendAjax('GET', _this.restFacesUrl.removeAllItems, 'jsonp', {}, callback);
    }

    /** 
     * Method to remove item in cart
     */
    this.removeItemAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.removeItems, 'jsonp', jsonData, callback);
    }

    /** 
     * Method to calculateFreight
     */
    this.calculateFreightAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.calculateFreight, 'jsonp', jsonData, function (jsonData) {
            jsonData = _this.insertIsSelectedInAddresses(jsonData);
            jsonData = _this.insertIsSelectedInFreights(jsonData);
            (callback)(jsonData);
        });
    }

    /** 
     * Method to do login.
     * Obs.: For this method, ajax with POST type should be used to protect userÂ´s password.
     */
    this.doLoginAjax = function (jsonData, callback) {
        _this.sendAjax('POST', _this.restFacesUrl.doLogin, 'json', jsonData, function (jsonData) {
            jsonData = _this.insertIsSelectedInAddresses(jsonData);
            jsonData = _this.insertIsSelectedInFreights(jsonData);
            (callback)(jsonData);
        });
    }

    /** 
     * Method to do a new register of an user or a company.
     * Obs.: For this method, ajax with POST type should be used to protect userÂ´s password.
     */
    this.newRegisterAjax = function (jsonData, callback) {
        _this.sendAjax('POST', _this.restFacesUrl.newRegister, 'json', jsonData, callback);
    }

    /** 
     * Method to find an address
     */
    this.findAddressAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.findAddress, 'jsonp', jsonData, callback);
    }

    /** 
     * Method to chosse an address
     */
    this.chooseAddressAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.chooseAddress, 'jsonp', jsonData, function (jsonData) {
            jsonData = _this.insertIsSelectedInAddresses(jsonData);
            jsonData = _this.insertIsSelectedInFreights(jsonData);
            (callback)(jsonData);
        });
    }

    /**
     * Method to choose a freight
     */
    this.chooseFreightAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.chooseFreight, 'jsonp', jsonData, function (jsonData) {
            jsonData = _this.insertIsSelectedInAddresses(jsonData);
            jsonData = _this.insertIsSelectedInFreights(jsonData);
            (callback)(jsonData);
        });
    }

    /** 
     * Method to go to the payment
     */
    this.toPaymentAjax = function (callback) {
        _this.sendAjax('GET', _this.restFacesUrl.toPayment, 'jsonp', {}, callback);
    }

    /**
     * Method to do the cart checkout with the payment type bill
     */
    this.checkoutBillAjax = function (callback) {
        _this.sendAjax('GET', _this.restFacesUrl.checkoutBill, 'jsonp', {}, callback);
    }

    /**
     * Choose the credit card flag by the paymentKey (example: VISA, MASTER)
     */
    this.chooseCreditCardBrandAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.chooseCreditCardBrand, 'jsonp', jsonData, callback);
    }

    /**
     * Method to do the cart checkout with the credit card payment bill
     */
    this.checkoutCreditCardAjax = function (jsonData, callback) {
        _this.sendAjax('POST', _this.restFacesUrl.checkoutCreditCard, 'json', jsonData, callback);
    }

    /**
     * Method to do the cart checkout with debit
     */
    this.checkoutDebitAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.checkoutDebit, 'jsonp', jsonData, callback);
    }

    /**
     * Method to do the logout
     */
    this.endSessionAjax = function (callback) {
        _this.sendAjax('GET', _this.restFacesUrl.endSession, 'jsonp', {}, callback);
    }

    /**
     * Centralizes all Ajax send methods.
     *
     * @param methodType sendo method type (POST or GET);
     * @param restFacesUrl rest faces url (xhtml name);
     * @param jsonDataType type of json (jsonp or json);
     * @param jsonData the respective json data;
     * @param callback a callback function that handles with the response.
     */
    this.sendAjax = function (methodType, restFacesUrl, jsonDataType, jsonData, callback) {
        if (!_this.isRequestLocked) {
            _this.isRequestLocked = true;
            jQuery.ajax({
                type: methodType,
                url: _this.domainUrl + restFacesUrl,
                contentType: 'application/json',
                dataType: jsonDataType,
                data: {
                    'st': _this.st,
                    'jsonData': JSON.stringify(jsonData)
                },
                success: function (response) {
                    _this.isRequestLocked = false;
                    if (callback != null && typeof callback !== 'undefined') {
                        (callback)(response);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    _this.isRequestLocked = false;
                    if (callback != null && typeof callback !== 'undefined') {
                        (callback)(_this.ajaxError);
                    }
                }
            });
        }
    }

    /**
     * Insert isSelect property in the customer addresses
     */
    this.insertIsSelectedInAddresses = function (jsonData) {
        var selectedAddressId = null; // set null to force to set false in isSelected to all addresses
        var addresses = null;

        if (jsonData.selectedAddress != null && typeof jsonData.selectedAddress !== 'undefined') {
            if (jsonData.selectedAddress.addressId != null && typeof jsonData.selectedAddress.addressId !== 'undefined') {
                selectedAddressId = jsonData.selectedAddress.addressId;
            }
        }

        if (jsonData.customer != null && typeof jsonData.customer !== 'undefined') {
            if (jsonData.customer.addresses != null && typeof jsonData.customer.addresses !== 'undefined') {
                addresses = jsonData.customer.addresses;
            }
        }

        if (addresses != null) {
            var i = null;
            for (i in addresses) { // search by the selected address 
                if (selectedAddressId != null && addresses[i].addressId == selectedAddressId) {
                    addresses[i].isSelected = true; // set true in the selected address
                } else {
                    addresses[i].isSelected = false; // set false in the other addresses
                }
            }
        }

        return jsonData;
    }

    /**
     * Insert isSelect property in the freights options
     */
    this.insertIsSelectedInFreights = function (jsonData) {
        var selectedServiceCode = null; // set null to force to set false in isSelected to all freights
        var freights = null;

        if (jsonData.selectedFreight != null && typeof jsonData.selectedFreight !== 'undefined') {
            selectedServiceCode = jsonData.selectedFreight.correiosServiceCode;
        }

        if (jsonData.freightsOptions != null && typeof jsonData.freightsOptions !== 'undefined') {
            freights = jsonData.freightsOptions;
        }

        if (freights != null) {
            for (i in freights) {
                if (selectedServiceCode != null && freights[i].serviceCode == selectedServiceCode) {
                    freights[i].isSelected = true;
                } else {
                    freights[i].isSelected = false;
                }
            }
        }

        return jsonData;
    }
	
	/**
	 * Prepare the scheduled delivery selecting the available schedule dates.
	 */
	this.prepareScheduledDelivery = function (callback) {
		_this.prepareScheduledDeliveryAjax(callback);
	}
	/**
	 * Select the slots of a date.
	 */
	this.getSlotsByDate = function (date, callback) {
		var jsonData = {
			'date': date
		};
		_this.getSlotsByDateAjax(jsonData, callback);
	}
	/**
	 * Reserve the selected slot.
	 */
	this.chooseSlot = function (slotId, callback) {
		var jsonData = {
			'slotId': slotId
		};
		_this.chooseSlotAjax(jsonData, callback);
	}
    /**
	* Method to get the available dates to schedule a delivery.
	*/
    this.prepareScheduledDeliveryAjax = function (callback) {
        _this.sendAjax('GET', _this.restFacesUrl.prepareScheduledDelivery, 'jsonp', {}, callback);
    }
    /**
     * Method to get the slots of a date.
     */
    this.getSlotsByDateAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.getSlotsByDate, 'jsonp', jsonData, callback);
    }
    /**
     * Method to reserve the selected slot for the user.
     */
    this.chooseSlotAjax = function (jsonData, callback) {
        _this.sendAjax('GET', _this.restFacesUrl.chooseSlot, 'jsonp', jsonData, callback);
    }
}

// instance a new CkoutRestServices
var ckoutRestServices = new CkoutRestServices();