<template>
    <button v-for="button in buttonList" :key="button.number" class="dt-toggle-btns w-fit" :class="{ active: button.isActive }" @click="toggleButton(button)">
        <div class="mobile-toggle-btn w-fit" style="display: none">
            {{ (button.isActive && button.label === 'pending') || (button.isActive && button.label === 'complete') ? button.label : button.shortLabel }}
        </div>
        <div class="desk-toggle-btn w-fit px-3">
            {{ button.label }}
        </div>
    </button>
</template>
<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { ORDERMANAGEMENTREQ } from '@/store/domestic/admin-pages/order-management-change-request/constants';
import { orderManagementVariables as dataVariables } from '../orderManagementChangeReq.js';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';

const store = useStore();
const { name } = defineProps(['name']);
const options = [
    { label: 'All', value: 'all', shortLabel: 'All', isActive: true },
    { label: 'Not Updated', value: 'not_updated', shortLabel: 'Not Updated', isActive: false },
    { label: 'Updated', value: 'updated', shortLabel: 'Updated', isActive: false },
];
const buttonList = ref(options);
const toggleButton = async (clickedButton) => {
    buttonList.value.forEach((button) => {
        button.isActive = button === clickedButton;
    });
    dataVariables.value.activeToggleBtn = buttonList.value.find((button) => button.isActive);
    // dataVariables.value.subTabName = dataVariables.value.activeToggleBtn ? dataVariables.value.activeToggleBtn.value : '';

    // buttonList.value.selectedSubTab = dataVariables.value.subTabName;
    // const data = {
    //     selectedSubTab: dataVariables.value.subTabName,
    // };
    // store.commit(`${ORDERMANAGEMENTREQ.NAME}/setSubTabName`, data);

    await dataTableFncs.getDataTableData();
    await dataTableFncs.getColumnData();
};
</script>
