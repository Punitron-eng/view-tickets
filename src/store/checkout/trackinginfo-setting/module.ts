import createActions from "./actions";
import createGetters from "./getters";
import createMutations from "./mutations";
const state : any = {
    trsckingStatus : ""
}
const trackingSetting  = () =>({
    namespaced : true,
    state,
    actions : createActions(),
    getters : createGetters(),
    mutations : createMutations()
})
export default trackingSetting;