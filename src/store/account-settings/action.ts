import { ACCOUNTSETTINGS } from './constants';
import { acknowledgeData, sendOtp, verifyOtp } from '../../api/accountDetails/accountDetails';

const createActions = () => ({
    async [ACCOUNTSETTINGS.ACTIONS.GETACCOUNTSETTING](context: any, payload: any) {
        const data = await acknowledgeData(payload);
        context.commit(ACCOUNTSETTINGS.MUTATIONS.SETACCOUNTSETTING, data);
    },
    // async [ACCOUNTSETTINGS.ACTIONS.GETACCOUNTOTP](context: any, payload: any) {
    //     const data = await sendOtp(payload);
    //     context.commit(ACCOUNTSETTINGS.MUTATIONS.SETACCOUNTOTP, data);
    // },
    async [ACCOUNTSETTINGS.ACTIONS.SENDOTP](context: any) {
        const data = await sendOtp();
        await context.commit(ACCOUNTSETTINGS.MUTATIONS.SETMOBILE, data);
    },
    async [ACCOUNTSETTINGS.ACTIONS.VERIFYOTP](context: any, payload: any) {
        const data = await verifyOtp(payload);
        return data;
    },
    async [ACCOUNTSETTINGS.ACTIONS.SETISSENDOTP](context: any, payload: any) {
        context.commit(ACCOUNTSETTINGS.MUTATIONS.SETISSENDOTP, payload);
    },
});
export default createActions;
