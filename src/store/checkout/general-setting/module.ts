import createActions from "./actions";
import createGetters from "./getters";
import createMutations from "./mutations";
const state : any = {
   generalStatus : "",
   imageStatus: ""
}
const generalSetting = () =>({
    namespaced : true,
    state,
    mutations: createMutations(),
    actions : createActions(),
    getters : createGetters()
})
export default generalSetting;