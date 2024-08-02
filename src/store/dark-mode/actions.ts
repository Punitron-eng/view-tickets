import { DARKMODE } from './constants';
import { updateWalletAmount } from '@/api/menu-api/getMenuData';
const createActions = () => ({
    // For datatable data
    [DARKMODE.ACTIONS.GETDARKMODEVAL](context: any, payload: any) {
        context.commit(DARKMODE.MUTATIONS.SETDARKMODEVAL, payload);
    },
    async [DARKMODE.ACTIONS.GETWALLETAMOUNT](context: any) {
        const walletAmount = await updateWalletAmount()
        context.commit(DARKMODE.MUTATIONS.SETWALLETAMOUNT, walletAmount);
    },
});
export default createActions;
