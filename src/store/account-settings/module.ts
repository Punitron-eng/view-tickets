import createActions from './action';
import createMutations from './mutations';
import createGetters from './getters';

const state = {
    accountDetails: '',
    sendOtpData:'',
};

const accountData = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});

export default accountData;
