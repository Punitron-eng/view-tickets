import { ref } from 'vue';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
export const viewOrderVariables = ref(dataTableVariables.value);
export const filterModal = commonFilterModal;
export const staticTabs = [
    { name: 'Store Order', id: '1', value: 'store_order' },
    { name: 'Ready To Dispatch', id: '1', value: 'rtd' },
    { name: 'Manifest', id: '1', value: 'manifest' },
    { name: 'Intransit', id: '1', value: 'intransit' },
    { name: 'Delivered', id: '1', value: 'delivered' },
    { name: 'Undelivered', id: '1', value: 'undelivered' },
    { name: 'All', id: '1', value: 'all' },
];
