export const REMITTANCEPLAN = {
    NAME: 'REMITTANCEPLAN',
    ACTIONS: {
        // common datatable Constants Start //
            GETDATATABLEAPIDATA: 'getDatatableApiData', // For datatable data
            GETPAGINATORSTART: 'getPaginatorStart',
            GETPAGINATORLAST: 'getPaginatorLast',
            GETVENDORMODALDATA: 'getvendorModalData',
            GETDATERANGE: 'getDateRange',
            GETDEFAULTCOLUMN: 'getDefaultColumn',
            GETEDITEDCOLUMNSDATA: 'getEditedColumnsData', // For Customized Column
            GETDATATABLESIZE: 'getDataTableSize',
            GETSAVEFILTERDATA: 'getSaveFilterData', // submit file
            RESETVENDORDATA: 'resetVendorData',
            UPDATEOPENMODAL: 'updateOpenModal',
            GETUPDATEFILTERDATA: 'getUpdatefilterData', // view save filter ka update modal ka data
            GETUPDATEDELETEFILTERARRAY: 'getUpdateDeleteFilterArray', // this is for update viewSaveFilteredData after delete
        // common datatable Constants Start //
    },
    MUTATIONS: {
        // common datatable Constants Start //
            SETDTMODAL: 'setDtModal',
            SETDATATABLEAPIDATA: 'setDatatableApiData', // For datatable data
            SETFILTERVALUDATA: 'setFilterValueData',
            CLEARFILTERBYFIELD: 'clearfilterbyfield',
            CLEARALLFILTER: 'clearAllFilter',
            SETPAGINATORSTART: 'setPaginatorStart',
            SETPAGINATORLAST: 'setPaginatorLast',
            SETVENDORMODALDATA: 'setVendorModalData',
            SETDEFAULTCOLUMN: 'setDefaultColumn',
            SETEDITEDCOLUMNSDATA: 'setEditedColumnsData', // For Customized Column
            SETDATATABLESIZE: 'setDataTableSize',
            SETAPPLYSAVEDFILTEREDDATA: 'setApplySavedFilteredData',
            SETSAVEFILTERDATA: 'setSaveFilterData',
            UPDATEVENDORDATA: 'updateVendorData',
            SETOPENMODAL: 'setOpenModal',
            SETOPENMODALFALSE: 'setOpenModalFalse',
            SETDATERANGE: 'setDateRange',
            SETVIEWSAVEDFILTEREDDATA: 'setViewSavedFilteredData', // multiple save filter array
            SETRESETSAVEDFILTEREDDATA: 'setResetSavedFilteredData', // multiple save reset filter array
            RESETREVERSEORDERDATA: 'resetReverseOrderData',
            SETUPDATEFILTERDATA: 'setUpdatefilterData', // view save filter ka update modal ka data
            SETUPDATEDELETEFILTERARRAY: 'setUpdateDeleteFilterArray', // this is for update viewSaveFilteredData after delete
            SETAPPLIEDVENDORDATA: 'setAppliedVendorData', // for vendor
        // common datatable Constants End //
    },
    GETTERS: {
        // common datatable Constants Start //
            GETDTDATA: 'getDtData',
            GETMAPPEDFILTERPAYLOAD: 'getMappedFilterPayload',
            GETMAPPEDFILTERVALUE: 'getMappedFilterValue',
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
            GETOPENMODAL: 'getOpenModal',
            GETALLFILTERDATA: 'getAllFilterData',
            GETSAVEDDATATABLERESPONSE: 'getSavedDatatableResponse',
            GETSAVEFILTERRESPONSE: 'getSaveFilterResponse',
            GETVIEWSAVEDFILTEREDDATA: 'getViewSavedFilteredData', // multiple save filter array
            GETUPDATEFILTERPAYLOAD: 'getUpdatefilterPayload', // view save filter ka update modal ka data
            GETRESPONSEMESSAGE: 'getResponseMessage',
            GETEDITEDCOLUMNSTATUS: 'getEditedColumnStatus',
        // common datatable Constants End //
    },
};
