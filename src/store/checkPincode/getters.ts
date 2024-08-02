import { PINCODE } from './constants';

const createGetters = () => ({
    [PINCODE.GETTERS.SENDPINCODEDETAILS](state) {
        return state.pincodeData;
    },
});
export default createGetters;
