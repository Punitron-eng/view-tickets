import { authHeader } from '../../util/AuthHeader';
import config from '../../util/config';
// import { checklogin } from '@/views/checkLogin';

// For Default Column
export const getPincodeData = async (payload: any) => {
    const apiPath = 'pincode-services-v3/get-logistic-pincode-services-v3.json';
    const params_temp = new URLSearchParams();
    params_temp.append('input_your_pincode', payload.yourPincode);
    params_temp.append('input_check_pincode', payload.checkPincode);

    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            const data = await result.json();
            if (data.status == 'error' && (data.html_message == 'Access Denied' || data.html_message == 'Please Login')) {
                // sessionStorage.clear();
                // window.location.href = config.baseUrlPanel+'login';
            } else {
                return data;
            }
        } catch (error) {
            console.log('Error:', error);
            // Handle the error as needed
        }
    }
    return 'error';
};
