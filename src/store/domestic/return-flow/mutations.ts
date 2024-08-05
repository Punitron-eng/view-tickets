// 730
import { subDays, format } from 'date-fns';
import { RETURN } from './constants';
import { formatFilterData, setFilterValue, setApplySaveFilterData, setViewSaveFilterData } from '../../commonStoreFuncs.ts';
const createMutations = () => ({
    // For datatable action modals
    [RETURN.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },
    // [RETURN.MUTATIONS.SETSTOREVARIABLES](state: any, payload) {
    //     state.allFilterData = payload;
    // },

    // For datatable data
    [RETURN.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [RETURN.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable data count
    [RETURN.MUTATIONS.SETDATATABLEAPIDATACOUNT](state: any, payload: any) {
        state.count = payload;
    },

    // For datatable filter apply

    [RETURN.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [RETURN.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
                if ((state.selectedTab === 'rev_return_request' && key === 'return_requested_date') || (state.selectedTab !== 'rev_return_request' && key === 'order_date')) {
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
    [RETURN.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            order_product_quantity: '',
            order_id: '',
            order_amount: '',
            order_refund_amount: '',
            order_customer_name: '',
            order_customer_mobile: '',
            order_customer_email: '',
            order_date: { id: '', value: '', label: '' },
            return_requested_date: { id: '', value: '', label: '' },
            return_rejected_date: { id: '', value: '', label: '' },
            tracking_status: { id: [], value: [] },
            order_type: { id: [], value: [] },
            awb_no_logistics: { id: [], value: [] },
            order_return_reason: { id: [], value: [] },
            delivery_warehouse: { id: '', value: '' },
            origin_warehouse: { id: '', value: '' },
            paginatorStart: 0,
            paginatorLast: 10,
            search_awb_no: '',
            vendor_name: { id: [], value: [] },
            pending_complete: '',
            requested_rejected: '',
        };

        const startDate = subDays(new Date(), 29);
        const endDate = new Date();
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        const dateKey = state.selectedTab === 'rev_return_request' ? 'return_requested_date' : 'order_date';

        state.allFilterData[dateKey].value = `${formattedStartDate} ${formattedEndDate}`;
        state.allFilterData[dateKey].id = 'last_30_days';
    },

    // For datatable data export
    [RETURN.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [RETURN.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [RETURN.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For DataTable global date range
    [RETURN.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = state.selectedTab === 'rev_return_request' ? 'return_requested_date' : 'order_date';
        state.allFilterData[dateKey].value = payload.date;
        state.allFilterData[dateKey].id = payload.selectedLabel;
    },

    // For DataTable global search
    [RETURN.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search_awb_no = payload;
    },

    // For datatable vendor data
    [RETURN.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [RETURN.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [RETURN.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [RETURN.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [RETURN.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [RETURN.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [RETURN.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [RETURN.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For datatable store selcted tab name
    [RETURN.MUTATIONS.SETSELECTEDTABNAME](state: any, payload) {
        state.selectedTab = payload;
    },

    // For  datatable savefilter, viewfiltes, open modal
    [RETURN.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [RETURN.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },
    // For Export selected rows data
    [RETURN.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },
    // For get Save filter Data
    [RETURN.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
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
                order_refund_amount: '',
                order_customer_name: '',
                order_customer_mobile: '',
                order_customer_email: '',
                order_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                return_requested_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                return_rejected_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                tracking_status: {
                    id: [],
                    value: [],
                },
                order_type: {
                    id: [],
                    value: [],
                },

                awb_no_logistics: {
                    id: [],
                    value: [],
                },
                order_return_reason: {
                    id: [],
                    value: [],
                },
                paginatorStart: 0,
                paginatorLast: 10,
                search_awb_no: '',
                delivery_warehouse: {
                    id: '',
                    value: '',
                },
                origin_warehouse: {
                    id: '',
                    value: '',
                },
                vendor_name: {
                    id: [],
                    value: [],
                },
            };
            setViewSaveFilterData(state, item, tempFilterObject, index, payload);
        });
    },
    // For reset save filter data
    [RETURN.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    // For Update datatable saveFilter data
    [RETURN.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [RETURN.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },
    // For datatable get applied vendor
    [RETURN.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        state.allFilterData.vendor_name.id = [];
        state.allFilterData.vendor_name.value = [];
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },

    // ------------------------------------------------------------------------------------ DATATABLE MUTATION ABOVE --------------------------------------------------

    // For datatable tabs
    [RETURN.MUTATIONS.SETDATATABLETABS](state: any, payload: any) {
        state.dataTableTabs = payload;
    },

    // For product/order_product_quantity details modal data
    [RETURN.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
        state.productDetails = payload;
    },

    // For view details modal data
    [RETURN.MUTATIONS.SETVIEWDETAILS](state: any, payload: any) {
        state.viewDetailsData = payload;
    },

    // For reject details modal data
    [RETURN.MUTATIONS.SETREJECTDETAILS](state: any, payload: any) {
        state.rejectData = payload;
    },

    // For picknow details modal data
    [RETURN.MUTATIONS.SETPICKNOWDETAILS](state: any, payload: any) {
        state.picknowData = payload;
    },

    // For submit picknow modal data
    [RETURN.MUTATIONS.SETPICKNOWSUBMIT](state: any, payload: any) {
        state.picknowSubmitData = payload;
    },

    // For Cancel modal data
    [RETURN.MUTATIONS.SETCANCELORDER](state: any, payload: any) {
        state.cancelOrderData = payload;
    },

    // For view details modal
    [RETURN.MUTATIONS.SETVIEWDETAILMODAL](state: any, payload: any) {
        state.viewDetailActivityModal = payload;
    },

    // For change tab  from side menu {boolean}
    [RETURN.MUTATIONS.CHANGEDTTAB](state: any, payload: any) {
        state.dtTabChangeParams = payload;
    },

    // For warehouse data
    [RETURN.MUTATIONS.SETSTRIPWAREHOUSE](state: any, payload: any) {
        state.stripWarehouse = payload;
    },

    // For submit picknow warehouse data
    [RETURN.MUTATIONS.SETPICKNOWWAREHOUSE](state: any, payload: any) {
        state.picknowWarehouseData = payload;
    },

    // For get city/state data
    [RETURN.MUTATIONS.SETCITYSTATE](state: any, payload: any) {
        state.cityState = payload;
    },

    // For update the weight Column data
    [RETURN.MUTATIONS.SETWEIGHTDATA](state: any, payload: any) {
        state.getWeightApiData = payload;
    },

    // For exportcount datatable data
    [RETURN.MUTATIONS.SETEXPORTCOUNTDATA](state: any, payload: any) {
        state.ExportCountData = payload;
    },

    // For subtabs
    [RETURN.MUTATIONS.SETSUBTABNAME](state: any, payload: any) {
        state.dtToggleData = payload;
    },
});
export default createMutations;
