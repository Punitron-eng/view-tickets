import { authHeader } from '../../util/AuthHeader';
import config from '../../util/config';
import { checkTokenValidation } from '../common/api';

export const bulkprintShipment = async (payload: any) => {
    const apiPath = 'all-submit-files-old/bulk-print-shipment-form-submit-v3.json';

    const params_temp = new URLSearchParams();
    params_temp.append('print_option', payload.printOption);
    params_temp.append('awb_numbers', payload.textContent);
    params_temp.append('from_shipment', payload.fromShipment);

    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });

    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
        }
    }
    return 'error';
};
