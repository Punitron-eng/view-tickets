import { TRACKINGINFOSETTING } from "./constant";
const createMutations = () => ({
    [TRACKINGINFOSETTING.MUTATIONS.SETUPDATETRACKINGDETAILS](state:any, payload:any){
        state.TrackingStatus = payload;
    }
})
export default createMutations;