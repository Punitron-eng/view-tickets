import { authHeader } from '../../util/AuthHeader';
import config from '../../util/config';
import { checkTokenValidation } from '../common/api';

const topHeader = JSON.parse(localStorage.getItem('top_header') as any);
export const apiDropdown = async (payload: any) => {
    const apiPath = 'checkout_app/get-dropdown-store-details.json';
    const params_temp = new URLSearchParams();
    if (topHeader.user_type == 2 || topHeader.user_type == 1) {
        params_temp.append('vendor_id', payload['vendor_id']);
    }
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
        }
    }
    return 'error';
};

//general api start
export const apiGeneral = async (payload: any) => {
    const apiPath = 'checkout_app/get-general-details.json';

    const params_temp = new URLSearchParams();

    params_temp.append('store_id', payload['storeId']);
    params_temp.append('vendor_id', payload['vendor_id']);

    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
        }
    }
};
//general api end

// payment api start
export const apiPayment = async (payload: any) => {
    const apiPath = 'checkout_app/get-payment-details.json';
    const params_temp = new URLSearchParams();
    params_temp.append('default_payment_type', '1');
    params_temp.append('store_id', payload['storeId']);
    params_temp.append('vendor_id', payload['vendor_id']);
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
        }
    }
};
// payment api end

//tracking api start
export const apiTrackinginfo = async (payload: any) => {
    const apiPath = 'checkout_app/get-tracking-details.json';
    const params_temp = new URLSearchParams();
    params_temp.append('store_id', payload['storeId']);
    params_temp.append('vendor_id', payload['vendor_id']);
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
        }
    }
    return 'error';
};
//tracking api end

//start update payment .
export const updateApiPayment = async (payload: any) => {
    const apiPath = 'checkout_app/update-payment-details-submit.json';
    const params_temp = new URLSearchParams();
    params_temp.append('default_payment_type', '1');
    params_temp.append('store_id', payload['storeId']);
    params_temp.append('razor_pay_merchant_id', payload.merchantId);
    params_temp.append('razorpay_api_key', payload.razorpaykey);
    params_temp.append('razorpay_secret_key', payload.razorpaysecretkey);
    params_temp.append('vendor_id', payload.vendor_id);
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
        }
    }
};
//end -updatepayment

//update tracking start //
export const updateapiTrackinginfo = async (payload: any) => {
    const apiPath = 'checkout_app/update-tracking-detials-submit.json';
    const params_temp = new URLSearchParams();
    params_temp.append('store_id', payload['storeId']);
    params_temp.append('vendor_id', payload['vendor_id']);
    // params_temp.append('fb_pixel_id_1',payload.pixelId_0);
    // params_temp.append('fb_access_token_1',payload.accessToken_0);
    // params_temp.append('fb_pixel_id_2',payload.pixelId_1);
    // params_temp.append('fb_access_token_2',payload.accessToken_1);
    // params_temp.append('fb_pixel_id_3',payload.pixelId_2);
    // params_temp.append('fb_access_token_3',payload.accessToken_2);
    for (let i = 0; i < 3; i++) {
        const pixelIdKey = `pixelId_${i}`;
        const accessTokenKey = `accessToken_${i}`;

        // Check if the pixelId and accessToken exist in the payload
        if (payload.hasOwnProperty(pixelIdKey) && payload.hasOwnProperty(accessTokenKey)) {
            params_temp.append(`fb_pixel_id_${i + 1}`, payload[pixelIdKey]);
            params_temp.append(`fb_access_token_${i + 1}`, payload[accessTokenKey]);
        }
    }

    params_temp.append('fb_checkout_initiated_event', payload.fbcheckoutinitiated);
    params_temp.append('fb_checkout_add_payment_info_event', payload.fbcheckoutpaymentinfo);
    params_temp.append('fb_checkout_purchase_event', payload.fbcheckoutpurchase);
    params_temp.append('ga4_measurement_id', payload.measurementId);
    params_temp.append('ga4_checkout_initiated_event', payload.ga4checkoutinitiated);
    params_temp.append('ga4_checkout_add_shipping_info', payload.ga4checkoutshipping);
    params_temp.append('ga4_checkout_purchase_event', payload.ga4checkoutpurchase);
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
        }
    }
    return 'error';
};
//update tracking end //

//general update payment .
export const updateApiGeneral = async (payload) => {
    const apiPath = 'checkout_app/update-general-details-submit.json';
    const params_temp = new FormData();
    params_temp.append('default_payment_type', '1');
    params_temp.append('store_id', payload['storeId']);
    params_temp.append('vendor_id', payload['vendor_id']);
    if (payload.userStoreCheckoutid !== null) {
        params_temp.append('user_store_checkout_id', payload.userStoreCheckoutid);
    }
    if (payload.checkoutEnabled !== '') {
        params_temp.append('is_checkout_enabled', payload.checkoutEnabled); //checkoutenable disable
    }
    if (payload.prepaidAccess != '' && payload.prepaidAccess != undefined) {
        params_temp.append('prepaid_access', payload.prepaidAccess); //prepaid
    }
    if (payload.codAccess != '' && payload.codAccess != undefined) {
        params_temp.append('cod_access', payload.codAccess); //cod
    }
    if (payload.retainedAccess != '' && payload.retainedAccess != undefined) {
        params_temp.append('retained_access', payload.retainedAccess); //retained
    }
    if (payload.billingDate != '' && payload.billingDate != undefined) {
        params_temp.append('billing_date', payload.billingDate); //billing data
    }
    params_temp.append('store_url',payload.storeUrl);
    params_temp.append('communication_brand_name',payload.communicationBrandName)
    params_temp.append('store_name',payload.storeName);
    params_temp.append('company_name',payload.companyName);
    params_temp.append('vendor_code',payload.vendorCode);
    params_temp.append('estimate_date_value',payload.estimateDeliveryDate);
    params_temp.append('is_cod_enabled',payload.codenabled);
    params_temp.append('is_deleted',payload.isDeleted);
    params_temp.append('status',payload.isStatus);
    params_temp.append('is_prepaid_enabled',payload.prepaidenabled); 
    params_temp.append('default_prepaid_discount',payload.defaultPrepaidDiscount);
    params_temp.append('send_order_confirmation',payload.sendOrderConfirmation);
    params_temp.append('is_whatsapp_enabled',payload.whatsappenabled)
    params_temp.append('is_sms_enabled',payload.smsenabled)
    params_temp.append('is_email_enabled',payload.emailenabled)
    params_temp.append('storefont_access_token',payload.storefontAccessToken)
    params_temp.append('access_token',payload.accessToken);
    params_temp.append('api_Secret_Key',payload.apiSecretKey);
    params_temp.append('api_key',payload.apiKey);
    params_temp.append('store_logo',payload.storeLogo);
    params_temp.append('default_thank_you_page',payload.notificationOnCheckout);

    const result = await fetch(config.baseUrlApi + apiPath,{
        method : 'POST',
        headers:authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
        }
    }
};
//end -general

// start img api
export const apiImage = async (payload: any) => {
    const apiPath = 'checkout_app/upload-add-store-logo-v3.json';
    const params_temp = new FormData();
    params_temp.append('uploadfile', payload.previewImage);
    params_temp.append('store_id', payload['storeId']);
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
        }
    }
};
//end img api

//discount page
export const apiDiscount = async (payload: any) => {
    const apiPath = 'checkout_app/get-coupons-api.json';
    const params_temp = new URLSearchParams();
    params_temp.append('user_store_id', payload['storeId']);
    if (topHeader.user_type == 2 || topHeader.user_type == 1) {
        params_temp.append('vendor_id', payload['vendor_id']);
    }
    // params_temp.append('user_store_id',payload['storeId'])
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
        }
    }
};

export const syncDiscount = async (payload: any) => {
    const apiPath = 'checkout_app/sync-coupons.json';
    const params_temp = new URLSearchParams();
    params_temp.append('user_store_id', payload['storeId']);
    // params_temp.append('user_store_id',payload['storeId'])
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
        }
    }
};
