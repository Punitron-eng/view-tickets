// 730
import { subDays, format, startOfMonth, subMonths } from 'date-fns';
import { REMITTANCEPLAN } from './constants';
import { isobjectLabel, isObject, updateFilterData, isObjectForCheckbox, isObjectForRadio, isObjectForMinMax, formatFilterData, setFilterValue, setApplySaveFilterData, setViewSaveFilterData } from '../../../commonStoreFuncs.ts';
const createMutations = () => ({
    ///////// datatable common mutation start //////////////////////
    // For datatable action modals
    [REMITTANCEPLAN.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [REMITTANCEPLAN.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [REMITTANCEPLAN.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply
    [REMITTANCEPLAN.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [REMITTANCEPLAN.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
        const item = state.allFilterData[key];
        const tempFilterData = { ...state.allFilterData };

        if (typeof item === 'object') {
            if (Array.isArray(item)) {
                tempFilterData[key] = [];
            } else if (item.min || item.max) {
                tempFilterData[key] = '';
            } else {
                if ('label' in item) {
                    tempFilterData[key] = { id: '', value: '', label: '' };
                } else {
                    tempFilterData[key] = { id: [], value: [] };
                }
                if (key === 'remittance_plan_date') {
                    const startDate = subDays(new Date(), 29);
                    const endDate = new Date();
                    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
                    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
                    tempFilterData[key].value = `${formattedStartDate} ${formattedEndDate}`;
                    tempFilterData[key].id = 'last_30_days';
                }
            }
        } else {
            tempFilterData[key] = '';
        }

        state.allFilterData = { ...tempFilterData };
    },

    // For datatable clear all filters
    [REMITTANCEPLAN.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            remittance_plan_name: {
                id: [],
                value: [],
            },
            remittance_plan_date: {
                id: '',
                value: '',
                label: '',
            },
            paginatorStart: 0,
            paginatorLast: 10,
            search: '',
            vendor_name: {
                id: [],
                value: [],
            },
        };

        const startDate = subDays(new Date(), 29);
        const endDate = new Date();
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        const dateKey = 'remittance_plan_date';

        state.allFilterData[dateKey].value = `${formattedStartDate} ${formattedEndDate}`;
        state.allFilterData[dateKey].id = 'last_30_days';
    },

    // For datatable start page count
    [REMITTANCEPLAN.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [REMITTANCEPLAN.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [REMITTANCEPLAN.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = 'remittance_plan_date';
        state.allFilterData[dateKey].value = payload.date;
        state.allFilterData[dateKey].id = payload.selectedLabel;
    },

    // For datatable vendor data
    [REMITTANCEPLAN.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [REMITTANCEPLAN.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [REMITTANCEPLAN.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [REMITTANCEPLAN.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [REMITTANCEPLAN.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [REMITTANCEPLAN.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For reset vendor data
    [REMITTANCEPLAN.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [REMITTANCEPLAN.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [REMITTANCEPLAN.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },
    // For get Save filter Data
    [REMITTANCEPLAN.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }
        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                remittance_plan_name: { id: [], value: [] },
                remittance_plan_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                paginatorStart: 0,
                paginatorLast: 10,
                search: '',
                vendor_name: {
                    id: [],
                    value: [],
                },
            };
            setViewSaveFilterData(state, item, tempFilterObject, index, payload);
        });
    },

    // For reset save filter data
    [REMITTANCEPLAN.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    // For Update datatable saveFilter data
    [REMITTANCEPLAN.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [REMITTANCEPLAN.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [REMITTANCEPLAN.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    ///////// datatable common mutation end //////////////////////
});
export default createMutations;

// Helper method to check if a value is an object
