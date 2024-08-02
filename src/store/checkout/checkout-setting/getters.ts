import { PAYMENTSETTING } from '../payment-setting/constant';
import {CHECKOUTSETTING}  from './constant'; 
const createGetters = () =>({
    [CHECKOUTSETTING.GETTERS.SENDSTOREDETAILS](state : any){
        return state.checkoutDropdown;
    },
    [ CHECKOUTSETTING.GETTERS.SENDSTOREID](state : any){
        return state.storeId;
    },
    [CHECKOUTSETTING.GETTERS.SENDTRACKINGDETAILS](state:any){
        if(state.trackingInfo != '') {
            return state.trackingInfo;
        } else {
            console.log('error')
        }
    },
    [CHECKOUTSETTING.GETTERS.SENDPAYMENTDETAILS](state:any){
        return state.paymentDropdown;
    },
    [CHECKOUTSETTING.GETTERS.PAYMENTSKELETON](state:any){
        return state.isPaymentSkeleton;
    },
    [CHECKOUTSETTING.GETTERS.SENDGENERALDETAILS](state:any){
        return state.generalInfo;
    },
    [CHECKOUTSETTING.GETTERS.SENDDISCOUNTDETAILS](state:any){
        return state.discountInfo;
    },
    [CHECKOUTSETTING.GETTERS.SENDSYNCDISCOUNTDETAILS](state:any){
        return state.syncDiscount;
    }

})
export default createGetters;