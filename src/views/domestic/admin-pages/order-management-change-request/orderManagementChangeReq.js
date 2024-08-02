import { ref } from 'vue';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
export const orderManagementVariables = ref(dataTableVariables.value);
orderManagementVariables.value.dtToggleButtonsReturn = [
    { label: 'All',value: 'all',  shortLabel: 'All', isActive: true },
    { label: 'Not Updated',value: 'not_updated',  shortLabel: 'Not Updated', isActive: false },
    { label: 'Updated',value: 'updated',  shortLabel: 'Updated', isActive: false },
];
export const filterModal = commonFilterModal;