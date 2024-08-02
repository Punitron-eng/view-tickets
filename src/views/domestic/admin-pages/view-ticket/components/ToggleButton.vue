<template>
    <button v-for="button in buttonList" :key="button.number" class="dt-toggle-btns"
        :class="{ active: button.isActive }" @click="toggleButton(button)">
        <div class="desk-toggle-btn" v-if="windowWidth > 1024">
            {{ button.isActive ? button.label : button.shortLabel }}
        </div>
        <div class="mobile-toggle-btn" v-else>
            {{ button.isActive ? button.label : button.shortLabel }}
        </div>
    </button>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { NEWVIEWTICKET } from '@/store/domestic/admin-pages/view-ticket/constants';
import { viewTicketVariables as dataVariables } from '../viewTicketVariables.js';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';

const store = useStore();
const { name } = defineProps(['name']);
const options = {
    open: [
        { label: 'Pending From ITL', shortLabel: 'P', isActive: true, value: 'pending_from_itl' },
        { label: 'Pending From Vendor', shortLabel: 'P', isActive: false, value: 'pending_from_vendor' },
    ],
};
const windowWidth = ref(window.innerWidth);
const buttonList = ref(options[name]);
const toggleButton = async (clickedButton) => {
    store.commit(`${NEWVIEWTICKET.NAME}/resetReverseOrderData`);
    dataVariables.value.isHeaderLoad = true;
    dataVariables.value.isShowCheckbox = false;
    dataVariables.value.isActionColumn = false;
    buttonList.value.forEach((button) => {
        button.isActive = button === clickedButton;
    });
    dataVariables.value.activeToggleBtn = buttonList.value.find((button) => button.isActive);
    dataVariables.value.subTabName = dataVariables.value.activeToggleBtn ? dataVariables.value.activeToggleBtn.value : '';
    await dataTableFncs.getSaveFilterData();
    if (name === 'open') {
        // buttonList.value.pending_complete = dataVariables.value.subTabName;
        const data = {
            pendingFromItl_pendingFromVendor: dataVariables.value.subTabName,
        };
        store.commit(`${NEWVIEWTICKET.NAME}/setSubTabName`, data);
    }
    await dataTableFncs.getColumnData();
    await dataTableFncs.getDataTableData();
    await dataTableFncs.getDataTableDataCount();
};
</script>
