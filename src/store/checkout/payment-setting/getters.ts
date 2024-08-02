import { PAYMENTSETTING } from "./constant";
const createGetters = () =>({
    [PAYMENTSETTING.GETTERS.SENDPAYMENTSUCCESS](state:any){
        return state.paymentStatus;
    }
})
export default createGetters;