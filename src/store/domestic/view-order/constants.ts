import { clearGroupFilter } from '../../../components/itl-dataTable-files/itl-dataTable/commonFunctions';

export const VIEWORDER = {
    NAME: 'VIEWORDER',
    ACTIONS: {
        UPDATEDTMODAL: 'updateDtModal',
        GETDATATABLEAPIDATA: 'getDatatableApiData', // For datatable data
        GETBILLINGEXPORT: 'getBillingExport',
        GETPAGINATORSTART: 'getPaginatorStart',
        GETPAGINATORLAST: 'getPaginatorLast',
        GETSEARCHINPUT: 'getSearchInput',
        GETDATERANGE: 'getDateRange',
        GETWIDGETTITLEDATA: 'getWidgetTitleData',
        GETWIDGETVALUEDATA: 'getWidgetValueData',
        GETORDERINPUT: 'getOrderInput',
        GETVENDORMODALDATA: 'getvendorModalData',
        GETDEFAULTCOLUMN: 'getDefaultColumn',
        GETEDITEDCOLUMNSDATA: 'getEditedColumnsData', // For Customized Column
        GETDATATABLESIZE: 'getDataTableSize',
        GETSAVEFILTERDATA: 'getSaveFilterData', // submit file
        RESETVENDORDATA: 'resetVendorData',
        UPDATEOPENMODAL: 'updateOpenModal',
        GETSELECTEDROW: 'getSelectedRow',
        GETPRODUCTDETAILS: 'getProductDetails',
        GETUPDATEFILTERDATA: 'getUpdatefilterData', // view save filter ka update modal ka data
        GETUPDATEDELETEFILTERARRAY: 'getUpdateDeleteFilterArray', // this is for update viewSaveFilteredData after delete

        GETSTOREDETAILS: 'getStoreDetails',
        GETSTOREMODALDATA: 'getStoreModalData',
        GETSTOREID: 'getStoreId',
        GETDATATABLEAPIDATACOUNT: 'getDatatableApiDataCount',
    },
    MUTATIONS: {
        SETSELECTEDTABNAME: 'setSelectedTabName',
        SETDTMODAL: 'setDtModal',
        SETDATATABLEAPIDATA: 'setDatatableApiData', // For datatable data
        SETFILTERVALUDATA: 'setFilterValueData',
        CLEARFILTERBYFIELD: 'clearfilterbyfield',
        CLEARGROUPFILTER: 'clearGroupFilter',
        CLEARALLFILTER: 'clearAllFilter',
        SETBILLINGEXPORT: 'setBillingExport',
        SETPAGINATORSTART: 'setPaginatorStart',
        SETPAGINATORLAST: 'setPaginatorLast',
        SETDATERANGE: 'setDateRange',
        SETORDERINPUT: 'setOrderInput',
        SETVENDORMODALDATA: 'setVendorModalData',
        SETDEFAULTCOLUMN: 'setDefaultColumn',
        SETEDITEDCOLUMNSDATA: 'setEditedColumnsData', // For Customized Column
        SETDATATABLESIZE: 'setDataTableSize',
        SETAPPLYSAVEDFILTEREDDATA: 'setApplySavedFilteredData',
        SETSAVEFILTERDATA: 'setSaveFilterData',
        SETEXPORTSTATUS: 'setExportStatus',
        UPDATEVENDORDATA: 'updateVendorData',
        SETOPENMODAL: 'setOpenModal',
        SETOPENMODALFALSE: 'setOpenModalFalse',
        SETSELECTEDROW: 'setSelectedRow',
        SETPRODUCTDETAILS: 'setProductDetails',
        SETVIEWSAVEDFILTEREDDATA: 'setViewSavedFilteredData', // multiple save filter array
        SETRESETSAVEDFILTEREDDATA: 'setResetSavedFilteredData', // multiple save reset filter array
        RESETREVERSEORDERDATA: 'resetReverseOrderData',
        SETUPDATEFILTERDATA: 'setUpdatefilterData', // view save filter ka update modal ka data
        SETUPDATEDELETEFILTERARRAY: 'setUpdateDeleteFilterArray', // this is for update viewSaveFilteredData after delete
        SETAPPLIEDVENDORDATA: 'setAppliedVendorData', // for vendor
        // SETUPDATESAVEFILTERFROMDATATABLE: 'setUpdateSaveFilterFromDatatable',
        SETWIDGETTITLEDATA: 'setWidgetTitleData',
        SETWIDGETVALUEDATA: 'setWidgetValueData',
        CHANGEDTTAB: 'changeDtTab',
        SETSTOREDETAILS: 'setStoreDetails',
        SETSTOREMODALDATA: 'setStoreModalData',
        SETSTOREID: 'setStoreId',
        SETDATATABLEAPIDATACOUNT: 'setDatatableApiDataCount',
    },
    GETTERS: {
        GETDTMODAL: 'getDtModal',
        GETMAPPEDFILTERPAYLOAD: 'getMappedFilterPayload',
        GETMAPPEDFILTERVALUE: 'getMappedFilterValue',
        GETEXPORTVALUEPAYLOAD: 'getExportValuePayload',
        GETPAGINATORSTARTVALUE: 'getPaginatorStartValue',
        GETPAGINATORLASTVALUE: 'getPaginatorLastValue',
        GETPAGINATORROW: 'getPaginatorRow',
        GETVENDORMODALPAYLOAD: 'getVendorModalPayload',
        GETVENDORVALUES: 'getVendorValues',
        GETVENDORSTATUS: 'getVendorStatus',
        GETUPDATEDCOLUMNS: 'getUpdatedColumns',
        GETUPDATEDSIZEPAYLOAD: 'getUpdatedSizePayload',
        GETSAVEDFILTEREDLIST: 'savedFilteredList',
        GETSAVEDFILTERLIST: 'savedFilterList',
        GETALLFILTERDATA: 'getAllFilterData',
        GETBILLINGDATA: 'getBillingData',
        GETSAVEDDATATABLERESPONSE: 'getSavedDatatableResponse',
        GETSAVEFILTERRESPONSE: 'getSaveFilterResponse',
        GETEXPORTSTATUS: 'getExportStatus',
        GETOPENMODAL: 'getOpenModal',
        SENDPRODUCTDETAILS: 'sendProductDetails',
        GETVIEWSAVEDFILTEREDDATA: 'getViewSavedFilteredData', // multiple save filter array
        GETUPDATEFILTERPAYLOAD: 'getUpdatefilterPayload', // view save filter ka update modal ka data
        GETRESPONSEMESSAGE: 'getResponseMessage',
        GETEDITEDCOLUMNSTATUS: 'getEditedColumnStatus',
        GETWIDGETVALUES: 'getWidgetValues',
        GETWIDGETTITLE: 'getWidgetTitle',
        GETTABCHANGEINFO: 'getTabChangeInfo',
        SENDSTOREDETAILS: 'sendStoreDetails',
        SENDSTOREID: 'sendStoreId',
        SENDSTOREMODALDATA: 'sendStoreModalData',
        GETDATACOUNT: 'getDataCount',
    },
};
