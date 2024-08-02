export const CHECKOUTSETTING = {
    NAME : 'CHECKOUTSETTING',
    ACTIONS : {
        GETSTOREDETAILS:'getStoreDetails',
        GETSTOREID:'getStoreId',
        GETPAYMENTDETAILS:'getPaymentDetails',
        GETTRACKINGDETAILS : 'getTrackingDetails',
        GETPAYMENTSKELETON : 'getpaymentskeleton',
        GETGENERALDETAILS:'getGeneralDetails',
        GETDISCOUNTDETAILS: 'getDiscountDetails',
        GETSYNCDISCOUNTDETAILS: 'getSyncDiscountDetails'
    },
    MUTATIONS: {
        SETSTOREDETAILS:'setStoreDetails',
        SETSTOREID:'setStoreId',
        SETPAYMENTDETAILS:'setPaymentDetails',
        SETTRACKINGDETAILS : 'setTrackingDetails',
        SETPAYMENTSKELETON : 'setpaymentskeleton',
        SETGENERALDETAILS : 'setGeneralDetails',
        SETDISCOUNTDETAILS: 'setDiscountDetails',
        SETSYNCDISCOUNTDETAILS: 'setSyncDiscountDetails'
    },
    GETTERS : {
        SENDSTOREDETAILS :'sendStoreDetails',
        SENDSTOREID:'sendStoreId', 
        SENDPAYMENTDETAILS :'sendPaymentDetails',
        SENDTRACKINGDETAILS : 'sendTrackingDetails',
        PAYMENTSKELETON: 'paymentSkeleton',
        SENDGENERALDETAILS: 'sendGeneralDetails',
        SENDDISCOUNTDETAILS: 'sendDiscountDetails',
        SENDSYNCDISCOUNTDETAILS: 'sendSyncDiscountDetails'
    }
}