import { BULKPRINTSHIPMENT } from "./constants";
import {bulkprintShipment } from '../../api/bulk-print-Shipment/bulkprintShipment';

const createActions = () => ({
 async[BULKPRINTSHIPMENT.ACTIONS.GETBULKPRINTSHIPMENTDATA](context,payload){
    const data = await bulkprintShipment(payload)
    context.commit(BULKPRINTSHIPMENT.MUTATIONS.SETBULKPRINTSHIPMENTDATA,data)
 }
});
export default createActions;
