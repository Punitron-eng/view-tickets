import { PAYMENTSETTING } from "./constant";
const createMutations = () =>({
    [PAYMENTSETTING.MUTATIONS.SETUPDATEPAYMENTTAILS](state:any, payload:any){
        state.paymentStatus = payload;
        
    }
})
export default createMutations;