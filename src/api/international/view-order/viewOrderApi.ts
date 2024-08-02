import config from '../../../util/config';
import { apiHandler, checkTokenValidation } from '../../common/api';

// For datatable api
export const dataTableData = async (data, filterPayload) => {
    // const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/get/data`;
    const payload = {
        module_name: 'order_intl',
        tab_name: data.selectedTab,
        sub_tab_name: data.subTabName,
        is_active_sub_tab_filter: data.is_active_sub_tab_filter,
        page_start: filterPayload.paginatorStart,
        page_count: data.length,
    };
    const filteredPayload = Object.fromEntries(Object.entries(filterPayload).filter(([key, value]) => value !== '' && value !== null && value !== undefined && value.length > 0 && JSON.stringify(value) !== JSON.stringify({})));
    Object.assign(payload, filteredPayload);
    const result = await apiHandler(apiPath, payload);
    return result;
};
