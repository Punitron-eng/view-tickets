import { authHeader } from '../../util/AuthHeader';
import config from '../../util/config';
import { checkTokenValidation } from '../common/api';

export const getUserData = async () => {
    const apiPath = 'important-updates/get-important-update.json';
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
    });
    if (result) {
        try {
            const data = await result.json();
            if (data.status == 'error' && (data.html_message == 'Access Denied' || data.html_message == 'Please Login')) {
            } else {
                return data;
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }
    return 'error';
};

// For Default Column
export const acknowledgeData = async (payload: any) => {
    const apiPath = 'important-updates/important-update-submit.json';
    const params_temp = new URLSearchParams();
    params_temp.append('update_type', payload.update);
    params_temp.append('button_event', payload.button);
    params_temp.append('is_pdf_downloaded', payload.pdfDownloaded);

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
            // Handle the error as needed
        }
    }
    return 'error';
};
