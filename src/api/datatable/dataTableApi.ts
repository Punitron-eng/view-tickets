import { dataTableVariables } from '../../components/itl-dataTable-files/itl-dataTable/commonVariable';
import config from '../../util/config';
import { apiHandler } from '../common/api';

export const getDefaultColumnData = async (columnPayload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/datatable/customized-column${columnPayload.url}`;
    const result = await apiHandler(apiPath, columnPayload.payload);
    return result;
};
export const getSaveFilterData = async (columnPayload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/datatable/filter${columnPayload.url}`;
    const result = await apiHandler(apiPath, columnPayload.payload);
    return result;
};
// For Default Column

// For Page Count
export const getPageCount = async (pageCountPayload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/datatable/page-count${pageCountPayload.url}`;
    const result = await apiHandler(apiPath, pageCountPayload.payload);
    return result;
};
// For Page Count
export const getDeleteUpdateFilterData = async (filterPayload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/datatable/filter${filterPayload.url}`;
    const result = await apiHandler(apiPath, filterPayload.payload, false);
    return result;
};
export const addFilterData = async (filterPayload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/datatable/filter/add`;
    const result = await apiHandler(apiPath, filterPayload, false);
    dataTableVariables.value.apiResponse = result;
    return result;
};

export const saveFilterData = async (payload: any, filterPayload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/datatable/filter${payload.url}`;
    const formData = new FormData();
    console.log(payload, 'filter payload', filterPayload);
    const apiPayload = {
        ...payload.payload,
        is_pinned: payload.is_pinned,
        filter_payload: filterPayload,
        filter_name: payload.saveFilterValue,
        filter_customize_column: payload['newColumns'].join(','),
    };
    if (payload.newFilter) {
        return await addFilterData(apiPayload);
    } else {
        return await apiHandler(apiPath, apiPayload, false);
    }
};

// For Data Table count
export const dataCount = async (data: any, filterPayload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/${data.moduleUrl}/get/count`;
    const filteredPayload = Object.fromEntries(Object.entries(filterPayload).filter(([key, value]) => value !== '' && value !== null && value !== undefined && String(value).length > 0 && JSON.stringify(value) !== JSON.stringify({})));

    const payload = {
        module_name: data.moduleName,
        tab_name: data.selectedTab,
        sub_tab_name: data.subTabName,
        is_active_sub_tab_filter: data.is_active_sub_tab_filter,
        page_start: filterPayload.paginatorStart,
        page_count: data.length,
        filter_payload: filteredPayload,
    };

    const result = await apiHandler(apiPath, payload);
    return result;
};
