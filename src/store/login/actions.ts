import { LOGIN } from "./constants";
import { getUser } from "@/api/LoginSubmit";
const createActions = () => ({
  async [LOGIN.ACTIONS.GETUSER](context: any, payload: any) {
    const LoginDetails = await getUser(payload.email,payload.password);
    context.commit(LOGIN.MUTATIONS.SETTOKEN,LoginDetails)
  }
});
export default createActions;