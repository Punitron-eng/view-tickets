export const RETURN = {
    NAME: 'RETURN',
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
        // GETSAVEDFILTEREDDATA: 'getSavedFilteredData', // get details file
        GETSAVEFILTERDATA: 'getSaveFilterData', // submit file
        RESETVENDORDATA: 'resetVendorData',
        UPDATEOPENMODAL: 'updateOpenModal',
        UPDATEDATATABLETABS: 'updateDataTableTabs',
        GETSELECTEDROW: 'getSelectedRow',
        GETPRODUCTDETAILS: 'getProductDetails',
        GETVIEWDETAILS: 'getViewDetails', // view details
        GETREJECTDETAILS: 'getRejectDetails', // reject modal details
        GETPICKNOWDETAILS: 'getPickNowDetails', // Pick Now modal details
        GETPICKNOWSUBMIT: 'getPickNowSubmit', // Pick Now Submit
        GETUPDATEFILTERDATA: 'getUpdatefilterData', // view save filter ka update modal ka data
        GETUPDATEDELETEFILTERARRAY: 'getUpdateDeleteFilterArray', // this is for update viewSaveFilteredData after delete
        GETCANCELORDER: 'getCancelOrder',
        GETVIEWDETAILMODAL: 'getviewDetailModal', // view detail activity Modal
        GETSTRIPWAREHOUSE: 'getStripWarehouse',
        GETPICKNOWWAREHOUSE: 'getPickNowWareHouse',
        GETCITYSTATE: 'getCityState', // get city state
        GETWEIGHTDATA: 'getWeightData', // Weight Api
        GETEXPORTCOUNT: 'getExportCount', // Export Count Api
    },
    MUTATIONS: {
        SETDTMODAL: 'setDtModal',
        SETDATATABLEAPIDATA: 'setDatatableApiData', // For datatable data
        SETFILTERVALUDATA: 'setFilterValueData',
        CLEARFILTERBYFIELD: 'clearfilterbyfield',
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
        SETSELECTEDTABNAME: 'setSelectedTabName',
        SETOPENMODAL: 'setOpenModal',
        SETOPENMODALFALSE: 'setOpenModalFalse',
        SETDATATABLETABS: 'setDataTableTabs',
        SETSELECTEDROW: 'setSelectedRow',
        SETPRODUCTDETAILS: 'setProductDetails',
        SETVIEWSAVEDFILTEREDDATA: 'setViewSavedFilteredData', // multiple save filter array
        SETRESETSAVEDFILTEREDDATA: 'setResetSavedFilteredData', // multiple save reset filter array
        SETVIEWDETAILS: 'setViewDetails', // view details
        RESETREVERSEORDERDATA: 'resetReverseOrderData',
        SETREJECTDETAILS: 'setRejectDetails', // reject modal details
        SETPICKNOWDETAILS: 'setPickNowDetails', // Pick Now modal details
        SETPICKNOWSUBMIT: 'setPickNowSubmit', // Pick Now Submit
        SETUPDATEFILTERDATA: 'setUpdatefilterData', // view save filter ka update modal ka data
        SETUPDATEDELETEFILTERARRAY: 'setUpdateDeleteFilterArray', // this is for update viewSaveFilteredData after delete
        SETCANCELORDER: 'setCancelOrder',
        SETVIEWDETAILMODAL: 'setviewDetailModal', // view detail activity Modal
        SETAPPLIEDVENDORDATA: 'setAppliedVendorData', // for vendor
        CHANGEDTTAB: 'changeDtTab',
        SETSTRIPWAREHOUSE: 'setStripWarehouse',
        SETPICKNOWWAREHOUSE: 'setPickNowWareHouse',
        SETCITYSTATE: 'setCityState', // get city state
        SETWEIGHTDATA: 'setWeightData', // Weight Api
        SETEXPORTCOUNTDATA: 'setExportCountData', // Export Count Api
        SETSUBTABNAME: 'setSubTabName',
        // SETUPDATESAVEFILTERFROMDATATABLE: 'setUpdateSaveFilterFromDatatable'
        // SETSTOREVARIABLES: 'setStoreVariables'  // for store column field
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
        GETDATATABLETABS: 'getDataTableTabs',
        GETDTTOGGLEDATA: 'getDtToggleData',
        SENDPRODUCTDETAILS: 'sendProductDetails',
        GETVIEWSAVEDFILTEREDDATA: 'getViewSavedFilteredData', // multiple save filter array
        GETVIEWDETAILS: 'getViewDetails', // view details
        GETREJECTDETAILS: 'getRejectDetails', // reject modal details
        GETPICKNOWDETAILS: 'getPickNowDetails', // Pick Now modal details
        SETPICKNOWSUBMIT: 'setPickNowSubmit', // Pick Now Submit
        GETUPDATEFILTERPAYLOAD: 'getUpdatefilterPayload', // view save filter ka update modal ka data
        CHECKCANCELORDERSTATUS: 'checkCancelOrderStatus',
        GETVIEWDETAILMODALDATA: 'getviewDetailModalData', // view detail activity Modal
        GETTABCHANGEINFO: 'getTabChangeInfo',
        GETSTRIPWAREHOUSEDATA: 'getStripWarehouseData',
        GETPICKNOWWAREHOUSEDATA: 'getPickNowWareHouseData',
        GETCITYSTATE: 'getCityState', // get city state
        GETWEIGHTAPIDATA: 'getWeightApiData', // Weight Api
        GETEXPORTCOUNTDATA: 'getExportCountData', // Export Count Api
        GETRESPONSEMESSAGE: 'getResponseMessage',
        GETEDITEDCOLUMNSTATUS: 'getEditedColumnStatus',
    },
};
