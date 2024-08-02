import { GENERALSETTING } from "./constant";
import { updateApiGeneral, apiImage} from "../../../api/checkout/genralSettingDropdown";
const createActions = () =>({
    async [GENERALSETTING.ACTIONS.UPDATEGENERALDETAILS](context:any,payload:any){
        const data = await updateApiGeneral(payload)
        context.commit(GENERALSETTING.MUTATIONS.SETUPDATEGENERALDETAILS,data)
    },
    async [GENERALSETTING.ACTIONS.UPDATEIMAGE](context:any,payload:any){
        const data = await apiImage(payload)
        context.commit(GENERALSETTING.MUTATIONS.SETUPDATEIMAGE,data)
    }
})
export default createActions;