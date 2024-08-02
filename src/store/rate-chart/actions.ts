import { RATECHART } from './constants';
import { getDefaultRateChartData, getRateChartData, getModalData, postModalData, deleteRateChart, verifyOtp, sendOtp, fetchSericeTypeOfLogistic, setTableDisableApi, fetchBaseRateChartOnDropdownChange, fetchLogisticsByTabType, sendMail, copyVendorCodes, fetchVendorDataFromApi } from '../../api/rate-chart/GetRateChartData';
import { getVendorDataApi } from '../../api/VendorModalData';

const createActions = () => ({
    // For fetching default data ratechart
    async [RATECHART.ACTIONS.FETCHDEFAULTDATA](context: any, payload: any) {
        const data = await getDefaultRateChartData(payload);
        await context.commit(RATECHART.MUTATIONS.SETDEFAULTDATA, data);
        return data;
    },
    async [RATECHART.ACTIONS.FETCHDATA](context: any, payload: any) {
        const data = await getRateChartData(payload);
        await context.commit(RATECHART.MUTATIONS.SETDATA, data);
        return data;
    },
    async [RATECHART.ACTIONS.FETCHMODALDATA](context: any, payload: any) {
        const data = await getModalData(payload);
        await context.commit(RATECHART.MUTATIONS.SETMODALDATA, data);
    },
    async [RATECHART.ACTIONS.SENDOTP](context: any, payload: any) {
        const data = await sendOtp(payload);
        await context.commit(RATECHART.MUTATIONS.SETMOBILE, data);
        return data;
    },
    async [RATECHART.ACTIONS.VERIFYOTP](context: any, payload: any) {
        const data = await verifyOtp(payload);
        return data;
    },
    [RATECHART.ACTIONS.SETISSENDOTP](context: any, payload: any) {
        context.commit(RATECHART.MUTATIONS.SETISSENDOTP, payload);
    },
    async [RATECHART.ACTIONS.POSTMODALDATA](context: any, payload: any) {
        const data = await postModalData(payload);
        return data;
    },
    async [RATECHART.ACTIONS.DELETERATECHART](context: any, payload: any) {
        const data = await deleteRateChart(payload);
        return data;
    },
    [RATECHART.ACTIONS.SETVENDOR](context: any, payload: any) {
        if (payload) {
            context.commit(RATECHART.MUTATIONS.SETVENDOR, payload);
        }
        else context.commit(RATECHART.MUTATIONS.SETVENDOR);
    },
    [RATECHART.ACTIONS.SETACTIVELOGISTICS](context: any, payload: any) {
        context.commit(RATECHART.MUTATIONS.SETACTIVELOGISTICS, payload);
    },
    [RATECHART.ACTIONS.SETBAND](context: any, payload: any) {
        context.commit(RATECHART.MUTATIONS.SETBAND, payload);
    },
    [RATECHART.ACTIONS.SETDELIVERYTYPE](context: any, payload: any) {
        context.commit(RATECHART.MUTATIONS.SETDELIVERYTYPE, payload);
    },
    [RATECHART.ACTIONS.SETTABTYPE](context: any, payload: any) {
        context.commit(RATECHART.MUTATIONS.SETTABTYPE, payload);
    },
    async [RATECHART.ACTIONS.FETCHLOGISTICSERVICETYPEBYCHANGEMODAL](context: any, payload: any) {
        const data = await fetchSericeTypeOfLogistic(payload);
        return data;
    },
    async [RATECHART.ACTIONS.SETTABLEDISABLEAPI](context: any, payload: any) {
        const data = await setTableDisableApi(payload);
        return data;
    },
    async [RATECHART.ACTIONS.FETCHBASERATECHARTMODALDROPDOWNCHANGE](context: any, payload: any) {
        const data = await fetchBaseRateChartOnDropdownChange(payload);
        return data;
    },
    async [RATECHART.ACTIONS.FETCHLOGISTICSTABTYPEDROPDOWNCHANGEMODAL](context: any, payload: any) {
        const data = await fetchLogisticsByTabType(payload);
        return data;
    },
    async [RATECHART.ACTIONS.SENDMAIL](context: any, payload: any) {
        const data = await sendMail(payload);
        return data;
    },
    async [RATECHART.ACTIONS.COPYVENDORCODES](context: any, payload: any) {
        const data = await copyVendorCodes(payload);
        return data;
    },
    async [RATECHART.ACTIONS.FETCHVENDORDATAFROMAPI](context: any, payload: any) {
        const data = await fetchVendorDataFromApi(payload);
        return data;
    },
});
export default createActions;
