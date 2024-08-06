// 730
import { subDays, format } from 'date-fns';
import { PUSHPULLSCANLIST } from './constants';
import { formatFilterData, setFilterValue, setApplySaveFilterData, setViewSaveFilterData } from '../../../commonStoreFuncs.ts';
import { dataTableVariables as dataVariables } from '../../../../components/itl-dataTable-files/itl-dataTable/commonVariable.js';

const createMutations = () => ({
    // For datatable action modals
    [PUSHPULLSCANLIST.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [PUSHPULLSCANLIST.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [PUSHPULLSCANLIST.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply

    [PUSHPULLSCANLIST.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [PUSHPULLSCANLIST.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
    [PUSHPULLSCANLIST.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            paginatorStart: 0,
            paginatorLast: 10,
            push_pull_method_type: {
                id: [],
                value: [],
            },
            awb_no_logistics: {
                id: [],
                value: [],
            },
            vendor_name: {
                id: [],
                value: [],
            },
            tracking_status: {
                id: [],
                value: [],
            },
            push_pull_status: '',
            push_pull_status_type: '',
            push_pull_remark: '',
            push_pull_keyword: '',
        };
    },

    // For datatable data export
    [PUSHPULLSCANLIST.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [PUSHPULLSCANLIST.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [PUSHPULLSCANLIST.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    // [PUSHPULLSCANLIST.MUTATIONS.SETDATERANGE](state, payload) {
    //     const dateKey = dataVariables.value.syncDateName;
    //     state.allFilterData[dateKey].value = payload.date;
    //     state.allFilterData[dateKey].id = payload.selectedLabel;
    // },

    // For global search
    // [PUSHPULLSCANLIST.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
    //     state.allFilterData.search = payload;
    // },

    // For datatable vendor data
    [PUSHPULLSCANLIST.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [PUSHPULLSCANLIST.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [PUSHPULLSCANLIST.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [PUSHPULLSCANLIST.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [PUSHPULLSCANLIST.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [PUSHPULLSCANLIST.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [PUSHPULLSCANLIST.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [PUSHPULLSCANLIST.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [PUSHPULLSCANLIST.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [PUSHPULLSCANLIST.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },

    // For Export selected rows data
    [PUSHPULLSCANLIST.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // For product/items details modal data
    [PUSHPULLSCANLIST.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
        state.productDetails = payload;
    },

    // For get Save filter Data
    [PUSHPULLSCANLIST.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }
        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                paginatorStart: 0,
                paginatorLast: 10,
                push_pull_method_type: {
                    id: [],
                    value: [],
                },
                awb_no_logistics: {
                    id: [],
                    value: [],
                },
                vendor_name: {
                    id: [],
                    value: [],
                },
                tracking_status: {
                    id: [],
                    value: [],
                },
                push_pull_status: '',
                push_pull_status_type: '',
                push_pull_remark: '',
                push_pull_keyword: '',
            };
            setViewSaveFilterData(state, item, tempFilterObject, index, payload);
        });
    },

    // For reset save filter data
    [PUSHPULLSCANLIST.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    [PUSHPULLSCANLIST.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },
    // For widget Title
    // [PUSHPULLSCANLIST.MUTATIONS.SETWIDGETTITLEDATA](state: any, payload: any) {
    //     state.widgetTitleData = payload;
    // },
    // For widget Value
    // [PUSHPULLSCANLIST.MUTATIONS.SETWIDGETVALUEDATA](state: any, payload: any) {
    //     state.widgetValueData = payload;
    // },

    // For datatbale delete savefilter
    [PUSHPULLSCANLIST.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [PUSHPULLSCANLIST.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        state.allFilterData.vendor_name.id = [];
        state.allFilterData.vendor_name.value = [];
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    [PUSHPULLSCANLIST.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
        state.storeId = payload.data?.[0]?.id || '';
        state.storeDropdown = payload.data;
    },
    [PUSHPULLSCANLIST.MUTATIONS.SETSTOREID](state: any, payload: any) {
        state.storeId = payload;
    },
    [PUSHPULLSCANLIST.MUTATIONS.SETABANDONEDMODALDATA](state: any, payload: any) {
        state.abandonedModalData = payload;
    },
});
export default createMutations;
