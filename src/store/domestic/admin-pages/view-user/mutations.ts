// 730
import { subDays, format } from 'date-fns';
import { ADMINVIEWUSER } from './constants';
import { dataTableVariables as dataVariables } from '../../../../components/itl-dataTable-files/itl-dataTable/commonVariable.js';
import { formatFilterData, setApplySaveFilterData, setFilterValue, setViewSaveFilterData } from '../../../commonStoreFuncs.js';

const createMutations = () => ({
    // For datatable action modals
    [ADMINVIEWUSER.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [ADMINVIEWUSER.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [ADMINVIEWUSER.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply
    [ADMINVIEWUSER.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [ADMINVIEWUSER.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
    [ADMINVIEWUSER.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            vendor_code: '',
            user_company_name: '',
            user_email: '',
            user_mobile: '',
            total_user_credit_amount: '',
            total_user_wallet_amount: '',
            user_created_date: {
                id: '',
                value: '',
                label: '',
            },
            user_last_login_date: {
                id: '',
                value: '',
                label: '',
            },
            user_type: {
                id: [],
                value: [],
            },
            user_enabled: {
                id: [],
                value: [],
            },
            delivery_type: {
                id: [],
                value: [],
            },
            user_status: {
                id: [],
                value: [],
            },
            paginatorStart: 0,
            paginatorLast: 10,
            vendor_name: {
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
    [ADMINVIEWUSER.MUTATIONS.SETDTEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [ADMINVIEWUSER.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [ADMINVIEWUSER.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [ADMINVIEWUSER.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = 'user_created_date';
        state.allFilterData[dateKey].value = payload.date;
        state.allFilterData[dateKey].id = payload.selectedLabel;
    },

    // For global search
    [ADMINVIEWUSER.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search = payload;
    },

    // For datatable vendor data
    [ADMINVIEWUSER.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [ADMINVIEWUSER.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [ADMINVIEWUSER.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [ADMINVIEWUSER.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [ADMINVIEWUSER.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [ADMINVIEWUSER.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [ADMINVIEWUSER.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [ADMINVIEWUSER.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [ADMINVIEWUSER.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [ADMINVIEWUSER.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },
    // For get Save filter Data
    [ADMINVIEWUSER.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
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
                total_user_credit_amount: '',
                total_user_wallet_amount: '',
                user_created_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                user_last_login_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                user_type: {
                    id: [],
                    value: [],
                },
                user_enabled: {
                    id: [],
                    value: [],
                },
                delivery_type: {
                    id: [],
                    value: [],
                },
                user_status: {
                    id: [],
                    value: [],
                },
                paginatorStart: 0,
                paginatorLast: 10,
                vendor_name: {
                    id: [],
                    value: [],
                },
            };
            setViewSaveFilterData(state, item, tempFilterObject, index, payload);
        });
    },

    // For reset save filter data
    [ADMINVIEWUSER.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    // For Update datatable saveFilter data
    [ADMINVIEWUSER.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [ADMINVIEWUSER.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [ADMINVIEWUSER.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    // For Export selected rows data
    [ADMINVIEWUSER.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // ---------------------------------------------------------------------- DATA TABLE MUTATION ABOVE -------------------------------------------------------------
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