// 730
import { subDays, format, startOfMonth, subMonths } from 'date-fns';
import { STOREORDER } from './constants';
import { setApplySaveFilterData, setFilterValue, setViewSaveFilterData, formatFilterData } from '../../commonStoreFuncs.ts';
import { dataTableVariables as commonVariable } from '../../../components/itl-dataTable-files/itl-dataTable/commonVariable';

const createMutations = () => ({
    // For datatable action modals
    [STOREORDER.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [STOREORDER.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },
    // For datatable data count
    [STOREORDER.MUTATIONS.SETDATATABLEAPIDATACOUNT](state: any, payload: any) {
        state.count = payload;
    },

    // For reset datatable data
    [STOREORDER.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply
    [STOREORDER.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [STOREORDER.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
    [STOREORDER.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            order_product_quantity: '',
            order_id: '',
            order_amount: '',
            order_customer_name: '',
            order_customer_mobile: '',
            order_customer_email: '',
            order_date: {
                id: '',
                value: '',
                label: '',
            },
            order_type: {
                id: [],
                value: [],
            },
            paginatorStart: 0,
            paginatorLast: 10,
            search_order_id: '',
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
    [STOREORDER.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [STOREORDER.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [STOREORDER.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [STOREORDER.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = 'order_date';
        state.allFilterData[dateKey].value = payload.date;
        state.allFilterData[dateKey].id = payload.selectedLabel;
    },

    // For global search
    [STOREORDER.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        console.log(payload, 'inside the mutation');

        state.allFilterData[commonVariable.value.dtGlobalSearchId] = payload;
    },

    // For datatable vendor data
    [STOREORDER.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [STOREORDER.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [STOREORDER.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [STOREORDER.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [STOREORDER.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [STOREORDER.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [STOREORDER.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [STOREORDER.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [STOREORDER.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [STOREORDER.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },
    // For get Save filter Data
    [STOREORDER.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }

        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                order_product_quantity: '',
                order_id: '',
                order_amount: '',
                order_customer_name: '',
                order_customer_mobile: '',
                order_customer_email: '',
                order_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_type: {
                    id: [],
                    value: [],
                },
                paginatorStart: 0,
                paginatorLast: 10,
                search_order_id: '',
                vendor_name: {
                    id: [],
                    value: [],
                },
            };
            setViewSaveFilterData(state, item, tempFilterObject, index, payload);
        });
    },

    // For reset save filter data
    [STOREORDER.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    // For Update datatable saveFilter data
    [STOREORDER.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [STOREORDER.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [STOREORDER.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        state.allFilterData.vendor_name.id = [];
        state.allFilterData.vendor_name.value = [];
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    // For Export selected rows data
    [STOREORDER.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // ---------------------------------------------------------------------- DATA TABLE MUTATION ABOVE -------------------------------------------------------------

    // For product/order_product_quantity details modal data
    [STOREORDER.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
        state.productDetails = payload;
    },
    [STOREORDER.MUTATIONS.SETWIDGETTITLEDATA](state: any, payload: any) {
        state.widgetTitleData = payload.all_widgets_data_array;
    },
    [STOREORDER.MUTATIONS.SETWIDGETVALUEDATA](state: any, payload: any) {
        state.widgetValueData = payload.all_widgets_data_array;
    },
    [STOREORDER.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
        state.storeId = payload.data?.[0]?.id || '';
        state.storeDropdown = payload;
    },
    [STOREORDER.MUTATIONS.SETSTOREID](state: any, payload: any) {
        state.storeId = payload;
    },
    [STOREORDER.MUTATIONS.SETSTOREMODALDATA](state: any, payload: any) {
        state.storeModalData = payload;
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