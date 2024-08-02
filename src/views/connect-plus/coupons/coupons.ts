import { ref } from 'vue';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
export const couponsVariables = ref(dataTableVariables.value);
// weightDiscrepancyVariables.value.isOrderIdModalAvail = false;
export const filterModal = commonFilterModal;
