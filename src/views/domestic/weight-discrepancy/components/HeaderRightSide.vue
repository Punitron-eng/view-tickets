<template>
    <div
        v-if="(checkUserType('admin') || checkUserType('subadmin')) && (checkAccessRight('weight_discrepancy') ? true : deepCheckAccessRight('domestic', 'weight_discrepancy', 'bulk_update'))"
        @click="handleBulkUpload('Bulk Upload')"
        class="export-btn-outer flex gap-2 items-center bg-[#fff] dark:bg-transparent lg:dark:bg-[#313131] py-[10px] lg:py-1 lg:shadow-md rounded-[6px] hover:cursor-pointer px-2 dark:border-[#4d4d4d] border-[none] lg:border-[1px] w-full lg:w-max text-[12px] h-8"
    >
        <img v-if="!darkModeVal" src="@/assets/images/export-btn.svg" />
        <img v-else src="@/assets/images/dark-mode/dark-export-btn.svg" />
        <span>Bulk Upload </span>
    </div>

    <BulkUploadModal
        v-if="showBulkTitle == 'Bulk Upload'"
        :visible="showBulkUpload"
        title="Bulk Upload Processing Orders via CSV"
        :isloading="setBulkUploadIsLoading"
        maxFileSize="6"
        sampleDownloadLink="https://itl-uploads.s3.ap-south-1.amazonaws.com/uploads/weight_discrepancy/excel/weight_discrepancy_import.csv"
        @handleChangeVisible="handleChangeShowBulkUpload"
        @returnObjectProps="handleBulkUploadData"
    >
    </BulkUploadModal>
</template>

<script setup>
// show Bulk Upload Modal
import { ref, computed } from 'vue';
import { weightDiscrepancyVariables as dataVariables } from '../weightDiscrepancyVariable';
import BulkUploadModal from '@/components/modal/BulkUploadModal.vue';
import { checkAccessRight, deepCheckAccessRight, checkUserType } from '../../../../util/commonHandlers';
import { useStore } from 'vuex';
import { DARKMODE } from '@/store/dark-mode/constants';
import { useToast } from 'primevue/usetoast';
import { apiHandlerWithFile } from '@/api/common/api.ts';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const toast = useToast();

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
                process_type: 153,
                file: bulkuploadData.BulkUploadFile,
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
