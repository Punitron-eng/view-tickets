import createActions from '../../store/dark-mode/actions';
import createMutations from '../../store/dark-mode/mutations';
import createGetters from '../../store/dark-mode/getters';
const state: any = {
    darkmode: false,
    walletAmount: null,
};
const updateDarkMode = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default updateDarkMode;
