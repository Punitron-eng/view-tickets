// 730
import { subDays, format, startOfMonth, subMonths } from 'date-fns';
import { setFilterValue, formatFilterData, updateFilterData } from '../../commonStoreFuncs.ts';
import { CPVIEWUSER } from './constants';

const createMutations = () => ({
    // For datatable action modals
    [CPVIEWUSER.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [CPVIEWUSER.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For datatable data count
    [CPVIEWUSER.MUTATIONS.SETDATATABLEAPIDATACOUNT](state: any, payload: any) {
        state.count = payload;
    },

    // For reset datatable data
    [CPVIEWUSER.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    [CPVIEWUSER.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable filter apply
    [CPVIEWUSER.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [CPVIEWUSER.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
                if (key === 'user_created_date') {
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
    [CPVIEWUSER.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            vendor_code: '',
            user_company_name: '',
            user_email: '',
            user_mobile: '',
            user_created_date: {
                id: '',
                value: '',
                label: '',
            },
            last_order_date: {
                id: '',
                value: '',
                label: '',
            },
            delivery_type: {
                id: '',
                value: '',
            },
            user_account_type: {
                id: [],
                value: [],
            },
            user_status: {
                id: [],
                value: [],
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

        const dateKey = 'user_created_date';

        state.allFilterData[dateKey].value = `${formattedStartDate} ${formattedEndDate}`;
        state.allFilterData[dateKey].id = 'last_30_days';
    },

    // For datatable data export
    [CPVIEWUSER.MUTATIONS.SETDTEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [CPVIEWUSER.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [CPVIEWUSER.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [CPVIEWUSER.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = 'user_created_date';
        state.allFilterData[dateKey].value = payload.date;
        state.allFilterData[dateKey].id = payload.selectedLabel;
    },

    // For global search
    [CPVIEWUSER.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search = payload;
    },

    // For datatable vendor data
    [CPVIEWUSER.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [CPVIEWUSER.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [CPVIEWUSER.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [CPVIEWUSER.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [CPVIEWUSER.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        const response = selectedData.filterArr;
        response.forEach((payload) => {
            const dataKey = Object.keys(payload)[0];
            const temp = { id: [], value: [] };
            switch (payload.type) {
                case 'dateRange':
                    const dateRangeData = payload[dataKey];
                    updateFilterData(state, dataKey, { id: dateRangeData.id, value: dateRangeData.value, label: dateRangeData.label });
                    break;
                case 'multiSelect':
                case 'vendorModal':
                    temp.id = payload[dataKey].id;
                    temp.value = payload[dataKey].value;
                    updateFilterData(state, dataKey, { ...temp });
                    break;
                case 'radio':
                case 'search':
                case 'sort':
                case 'minMax':
                case 'dropdownRadio':
                    updateFilterData(state, dataKey, payload[dataKey]);
                    break;
            }
        });
    },

    // For Update datatable saveFilter data
    [CPVIEWUSER.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [CPVIEWUSER.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [CPVIEWUSER.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [CPVIEWUSER.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [CPVIEWUSER.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },
    // For get Save filter Data
    [CPVIEWUSER.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }
        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                vendor_code: '',
                user_company_name: '',
                user_email: '',
                user_mobile: '',
                user_created_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                last_order_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                delivery_type: {
                    id: '',
                    value: '',
                },
                user_account_type: {
                    id: [],
                    value: [],
                },
                user_status: {
                    id: [],
                    value: [],
                },
                paginatorStart: 0,
                paginatorLast: 10,
                search: '',
                vendor_name: {
                    id: [],
                    value: [],
                },
            };
            item.forEach((payload) => {
                const dataKey = Object.keys(payload)[1];
                const datetemp = { id: [], value: [], label: '' };
                const temp = { id: [], value: [] };
                switch (payload.type) {
                    case 'dateRange':
                        datetemp.id = payload[dataKey].id;
                        datetemp.value = payload[dataKey].value;
                        datetemp.label = payload[dataKey].id;
                        tempFilterObject = { ...tempFilterObject, [dataKey]: { ...datetemp } };
                        break;
                    case 'multiSelect':
                    case 'vendorModal':
                        temp.id = payload[dataKey].id;
                        temp.value = payload[dataKey].value;
                        tempFilterObject = { ...tempFilterObject, [dataKey]: { ...temp } };
                        break;
                    case 'search':
                    case 'radio':
                    case 'minMax':
                    case 'dropdownRadio':
                        tempFilterObject[dataKey] = payload[dataKey];
                        tempFilterObject = { ...tempFilterObject };
                        break;
                }
            });
            tempFilterObject.name = payload.data[index].filter_name;
            tempFilterObject.id = payload.data[index].id;
            tempFilterObject.is_pinned = payload.data[index].is_pinned;
            state.viewSaveFilteredData.push(tempFilterObject);

            state.viewSaveFilteredData = state.viewSaveFilteredData.map((item) => {
                const filteredItem = {};
                if (item) {
                    for (const key in item) {
                        const value = item[key];
                        if ((value.length >= 0 && typeof value === 'string') || isObject(value) || isobjectLabel(value) || key === 'id' || key === 'is_pinned') {
                            filteredItem[key] = value;
                        }
                    }
                }

                return filteredItem;
            });
        });
    },

    // For reset save filter data
    [CPVIEWUSER.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    // For Update datatable saveFilter data
    [CPVIEWUSER.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [CPVIEWUSER.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [CPVIEWUSER.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    // For Export selected rows data
    [CPVIEWUSER.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // ---------------------------------------------------------------------- DATA TABLE MUTATION ABOVE -------------------------------------------------------------
});
export default createMutations;

// Helper method to check if a value is an object
