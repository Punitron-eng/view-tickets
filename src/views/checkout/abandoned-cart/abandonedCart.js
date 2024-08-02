import { ref } from 'vue';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
export const checkoutStoreVariable = ref(dataTableVariables.value);

checkoutStoreVariable.value.dropdownStoreDetails = '';
checkoutStoreVariable.value.selectedSetting = '';
checkoutStoreVariable.value.groupByColumn = ['order_customer_name', 'order_customer_mobile', 'order_customer_email'];
checkoutStoreVariable.value.groupByColumnHeading = 'Customer Details';
export const filterModal = commonFilterModal;
