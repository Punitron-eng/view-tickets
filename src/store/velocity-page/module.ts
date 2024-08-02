import createActions from '../../store/velocity-page/actions';
import createMutations from '../../store/velocity-page/mutations';
import createGetters from '../../store/velocity-page/getters';
const state: any = {
    vendorData: [],
    DefaultColumn: [],
    columnsData: '', // For Customized Column
    dataTableSizePayload: '',
    vendorDataStatus: '',
    velocityData: '',
    allFilterData: {
        applied_on: {
            id: '',
            value: '',
            label: '',
        },
        status: {
            id: [],
            value: [],
        },
        paginatorStart: 0,
        paginatorLast: 10,
        vendor_name: {
            id: [],
            value: [],
        },
        applied_on_sort: '',
    },
    page_count_velocity: '',
    exportPayload: '',
    exportStatus: ''
};
const velocity = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default velocity;
