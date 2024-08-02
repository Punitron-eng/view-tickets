import { FilterMatchMode } from 'primevue/api';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
import { ref } from 'vue'; // Importing watch from Vue 3

export const checkoutStoreVariable = ref(dataTableVariables.value);

export const filterModal = commonFilterModal;
