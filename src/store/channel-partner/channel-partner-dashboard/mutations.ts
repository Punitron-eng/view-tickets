import { CHANNELPARTNER } from './constants';

const createMutations = () => ({
    [CHANNELPARTNER.MUTATIONS.SETSELECTEDVENDORS](state: any, payload: any) {
        state.vendor_name.id = [];
        state.vendor_name.value = [];
        payload.vendorData.forEach((ele: any, i: number) => {
            state.vendor_name.id.push(ele.match(/,\s*(\d+)/)[1]);
            state.vendor_name.value.push(ele);
        });
    },

    [CHANNELPARTNER.MUTATIONS.SETVENDORMODALDATA](state: any, payload: any) {
        if (payload.isVendorSearch) {
            state.vendorData = payload.getvendorData.all_vendors_data_array;
        } else {
            state.vendorData = state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        }
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    [CHANNELPARTNER.MUTATIONS.RESETVENDORS](state: any, payload: any) {
        state.vendorData = [];
        state.vendor_name.id = [];
        state.vendor_name.value = [];
    },

    [CHANNELPARTNER.MUTATIONS.SETDOMESTICORINTERNATIONAL](state: any, payload: any) {
        state.domesticOrInternational = payload;
    },

    [CHANNELPARTNER.MUTATIONS.SETCHARTDATA](state: any, payload: any) {
        state.chartDataFinal.labels = payload.total_order_data_array.data_array.map((data: any) => { return data.order_date });
        state.chartDataFinal.datasets[0].data = payload.total_pickup_order_data_array.data_array.map((data: any) => { return Number(data.pickup_order) });
        state.chartDataFinal.datasets[1].data = payload.total_order_data_array.data_array.map((data: any, i: number) => { return (Number(data.total_order) - Number(payload.total_pickup_order_data_array.data_array[i].pickup_order)) });
        // state.chartDataFinal.datasets[0].data = payload.total_order_data_array.data_array.map((data: any) => { return Number(data.pickup_order) });

        // state.total_revenue = payload.revenue;
        // state.total_revenue_percentage = payload.revenue_percent;
        // state.total_revenue_growth_arrow = payload.revenue_growth;
        // state.total_registered_users = payload.users_data_array.total_registered_users;
        // state.total_registered_users_percentage = payload.user_percent;
        // state.total_registered_users_growth_arrow = payload.user_growth;
        // state.total_active_users = payload.users_data_array.total_active_user;
        // state.total_active_users_percentage = payload.active_user_percent;
        // state.total_active_users_growth_arrow = payload.active_user_growth;
        // state.total_inactive_users = payload.users_data_array.total_inactive_user;
        // state.total_inactive_users_percentage = payload.inactive_user_percent;
        // state.total_inactive_users_growth_arrow = payload.inactive_user_growth;
    },

    [CHANNELPARTNER.MUTATIONS.SETDATE](state: any, payload: any) {
        let dataKey = Object.keys(payload)[1];
        const temp: any = {
            id: [],
            value: [],
            label: '',
        };

        temp.id = payload[dataKey].selectedLabel;
        temp.value = payload[dataKey].selectedDate;
        temp.label = payload[dataKey].label;

        state.order_date = { ...temp };
    },

    [CHANNELPARTNER.MUTATIONS.SETWIDGETSNAMES](state: any, payload: any) {
        // console.log(payload)
        state.widgetsNames = payload.all_widgets_data_array;
    },

    [CHANNELPARTNER.MUTATIONS.SETWIDGETSVALUES](state: any, payload: any) {
        state.widgetsValues = payload;
    },
})

export default createMutations;