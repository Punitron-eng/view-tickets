import { RATECHART } from './constants';

const createMutations = () => ({
    // For datatable data
    [RATECHART.MUTATIONS.SETDEFAULTDATA](state: any, payload: any) {
        state.allData = payload;
        state.tableDataArray = payload.all_zone_rate_chart_data_array;
        state.allLogisticsDataArray = payload.all_logistics_data_array;
        state.bandOptions = payload.all_band_percentage_data_array;
        state.isSendOtp = payload.is_send_otp;
        state.tableDataArrayFlatRates = payload.all_flat_rate_chart_data_array;


        let finalObject = payload.all_flat_rate_chart_data_array;
        let finalArray = [];
        for (let i in payload.all_flat_rate_chart_data_array) {
            let res = separateObjectsById(payload.all_flat_rate_chart_data_array[i]);
            finalArray.push(res);
        }

        let j = 0;
        for(let i in finalObject){
            finalObject[i] = finalArray[j];
            j++;
        }
        state.tableDataArrayFlatRates = finalObject;
        const commonKeys = Object.keys(payload.all_logistics_data_array).filter(key => payload.all_zone_rate_chart_data_array.hasOwnProperty(key));
        const commonKeys2 = Object.keys(payload.all_logistics_data_array).filter(key => payload.all_flat_rate_chart_data_array.hasOwnProperty(key));
        const mergedObject = {};


        const finalKeys = [...new Set([...commonKeys, ...commonKeys2])].sort((a: any, b: any) => a-b)
        
        finalKeys.forEach(key => {
            mergedObject[key] = payload.all_logistics_data_array[key];
        });

        state.allLogisticsDataArray = mergedObject;

        state.band = payload.all_band_percentage_data_array.find(el => el.id == payload.band_id);
    },
    [RATECHART.MUTATIONS.SETDATA](state: any, payload: any) {
        state.allData = payload;
        state.tableDataArray = payload.all_zone_rate_chart_data_array;

        state.tableDataArrayFlatRates = payload.all_flat_rate_chart_data_array;


        let finalObject = payload.all_flat_rate_chart_data_array;
        let finalArray = [];
        for (let i in payload.all_flat_rate_chart_data_array) {
            let res = separateObjectsById(payload.all_flat_rate_chart_data_array[i]);
            finalArray.push(res);
        }

        let j = 0;
        for(let i in finalObject){
            finalObject[i] = finalArray[j];
            j++;
        }
        state.tableDataArrayFlatRates = finalObject;

        state.bandOptions = payload.all_band_percentage_data_array;
        state.isSendOtp = payload.is_send_otp;


        const commonKeys = Object.keys(payload.all_logistics_data_array).filter(key => payload.all_zone_rate_chart_data_array.hasOwnProperty(key));
        const commonKeys2 = Object.keys(payload.all_logistics_data_array).filter(key => payload.all_flat_rate_chart_data_array.hasOwnProperty(key));
        const mergedObject = {};


        const finalKeys = [...new Set([...commonKeys, ...commonKeys2])].sort((a: any, b: any) => a-b)
        
        finalKeys.forEach(key => {
            mergedObject[key] = payload.all_logistics_data_array[key];
        });
        state.allLogisticsDataArray = mergedObject;

        state.band = payload.all_band_percentage_data_array.find(el => el.id == payload.band_id);
    },
    [RATECHART.MUTATIONS.SETMODALDATA](state: any, payload: any) {
        state.modalData = payload;
    },
    [RATECHART.MUTATIONS.SETVENDOR](state: any, payload: any) {
        if (payload) {
            const vendor: any = (/^([^,]+),(\d+)$/).exec(payload);
            const id = vendor[2];
            const name = vendor[1].trim();

            state.vendor.id = id;
            state.vendor.value = name;
        } else {
            state.vendor.id = '';
            state.vendor.value = '';
        }
    },
    [RATECHART.MUTATIONS.SETACTIVELOGISTICS](state: any, payload: any) {
        state.activeLogistics = {
            id: payload.id,
            value: payload.value
        };
    },
    [RATECHART.MUTATIONS.SETBAND](state: any, payload: any) {
        state.band = payload;
    },
    [RATECHART.MUTATIONS.SETDELIVERYTYPE](state: any, payload: any) {
        state.deliveryType = payload;
    },
    [RATECHART.MUTATIONS.SETTABTYPE](state: any, payload: any) {
        state.allData = [];
        state.allLogisticsDataArray = [];
        state.tableDataArray = [];
        state.tableDataArrayFlatRates = [];

        state.tabType = payload;
    },
    [RATECHART.MUTATIONS.SETMOBILE](state: any, payload: any) {
        state.mobile = payload.mobile;
    },
    [RATECHART.MUTATIONS.SETISSENDOTP](state: any, payload: any) {
        state.isSendOtp = payload;
    },
});

// custom function
function separateObjectsById(objects) {
    const idMap = new Map();
    const inputArray = [];
    objects.forEach((el) => {
        inputArray.push(el.logistics_service_type)
    })
    const serviceTypeArr = [...new Set(inputArray)]

    serviceTypeArr.forEach((el)=>{
        idMap.set(el, []);
    })
    objects.forEach((el) => {
        let temp = idMap.get(el.logistics_service_type)
        temp.push(el)
        idMap.set(el.logistics_service_type, temp)
    })

    let final = []
    idMap.forEach((el) => {
        final.push(el);
    })
    return final
}

export default createMutations;
