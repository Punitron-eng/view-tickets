import { ACCOUNTSETTINGS } from './constants';

const createGetters = () => ({
    [ACCOUNTSETTINGS.GETTERS.SENDACCOUNTSETTING](state) {
        return state.accountDetails;
    },
    [ACCOUNTSETTINGS.GETTERS.SENDACCOUNTOTP](state) {
        return state.sendOtpData;
    },
    [ACCOUNTSETTINGS.GETTERS.GETISSENDOTP](state: any) {
        // console.log(state.allData)
        return state.isSendOtp;
    },
});
export default createGetters;
