<script setup lang="ts">
import { ref, onMounted, computed, defineProps, watch, defineEmits } from 'vue';
import BaseDropdown from '../../../../components/base/BaseDropdown.vue';
import { DARKMODE } from '../../../../store/dark-mode/constants';
// import { PRODUCTCATALOGUE } from '../../../../store/product-catalogue/constants';
import { productVariables } from './productModal';
import { PRODUCTCATALOGUE } from '@/store/domestic/product-catalogue/constants';
import { WEIGHTDISCREPANCY } from '../../../../store/weight-discrepancy/constants';
import VendorModal from '../../../../components/common-modal-files/VendorModal.vue';
import uploadImage from './uploadImage.vue';
import submitButton from './submitButton.vue';
import { checkUserType } from '../../../../util/commonHandlers';
import { getProductData } from '../../../../api/domestic/product-catalogue/productCatalouge';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const dataVariables = productVariables;
interface Props {
    categoryData?: Array<{ id: String; value: String }>;
    modalType?: String;
    showModal?: Boolean;
    rowId?: String;
}
const props: Props = defineProps(['categoryData', 'modalType', 'showModal', 'rowId']);
const emits = defineEmits(['getUpdatedData']);
const categoryOptions = props.categoryData ?? []; //?? default value of an empty array if props.categoryData is undefined.
onMounted(() => {});
watch(
    () => props.showModal,
    async () => {
        setTimeout(async () => {
            if (props.modalType == 'edit' || props.modalType == 'view') {
                if (props.modalType == 'edit') {
                    dataVariables.value.modalTitle = 'Edit';
                    dataVariables.value.rowIdValue = props.rowId;
                } else if (props.modalType == 'view') {
                    dataVariables.value.modalTitle = 'View';
                }
                if (props.showModal) {
                    dataVariables.value.isSkeletonShow = true;

                    const payload = {
                        row_id: props.rowId,
                    };
                    // const responseStatus = await getProductData(payload);
                    const responseStatus = await store.dispatch(`${PRODUCTCATALOGUE.NAME}/fetchChannelInventories`, payload);

                    if (responseStatus.status == 'Success') {
                        dataVariables.value.isSkeletonShow = false;
                        const responseData = responseStatus.data;
                        dataVariables.value.sku = responseData.product_master_sku;
                        dataVariables.value.length = responseData.product_length;
                        dataVariables.value.width = responseData.product_width;
                        dataVariables.value.actualWeight = responseData.product_weight;
                        dataVariables.value.height = responseData.product_height;
                        dataVariables.value.volumatricWeight = responseData.product_volumetric_weight;
                        dataVariables.value.hsncode = responseData.product_hsn_code;
                        dataVariables.value.productName = responseData.product_title;
                        dataVariables.value.productCategoryId = responseData.product_category_data;
                        dataVariables.value.price = responseData.product_price;
                        dataVariables.value.vendorData = responseData.vendor_data;
                        for (let i = 0; i < 3; i++) {
                            const responseDataKey = `product_image${i + 1}`;
                            const imageUploadData = dataVariables.value.imageUploadData[i];
                            const selectedImage = responseData[responseDataKey];

                            imageUploadData.selectedImage = selectedImage;

                            // Check if response data for the image is empty
                            if (selectedImage === '') {
                                imageUploadData.hideImageBtn = true;
                            } else {
                                imageUploadData.hideImageBtn = false;
                            }
                        }
                    }
                } else {
                    dataVariables.value.isSkeletonShow = false;

                    dataVariables.value.isAdmin = false;
                }
            } else {
                dataVariables.value.modalTitle = 'Add';
                dataVariables.value.vendorData = [];
                dataVariables.value.isAdmin = false;
                dataVariables.value.showError = false;
                dataVariables.value.showImageError = false;
            }
        }, 200);
    }
);

const validateInput = (key: any) => {
    if (key == 'productName') {
        dataVariables.value[key] = dataVariables.value[key].replace(/[^a-zA-Z0-9\s]/g, '');
    } else {
        dataVariables.value[key] = dataVariables.value[key].replace(/[^a-zA-Z0-9]/g, '');
    }
};
// const preventExponent = (event) => {
//     if (event.key === 'e' || event.key === 'E') {
//         event.preventDefault();
//     }
// };
const isFloat = (value: any, field: any) => {
    // Allow only digits, a maximum of two digits before and after the decimal point, and a single decimal point

    let regex;
    if (field === 'actualWeight') {
        regex = /^\d{0,2}(\.\d{0,2})?$/;
    } else {
        regex = /^\d{0,3}(\.\d{0,2})?$/;
    }

    if (!regex.test(value)) {
        dataVariables.value[field] = value.slice(0, -1);
    }
    const newResult = (Number(dataVariables.value.length) * Number(dataVariables.value.width) * Number(dataVariables.value.height)) / 5000;
    dataVariables.value.volumatricWeight = parseFloat(newResult).toFixed(2);
};
const handlePaste = (event: any, field: any) => {
    event.preventDefault();
    const pastedText = (event.clipboardData || window.clipboardData).getData('text');
    // Round the pasted value to one decimal place
    dataVariables.value[field] = parseFloat(pastedText).toFixed(1);
    // Trigger the isFloat function to perform further processing
    isFloat(dataVariables.value[field], field);
};
const validatePriceInput = (event) => {
    let value = event.target.value;
    // Only allow digits, one decimal point, and up to two digits after the decimal point
    const regex = /^\d+(\.\d{0,2})?$/;
    if (!regex.test(value)) {
        // If the entered value doesn't match the pattern, remove the last character
        dataVariables.value.price = value.slice(0, -1);
    }
};
// const isFloat = (input: any, field: any) => {
//     let inputVal = input.value;
//     input.value = input.value.replace(/[^\d.]/g, '');

//     // Ensure only one dot (.) exists
//     const dotIndex = input.value.indexOf('.');
//     if (dotIndex !== -1) {
//         const countDot = input.value.slice(dotIndex + 1).split('.').length - 1;
//         if (countDot > 1) {
//             // If more than one dot exists after the first one, remove the extra ones
//             input.value = input.value.slice(0, dotIndex + 1) + input.value.slice(dotIndex + 1).replace(/\./g, '');
//         }
//     }
//     if (inputVal === '.') {
//         input.value = inputVal.slice(0, -1);
//         return;
//     }
//     if (inputVal.length <= 5) {
//         const inputValArray = inputVal.split('.');
//         if (inputValArray[0].length >= 3) {
//             inputValArray[0] = inputValArray[0].slice(0, -1);
//             if (typeof inputValArray[1] === 'undefined' || inputValArray[1] === '') {
//                 input.value = inputValArray[0] + '.' + '00';
//             } else {
//                 input.value = inputValArray[0] + '.' + inputValArray[1];
//             }
//         }
//     } else {
//         input.value = inputVal.slice(0, -1);
//     }
//     const newResult = (Number(dataVariables.value.length) * Number(dataVariables.value.width) * Number(dataVariables.value.height)) / 5000;
//     dataVariables.value.volumatricWeight = parseFloat(newResult).toFixed(2);
// };

// const isFloat = (input: any, field: any) => {
//     let inputVal = input.value;
//     input.value = input.value.replace(/[^\d.]/g, '');

//     // Ensure only one dot (.) exists
//     const dotIndex = input.value.indexOf('.');
//     if (dotIndex !== -1) {
//         const countDot = input.value.slice(dotIndex + 1).split('.').length - 1;
//         if (countDot > 1) {
//             // If more than one dot exists after the first one, remove the extra ones
//             input.value = input.value.slice(0, dotIndex + 1) + input.value.slice(dotIndex + 1).replace(/\./g, '');
//         }
//     }
//     if (inputVal === '.') {
//         input.value = inputVal.slice(0, -1);
//         return;
//     }
//     if (inputVal.length <= 5) {
//         const inputValArray = inputVal.split('.');
//         if (inputValArray[0].length >= 3) {
//             inputValArray[0] = inputValArray[0].slice(0, -1);
//             if (typeof inputValArray[1] === 'undefined' || inputValArray[1] === '') {
//                 input.value = inputValArray[0] + '.' + '00';
//             } else {
//                 input.value = inputValArray[0] + '.' + inputValArray[1];
//             }
//         }
//     } else {
//         input.value = inputVal.slice(0, -1);
//     }
//     const newResult = (Number(dataVariables.value.length) * Number(dataVariables.value.width) * Number(dataVariables.value.height)) / 5000;
//     dataVariables.value.volumatricWeight = parseFloat(newResult).toFixed(2);
// };

const closeAllModals = () => {
    dataVariables.value.sku = '';
    dataVariables.value.length = '';
    dataVariables.value.width = '';
    dataVariables.value.actualWeight = '';
    dataVariables.value.height = '';
    dataVariables.value.volumatricWeight = '';
    dataVariables.value.hsncode = '';
    dataVariables.value.productName = '';
    dataVariables.value.productCategoryId = '';
    dataVariables.value.price = '';
    dataVariables.value.productUploadImg = [];
    for (let i = 0; i < 3 && i < 3; i++) {
        dataVariables.value.imageUploadData[i].selectedImage = null;
        dataVariables.value.imageUploadData[i].hideImageBtn = true;
    }
    emits('getUpdatedData');
};

// vendor model

const showVendorModal = () => {
    dataVariables.value.isAdmin = true;
};

const applyVendorFilter = async (vendorName) => {
    vendorName.forEach(async (element) => {
        const tempData = element.split(',');
        console.log(tempData);
        dataVariables.value.isAdmin = false;
        const payload = {
            framework: '1',
            vendorID: tempData[1],
        };
        dataVariables.value.vendorData = tempData;
        // const notification_charges = await getNotificationResponse(payload);
        // if (notification_charges.status == 'success') {
        //     TableData.value = notification_charges.all_notification_charges_data_array.data.post_shipping;
        //     updateTotal();
        //     setTimeout(() => {
        //         checkedForSelectAll('email');
        //         checkedForSelectAll('sms');
        //         checkedForSelectAll('whatsapp');
        //     }, 100);
        // }
    });
};
const resetVendorFilter = () => {
    dataVariables.value.vendorData = [];
    dataVariables.value.isAdmin = false;
};
</script>

<template>
    <DialogView
        id="product-catalogue-modal"
        modal
        :draggable="false"
        :dismissableMask="true"
        header="Header"
        :style="{ width: '98vw', height: '95vh' }"
        :breakpoints="{ '1199px': '75vw', '1024px': '100vw', '820px': '100vw', '575px': '100vw' }"
        @hide="closeAllModals"
    >
        <template #header>
            <div class="flex w-[100%] justify-between items-center" :class="checkUserType('admin') || checkUserType('subadmin') ? 'admin-div-outer' : ''">
                <div class="flex modal-header-outer">
                    <div class="modal-header-title">{{ dataVariables.modalTitle }} Product</div>
                    <div class="ml-[18px] w-[auto] flex items-center" :class="props.modalType != 'view' ? ' cursor-pointer' : ''" v-if="checkUserType('admin') || checkUserType('subadmin')">
                        <div v-if="checkUserType('admin') || checkUserType('subadmin')" style="font-size: 14px" class="flex align-items-center">
                            <button @click="showVendorModal()" class="show-vendor-btn mr-2" v-if="props.modalType != 'view'">
                                <img v-if="darkModeVal != true" src="@/assets/images/vendor-icon.svg" />
                                <img v-else src="@/assets/images/dark-mode/dark-modal-edit.svg" />
                            </button>
                            <span v-if="dataVariables.vendorData.length == 0" @click="showVendorModal()" style="cursor: pointer" class="text-[13px] font-[500] font-inter dark:text-[#d1d5db]"> Select Vendor </span>
                            <span v-else class="border-none" :class="props.modalType == 'view' ? 'pointer-events' : ''" @click="showVendorModal()">
                                {{ dataVariables.vendorData[0] }}
                            </span>

                            <VendorModal
                                id="add-prdct-vendor-modal"
                                v-if="checkUserType('admin') || checkUserType('subadmin')"
                                :vendorId="dataVariables.vendorData"
                                v-show="dataVariables.isAdmin"
                                @close-modal="dataVariables.isAdmin = false"
                                @applyVendor="applyVendorFilter"
                                @resetVendor="resetVendorFilter"
                            />
                        </div>
                    </div>
                </div>
                <submitButton :rowIdVal="props.rowId" @closeAllModals="closeAllModals" v-if="props.modalType != 'view'"> </submitButton>
            </div>
        </template>
        <div class="pc-outer-body">
            <div class="pc__card mb-[16px]">
                <div class="card__header">Basic Details</div>
                <div class="card__form">
                    <div class="form__group__outer">
                        <div class="form__group w-[100%]">
                            <label class="w-[100%]">Select Category <span>*</span></label>
                            <skeletonView v-if="dataVariables.iskeleton" width="100%" height="32px" class="rounded-[4px]"> </skeletonView>
                            <BaseDropdown
                                v-else
                                :class="props.modalType === 'view' ? 'disabled-input' : ''"
                                filter
                                :twClasses="dataVariables.inputWidth"
                                :defaultValue="dataVariables.productCategoryId.id"
                                @listenDropdownChange="(val) => (dataVariables.productCategoryId = val.id)"
                                placeholder="Select Category"
                                :options="props.categoryData"
                                :virtualScrollerOptions="{ itemSize: 38 }"
                            />

                            <div v-if="dataVariables.showError && !dataVariables.productCategoryId" class="error-message">Category is required</div>
                        </div>
                    </div>
                    <div class="form__group__outer md:flex gap-[16px]">
                        <div class="form__group md:w-[50%] w-full">
                            <label class="w-[100%]">Product SKU <span>*</span></label>
                            <skeletonView v-if="dataVariables.iskeleton" width="100%" height="32px" class="rounded-[4px]"> </skeletonView>
                            <input
                                v-else
                                v-model="dataVariables.sku"
                                :class="props.modalType === 'view' ? 'disabled-input' : ''"
                                type="text"
                                placeholder="Enter SKU"
                                class="w-full text-black dark:text-[#dfdfdf] text-[13px] border dark:border-[#5d5d5d] dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-[4px]"
                            />
                            <div v-if="dataVariables.showError && !dataVariables.sku.trim()" class="error-message">This field is required</div>
                        </div>
                        <div class="form__group md:w-[50%] w-full">
                            <label class="w-[100%]">HSN Code</label>
                            <skeletonView v-if="dataVariables.iskeleton" width="100%" height="32px" class="rounded-[4px]"> </skeletonView>
                            <input
                                v-else
                                v-model="dataVariables.hsncode"
                                :class="props.modalType === 'view' ? 'disabled-input' : ''"
                                @input="validateInput('hsncode')"
                                type="text"
                                placeholder="Enter HSN Code"
                                class="w-full text-black dark:text-[#dfdfdf] text-[13px] border dark:border-[#5d5d5d] dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-[4px]"
                            />
                        </div>
                    </div>
                    <div class="form__group__outer md:flex gap-[16px]">
                        <div class="form__group md:w-[50%] w-full">
                            <label class="w-[100%]">Product Name <span>*</span></label>
                            <skeletonView v-if="dataVariables.iskeleton" width="100%" height="32px" class="rounded-[4px]"> </skeletonView>
                            <input
                                v-else
                                v-model="dataVariables.productName"
                                :class="props.modalType === 'view' ? 'disabled-input' : ''"
                                @input="validateInput('productName')"
                                type="text"
                                placeholder="Enter Product Name"
                                class="w-full text-black dark:text-[#dfdfdf] text-[13px] border dark:border-[#5d5d5d] dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-[4px]"
                            />
                            <div v-if="dataVariables.showError && !dataVariables.productName.trim()" class="error-message">This field is required</div>
                        </div>
                        <div class="form__group md:w-[50%] w-full">
                            <label class="w-[100%]">Price <span>*</span></label>
                            <skeletonView v-if="dataVariables.iskeleton" width="100%" height="32px" class="rounded-[4px]"> </skeletonView>
                            <input
                                type="text"
                                @input="validatePriceInput($event)"
                                v-else
                                :class="props.modalType === 'view' ? 'disabled-input' : ''"
                                v-model="dataVariables.price"
                                placeholder="Enter Price"
                                class="w-full text-black dark:text-[#dfdfdf] text-[13px] border dark:border-[#5d5d5d] dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-[4px]"
                            />
                            <div v-if="dataVariables.showError && !dataVariables.price" class="error-message">This field is required</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pc__card mb-[16px]">
                <div class="card__header">Dimensions</div>
                <div class="card__form">
                    <div class="form__group__outer md:flex gap-[16px]">
                        <div class="form__group md:w-[33.33%] w-full">
                            <label class="w-[100%]">Length (cm) <span>*</span></label>
                            <skeletonView v-if="dataVariables.iskeleton" width="100%" height="32px" class="rounded-[4px]"> </skeletonView>

                            <input
                                v-else
                                @input="isFloat(dataVariables.length, 'length')"
                                @paste="handlePaste($event, 'length')"
                                v-model="dataVariables.length"
                                type="text"
                                placeholder="Enter Length"
                                class="w-full text-black dark:text-[#dfdfdf] text-[13px] border dark:border-[#5d5d5d] dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-[4px]"
                                :class="props.modalType === 'view' ? 'disabled-input' : ''"
                            />
                            <div v-if="dataVariables.showError && !dataVariables.length.trim()" class="error-message">Length is required</div>
                        </div>
                        <div class="form__group md:w-[33.33%] w-full">
                            <label class="w-[100%]">Width (cm)<span>*</span></label>
                            <skeletonView v-if="dataVariables.iskeleton" width="100%" height="32px" class="rounded-[4px]"> </skeletonView>
                            <input
                                v-else
                                @input="isFloat(dataVariables.width, 'width')"
                                @paste="handlePaste($event, 'width')"
                                :class="props.modalType === 'view' ? 'disabled-input' : ''"
                                v-model="dataVariables.width"
                                type="text"
                                placeholder="Enter Width"
                                class="w-full text-black dark:text-[#dfdfdf] text-[13px] border dark:border-[#5d5d5d] dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-[4px]"
                            />
                            <div v-if="dataVariables.showError && !dataVariables.width.trim()" class="error-message">Width is required</div>
                        </div>
                        <div class="form__group md:w-[33.33%] w-full">
                            <label class="w-[100%]">Height (cm) <span>*</span></label>
                            <skeletonView v-if="dataVariables.iskeleton" width="100%" height="32px" class="rounded-[4px]"> </skeletonView>
                            <input
                                v-else
                                @input="isFloat(dataVariables.height, 'height')"
                                @paste="handlePaste($event, 'height')"
                                :class="props.modalType === 'view' ? 'disabled-input' : ''"
                                v-model="dataVariables.height"
                                type="text"
                                placeholder="Enter Height"
                                class="w-full text-black dark:text-[#dfdfdf] text-[13px] border dark:border-[#5d5d5d] dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-[4px]"
                            />
                            <div v-if="dataVariables.showError && !dataVariables.height.trim()" class="error-message">Height is required</div>
                        </div>
                    </div>
                    <div class="form__group__outer md:flex gap-[16px]">
                        <div class="form__group md:w-[33.33%] w-full">
                            <label class="w-[100%]">Actual Weight (in kg) <span>*</span></label>
                            <skeletonView v-if="dataVariables.iskeleton" width="100%" height="32px" class="rounded-[4px]"> </skeletonView>
                            <input
                                v-else
                                @input="isFloat(dataVariables.actualWeight, 'actualWeight')"
                                @paste="handlePaste($event, 'actualWeight')"
                                :class="props.modalType === 'view' ? 'disabled-input' : ''"
                                v-model="dataVariables.actualWeight"
                                type="text"
                                placeholder="Enter Weight"
                                max="99.99"
                                class="w-full text-black dark:text-[#dfdfdf] text-[13px] border dark:border-[#5d5d5d] dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-[4px]"
                            />
                            <div v-if="dataVariables.showError && !dataVariables.actualWeight.trim()" class="error-message">Actual Weight is required</div>
                        </div>
                        <div class="form__group md:w-[33.33%] w-full">
                            <label class="w-[100%]">Volumetric Weight (in kg)<span>*</span></label>
                            <skeletonView v-if="dataVariables.iskeleton" width="100%" height="32px" class="rounded-[4px]"> </skeletonView>
                            <input
                                v-else
                                v-model="dataVariables.volumatricWeight"
                                type="text"
                                placeholder="Enter Weight"
                                class="w-full text-black dark:text-[#dfdfdf] text-[13px] border dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-[4px]"
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="pc__card">
                <uploadImage :modalType="props.modalType" :vendorId="dataVariables.vendorData[1]"></uploadImage>
            </div>
        </div>
    </DialogView>
</template>

<style lang="scss">
@import './productModal.scss';
</style>
