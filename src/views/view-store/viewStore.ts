import { ref, computed } from "vue"

export interface APIResponse {
    all_get_my_store_data_array: {
        id: string;
        is_amazon_store_connected: string;
        is_connected: string;
        last_inventory_sync_date: string;
        last_order_sync_date: string;
        platform_details: {
            id: string,
            platform_id: string,
            platform_table_name: string,
            status: string,
            store_logo: string,
            store_name: string,
            store_svg_logo: string,
        }
        platform_id: string;
        status: string;
        store_name: string;
        store_url: string;
        user_id: string;
    },
    status: string,
    all_amazon_sub_platform_id_array: []
}

export interface VariablesType {
    vendorModal: boolean,
    selectedVendor: Array<string> | [],
    data: [APIResponse] | null,
    limitCount: number,
    // limitCountSearch: number,
    all_amazon_sub_platform_id_array: Array<number>,
    search: string
}

export const variables = ref<VariablesType>({
    vendorModal: false,
    selectedVendor: [],
    data: null,
    limitCount: 12,
    // limitCountSearch: ,
    all_amazon_sub_platform_id_array: [7,23,24,25,26,27,28,29,30,31],
    search: ''
})

export const dateConversion = (date: string): string => {
    // Create a new Date object
    const dateObj = new Date(date);

    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Extract date components
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');

    // Format the date
    const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

export const formatImageName = (name: string): string => {
    return 'store-' + name.replace(/\.svg$/, '').toLowerCase();
}