import { FilterMatchMode } from 'primevue/api';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
import { ref } from 'vue'; // Importing watch from Vue 3

export const checkoutStoreVariable = ref(dataTableVariables.value);
checkoutStoreVariable.value.storeModalData = [];
checkoutStoreVariable.value.groupByColumn = ['order_customer_name', 'order_customer_mobile', 'order_customer_email'];
checkoutStoreVariable.value.groupByColumnHeading = 'Customer Details';
export const filterModal = commonFilterModal;
