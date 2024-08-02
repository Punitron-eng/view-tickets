import { ref } from 'vue';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
export const updateCodAmountVariables = ref(dataTableVariables.value);
// weightDiscrepancyVariables.value.isOrderIdModalAvail = false;
export const filterModal = commonFilterModal;
export const staticTabs = [
    { name: 'Update Address', id: '1', value: 'update_address' },
    { name: 'Update COD Amount', id: '1', value: 'update_cod_amount' },
];
