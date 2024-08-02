import { CHECKOUTSETTING }  from './constant'; 
import { apiDropdown,apiTrackinginfo,apiPayment,apiGeneral,apiDiscount,syncDiscount} from '../../../api/checkout/genralSettingDropdown';
const createActions = () =>({
   async  [CHECKOUTSETTING.ACTIONS.GETSTOREDETAILS](context:any,payload:any){
     const data = await apiDropdown(payload)
     context.commit(CHECKOUTSETTING.MUTATIONS.SETSTOREDETAILS,data)
    },
      [CHECKOUTSETTING.ACTIONS.GETSTOREID](context:any, payload:any){
        context.commit(CHECKOUTSETTING.MUTATIONS.SETSTOREID,payload)
      },
      async [CHECKOUTSETTING.ACTIONS.GETTRACKINGDETAILS](context:any, payload:any){
        const data = await apiTrackinginfo(payload)
         context.commit(CHECKOUTSETTING.MUTATIONS.SETTRACKINGDETAILS,data)
       },
       async [CHECKOUTSETTING.ACTIONS.GETPAYMENTDETAILS](context:any , payload:any){
        const data = await apiPayment(payload)
        context.commit(CHECKOUTSETTING.MUTATIONS.SETPAYMENTDETAILS,data)
      },
       async [CHECKOUTSETTING.ACTIONS.GETPAYMENTSKELETON](context:any,payload:any){
        context.commit(CHECKOUTSETTING.MUTATIONS.SETPAYMENTSKELETON,payload)
      },
      async [CHECKOUTSETTING.ACTIONS.GETGENERALDETAILS](context:any, payload:any){
        const data = await apiGeneral(payload)
        context.commit(CHECKOUTSETTING.MUTATIONS.SETGENERALDETAILS,data)
      },
      async [CHECKOUTSETTING.ACTIONS.GETDISCOUNTDETAILS](context:any, payload:any){
        const data = await apiDiscount(payload)
        context.commit(CHECKOUTSETTING.MUTATIONS.SETDISCOUNTDETAILS,data)
      },
      async [CHECKOUTSETTING.ACTIONS.GETSYNCDISCOUNTDETAILS](context:any, payload:any){
        const data = await syncDiscount(payload)
        context.commit(CHECKOUTSETTING.MUTATIONS.SETSYNCDISCOUNTDETAILS,data)
      }

})
export default createActions;