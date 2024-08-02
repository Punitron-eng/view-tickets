<script setup>
import { returnFlowVariables } from '../returnFlow';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import { DARKMODE } from '@/store/dark-mode/constants';
import { checkUserType } from '@/util/commonHandlers';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const dataVariables = returnFlowVariables;
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

</script>

<template>
    <div v-if="(checkUserType('admin') || checkUserType('subadmin')) && dataVariables.router.currentRoute.params.tabs != 'rev-return-request' && dataVariables.selectedTabHeading"
        class="export-btn-outer flex gap-2 items-center bg-[#fff] dark:bg-[#313131] shadow-md rounded-[6px] hover:cursor-pointer px-2 dark:border-[#4d4d4d] border-[1px] w-max text-[12px]"
        @click="dataTableFncs.exportData('Export_count')">
        <div>
            <img v-if="!darkModeVal" src="@/assets/images/export-btn.svg" class="w-[12px]" />
            <img v-else src="@/assets/images/dark-mode/dark-export-btn.svg" class="w-[12px]" />
        </div>
        <div>Export Order Count</div>
    </div>
</template>
