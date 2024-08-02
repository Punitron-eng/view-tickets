import { ACCOUNTSETTINGS } from './constants';
const createMutations = () => ({
    [ACCOUNTSETTINGS.MUTATIONS.SETACCOUNTSETTING](state: any, payload: any) {
        state.accountDetails = payload;
    },
    [ACCOUNTSETTINGS.MUTATIONS.SETACCOUNTOTP](state:any,payload:any){
        state.sendOtpData=payload;
    },
    [ACCOUNTSETTINGS.MUTATIONS.SETISSENDOTP](state: any, payload: any) {
        state.isSendOtp = payload;
        // state.tabType = payload;
    },
});
export default createMutations;
