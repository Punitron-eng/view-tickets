import { TRACKINGINFOSETTING } from "./constant";
const createGetters = () =>({
    [TRACKINGINFOSETTING.GETTERS.SENDTRACKINGSUCCESS](state:any){
        return state.TrackingStatus;
    }
})
export default createGetters;