import { DASHBOARD } from "./constant";

const createGetters =()=>({
    [DASHBOARD.GETTERS.SENDDATERANGE](state:any){
        return state.checkoutDashboardDateRange;
    }
})

export default createGetters;