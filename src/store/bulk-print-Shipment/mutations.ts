import { BULKPRINTSHIPMENT } from "./constants";
const createMutations = () => ({
    [BULKPRINTSHIPMENT.MUTATIONS.SETBULKPRINTSHIPMENTDATA](state,payload){
        state.bulkPrintShipmentData = payload
    }
});
export default createMutations;