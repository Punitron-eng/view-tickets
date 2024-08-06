// 730
import { subDays, format } from 'date-fns';
import { formatFilterData, setFilterValue, setApplySaveFilterData, setViewSaveFilterData } from '../../../commonStoreFuncs.ts';
import { NONNDRCALLDETAILS } from './constants';
import { dataTableVariables as dataVariables } from '../../../../components/itl-dataTable-files/itl-dataTable/commonVariable.js';

const createMutations = () => ({
    // For datatable action modals
    [NONNDRCALLDETAILS.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [NONNDRCALLDETAILS.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [NONNDRCALLDETAILS.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply

    [NONNDRCALLDETAILS.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [NONNDRCALLDETAILS.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
    [NONNDRCALLDETAILS.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            order_id: '',
            order_product_quantity: '',
            order_amount: '',
            order_type: {
                id: [],
                value: [],
            },
            vendor_name: {
                id: [],
                value: [],
            },
            sub_admin_name: {
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
            call_details_status: {
                id: [],
                value: [],
            },
            order_date: {
                id: '',
                value: '',
                label: '',
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
    [NONNDRCALLDETAILS.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [NONNDRCALLDETAILS.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [NONNDRCALLDETAILS.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [NONNDRCALLDETAILS.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = 'order_date';
        state.allFilterData[dateKey].value = payload[dateKey].date;
        state.allFilterData[dateKey].id = payload[dateKey].selectedLabel;
    },

    // For global search
    [NONNDRCALLDETAILS.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search = payload;
    },

    // For datatable vendor data
    [NONNDRCALLDETAILS.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [NONNDRCALLDETAILS.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [NONNDRCALLDETAILS.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [NONNDRCALLDETAILS.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [NONNDRCALLDETAILS.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [NONNDRCALLDETAILS.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [NONNDRCALLDETAILS.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [NONNDRCALLDETAILS.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [NONNDRCALLDETAILS.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [NONNDRCALLDETAILS.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },

    // For Export selected rows data
    [NONNDRCALLDETAILS.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // For product/order_product_quantity details modal data
    [NONNDRCALLDETAILS.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
        state.productDetails = payload;
    },

    // For get Save filter Data
    [NONNDRCALLDETAILS.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }

        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                order_id: '',
                order_product_quantity: '',
                order_amount: '',
                order_type: {
                    id: [],
                    value: [],
                },
                vendor_name: {
                    id: [],
                    value: [],
                },
                sub_admin_name: {
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
                call_details_status: {
                    id: [],
                    value: [],
                },
                order_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                paginatorStart: 0,
                paginatorLast: 10,
                search: '',
            };
            setViewSaveFilterData(state, item, tempFilterObject, index, payload);
        });
    },

    [NONNDRCALLDETAILS.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    [NONNDRCALLDETAILS.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For widget Title
    [NONNDRCALLDETAILS.MUTATIONS.SETWIDGETTITLEDATA](state: any, payload: any) {
        state.widgetTitleData = payload;
    },
    // For widget Value
    [NONNDRCALLDETAILS.MUTATIONS.SETWIDGETVALUEDATA](state: any, payload: any) {
        state.widgetValueData = payload;
    },

    // For datatbale delete savefilter
    [NONNDRCALLDETAILS.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [NONNDRCALLDETAILS.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        state.allFilterData.vendor_name.id = [];
        state.allFilterData.vendor_name.value = [];
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    [NONNDRCALLDETAILS.MUTATIONS.SETRAISEMODALDATA](state: any, payload: any) {
        state.getRaiseModalData = payload;
    },
    [NONNDRCALLDETAILS.MUTATIONS.SETSKELETON](state: any, payload: any) {
        state.isSkeleton = payload;
    },
    [NONNDRCALLDETAILS.MUTATIONS.SETEDITDISCREPANCYDATA](state: any, payload: any) {
        state.editVendorSubmitData = payload;
    },
    [NONNDRCALLDETAILS.MUTATIONS.SETIMAGEUPLOAD](state: any, payload: any) {
        state.imageUploadData = payload;
    },
    [NONNDRCALLDETAILS.MUTATIONS.SETRISEDISCREPANCYDATA](state: any, payload: any) {
        state.raiseVendorSubmitData = payload;
    },
    [NONNDRCALLDETAILS.MUTATIONS.SETREJECTMODALDATA](state: any, payload: any) {
        state.rejectModalVal = payload;
    },
    [NONNDRCALLDETAILS.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
        state.viewDetailsData = payload;
    },
    // [NONNDRCALLDETAILS.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
    //     state.storeDropdown = payload.data;
    // },
});
export default createMutations;

// Helper method to check if a value is an object
