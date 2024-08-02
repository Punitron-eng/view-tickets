<template>
    <div
        @click="handleBulkUpdate"
        class="export-btn-outer flex gap-2 items-center bg-[#fff] dark:bg-[#313131] shadow-md rounded-[6px] hover:cursor-pointer px-2 dark:border-[#4d4d4d] border-[1px] w-max text-[12px]"
        v-if="route.params.tabs == 'rev-return-request' && checkCurrentTab != 'rejected' && checkUserType('vendor') && dataVariables.selectedTabHeading && (checkAccessRight ? true : deepCheckAccessRight('domestic', 'reverse_order', 'bulk_update'))"
    >
        <img v-if="!darkModeVal" src="@/assets/images/export-btn.svg" />
        <img v-else src="@/assets/images/dark-mode/dark-export-btn.svg" />
        <span>Bulk Update </span>
    </div>
    <BulkUpdateModal
        :masterDownloadLink="false"
        :visible="showBulkUpdate"
        :isLoading="isLoading"
        @handleChangeVisible="handleChangeShowBulkUpload"
        @returnObjectProps="handleBulkUpdateData"
        ref="clearFile"
        sampleDownloadLink="https://itl-uploads.s3.ap-south-1.amazonaws.com/uploads/reverse_order/return_request_bulk_update/return_request_sample_file.csv"
    />
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { apiHandlerWithFile } from '@/api/common/api.ts';
import { DARKMODE } from '@/store/dark-mode/constants';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import { returnFlowVariables as dataVariables } from '../returnFlow';
import BulkUpdateModal from '@/components/modal/BulkUpdateModal.vue';
const route = useRoute();
const toast = useToast();
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const { checkCurrentTab } = defineProps(['isFullAccess', 'connectPlusAccess', 'getBillingData', 'checkCurrentTab']);
const showBulkUpdate = ref(false);
const clearFile = ref(null);
const isLoading = ref(false);
// funs
const handleBulkUpdate = () => {
    showBulkUpdate.value = !showBulkUpdate.value;
    clearFile.value.clearFileAfterUpload();
};

const handleChangeShowBulkUpload = (updatedValue) => {
    showBulkUpdate.value = updatedValue;
};

const handleBulkUpdateData = async (bulkuploadData) => {
    isLoading.value = true;
    if (bulkuploadData) {
        const payload = {
            process_type: 172,
            uploadBtn1: bulkuploadData,
        };
        const url = 'common-module-v3/bg-process-import-submit-v3.json';
        const result = await apiHandlerWithFile(url, payload, true);
        if (result.status === 'success') {
            isLoading.value = false;
            window.open(dataVariables.value.config.baseUrlPanel + 'view-bg-process-v3', '_blank');
            clearFile.value.clearFileAfterUpload();
            handleChangeShowBulkUpload(false);
        } else {
            isLoading.value = false;
            toast.add({ severity: 'error', detail: result.html_message, life: 3000 });
        }
    } else {
        isLoading.value = false;
        toast.add({ severity: 'error', detail: 'Please Fill All Required Details ', life: 3000 });
    }
};
// funs
</script>
