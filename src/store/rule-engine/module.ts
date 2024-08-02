import createActions from './action';
import createMutations from './mutations';
import createGetters from './getters';

const state = {
    ruleListData: {}, // Selected list Data
    ruleLogisticsData: [],
    dropdownData: [], //  user input dropdown data
    ruleName: '', // Rule Name
    showChannelData: false, //channel Data
    showWarehouseData: false, // warehouse data
    disabledDropDown: false, // disbaled dropdown
    selectedState: { state: [], city: [] }, // addstatecity data
    stateApi: [], // state api data
    cityApi: [], // city api data
    showStateCityContent: false, // show state city content
    showStoreData: false, // show store data
    selectedVendor: [], // show store data
    cloneData: [], // show store data
};

const ruleEngineListData = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});

export default ruleEngineListData;
