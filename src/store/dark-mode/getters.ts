import { DARKMODE } from './constants';
const createGetters = () => ({
   
    [DARKMODE.GETTERS.SENDDARKMODEVAL] (state: any) {
        return state.darkmode
    },
    [DARKMODE.GETTERS.SENDWALLETAMOUNT] (state: any) {
        return state.walletAmount
    }
});
export default createGetters;
