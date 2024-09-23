import { NEWVIEWTICKET } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [NEWVIEWTICKET.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },
    [NEWVIEWTICKET.GETTERS.GETDTTOGGLEDATA](state: any) {
        return state.dtToggleData;
    },

    // For datatable data payload
    [NEWVIEWTICKET.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        // Add additional properties not present in state.allFilterData
        allFilterData['page_count'] = state.page_count;
        allFilterData['order_product_quantity'] = state.allFilterData.order_product_quantity == '>5' ? '6' : state.allFilterData.order_product_quantity;

        return allFilterData;
    },

    // For datatable filter li
    [NEWVIEWTICKET.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [NEWVIEWTICKET.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'clone_date':
    //                 case 'ticket_last_updated_date':
    //                 case 'ticket_due_date':
    //                 case 'order_edd':
    //                 case 'last_attempt_date':
    //                 case 'ticket_created_date':
    //                 case 'ticket_closed_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'vendor_name':
    //                 case 'awb_no_logistics':
    //                 case 'ticket_close_by':
    //                 case 'tracking_status':
    //                 case 'dispatch_count':
    //                 case 'ticket_department':
    //                 case 'carrier_name':
    //                 case 'ticket_assign_by':
    //                 case 'ticket_assign_to':
    //                 case 'closed_by':
    //                 case 'no_of_attempts':
    //                 case 'ticket_status':
    //                     if (value.value !== undefined && value.value.length > 0) {
    //                         filteredValue = value.value.join(',');
    //                     }
    //                     break;
    //                 // case 'order_amount':
    //                 //     const min = value.min;
    //                 //     const max = value.max;
    //                 //     if (min !== '' && (min !== 0 || max !== 0)) {
    //                 //         filteredValue = value;
    //                 //     }
    //                 //     break;
    //                 default:
    //                     filteredValue = value;
    //                     break;
    //             }
    //             allFilterData[key] = filteredValue;
    //         }
    //     }
    //     return allFilterData;
    // },
    // For datatable export data
    // [NEWVIEWTICKET.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
    //     const allFilterData = {};

    //     for (const key in state.allFilterData) {
    //         if (state.allFilterData.hasOwnProperty(key)) {
    //             const value = state.allFilterData[key];
    //             if (value && typeof value === 'object' && value.hasOwnProperty('label')) {
    //                 allFilterData[key] = value.value;
    //                 allFilterData[`${key}Label`] = value.id;
    //             } else if (value && typeof value === 'object' && value.hasOwnProperty('id')) {
    //                 allFilterData[key] = value.id;
    //             } else {
    //                 allFilterData[key] = value;
    //             }
    //         }
    //     }

    //     allFilterData['processType'] = state.exportPayload;
    //     allFilterData['selectedCheckbox'] = state.selectedCheckbox;

    //     return allFilterData;
    // },
    [NEWVIEWTICKET.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);
        return allFilterData;
    },

    // For datatable data count
    [NEWVIEWTICKET.GETTERS.GETDATACOUNT](state: any) {
        return state.count;
    },

    // For datatable start page count
    [NEWVIEWTICKET.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [NEWVIEWTICKET.GETTERS.GETPAGINATORLASTVALUE](state: any) {
        // const total = state.reverseData.recordsTotal;
        const total = state.count.count;
        let last = state.allFilterData.paginatorStart + Number(state.allFilterData.paginatorLast);
        if (last > total) {
            last = total;
        } else {
            last;
        }
        return last;
    },

    // For datatable last page count
    [NEWVIEWTICKET.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [NEWVIEWTICKET.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [NEWVIEWTICKET.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [NEWVIEWTICKET.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [NEWVIEWTICKET.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [NEWVIEWTICKET.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },
    [NEWVIEWTICKET.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [NEWVIEWTICKET.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [NEWVIEWTICKET.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [NEWVIEWTICKET.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [NEWVIEWTICKET.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [NEWVIEWTICKET.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [NEWVIEWTICKET.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [NEWVIEWTICKET.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [NEWVIEWTICKET.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [NEWVIEWTICKET.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [NEWVIEWTICKET.GETTERS.GETWIDGETTITLE](state: any) {
        return state.widgetTitleData;
    },
    [NEWVIEWTICKET.GETTERS.GETWIDGETVALUES](state: any) {
        return state.widgetValueData;
    },

    // [NEWVIEWTICKET.GETTERS.SENDSTOREDETAILS](state: any) {
    //     return state.storeDropdown;
    // },
    [NEWVIEWTICKET.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [NEWVIEWTICKET.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
    [NEWVIEWTICKET.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    [NEWVIEWTICKET.GETTERS.SENDRAISEMODALDATA](state: any) {
        return state.getRaiseModalData;
    },
    [NEWVIEWTICKET.GETTERS.SENDSKELETON](state: any) {
        return state.isSkeleton;
    },
    [NEWVIEWTICKET.GETTERS.SENDIMAGEUPLOAD](state: any) {
        return state.imageUploadData;
    },
    [NEWVIEWTICKET.GETTERS.SENDRISEDISCREPANCYDATA](state: any) {
        return state.raiseVendorSubmitData;
    },
    [NEWVIEWTICKET.GETTERS.SENDEDITDISCREPANCYDATA](state: any) {
        return state.editVendorSubmitData;
    },
    [NEWVIEWTICKET.GETTERS.SENDREJECTMODALDATA](state: any) {
        return state.rejectModalVal;
    },
    [NEWVIEWTICKET.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.viewDetailsData;
    },
    [NEWVIEWTICKET.GETTERS.SENDCHATTICKETMODALDATA](state: any) {
        return state.chatTicketModalData;
    },
    [NEWVIEWTICKET.GETTERS.GETTICKETDEPARTMENTID](state: any) {
        return state.ticketDepartmentId;
    },
    [NEWVIEWTICKET.GETTERS.SENDCHATMESSAGEDATA](state: any) {
        return state.chatMessageData;
    },
    [NEWVIEWTICKET.GETTERS.SENDCURRENTCHATCOUNT](state: any) {
        return state.currentChatCount;
    },
    // for new ticket
    [NEWVIEWTICKET.GETTERS.SENDNEWTICKETSTATUS](state: any) {
        return state.newTicketStatus;
    },
});
export default createGetters;
