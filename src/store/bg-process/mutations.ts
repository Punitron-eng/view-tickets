// 730
import { subDays, format } from 'date-fns';
import { formatFilterData, setFilterValue, setApplySaveFilterData, setViewSaveFilterData } from '../commonStoreFuncs.ts';
import { BGPROCESS } from './constants.ts';
import { dataTableVariables as dataVariables } from '../../components/itl-dataTable-files/itl-dataTable/commonVariable.js';

const createMutations = () => ({
    // For datatable action modals
    [BGPROCESS.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [BGPROCESS.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [BGPROCESS.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply

    [BGPROCESS.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [BGPROCESS.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
    [BGPROCESS.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            order_product_quantity: '',
            order_amount: '',
            order_id: '',
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

            calling_status: {
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
    [BGPROCESS.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [BGPROCESS.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [BGPROCESS.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [BGPROCESS.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = Object.keys(payload)[0];
        state.allFilterData[dateKey].value = payload[dateKey].date;
        state.allFilterData[dateKey].id = payload[dateKey].selectedLabel;
    },

    // For global search
    [BGPROCESS.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search = payload;
    },

    // For datatable vendor data
    [BGPROCESS.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [BGPROCESS.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [BGPROCESS.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [BGPROCESS.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [BGPROCESS.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [BGPROCESS.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [BGPROCESS.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [BGPROCESS.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [BGPROCESS.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [BGPROCESS.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },

    // For Export selected rows data
    [BGPROCESS.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // For product/order_product_quantity details modal data
    [BGPROCESS.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
        state.productDetails = payload;
    },

    // For get Save filter Data
    [BGPROCESS.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }

        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                order_product_quantity: '',
                order_amount: '',
                order_id: '',
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

                calling_status: {
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

    [BGPROCESS.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    [BGPROCESS.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For widget Title
    // [BGPROCESS.MUTATIONS.SETWIDGETTITLEDATA](state: any, payload: any) {
    //     state.widgetTitleData = payload;
    // },
    // For widget Value
    // [BGPROCESS.MUTATIONS.SETWIDGETVALUEDATA](state: any, payload: any) {
    //     state.widgetValueData = payload;
    // },

    // For datatbale delete savefilter
    [BGPROCESS.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [BGPROCESS.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    // [BGPROCESS.MUTATIONS.SETRAISEMODALDATA](state: any, payload: any) {
    //     state.getRaiseModalData = payload;
    // },
    // [BGPROCESS.MUTATIONS.SETSKELETON](state: any, payload: any) {
    //     state.isSkeleton = payload;
    // },
    // [BGPROCESS.MUTATIONS.SETEDITDISCREPANCYDATA](state: any, payload: any) {
    //     state.editVendorSubmitData = payload;
    // },
    // [BGPROCESS.MUTATIONS.SETIMAGEUPLOAD](state: any, payload: any) {
    //     state.imageUploadData = payload;
    // },
    // [BGPROCESS.MUTATIONS.SETRISEDISCREPANCYDATA](state: any, payload: any) {
    //     state.raiseVendorSubmitData = payload;
    // },
    // [BGPROCESS.MUTATIONS.SETREJECTMODALDATA](state: any, payload: any) {
    //     state.rejectModalVal = payload;
    // },
    // [BGPROCESS.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
    //     state.viewDetailsData = payload;
    // },
    // [BGPROCESS.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
    //     state.storeDropdown = payload.data;
    // },
});
export default createMutations;

// Helper method to check if a value is an object
