import { PAYMENTSETTING } from "./constant";
import { updateApiPayment } from "../../../api/checkout/genralSettingDropdown";
const createActions = () =>({
    async [PAYMENTSETTING.ACTIONS.UPDATEPAYMENTDETAILS](context:any,payload:any){
        const data = await updateApiPayment(payload)
        context.commit(PAYMENTSETTING.MUTATIONS.SETUPDATEPAYMENTTAILS,data)
    }
})
export default createActions;