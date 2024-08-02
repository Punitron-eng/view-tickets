// 730
import { subDays, format, startOfMonth, subMonths } from 'date-fns';
import { isobjectLabel, isObject, updateFilterData, isObjectForCheckbox, isObjectForRadio, isObjectForMinMax, formatFilterData, findTypeIndex } from '../../../commonStoreFuncs.ts';
import { ONBOARDUSER } from './constants';
import { dataTableVariables as dataVariables } from '../../../../components/itl-dataTable-files/itl-dataTable/commonVariable.js';

const createMutations = () => ({
    // For datatable action modals
    [ONBOARDUSER.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [ONBOARDUSER.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [ONBOARDUSER.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply
    [ONBOARDUSER.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        payloads.forEach((payload) => {
            const dataKey = Object.keys(payload)[1];
            const temp = { id: [], value: [] };
            switch (payload.type) {
                case 'dateRange':
                    const dateRangeData = payload[dataKey];
                    updateFilterData(state, dataKey, { id: dateRangeData.selectedLabel, value: dateRangeData.selectedDate, label: dateRangeData.label });
                    break;
                case 'multiSelect':
                case 'vendorModal':
                    payload[dataKey].forEach((values) => {
                        const [id, value] = values.split(',');
                        temp.id.push(id);
                        temp.value.push(value);
                    });
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

    // For datatable filter clear by field
    [ONBOARDUSER.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
                if (key === dataVariables.value.syncDateName) {
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
    [ONBOARDUSER.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            user_website: '',
            user_spd: '',
            onboard_user_actual_spd: '',
            vendor_name_details: '',
            onboard_user_web_remark: '',
            onboard_user_app_remark: '',
            calling_date: {
                id: '',
                value: '',
                label: '',
            },
            next_calling_date: {
                id: '',
                value: '',
                label: '',
            },
            user_wallet_amount: '',
            user_signup_date: {
                id: '',
                value: '',
                label: '',
            },
            user_modified_date: {
                id: '',
                value: '',
                label: '',
            },
            user_utm_source: '',
            delivery_type: {
                id: [],
                value: [],
            },
            user_onboard_steps: {
                id: [],
                value: [],
            },
            sub_admin_name: {
                id: [],
                value: [],
            },
            onboard_calling_status: {
                id: [],
                value: [],
            },
            onboard_calling_sub_status: {
                id: [],
                value: [],
            },
            onboard_user_status: {
                id: [],
                value: [],
            },

            onboard_lead_type: {
                id: [],
                value: [],
            },
            vendor_name: {
                id: [],
                value: [],
            },
            paginatorStart: 0,
            paginatorLast: 10,
            search: '',
        };

        const startDate = subDays(new Date(), 29);
        const endDate = new Date();
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        const dateKey = dataVariables.value.syncDateName;

        state.allFilterData[dateKey].value = `${formattedStartDate} ${formattedEndDate}`;
        state.allFilterData[dateKey].id = 'last_30_days';
    },

    // For datatable data export
    [ONBOARDUSER.MUTATIONS.SETDTEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
        23;
    },

    // For datatable start page count
    [ONBOARDUSER.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [ONBOARDUSER.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [ONBOARDUSER.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = 'calling_date';
        state.allFilterData[dateKey].value = payload[dateKey].date;
        state.allFilterData[dateKey].id = payload[dateKey].selectedLabel;
    },

    // For global search
    [ONBOARDUSER.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search = payload;
    },

    // For datatable vendor data
    [ONBOARDUSER.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [ONBOARDUSER.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [ONBOARDUSER.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [ONBOARDUSER.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [ONBOARDUSER.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
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
    [ONBOARDUSER.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [ONBOARDUSER.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [ONBOARDUSER.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [ONBOARDUSER.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [ONBOARDUSER.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },
    // For get Save filter Data
    [ONBOARDUSER.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }
        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                user_website: '',
                user_spd: '',
                onboard_user_actual_spd: '',
                vendor_name_details: '',
                onboard_user_web_remark: '',
                onboard_user_app_remark: '',
                calling_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                next_calling_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                user_wallet_amount: '',
                user_signup_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                user_modified_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                user_utm_source: '',
                delivery_type: {
                    id: [],
                    value: [],
                },
                user_onboard_steps: {
                    id: [],
                    value: [],
                },
                sub_admin_name: {
                    id: [],
                    value: [],
                },
                onboard_calling_status: {
                    id: [],
                    value: [],
                },
                onboard_calling_sub_status: {
                    id: [],
                    value: [],
                },
                onboard_user_status: {
                    id: [],
                    value: [],
                },

                onboard_lead_type: {
                    id: [],
                    value: [],
                },
                vendor_name: {
                    id: [],
                    value: [],
                },
                paginatorStart: 0,
                paginatorLast: 10,
                searchInput: '',
            };
            item.forEach((payload) => {
                const dataKey = Object.keys(payload)[findTypeIndex(payload)];
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
            tempFilterObject['name'] = payload.data[index].filter_name;
            tempFilterObject['id'] = payload.data[index].id;
            tempFilterObject['is_pinned'] = payload.data[index].is_pinned;
            state.viewSaveFilteredData.push(tempFilterObject);

            // tempFilterObject = { ...state.allFilterData };
            state.viewSaveFilteredData = state.viewSaveFilteredData.map((item) => {
                const filteredItem = {};
                if (item) {
                    for (const key in item) {
                        const value = item[key];
                        if ((value.length >= 0 && typeof value === 'string') || isObject(value) || isobjectLabel(value) || isObjectForMinMax(value) || key === 'id' || key === 'is_pinned') {
                            filteredItem[key] = value;
                        }
                    }
                }

                return filteredItem;
            });
        });
    },

    // For reset save filter data
    [ONBOARDUSER.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    // For Update datatable saveFilter data
    [ONBOARDUSER.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [ONBOARDUSER.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [ONBOARDUSER.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    // For Export selected rows data
    [ONBOARDUSER.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // ---------------------------------------------------------------------- DATA TABLE MUTATION ABOVE -------------------------------------------------------------
});
export default createMutations;
