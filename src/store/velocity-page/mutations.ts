import { subDays, format, startOfMonth, subMonths } from 'date-fns';
import { VELOCITY } from './constants';
const createMutations = () => ({
    // For datatable data
    [VELOCITY.MUTATIONS.SETVELOCITYAPIDATA](state: any, payload: any) {
        state.velocityData = payload;
    },
    // For datatable data
    [VELOCITY.MUTATIONS.SETFILTERVALUDATA](state: any, payload: any) {
        const dataKey = Object.keys(payload)[1];
        const temp: any = {
            id: [],
            value: [],
            label: '',
        };
        switch (payload.type) {
            case 'dateRange':
                temp.id = payload[dataKey].selectedLabel;
                temp.value = payload[dataKey].selectedDate;
                temp.label = payload[dataKey].label;
                state.allFilterData = { ...state.allFilterData, [dataKey]: { ...temp } };
                break;
            case 'multiSelect':
                payload[dataKey].forEach((values: any) => {
                    const data = values.split(',');
                    temp.id.push(data[0]);
                    temp.value.push(data[1]);
                });
                state.allFilterData = { ...state.allFilterData, [dataKey]: { ...temp } };
                break;
            case 'search':
                state.allFilterData[dataKey] = payload[dataKey];
                state.allFilterData = { ...state.allFilterData };
                break;
            case 'vendorModal':
                payload[dataKey].forEach((values: any) => {
                    const data = values.split(',');
                    temp.id.push(data[1]);
                    temp.value.push(data[0]);
                });
                state.allFilterData = { ...state.allFilterData, [dataKey]: { ...temp } };
                break;
            case 'sort':
                state.allFilterData[dataKey] = payload[dataKey];
                state.allFilterData = { ...state.allFilterData };
                break;
            case 'minMax':
                state.allFilterData[dataKey] = payload[dataKey];
                state.allFilterData = { ...state.allFilterData };
                break;
        }
    },
    [VELOCITY.MUTATIONS.CLEARFILTERBYFIELD](state: any, key: any) {
        const item = state.allFilterData[key];
        const tempFilterData = { ...state.allFilterData };
        if (typeof item === 'object') {
            if (Array.isArray(item)) {
                tempFilterData[key] = [];
            } else if (item.min || item.max) {
                tempFilterData[key] = [];
            } else {
                tempFilterData[key].id = [];
                tempFilterData[key].value = [];
                tempFilterData[key].label = '';

                if (key === 'applied_on') {
                    const startDate = subDays(new Date(), 29);
                    const endDate = new Date();
                    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
                    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
                    tempFilterData[key].value = formattedStartDate + ' ' + formattedEndDate;
                    tempFilterData[key].id = 'last_30_days';
                    tempFilterData[key].label = '';
                }
            }
        } else {
            tempFilterData[key] = '';
        }
        state.allFilterData = { ...tempFilterData };
    },
    [VELOCITY.MUTATIONS.CLEARALLFILTER](state: any) {
        state.allFilterData = {
            applied_on: {
                id: '',
                value: '',
                label: '',
            },
            status: {
                id: [],
                value: [],
            },
            vendor_name: {
                id: [],
                value: [],
            },
            paginatorStart: 0,
            paginatorLast: 10,
            applied_on_sort: '',
        };
        const startDate = subDays(new Date(), 29);
        const endDate = new Date();
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
        state.allFilterData.applied_on['value'] = formattedStartDate + ' ' + formattedEndDate;
        state.allFilterData.applied_on['id'] = 'last_30_days';
    },
    [VELOCITY.MUTATIONS.SETVELOCITYEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },
    [VELOCITY.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },
    [VELOCITY.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = payload;
    },
    [VELOCITY.MUTATIONS.SETDATERANGE](state: any, payload: any) {
        state.allFilterData['applied_on'].value = payload.date;
        state.allFilterData['applied_on'].id = payload.selectedLabel;
    },
    [VELOCITY.MUTATIONS.SETVENDORMODALDATA](state: any, payload: any) {
        if (payload.isVendorSearch) {
            state.vendorData = payload.getvendorData.all_vendors_data_array;
        } else {
            state.vendorData = state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        }
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },
    [VELOCITY.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
        state.page_count_billing = payload.page_count;
    },
    [VELOCITY.MUTATIONS.SETCOLUMNSDATA](state: any, payload: any) {
        state.columnsData = payload;
    },
    [VELOCITY.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },
    [VELOCITY.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload.status;
    },
    [VELOCITY.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },
});
export default createMutations;
