import { authHeader } from '../../util/AuthHeader';
import config from '../../util/config';
import { dataTableVariables as dataVariable } from '../../components/itl-dataTable-files/itl-dataTable/commonVariable';

export const apiHandler = async (url: string, payload?: object, isFilePresent?: boolean) => {
    const apiPath = url;
    const headers = {
        ...authHeader(),
        'Content-Type': isFilePresent ? 'multipart/form-data' : 'application/json',
    };

    try {
        const result = await fetch(apiPath, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        if (result.status != 500) {
            return checkTokenValidation(result);
        } else {
            try {
                const errorData = await result.json();
                // throw new Error(errorData.message || 'Failed to fetch data'); // it was not working when we are getting the error 422 and it was not sending the message weher we are calling the api.
                const statusCode = result.status;
                if (statusCode == 403) {
                    dataVariable.value.toast.add({ severity: 'error', summary: 'Error Message', detail: errorData.message, life: 3000 });
                }
                return errorData || 'Failed to fetch data';
            } catch (error) {
                throw error;
            }
        }
    } catch (error) {
        return 'error';
    }
};

export const apiHandlerWithJson = async (url: string, payload?: object) => {
    const apiPath = url;
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: payload,
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

export const apiHandlerWithFile = async (url: string, payload?: object) => {
    const params_temp = new FormData();

    for (const key in payload) {
        params_temp.append(key, payload[key]);
    }

    const apiPath = url;
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

//  below one is the one api
export const apiHandlerWithFileNew = async (url: string, payload?: object) => {
    const params_temp = new FormData();

    for (const key in payload) {
        params_temp.append(key, payload[key]);
    }
    try {
        const result = await fetch(url, {
            method: 'POST',
            headers: authHeader(),
            body: params_temp,
        });

        if (result) {
            try {
                return checkTokenValidation(result);
            } catch (error) {
                try {
                    const errorData = await result.json();
                    // throw new Error(errorData.message || 'Failed to fetch data');
                    return errorData || 'Failed to fetch data';
                } catch (error) {
                    throw error;
                }
            }
        }
    } catch (error) {
        throw error.message;
    }
};

export const apiHandlerWithFormData = async (url: string, payload?: object) => {
    const apiPath = url;
    let params_temp = new FormData();

    for (const key in payload) {
        params_temp.append(key, payload[key]);
    }

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
export const checkTokenValidation = async (result) => {
    const data = await result.json();
    const statusCode = result.status;
    if (statusCode == 403) {
        const errorData = await result.json();
        dataVariable.value.toast.add({ severity: 'error', summary: 'Error Message', detail: errorData.message, life: 3000 });
        return statusCode;
    }
    if (data.status == 'error') {
        if (data.html_message == 'Access Denied' || data.html_message == 'Please Login' || data.html_message == 'Please Login.' || data.message == 'Invalid Access' || statusCode == 401) {
            window.location.href = config.baseUrlPanel + 'logout';
        }
        return data;
    } else {
        return data;
    }
};
