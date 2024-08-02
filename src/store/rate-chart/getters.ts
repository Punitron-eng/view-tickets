import { RATECHART } from './constants';
const createGetters = () => ({
    [RATECHART.GETTERS.GETALLDATA](state: any) {
        return state.allData;
    },
    [RATECHART.GETTERS.GETALLTABLEDATAARRAY](state: any) {
        return state.tableDataArray;
    },
    [RATECHART.GETTERS.GETALLFLATRATETABLEDATAARRAY](state: any) {
        return state.tableDataArrayFlatRates;
    },
    [RATECHART.GETTERS.GETMODALDATA](state: any) {
        return state.modalData;
    },
    [RATECHART.GETTERS.GETALLLOGISTICSDATAARRAY](state: any) {
        let arr: Array<Object> = [];
        for (let i in state.allLogisticsDataArray) {
            let obj = {
                id: i,
                value: state.allLogisticsDataArray[i],
            };
            arr.push(obj);
        }
        return arr;
    },
    [RATECHART.GETTERS.GETLOGISTICSDATAARRAYMODAL](state: any) {
        let arr: Array<Object> = [{ id: '', value: 'Select Logistics' }];
        for (let i in state.modalData.logistics_v2_data_array) {
            let obj = {
                id: state.modalData.logistics_v2_data_array[i].logistic_id,
                logistic_id: state.modalData.logistics_v2_data_array[i].logistic_id,
                value: state.modalData.logistics_v2_data_array[i].logistic_name,
            };
            arr.push(obj);
        }
        return arr;
    },
    [RATECHART.GETTERS.GETLOGISTICSSERVICETYPEARRAYMODAL](state: any) {
        let arr: Array<Object> = [{ id: '', value: 'Select Logistics Service Type' }];
        for (let i in state.modalData.all_logistics_service_type_data_array) {
            let obj = {
                id: state.modalData.all_logistics_service_type_data_array[i].id,
                logistic_service_type_id: state.modalData.all_logistics_service_type_data_array[i].logistic_service_type_id,
                value: state.modalData.all_logistics_service_type_data_array[i].logistic_service_type,
            };
            arr.push(obj);
        }
        return arr;
    },
    [RATECHART.GETTERS.GETACTIVELOGISTICS](state: any) {
        return state.activeLogistics;
    },
    [RATECHART.GETTERS.GETVENDOR](state: any) {
        return state.vendor;
    },
    [RATECHART.GETTERS.GETBAND](state: any) {
        return state.band;
    },
    [RATECHART.GETTERS.GETBANDOPTIONS](state: any) {
        return state.bandOptions;
    },
    [RATECHART.GETTERS.GETDELIVERYTYPE](state: any) {
        return state.deliveryType;
    },
    [RATECHART.GETTERS.GETTABTYPE](state: any) {
        return state.tabType;
    },
    [RATECHART.GETTERS.GETISSENDOTP](state: any) {
        return state.isSendOtp;
    },
    [RATECHART.GETTERS.GETMOBILE](state: any) {
        return state.mobile;
    },
});
export default createGetters;
