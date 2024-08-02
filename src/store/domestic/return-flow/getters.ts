import { RETURN } from './constants';
import { getFilterMappedValues, getFilterMappedPayload } from '../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [RETURN.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },
    [RETURN.GETTERS.GETSAVEDFILTERLIST](state: any) {
        const vendorId = state.allFilterData.vendor_name.id;
        const vendorValue = state.allFilterData.vendor_name.value;
        const tempVendorData = vendorId.map((id: any, index: any) => `${id}:${vendorValue[index]}`);
        const allFilterData = {
            order_id: state.allFilterData.order_id,
            order_customer_name: state.allFilterData.order_customer_name,
            order_customer_mobile: state.allFilterData.order_customer_mobile,
            order_customer_email: state.allFilterData.order_customer_email,
            order_date: state.allFilterData.order_date.value,
            orderDateLable: state.allFilterData.order_date.id,
            requestedDate: state.allFilterData.return_requested_date.value,
            requestedDateLable: state.allFilterData.return_requested_date.id,
            rejectedDate: state.allFilterData.return_rejected_date.value,
            rejectedDateLable: state.allFilterData.return_rejected_date.id,
            status: state.allFilterData.tracking_status.id,
            returnReason: state.allFilterData.order_return_reason.id,
            awb_no_logistics: state.allFilterData.awb_no_logistics.id,
            order_type: state.allFilterData.order_type.id,
            order_amount: state.allFilterData.order_amount,
            refundAmount: state.allFilterData.order_refund_amount,
            paginatorStart: state.allFilterData.paginatorStart,
            search: state.allFilterData.search_awb_no,
            vendor_name: tempVendorData,
            order_product_quantity: state.allFilterData.order_product_quantity,
            pending_complete: state.allFilterData.pending_complete,
            delivery_warehouse: state.allFilterData.delivery_warehouse.id,
            origin_warehouse: state.allFilterData.origin_warehouse.id,
        };
        return allFilterData;
    },
    // For datatable data payload
    [RETURN.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        return getFilterMappedPayload(state);
    },
    // [RETURN.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
    //     const allFilterData = {
    //         order_id: state.allFilterData.order_id,
    //         order_customer_name: state.allFilterData.order_customer_name,
    //         order_customer_mobile: state.allFilterData.order_customer_mobile,
    //         order_customer_email: state.allFilterData.order_customer_email,
    //         order_date: state.allFilterData.order_date.value,
    //         orderDateLable: state.allFilterData.order_date.id,
    //         requestedDate: state.allFilterData.return_requested_date.value,
    //         requestedDateLable: state.allFilterData.return_requested_date.id,
    //         rejectedDate: state.allFilterData.return_rejected_date.value,
    //         rejectedDateLable: state.allFilterData.return_rejected_date.id,
    //         status: state.allFilterData.tracking_status.id,
    //         returnReason: state.allFilterData.order_return_reason.id,
    //         awb_no_logistics: state.allFilterData.awb_no_logistics.id,
    //         order_type: state.allFilterData.order_type.id,
    //         pending_complete: state.allFilterData.pending_complete,
    //         order_amount: state.allFilterData.order_amount,
    //         refundAmount: state.allFilterData.order_refund_amount,
    //         paginatorStart: state.allFilterData.paginatorStart,
    //         search: state.allFilterData.search_awb_no,
    //         vendor_name: state.allFilterData.vendor_name.id,
    //         page_count: state.page_count,
    //         order_product_quantity: state.allFilterData.order_product_quantity,
    //         delivery_warehouse: state.allFilterData.delivery_warehouse.id || '',
    //         origin_warehouse: state.allFilterData.origin_warehouse.id || '',
    //     };
    //     return allFilterData;
    // },

    // For datatable filter li
    // [RETURN.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    // const awbNo = state.allFilterData.awb_no_logistics === '' ? '' : state.allFilterData.awb_no_logistics.value.join(',');
    // const allFilterData = {
    // order_customer_details: state.allFilterData.order_customer_details,
    // order_id: state.allFilterData.order_id,
    // awb_no_logistics: state.allFilterData.awb_no_logistics.value.join(','),
    // order_date: state.allFilterData.order_date.label === undefined ? '' : state.allFilterData.order_date.label,
    // return_requested_date: state.allFilterData.return_requested_date.label === undefined ? '' : state.allFilterData.return_requested_date.label,
    // return_rejected_date: state.allFilterData.return_rejected_date.label === undefined ? '' : state.allFilterData.return_rejected_date.label,
    // tracking_status: state.allFilterData.tracking_status.value.join(','),
    // order_type: state.allFilterData.order_type.value.join(','),
    // order_return_reason: state.allFilterData.order_return_reason.value.join(','),
    // vendor_name: state.allFilterData.vendor_name.value.join(','),
    // order_amount: state.allFilterData.order_amount.min == '' || (state.allFilterData.order_amount.min == 0 && state.allFilterData.order_amount.max == 0) ? '' : state.allFilterData.order_amount,
    // order_refund_amount: state.allFilterData.order_refund_amount.min == '' || (state.allFilterData.order_refund_amount.min == 0 && state.allFilterData.order_refund_amount.max == 0) ? '' : state.allFilterData.order_refund_amount,
    // order_product_quantity: state.allFilterData.order_product_quantity,
    // delivery_warehouse: !Array.isArray(state.allFilterData.delivery_warehouse.value) ? state.allFilterData.delivery_warehouse.value : state.allFilterData.delivery_warehouse.value[0],
    // origin_warehouse: !Array.isArray(state.allFilterData.origin_warehouse.value) && state.allFilterData.origin_warehouse.value ? state.allFilterData.origin_warehouse.value : '',
    // delivery_warehouse: !Array.isArray(state.allFilterData.delivery_warehouse.value) && state.allFilterData.delivery_warehouse.value ? state.allFilterData.delivery_warehouse.value : '',
    // origin_warehouse: !Array.isArray(state.allFilterData.origin_warehouse.value) && state.allFilterData.origin_warehouse.value ? state.allFilterData.origin_warehouse.value : '',
    // pending_complete:state.allFilterData.pending_complete,
    // };
    // return allFilterData;
    // },
    [RETURN.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [RETURN.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'order_date':
    //                 case 'return_requested_date':
    //                 case 'return_rejected_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'tracking_status':
    //                 case 'order_type':
    //                 case 'awb_no_logistics':
    //                 case 'order_return_reason':
    //                 case 'vendor_name':
    //                 case 'delivery_warehouse':
    //                 case 'origin_warehouse':
    //                     if (value.value !== undefined && value.value.length > 0) {
    //                         filteredValue = value.value.join(',');
    //                     }
    //                     break;
    //                 case 'order_amount':
    //                 case 'order_refund_amount':
    //                     const min = value.min;
    //                     const max = value.max;
    //                     if (min !== '' && (min !== 0 || max !== 0)) {
    //                         filteredValue = value;
    //                     }
    //                     break;
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
    [RETURN.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const exportValue = getFilterMappedPayload(state);
        exportValue['processType'] = state.exportPayload;
        exportValue['selectedCheckbox'] = state.selectedCheckbox;
        return exportValue;
    },
    // [RETURN.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
    //     const exportValue = {
    //         order_id: state.allFilterData.order_id,
    //         order_customer_name: state.allFilterData.order_customer_name,
    //         order_customer_mobile: state.allFilterData.order_customer_mobile,
    //         order_customer_email: state.allFilterData.order_customer_email,
    //         order_date: state.allFilterData.order_date.value,
    //         orderDateLable: state.allFilterData.order_date.id,
    //         requestedDate: state.allFilterData.return_requested_date.value,
    //         requestedDateLable: state.allFilterData.return_requested_date.id,
    //         rejectedDate: state.allFilterData.return_rejected_date.value,
    //         rejectedDateLable: state.allFilterData.return_rejected_date.id,
    //         status: state.allFilterData.tracking_status.id,
    //         returnReason: state.allFilterData.order_return_reason.id,
    //         awb_no_logistics: state.allFilterData.awb_no_logistics.id,
    //         order_type: state.allFilterData.order_type.id,
    //         order_amount: state.allFilterData.order_amount,
    //         refundAmount: state.allFilterData.order_refund_amount,
    //         vendor_name: state.allFilterData.vendor_name.id,
    //         search: state.allFilterData.search_awb_no,
    //         processType: state.exportPayload,
    //         order_product_quantity: state.allFilterData.order_product_quantity,
    //         selectedTab: state.selectedTab,
    //         selectedCheckbox: state.selectedCheckbox,
    //         delivery_warehouse: state.allFilterData.delivery_warehouse.id || '',
    //         origin_warehouse: state.allFilterData.origin_warehouse.id || '',
    //     };
    //     return exportValue;
    // },

    // For datatable start page count
    [RETURN.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [RETURN.GETTERS.GETPAGINATORLASTVALUE](state: any) {
        const total = state.reverseData.recordsTotal;
        let last = state.allFilterData.paginatorStart + Number(state.allFilterData.paginatorLast);
        if (last > total) {
            last = total;
        } else {
            last;
        }
        return last;
    },

    // For datatable last page count
    [RETURN.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [RETURN.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [RETURN.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [RETURN.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [RETURN.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [RETURN.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    // [RETURN.GETTERS.GETSAVEDFILTEREDLIST](state: any) {
    //     const saveFilterval = {
    //         saveFilterData: state.savedFilteredResponse,
    //         saveFilterView: state.savedFilterData,
    //     };
    //     return saveFilterval;
    // },

    //

    [RETURN.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    // for DataTable Data
    [RETURN.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [RETURN.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [RETURN.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [RETURN.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    // for The DataTable OpenModal
    [RETURN.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    // for The DataTable Tabs
    [RETURN.GETTERS.GETDATATABLETABS](state: any) {
        return state.dataTableTabs;
    },
    // for The DataTable Tabs

    [RETURN.GETTERS.GETTABCHANGEINFO](state: any) {
        return state.dtTabChangeParams;
    },

    // ------------------------------------------------------------------------------------ DATATABLE GETTER ABOVE --------------------------------------------------

    [RETURN.GETTERS.GETDTTOGGLEDATA](state: any) {
        return state.dtToggleData;
    },

    //  for Product Details
    [RETURN.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    //  for DT View Save Filter
    [RETURN.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },

    [RETURN.GETTERS.GETVIEWDETAILS](state: any) {
        return state.viewDetailsData;
    },
    [RETURN.GETTERS.GETREJECTDETAILS](state: any) {
        return state.rejectData;
    },
    [RETURN.GETTERS.GETPICKNOWDETAILS](state: any) {
        return state.picknowData;
    },
    [RETURN.GETTERS.SETPICKNOWSUBMIT](state: any) {
        return state.picknowSubmitData;
    },
    [RETURN.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    [RETURN.GETTERS.CHECKCANCELORDERSTATUS](state: any) {
        return state.cancelOrderData;
    },
    [RETURN.GETTERS.GETVIEWDETAILMODALDATA](state: any) {
        return state.viewDetailActivityModal;
    },

    [RETURN.GETTERS.GETSTRIPWAREHOUSEDATA](state: any) {
        return { checkboxData: state.selectedCheckbox, warehouseStripData: state.stripWarehouse };
    },
    [RETURN.GETTERS.GETPICKNOWWAREHOUSEDATA](state: any) {
        return state.picknowWarehouseData;
    },
    [RETURN.GETTERS.GETCITYSTATE](state: any) {
        return state.cityState;
    },
    [RETURN.GETTERS.GETWEIGHTAPIDATA](state: any) {
        return state.getWeightApiData;
    },
    [RETURN.GETTERS.GETEXPORTCOUNTDATA](state: any) {
        return state.ExportCountData;
    },
    [RETURN.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [RETURN.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
});
export default createGetters;
