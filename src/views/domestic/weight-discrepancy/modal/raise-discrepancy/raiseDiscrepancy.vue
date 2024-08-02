<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits, defineProps, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import ProductTable from '../product-tabel/productTabel.vue';
import { DARKMODE } from '@/store/dark-mode/constants';
import { WEIGHTDISCREPANCY } from '@/store/domestic/weight-discrepancy/constants';
import { raiseDescrepancyData } from '../view-detail/viewDetail.js';
import remarkDiscrepancy from '../remarks-discrepancy/remarkDiscrepancy.vue';
import { useStore } from 'vuex';
import { checkUserType } from '../../../../../util/commonHandlers';
// import config from '@/util/config';
const emit = defineEmits(['productUrl', 'getUpdatedData']);
const props = defineProps(['rowData', 'tempEditModalData', 'modalType', 'haveAccessReject', 'haveAccessAccept']);
const store = useStore();
const ProductData = ref(raiseDescrepancyData.data1);
const remarkvisibleModal = ref(false);
const isWeight = ref(false);
const toast = useToast();
const showGuideline = ref(false);
const showUploadImeges = ref(false);
const showProducts = ref(false);
const showProductDetails = ref(false);
const isDisable = ref(true);
const productData = ref([]);
const previewImage = ref('');
const lengthImage = ref('');
const widthImage = ref('');
const heightImage = ref('');
const weightScaleImage = ref('');
const labelImage = ref('');
const sellerWeight = ref(props.rowData.vendor_entered_weight.entered_kg);
const salesInput = ref(null);
const isLoadingSubmit = ref(false);
const imageUploadData = ref([
    { label: 'Parcel Length', selectedImage: null, hideImageBtn: true, isLoading: false },
    { label: 'Parcel Width', selectedImage: null, hideImageBtn: true, isLoading: false },
    { label: 'Parcel Height', selectedImage: null, hideImageBtn: true, isLoading: false },
    { label: 'Width Weight Scale', selectedImage: null, hideImageBtn: true, isLoading: false },
    { label: 'Width Label', selectedImage: null, hideImageBtn: true, isLoading: false },
]);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const raiseEditModalHeading = computed(() => (props.rowData.action.isActionType == 5 ? 'Edit Raise Discrepancy' : 'Raise Discrepancy'));
const closeremarkvisibleModal = () => {
    remarkvisibleModal.value = false;
};
const handleResize = () => {
    const isDesktopView = window.innerWidth >= 768;
    if (isDesktopView) {
        showGuideline.value = true;
        showUploadImeges.value = true;
        showProducts.value = true;
    } else {
        showGuideline.value = true;
        showUploadImeges.value = true;
        showProducts.value = true;
    }
};

const showMoreDetails = (showMoreDetails) => {
    if (showMoreDetails == 'showGuideline') {
        showGuideline.value = !showGuideline.value;
    } else if (showMoreDetails == 'showUploadImeges') {
        showUploadImeges.value = !showUploadImeges.value;
    } else if (showMoreDetails == 'showProductDetails') {
        showProductDetails.value = !showProductDetails.value;
    } else {
        showProducts.value = !showProducts.value;
    }
};
onMounted(() => {
    // debugger
    handleResize();
    window.addEventListener('resize', handleResize);
    document.body.classList.add('edit_modal');
    imageUploadData.value.forEach((item) => (item.selectedImage = null));
    imageUploadData.value.forEach((item) => (item.hideImageBtn = true));

    if (props.tempEditModalData) {
        initializeImageUploadData();
    }
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    document.body.classList.remove('edit_modal');
});
const initializeImageUploadData = () => {
    imageUploadData.value.forEach((item, index) => {
        const prop = props.tempEditModalData.data[0];
        const propName = ['length_image', 'width_image', 'height_image', 'weight_scale_image', 'label_image'][index];

        item.selectedImage = prop[propName] || null;
        item.hideImageBtn = item.selectedImage ? false : true;
    });
    lengthImage.value = extractFilename(props.tempEditModalData.data[0]['length_image'] || '');
    widthImage.value = extractFilename(props.tempEditModalData.data[0]['width_image'] || '');
    heightImage.value = extractFilename(props.tempEditModalData.data[0]['height_image'] || '');
    weightScaleImage.value = extractFilename(props.tempEditModalData.data[0]['weight_scale_image'] || '');
    labelImage.value = extractFilename(props.tempEditModalData.data[0]['label_image'] || '');
};
function extractFilename(url) {
    if (url != '') {
        const urlObject = new URL(url);
        const pathname = urlObject.pathname;
        return pathname.substring(pathname.lastIndexOf('/') + 1);
    } else {
        return '';
    }
}
const tempIcon = (icon) => {
    if (icon) {
        return new URL(`../../../../../assets/images/${icon}.svg`, import.meta.url).href;
    } else {
        return null;
    }
};
const getLogisticIcon = (logisticLogo) => {
    const imagePath = new URL(`../../../../../assets/images/${logisticLogo}-v2.svg`, import.meta.url).href;
    const logisticLogoPath = imagePath.split('/');
    const logisticLogoLastPart = logisticLogoPath[logisticLogoPath.length - 1];
    if (logisticLogoLastPart == 'undefined') {
        const defaultImagePath = new URL(`../../../../../assets/images/default_logics_2.svg`, import.meta.url).href;
        return defaultImagePath;
    } else {
        return imagePath;
    }
};
const onFileSelect = async (event, index) => {
    const fileInput = document.getElementById('customFileInput' + index);
    previewImage.value = null;
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    if (file) {
        const allowedTypes = ['image/jpeg', 'image/png'];
        const maxSize = 2 * 1024 * 1024; // 2 MB in bytes
        let isValidFile = true; // Flag to track file validation

        if (!allowedTypes.includes(file.type)) {
            fileInput.value = '';
            toast.add({ severity: 'error', summary: 'Only PNG and JPG files are allowed', detail: 'Only PNG and JPG files are allowed', life: 1000 });
            isValidFile = false;
        }

        if (file.size > maxSize) {
            fileInput.value = '';
            toast.add({ severity: 'error', summary: 'File size exceeds 2 MB limit', detail: 'File size exceeds 2 MB limit', life: 1000 });
            isValidFile = false;
        }

        if (isValidFile) {
            reader.onload = (e) => {
                previewImage.value = e.target.result;
            };
            const data = {
                previewImage: file,
            };
            imageUploadData.value[index].isLoading = true;
            imageUploadData.value[index].hideImageBtn = false;
            await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getImageUpload`, data);
            const apiImageStatus = store.getters[`${WEIGHTDISCREPANCY.NAME}/sendImageUpload`];
            if (index == 0) {
                lengthImage.value = apiImageStatus.file_name;
                imageUploadData.value[index].selectedImage = apiImageStatus.file_preview;
            } else if (index == 1) {
                widthImage.value = apiImageStatus.file_name;
                imageUploadData.value[index].selectedImage = apiImageStatus.file_preview;
            } else if (index == 2) {
                heightImage.value = apiImageStatus.file_name;
                imageUploadData.value[index].selectedImage = apiImageStatus.file_preview;
            } else if (index == 3) {
                weightScaleImage.value = apiImageStatus.file_name;
                imageUploadData.value[index].selectedImage = apiImageStatus.file_preview;
            } else {
                labelImage.value = apiImageStatus.file_name;
                imageUploadData.value[index].selectedImage = apiImageStatus.file_preview;
            }
            imageUploadData.value[index].errorMsg = '';
            imageUploadData.value[index].isLoading = false;
            imageUploadData.value[index].hideImageBtn = false;
        } else {
            // Handle invalid file cases or additional logic here
            imageUploadData.value[index].isLoading = false;
            imageUploadData.value[index].hideImageBtn = true;
            return; // Exit the function if the file is not valid
        }
    }
    // Additional code here if needed, after file validation
};

const removeImage = (index) => {
    imageUploadData.value[index].selectedImage = null;
    imageUploadData.value[index].hideImageBtn = true;
    if (index == 0) {
        lengthImage.value = '';
    } else if (index == 1) {
        widthImage.value = '';
    } else if (index == 2) {
        heightImage.value = '';
    } else if (index == 3) {
        weightScaleImage.value = '';
    } else {
        labelImage.value = '';
    }

    document.getElementById('customFileInput' + index).value = '';
};

const remarkModal = (payload) => {
    remarkvisibleModal.value = true;
    if (payload != 'remark') {
        isWeight.value = false;
    } else {
        isWeight.value = true;
    }
};
const validateInput = () => {
    const regex = /^\d*\.?\d{0,2}$/; // Regex to match numbers with up to 2 decimal places
    if (!regex.test(sellerWeight.value)) {
        // If the input doesn't match the pattern, remove invalid characters
        sellerWeight.value = sellerWeight.value.replace(/[^0-9.]/g, '').match(regex) || '';
    }
    if (sellerWeight.value < 0) sellerWeight.value = 0;
    if (sellerWeight.value > 1000) sellerWeight.value = '';
    var value = sellerWeight.value;
    var idx = value.indexOf('.');
    if (idx >= 0) {
        if (value.length - idx > 3) {
            e.target.value = value.substring(0, value.length - 1);
            return false;
        }
    }
};
const disableChange = () => {
    isDisable.value = false;
    sellerWeight.value = '';
    setTimeout(() => {
        salesInput.value.focus(); // Focus on the input field after a delay
        document.addEventListener('click', handleOutsideClick);
    }, 100); // Adjust the delay time if needed
};
const handleOutsideClick = (event) => {
    if (salesInput.value && !salesInput.value.contains(event.target)) {
        // Click occurred outside the input field
        // Show the edit icon again
        isDisable.value = true;

        // Remove the event listener after handling the click
        document.removeEventListener('click', handleOutsideClick);
    }
};

const productDetails = (tempProductData) => {
    productData.value = tempProductData;
};
const raiseVendorSubmit = async () => {
    isLoadingSubmit.value = true;
    const weightscaleerror = imageUploadData.value[3];

    if (!weightscaleerror || !weightscaleerror.selectedImage) {
        if (weightscaleerror) {
            weightscaleerror.errorMsg = 'This field is required!';
        }
        const errorElement = document.querySelector('.weightscaleerror');
        if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        isLoadingSubmit.value = false;
        return;
    }

    const data = {
        rowId: props.rowData.row_id,
        isAccept: 0,
        isEdit: props.modalType === 'editDiscrepancy' ? 1 : 0,
        lengthImage: lengthImage.value,
        widthImage: widthImage.value,
        heightImage: heightImage.value,
        weightScaleImage: weightScaleImage.value,
        labelImage: labelImage.value,
        vendorEnteredWeight: sellerWeight.value == '' ? props.rowData.vendor_entered_weight.entered_kg : sellerWeight.value,
        productData: productData.value,
    };
    await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getRiseDiscrepancyData`, data);
    const status = store.getters[`${WEIGHTDISCREPANCY.NAME}/sendRiseDiscrepancyData`];
    isLoadingSubmit.value = false;
    if (status.status == 'Success') {
        toast.add({ severity: 'success', summary: 'Success Message', detail: status.html_message, life: 1000 });
        closeAllModals();
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: status.html_message, life: 1000 });
    }
    isLoadingSubmit.value = false;
};
const closeAllModals = () => emit('getUpdatedData');
</script>
<template>
    <!-- <ToastView /> -->
    <div class="main-section">
        <section class="updateWeight-nav">
            <div class="main-nav-raise">
                <div class="left-nav">
                    <div class="raise-discrepancy">
                        <div>
                            <span v-if="checkUserType('admin') || checkUserType('subadmin')">Review</span> <span v-else>{{ raiseEditModalHeading }} </span>
                        </div>
                    </div>
                    <div class="main-nav">
                        <nav>
                            <div class="weight-details-info">
                                <div class="logo-weight-details">
                                    <div class="skeleton-div flex align-item-center" v-if="iskeleton">
                                        <skeletonView width="20px" height="20px" class="border-radius"></skeletonView>
                                        <div class="aws-li flex align-item-center">
                                            AWB:
                                            <span>
                                                <skeletonView width="100px" height="8px"></skeletonView>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="logo-details-div flex align-item-center" v-if="!iskeleton">
                                        <img :src="getLogisticIcon(props.rowData.logistic_logo)" />
                                        <div class="aws-li flex align-item-center">
                                            AWB: <span>{{ props.rowData.awb_no_logistics }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div v-if="checkUserType('vendor')" class="right-nav">
                    <button class="submit" @click="raiseVendorSubmit()" :disabled="isLoadingSubmit">
                        <div v-if="isLoadingSubmit"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                        <div v-else>Submit</div>
                    </button>
                </div>
                <div v-else class="right-nav">
                    <div class="admin-btns">
                        <button v-if="props.haveAccessReject" class="btn-reject" @click="remarkModal('remark')">Reject</button>
                        <button v-if="props.haveAccessAccept" class="btn-approve" @click="remarkModal('weight')">Approve</button>
                    </div>
                </div>
            </div>
        </section>
        <div class="main-section-content">
            <section>
                <div class="main-saler-weight">
                    <div class="saler-weigth">
                        <div class="sales-content">
                            <div class="left-content">
                                <div class="sales-nav seller-weight">
                                    Seller Weight :
                                    <span>
                                        <input type="text" @input="validateInput" id="sales-input" class="sales-input" v-model="sellerWeight" :disabled="isDisable" ref="salesInput" />
                                    </span>
                                    <img @click="disableChange()" v-if="isDisable && checkUserType()" class="edit-img" src="../../../../../assets/images/shipment/edit.svg" />
                                </div>
                                <div class="sales-nav">
                                    Courier Weight : <span class="weight-data">{{ props.rowData.billable_weight_in_kg }}</span>
                                </div>
                            </div>
                            <div class="right-img">
                                <img src="../../../../../assets/images/shipment/alert-triangle.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="photoShipment" v-if="checkUserType('vendor')">
                <div class="main-shipment">
                    <div class="main-info">
                        <div class="header">
                            <div class="tracking-photos">
                                <img class="shipment-logo" src="../../../../../assets/images/shipment.svg" />
                                <span class="shipment-name"> Guideline for Taking Photos of Shipment </span>
                            </div>
                            <div class="shipment-more-details">
                                <img class="expand-img" @click="showMoreDetails('showGuideline')" :src="tempIcon(showGuideline ? 'ic_uparrow' : 'ic_downarrow')" />
                            </div>
                        </div>
                    </div>
                    <div v-if="showGuideline" class="shipment-card-section">
                        <div class="shipment-tracking-cards">
                            <div class="shipmentcards">
                                <div class="shipment-box-img">
                                    <img src="../../../../../assets/images/shipment/card-two/card2.png" />
                                </div>
                                <div>
                                    <div class="shipment-info">
                                        <span class="shipment-title">With Ruler/ Tape</span>
                                        <div class="shipment-content">Snap a side photo of the package next to a ruler to display dimensions.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="shipmentcards">
                                <div class="shipment-box-img">
                                    <img src="../../../../../assets/images/shipment/card-three/card3.png" />
                                </div>
                                <div>
                                    <div class="shipment-info">
                                        <span class="shipment-title">On Weighing Scale</span>
                                        <div class="shipment-content">Snap a clear photo of the package's weight on the scale.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="shipmentcards">
                                <div class="shipment-box-img">
                                    <img @click="removeUploadeImg()" src="../../../../../assets/images/shipment/card-one/card1.png" />
                                </div>
                                <div>
                                    <div class="shipment-info">
                                        <span class="shipment-title">With Label</span>
                                        <div class="shipment-content">Capture a clear photo of the legible shipping label.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="photoShipment-two">
                <div class="main-shipment">
                    <div class="main-info">
                        <div class="header shipment-update">
                            <div class="update-shipment-info-upload">
                                <img class="shipment-logo" src="../../../../../assets/images/shipment/shipping-upload.svg" />
                                <span class="shipment-name"> Upload Images </span>
                            </div>
                            <div class="crop-content">Only <span>PNG</span> and <span>JPG</span> allowed. Max 2 MB allowed.</div>
                            <div class="shipment-more-details">
                                <img class="expand-img" @click="showMoreDetails('showUploadImeges')" :src="tempIcon(showUploadImeges ? 'ic_uparrow' : 'ic_downarrow')" />
                            </div>
                        </div>
                    </div>
                    <div v-if="showUploadImeges" class="shipment-card-section">
                        <div class="row">
                            <div class="shipment-tracking-cards">
                                <div v-for="(imageData, index) in imageUploadData" :key="index" class="update-img-shipment">
                                    <div class="title-update-img">{{ imageData.label }} <span class="weightscaleerror" v-if="imageData && imageData.label === 'Width Weight Scale'">*</span></div>
                                    <div class="upload-div-outer" :class="checkUserType('admin') || checkUserType('subadmin') ? 'pointer-event' : ''">
                                        <div class="updatecards">
                                            <div v-if="imageData.hideImageBtn" class="upload-div">
                                                <div v-if="(!imageData.selectedImage && checkUserType('admin')) || (!imageData.selectedImag && checkUserType('subadmin'))">Image not uploaded</div>
                                                <div v-else class="w-[100%] h-[100%]">
                                                    <label :for="'customFileInput' + index" class="custom-file-label">
                                                        <img v-if="darkModeVal != true" src="../../../../../assets/images/upload-icon.svg" />
                                                        <img v-else src="../../../../../assets/images/dark-mode/dark-upload-icon.svg" />
                                                    </label>
                                                    <input type="file" :id="'customFileInput' + index" @change="onFileSelect($event, index)" accept="image/*" style="display: none" />
                                                </div>
                                            </div>
                                            <skeletonView v-if="imageData.isLoading" width="90%" height="90%" style="border-radius: 0"></skeletonView>
                                            <div v-else-if="imageData.selectedImage" class="selected-image-div">
                                                <img :src="imageData.selectedImage" alt="Selected Image" class="selected-image" />
                                                <div class="hover-upload-icon">
                                                    <label :for="'customFileInput' + index" class="custom-file-label"><img src="../../../../../assets/images/upload-icon-hover.svg" /></label>
                                                    <input type="file" :id="'customFileInput' + index" @change="onFileSelect($event, index)" accept="image/*" style="display: none" />
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="imageData.selectedImage && !imageData.isLoading && checkUserType('vendor')" class="cross-img" @click="removeImage(index)">
                                            <img src="../../../../../assets/images/cancle-button.svg" />
                                        </div>
                                    </div>
                                    <div class="weightscaleerror">{{ imageData.errorMsg }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="weightDescripancyEdit">
                <div class="product">
                    <div class="mt-4">
                        <ProductTable :showProducts="showProducts" :Data="ProductData" @product-details="productDetails" />
                    </div>
                </div>
            </section>

            <DialogView v-model:visible="remarkvisibleModal" id="remark-modal" modal style="z-index: 9999; min-width: 400px; max-height: 328px" dismissableMask>
                <remarkDiscrepancy :close="closeremarkvisibleModal" :rowDataVal="props.rowData" :isReject="isWeight" @close-remark="closeAllModals" />
            </DialogView>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import './raiseDiscrepancy.scss';

.p-dialog-header {
    margin-top: 15px !important;
    margin-left: 15px !important;
}
</style>
