<script setup lang="ts">
import BaseFileUpload from '../../../components/base/BaseFileUpload.vue';
import { ref, computed } from 'vue';
import getImg from '../../../util/getImg';
import { DARKMODE } from '../../../store/dark-mode/constants';
import { useStore } from 'vuex';
import { apiHandlerWithFormData } from '../../../api/common/api';
import config from '../../../util/config';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const fileUploadComponent = ref<any>(); // upload file value
const file = ref<String | null>(null);
const props = defineProps(['sampleFileType', 'id', 'defaultValue', 'pickupValue']);
const emits = defineEmits(['fileUpload']);


const listenFileUploadChange = async (val: File) => {
    const payload = {
        file_type: props.sampleFileType,
        upload_file: val,
    };
    const res: any = await apiHandlerWithFormData('rule-engine/upload-pincode-product.json', payload, true);
    console.log(res, 'res');
    if (res.error == 'error') {
        if (fileUploadComponent.value) {
            fileUploadComponent.value.clearFile();
            emits('fileUpload', file);
        }
        toast.add({ severity: 'error', summary: 'Error', detail: res.html_message, life: 3000 });
    } else {
        file.value = { fileName: val.name, fileNamePayload: res.file_name };
        // file.value = res.file_name;
        console.log(file, 'upload value');
        emits('fileUpload', file);
    }
};
</script>
<template>
    <div class="relative mb-[20px] md:mb-[0px] w-[100%]">
        <label class="block font-medium mb-[8px] text-[13px] text-[#374151] font-inter dark:text-[#dfdfdf]">{{ id == 6 ? 'Delivery Pincode' : '' }}</label>
        <!-- upload component -->
        <BaseFileUpload
            ref="fileUploadComponent"
            :fileID="id"
            file-type="CSV"
            :max-file-size="1"
            @listenFileUploadChange="listenFileUploadChange"
            @clearFile="(val: null) => file = val"
            :inputTypeFileUpload="true"
            :defaultValueName="defaultValue?.fileName ? defaultValue?.fileName : defaultValue"
        />
        <div class="absolute text-[#0052cc] text-[13px] font-inter dark:text-[#577ce4] flex items-center mt-[4px]">
            <img :src="getImg('re-downloadBtn', darkModeVal)" class="w-[16px]" />
            <a :href="id == 6 ? config.baseFileUrl + 'uploads/rule_engine/pincode-sample-file.csv' : config.baseFileUrl + 'uploads/rule_engine/product_sku-sample-file.csv'" download>
                <div class="ml-[8px]">Download sample</div>
            </a>
        </div>
    </div>
</template>

<style lang="scss"></style>
