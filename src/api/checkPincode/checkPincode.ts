import { apiHandler } from '../common/api';

// For Default Column
export const getPincodeData = async (payload: any) => {
    const apiPath = 'pincode-services-v3/get-logistic-pincode-services-v3.json';
    const data = {
        input_your_pincode: payload.yourPincode,
        input_check_pincode: payload.checkPincode,
    };
    const result = await apiHandler(apiPath, data);
    return result;
};
