<template>
    <button v-for="button in buttonList" :key="button.number" class="dt-toggle-btns w-fit" :class="{ active: button.isActive }" @click="toggleButton(button)">
        <div class="mobile-toggle-btn w-fit" style="display: none">
            {{ (button.isActive && button.label === 'pending') || (button.isActive && button.label === 'complete') ? button.label : button.shortLabel }}
        </div>
        <div class="desk-toggle-btn w-fit px-3">
            {{ (button.isActive && button.label === 'pending') || (button.isActive && button.label === 'complete') ? button.label : button.label }}
        </div>
    </button>
</template>
<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { BILLINGINTL } from '@/store/international/billing-intl/constants';
import { billingIntlVariable as dataVariables } from '../billingIntl.js';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';

const store = useStore();
const { name } = defineProps(['name']);
const options = {
    shipping_charges: [
        { label: 'Invoiced', value: 'invoiced', shortLabel: 'I', isActive: true },
        { label: 'Uninvoiced', value: 'uninvoiced', shortLabel: 'U', isActive: false },
    ],
};
const buttonList = ref(options[name]);
const toggleButton = async (clickedButton) => {
    // store.commit(`${RETURN.NAME}/resetReverseOrderData`);
    buttonList.value.forEach((button) => {
        button.isActive = button === clickedButton;
    });
    dataVariables.value.activeToggleBtn = buttonList.value.find((button) => button.isActive);
    dataVariables.value.subTabName = dataVariables.value.activeToggleBtn ? dataVariables.value.activeToggleBtn.value : '';

    // if (name === 'wallet_transaction') {
    //     buttonList.value.all_recharge_deduction = dataVariables.value.subTabName;
    //     const data = {
    //         all_recharge_deduction: dataVariables.value.subTabName,
    //         invoice_unInvoice: 'invoiced',
    //     };
    //     store.commit(`${BILLINGINTL.NAME}/setSubTabName`, data);
    // } else {
        buttonList.value.invoice_unInvoice = dataVariables.value.subTabName;
        const data = {
            // all_recharge_deduction: 'all',
            invoice_unInvoice: dataVariables.value.subTabName,
        };
        store.commit(`${BILLINGINTL.NAME}/setSubTabName`, data);
        // if (buttonList.value.requested_rejected == 'rejected') {
        //     dataVariables.value.isActionColumn = false;
        // } else {
        //     dataVariables.value.isActionColumn = true;
        // }
    // }
    await dataTableFncs.getDataTableData();
    await dataTableFncs.getColumnData();
};
</script>
