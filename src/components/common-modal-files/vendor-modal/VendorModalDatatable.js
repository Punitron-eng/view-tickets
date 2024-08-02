import { ref } from 'vue';
import config from '@/util/config';
export const VendorModalDatatable = ref({
    limit: 50,
    start: 0,
    action: 'inactive',
    searchVendorName: '',
    inputType: 'checkbox',
    checkboxValue: [],
    isShowDiv: false,
    responseText: '',
    config: config,
    showVendorError: false,
    isVendorSearch: false,
});
