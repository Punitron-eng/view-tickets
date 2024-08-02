import { ref } from 'vue';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
export const weightDiscrepancyVariables = ref(dataTableVariables.value);
weightDiscrepancyVariables.value.isOrderIdModalAvail = false;
weightDiscrepancyVariables.value.isAcceptDiscrepancy = false;
export const filterModal = commonFilterModal;
