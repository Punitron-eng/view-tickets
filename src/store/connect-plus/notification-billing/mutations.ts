// 730
import { subDays, format, startOfMonth, subMonths } from 'date-fns';
import { formatFilterData, setFilterValue, setApplySaveFilterData, setViewSaveFilterData } from '../../commonStoreFuncs.ts';
import { NOTIFICATIONBILLING } from './constants';

const createMutations = () => ({
    // For datatable action modals
    [NOTIFICATIONBILLING.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [NOTIFICATIONBILLING.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [NOTIFICATIONBILLING.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable data count
    [NOTIFICATIONBILLING.MUTATIONS.SETDATATABLEAPIDATACOUNT](state: any, payload: any) {
        state.count = payload;
    },

    // For datatable filter apply

    [NOTIFICATIONBILLING.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [NOTIFICATIONBILLING.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
                if (key === 'order_date') {
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
    [NOTIFICATIONBILLING.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            invoice_id: '',
            order_id: '',
            order_date: {
                id: '',
                value: '',
                label: '',
            },
            invoice_date: {
                id: '',
                value: '',
                label: '',
            },
            tracking_status: {
                id: [],
                value: [],
            },
            awb_no_logistics: {
                id: [],
                value: [],
            },
            paginatorStart: 0,
            paginatorLast: 10,
            search_awb_no: '',
            vendor_name: {
                id: [],
                value: [],
            },
        };

        const startDate = subDays(new Date(), 29);
        const endDate = new Date();
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        const dateKey = 'order_date';

        state.allFilterData[dateKey].value = `${formattedStartDate} ${formattedEndDate}`;
        state.allFilterData[dateKey].id = 'last_30_days';
    },

    // For datatable data export
    [NOTIFICATIONBILLING.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [NOTIFICATIONBILLING.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [NOTIFICATIONBILLING.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [NOTIFICATIONBILLING.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = 'order_date';
        state.allFilterData[dateKey].value = payload.date;
        state.allFilterData[dateKey].id = payload.selectedLabel;
    },

    // For global search
    [NOTIFICATIONBILLING.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search_awb_no = payload;
    },

    // For datatable vendor data
    [NOTIFICATIONBILLING.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [NOTIFICATIONBILLING.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [NOTIFICATIONBILLING.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [NOTIFICATIONBILLING.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [NOTIFICATIONBILLING.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [NOTIFICATIONBILLING.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [NOTIFICATIONBILLING.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [NOTIFICATIONBILLING.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [NOTIFICATIONBILLING.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [NOTIFICATIONBILLING.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },

    // For Export selected rows data
    [NOTIFICATIONBILLING.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // For get Save filter Data
    [NOTIFICATIONBILLING.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }
        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                invoice_id: '',
                order_id: '',
                order_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                invoice_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                tracking_status: {
                    id: [],
                    value: [],
                },
                awb_no_logistics: {
                    id: [],
                    value: [],
                },
                paginatorStart: 0,
                paginatorLast: 10,
                search_awb_no: '',
                vendor_name: {
                    id: [],
                    value: [],
                },
            };
            setViewSaveFilterData(state, item, tempFilterObject, index, payload);
        });
    },

    // For reset save filter data
    [NOTIFICATIONBILLING.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    [NOTIFICATIONBILLING.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [NOTIFICATIONBILLING.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [NOTIFICATIONBILLING.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        state.allFilterData.vendor_name.id = [];
        state.allFilterData.vendor_name.value = [];
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },

    // For widget Title
    [NOTIFICATIONBILLING.MUTATIONS.SETWIDGETTITLEDATA](state: any, payload: any) {
        state.widgetTitleData = payload;
    },
    // For widget Value
    [NOTIFICATIONBILLING.MUTATIONS.SETWIDGETVALUEDATA](state: any, payload: any) {
        state.widgetValueData = payload;
    },
});
export default createMutations;

// Helper method to check if a value is an object
// const isobjectLabel = (value) => {
//     if (typeof value === 'object' && value !== null) {
//         if ('label' in value && value.label.length > 0 && value != undefined) {
//             return true;
//         }
//     }
// };
// function isObject(value) {
//     if (typeof value === 'object' && value !== null) {
//         if ('id' in value && Array.isArray(value.id) && value.id.length > 0) {
//             return true;
//         } else if ('min' in value && typeof value.min === 'string' && value.min.length > 0) {
//             return true;
//         }
//     }

//     return false;
// }

// function getSelectedTabData(state, dataItem, field, tab = '') {
//     if (tab && state.selectedTab === tab) {
//         return {
//             id: dataItem[`${field}_label`] || '',
//             value: dataItem[field] || '',
//             label: dataItem[`${field}_label`] || '',
//         };
//     }
//     return {};
// }

// function getAmountData(state, dataItem, minField, maxField, tab = '') {
//     if (!tab || state.selectedTab === tab) {
//         return {
//             min: dataItem[`filter_${minField}_amount`] || '',
//             max: dataItem[`filter_${maxField}_amount`] || '',
//         };
//     }
//     return {};
// }

// function getCheckboxData(state, dataItem, field, tab = '') {
//     if (!tab || state.selectedTab === tab) {
//         return {
//             id: dataItem[field]?.[0]?.id !== undefined ? tempCheckboxData(field, dataItem) : [],
//             value: dataItem[field]?.[0]?.id !== undefined ? tempCheckboxData(field, dataItem, 'value') : [],
//         };
//     }
//     return {};
// }

// function updateFilterData(state, dataKey, newData) {
//     state.allFilterData[dataKey] = newData;
// }

// // function setFilterData(state, key, value) {
// //     state.allFilterData[key] = value;
// // }

// function isObjectForCheckbox(value) {
//     if (typeof value === 'object' && value !== null) {
//         if ('id' in value && Array.isArray(value.id) && value.id.length > 0) {
//             return true;
//         }
//     }
//     return false;
// }
// function isObjectForRadio(value) {
//     if (typeof value === 'object' && value !== null) {
//         if ('id' in value && !Array.isArray(value.id) && value.id) {
//             return true;
//         }
//     }
//     return false;
// }
// function isObjectForMinMax(value) {
//     if (typeof value === 'object' && value !== null) {
//         if ('min' in value && value.min != '') {
//             return true;
//         }
//     }
//     return false;
// }
// interface FormattedDataItem {
//     [key: string]: any; // This allows for any string key with any value
//     type: string; // This is a fixed property with a string value
// }
// function formatFilterData(data: any) {
//     const formattedData: FormattedDataItem[] = [];
//     for (const key in data) {
//         if (key != 'id' && key != 'name' && key != 'is_pinned') {
//             if (key.length > 0 && typeof data[key] === 'string' && data[key]) {
//                 formattedData.push({
//                     type: 'search',
//                     [key]: data[key],
//                 });
//             } else if (isobjectLabel(data[key])) {
//                 formattedData.push({
//                     type: 'dateRange',
//                     [key]: data[key],
//                 });
//             } else if (isObjectForMinMax(data[key])) {
//                 formattedData.push({
//                     type: 'minMax',
//                     [key]: data[key],
//                 });
//             } else if (isObjectForCheckbox(data[key])) {
//                 formattedData.push({
//                     type: 'multiSelect',
//                     [key]: data[key],
//                 });
//             } else if (isObjectForRadio(data[key])) {
//                 formattedData.push({
//                     type: 'multiSelect',
//                     [key]: data[key],
//                 });
//             }
//         }
//     }
//     return formattedData;
// }
