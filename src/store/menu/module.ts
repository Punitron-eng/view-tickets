import createActions from '../../store/menu/actions';
import createMutations from '../../store/menu/mutations';
import createGetters from '../../store/menu/getters';
const state: any = {
    menuType: ''
};
const updateMenu = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default updateMenu;
