// 730
import { subDays, format } from 'date-fns';
import { ORDERMANAGEMENTREQ } from './constants';
import { dataTableVariables as dataVariables } from '../../../../components/itl-dataTable-files/itl-dataTable/commonVariable.js';
import { formatFilterData, setFilterValue, setApplySaveFilterData, setViewSaveFilterData } from '../../../commonStoreFuncs.ts';

const createMutations = () => ({
    // For datatable action modals
    [ORDERMANAGEMENTREQ.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [ORDERMANAGEMENTREQ.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [ORDERMANAGEMENTREQ.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply
    [ORDERMANAGEMENTREQ.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [ORDERMANAGEMENTREQ.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
    [ORDERMANAGEMENTREQ.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            vendor_name: {
                id: [],
                value: [],
            },
            awb_no_logistics: {
                id: [],
                value: [],
            },
            tracking_status: {
                id: [],
                value: [],
            },
            order_last_update_date: {
                id: '',
                value: '',
                label: '',
            },
            order_customer_details: '',
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
    [ORDERMANAGEMENTREQ.MUTATIONS.SETDTEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [ORDERMANAGEMENTREQ.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [ORDERMANAGEMENTREQ.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [ORDERMANAGEMENTREQ.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = dataVariables.value.syncDateName;
        state.allFilterData[dateKey].value = payload.date;
        state.allFilterData[dateKey].id = payload.selectedLabel;
    },

    // For global search
    [ORDERMANAGEMENTREQ.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search = payload;
    },

    // For datatable vendor data
    [ORDERMANAGEMENTREQ.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [ORDERMANAGEMENTREQ.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [ORDERMANAGEMENTREQ.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [ORDERMANAGEMENTREQ.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [ORDERMANAGEMENTREQ.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [ORDERMANAGEMENTREQ.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [ORDERMANAGEMENTREQ.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [ORDERMANAGEMENTREQ.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [ORDERMANAGEMENTREQ.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [ORDERMANAGEMENTREQ.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },
    // For get Save filter Data
    [ORDERMANAGEMENTREQ.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
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
                tracking_status: {
                    id: [],
                    value: [],
                },
                order_last_update_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_customer_details: '',
                paginatorStart: 0,
                paginatorLast: 10,
                search: '',
            };
            setViewSaveFilterData(state, item, tempFilterObject, index, payload);
        });
        // console.log(state.viewSaveFilteredData, 'viewSaveFilteredData');
    },

    // For reset save filter data
    [ORDERMANAGEMENTREQ.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    // For Update datatable saveFilter data
    [ORDERMANAGEMENTREQ.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For datatbale delete savefilter
    [ORDERMANAGEMENTREQ.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [ORDERMANAGEMENTREQ.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    // For Export selected rows data
    [ORDERMANAGEMENTREQ.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },
    [ORDERMANAGEMENTREQ.MUTATIONS.SETSUBTABNAME](state: any, payload: any) {
        state.dtToggleData = payload;
    },
    [ORDERMANAGEMENTREQ.MUTATIONS.CHANGEDTTAB](state: any, payload: any) {
        state.dtTabChangeParams = payload;
    },
    // ---------------------------------------------------------------------- DATA TABLE MUTATION ABOVE -------------------------------------------------------------
});
export default createMutations;
