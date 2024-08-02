import createActions from './actions';
import createMutations from './mutations';
import createGetters from './getters';
const state = {
    pincodeData: '',
};
const createPincode = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default createPincode;
