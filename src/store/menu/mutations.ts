import { MENU } from './constants';
const createMutations = () => ({
    [MENU.MUTATIONS.SETMENUTYPE](state: any, payload: any) {
        state.menuType = payload;
    },
});
export default createMutations;
