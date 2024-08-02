import {CHECKOUTSETTING}  from './constant';
const createMutations = () =>({
     [CHECKOUTSETTING.MUTATIONS.SETSTOREDETAILS](state:any, payload:any){
       state.checkoutDropdown = payload.data; 
     },
     [CHECKOUTSETTING.MUTATIONS.SETSTOREID](state:any, payload:any){
      state.storeId = payload;
     },
     [CHECKOUTSETTING.MUTATIONS.SETTRACKINGDETAILS](state:any, payload:any){
      state.trackingInfo = payload.tracking_details_array;
     },
     [CHECKOUTSETTING.MUTATIONS.SETPAYMENTDETAILS](state:any, payload:any){
      state.paymentDropdown = payload
     },
     [CHECKOUTSETTING.MUTATIONS.SETPAYMENTSKELETON](state:any, payload:any){
      state.isPaymentSkeleton = payload;
     },
     [CHECKOUTSETTING.MUTATIONS.SETGENERALDETAILS](state:any, payload:any){
      state.generalInfo = payload;
     },
     [CHECKOUTSETTING.MUTATIONS.SETPAYMENTSKELETON](state:any, payload:any){
      state.istrackingSkeleton = payload;
     },
     [CHECKOUTSETTING.MUTATIONS.SETDISCOUNTDETAILS](state:any, payload:any){
      state.discountInfo = payload;
     },
     [CHECKOUTSETTING.MUTATIONS.SETSYNCDISCOUNTDETAILS](state:any, payload:any){
      state.syncDiscount = payload;
     },

})
export default createMutations;