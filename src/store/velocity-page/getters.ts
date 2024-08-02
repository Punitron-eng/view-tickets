import { VELOCITY } from './constants';
const createGetters = () => ({
    [VELOCITY.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = {
            applied_on: state.allFilterData.applied_on.value,
            appliedDateLable: state.allFilterData.applied_on.id,
            status: state.allFilterData.status.id,
            paginatorStart: state.allFilterData.paginatorStart,
            vendor_name: state.allFilterData.vendor_name.id,
            applied_on_sort: state.allFilterData.applied_on_sort,
            page_count_velocity: state.page_count_velocity,
        };

        return allFilterData;
    },
    [VELOCITY.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        const allFilterData = {
            applied_on: state.allFilterData.applied_on.label === undefined ? '' : state.allFilterData.applied_on.label,
            status: state.allFilterData.status.value.join(','),
            vendor_name: state.allFilterData.vendor_name.value.join(','),
        };
        return allFilterData;
    },
    [VELOCITY.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const exportValue = {
            applied_on: state.allFilterData.applied_on.value,
            appliedDateLable: state.allFilterData.applied_on.id,
            status: state.allFilterData.status.id,
            vendor_name: state.allFilterData.vendor_name.id,
            processType: state.exportPayload,
        };
        return exportValue;
    },
    [VELOCITY.GETTERS.GETITEMFIELDPAYLOAD](state: any) {
        return state.itemsField;
    },
    [VELOCITY.GETTERS.GETACTIONRESPONSE](state: any) {
        return state.actionResponse;
    },
    [VELOCITY.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },
    [VELOCITY.GETTERS.GETPAGINATORLASTVALUE](state: any) {
        const total = state.velocityData.recordsTotal;
        let last = state.allFilterData.paginatorStart + state.allFilterData.paginatorLast;
        if (last > total) {
            last = total;
        } else {
            last;
        }
        return last;
    },
    [VELOCITY.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },
    [VELOCITY.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },
    [VELOCITY.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },
    [VELOCITY.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },
    [VELOCITY.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },
    [VELOCITY.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },
    [VELOCITY.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [VELOCITY.GETTERS.GETVELOCITYDATA](state: any) {
        return state.velocityData;
    },
    [VELOCITY.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [VELOCITY.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
});
export default createGetters;
