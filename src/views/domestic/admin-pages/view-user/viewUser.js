import { ref } from 'vue';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
export const viewUserAdminVariables = ref(dataTableVariables.value);
export const filterModal = commonFilterModal;