import { MENU } from './constants';
import { updateMenuType } from '@/api/menu-api/getMenuData';

const createActions = () => ({
    async [MENU.ACTIONS.GETMENUTYPE](context: any, payload: any) {
        const currentMenuType = await updateMenuType(payload);
        context.commit(MENU.MUTATIONS.SETMENUTYPE, currentMenuType);
    },
});
export default createActions;
