<template>
    <DialogView id="bulkUpload" appendTo="self" v-model:visible="showUploadModal" modal :draggable="false" header="Header" dismissableMask :style="{ width: '560px' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @hide="handleChange">
        <template #header>
            <div class="font-bold text-[16px]">{{ props.title }}</div>
        </template>
        <main class="border-y-[1px] dark:border-[#5d5d5d] px-[32px] py-[16px] flex items-center justify-center flex-col gap-3">
            <div class="w-fit md:w-full h-fit bg-[#e8f2ff] dark:bg-[#4d4d4d] flex flex-col gap-[8px] rounded-xl py-[16px] px-[24px]" id="sample-file-content">
                <p class="text-[#1d252b] dark:text-[#fff] text-[14px] m-0">Please download the below sample file and upload your data.</p>
                <a class="font-medium text-[#1279ff] dark:text-[#7aadf0] text-[13px]" :href="props.sampleDownloadLink" :download="props.sampleDownloadLink"> Download Sample Template </a>
            </div>
            <div class="w-full">
                <slot name="vendorModal"></slot>
            </div>
            <div class="w-full">
                <slot name="DropdownWarehouse"></slot>
            </div>
            <BaseFileUpload
                ref="fileUpload"
                fileID="file-upload"
                fileType="CSV"
                @listenFileUploadChange="(e) => handleUploadFile(e)"
                @clear-file="clearFile()"
                twClasses="w-[80vw] md:w-[496px] h-44 rounded-xl border-2 dark:border-[#5d5d5d] border-dashed"
            />
        </main>

        <template #footer>
            <div class="flex items-center" :class="props?.masterDownloadLink ? 'justify-between' : 'justify-end'">
                <div v-if="props?.masterDownloadLink">
                    <p>Download Master Category List</p>
                </div>
                <div>
                    <button @click="handleChange" class="border-[#dfe3e6] dark:border-[#5d5d5d] border-[1px] dark:text-[#fff] text-[#575f6c] rounded-[6px] px-[12px] py-[6px]">Cancel</button>
                    <button @click="ShowData" :disabled="isLoading" class="min-w-[70px] bg-[#1279ff] border-[#0168ed] border-[1px] text-[#fff] rounded-[6px] px-[12px] py-[6px]">
                        <div v-if="isLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
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
    title?: string;
    selectedVendorId?: Number | string;
    pickupWareHouse?: object;
    sampleDownloadLink?: string;
    masterDownloadLink?: string;
    isloading?: boolean;
    maxFileSize?: Number | string;
}

const props: Props = defineProps(['visible', 'title', 'selectedVendorId', 'pickupWareHouse', 'sampleDownloadLink', 'isloading', 'maxFileSize']);
const emits = defineEmits(['handleChangeVisible', 'returnObjectProps']);
const showUploadModal = ref<boolean>(props?.visible || false);
const BulkUploadProps = ref(props);
const BulkUploadFile = ref();
const isLoading = ref(props?.isloading || false);
const fileUpload = ref(null);
watch(
    () => props.visible,
    () => {
        showUploadModal.value = props?.visible || false;
    }
);
watch(
    () => props.isloading,
    () => {
        isLoading.value = props?.isloading || false;
    }
);

const clearFile = () => {
    BulkUploadFile.value = null;
};
defineExpose({
    clearFile,
});

const handleChange = () => {
    emits('handleChangeVisible', false);
};
const handleUploadFile = (file: File) => {
    BulkUploadFile.value = file;
};
const ShowData = () => {
    isLoading.value = true;
    const combineData = {
        BulkUploadProps: BulkUploadProps.value,
        BulkUploadFile: BulkUploadFile.value,
    };
    emits('returnObjectProps', combineData);
    isLoading.value = false;
};
</script>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

.p-dialog-content {
    padding-left: 0px !important;
    padding-right: 0px !important;
    padding-bottom: 16px !important;
}
.p-dialog .p-dialog-header .p-dialog-header-icon:enabled:hover {
    color: #83888f !important;
}
.p-dialog-header-icon {
    @media screen and (max-width: 380px) {
        top: -11px !important;
    }
}
.p-dialog .p-dialog-content {
    padding: 0px !important;
}
.p-dialog-footer {
    @include theme() {
        background-color: theme-get('background') !important;
    }
    width: 100%;
    padding-top: 16px !important;
    justify-content: flex-end;
}

.p-dialog-header {
    width: 100%;
}
</style>
