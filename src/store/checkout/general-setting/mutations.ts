import { GENERALSETTING } from "./constant";
const createMutations = () =>({
    [GENERALSETTING.MUTATIONS.SETUPDATEGENERALDETAILS](state:any, payload:any){
        state.generalStatus = payload;
    },
    [GENERALSETTING.MUTATIONS.SETUPDATEIMAGE](state:any, payload:any){
        state.imageStatus = payload;
    },

})
export default createMutations;