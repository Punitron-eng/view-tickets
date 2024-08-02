<template>
    <div v-if="!mode">
        <img v-if="option.pin == 0" src="@/assets/images/save-filter-pin.svg" alt="view save filter" @click="checkPin(option)" class="w-[19px]" />
        <img v-else src="@/assets/images/SFpin.svg" alt="view save filter" @click="checkPin(option)" class="w-[19px]" />
    </div>
    <div v-else>
        <img v-if="option.pin == 0" src="@/assets/images/dark-mode/dark-save-filter-pin.svg" alt="view save filter" @click="checkPin(option)" class="w-[19px]" />
        <img v-else src="@/assets/images/dark-mode/dark-SFpin.svg" alt="view save filter" @click="checkPin(option)" class="w-[19px]" />
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { RETURN } from '@/store/domestic/return-flow/constants';
import { returnFlowVariables as dataVariables } from '../returnFlow.js';
const { option, mode, onReArrange } = defineProps(['option', 'mode', 'onReArrange']);
const store = useStore();

const checkPin = (saveFilter) => {
    const tempFilter = [...dataVariables.value.savedFilterData];

    const index = tempFilter.findIndex((item) => item.value === saveFilter.name);
    if (parseInt(saveFilter.pin) === 0) {
        tempFilter[index].pin = 1;
    } else {
        tempFilter[index].pin = 0;
    }
    dataVariables.value.savedFilterData = tempFilter;

    onReArrange();
    // backToTop();
    const data = {
        moduleName: 'reverse_order',
        reOrderSaveFilter: dataVariables.value.saveFilterOrder,
        selectedTab: dataVariables.value.selectedTabName,
    };
    store.dispatch(`${RETURN.NAME}/getSavedFilteredData`, data);
};
</script>
