import { getDefaultColumnData, getSaveFilterData, getPageCount, getDeleteUpdateFilterData } from '../../api/datatable/dataTableApi';

const createActions = () => ({
    async fetchDtColumn(context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit('setDefaultColumn', defaultColumn);
    },
    async fetchDtPaginatorLast(context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit('setPageCount', pageCountData);
        }
    },
    getPaginatorStart: (context: any, payload: any) =>context.commit('setPaginatorStart', payload) ,
    getDateRange:(context:any,payload:any)=>context.commit('setDateRange', payload) ,
    getOrderInput:(context:any,payload:any)=>context.commit('setOrderInput', payload) ,
});

export default createActions;
