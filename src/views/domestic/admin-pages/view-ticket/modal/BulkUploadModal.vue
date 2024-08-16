<template>
    <div @click="handleBulkUpload('Bulk Upload')" v-if="checkAccessRight() ? true : deepCheckAccessRight('domestic', 'support_ticket', 'import')" class="export-btn-outer flex gap-2 items-center bg-[#fff] dark:bg-[#313131] shadow-md rounded-[6px] hover:cursor-pointer px-2 dark:border-[#4d4d4d] border-[1px] w-max text-[12px]">
        <img v-if="!darkModeVal" src="@/assets/images/export-btn.svg" />
        <img v-else src="@/assets/images/dark-mode/dark-export-btn.svg" />
        <span>Bulk Upload </span>
    </div>

    <BulkUploadModal
        v-if="showBulkTitle == 'Bulk Upload'"
        :visible="showBulkUpload"
        title="Bulk Upload Processing via CSV"
        :isloading="setBulkUploadIsLoading"
        maxFileSize="6"
        :sampleDownloadLink="config.baseUrlUploads + (topHeader['user_type'] == '3' ? 'support_tickets/support_tickets_bulk_upload/excel/support_ticket_bulk_upload.csv' : 'tickets/bulk-upload-tickets-sample-file-alpha-v3.csv')"
        @handleChangeVisible="handleChangeShowBulkUpload"
        @returnObjectProps="handleBulkUploadData"
    >
    </BulkUploadModal>
</template>

<script setup>
// show Bulk Upload Modal
import { ref, computed } from 'vue';
import { viewTicketVariables as dataVariables } from '../viewTicketVariables';
import BulkUploadModal from '@/components/modal/BulkUploadModal.vue';
import { useStore } from 'vuex';
import { DARKMODE } from '@/store/dark-mode/constants';
import { useToast } from 'primevue/usetoast';
import { apiHandlerWithFile } from '@/api/common/api.ts';
import { checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import config from '@/util/config';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const toast = useToast();
const topHeader = JSON.parse(localStorage.getItem('top_header'));
const store = useStore();
const showBulkUpload = ref(false);
const showBulkTitle = ref('');
const setBulkUploadIsLoading = ref(false);

const handleBulkUpload = (title) => {
    showBulkTitle.value = title;
    showBulkUpload.value = !showBulkUpload.value;
};
const handleChangeShowBulkUpload = (hidevalue) => {
    showBulkUpload.value = hidevalue;
};

const handleBulkUploadData = async (bulkuploadData) => {
    setBulkUploadIsLoading.value = true;
    console.log(bulkuploadData);
    if (bulkuploadData.BulkUploadFile) {
        try {
            const payload = {
                process_type: topHeader['user_type'] == '3' ? 176 : 73,
                input_bulk_upload: bulkuploadData.BulkUploadFile,
            };
            const url = 'common-module-v3/bg-process-import-submit-v3.json';

            const result = await apiHandlerWithFile(url, payload);
            if (result.status === 'success') {
                toast.add({ severity: 'success', detail: result.html_message, life: 3000 });
                setBulkUploadIsLoading.value = false;
                window.open(dataVariables.value.config.baseUrlPanel + 'view-bg-process-v3', '_blank');
                handleChangeShowBulkUpload(false);
            } else {
                setBulkUploadIsLoading.value = false;
                toast.add({ severity: 'error', detail: result.html_message, life: 3000 });
            }
        } catch (err) {
            setBulkUploadIsLoading.value = false;
            console.log(err.message);
        }
    } else {
        setBulkUploadIsLoading.value = false;
        toast.add({ severity: 'error', detail: 'Please Fill All Required Details', life: 3000 });
    }
};

// show Bulk Upload Modal
</script>

<style>
.export-btn-outer {
    margin-right: 8px !important;
}
</style>
