import { PINCODE } from './constants';
const createMutations = () => ({
    [PINCODE.MUTATIONS.SETPINCODEDETAILS](state: any, payload: any) {
        state.pincodeData = payload;
    },
});
export default createMutations;
