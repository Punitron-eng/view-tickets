<template>
    <button v-for="button in buttonList" :key="button.number" class="dt-toggle-btns" :class="{ active: button.isActive }" @click="toggleButton(button)">
        <div class="mobile-toggle-btn" style="display: none">
            {{ (button.isActive && button.label === 'pending') || (button.isActive && button.label === 'complete') ? button.label : button.shortLabel }}
        </div>
        <div class="desk-toggle-btn">
            {{ (button.isActive && button.label === 'pending') || (button.isActive && button.label === 'complete') ? button.label : button.label }}
        </div>
    </button>
</template>
<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { RETURN } from '@/store/domestic/return-flow/constants';
import { returnFlowVariables as dataVariables } from '../returnFlow.js';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';

const store = useStore();
const { name } = defineProps(['name']);
const options = {
    rev_manifest: [
        { label: 'pending', shortLabel: 'P', isActive: true, value: 'pending' },
        { label: 'complete', shortLabel: 'C', isActive: false, value: 'complete' },
    ],
    rev_return_request: [
        { label: 'requested', shortLabel: 'R', isActive: true, value: 'requested' },
        { label: 'rejected', shortLabel: 'R', isActive: false, value: 'rejected' },
    ],
};
const buttonList = ref(options[name]);
const toggleButton = async (clickedButton) => {
    store.commit(`${RETURN.NAME}/resetReverseOrderData`);
    dataVariables.value.isHeaderLoad = true;
    dataVariables.value.isShowCheckbox = false;
    dataVariables.value.isActionColumn = false;
    buttonList.value.forEach((button) => {
        button.isActive = button === clickedButton;
    });
    dataVariables.value.activeToggleBtn = buttonList.value.find((button) => button.isActive);
    dataVariables.value.subTabName = dataVariables.value.activeToggleBtn ? dataVariables.value.activeToggleBtn.label : '';
    await dataTableFncs.getSaveFilterData();
    if (name === 'rev_manifest') {
        // buttonList.value.pending_complete = dataVariables.value.subTabName;
        const data = {
            pending_complete: dataVariables.value.subTabName,
            requested_rejected: 'requested',
        };
        store.commit(`${RETURN.NAME}/setSubTabName`, data);
    } else {
        // buttonList.value.requested_rejected = dataVariables.value.subTabName;
        const data = {
            pending_complete: 'pending',
            requested_rejected: dataVariables.value.subTabName,
        };
        store.commit(`${RETURN.NAME}/setSubTabName`, data);
        if (dataVariables.value.subTabName == 'rejected') {
            dataVariables.value.isShowCheckbox = true;
            dataVariables.value.isActionColumn = false;
        } else {
            dataVariables.value.isShowCheckbox = true;
            dataVariables.value.isActionColumn = true;
        }
    }
    await dataTableFncs.getColumnData();
    await dataTableFncs.getDataTableData();
};
</script>
