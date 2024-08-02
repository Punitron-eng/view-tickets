import createActions from './actions';
import createMutations from './mutations';
import createGetters from './getters';
const state: any = {
    bulkPrintShipmentData: ''
};
const bulkprintShipment = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default bulkprintShipment;
