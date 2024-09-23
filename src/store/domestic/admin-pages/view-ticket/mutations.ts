// 730
import { subDays, format } from 'date-fns';
import { formatFilterData, setFilterValue, setApplySaveFilterData, setViewSaveFilterData } from '../../../commonStoreFuncs.ts';
import { NEWVIEWTICKET } from './constants';
import { dataTableVariables as dataVariables } from '../../../../components/itl-dataTable-files/itl-dataTable/commonVariable.js';

const createMutations = () => ({
    // For datatable action modals
    [NEWVIEWTICKET.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable data
    [NEWVIEWTICKET.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For datatable data count
    [NEWVIEWTICKET.MUTATIONS.SETDATATABLEAPIDATACOUNT](state: any, payload: any) {
        state.count = payload;
    },

    // For reset datatable data
    [NEWVIEWTICKET.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },
    [NEWVIEWTICKET.MUTATIONS.SETSUBTABNAME](state: any, payload: any) {
        state.dtToggleData = payload;
    },

    // For datatable filter apply

    [NEWVIEWTICKET.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [NEWVIEWTICKET.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
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
    [NEWVIEWTICKET.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            vendor_name: {
                id: [],
                value: [],
            },
            ticket_category: {
                id: [],
                value: [],
            },
            awb_no_logistics: {
                id: [],
                value: [],
            },
            created_by: {
                id: [],
                value: [],
            },
            unactionable_by_itl: {
                id: [],
                value: [],
            },
            ticket_close_by: {
                id: [],
                value: [],
            },
            tracking_status: {
                id: [],
                value: [],
            },
            dispatch_count: {
                id: [],
                value: [],
            },
            ticket_ageing: '',
            ticket_department: {
                id: [],
                value: [],
            },
            carrier_name: {
                id: [],
                value: [],
            },
            ticket_assign_by: {
                id: [],
                value: [],
            },
            ticket_assign_to: {
                id: [],
                value: [],
            },
            ticket_type: {
                id: [],
                value: [],
            },
            ticket_customer_type: {
                id: [],
                value: [],
            },
            closed_by: {
                id: [],
                value: [],
            },
            no_of_attempts: '',
            ticket_status: {
                id: [],
                value: [],
            },

            clone_date: {
                id: '',
                value: '',
                label: '',
            },
            ticket_last_updated_date: {
                id: '',
                value: '',
                label: '',
            },
            ticket_due_date: {
                id: '',
                value: '',
                label: '',
            },
            order_edd: {
                id: '',
                value: '',
                label: '',
            },
            last_attempt_date: {
                id: '',
                value: '',
                label: '',
            },
            ticket_created_date: {
                id: '',
                value: '',
                label: '',
            },
            ticket_closed_date: {
                id: '',
                value: '',
                label: '',
            },
            pending_cs_remark: '',
            clone_ticket_id: '',
            ticket_lsp_remark: '',
            ticket_cs_remark: '',
            ticket_id: '',
            ticket_subject: '',

            paginatorStart: 0,
            paginatorLast: 10,
            search_awb_no: '',
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
    [NEWVIEWTICKET.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [NEWVIEWTICKET.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [NEWVIEWTICKET.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [NEWVIEWTICKET.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = dataVariables.value.syncDateName;
        state.allFilterData[dateKey].value = payload.date;
        state.allFilterData[dateKey].id = payload.selectedLabel;
    },

    // For global search
    [NEWVIEWTICKET.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search_awb_no = payload;
    },

    // For datatable vendor data
    [NEWVIEWTICKET.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [NEWVIEWTICKET.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable ticket department id
    [NEWVIEWTICKET.MUTATIONS.SETTICKETDEPARTMENTID](state: any, payload: any) {
        state.ticketDepartmentId = payload;
    },
    [NEWVIEWTICKET.MUTATIONS.CLEARTICKETDEPARTMENTID](state: any, payload: any) {
        state.ticketDepartmentId = payload;
    },

    // For datatable edit columns
    [NEWVIEWTICKET.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [NEWVIEWTICKET.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [NEWVIEWTICKET.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        setApplySaveFilterData(state, selectedData.filterArr);
    },

    // For Update datatable saveFilter data
    [NEWVIEWTICKET.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [NEWVIEWTICKET.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [NEWVIEWTICKET.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [NEWVIEWTICKET.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [NEWVIEWTICKET.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },

    // For Export selected rows data
    [NEWVIEWTICKET.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // For product/order_product_quantity details modal data
    [NEWVIEWTICKET.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
        state.productDetails = payload;
    },

    // For get Save filter Data
    [NEWVIEWTICKET.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
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
                ticket_category: {
                    id: [],
                    value: [],
                },
                awb_no_logistics: {
                    id: [],
                    value: [],
                },
                created_by: {
                    id: [],
                    value: [],
                },
                unactionable_by_itl: {
                    id: [],
                    value: [],
                },
                ticket_close_by: {
                    id: [],
                    value: [],
                },
                tracking_status: {
                    id: [],
                    value: [],
                },
                dispatch_count: {
                    id: [],
                    value: [],
                },
                ticket_ageing: '',
                ticket_department: {
                    id: [],
                    value: [],
                },
                carrier_name: {
                    id: [],
                    value: [],
                },
                ticket_assign_by: {
                    id: [],
                    value: [],
                },
                ticket_assign_to: {
                    id: [],
                    value: [],
                },
                ticket_type: {
                    id: [],
                    value: [],
                },
                ticket_customer_type: {
                    id: [],
                    value: [],
                },
                closed_by: {
                    id: [],
                    value: [],
                },
                no_of_attempts: '',
                ticket_status: {
                    id: [],
                    value: [],
                },

                clone_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                ticket_last_updated_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                ticket_due_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_edd: {
                    id: '',
                    value: '',
                    label: '',
                },
                last_attempt_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                ticket_created_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                ticket_closed_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                pending_cs_remark: '',
                clone_ticket_id: '',
                ticket_lsp_remark: '',
                ticket_cs_remark: '',
                ticket_id: '',
                ticket_subject: '',

                paginatorStart: 0,
                paginatorLast: 10,
                search_awb_no: '',
            };
            setViewSaveFilterData(state, item, tempFilterObject, index, payload);
        });
    },

    [NEWVIEWTICKET.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    [NEWVIEWTICKET.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },

    // For widget Title
    // [NEWVIEWTICKET.MUTATIONS.SETWIDGETTITLEDATA](state: any, payload: any) {
    //     state.widgetTitleData = payload;
    // },
    // For widget Value
    // [NEWVIEWTICKET.MUTATIONS.SETWIDGETVALUEDATA](state: any, payload: any) {
    //     state.widgetValueData = payload;
    // },

    // For datatbale delete savefilter
    [NEWVIEWTICKET.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [NEWVIEWTICKET.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        state.allFilterData.vendor_name.id = [];
        state.allFilterData.vendor_name.value = [];
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    [NEWVIEWTICKET.MUTATIONS.SETRAISEMODALDATA](state: any, payload: any) {
        state.getRaiseModalData = payload;
    },
    [NEWVIEWTICKET.MUTATIONS.SETSKELETON](state: any, payload: any) {
        state.isSkeleton = payload;
    },
    [NEWVIEWTICKET.MUTATIONS.SETEDITDISCREPANCYDATA](state: any, payload: any) {
        state.editVendorSubmitData = payload;
    },
    [NEWVIEWTICKET.MUTATIONS.SETIMAGEUPLOAD](state: any, payload: any) {
        state.imageUploadData = payload;
    },
    [NEWVIEWTICKET.MUTATIONS.SETRISEDISCREPANCYDATA](state: any, payload: any) {
        state.raiseVendorSubmitData = payload;
    },
    [NEWVIEWTICKET.MUTATIONS.SETREJECTMODALDATA](state: any, payload: any) {
        state.rejectModalVal = payload;
    },
    [NEWVIEWTICKET.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
        state.viewDetailsData = payload;
    },
    [NEWVIEWTICKET.MUTATIONS.CHANGEDTTAB](state: any, payload: any) {
        state.dtTabChangeParams = payload;
    },
    [NEWVIEWTICKET.MUTATIONS.SETSELECTEDTABNAME](state: any, payload) {
        state.selectedTab = payload;
    },
    [NEWVIEWTICKET.MUTATIONS.SETCHATTICKETMODALDATA](state: any, payload) {
        state.chatTicketModalData = payload;
    },
    [NEWVIEWTICKET.MUTATIONS.SETCHATMODALCHATSDATA](state: any, payload) {
        state.chatMessageData = payload;
    },
    [NEWVIEWTICKET.MUTATIONS.SETCURRENTCHATCOUNT](state: any, payload: any) {
        state.currentChatCount = payload;
    },
    // for new ticket
    [NEWVIEWTICKET.MUTATIONS.SETNEWTICKETSTATUS](state: any, payload: any) {
        state.newTicketStatus = payload;
    },
    // [NEWVIEWTICKET.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
    //     state.storeDropdown = payload.data;
    // },
});
export default createMutations;

// Helper method to check if a value is an object
