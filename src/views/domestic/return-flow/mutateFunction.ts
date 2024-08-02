// export const createViewSaveFilteredData = (item: any, selectedTab: string): any => {
//     const filteredItem: any = {};
//     // Common properties
//     filteredItem.name = item.filter_name;
//     filteredItem.is_pinned = item.is_pinned;
//     filteredItem.id = item.id;
//     filteredItem.customer = item.filter_customer_details || '';
//     filteredItem.order_id = item.filter_order_id || '';
//     filteredItem.items = item.filter_product_qty || '';
//     filteredItem.order_date = {
//         id: item.filter_order_date_label || '',
//         value: item.filter_order_date || '',
//         label: item.filter_order_date_label || '',
//     };

//     // Requested date
//     filteredItem.requested_date = {
//         id: selectedTab === 'rev_return_request' ? item.filter_requested_date_label || '' : '',
//         value: selectedTab === 'rev_return_request' ? item.filter_requested_date || '' : '',
//         label: selectedTab === 'rev_return_request' ? item.filter_requested_date_label || '' : '',
//     };

//     // Rejected date
//     filteredItem.rejected_date = {
//         id: selectedTab === 'rev_return_request' ? item.filter_rejected_date_label || '' : '',
//         value: selectedTab === 'rev_return_request' ? item.filter_rejected_date || '' : '',
//         label: selectedTab === 'rev_return_request' ? item.filter_rejected_date_label || '' : '',
//     };

//     // Amount
//     filteredItem.amount = {
//         min: selectedTab !== 'rev_return_request' ? item.filter_min_amount || '' : '',
//         max: selectedTab !== 'rev_return_request' ? item.filter_max_amount || '' : '',
//     };

//     // Refund amount
//     filteredItem.refund_amount = {
//         min: selectedTab === 'rev_return_request' ? item.filter_min_amount || '' : '',
//         max: selectedTab === 'rev_return_request' ? item.filter_max_amount || '' : '',
//     };

//     // Status
//     filteredItem.dt_status = {
//         id: selectedTab !== 'rev_return_request' && selectedTab !== 'rev_delivered' ? (item.filter_status && item.filter_status?.[0].id !== undefined ? tempCheckboxData('filter_status', item) : []) : [],
//         value: selectedTab !== 'rev_return_request' && selectedTab !== 'rev_delivered' ? (item.filter_status && item.filter_status?.[0].id !== undefined ? tempCheckboxData('filter_status', item).value : []) : [],
//     };

//     // Payment
//     filteredItem.payment = {
//         id: item.filter_payment && item.filter_payment?.[0].id !== undefined ? tempCheckboxData('filter_payment', item).id : [],
//         value: item.filter_payment && item.filter_payment?.[0].id !== undefined ? tempCheckboxData('filter_payment', item).value : [],
//     };

//     // Return reason
//     filteredItem.return_reason = {
//         id: selectedTab === 'rev_return_request' ? (item.filter_return_reason && item.filter_return_reason?.[0].id !== undefined ? tempCheckboxData('filter_return_reason', item).id : []) : [],
//         value: selectedTab === 'rev_return_request' ? (item.filter_return_reason && item.filter_return_reason?.[0].id !== undefined ? tempCheckboxData('filter_return_reason', item).value : []) : [],
//     };

//     // Origin warehouse
//     filteredItem.origin_warehouse = {
//         id: selectedTab === 'rev_return_request' ? (item.filter_origin_warehouse && item.filter_origin_warehouse?.[0].id !== undefined ? tempCheckboxData('filter_origin_warehouse', item).id : []) : [],
//         value: selectedTab === 'rev_return_request' ? (item.filter_origin_warehouse && item.filter_origin_warehouse?.[0].id !== undefined ? tempCheckboxData('filter_origin_warehouse', item).value : []) : [],
//     };

//     // AWB number
//     filteredItem.awb_no = {
//         id: selectedTab !== 'rev_return_request' ? (item.filter_shipping && item.filter_shipping?.[0].id !== undefined ? tempCheckboxData('filter_shipping', item).id : []) : [],
//         value: selectedTab !== 'rev_return_request' ? (item.filter_shipping && item.filter_shipping?.[0].id !== undefined ? tempCheckboxData('filter_shipping', item).value : []) : [],
//     };

//     // Vendor name
//     filteredItem.vendor_name = {
//         id: item.filter_vendor_array && item.filter_vendor_array?.[0].id !== undefined ? tempCheckboxData('filter_vendor_array', item).id : [],
//         value: item.filter_vendor_array && item.filter_vendor_array?.[0].id !== undefined ? tempCheckboxData('filter_vendor_array', item).value : [],
//     };

//     // Delivery warehouse
//     filteredItem.delivery_warehouse = {
//         id: selectedTab !== 'rev_return_request' ? (item.filter_delivery_warehouse && item.filter_delivery_warehouse?.[0].id !== undefined ? tempCheckboxData('filter_delivery_warehouse', item).id : []) : [],
//         value: selectedTab !== 'rev_return_request' ? (item.filter_delivery_warehouse && item.filter_delivery_warehouse?.[0].id !== undefined ? tempCheckboxData('filter_delivery_warehouse', item).value : []) : [],
//     };

//     filteredItem.search = item.filter_search_order_awb || '';
//     filteredItem.vendorData = [];
//     filteredItem.requested_rejected = '';

//     return filteredItem;
// };

// export const tempCheckboxData = (filterField: string, item: any): any => {
//     const tempData = item[filterField];
//     const data = { id: [], value: [] };
//     for (const key in tempData) {
//         if (tempData[key].id !== '') {
//             data.id.push(tempData[key].id);
//             data.value.push(tempData[key].value);
//         }
//     }
//     return data;
// };

///---------------------------------------------------------------------- one more solution with the help of function

export const createViewSaveFilteredData = (item: any, selectedTabKey: string): any => {
    const filteredItem: any = {};
    // Common properties
    filteredItem.name = item.filter_name;
    filteredItem.is_pinned = item.is_pinned;
    filteredItem.id = item.id;
    filteredItem.customer = item.filter_customer_details || '';
    filteredItem.order_id = item.filter_order_id || '';
    filteredItem.items = item.filter_product_qty || '';
    filteredItem.order_date = getFilteredObject(selectedTabKey, 'filter_order_date', item);

    // Requested date
    filteredItem.requested_date = getFilteredObject(selectedTabKey, 'filter_requested_date', item);

    // Rejected date
    filteredItem.rejected_date = getFilteredObject(selectedTabKey, 'filter_rejected_date', item);

    // Amount
    filteredItem.amount = getFilteredObject(selectedTabKey, 'filter_min_amount', 'filter_max_amount', item);

    // Refund amount
    filteredItem.refund_amount = getFilteredObject(selectedTabKey, 'filter_min_amount', 'filter_max_amount', item);

    // Status
    filteredItem.dt_status = getFilteredObject(selectedTabKey, 'filter_status', item);

    // Payment
    filteredItem.payment = getFilteredObject(item, 'filter_payment', '');

    // Return reason
    filteredItem.return_reason = getFilteredObject(selectedTabKey, 'filter_return_reason', item);

    // Origin warehouse
    filteredItem.origin_warehouse = getFilteredObject(selectedTabKey, 'filter_origin_warehouse', item);

    // AWB number
    filteredItem.awb_no = getFilteredObject(selectedTabKey, 'filter_shipping', item);

    // Vendor name
    filteredItem.vendor_name = getFilteredObject(item, 'filter_vendor_array', '');

    // Delivery warehouse
    filteredItem.delivery_warehouse = getFilteredObject(selectedTabKey, 'filter_delivery_warehouse', item);

    filteredItem.search = item.filter_search_order_awb || '';
    filteredItem.vendorData = [];
    filteredItem.requested_rejected = '';

    return filteredItem;
};

const getFilteredObject = (selectedTabKey: string, filterField: string, item: any, secondFilterField?: string): any => {
    const data: any = {
        id: '',
        value: '',
        label: '',
        min: '',
        max: '',
    };

    if (filterField === 'filter_order_date' || filterField === 'filter_requested_date' || filterField === 'filter_rejected_date') {
        data.id = selectedTabKey === 'rev_return_request' ? item[`${filterField}_label`] || '' : '';
        data.value = selectedTabKey === 'rev_return_request' ? item[filterField] || '' : '';
        data.label = selectedTabKey === 'rev_return_request' ? item[`${filterField}_label`] || '' : '';
    } else if (filterField === 'filter_min_amount' || filterField === 'filter_max_amount') {
        data.min = selectedTabKey !== 'rev_return_request' ? item[filterField] || '' : '';
        data.max = selectedTabKey !== 'rev_return_request' ? item[secondFilterField!] || '' : '';
    } else {
        const tempData = item[filterField];
        if (tempData && tempData?.[0].id !== undefined) {
            const checkboxData = tempCheckboxData(filterField, item);
            data.id = checkboxData.id;
            data.value = checkboxData.value;
        }
    }

    return data;
};

export const tempCheckboxData = (filterField: string, item: any): any => {
    const tempData = item[filterField];
    const data = { id: [], value: [] };
    for (const key in tempData) {
        if (tempData[key].id !== '') {
            data.id.push(tempData[key].id);
            data.value.push(tempData[key].value);
        }
    }
    return data;
};
