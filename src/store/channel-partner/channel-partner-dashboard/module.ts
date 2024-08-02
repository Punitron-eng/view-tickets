import createActions from "./actions";
import createMutations from "./mutations";
import createGetters from "./getters";

const state: Object = {
    // selectedVendors: [],
    vendorData: [],
    vendor_name: {
        id: [],
        value: [],
    },
    domesticOrInternational: 'Domestic',
    total_revenue: '',
    total_revenue_percentage: '',
    total_revenue_growth_arrow: '',
    total_registered_users: '',
    total_registered_users_percentage: '',
    total_registered_users_growth_arrow: '',
    total_active_users: '',
    total_active_users_percentage: '',
    total_active_users_growth_arrow: '',
    total_inactive_users: '',
    total_inactive_users_percentage: '',
    total_inactive_users_growth_arrow: '',
    order_date: {
        id: '',
        value: '',
        label: '',
    },
    widgetsNames: [],
    widgetsValues: [{ value: '' }, { value: '' }, { value: '' }],
    chartDataFinal: {
        // labels: response.totle_order_data_array.data_array.map((data) => { return data.order_date }),
        labels: ['Mon', 'Tue', 'Thu'],
        datasets: [
            {
                label: 'Pickedup Orders',
                backgroundColor: '#1279FF',
                // data: response.totle_pickup_order_data_array.data_array.map((data) => { return data.totle_order }), // Values for the second category
                data: [22, 47, 54],
                borderWidth: 0,
                borderRadius: 10,
            },
            {
                label: 'Total Orders',
                backgroundColor: 'rgb(173, 216, 230)',
                // data: response.totle_order_data_array.data_array.map((data) => { return data.totle_order }), // Values for the first category
                data: [22, 36, 45],
                borderWidth: 0,
                borderRadius: 10,
            },
        ]
    }
}

const channelPartnerDashboard = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});

export default channelPartnerDashboard;
