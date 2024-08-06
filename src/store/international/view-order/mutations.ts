// 730
import { subDays, format } from 'date-fns';
import { VIEWORDERINTL } from './constants';
import { billingIntlVariable as dataVariables } from '../../../views/international/billing-intl/billingIntl.js';
import { formatFilterData, setApplySaveFilterData, setFilterValue, setViewSaveFilterData } from '../../commonStoreFuncs.js';

const createMutations = () => ({
    // For datatable action modals
    [VIEWORDERINTL.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [VIEWORDERINTL.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [VIEWORDERINTL.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply
    [VIEWORDERINTL.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [VIEWORDERINTL.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
    [VIEWORDERINTL.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            risk: {
                id: [],
                value: [],
            },
            tags: '',
            order_customer_details: '',
            pickup_address: '',
            order_product_quantity: '',
            order_id: '',
            order_amount: '',
            duplicate_order: '',
            order_date: {
                id: '',
                value: '',
                label: '',
            },
            order_pickup_date: {
                id: '',
                value: '',
                label: '',
            },
            return_delivered_date: {
                id: '',
                value: '',
                label: '',
            },
            return_initiate_date: {
                id: '',
                value: '',
                label: '',
            },
            order_delivered_date: {
                id: '',
                value: '',
                label: '',
            },
            order_last_update_date: {
                id: '',
                value: '',
                label: '',
            },
            order_type: {
                id: [],
                value: [],
            },
            tracking_status_intl: {
                id: [],
                value: [],
            },
            order_edd: {
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
            order_country: {
                id: [],
                value: [],
            },
            awb_no_logistics: {
                id: [],
                value: [],
            },
            pickup_cutoff: {
                id: [],
                value: [],
            },
            no_of_attempts: {
                id: [],
                value: [],
            },
            tracking_otp_cancelled: {
                id: [],
                value: [],
            },

            order_duties: {
                id: [],
                value: [],
            },
            order_fulfillment: {
                id: [],
                value: [],
            },
            buyer_intent: {
                id: [],
                value: [],
            },
            latest_courier_remark: {
                id: [],
                value: [],
            },
            order_weight: {
                id: [],
                value: [],
            },
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
    [VIEWORDERINTL.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [VIEWORDERINTL.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [VIEWORDERINTL.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [VIEWORDERINTL.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = Object.keys(payload)[0];
        state.allFilterData[dateKey].value = payload[dateKey].date;
        state.allFilterData[dateKey].id = payload[dateKey].selectedLabel;
    },

    // For global search
    [VIEWORDERINTL.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search = payload;
    },

    // For datatable vendor data
    [VIEWORDERINTL.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [VIEWORDERINTL.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [VIEWORDERINTL.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [VIEWORDERINTL.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [VIEWORDERINTL.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [VIEWORDERINTL.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [VIEWORDERINTL.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [VIEWORDERINTL.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [VIEWORDERINTL.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [VIEWORDERINTL.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },
    // For get Save filter Data
    [VIEWORDERINTL.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }
        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                risk: {
                    id: [],
                    value: [],
                },
                tags: '',
                order_customer_details: '',
                pickup_address: '',
                order_product_quantity: '',
                order_id: '',
                order_amount: '',
                duplicate_order: '',
                order_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                return_delivered_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                return_initiate_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_delivered_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_last_update_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_edd: {
                    id: '',
                    value: '',
                    label: '',
                },
                tracking_status_intl: {
                    id: [],
                    value: [],
                },
                order_type: {
                    id: [],
                    value: [],
                },
                order_country: {
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
                awb_no_logistics: {
                    id: [],
                    value: [],
                },
                pickup_cutoff: {
                    id: [],
                    value: [],
                },
                no_of_attempts: {
                    id: [],
                    value: [],
                },
                tracking_otp_cancelled: {
                    id: [],
                    value: [],
                },
                order_duties: {
                    id: [],
                    value: [],
                },
                order_fulfillment: {
                    id: [],
                    value: [],
                },
                buyer_intent: {
                    id: [],
                    value: [],
                },
                latest_courier_remark: {
                    id: [],
                    value: [],
                },
                order_weight: {
                    id: [],
                    value: [],
                },
            };
            setViewSaveFilterData(state, item, tempFilterObject, index, payload);
        });
    },

    // For reset save filter data
    [VIEWORDERINTL.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    // For Update datatable saveFilter data
    [VIEWORDERINTL.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [VIEWORDERINTL.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [VIEWORDERINTL.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        state.allFilterData.vendor_name.id = [];
        state.allFilterData.vendor_name.value = [];
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    // For Export selected rows data
    [VIEWORDERINTL.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // ---------------------------------------------------------------------- DATA TABLE MUTATION ABOVE -------------------------------------------------------------

    // For product/order_product_quantity details modal data
    [VIEWORDERINTL.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
        state.productDetails = payload;
    },
    // [VIEWORDERINTL.MUTATIONS.SETWIDGETTITLEDATA](state: any, payload: any) {
    //     state.widgetTitleData = payload.all_widgets_data_array;
    // },
    // [VIEWORDERINTL.MUTATIONS.SETWIDGETVALUEDATA](state: any, payload: any) {
    //     state.widgetValueData = payload.all_widgets_data_array;
    // },
    [VIEWORDERINTL.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
        state.storeDropdown = payload;
    },
    [VIEWORDERINTL.MUTATIONS.SETSTOREID](state: any, payload: any) {
        state.storeId = payload;
    },
    [VIEWORDERINTL.MUTATIONS.SETSTOREMODALDATA](state: any, payload: any) {
        state.storeModalData = payload;
    },
    [VIEWORDERINTL.MUTATIONS.CHANGEDTTAB](state: any, payload: any) {
        state.dtTabChangeParams = payload;
    },
    [VIEWORDERINTL.MUTATIONS.SETSELECTEDTABNAME](state: any, payload) {
        state.selectedTab = payload;
    },
});
export default createMutations;

// Helper method to check if a value is an object

const isobjectLabel = (value) => {
    if (typeof value === 'object' && value !== null) {
        if ('label' in value && value.label.length > 0 && value != undefined) {
            return true;
        }
    }
};
function isObject(value) {
    if (typeof value === 'object' && value !== null) {
        if ('id' in value && Array.isArray(value.id) && value.id.length > 0) {
            return true;
        } else if ('min' in value && typeof value.min === 'string' && value.min.length > 0) {
            return true;
        }
    }

    return false;
}

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

// function tempCheckboxData(field, dataItem, valueType = 'id') {
//     const tempData = dataItem[field];
//     const status = [];
//     for (const key in tempData) {
//         if (tempData[key].id !== '') {
//             status.push(tempData[key][valueType]);
//         }
//     }
//     return status;
// }

function updateFilterData(state, dataKey, newData) {
    state.allFilterData[dataKey] = newData;
}

// function setFilterData(state, key, value) {
//     state.allFilterData[key] = value;
// }
function isObjectForCheckbox(value) {
    if (typeof value === 'object' && value !== null) {
        if ('id' in value && Array.isArray(value.id) && value.id.length > 0) {
            return true;
        }
    }
    return false;
}
function isObjectForRadio(value) {
    if (typeof value === 'object' && value !== null) {
        if ('id' in value && !Array.isArray(value.id) && value.id) {
            return true;
        }
    }
    return false;
}
function isObjectForMinMax(value) {
    if (typeof value === 'object' && value !== null) {
        if ('min' in value && value.min != '') {
            return true;
        }
    }
    return false;
}