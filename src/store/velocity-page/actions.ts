import { VELOCITY } from './constants';
import { dataTableData, exportBgProcess, widgetTitleData, widgetValueData, getDefaultColumnData, getColumnData, savedFilteredData, saveFilterData } from '@/api/velocity-page/ViewVelocity';
import { getVendorDataApi } from '../../api/VendorModalData';
const createActions = () => ({
    // For datatable data
    async [VELOCITY.ACTIONS.GETVELOCITYAPIDATA](context: any, payload: any) {
        const currentDatatableData = await dataTableData(payload.length, context.getters.getMappedFilterPayload);
        context.commit(VELOCITY.MUTATIONS.SETVELOCITYAPIDATA, currentDatatableData);
    },
    // For datatable data
    async [VELOCITY.ACTIONS.GETVELOCITYEXPORT](context: any, payload: any) {
        await context.commit(VELOCITY.MUTATIONS.SETVELOCITYEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload);
        context.commit(VELOCITY.MUTATIONS.SETEXPORTSTATUS, data);
    },
    [VELOCITY.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(VELOCITY.MUTATIONS.SETPAGINATORSTART, payload);
    },
    [VELOCITY.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        context.commit(VELOCITY.MUTATIONS.SETPAGINATORLAST, payload);
    },
    [VELOCITY.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(VELOCITY.MUTATIONS.SETDATERANGE, payload);
    },
    async [VELOCITY.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(VELOCITY.MUTATIONS.SETVENDORMODALDATA, data);
    },
    async [VELOCITY.ACTIONS.GETDEFAULTCOLUMN](context: any) {
        const defaultColumn = await getDefaultColumnData();
        context.commit(VELOCITY.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For Customized Column
    async [VELOCITY.ACTIONS.GETCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getColumnData(payload);
        context.commit(VELOCITY.MUTATIONS.SETCOLUMNSDATA, columnData);
    },
    // For Customized Column
    [VELOCITY.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(VELOCITY.MUTATIONS.SETDATATABLESIZE, payload);
    },
    async [VELOCITY.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(VELOCITY.MUTATIONS.UPDATEVENDORDATA);
    },
});
export default createActions;
