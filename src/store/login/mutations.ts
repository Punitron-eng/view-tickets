import { LOGIN } from "./constants";
const createMutations = () => ({
  [LOGIN.MUTATIONS.SETTOKEN](state: any, payload: any) {
    state.LoginDetails = payload;
  },
  [LOGIN.MUTATIONS.UPDATELOGINSTATUS](state: any, payload: any) {
    state.isLogin = payload;
  },
});
export default createMutations;