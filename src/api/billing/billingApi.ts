import config from '../../util/config';
import { apiHandler } from '../common/api';
import { addFilterData } from '../datatable/dataTableApi';

export const saveFilterData = async (payload: any, filterPayload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/datatable/filter${payload.url}`;
    const data = {
        filter_name: payload['saveFilterValue'],
        filter_search_order_awb: filterPayload['search'],
        filter_remittance_date: filterPayload['remittance_date'],
        filter_remittance_date_label: filterPayload['remittance_dateLabel'],
        filter_remittance_id: filterPayload['remittance_iD'],
        filter_remittance_status: filterPayload['status'],
        filter_remittance_plan: filterPayload['remittance_plan'],
        filter_vendor_array: filterPayload['vendor_name'],
        filter_cod_generated_from: filterPayload['cod_generated'].min || '',
        filter_cod_generated_to: filterPayload['cod_generated'].max || '',
        filter_bill_adjusted_from: filterPayload['bill_adjusted'].min || '',
        filter_bill_adjusted_to: filterPayload['bill_adjusted'].max || '',
        filter_refund_adjusted_from: filterPayload['refund_adjusted'].min || '',
        filter_refund_adjusted_to: filterPayload['refund_adjusted'].max || '',
        filter_wallet_transfer_from: filterPayload['wallet_transfer'].min || '',
        filter_wallet_transfer_to: filterPayload['wallet_transfer'].max || '',
        filter_cod_remitted_from: filterPayload['cod_remitted'].min || '',
        filter_cod_remitted_to: filterPayload['cod_remitted'].max || '',
        filter_early_cod_from: filterPayload['early_cod'].min || '',
        filter_early_cod_to: filterPayload['early_cod'].max || '',
        filter_advance_hold_from: filterPayload['advance_hold'].min || '',
        filter_advance_hold_to: filterPayload['advance_hold'].max || '',
        filter_customize_column: payload['newColumns'].join(','),
    };
    const apiPayload = {
        ...payload.payload,
        is_pinned: payload.is_pinned,
        column_data: data,
        filter_payload: JSON.stringify(filterPayload.filter_payload),
    };
    if (payload.newFilter) {
        return await addFilterData(apiPayload);
    } else {
        return await apiHandler(apiPath, apiPayload, false);
    }
};
