// 730
import { subDays, format, startOfMonth, subMonths } from 'date-fns';
import { STAFFACCOUNT } from './constants';
import { dataTableVariables as dataVariables } from '../../../../components/itl-dataTable-files/itl-dataTable/commonVariable.js';

const createMutations = () => ({
    ///////// datatable common mutation start //////////////////////

    // For reset datatable data
    [STAFFACCOUNT.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },
    // For datatable data
    [STAFFACCOUNT.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For datatable filter apply
    [STAFFACCOUNT.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
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
    [STAFFACCOUNT.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
            }
        } else {
            tempFilterData[key] = '';
        }

        state.allFilterData = { ...tempFilterData };
    },

    // For datatable clear all filters
    [STAFFACCOUNT.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            paginatorStart: 0,
            paginatorLast: 10,
            vendor_name: {
                id: [],
                value: [],
            },
            user_name: '',
            user_email: '',
            user_mobile: '',
            user_status: {
                id: [],
                value: [],
            },
        };
    },

    // For datatable start page count
    [STAFFACCOUNT.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [STAFFACCOUNT.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For datatable vendor data
    [STAFFACCOUNT.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [STAFFACCOUNT.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [STAFFACCOUNT.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [STAFFACCOUNT.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [STAFFACCOUNT.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        const response = selectedData.filterArr;
        response.forEach((payload) => {
            const dataKey = Object.keys(payload)[0];
            const temp = { id: [], value: [], label: '' };
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
    [STAFFACCOUNT.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For reset vendor data
    [STAFFACCOUNT.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [STAFFACCOUNT.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [STAFFACCOUNT.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },
    // For get Save filter Data
    [STAFFACCOUNT.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];
        let tempFilterObject = {
            paginatorStart: 0,
            paginatorLast: 10,
            vendor_name: {
                id: [],
                value: [],
            },
            user_name: '',
            user_email: '',
            user_mobile: '',
            user_status: {
                id: [],
                value: [],
            },
        };

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }
        newDataTableFilterPayload.forEach((item, index) => {
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

            tempFilterObject = { ...state.allFilterData };
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
    [STAFFACCOUNT.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    [STAFFACCOUNT.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [STAFFACCOUNT.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [STAFFACCOUNT.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        state.allFilterData.vendor_name.id = [];
        state.allFilterData.vendor_name.value = [];
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
