import { apiHandler, apiHandlerWithFormData } from '../common/api';

export const getWismoResponse = async (payload: any) => {
    const apiPath = 'itl_connect_notification/get-postship-notification-charges-details-v3.php';

    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
};

export const wismoSubmitResponse = async (payloadData: any) => {
    const apiPath = 'itl_connect_notification/submit-itl-postship-notification-charges-v3.php';
    function flattenCustomFormat(obj, parentKey = '') {
        let flattened = {};

        for (const [key, value] of Object.entries(obj)) {
            let newKey = parentKey ? `${parentKey}[${key}]` : key; // Create the new key based on parent key

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                // If the value is a nested object, recursively flatten it
                let childEntries = flattenCustomFormat(value, newKey);
                for (const [childKey, childValue] of Object.entries(childEntries)) {
                    flattened[childKey] = childValue;
                }
            } else {
                // Otherwise, just set the value on the new key
                flattened[newKey] = value;
            }
        }

        return flattened;
    }

    const flattenedData = flattenCustomFormat(payloadData);

    const result = await apiHandlerWithFormData(apiPath, flattenedData);
    return result;
};
