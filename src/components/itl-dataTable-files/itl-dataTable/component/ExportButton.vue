<script setup>
import { defineProps } from 'vue';
const { exportData, darkModeVal, isLoading } = defineProps(['exportData', 'darkModeVal', 'isLoading']);
import { dataTableVariables } from '../../../../components/itl-dataTable-files/itl-dataTable/commonVariable';
</script>

<template>
    <div class="export-btn-outer" @click="exportData('Export_Data')" :class="{ 'pointer-events-none': dataTableVariables.isExportLoading }">
        <img v-if="!darkModeVal" src="@/assets/images/export-btn.svg" class="w-[12px]" />
        <img v-else src="@/assets/images/dark-mode/dark-export-btn.svg" class="w-[12px]" />
        <div class="flex items-center justify-center" v-if="dataTableVariables.isExportLoading">
            <i class="pi pi-spin pi-spinner loading-icon ml-4" aria-hidden="true"></i>
        </div>
        <span v-else>Export</span>
    </div>
</template>
