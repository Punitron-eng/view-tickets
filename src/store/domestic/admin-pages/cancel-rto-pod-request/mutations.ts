// 730
import { subDays, format } from 'date-fns';
import { formatFilterData, setFilterValue, setApplySaveFilterData, setViewSaveFilterData } from '../../../commonStoreFuncs.ts';
import { CANCELRTOPODREQ } from './constants';
import { dataTableVariables as dataVariables } from '../../../../components/itl-dataTable-files/itl-dataTable/commonVariable.js';

const createMutations = () => ({
    // For datatable action modals
    [CANCELRTOPODREQ.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [CANCELRTOPODREQ.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [CANCELRTOPODREQ.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply
    [CANCELRTOPODREQ.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [CANCELRTOPODREQ.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
    [CANCELRTOPODREQ.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            vendor_name: {
                id: [],
                value: [],
            },
            order_cancel_status: {
                id: [],
                value: [],
            },
            order_id: '',
            order_product_quantity: '', // items
            order_customer_details: '',
            order_date: {
                id: '',
                value: '',
                label: '',
            },
            order_cancel_request_date: {
                id: '',
                value: '',
                label: '',
            },
            order_rto_request_date: {
                id: '',
                value: '',
                label: '',
            },
            order_pod_request_date: {
                id: '',
                value: '',
                label: '',
            },
            order_amount: '',
            order_type: {
                // payment
                id: [],
                value: [],
            },
            awb_no_logistics: {
                id: [],
                value: [],
            },
            order_cancel_request_status: {
                id: [],
                value: [],
            },
            order_rto_request_status: {
                id: [],
                value: [],
            },
            order_pod_request_status: {
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
    [CANCELRTOPODREQ.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [CANCELRTOPODREQ.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [CANCELRTOPODREQ.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [CANCELRTOPODREQ.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = Object.keys(payload)[0];
        state.allFilterData[dateKey].value = payload[dateKey].date;
        state.allFilterData[dateKey].id = payload[dateKey].selectedLabel;
    },

    // For global search
    [CANCELRTOPODREQ.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search = payload;
    },

    // For datatable vendor data
    [CANCELRTOPODREQ.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [CANCELRTOPODREQ.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [CANCELRTOPODREQ.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [CANCELRTOPODREQ.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [CANCELRTOPODREQ.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [CANCELRTOPODREQ.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [CANCELRTOPODREQ.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [CANCELRTOPODREQ.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [CANCELRTOPODREQ.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [CANCELRTOPODREQ.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },

    [CANCELRTOPODREQ.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
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
                order_cancel_status: {
                    id: [],
                    value: [],
                },
                order_id: '',
                order_product_quantity: '', // items
                order_customer_details: '',
                order_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_cancel_request_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_rto_request_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_pod_request_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_amount: '',
                order_type: {
                    // payment
                    id: [],
                    value: [],
                },
                awb_no_logistics: {
                    id: [],
                    value: [],
                },
                order_cancel_request_status: {
                    id: [],
                    value: [],
                },
                order_rto_request_status: {
                    id: [],
                    value: [],
                },
                order_pod_request_status: {
                    id: [],
                    value: [],
                },
                paginatorStart: 0,
                paginatorLast: 10,
                search: '',
            };
            setViewSaveFilterData(state, item, tempFilterObject, index, payload);
        });
    },

    // For reset save filter data
    [CANCELRTOPODREQ.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    // For Update datatable saveFilter data
    [CANCELRTOPODREQ.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [CANCELRTOPODREQ.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [CANCELRTOPODREQ.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    // For Export selected rows data
    // [CANCELRTOPODREQ.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
    //     state.selectedCheckbox = payload;
    // },

    // ---------------------------------------------------------------------- DATA TABLE MUTATION ABOVE -------------------------------------------------------------

    // For product/items details modal data
    // [CANCELRTOPODREQ.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
    //     state.productDetails = payload;
    // },
    // [CANCELRTOPODREQ.MUTATIONS.SETWIDGETTITLEDATA](state: any, payload: any) {
    //     state.widgetTitleData = payload.all_widgets_data_array;
    // },
    // [CANCELRTOPODREQ.MUTATIONS.SETWIDGETVALUEDATA](state: any, payload: any) {
    //     state.widgetValueData = payload.all_widgets_data_array;
    // },
    // [CANCELRTOPODREQ.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
    //     state.storeDropdown = payload;
    // },
    // [CANCELRTOPODREQ.MUTATIONS.SETSTOREID](state: any, payload: any) {
    //     state.storeId = payload;
    // },
    // [CANCELRTOPODREQ.MUTATIONS.SETSTOREMODALDATA](state: any, payload: any) {
    //     state.storeModalData = payload;
    // },
});
export default createMutations;

// Helper method to check if a value is an object

function updateFilterData(state, dataKey, newData) {
    state.allFilterData[dataKey] = newData;
}
