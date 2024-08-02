import { CHANNELPARTNER } from "./constants";
import { getVendorDataApi } from '../../../api/VendorModalData'
import { getChartData, getDefaultChartData, fetchWidgetsNames, fetchWidgetsValues } from '../../../api/channel-partner/channel-partner-dashboard/ChannelPartnerApi'

const createActions = () => ({
    [CHANNELPARTNER.ACTIONS.SELECTVENDORS](context: any, payload: any) {
        context.commit(CHANNELPARTNER.MUTATIONS.SETSELECTEDVENDORS, payload)
    },

    // [CHANNELPARTNER.ACTIONS.]
    async [CHANNELPARTNER.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(CHANNELPARTNER.MUTATIONS.SETVENDORMODALDATA, data);
    },

    [CHANNELPARTNER.ACTIONS.SETSELECTEDVENDORS](context: any, payload: any) {
        context.commit(CHANNELPARTNER.MUTATIONS.SETSELECTEDVENDORS, payload);
    },

    [CHANNELPARTNER.ACTIONS.RESETVENDORS](context: any, payload: any) {
        context.commit(CHANNELPARTNER.MUTATIONS.RESETVENDORS)
    },

    [CHANNELPARTNER.ACTIONS.SETDOMESTICORINTERNATIONAL](context: any, payload: any) {
        context.commit(CHANNELPARTNER.MUTATIONS.SETDOMESTICORINTERNATIONAL, payload)
    },

    async [CHANNELPARTNER.ACTIONS.SETCHARTDATA](context: any, payload: any) {
        let getData: any;
        if (payload.vendor_ids) {
            getData = await getChartData(payload);
        } else {
            getData = await getDefaultChartData(payload);
        }
        context.commit(CHANNELPARTNER.MUTATIONS.SETCHARTDATA, getData);
    },

    async [CHANNELPARTNER.ACTIONS.SETDATE](context: any, payload: any) {
        context.commit(CHANNELPARTNER.MUTATIONS.SETDATE, payload)
    },

    async [CHANNELPARTNER.ACTIONS.FETCHWIDGETSNAMES](context: any, payload: any) {
        let res = await fetchWidgetsNames(payload);
        context.commit(CHANNELPARTNER.MUTATIONS.SETWIDGETSNAMES, res)
        return res;
    },

    async [CHANNELPARTNER.ACTIONS.FETCHWIDGETSVALUES](context: any, payload: any) {
        let res = await fetchWidgetsValues(payload);
        context.commit(CHANNELPARTNER.MUTATIONS.SETWIDGETSVALUES, res)
        return res;
    }
})

export default createActions;