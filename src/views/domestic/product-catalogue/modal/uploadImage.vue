<script setup lang="ts">
import { ref, defineProps, computed, onMounted } from 'vue';
import { productVariables } from './productModal';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { DARKMODE } from '../../../../store/dark-mode/constants';
import { PRODUCTCATALOGUE } from '@/store/domestic/product-catalogue/constants';
import { imageUpload } from '../../../../api/domestic/product-catalogue/productCatalouge';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const toast = useToast();
const store = useStore();
const props: Props = defineProps(['modalType', 'vendorId']);
interface Props {
    modalType?: String;
    vendorId?: String;
}
const dataVariables = productVariables;
onMounted(() => {
    dataVariables.value.showImageError = false;
});
const onFileSelect = async (event: any, index: any) => {
    dataVariables.value.previewImage = '';
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    if (file) {
        const allowedTypes = ['image/jpeg', 'image/png'];
        const maxSize = 2 * 1024 * 1024; // 2 MB in bytes
        let isValidFile = true; // Flag to track file validation

        if (!allowedTypes.includes(file.type)) {
            toast.add({ severity: 'error', summary: 'Only PNG and JPG files are allowed', detail: 'Only PNG and JPG files are allowed', life: 1000 });
            isValidFile = false;
        }

        if (file.size > maxSize) {
            toast.add({ severity: 'error', summary: 'File size exceeds 2 MB limit', detail: 'File size exceeds 2 MB limit', life: 1000 });
            isValidFile = false;
        }

        if (isValidFile) {
            reader.onload = (e) => {
                if (e.target && typeof e.target.result === 'string') {
                    dataVariables.value.previewImage = e.target.result;
                }
            };
            const data = {
                uploadfile: file,
            };
            if (props.vendorId != '' && props.vendorId != undefined) {
                data['vendor_id'] = props.vendorId;
            }
            dataVariables.value.imageUploadData[index].isLoading = true;
            dataVariables.value.imageUploadData[index].hideImageBtn = false;
            const responseStatus = await store.dispatch(`${PRODUCTCATALOGUE.NAME}/imageUpload`, data);
            if (responseStatus.status == 'success') {
                dataVariables.value.productUploadImg[index] = responseStatus.file_name;
                dataVariables.value.imageUploadData[index].selectedImage = responseStatus.file_preview;

                dataVariables.value.imageUploadData[index].isLoading = false;
                dataVariables.value.showImageError = false;
                dataVariables.value.imageUploadData[index].hideImageBtn = false;
            } else {
                toast.add({ severity: 'error', summary: responseStatus.html_message, detail: responseStatus.html_message, life: 1000 });
                dataVariables.value.imageUploadData[index].isLoading = false;
                dataVariables.value.imageUploadData[index].hideImageBtn = true;
            }
            // await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getImageUpload`, data);
            // const apiImageStatus = store.getters[`${WEIGHTDISCREPANCY.NAME}/sendImageUpload`];
            console.log(responseStatus, 'responseStatus');
            // dataVariables.value.productUploadImg[index] = apiImageStatus.file_name;
            // dataVariables.value.imageUploadData[index].selectedImage = apiImageStatus.file_preview;
        } else {
            // Handle invalid file cases or additional logic here

            dataVariables.value.imageUploadData[index].isLoading = false;
            dataVariables.value.imageUploadData[index].hideImageBtn = true;
            return; // Exit the function if the file is not valid
        }
    }
    // Additional code here if needed, after file validation
};
const removeImage = (index: number) => {
    dataVariables.value.imageUploadData[index].selectedImage = null;
    dataVariables.value.imageUploadData[index].hideImageBtn = true;
    dataVariables.value.productUploadImg = [];
    const fileInput = document.getElementById('customFileInput' + index) as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
};
</script>
<template>
    <div class="card__header">Product Images</div>
    <div class="card__form" v-if="props.modalType == 'edit' || dataVariables.imageUploadData.some((el) => el.selectedImage != '')">
        <div class="form__group__outer md:flex gap-[16px]">
            <div v-for="(imageData, index) in dataVariables.imageUploadData" :key="index" class="update-img-shipment">
                <div class="title-update-img">{{ imageData.label }}</div>
                <div class="upload-div-outer" v-if="props.modalType == 'view' || props.modalType == 'add' || props.modalType == 'edit'">
                    <div class="updatecards">
                        <div v-if="imageData.hideImageBtn && props.modalType != 'view'" class="upload-div">
                            <label :for="'customFileInput' + index" class="custom-file-label">
                                <img v-if="darkModeVal != true" src="@/assets/images/upload-icon.svg" />
                                <img v-else src="@/assets/images/dark-mode/dark-upload-icon.svg" />
                            </label>
                            <input type="file" :id="'customFileInput' + index" @change="onFileSelect($event, index)" accept="image/*" style="display: none" />
                        </div>
                        <skeletonView v-if="imageData.isLoading" width="90%" height="90%" style="border-radius: 0"></skeletonView>
                        <div v-else-if="imageData.selectedImage" class="selected-image-div">
                            <img :src="imageData.selectedImage" alt="Selected Image" class="selected-image" />
                            <div class="hover-upload-icon" v-if="props.modalType != 'view'">
                                <label :for="'customFileInput' + index" class="custom-file-label"><img src="@/assets/images/upload-icon-hover.svg" /></label>
                                <input type="file" :id="'customFileInput' + index" @change="onFileSelect($event, index)" accept="image/*" style="display: none" />
                            </div>
                        </div>
                    </div>
                    <div v-if="imageData.selectedImage && !imageData.isLoading && props.modalType != 'view'" class="cross-img" @click="removeImage(index)">
                        <img src="@/assets/images/cancle-button.svg" />
                    </div>
                </div>
            </div>
            <div v-if="dataVariables.showImageError" class="error-message w-[100%]">Atleast one image is required</div>
        </div>
    </div>
    <div class="card__form" v-else>
        <div class="no-data-found-outer">
            <img class="no-record-fnd-img" src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/no-record-v2.svg" alt="No Record Found" />
            <div class="no-record-fnd-text">No Record Found</div>
        </div>
    </div>
</template>
<style lang="scss">
@import './productModal.scss';
.no-data-found-outer {
    width: 100%;
    text-align: center;
    display: grid;
    align-items: center;
    justify-content: center;
    .no-record-fnd-img {
        margin: 0 auto;
    }
    .no-record-fnd-text {
        font-size: 16px;
        font-family: $helveticaRegular;
        color: #999;
        padding-top: 12px;
    }
}
</style>
