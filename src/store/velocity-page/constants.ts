export const VELOCITY = {
    NAME: 'VELOCITY',
    ACTIONS: {
        GETVELOCITYAPIDATA: 'getVelocityApiData', // For datatable data
        GETVELOCITYEXPORT: 'getVelocityExport',
        GETPAGINATORSTART: 'getPaginatorStart',
        GETPAGINATORLAST: 'getPaginatorLast',
        GETDATERANGE: 'getDateRange',
        GETVENDORMODALDATA: 'getvendorModalData',
        GETDEFAULTCOLUMN: 'getDefaultColumn',
        GETCOLUMNSDATA: 'getColumnsData', // For Customized Column
        GETDATATABLESIZE: 'getDataTableSize',
        RESETVENDORDATA: 'resetVendorData'
    },
    MUTATIONS: {
        SETVELOCITYAPIDATA: 'setVelocityApiData', // For datatable data
        SETFILTERVALUDATA: 'setFilterValueData',
        CLEARFILTERBYFIELD: 'clearfilterbyfield',
        CLEARALLFILTER: 'clearAllFilter',
        SETVELOCITYEXPORT: 'setVelocityExport',
        SETPAGINATORSTART: 'setPaginatorStart',
        SETPAGINATORLAST: 'setPaginatorLast',
        SETDATERANGE: 'setDateRange',
        SETVENDORMODALDATA: 'setVendorModalData',
        SETDEFAULTCOLUMN: 'setDefaultColumn',
        SETCOLUMNSDATA: 'setColumnsData', // For Customized Column
        SETDATATABLESIZE: 'setDataTableSize',
        SETEXPORTSTATUS: 'setExportStatus',
        UPDATEVENDORDATA: 'updateVendorData'
    },
    GETTERS: {
        GETMAPPEDFILTERPAYLOAD: 'getMappedFilterPayload',
        GETMAPPEDFILTERVALUE: 'getMappedFilterValue',
        GETEXPORTVALUEPAYLOAD: 'getExportValuePayload',
        GETITEMFIELDPAYLOAD: 'getItemFieldPayload',
        GETACTIONRESPONSE: 'getActionResponse',
        GETPAGINATORSTARTVALUE: 'getPaginatorStartValue',
        GETPAGINATORLASTVALUE: 'getPaginatorLastValue',
        GETPAGINATORROW: 'getPaginatorRow',
        GETVENDORMODALPAYLOAD: 'getVendorModalPayload',
        GETVENDORVALUES: 'getVendorValues',
        GETVENDORSTATUS: 'getVendorStatus',
        GETUPDATEDCOLUMNS: 'getUpdatedColumns',
        GETUPDATEDSIZEPAYLOAD: 'getUpdatedSizePayload',
        GETALLFILTERDATA: 'getAllFilterData',
        GETVELOCITYDATA: 'getVelocityData',
        GETSAVEDDATATABLERESPONSE: 'getSavedDatatableResponse',
        GETEXPORTSTATUS: 'getExportStatus',
    },
};
