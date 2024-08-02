export const ACCOUNTSETTINGS = {
    NAME: 'ACCOUNTSETTINGS',
    ACTIONS: {
        GETACCOUNTSETTING: 'getaccountsettings',
        GETACCOUNTOTP: 'getaccountotp',
        SENDOTP: 'sendOtp',
        VERIFYOTP: 'verifyOtp',
        SETISSENDOTP: 'setIsSendOtp',
        FETCHDEFAULTDATA: 'fetchDefaultData',
    },
    MUTATIONS: {
        SETACCOUNTSETTING: 'setaccountsettings',
        SETACCOUNTOTP: 'setaccountotp',
        SETISSENDOTP: 'setIsSendOtp',
        SETMOBILE: 'setMobile',
    },
    GETTERS: {
        SENDACCOUNTSETTING: 'sendaccountsettings',
        SENDACCOUNTOTP: 'sendaccountotp',
        GETISSENDOTP: 'getIsSendOtp',
    },
};
