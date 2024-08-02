export const VIEWPICKUP = {
    NAME: 'VIEWPICKUP',
    ACTIONS: {
        UPDATEDTMODAL: 'updateDtModal',
        GETDATATABLEAPIDATA: 'getDatatableApiData', // For datatable data
        GETDTEXPORT: 'getDtExport',
        GETPAGINATORSTART: 'getPaginatorStart',
        GETPAGINATORLAST: 'getPaginatorLast',
        GETSEARCHINPUT: 'getSearchInput',
        GETDATERANGE: 'getDateRange',
        GETORDERINPUT: 'getOrderInput',
        GETVENDORMODALDATA: 'getvendorModalData',
        GETDEFAULTCOLUMN: 'getDefaultColumn',
        GETEDITEDCOLUMNSDATA: 'getEditedColumnsData', // For Customized Column
        GETDATATABLESIZE: 'getDataTableSize',
        GETSAVEFILTERDATA: 'getSaveFilterData', // submit file
        RESETVENDORDATA: 'resetVendorData',
        UPDATEOPENMODAL: 'updateOpenModal',
        GETSELECTEDROW: 'getSelectedRow',
        GETUPDATEFILTERDATA: 'getUpdatefilterData', // view save filter ka update modal ka data
        GETUPDATEDELETEFILTERARRAY: 'getUpdateDeleteFilterArray', // this is for update viewSaveFilteredData after delete

    },
    MUTATIONS: {
        SETDTMODAL: 'setDtModal',
        SETDATATABLEAPIDATA: 'setDatatableApiData', // For datatable data
        SETFILTERVALUDATA: 'setFilterValueData',
        CLEARFILTERBYFIELD: 'clearfilterbyfield',
        CLEARALLFILTER: 'clearAllFilter',
        SETDTEXPORT: 'setDtExport',
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
        SETVIEWSAVEDFILTEREDDATA: 'setViewSavedFilteredData', // multiple save filter array
        SETRESETSAVEDFILTEREDDATA: 'setResetSavedFilteredData', // multiple save reset filter array
        RESETREVERSEORDERDATA: 'resetReverseOrderData',
        SETUPDATEFILTERDATA: 'setUpdatefilterData', // view save filter ka update modal ka data
        SETUPDATEDELETEFILTERARRAY: 'setUpdateDeleteFilterArray', // this is for update viewSaveFilteredData after delete
        SETAPPLIEDVENDORDATA: 'setAppliedVendorData', // for vendor
        // SETUPDATESAVEFILTERFROMDATATABLE: 'setUpdateSaveFilterFromDatatable',

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
        GETDTDATA: 'getDtData',
        GETSAVEDDATATABLERESPONSE: 'getSavedDatatableResponse',
        GETSAVEFILTERRESPONSE: 'getSaveFilterResponse',
        GETEXPORTSTATUS: 'getExportStatus',
        GETOPENMODAL: 'getOpenModal',
        GETVIEWSAVEDFILTEREDDATA: 'getViewSavedFilteredData', // multiple save filter array
        GETUPDATEFILTERPAYLOAD: 'getUpdatefilterPayload', // view save filter ka update modal ka data
        GETRESPONSEMESSAGE: 'getResponseMessage',
        GETEDITEDCOLUMNSTATUS: 'getEditedColumnStatus',

    },
};
