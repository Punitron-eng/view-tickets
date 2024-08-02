import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
import { ref } from 'vue'; // Importing watch from Vue 3

export const billingVariable = ref(dataTableVariables.value);
billingVariable.value.storeModalData = [];
billingVariable.value.dtToggleButtons = [
    { label: 'Invoiced', value: 'invoiced',  shortLabel: 'I', isActive: true },
    { label: 'Uninvoiced', value: 'uninvoiced', shortLabel: 'U', isActive: false },
];
billingVariable.value.dtToggleButtonsReturn = [
    { label: 'All',value: 'all',  shortLabel: 'A', isActive: true },
    { label: 'Wallet Recharge',value: 'wallet_recharge',  shortLabel: 'WR', isActive: false },
    { label: 'Wallet Deductions',value: 'wallet_deduction',  shortLabel: 'WD', isActive: false },
];
billingVariable.value.activeTabNameForPlaceholder = '';
export const filterModal = commonFilterModal;
export const getSyncDateName = () => {
    if (billingVariable.value.selectedTabName == 'shipping_charges') {
        billingVariable.value.subTabName = 'invoiced';
        billingVariable.value.syncDateName = 'order_date';
    } else if (billingVariable.value.selectedTabName == 'invoice') {
        billingVariable.value.syncDateName = 'invoice_date';
    } else if (billingVariable.value.selectedTabName == 'credit_receipt') {
        billingVariable.value.syncDateName = 'cn_date';
    } else if (billingVariable.value.selectedTabName == 'wallet_transaction') {
        billingVariable.value.subTabName = 'all';
        billingVariable.value.syncDateName = 'wallet_transactions_date';
    } else if (billingVariable.value.selectedTabName == 'remittance') {
        billingVariable.value.syncDateName = 'remittance_date';
    } else if (billingVariable.value.selectedTabName == 'lost' || billingVariable.value.selectedTabName == 'insurance') {
        billingVariable.value.syncDateName = 'order_date';
    } else if (billingVariable.value.selectedTabName == 'cancel') {
        billingVariable.value.syncDateName = 'cancel_request_date';
    } else {
        billingVariable.value.syncDateName = 'bad_debt_created_date';
    }
};
