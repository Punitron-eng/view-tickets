import createActions from "./actions";
import createGetters from "./getters";
import createMutations from "./mutations";
const state : any = {
    checkoutDashboardDateRange:''
}
const checkoutDashboard = () =>({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions : createActions(),
    getters : createGetters()
})
export default checkoutDashboard;