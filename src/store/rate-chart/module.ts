import createActions from '../../store/rate-chart/actions';
import createMutations from '../../store/rate-chart/mutations';
import createGetters from '../../store/rate-chart/getters';
const state: Object = {
    vendor: {
        id: '',
        value: ''
    },
    band: null,
    bandOptions: null,
    deliveryType: '0',
    tabType: '0',
    activeLogistics: {
        id: null,
        value: null
    },
    allData: null,
    allLogisticsDataArray: [],
    tableDataArray: '',
    tableDataArrayFlatRates: '',
    modalData: '',
    isSendOtp: '',
    mobile: '',
};
const rateChart = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default rateChart;
