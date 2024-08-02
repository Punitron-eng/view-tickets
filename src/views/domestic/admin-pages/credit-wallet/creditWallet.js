import { ref } from 'vue';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
export const creditWalletVariables = ref(dataTableVariables.value);
creditWalletVariables.value.selectedAmount = 2000;
export const filterModal = commonFilterModal;