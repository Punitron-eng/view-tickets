import { RULEENGINE } from './constants';

const createGetters = () => ({
    [RULEENGINE.GETTERS.RULELISTDATA](state: any) {
        // console.log('gettter ====>', state.ruleListData);
        // console.log(state.ruleListData,'state.ruleListData')
        return state.ruleListData; // selected Vendor Data (state: vendorDataList)
    },
    [RULEENGINE.GETTERS.LOGISTICSDATA](state: any) {
        // console.log('getters logistic data', state.ruleLogisticsData);
        return state.ruleLogisticsData;
    },
    [RULEENGINE.GETTERS.DROPDOWNDATA](state: any) {
        // console.log('getters dropdown data', state.dropdownData);
        return state.dropdownData;
    },
    [RULEENGINE.GETTERS.RULENAME](state: any) {
        // console.log('getters rulename data', state.ruleName);
        return state.ruleName;
    },
    [RULEENGINE.GETTERS.SHOWCHANNELDATA](state: any) {
        // console.log('getters show channel data', state.showChannelData);
        return state.showChannelData;
    },
    [RULEENGINE.GETTERS.SHOWWAREHOUSEDATA](state: any) {
        // console.log('getters show warehouse data', state.showWarehouseData);
        return state.showWarehouseData;
    },
    [RULEENGINE.GETTERS.DISABLEDDROPDOWNDATA](state: any) {
        // console.log('getters disbaled dropdown data', state.disabledDropDown);
        return state.disabledDropDown;
    },
    [RULEENGINE.GETTERS.ADDSTATECITYDATA](state: any) {
        // debugger
        // console.log('getters add state city data array', state.selectedState);
        return state.selectedState;
    },
    [RULEENGINE.GETTERS.STATEAPIDATA](state: any) {
        // debugger
        // console.log('getters state  api data', state.stateApi);
        return state.stateApi;
    },
    [RULEENGINE.GETTERS.CITYAPIDATA](state: any) {
        // debugger
        // console.log('getters city api data', state.cityApi);
        return state.CityApi;
    },
    [RULEENGINE.GETTERS.SHOWSTATECITYDATA](state: any) {
        // debugger
        // console.log('getters show state city data', state.showStateCityContent);
        return state.showStateCityContent;
    },
    [RULEENGINE.GETTERS.SHOWSTOREDATA](state: any) {
        // debugger
        // console.log('getters show store data', state.showStoreData);
        return state.showStoreData;
    },
    [RULEENGINE.GETTERS.SHOWVENDORID](state: any) {
        return state.selectedVendor;
    },
    [RULEENGINE.GETTERS.SHOWCLONEDATA](state: any) {
        return state.cloneData;
    },
});
export default createGetters;
