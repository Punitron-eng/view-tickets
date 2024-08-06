// 730
import { subDays, format, startOfMonth, subMonths } from 'date-fns';
import { PINCODE } from './constants';
import { setApplySaveFilterData, setFilterValue, setViewSaveFilterData } from '../../../commonStoreFuncs';
// import {dataTableVariables as dataVariables} from '../../../../components/itl-dataTable-files/itl-dataTable/commonVariable.js'

const createMutations = () => ({
    // For datatable action modals
    [PINCODE.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [PINCODE.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [PINCODE.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply

    [PINCODE.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [PINCODE.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
                // if (key === dataVariables.value.syncDateName) {
                //     const startDate = subDays(new Date(), 29);
                //     const endDate = new Date();
                //     const formattedStartDate = format(startDate, 'yyyy-MM-dd');
                //     const formattedEndDate = format(endDate, 'yyyy-MM-dd');
                //     tempFilterData[key].value = `${formattedStartDate} ${formattedEndDate}`;
                //     tempFilterData[key].id = 'last_30_days';
                // }
            }
        } else {
            tempFilterData[key] = '';
        }

        state.allFilterData = { ...tempFilterData };
    },

    // For datatable clear all filters
    [PINCODE.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            search: '',
            vendor_name: {
                id: [],
                value: [],
            },
            awb_no_logistics: {
                id: [],
                value: [],
            },
            pincode_pickup_available: {
                id: [],
                value: [],
            },
            pincode_cod_available: {
                id: [],
                value: [],
            },
            pincode_prepaid_available: {
                id: [],
                value: [],
            },
            pincode_status: {
                id: [],
                value: [],
            },
            pincode: '',
            pincode_hub_name: '',
            pincode_area: '',
            pincode_state: '',
            pincode_city: '',
            paginatorStart: 0,
            paginatorLast: 10,
        };
    },

    // For datatable data export
    [PINCODE.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [PINCODE.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [PINCODE.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    // [PINCODE.MUTATIONS.SETDATERANGE](state, payload) {
    //     console.log(payload);
    //     const dateKey = dataVariables.value.syncDateName;
    //     state.allFilterData[dateKey].value = payload[dateKey].date;
    //     state.allFilterData[dateKey].id = payload[dateKey].selectedLabel;
    // },

    // For global search
    [PINCODE.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search = payload;
    },

    // For datatable vendor data
    [PINCODE.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [PINCODE.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [PINCODE.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [PINCODE.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [PINCODE.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [PINCODE.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [PINCODE.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [PINCODE.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [PINCODE.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [PINCODE.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },

    // For Export selected rows data
    [PINCODE.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // For product/items details modal data
    [PINCODE.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
        state.productDetails = payload;
    },

    // For get Save filter Data
    [PINCODE.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }
        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                vendor_name: {
                    id: [],
                    value: [],
                },
                awb_no_logistics: {
                    id: [],
                    value: [],
                },
                pincode_pickup_available: {
                    id: [],
                    value: [],
                },
                pincode_cod_available: {
                    id: [],
                    value: [],
                },
                pincode_prepaid_available: {
                    id: [],
                    value: [],
                },
                pincode_status: {
                    id: [],
                    value: [],
                },
                pincode: '',
                pincode_hub_name: '',
                pincode_area: '',
                pincode_state: '',
                pincode_city: '',
                paginatorStart: 0,
                paginatorLast: 10,
                search: '',
            };
            setViewSaveFilterData(state, item, tempFilterObject, index, payload);
        });
    },

    // For reset save filter data
    [PINCODE.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    [PINCODE.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        const checkFilter = (key: string, subKey: string) => {
            if (subKey !== '') {
                return data.newFilter || data.updatedFrom ? state.allFilterData[key][subKey] || '' : payload?.[key]?.[subKey] || '';
            } else {
                return data.newFilter ? state.allFilterData[key] || '' : payload?.[key] || '';
            }
        };
        const allFilterData = {
            vendor_name: {
                id: [],
                value: [],
            },
            awb_no_logistics: {
                id: [],
                value: [],
            },
            pincode_pickup_available: {
                id: [],
                value: [],
            },
            pincode_cod_available: {
                id: [],
                value: [],
            },
            pincode_prepaid_available: {
                id: [],
                value: [],
            },
            pincode_status: {
                id: [],
                value: [],
            },
            pincode: '',
            pincode_hub_name: '',
            pincode_area: '',
            pincode_state: '',
            pincode_city: '',
            paginatorStart: 0,
            paginatorLast: 10,
            search: '',
        };
        for (const key in allFilterData) {
            switch (key) {
                case 'paginatorStart':
                case 'search':
                case 'pincode':
                case 'hub_name':
                case 'area_code':
                case 'state':
                    allFilterData[key] = checkFilter(key, '');
                    break;

                case 'vendor_name':
                case 'logistics':
                    allFilterData[key] = checkFilter(key, 'id');
                    break;
            }
        }
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
        state.tempAllFilterData = allFilterData;
    },
    // For widget Title
    // [PINCODE.MUTATIONS.SETWIDGETTITLEDATA](state: any, payload: any) {
    //     state.widgetTitleData = payload;
    // },
    // For widget Value
    // [PINCODE.MUTATIONS.SETWIDGETVALUEDATA](state: any, payload: any) {
    //     state.widgetValueData = payload;
    // },

    // For datatbale delete savefilter
    [PINCODE.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [PINCODE.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        state.allFilterData.vendor_name.id = [];
        state.allFilterData.vendor_name.value = [];
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    [PINCODE.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
        state.storeId = payload.data?.[0]?.id || '';
        state.storeDropdown = payload.data;
    },
    [PINCODE.MUTATIONS.SETSTOREID](state: any, payload: any) {
        state.storeId = payload;
    },
    [PINCODE.MUTATIONS.SETABANDONEDMODALDATA](state: any, payload: any) {
        state.abandonedModalData = payload;
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

function getSelectedTabData(state, dataItem, field, tab = '') {
    if (tab && state.selectedTab === tab) {
        return {
            id: dataItem[`${field}_label`] || '',
            value: dataItem[field] || '',
            label: dataItem[`${field}_label`] || '',
        };
    }
    return {};
}

function getAmountData(state, dataItem, minField, maxField, tab = '') {
    if (!tab || state.selectedTab === tab) {
        return {
            min: dataItem[`filter_${minField}_amount`] || '',
            max: dataItem[`filter_${maxField}_amount`] || '',
        };
    }
    return {};
}

function getCheckboxData(state, dataItem, field, tab = '') {
    if (!tab || state.selectedTab === tab) {
        return {
            id: dataItem[field]?.[0]?.id !== undefined ? tempCheckboxData(field, dataItem) : [],
            value: dataItem[field]?.[0]?.id !== undefined ? tempCheckboxData(field, dataItem, 'value') : [],
        };
    }
    return {};
}

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
interface FormattedDataItem {
    [key: string]: any; // This allows for any string key with any value
    type: string; // This is a fixed property with a string value
}
function formatFilterData(data: any) {
    const formattedData: FormattedDataItem[] = [];
    for (const key in data) {
        if (key != 'id' && key != 'name' && key != 'is_pinned') {
            if (key.length > 0 && typeof data[key] === 'string' && data[key]) {
                formattedData.push({
                    type: 'search',
                    [key]: data[key],
                });
            } else if (isobjectLabel(data[key])) {
                formattedData.push({
                    type: 'dateRange',
                    [key]: data[key],
                });
            } else if (isObjectForMinMax(data[key])) {
                formattedData.push({
                    type: 'minMax',
                    [key]: data[key],
                });
            } else if (isObjectForCheckbox(data[key])) {
                formattedData.push({
                    type: 'multiSelect',
                    [key]: data[key],
                });
            } else if (isObjectForRadio(data[key])) {
                formattedData.push({
                    type: 'multiSelect',
                    [key]: data[key],
                });
            }
        }
    }
    return formattedData;
}
