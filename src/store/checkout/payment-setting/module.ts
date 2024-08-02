import createActions from "./actions";
import createGetters from "./getters";
import createMutations from "./mutations";
const state : any = {
   paymentStatus : ""
}
const paymentSetting = () =>({
    namespaced : true,
    state,
    mutations: createMutations(),
    actions : createActions(),
    getters : createGetters()
})
export default paymentSetting;