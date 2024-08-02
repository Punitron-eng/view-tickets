// 730
import { subDays, format, startOfMonth, subMonths } from 'date-fns';
import { setApplySaveFilterData, setViewSaveFilterData, setFilterValue, formatFilterData } from '../../commonStoreFuncs.ts';
import { VIEWORDER } from './constants';
import { dataTableVariables as dataVariables } from '../../../components/itl-dataTable-files/itl-dataTable/commonVariable.js';

const createMutations = () => ({
    // For datatable action modals
    [VIEWORDER.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [VIEWORDER.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [VIEWORDER.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply
    [VIEWORDER.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [VIEWORDER.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
        const tempFilterData = { ...state.allFilterData };
        const item = state.allFilterData[key];

        if (typeof item === 'object') {
            if (Array.isArray(item)) {
                tempFilterData[key] = [];
            } else if (item.min !== undefined || item.max !== undefined) {
                tempFilterData[key] = { min: '', max: '' };
            } else {
                tempFilterData[key] = 'label' in item ? { id: '', value: '', label: '' } : { id: [], value: [] };

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
        console.log(tempFilterData, 'tempFilterData');
        state.allFilterData = { ...tempFilterData };
    },
    // For datatable clear group filter
    [VIEWORDER.MUTATIONS.CLEARGROUPFILTER](state, payload) {
        delete state.allFilterData[payload.field][payload.objectKey];
        state.allFilterData[payload.field] = { ...state.allFilterData[payload.field] };
    },
    // For datatable clear all filters
    [VIEWORDER.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            order_risk: {
                id: [],
                value: [],
            },
            order_tags: '',
            order_customer_details: '',
            pickup_address: '',
            order_ndr_count: '',
            order_ageing_days: '',
            order_product_quantity: {
                id: [],
                value: [],
            },
            order_id: '',
            order_amount: '',
            duplicate_order: '',
            order_date: {
                id: '',
                value: '',
                label: '',
            },
            order_return_delivered_date: {
                id: '',
                value: '',
                label: '',
            },
            order_pickup_date: {
                id: '',
                value: '',
                label: '',
            },
            order_return_initiate_date: {
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
            order_source: {
                id: [],
                value: [],
            },
            is_oda: {
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
            order_buyer_intent: {},
            address_confirmation: '',
            order_confirmation: '',
            order_edd: {
                id: [],
                value: [],
            },
            order_incorrect_address_status: {
                id: [],
                value: [],
            },
            tracking_otp_cancelled: {
                id: [],
                value: [],
            },
            order_state: {
                id: [],
                value: [],
            },
            order_whatsapp_status: {
                id: [],
                value: [],
            },
            order_fulfillment: {
                id: [],
                value: [],
            },
            tracking_status: {
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
    [VIEWORDER.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [VIEWORDER.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [VIEWORDER.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [VIEWORDER.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = Object.keys(payload)[0];
        state.allFilterData[dateKey].value = payload[dateKey].date;
        state.allFilterData[dateKey].id = payload[dateKey].selectedLabel;
    },

    // For global search
    [VIEWORDER.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search = payload;
    },

    // For datatable vendor data
    [VIEWORDER.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [VIEWORDER.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [VIEWORDER.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [VIEWORDER.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [VIEWORDER.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [VIEWORDER.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [VIEWORDER.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [VIEWORDER.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [VIEWORDER.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [VIEWORDER.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },
    // For get Save filter Data
    [VIEWORDER.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }
        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                paginatorStart: 0,
                paginatorLast: 10,
                search: '',
                order_tags: '',
                order_customer_details: '',
                pickup_address: '',
                order_id: '',
                order_amount: '',
                duplicate_order: '',
                order_ndr_count: '',
                order_ageing_days: '',
                order_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_return_delivered_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_return_initiate_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_delivered_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_pickup_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_last_update_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_risk: {
                    id: [],
                    value: [],
                },
                order_buyer_intent: {},
                address_confirmation: '',
                is_oda: {
                    id: [],
                    value: [],
                },
                order_whatsapp_status: {
                    id: [],
                    value: [],
                },
                order_product_quantity: {
                    id: [],
                    value: [],
                },
                order_type: {
                    id: [],
                    value: [],
                },
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
                order_incorrect_address_status: {
                    id: [],
                    value: [],
                },
                order_source: {
                    id: [],
                    value: [],
                },
                tracking_otp_cancelled: {
                    id: [],
                    value: [],
                },
                order_state: {
                    id: [],
                    value: [],
                },
                order_edd: {
                    id: [],
                    value: [],
                },
                order_fulfillment: {
                    id: [],
                    value: [],
                },
                latest_courier_remark: {
                    id: [],
                    value: [],
                },
                tracking_status: {
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
    [VIEWORDER.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    // For Update datatable saveFilter data
    [VIEWORDER.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [VIEWORDER.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [VIEWORDER.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        state.allFilterData.vendor_name.id = [];
        state.allFilterData.vendor_name.value = [];
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    // For Export selected rows data
    [VIEWORDER.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // ---------------------------------------------------------------------- DATA TABLE MUTATION ABOVE -------------------------------------------------------------

    // For product/order_product_quantity details modal data
    [VIEWORDER.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
        state.productDetails = payload;
    },
    [VIEWORDER.MUTATIONS.SETWIDGETTITLEDATA](state: any, payload: any) {
        state.widgetTitleData = payload.all_widgets_data_array;
    },
    [VIEWORDER.MUTATIONS.SETWIDGETVALUEDATA](state: any, payload: any) {
        state.widgetValueData = payload.all_widgets_data_array;
    },
    [VIEWORDER.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
        state.storeDropdown = payload;
    },
    [VIEWORDER.MUTATIONS.SETSTOREID](state: any, payload: any) {
        state.storeId = payload;
    },
    [VIEWORDER.MUTATIONS.SETSTOREMODALDATA](state: any, payload: any) {
        state.storeModalData = payload;
    },
    [VIEWORDER.MUTATIONS.CHANGEDTTAB](state: any, payload: any) {
        state.dtTabChangeParams = payload;
    },
    [VIEWORDER.MUTATIONS.SETSELECTEDTABNAME](state: any, payload) {
        state.selectedTab = payload;
    },
    // For datatable data count
    [VIEWORDER.MUTATIONS.SETDATATABLEAPIDATACOUNT](state: any, payload: any) {
        state.count = payload;
    },
});
export default createMutations;
