<template>
    <DialogView v-model:visible="showUploadModal" modal header="Header" dismissableMask :style="{ width: '560px' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @hide="handleChange">
        <template #header>
            <div class="font-bold text-[16px]">Bulk Update</div>
        </template>
        <main class="border-y-[1px] dark:border-[#5d5d5d] px-[32px] py-[16px] flex items-center justify-center flex-col gap-4">
            <div class="w-full h-fit bg-[#e8f2ff] dark:bg-[#4d4d4d] flex flex-col gap-[8px] rounded-xl py-[16px] px-[24px]" id="sample-file-content">
                <p class="text-[#1d252b] dark:text-[#fff] text-[14px] m-0">Please download the sample template and upload your data.</p>
                <a class="font-medium text-[#1279ff] dark:text-[#7aadf0] text-[13px]" :href="props.sampleDownloadLink" download="sample_template.xlsx"> Download Sample Template </a>
            </div>
            <BaseFileUpload fileType="CSV" fileID="123" @listenFileUploadChange="(e) => handleUploadFile(e)" @clearFile="handleclearFile" twClasses="w-[70vw] md:w-[496px] h-44 rounded-xl border-2 dark:border-[#5d5d5d] border-dashed" />
        </main>

        <template #footer>
            <div class="flex items-center justify-between">
                <div>
                    <!-- <p>Download Master Category List</p> -->
                </div>
                <div>
                    <button @click="handleChange" class="border-[#dfe3e6] dark:border-[#5d5d5d] border-[1px] text-[#575f6c] dark:text-[#fff] rounded-[6px] px-[12px] py-[6px]">Cancel</button>
                    <button @click="ShowData" :disabled="props?.isLoading" class="min-w-[70px] bg-[#1279ff] border-[#0168ed] border-[1px] text-[#fff] rounded-[6px] px-[12px] py-[6px]">
                        <div v-if="props?.isLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                        <div v-else>Upload</div>
                    </button>
                </div>
            </div>
        </template>
    </DialogView>
</template>

<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue';
import BaseFileUpload from '../base/BaseFileUpload.vue';

interface Props {
    visible?: boolean;
    sampleDownloadLink?: string;
    isLoading?: boolean;
}
const props: Props = defineProps(['visible', 'sampleDownloadLink', 'isLoading']);
const emits = defineEmits(['handleChangeVisible', 'returnObjectProps']);
const showUploadModal = ref<boolean>(props?.visible || false);
const BulkUploadFile = ref();
watch(
    () => props.visible,
    () => {
        showUploadModal.value = props?.visible || false;
    }
);

const handleChange = () => {
    emits('handleChangeVisible', false);
};
const handleUploadFile = (file: File) => {
    BulkUploadFile.value = file;
};
const ShowData = () => {
    emits('returnObjectProps', BulkUploadFile.value);
};
const handleclearFile = () => {
    BulkUploadFile.value = null;
};
const clearFileAfterUpload = () => {
    BulkUploadFile.value = null;
};
defineExpose({ clearFileAfterUpload });
</script>

<style lang="scss">
@import '@/assets/itl-common-css/common-css.scss';

.p-dialog-content {
    padding-left: 0px !important;
    padding-right: 0px !important;
    padding-bottom: 16px !important;
}

.p-dialog-footer {
    margin-top: -2px;

    @include theme() {
        background-color: theme-get('background') !important;
    }
}
</style>
