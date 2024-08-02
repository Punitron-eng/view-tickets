import config from '../../../util/config';
import { apiHandler } from '../../common/api';
import { addFilterData } from '../../datatable/dataTableApi';

export const saveFilterData = async (payload: any, filterPayload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/datatable/filter${payload.url}`;
    const formData = new FormData();
    const apiPayload = {
        ...payload.payload,
        is_pinned: payload.is_pinned,
        filter_payload: JSON.stringify(filterPayload.filter_payload),
        filter_name: payload.saveFilterValue,
    };
    if (payload.newFilter) {
        return await addFilterData(apiPayload);
    } else {
        return await apiHandler(apiPath, apiPayload, false);
    }
};
