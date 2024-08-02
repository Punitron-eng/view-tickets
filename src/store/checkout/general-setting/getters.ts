import { GENERALSETTING } from "./constant";
const createGetters = () =>({
    [GENERALSETTING.GETTERS.SENDGENERALSUCCESS](state:any){
        return state.generalStatus;
    },
    [GENERALSETTING.GETTERS.SENDIMAGESUCCESS](state:any){
        return state.imageStatus;
    }
})
export default createGetters;