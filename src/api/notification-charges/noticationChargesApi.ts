import { apiHandler } from '../common/api';

export const getNotificationResponse = async (payload: any) => {
    const apiPath = 'itl-connect-notification/get-itl-connect-plus-charges-details-v3.json';
    const result = await apiHandler(apiPath, payload);
    return result;
};

export const getutmSourceDataDetails = async (payload: any) => {
    const apiPath = 'itl-connect-notification/itl-connect-lead-submit.json';
    const result = await apiHandler(apiPath, payload);
    return result;
};

export const notificationSubmitResponse = async (payloadData: any) => {
    const apiPath = 'itl-connect-notification/submit-itl-connect-plus-charges-details-v3.json';
    const result = await apiHandler(apiPath, payloadData);
    return result;
};
