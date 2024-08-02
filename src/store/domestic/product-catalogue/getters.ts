import { PRODUCTCATALOGUE } from './constants';
import { getFilterMappedValues } from '../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [PRODUCTCATALOGUE.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },

    // For datatable data payload
    [PRODUCTCATALOGUE.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = {};

        for (const key in state.allFilterData) {
            if (state.allFilterData.hasOwnProperty(key)) {
                const value = state.allFilterData[key];
                if (value && typeof value === 'object' && value.hasOwnProperty('label')) {
                    allFilterData[key] = value.value;
                    allFilterData[`${key}Label`] = value.id;
                } else if (value && typeof value === 'object' && value.hasOwnProperty('id')) {
                    allFilterData[key] = value.id;
                } else {
                    allFilterData[key] = value;
                }
            }
        }

        // Add additional properties not present in state.allFilterData
        // allFilterData['page_count'] = state.page_count;
        // allFilterData['items'] = state.allFilterData.items == '>5' ? '6' : state.allFilterData.items;

        return allFilterData;
    },

    // For datatable filter li
    [PRODUCTCATALOGUE.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [PRODUCTCATALOGUE.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast' && key != 'platform_name' && key != 'store' && key != 'channel') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'product_last_updated_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'vendor_name':
    //                     // case 'channel':
    //                     // case 'store':
    //                     if (value.value !== undefined && value.value.length > 0) {
    //                         filteredValue = value.value.join(',');
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
    [PRODUCTCATALOGUE.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = {};

        for (const key in state.allFilterData) {
            if (state.allFilterData.hasOwnProperty(key)) {
                const value = state.allFilterData[key];
                if (value && typeof value === 'object' && value.hasOwnProperty('label')) {
                    allFilterData[key] = value.value;
                    allFilterData[`${key}Label`] = value.id;
                } else if (value && typeof value === 'object' && value.hasOwnProperty('id')) {
                    allFilterData[key] = value.id;
                } else {
                    allFilterData[key] = value;
                }
            }
        }

        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;

        return allFilterData;
    },

    // For datatable start page count
    [PRODUCTCATALOGUE.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [PRODUCTCATALOGUE.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [PRODUCTCATALOGUE.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [PRODUCTCATALOGUE.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [PRODUCTCATALOGUE.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [PRODUCTCATALOGUE.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [PRODUCTCATALOGUE.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [PRODUCTCATALOGUE.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    // [PRODUCTCATALOGUE.GETTERS.GETSAVEDFILTERLIST](state: any) {
    //     const vendorId = state.allFilterData.vendor_name.id;
    //     const vendorValue = state.allFilterData.vendor_name.value;
    //     const tempVendorData = vendorId.map((id: any, index: any) => `${id}:${vendorValue[index]}`);
    //     const allFilterData = {
    //         order_id: state.allFilterData.order_id,
    //         customer: state.allFilterData.customer,
    //         product_last_updated_date: state.allFilterData.product_last_updated_date.value,
    //         orderDateLable: state.allFilterData.product_last_updated_date.id,
    //         payment: state.allFilterData.payment.id,
    //         amount: state.allFilterData.amount,
    //         paginatorStart: state.allFilterData.paginatorStart,
    //         search: state.allFilterData.search,
    //         vendor_name: tempVendorData,
    //         items: state.allFilterData.items == '>5' ? '6' : state.allFilterData.items,
    //     };
    //     return allFilterData;
    // },
    [PRODUCTCATALOGUE.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [PRODUCTCATALOGUE.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [PRODUCTCATALOGUE.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [PRODUCTCATALOGUE.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [PRODUCTCATALOGUE.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [PRODUCTCATALOGUE.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [PRODUCTCATALOGUE.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [PRODUCTCATALOGUE.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [PRODUCTCATALOGUE.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [PRODUCTCATALOGUE.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [PRODUCTCATALOGUE.GETTERS.GETWIDGETTITLE](state: any) {
        return state.widgetTitleData;
    },
    [PRODUCTCATALOGUE.GETTERS.GETWIDGETVALUES](state: any) {
        return state.widgetValueData;
    },

    [PRODUCTCATALOGUE.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.storeDropdown;
    },
    [PRODUCTCATALOGUE.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [PRODUCTCATALOGUE.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
    [PRODUCTCATALOGUE.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },

    [PRODUCTCATALOGUE.GETTERS.GETCHANNELVALUE](state: any) {
        return state.channel;
    },
    [PRODUCTCATALOGUE.GETTERS.GETSTOREVALUE](state: any) {
        return state.store;
    },

    [PRODUCTCATALOGUE.GETTERS.GETDATACOUNT](state: any) {
        return state.count;
    },
});
export default createGetters;
