// 730
import { subDays, format, startOfMonth, subMonths } from 'date-fns';
import { isobjectLabel, isObject, updateFilterData, isObjectForCheckbox, isObjectForRadio, isObjectForMinMax, formatFilterData, findTypeIndex } from '../../../commonStoreFuncs.ts';
import { UPDATECODDETAILS } from './constants.ts';
import { dataTableVariables as dataVariables } from '../../../../components/itl-dataTable-files/itl-dataTable/commonVariable.js';

const createMutations = () => ({
    // For datatable action modals
    [UPDATECODDETAILS.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [UPDATECODDETAILS.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [UPDATECODDETAILS.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply

    [UPDATECODDETAILS.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
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
    [UPDATECODDETAILS.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
    [UPDATECODDETAILS.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            vendor_name: {
                id: [],
                value: [],
            },
            awb_no_logistics: '',
            cod_amount_requested_date: {
                id: '',
                value: '',
                label: '',
            },
            old_order_amount: '',
            revised_order_amount: '',
            order_update_action_username: '',
        };

        const startDate = subDays(new Date(), 29);
        const endDate = new Date();
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        const dateKey = dataVariables.value.syncDateName;
        console.log(state.allFilterData);
        state.allFilterData[dateKey].value = `${formattedStartDate} ${formattedEndDate}`;
        state.allFilterData[dateKey].id = 'last_30_days';
    },

    // For datatable data export
    [UPDATECODDETAILS.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [UPDATECODDETAILS.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [UPDATECODDETAILS.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [UPDATECODDETAILS.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = Object.keys(payload)[0];
        state.allFilterData[dateKey].value = payload[dateKey].date;
        state.allFilterData[dateKey].id = payload[dateKey].selectedLabel;
    },

    // For global search
    [UPDATECODDETAILS.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search = payload;
    },

    // For datatable vendor data
    [UPDATECODDETAILS.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [UPDATECODDETAILS.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [UPDATECODDETAILS.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [UPDATECODDETAILS.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [UPDATECODDETAILS.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
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
    [UPDATECODDETAILS.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [UPDATECODDETAILS.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [UPDATECODDETAILS.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [UPDATECODDETAILS.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [UPDATECODDETAILS.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },

    // For Export selected rows data
    [UPDATECODDETAILS.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // For product/order_product_quantity details modal data
    [UPDATECODDETAILS.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
        state.productDetails = payload;
    },

    // For get Save filter Data
    [UPDATECODDETAILS.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
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
                awb_no_logistics: '',
                cod_amount_requested_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                old_order_amount: '',
                revised_order_amount: '',
                order_update_action_username: '',
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

            tempFilterObject = { ...state.allFilterData };
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

    [UPDATECODDETAILS.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    [UPDATECODDETAILS.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For widget Title
    // [UPDATECODDETAILS.MUTATIONS.SETWIDGETTITLEDATA](state: any, payload: any) {
    //     state.widgetTitleData = payload;
    // },
    // For widget Value
    // [UPDATECODDETAILS.MUTATIONS.SETWIDGETVALUEDATA](state: any, payload: any) {
    //     state.widgetValueData = payload;
    // },

    // For datatbale delete savefilter
    [UPDATECODDETAILS.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [UPDATECODDETAILS.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    // [UPDATECODDETAILS.MUTATIONS.SETRAISEMODALDATA](state: any, payload: any) {
    //     state.getRaiseModalData = payload;
    // },
    // [UPDATECODDETAILS.MUTATIONS.SETSKELETON](state: any, payload: any) {
    //     state.isSkeleton = payload;
    // },
    // [UPDATECODDETAILS.MUTATIONS.SETEDITDISCREPANCYDATA](state: any, payload: any) {
    //     state.editVendorSubmitData = payload;
    // },
    // [UPDATECODDETAILS.MUTATIONS.SETIMAGEUPLOAD](state: any, payload: any) {
    //     state.imageUploadData = payload;
    // },
    // [UPDATECODDETAILS.MUTATIONS.SETRISEDISCREPANCYDATA](state: any, payload: any) {
    //     state.raiseVendorSubmitData = payload;
    // },
    // [UPDATECODDETAILS.MUTATIONS.SETREJECTMODALDATA](state: any, payload: any) {
    //     state.rejectModalVal = payload;
    // },
    // [UPDATECODDETAILS.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
    //     state.viewDetailsData = payload;
    // },
    // [UPDATECODDETAILS.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
    //     state.storeDropdown = payload.data;
    // },
});
export default createMutations;

// Helper method to check if a value is an object
