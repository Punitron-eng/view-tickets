// 730
import { subDays, format, startOfMonth, subMonths } from 'date-fns';
import { isobjectLabel, isObject, updateFilterData, isObjectForCheckbox, isObjectForRadio, isObjectForMinMax, formatFilterData, findTypeIndex } from '../../commonStoreFuncs.ts';
import { PRODUCTCATALOGUE } from './constants';
import { dataTableVariables as commonVariable } from '../../../components/itl-dataTable-files/itl-dataTable/commonVariable.js';

const createMutations = () => ({
    // For datatable action modals
    [PRODUCTCATALOGUE.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [PRODUCTCATALOGUE.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For datatable data count
    [PRODUCTCATALOGUE.MUTATIONS.SETDATATABLEAPIDATACOUNT](state: any, payload: any) {
        state.count = payload;
    },

    // For reset datatable data
    [PRODUCTCATALOGUE.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply

    [PRODUCTCATALOGUE.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
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
    [PRODUCTCATALOGUE.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
                if (key === 'product_last_updated_date') {
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
    [PRODUCTCATALOGUE.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            platform_name: state.allFilterData.platform_name,
            store: state.allFilterData.store,
            product_name: '',
            product_sku: '',
            vendor_name: {
                id: [],
                value: [],
            },
            product_last_updated_date: {
                id: '',
                value: '',
                label: '',
            },
            paginatorStart: 0,
            paginatorLast: 10,
        };

        const startDate = subDays(new Date(), 29);
        const endDate = new Date();
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        const dateKey = 'product_last_updated_date';

        state.allFilterData[dateKey].value = `${formattedStartDate} ${formattedEndDate}`;
        state.allFilterData[dateKey].id = 'last_30_days';
    },

    // For datatable data export
    [PRODUCTCATALOGUE.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [PRODUCTCATALOGUE.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [PRODUCTCATALOGUE.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [PRODUCTCATALOGUE.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = 'product_last_updated_date';
        state.allFilterData[dateKey].value = payload.date;
        state.allFilterData[dateKey].id = payload.selectedLabel;
    },

    // For global search
    [PRODUCTCATALOGUE.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData[commonVariable.value.dtGlobalSearchId] = payload;
    },

    // For datatable vendor data
    [PRODUCTCATALOGUE.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [PRODUCTCATALOGUE.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [PRODUCTCATALOGUE.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [PRODUCTCATALOGUE.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [PRODUCTCATALOGUE.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
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

    // For datatable apply selected save filter
    // [PRODUCTCATALOGUE.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state) {
    //     state.viewSaveFilteredData = [];
    //     let tempFilterObject = state.allFilterData;
    //     const response = tempFilterArray;
    //     response.forEach((item) => {

    //         item.filterArray.forEach((payload) => {
    //             const dataKey = Object.keys(payload)[1];
    //             const temp = { id: [], value: [], label: '' };
    //             switch (payload.type) {
    //                 case 'dateRange':
    //                     temp.id = payload[dataKey].id;
    //                     temp.value = payload[dataKey].value;
    //                     temp.label = payload[dataKey].id;
    //                     tempFilterObject = { ...tempFilterObject, [dataKey]: { ...temp } };
    //                     break;
    //                 case 'multiSelect':
    //                 case 'vendorModal':
    //                     temp.id = payload[dataKey].id;
    //                     temp.value = payload[dataKey].value;
    //                     tempFilterObject = { ...tempFilterObject, [dataKey]: { ...temp } };
    //                     break;
    //                 case 'search':
    //                 case 'radio':
    //                 case 'minMax':
    //                 case 'dropdownRadio':
    //                     tempFilterObject[dataKey] = payload[dataKey];
    //                     tempFilterObject = { ...tempFilterObject };
    //                     break;
    //             }
    //         });
    //         tempFilterObject.name = item.name;
    //         tempFilterObject.id = item.id;
    //         tempFilterObject.is_pinned = item.is_pinned;
    //         state.viewSaveFilteredData.push(tempFilterObject);
    //         console.log('state.viewSaveFilteredData =>', state.viewSaveFilteredData);
    //         state.viewSaveFilteredData = state.viewSaveFilteredData.map((item) => {
    //             const filteredItem = {};
    //             if (item) {
    //                 for (const key in item) {
    //                     const value = item[key];
    //                     if ((value.length >= 0 && typeof value === 'string') || isObject(value) || isobjectLabel(value) || key === 'id' || key === 'is_pinned') {
    //                         filteredItem[key] = value;
    //                     }
    //                 }
    //             }

    //             return filteredItem;
    //         });
    //     });
    // },

    // For Update datatable saveFilter data
    [PRODUCTCATALOGUE.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [PRODUCTCATALOGUE.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [PRODUCTCATALOGUE.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [PRODUCTCATALOGUE.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [PRODUCTCATALOGUE.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },

    // For Export selected rows data
    [PRODUCTCATALOGUE.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // For product/items details modal data
    [PRODUCTCATALOGUE.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
        state.productDetails = payload;
    },

    // For get Save filter Data
    [PRODUCTCATALOGUE.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }
        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                // platform_name: {
                //     id: [],
                //     value: [],
                // },
                // store: {
                //     id: [],
                //     value: [],
                // },
                product_name: '',
                product_sku: '',
                vendor_name: {
                    id: [],
                    value: [],
                },
                product_last_updated_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                paginatorStart: 0,
                paginatorLast: 10,
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
            tempFilterObject.name = payload.data[index].filter_name;
            tempFilterObject.id = payload.data[index].id;
            tempFilterObject.is_pinned = payload.data[index].is_pinned;
            state.viewSaveFilteredData.push(tempFilterObject);

            state.viewSaveFilteredData = state.viewSaveFilteredData.map((item) => {
                const filteredItem = {};
                if (item) {
                    for (const key in item) {
                        if (key != 'platform_name' && key != 'store') {
                            const value = item[key];
                            if ((value.length >= 0 && typeof value === 'string') || isObject(value) || isobjectLabel(value) || isObjectForMinMax(value) || key === 'id' || key === 'is_pinned') {
                                filteredItem[key] = value;
                            }
                        }
                    }
                }

                return filteredItem;
            });
        });
    },

    // [PRODUCTCATALOGUE.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state, payload) {
    //     state.viewSaveFilteredData = (payload.data || []).map((dataItem) => {
    //         const item = {
    //             name: dataItem.filter_name,
    //             is_pinned: dataItem.is_pinned,
    //             id: dataItem.id,
    //             customer: dataItem.filter_customer_details || '',
    //             order_id: dataItem.filter_order_id || '',
    //             items: dataItem.filter_product_qty || '',
    //             product_last_updated_date: {
    //                 id: dataItem.filter_product_last_updated_date_label || '',
    //                 value: dataItem.filter_product_last_updated_date || '',
    //                 label: dataItem.filter_product_last_updated_date_label || '',
    //             },
    //             requested_date: getSelectedTabData(state, dataItem, 'filter_requested_date', 'rev_return_request'),
    //             rejected_date: getSelectedTabData(state, dataItem, 'filter_rejected_date', 'rev_return_request'),
    //             amount: getAmountData(state, dataItem, 'min', 'max', 'rev_return_request'),
    //             refund_amount: getAmountData(state, dataItem, 'min', 'max', 'rev_return_request'),
    //             dt_status: getCheckboxData(state, dataItem, 'filter_status', 'rev_return_request'),
    //             payment: getCheckboxData(state, dataItem, 'filter_payment'),
    //             return_reason: getCheckboxData(state, dataItem, 'filter_return_reason', 'rev_return_request'),
    //             origin_warehouse: getCheckboxData(state, dataItem, 'filter_origin_warehouse', 'rev_return_request'),
    //             awb_no: getCheckboxData(state, dataItem, 'filter_shipping'),
    //             vendor_name: getCheckboxData(state, dataItem, 'filter_vendor_array'),
    //             delivery_warehouse: getCheckboxData(state, dataItem, 'filter_delivery_warehouse'),
    //             search: dataItem.filter_search_order_awb || '',
    //             vendorData: [],
    //             requested_rejected: '',
    //         };

    //         return Object.fromEntries(Object.entries(item).filter(([key, value]) => value && (Array.isArray(value) ? value.length > 0 : typeof value === 'string')));
    //     });
    // },

    // For reset save filter data
    [PRODUCTCATALOGUE.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    // For Update datatable saveFilter data
    // [PRODUCTCATALOGUE.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
    //     console.log('data =>', data);
    //     const payload = data.tempData;
    //     console.log(payload, 'this si the payload ', data);
    //     console.log(state.allFilterData, 'this si the payload ');
    //     const checkFilter = (key: any, key2: any) => {
    //         debugger;
    //         return key2 != '' ? (data.newFilter || data.updatedFrom ? state.allFilterData[key][key2] : payload?.[key]?.[key2] || '') : data.newFilter ? state.allFilterData[key] : payload?.[key] || '';
    //     };
    //     const allFilterData = {
    //         order_id: checkFilter('order_id', ''),
    //         discrepancy_date: checkFilter('discrepancy_date', 'value'),
    //         discrepancyDateLabel: checkFilter('discrepancy_date', 'id'),
    //         dispute_date: checkFilter('dispute_date', 'value'),
    //         disputedDateLabel: checkFilter('dispute_date', 'id'),
    //         awb_no: checkFilter('awb_no', 'id'),
    //         status: checkFilter('dt_status', 'id'),
    //         amount: checkFilter('amount', ''),
    //         items: payload?.items === '>5' ? '6' : checkFilter('items', ''),
    //         paginatorStart: checkFilter('paginatorStart', ''),
    //         search: checkFilter('search', ''),
    //         vendor_name: checkFilter('vendor_name', 'id'),
    //     };
    //     state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    //     state.tempAllFilterData = allFilterData;
    // },

    [PRODUCTCATALOGUE.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [PRODUCTCATALOGUE.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [PRODUCTCATALOGUE.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        state.allFilterData.vendor_name.id = [];
        state.allFilterData.vendor_name.value = [];
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },

    [PRODUCTCATALOGUE.MUTATIONS.SETCHANNELVALUE](state: any, payload: any) {
        state.platform_name = payload;
    },
    [PRODUCTCATALOGUE.MUTATIONS.SETSTOREVALUE](state: any, payload: any) {
        state.store = payload;
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
