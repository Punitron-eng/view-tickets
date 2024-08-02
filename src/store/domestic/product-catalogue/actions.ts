import { PRODUCTCATALOGUE } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData, dataCount } from '../../../api/datatable/dataTableApi';
import { apiHandlerWithFormData } from '../../../api/common/api';
import {
    dataTableData,
    exportBgProcess,
    updateByCategoryMaster,
    fetchChannels,
    fetchStores,
    syncOrders,
    fetchCategoryApi,
    productData,
    getChannelInventoryProduct,
    fetchProductSubmitApi,
    imageUpload,
    bgProcessImportSubmit,
} from '../../../api/domestic/product-catalogue/ProductCatalogueApi';
import { getVendorDataApi } from '../../../api/VendorModalData';

const createActions = () => ({
    // For Export selected rows data
    [PRODUCTCATALOGUE.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [PRODUCTCATALOGUE.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(PRODUCTCATALOGUE.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(PRODUCTCATALOGUE.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload);
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETEXPORTSTATUS, data);
    },

    // For datatable data
    async [PRODUCTCATALOGUE.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload);
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },
    ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable count
    async [PRODUCTCATALOGUE.ACTIONS.GETDATATABLEAPIDATACOUNT](context: any, payload: any) {
        const updatedPayload = { ...payload, moduleUrl: 'product-catalogue' };
        const currentDatatableData = await dataCount(updatedPayload, context.getters.getMappedFilterPayload);
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETDATATABLEAPIDATACOUNT, currentDatatableData);
    },

    // For datatable start page count
    [PRODUCTCATALOGUE.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [PRODUCTCATALOGUE.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(PRODUCTCATALOGUE.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(PRODUCTCATALOGUE.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },

    // For global date range
    [PRODUCTCATALOGUE.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [PRODUCTCATALOGUE.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [PRODUCTCATALOGUE.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [PRODUCTCATALOGUE.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [PRODUCTCATALOGUE.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [PRODUCTCATALOGUE.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [PRODUCTCATALOGUE.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [PRODUCTCATALOGUE.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(PRODUCTCATALOGUE.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [PRODUCTCATALOGUE.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(PRODUCTCATALOGUE.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [PRODUCTCATALOGUE.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [PRODUCTCATALOGUE.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    async [PRODUCTCATALOGUE.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
        const getwidgetData = await widgetTitleData(payload.length);
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData);
    },
    async [PRODUCTCATALOGUE.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
        const getWidgetValue = await widgetValueData(payload.length, context.getters.getMappedFilterPayload);
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue);
    },

    async [PRODUCTCATALOGUE.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
        // const data = await productData(payload);
        const data = await apiHandlerWithFormData('reverse-order-v3/get-modal-product-details-v3.json', payload);
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETPRODUCTDETAILS, data);
    },

    async [PRODUCTCATALOGUE.ACTIONS.FETCHCHANNELS](context: any, payload: any) {
        // return fetchChannels(payload);
        return await apiHandlerWithFormData('common_module_v3/get-user-platform-list-v3.php', payload);
    },
    [PRODUCTCATALOGUE.ACTIONS.SETCHANNELVALUE](context: any, payload: any) {
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETCHANNELVALUE, payload);
    },
    async [PRODUCTCATALOGUE.ACTIONS.FETCHSTORES](context: any, payload: any) {
        // return fetchStores(payload);
        return await apiHandlerWithFormData('common_module_v3/get-user-store-list-v3.php', payload);
    },
    [PRODUCTCATALOGUE.ACTIONS.SETSTOREVALUE](context: any, payload: any) {
        context.commit(PRODUCTCATALOGUE.MUTATIONS.SETSTOREVALUE, payload);
    },
    async [PRODUCTCATALOGUE.ACTIONS.SYNCORDERS](context: any, payload: any) {
        // return syncOrders(payload);
        return await apiHandlerWithFormData('product_catalogue_v3/sync-platform-product.php', payload);
    },
    async [PRODUCTCATALOGUE.ACTIONS.FETCHCATEGORIES](context: any, payload: any) {
        // return fetchCategoryApi();
        return await apiHandlerWithFormData('product-catalogue-v3/get-product-category-master.json', payload);
    },
    async [PRODUCTCATALOGUE.ACTIONS.FETCHCHANNELINVENTORIES](context: any, payload: any) {
        // return getChannelInventoryProduct(payload);
        return await apiHandlerWithFormData('product-catalogue-v3/get-channel-inventory-product.json', payload);
    },
    async [PRODUCTCATALOGUE.ACTIONS.SUBMITPRODUCT](context: any, payload: any) {
        // return fetchProductSubmitApi(payload);
        return await apiHandlerWithFormData('product-catalogue-v3/product-catalogue-submit-v3.json', payload);
    },
    async [PRODUCTCATALOGUE.ACTIONS.IMAGEUPLOAD](context: any, payload: any) {
        // return imageUpload(payload);
        return await apiHandlerWithFormData('product-catalogue-v3/upload-product-image.json', payload);
    },
    async [PRODUCTCATALOGUE.ACTIONS.BGPROCESSIMPORTSUBMIT](context: any, payload: any) {
        // return bgProcessImportSubmit(payload);
        return await apiHandlerWithFormData('common-module-v3/bg-process-import-submit-v3.json', payload);
    },
    async [PRODUCTCATALOGUE.ACTIONS.UPDATEBYCATEGORYMASTER](context: any, payload: any) {
        // return bgProcessImportSubmit(payload);
        console.log(payload);
        return await updateByCategoryMaster(payload);
    },
});
export default createActions;
