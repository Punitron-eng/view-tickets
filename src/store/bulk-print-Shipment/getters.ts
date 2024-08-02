import { BULKPRINTSHIPMENT } from "./constants";

 const createGetters = () => ({
       [BULKPRINTSHIPMENT.GETTERS.SENDBULKPRINTSHIPMENTDATA](state){
        return state.bulkPrintShipmentData
       }
});
export default createGetters;
