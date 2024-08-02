import { CHANNELPARTNER } from "./constants";

const createGetters = () => ({
    [CHANNELPARTNER.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },
    [CHANNELPARTNER.GETTERS.GETVENDORVALUES](state: any) {
        return state.vendor_name;
    },
    [CHANNELPARTNER.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },
    [CHANNELPARTNER.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        const allFilterData = {
            vendor_name: state.vendor_name.value.join(',')
        };
        return allFilterData
    },
    [CHANNELPARTNER.GETTERS.GETSELECTEDVENDORS](state: any) {
        return state.vendor_name;
    },
    [CHANNELPARTNER.GETTERS.GETDOMESTICORINTERNATIONAL](state: any) {
        return state.domesticOrInternational;
    },
    [CHANNELPARTNER.GETTERS.GETCHARTDATA](state: any) {
        return state.chartDataFinal;
    },
    // [CHANNELPARTNER.GETTERS.GETWIDGETSDATA](state: any) {
    //     let obj: Object = {
    //         total_revenue: state.total_revenue,
    //         total_revenue_percentage: state.total_revenue_percentage,
    //         total_revenue_growth_arrow: state.total_revenue_growth_arrow,
    //         total_registered_users: state.total_registered_users,
    //         total_registered_users_percentage: state.total_registered_users_percentage,
    //         total_registered_users_growth_arrow: state.total_registered_users_growth_arrow,
    //         total_active_users: state.total_active_users,
    //         total_active_users_percentage: state.total_active_users_percentage,
    //         total_active_users_growth_arrow: state.total_active_users_growth_arrow,
    //         total_inactive_users: state.total_inactive_users,
    //         total_inactive_users_percentage: state.total_inactive_users_percentage,
    //         total_inactive_users_growth_arrow: state.total_inactive_users_growth_arrow,
    //     }
    //     return obj;
    // },
    [CHANNELPARTNER.GETTERS.GETDATE](state: any) {
        return state.order_date;
    },
    [CHANNELPARTNER.GETTERS.GETWIDGETSNAMES](state: any) {
        return state.widgetsNames;
    },
    [CHANNELPARTNER.GETTERS.GETWIDGETSVALUES](state: any) {
        return state.widgetsValues;
    }
})

export default createGetters;
