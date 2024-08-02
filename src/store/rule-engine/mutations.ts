import { RULEENGINE } from './constants';

const createMutations = () => ({
    [RULEENGINE.MUTATIONS.SETRULELISTDATA](state: any, payload: any) {
        // console.log('mutation call list',  payload);
        state.ruleListData = payload; // update the state: vendorDataList
    },
    [RULEENGINE.MUTATIONS.SETLOGISTICSDATA](state: any, payload: any) {
        // console.log('mutation call', state, payload);
        state.ruleLogisticsData = payload;
    },
    [RULEENGINE.MUTATIONS.SETDROPDOWNDATA](state: any, payload: any) {
        // console.log('mutation call drop down data', payload);
        state.dropdownData = [...payload];
    },
    [RULEENGINE.MUTATIONS.SETRULENAME](state: any, payload: any) {
        // console.log('mutation call rule Name data', payload);
        state.ruleName = payload;
    },
    [RULEENGINE.MUTATIONS.SETSHOWCHANNELDATA](state: any, payload: any) {
        // console.log('mutation call show channel data', payload);
        state.showChannelData = payload;
    },
    [RULEENGINE.MUTATIONS.SETWAREHOUSEDATA](state: any, payload: any) {
        // console.log('mutation call show channel data', payload);
        state.showWarehouseData = payload;
    },
    [RULEENGINE.MUTATIONS.SETDISABLEDDROPDOWN](state: any, payload: any) {
        // console.log('mutation call dropdown data', payload);
        state.disabledDropDown = payload;
    },
    [RULEENGINE.MUTATIONS.SETADDSTATECITY](state: any, payload: any) {
        if(!payload.reset){

            if (state.selectedState.state == undefined) {
                state.selectedState.state = [];
            }
            if (state.selectedState.city == undefined) {
                state.selectedState.city = [];
            }
            payload.id == 5 && state.selectedState.state.push(payload.value);
            payload.id == 7 && state.selectedState.city.push(payload.value);
        }
        else{
            state.selectedState ={state:[],city:[]}
        }
        // console.log('mutation call add state city data array', state.selectedState);
    },
    [RULEENGINE.MUTATIONS.SETSTATEAPIDATA](state: any, payload: any) {
        // debugger
        // console.log('mutation call state api data', state.stateApi);
        state.stateApi = payload;
    },
    [RULEENGINE.MUTATIONS.SETCITYAPIDATA](state: any, payload: any) {
        // debugger
        // console.log('mutation call city api data', state.CityApi);
        state.CityApi = payload;
    },
    [RULEENGINE.MUTATIONS.SETSHOWSTATECITYDATA](state: any, payload: any) {
        // debugger
        // console.log('mutation call show state and city data', state.showStateCityContent);
        state.showStateCityContent = payload;
    },
    [RULEENGINE.MUTATIONS.SETSHOWSTOREDATA](state: any, payload: any) {
        // debugger
        // console.log('mutation call show store data', state.showStoreData);
        state.showStoreData = payload;
    },
    [RULEENGINE.MUTATIONS.SETSELECTEDVENDORID](state: any, payload: any) {
        state.selectedVendor = payload;
    },
    [RULEENGINE.MUTATIONS.SETCLONEDATA](state: any, payload: any) {
        state.cloneData = payload;
    },
});
export default createMutations;
