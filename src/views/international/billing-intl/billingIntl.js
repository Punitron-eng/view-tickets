import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
import { ref } from 'vue'; // Importing watch from Vue 3

export const billingIntlVariable = ref(dataTableVariables.value);
billingIntlVariable.value.storeModalData = [];
billingIntlVariable.value.dtToggleButtons = [
    { label: 'Invoiced', value: 'invoiced', shortLabel: 'I', isActive: true },
    { label: 'Uninvoiced', value: 'uninvoiced', shortLabel: 'U', isActive: false },
];
export const filterModal = commonFilterModal;

export const getSyncDateName = () => {
    if (billingIntlVariable.value.selectedTabName == 'shipping_charges') {
        billingIntlVariable.value.subTabName = 'invoiced';
        billingIntlVariable.value.syncDateName = 'order_date';
    } else if (billingIntlVariable.value.selectedTabName == 'invoice') {
        billingIntlVariable.value.syncDateName = 'invoice_date';
    } else if (billingIntlVariable.value.selectedTabName == 'credit_receipt') {
        billingIntlVariable.value.syncDateName = 'cn_date';
    } else {
        billingIntlVariable.value.syncDateName = 'bad_debt_created_date';
    }
};
