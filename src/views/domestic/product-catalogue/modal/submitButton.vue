<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';
import { productVariables } from './productModal';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { PRODUCTCATALOGUE } from '@/store/domestic/product-catalogue/constants';
import { checkUserType } from '../../../../util/commonHandlers';
// import { fetchProductSubmitApi } from '../../../../api/product-catalogue/productCatalouge';
// import { em } from '@fullcalendar/core/internal-common';
const store = useStore();
const toast = useToast();
const dataVariables = productVariables;
const emits = defineEmits(['closeAllModals']);
const props = defineProps(['rowIdVal']);
const submitForm = async () => {
    const { sku, price, productName, length, width, height, actualWeight, productCategoryId } = dataVariables.value;
    const requiredFieldsEmpty = !sku.trim() || !price || !productName.trim() || !length.trim() || !width.trim() || !height.trim() || !productCategoryId || !actualWeight.trim();
    if (!checkUserType('vendor') && dataVariables.value.vendorData.length == 0) {
        toast.add({ severity: 'error', detail: 'Please select vendor', life: 3000 });
        return;
    }

    if (requiredFieldsEmpty) {
        dataVariables.value.showError = true;
    } else {
        console.log(props.rowIdVal, 'rowIdValSubmit');
        dataVariables.value.isLoadingSubmit = true;
        const payload = {
            product_category_id: typeof dataVariables.value.productCategoryId === 'object' ? dataVariables.value.productCategoryId.id : dataVariables.value.productCategoryId,
            product_price: dataVariables.value.price,
            product_length: dataVariables.value.length,
            product_weight: dataVariables.value.actualWeight,
            product_width: dataVariables.value.width,
            product_height: dataVariables.value.height,
            product_volumetric_weight: dataVariables.value.volumatricWeight,
            product_master_sku: dataVariables.value.sku,
            product_title: dataVariables.value.productName,
        };
        if (props.rowIdVal != '') {
            payload['row_id'] = props.rowIdVal;
        }
        if (dataVariables.value.hsncode != '' && dataVariables.value.hsncode != undefined) {
            payload['hsn_code'] = dataVariables.value.hsncode;
        }
        // for (let i = 0; i < 3 && i < dataVariables.value.imageUploadData.length; i++) {
        //     // Check if selectedImage property is not empty for the current object
        //     if (dataVariables.value.imageUploadData[i].selectedImage !== '') {
        //         // Assign selectedImage property to payload
        //         payload[`product_image${i + 1}`] = dataVariables.value.imageUploadData[i].selectedImage;
        //     }
        // }
        // for (let i = 0; i < 3 && i < dataVariables.value.productUploadImg.length; i++) {
        //     payload[`product_image${i + 1}`] = dataVariables.value.productUploadImg[i];
        // }

        for (let i = 0; i < 3; i++) {
            if (i < dataVariables.value.productUploadImg.length) {
                payload[`product_image${i + 1}`] = dataVariables.value.productUploadImg[i];
            } else if (i < dataVariables.value.imageUploadData.length) {
                if (dataVariables.value.imageUploadData[i].selectedImage !== '' && dataVariables.value.imageUploadData[i].selectedImage !== 'null') {
                    const imageUrl = dataVariables.value.imageUploadData[i].selectedImage;
                    if (imageUrl != null) {
                        // const fileName = imageUrl.split('/').pop();
                        const fileName = imageUrl;
                        payload[`product_image${i + 1}`] = fileName;
                    }
                } else if (i < dataVariables.value.productUploadImg.length) {
                    payload[`product_image${i + 1}`] = dataVariables.value.productUploadImg[i];
                }
            }
        }

        if (checkUserType('admin') || checkUserType('subadmin')) {
            payload['vendor_id'] = dataVariables.value.vendorData[1];
        }
        const responseStatus = await store.dispatch(`${PRODUCTCATALOGUE.NAME}/submitProduct`, payload);
        if (responseStatus.status == 'success') {
            toast.add({ severity: 'success', summary: 'Success Message', detail: responseStatus.html_message, life: 1000 });
            dataVariables.value.showError = false;
            dataVariables.value.showImageError = false;
            emits('closeAllModals');
        } else {
            toast.add({ severity: 'error', summary: 'Error Message', detail: responseStatus.html_message, life: 1000 });
        }
        dataVariables.value.isLoadingSubmit = false;
    }
    if (!isAtLeastOneImageSelected()) {
        dataVariables.value.showImageError = true;
        return;
    }
};
const isAtLeastOneImageSelected = () => {
    return dataVariables.value.imageUploadData.some((imageData) => imageData.selectedImage !== null && imageData.selectedImage !== '');
};
const closeAllModals = () => {
    emits('closeAllModals');
};
</script>
<template>
    <div class="modal-top-button flex">
        <div class="modal__buttons modal__buttons--cancel" @click="() => closeAllModals()">Cancel</div>
        <div class="modal__buttons modal__buttons--submit" @click="submitForm" :disabled="dataVariables.isLoadingSubmit">
            <div v-if="dataVariables.isLoadingSubmit"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
            <div v-else>Submit</div>
        </div>
    </div>
</template>
<style lang="scss">
@import './productModal.scss';
</style>
