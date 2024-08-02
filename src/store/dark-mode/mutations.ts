import { DARKMODE } from './constants';
const createMutations = () => ({
    // For datatable data
    [DARKMODE.MUTATIONS.SETDARKMODEVAL](state: any, payload: any) {
        state.darkmode = payload;
    },
    [DARKMODE.MUTATIONS.SETWALLETAMOUNT](state: any, payload: any) {
        state.walletAmount = payload;
    },
   
});
export default createMutations;
