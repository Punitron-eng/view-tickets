import { TRACKINGINFOSETTING }  from './constant'; 
import { updateapiTrackinginfo } from '../../../api/checkout/genralSettingDropdown';
const createActions = () =>({
   async [TRACKINGINFOSETTING.ACTIONS.UPDATETRACKINGDETAILS](context:any,payload:any){
     const data = await updateapiTrackinginfo(payload)
     context.commit(TRACKINGINFOSETTING.MUTATIONS.SETUPDATETRACKINGDETAILS,data)
    },
})
export default createActions; 