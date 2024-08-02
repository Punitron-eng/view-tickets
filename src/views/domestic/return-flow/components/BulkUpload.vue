<script setup>
import { defineProps } from 'vue';
import { returnFlowVariables as dataVariables } from '../returnFlow.js';
const { darkModeVal } = defineProps(['darkModeVal']);
const handleBulkUpload = (title) => {
    dataVariables.value.showBulkTitle = title;
    dataVariables.value.showBulkUpload = !dataVariables.value.showBulkUpload;
};
</script>

<template>
    <div @click="handleBulkUpload('Bulk Upload')" class="export-btn-outer flex gap-2 items-center bg-[#fff] dark:bg-[#313131] shadow-md rounded-[6px] hover:cursor-pointer px-2 dark:border-[#4d4d4d] border-[1px] w-max text-[12px]">
        <img v-if="!darkModeVal" src="@/assets/images/export-btn.svg" />
        <img v-else src="@/assets/images/dark-mode/dark-export-btn.svg" />
        <span>Bulk upload </span>
    </div>
</template>
