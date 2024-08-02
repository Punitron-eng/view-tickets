import createActions from "./actions";
import createGetters from "./getters";
import createMutations from "./mutations";
const state : any = {
    checkoutDropdown : [],
    trackingInfo : [],
    paymentDropdown : [],
    generalInfo : [],
    storeId : '',
    discountInfo: '',
    syncDiscount:'',
    isPaymentSkeleton: true,
}
const checkoutSetting = () =>({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions : createActions(),
    getters : createGetters()
})
export default checkoutSetting;