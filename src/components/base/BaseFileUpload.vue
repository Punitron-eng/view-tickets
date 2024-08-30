<script setup lang="ts">
import { useStore } from 'vuex';
import getImg from '../../util/getImg';
import { useDropZone } from '@vueuse/core';
import { useToast } from 'primevue/usetoast';
import { DARKMODE } from '../../store/dark-mode/constants';
import { ref, defineProps, defineEmits, defineExpose, computed } from 'vue';

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const props = defineProps({
    fileID: { type: String, required: false },
    fileType: { type: String as () => FileTypes, required: true },
    maxFileSize: { type: Number, required: false },
    twClasses: { type: String, required: false },
    otherParams: { type: Object, required: false },
    inputTypeFileUpload: { type: Boolean, required: false },
    defaultValueName: { type: String, required: false },
    allowedExtensions: { type: Array, required: false },
});

const emits = defineEmits<{
    listenFileUploadChange: [val: File];
    clearFile: [val: null];
}>();

const defaultFileClasses = 'border-[1px] border-[#d1d5db] h-[38px] flex items-center rounded-[6px] p-[0.75rem] dark:border-[#474747]';
const defaultClasses = 'w-[auto] md:w-[420px] h-44 rounded-xl border-2 dark:border-[#5d5d5d] border-dashed';

type FileTypes = '*' | 'Image' | 'CSV';

const selectedImage = ref();
const allowedExtensions = ['pdf', 'doc', 'docx', 'csv', 'xls', 'xlsx', 'wav', 'mp3', 'csv', 'mp4', 'jpg', 'jpeg', 'png'];

const dropZoneRef = ref<HTMLDivElement>();
const fileInfo = ref<File | null>(null);
// Opens the file picker dialog.
const browseImage = () => {
    const fileInput = document.getElementById(props.fileID || '') as HTMLInputElement | null;
    if (fileInput) {
        fileInput.value = '';
        fileInput.click();
    }
};
// Handles the file selection process.
const onFileSelect = async (event: any) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    if (!(file && validateFile(file))) {
        return;
    }
    selectedImage.value = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
    fileInfo.value = file;
    emits('listenFileUploadChange', file);
};
// Handles the file drop event.
const onDrop = (files: File[] | null) => {
    if (files && files[0] && validateFile(files[0])) {
        selectedImage.value = files[0].type.startsWith('image/') ? URL.createObjectURL(files[0]) : null;
        fileInfo.value = files[0];
        emits('listenFileUploadChange', files[0]);
        console.log(selectedImage.value, 'selectedImage.value');
        console.log(files, 'files');
    }
};

const { isOverDropZone } = useDropZone(dropZoneRef, { onDrop });
// Clears the selected file and resets the file input.
const clearFile = () => {
    const fileInput = document.getElementById(props.fileID || '') as HTMLInputElement | null;
    if (fileInput) {
        fileInput.value = '';
        fileInfo.value = null;
    }
    emits('clearFile', null);
};

defineExpose({
    clearFile,
});
// Validates the selected file based on type and size.
const validateFile = (file: File) => {
    let allowedTypes: Array<string> = [];
    if (props.fileType == 'Image') {
        allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    } else if (props.fileType == 'CSV') {
        allowedTypes = ['text/csv'];
    } else {
        allowedTypes = ['*'];
    }
    const maxSize = (props.maxFileSize || 0) * 1024 * 1024;
    let isValidFile = false;

    if (props.fileType != '*') {
        if (allowedTypes.includes(file.type)) {
            isValidFile = true;
        } else {
            toast.add({ severity: 'error', detail: `Only ${props.fileType == 'CSV' ? 'CSV' : 'PNG/JPG'} files are allowed`, life: 2000 });
            return false;
        }
    }

    if (props.fileType == '*') {
        if (props.allowedExtensions && !validateExtension(file)) {
            toast.add({ severity: 'error', detail: `Only ${props.allowedExtensions.map((ele) => ele).join(', ')} files are allowed`, life: 5000 });
            return false;
        } else if (allowedExtensions && !validateExtension(file)) {
            toast.add({ severity: 'error', detail: `Only ${allowedExtensions.map((ele) => ele).join(', ')} files are allowed`, life: 5000 });
            return false;
        } else {
            isValidFile = true;
        }
    }

    if (file.size > maxSize && props.maxFileSize) {
        toast.add({ severity: 'error', detail: `File size exceeds limit (${props.maxFileSize} MB)`, life: 2000 });
        return false;
    }

    return true;
};

const tooltipValue = computed(() => {
    const value = props.defaultValueName || fileInfo.value?.name || '';
    return {
        value: value ? value : '',
        pt: {
            text: 'bg-[#808B98] w-[180px] dark:bg-[#3C3C3C]',
        },
    };
});
// Checks if the file extension is allowed.
const validateExtension = (value) => {
    const selectedFile = value.name;
    if (!selectedFile) {
        return false;
    }
    const extension = selectedFile.substring(selectedFile.lastIndexOf('.') + 1, selectedFile.length).toLowerCase();
    return (props?.allowedExtensions || allowedExtensions).includes(extension);
};
</script>

<template>
    <div class="w-full" v-if="!inputTypeFileUpload">
        <div ref="dropZoneRef" v-if="!fileInfo" :class="[props?.twClasses || defaultClasses, isOverDropZone ? 'bg-slate-100' : '']" class="flex justify-center items-center">
            <div class="flex flex-col items-center">
                <img src="@/assets/images/file-upload.svg" alt="File Upload" class="w-10 h-10 mt-3" />
                <div class="text-[14px] text-[#344563] dark:text-[#dfdfdf] font-semibold mt-3 text-center">
                    Drag and drop the file, or
                    <span @click="browseImage" class="cursor-pointer text-[#1279ff]">Browse</span>
                </div>
                <div class="text-[12px] text-[#344563] dark:text-[#dfdfdf] mt-2 text-center">
                    <span v-if="props.maxFileSize"> Max {{ props.maxFileSize }} MB </span> ({{
                        props.fileType == 'CSV'
                            ? 'CSV'
                            : props.fileType == 'Image'
                            ? 'PNG / JPG'
                            : props.allowedExtensions
                            ? props.allowedExtensions.map((ele) => ele).join(', ')
                            : 'Only PDF, DOC, DOCX, XLS, XLSX, WAV, MP3, MP4, JPG, CSV, JPEG or PNG'
                    }}
                    format only)
                </div>
            </div>
        </div>
        <input @change="onFileSelect" type="file" :accept="props.fileType.toLowerCase()" ref="fileInput" class="hidden" :id="props.fileID" />
        <div v-if="fileInfo" class="md:w-[500px] relative border-[2px] border-[#d1d5db] dark:border-[#8d8d8d] border-dashed rounded-[8px] items-center justify-between bg-[#d4ecd5] dark:bg-[#4d4d4d] flex flex-row pt-[50px] md:pt-4 px-4 pb-4">
            <div class="flex items-center justify-start gap-3 w-[90%]">
                <template v-if="fileInfo.type == 'text/csv'">
                    <img src="@/assets/images/bulk-csv-icon.svg" :alt="fileInfo.name" />
                    <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[auto]">{{ fileInfo.name }}</div>
                </template>
                <template v-else-if="fileInfo.type == 'application/pdf'">
                    <img src="@/assets/images/pdf-icon.svg" :alt="fileInfo.name" />
                    <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[auto]">{{ fileInfo.name }}</div>
                </template>
                <template v-else-if="fileInfo.type == 'application/msword' || fileInfo.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'">
                    <img src="@/assets/images/doc-icon.svg" :alt="fileInfo.name" />
                    <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[auto]">{{ fileInfo.name }}</div>
                </template>
                <template v-else-if="fileInfo.type == 'image/png' || fileInfo.type == 'image/jpg' || fileInfo.type == 'image/jpeg'">
                    <div class="relative flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                        <img :src="selectedImage" :alt="fileInfo.name" class="md:w-[150px]" />
                        <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[250px]">{{ fileInfo.name }}</div>
                    </div>
                </template>
                <template v-else-if="fileInfo.type == 'audio/wav' || fileInfo.type == 'audio/mpeg' || fileInfo.type == 'video/mpeg' || fileInfo.type == 'audio/mp3'">
                    <img src="@/assets/images/mp3-icon.svg" :alt="fileInfo.name" />
                    <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[auto]">{{ fileInfo.name }}</div>
                </template>
                <template v-else-if="fileInfo.type == 'video/mp4'">
                    <img src="@/assets/images/mp4-icon.svg" :alt="fileInfo.name" />
                    <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[auto]">{{ fileInfo.name }}</div>
                </template>
                <template v-else-if="fileInfo.type == 'application/vnd.ms-excel' || fileInfo.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'">
                    <img src="@/assets/images/xls-icon.svg" :alt="fileInfo.name" />
                    <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[auto]">{{ fileInfo.name }}</div>
                </template>
            </div>
            <img v-if="!darkModeVal" class="cursor-pointer absolute top-5 right-5 md:top-8" @click="clearFile" src="@/assets/images/close_icon_mobile.svg" alt="Remove File" :class="{ 'absolute top-5 right-5 ': fileInfo.type.startsWith('image/') }" />
            <img
                v-else
                class="cursor-pointer absolute top-5 right-5 md:top-8"
                @click="clearFile"
                src="@/assets/images/dark-mode/dark-close_icon_mobile.svg"
                alt="Remove File"
                :class="{ 'absolute top-5 right-5 ': fileInfo.type.startsWith('image/') }"
            />
        </div>
    </div>
    <!-- csv file upload component design -->
    <div class="relative cursor-pointer" :class="props?.twClasses || defaultFileClasses" v-if="inputTypeFileUpload" v-tooltip.top="tooltipValue">
        <div v-if="!fileInfo" @click="browseImage()" class="flex items-center gap-2 w-[100%]">
            <img :src="getImg('upload-icon', darkModeVal)" @click="clearFile" class="hover:cursor-pointer h-[16px]" />
            <span class="overflow-hidden text-ellipsis whitespace-nowrap w-[70%]">
                {{ props.defaultValueName ? props.defaultValueName : 'Upload' }}
            </span>
        </div>
        <input @change="onFileSelect" type="file" accept=".csv" class="h-[40px] rounded-[6px] w-[100%] hidden" :id="props.fileID" />
        <div v-if="fileInfo" @click="browseImage()" class="flex items-center gap-4 w-[100%]">
            <div class="overflow-hidden w-[70%] text-ellipsis whitespace-nowrap">{{ fileInfo.name }}</div>
        </div>
    </div>
</template>

<style lang="scss"></style>
