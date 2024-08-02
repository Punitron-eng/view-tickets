<script setup>
import { ref, onMounted, computed } from 'vue';
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import { DARKMODE } from '../../store/dark-mode/constants';
import Skeleton from 'primevue/skeleton';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const selectedImage = ref(null);
const viewModalOpen = ref(false);
const fileInputRef = ref(null);
const loading = ref(false);
onMounted(() => {
    fileInputRef.value.addEventListener('change', handleFileUpload);
});
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        loading.value = true;
        setTimeout(() => {
            const reader = new FileReader();
            reader.onload = () => {
                selectedImage.value = reader.result;
                loading.value = false;
            };
            reader.readAsDataURL(file);
        }, 1000);
    }
};
const triggerFileInput = () => {
    fileInputRef.value.click();
};
const cancelImage = () => {
    selectedImage.value = null;
    fileInputRef.value.value = '';
};
const props = defineProps({
    isRejected: Boolean,
    imageName: String,
    viewdocsVisible: Boolean,
    modalsVisible: Boolean,
});
const getImg = (imageName) => {
    return new URL(`../../assets/images/${imageName}.svg`, import.meta.url).href;
};
const viewdocModal = () => {
    viewModalOpen.value = true;
    document.body.style.overflow = 'hidden';
};
const closeModal = () => {
    viewModalOpen.value = false;
    document.body.style.overflow = '';
};
</script>
<template>
    <div>
        <div class="flex flex-col">
            <div class="flex gap-[16px] mb-[14px]">
                <span class="text-[13px] font-medium">{{ props.imageName }}</span>
            </div>
            <div
                :class="{ uploadImg: true, rejected: props.isRejected }"
                class="uploadImg relative border-dashed border-[#9CA3AF] border-[1px] dark:border-dashed border-[#313131] border-[1px] dark:bg-[#313131] rounded-[4px] h-[88px] w-[104px] md:w-[152px] cursor-pointer"
            >
                <input ref="fileInputRef" type="file" class="hidden" accept="image/*" />
                <Skeleton v-if="loading" class="mb-2 w-full h-full"></Skeleton>
                <ul class="max-w-full max-h-full" @click="triggerFileInput">
                    <img v-if="selectedImage" :src="selectedImage" alt="uploaded-img" class="max-h-full max-w-full object-cover rounded-[4px]" />
                </ul>
                <button v-if="selectedImage" class="absolute top-[-14px] right-[-14px] rounded-full p-1" @click="cancelImage()">
                    <img :src="getImg('kyc-upload-img-close')" alt="uploadimg" class="cursor-pointer mx-auto mb-2" />
                </button>
                <div v-if="!loading && !selectedImage" class="kyc-doc flex flex-col justify-center items-center absolute inset-0" @click="triggerFileInput">
                    <img :src="getImg('kyc-upload-docu-icon')" alt="uploadimg" class="cursor-pointer mx-auto mb-2 w-[25px] lg:w-[40px]" />
                </div>
            </div>
        </div>
        <div class="flex viewdocs" v-if="props.viewdocsVisible && selectedImage">
            <span class="cursor-pointer" @click="viewdocModal"
                >View Document
                <img v-if="!darkModeVal" class="inline relative bottom-[1px]" :src="getImg('as-document-preview-eye-img')" alt="view document" />
                <img v-else class="inline relative bottom-[1px]" src="../../assets/images/dark-mode/as-document-preview-eye-img.svg" />
            </span>
        </div>
        <div class="modals" v-if="props.modalsVisible && viewModalOpen && selectedImage">
            <div class="modals-content bg-[#fff] dark:bg-[#3d3d3d]">
                <div class="modals-header relative pt-3 pb-2">
                    <button class="close-btn absolute right-5 top-0" @click="closeModal">×</button>
                </div>
                <div class="modals-body p-5 bg-[#e5e7eb] dark:bg-[#212121] flex justify-center rounded-bl-[8px] rounded-br-[8px]">
                    <img :src="selectedImage" alt="uploaded-img" class="max-h-full max-w-full object-cover rounded-[4px]" />
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../../assets/itl-common-css/common-css.scss';
.uploadImg {
    position: relative;
    border: 1px dashed #9ca3af;
    border-radius: 4px;
    height: 86px;
    @media screen and (max-width: 768px) {
        height: 59px;
    }
    cursor: pointer;
    @include theme() {
        border: 1px solid theme-get('dropdown-border');
    }
}
.rejected {
    border-color: red !important;
    border-style: dotted;
    background: rgba(222, 53, 11, 0.05);
}
</style>
