<script setup lang="ts">
import { computed, watch, ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { CHECKOUTSETTING } from '../../../../store/checkout/checkout-setting/constant';
import SidebarSetting from '../../../../views/checkout/setting/setting-sidebar/SidebarSetting.vue';
import { TRACKINGINFOSETTING } from '../../../../store/checkout/trackinginfo-setting/constant';
import Skeleton from 'primevue/skeleton';
import { DARKMODE } from '../../../../store/dark-mode/constants';
import { checkAccessRight, deepCheckAccessRight } from '../../../../util/commonHandlers'
import VendorModal from '../../../../components/common-modal-files/VendorModal.vue';
const topHeader = JSON.parse(localStorage.getItem('top_header'));
import { checkUserType } from '../../../../util/commonHandlers'; //checkUserType
import BaseInput from '../../../../components/base/BaseInput.vue';
import BaseCheckBox from '../../../../components/base/BaseCheckBox.vue';
import BaseSubmitButton from '../../../../components/base/BaseSubmitButton.vue';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const getStoreId = computed(() => store.getters[`${CHECKOUTSETTING.NAME}/sendStoreId`]);
const store = useStore();
const toast = useToast();
const pixelId = ref('');
const accessToken = ref('');
const pixelId_1 = ref('');
const pixelIdFb_1 = ref(false);
const accessToken_1 = ref('');
const pixelId_2 = ref('');
const pixelIdFb_2 = ref(false);
const accessToken_2 = ref('');
const measurementId = ref(null);
const loading = ref(false);
const availAddPixel = ref(true);
const fbcheckoutinitiated = ref(null);
const fbcheckoutpaymentinfo = ref(null);
const fbcheckoutpurchase = ref(null);
const ga4checkoutinitiated = ref(null);
const ga4checkoutshipping = ref(null);
const ga4checkoutpurchase = ref(null);
const trackingStoreDetails = ref(null);
const pixcelError = ref(false);
const pixcelError2 = ref(false);
const isUpdate = ref(false);
const showListData = ref(false);
const showdropdown = ref(false);
const storeDropdownData = ref();
// const isSkeleton = computed(()=>store.getters[`${CHECKOUTSETTING.NAME}/trackingSkeleton`]);
const isSkeleton = ref(false);
onMounted(async () => {
    document.body.classList.add('tracking-Page-outer');
    checkAccessRight('settings') ? true : deepCheckAccessRight('checkout', 'settings', 'tracking');
    showdropdown.value = !checkUserType('vendor') ? false : true;
    showListData.value = !checkUserType('vendor') ? false : true;
});
onBeforeUnmount(() => {
    document.body.classList.remove('tracking-Page-outer');
});
// Select Vendor model
const getImg = (imageName) => {
    return new URL(`../../../../assets/images/${imageName}.svg`, import.meta.url).href;
};

const isAdmin = ref(false);
const vendorData = ref([]);
const showVendorModal = () => {
    isAdmin.value = true;
};
const applyVendorFilter = async (vendorName) => {
    vendorName.forEach(async (element) => {
        isAdmin.value = false;
        showdropdown.value = true;
        const tempData = element.split(',');
        const payload = {
            framework: '1',
            vendorID: tempData[1],
        };
        vendorData.value = tempData;
    });
    const data = {
        vendor_id: vendorData.value[1] || '',
    };
    await store.dispatch(`${CHECKOUTSETTING.NAME}/getStoreDetails`, data);
    showListData.value = true;
    storeDropdownData.value = store.getters[`${CHECKOUTSETTING.NAME}/sendStoreDetails`];
};
const resetVendorFilter = () => {
    vendorData.value = [];
    isAdmin.value = false;
    // showListData.value = false;

};
// Selecte vendor model end

const updateTrackingDetails = async () => {
    // debugger
    if (!isUpdate.value) {
        return;
    } else {
        loading.value = true;
        const data = {
            // vendor_id: getVendorValues.value?.id[0] || '',
            vendor_id: vendorData.value[1] || '',
            storeId: getStoreId.value,
            // pixelId: pixelId.value,
            // accessToken: accessToken.value,
            // pixelId_1: pixelId_1.value,
            // accessToken_1: accessToken_1.value,
            // pixelId_2: pixelId_2.value,
            // accessToken_2: accessToken_2.value,
            measurementId: measurementId.value,
            fbcheckoutinitiated: fbcheckoutinitiated.value ? '1' : '0',
            fbcheckoutpaymentinfo: fbcheckoutpaymentinfo.value ? '1' : '0',
            fbcheckoutpurchase: fbcheckoutpurchase.value ? '1' : '0',
            ga4checkoutinitiated: ga4checkoutinitiated.value ? '1' : '0',
            ga4checkoutshipping: ga4checkoutshipping.value ? '1' : '0',
            ga4checkoutpurchase: ga4checkoutpurchase.value ? '1' : '0',
        };
        inputRows.value.forEach((inputRow, index) => {
            data[`pixelId_${index}`] = inputRow.pixelId;
            data[`accessToken_${index}`] = inputRow.accessToken;
        });
        await store.dispatch(`${TRACKINGINFOSETTING.NAME}/updateTrackingDetails`, data);
        // await store.dispatch(`${CHECKOUTSETTING.NAME}/getTrackingDetails`, { storeId: getStoreId.value});
        const status = store.getters[`${TRACKINGINFOSETTING.NAME}/sendtrackingsuccess`];
        loading.value = false;
        if (status.status == 'success') {
            toast.add({ severity: 'success', summary: 'Success Message', detail: status.message, life: 1000 });
        } else {
            toast.add({ severity: 'error', summary: 'Error Message', detail: status.message, life: 1000 });
        }
       isUpdate.value = false;
    }
};
const trackingDetails = async () => {
    isSkeleton.value = true;
    await store.dispatch(`${CHECKOUTSETTING.NAME}/getTrackingDetails`, { storeId: getStoreId.value, vendor_id: vendorData.value[1] || '' });
    isSkeleton.value = false;
    trackingStoreDetails.value = await store.getters[`${CHECKOUTSETTING.NAME}/sendTrackingDetails`];
    pixelId.value = trackingStoreDetails.value.fb_pixel_id_1;
    accessToken.value = trackingStoreDetails.value.fb_access_token_1;
    measurementId.value = trackingStoreDetails.value.ga4_measurement_id;
    fbcheckoutinitiated.value = trackingStoreDetails.value.fb_checkout_initiated_event === '1' ? true : false;
    fbcheckoutpaymentinfo.value = trackingStoreDetails.value.fb_checkout_add_payment_info_event === '1' ? true : false;
    fbcheckoutpurchase.value = trackingStoreDetails.value.fb_checkout_purchase_event === '1' ? true : false;
    ga4checkoutinitiated.value = trackingStoreDetails.value.ga4_checkout_initiated_event === '1' ? true : false;
    ga4checkoutshipping.value = trackingStoreDetails.value.ga4_checkout_add_shipping_info === '1' ? true : false;
    ga4checkoutpurchase.value = trackingStoreDetails.value.ga4_checkout_purchase_event === '1' ? true : false;
    if (trackingStoreDetails.value.fb_pixel_id_2 != '' || trackingStoreDetails.value.fb_access_token_2 != '') {
        pixelIdFb_1.value = true;
        pixelId_1.value = trackingStoreDetails.value.fb_pixel_id_2;
        accessToken_1.value = trackingStoreDetails.value.fb_access_token_2;
    }
    if (trackingStoreDetails.value.fb_pixel_id_3 != '' || trackingStoreDetails.value.fb_access_token_3 != '') {
        pixelIdFb_2.value = true;
        pixelId_2.value = trackingStoreDetails.value.fb_pixel_id_3;
        accessToken_2.value = trackingStoreDetails.value.fb_access_token_3;
    }
};
watch(
    () => pixelId.value || accessToken.value,
    () => {
        pixcelError.value = false;
    }
);
watch(
    () => pixelId_1.value || accessToken_1.value,
    () => {
        pixcelError2.value = false;
    }
);
const addPixel = async () => {
    // debugger
    const trackingStoreDetails = await store.getters[`${CHECKOUTSETTING.NAME}/sendTrackingDetails`];
    if ((pixelId.value == null || pixelId.value == '') && (accessToken.value == null || accessToken.value == '')) {
        pixcelError.value = true;
        if (pixelIdFb_1.value == true && (pixelId_1.value == null || pixelId_1.value == '') && (accessToken_1.value == null || accessToken_1.value == '')) {
            pixcelError2.value = true;
            return;
        }
        return;
    }
    if (pixelIdFb_1.value == true && (pixelId_1.value == null || pixelId_1.value == '') && (accessToken_1.value == null || accessToken_1.value == '')) {
        pixcelError2.value = true;
        return;
    }

    if (pixelId_2.value) {
        availAddPixel.value = false;
        return;
    } else {
        if (!pixelIdFb_1.value) { // If the second row is deleted
            pixelIdFb_1.value = true; // Add the second row again
            console.log(trackingStoreDetails, 'trackingStoreDetails')
            if (trackingStoreDetails != '' && trackingStoreDetails != undefined) {
                pixelId_1.value = trackingStoreDetails.fb_pixel_id_2;
                accessToken_1.value = trackingStoreDetails.fb_access_token_2;
            }
            return;
        }
        if (pixelId_1.value || accessToken_1.value) {
            pixelIdFb_2.value = true;
            if (trackingStoreDetails != '' && trackingStoreDetails != undefined) {
                pixelId_2.value = trackingStoreDetails.fb_pixel_id_3;
                accessToken_2.value = trackingStoreDetails.fb_access_token_3;
            }
            availAddPixel.value = false;
        } else if (pixelId.value || accessToken.value) {
            pixelIdFb_1.value = true;
            console.log(trackingStoreDetails, 'trackingStoreDetails')
            if (trackingStoreDetails != '' && trackingStoreDetails != undefined) {
                pixelId_1.value = trackingStoreDetails.fb_pixel_id_2;
                accessToken_1.value = trackingStoreDetails.fb_access_token_2;
            }
        }
    }
};
const removeInput = (value) => {
    if (value == 2) {
        pixelIdFb_1.value = false;
        availAddPixel.value = true;
        pixelId_1.value = '';
        accessToken_1.value = '';
    } else if (value == 3) {
        availAddPixel.value = true;
        pixelIdFb_2.value = false;
        pixelId_2.value = '';
        accessToken_2.value = '';
    }
};
const getpixelId = (value) => {
    pixelId.value = value;
    isUpdate.value = true;
};
const getaccessToken = (value) => {
    accessToken.value = value;
    isUpdate.value = true;
};
const getpixelId_1 = (value) => {
    pixelId_1.value = value;
    isUpdate.value = true;
};
const getaccessToken_1 = (value) => {
    accessToken_1.value = value;
    isUpdate.value = true;
};
const getpixelId_2 = (value) => {
    pixelId_2.value = value;
    isUpdate.value = true;
};
const getaccessToken_2 = (value) => {
    accessToken_2.value = value;
    isUpdate.value = true;
};
const getmeasurementId = (value) => {
    // measurementId.value = value;
    isUpdate.value = true;
};
const getfbcheckoutinitiated = (value) => {
    fbcheckoutinitiated.value = value;
    isUpdate.value = true;
};
const getfbcheckoutpaymentinfo = (value) => {
    fbcheckoutpaymentinfo.value = value;
    isUpdate.value = true;
};
const getfbcheckoutpurchase = (value) => {
    fbcheckoutpurchase.value = value;
    isUpdate.value = true;
};
const CheckoutInitiated = ref(false)
const getga4checkoutinitiated = (value) => {
    ga4checkoutinitiated.value = value.is_checked;
    isUpdate.value = true;
    CheckoutInitiated.value = value.is_checked ? true : false; 
};
const shippinginfo = ref(false)
const getga4checkoutshipping = (value) => {
    ga4checkoutshipping.value = value.is_checked;
    isUpdate.value = true;
    shippinginfo.value = value.is_checked ? true : false;
};
const Purchase = ref(false)
const getga4checkoutpurchase = (value) => {
    ga4checkoutpurchase.value = value.is_checked;
    isUpdate.value = true;
    Purchase.value = value.is_checked ? true : false;
};

const checkouttracking = ref({
           id:'smsoption',
           is_checked: ga4checkoutinitiated.value,
});
const checkoutshipping = ref({
    id:'smsoption',
    is_checked:ga4checkoutshipping.value,
});
const checkoutpurchase = ref({
    id:'smsoption',
    is_checked:ga4checkoutpurchase.value,
});
const inputDynamicValue = ref({
    pixelLabel: {
        forLabel: 'pixel',
        class: 'input-label',
        lableName: 'Pixel ID',
    },
    // pixelInput: {
    //     type: 'text',
    //     id: 'pixel',
    //     placeholder: '',
    //     name: 'pixel',
    //     class: 'input-text',
    // },
    accesstokenLabel: {
        forLabel: 'accesstoken',
        class: 'input-label',
        lableName: 'Access Token',
    },
    // accesstokenInput: {
    //     type: 'text',
    //     id: 'accesstoken',
    //     placeholder: '',
    //     name: 'accesstoken',
    //     class: 'input-text',
    // },
    measurementLabel: {
        forLabel: 'measurement',
        class: 'input-label',
        lableName: 'Measurement ID',
    },
    // measurementInput: {
    //     type: 'text',
    //     id: 'measurement',
    //     placeholder: '',
    //     name: 'measurement',
    //     class: 'input-text',
    // },

    // trackingOptions: {
    //     type: 'checkbox',
    //     id: 'smsoption',
    //     name: 'smsoption',
    //     value: "smsoption",
    //     change: 'handleChange',
    // },
    
    // saveBtn: {
    //     type: 'submit',
    //     class: 'save-btn',
    //     text: 'Save',
    // },
});
const validateNumber = (event) => {
    // Check if the pressed key is a number or a special key
    if (!(event.key === 'Backspace' || event.key === 'Delete') && isNaN(Number(event.key))) {
        event.preventDefault(); // Prevent the input if the entered key is not a number
    }
};
// Initial input rows
const inputRows = ref([
    { pixelId: '', accessToken: '', pixcelError: false },
]);

const addPixel1 = () => {
    const lastRow = inputRows.value[inputRows.value.length - 1];
    const isRowFilled = lastRow.pixelId.trim() !== '' || lastRow.accessToken.trim() !== '';

    if (inputRows.value.length < 3 && isRowFilled) {
        const newRow = { pixelId: '', accessToken: '', pixcelError: false };
        inputRows.value.push(newRow);
    } else {
        inputRows.value[inputRows.value.length - 1].pixcelError = true;
    }
    if (isRowFilled) {
        inputRows.value[inputRows.value.length - 1].pixcelError = false;
    }
};

// Function to remove an input row
const removeInput1 = (index) => {
    inputRows.value.splice(index, 1);
};

// Function to update pixelId in a specific row
const updatePixelId = (index, value) => {
    inputRows.value[index].pixelId = value;
};

// Function to update accessToken in a specific row
const updateAccessToken = (index, value) => {
    inputRows.value[index].accessToken = value;
};
const hideError = (index) => {
    inputRows.value[index].pixcelError = false;
};
</script>
<template>
    <ToastView />
    <div class="trackinginfo">
        <div class="main-page-title">
            <div class="main-page-first-div">
                <div class="title-page">Tracking Info</div>
                <!-- Select Vebdor -->
                <div>
                    <div v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" style="font-size: 14px"
                        class="flex md:justify-center md:items-center md:space-between">
                        <div class="show-vendor" @click="showVendorModal()">
                            <span class="ml-[8px]" v-if="vendorData.length == 0"> ( Select
                                Vendor ) </span>
                            <span v-else class="vendorMargin"> {{ vendorData[0] }} </span>
                            <button class="show-vendor-btn ">
                                <img v-if="!darkModeVal" :src="getImg('vendor_v3')" />
                                <img v-else src="../../../../assets/images/dark-mode/dark-vendor_v3.svg" alt="vendor" />
                            </button>
                        </div>
                        <VendorModal v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" v-show="isAdmin"
                            @close-modal="isAdmin = false" @applyVendor="applyVendorFilter"
                            @resetVendor="resetVendorFilter" />
                    </div>
                </div>
            </div>
            <SidebarSetting :dropdownData="storeDropdownData" @tracking-details="trackingDetails" v-if="showListData">
            </SidebarSetting>
        </div>
        <div v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2 && !showListData"
            class="no-record-outer flex flex-col justify-center items-center gap-1 h-[60vh] py-[50px] ">
            <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
            <div class="head text-[#9CA3AF] text-[16px] p-[50px]">No Records Found</div>
        </div>
        <div v-else>
            <div class="main-section"
                :class="(topHeader['user_type'] == 1 || topHeader['user_type'] == 2) ? 'subadmin-main-section' : ''">
                <div class="main-info">
                    <div class="header">Facebook</div>
                    <hr />
                </div>
                <section>
                    <div class="conatiner">
                        <div class="info" v-for="(inputRow, index) in inputRows" :key="index">
                            <div class="feedback-info">
                                <div class="feedback-right">
                                    <div class="main-input">
                                        <DynamicLable :lableValues="inputDynamicValue.pixelLabel" />
                                        <Skeleton v-if="isSkeleton" height="32px" borderRadius="4px" />
                                        <!-- <DynamicInput v-else :inputValues="inputDynamicValue.pixelInput"
                                            :modelInput="inputRow.pixelId" @inputValue="updatePixelId(index, $event)"
                                            :ref="`pixelInput_${index}`" @input="hideError(index)"
                                            @keydown="validateNumber" /> -->
                                     <BaseInput v-else inputType="text" id="pixel" twClasses="input-text" placeholder=""
                                        v-model="inputRow.pixelId" @input="hideError(index)" :ref="`pixelInput_${index}`"  @inputValue="updatePixelId(index, $event)" @keydown="validateNumber"/>
                                    </div>
                                    <div class="main-input right">
                                        <DynamicLable :lableValues="inputDynamicValue.accesstokenLabel" />
                                        <Skeleton v-if="isSkeleton" height="32px" borderRadius="4px" />
                                        <!-- <DynamicInput v-else :inputValues="inputDynamicValue.accesstokenInput"
                                            :modelInput="inputRow.accessToken"
                                            @inputValue="updateAccessToken(index, $event)" @input="hideError(index)"
                                            :ref="`accessToken_${index}`" /> -->
                                    <BaseInput v-else inputType="text" id="accesstoken" twClasses="input-text" placeholder=""
                                    v-model="inputRow.accessToken" @input="hideError(index)" :ref="`accessToken_${index}`"  @inputValue="updatePixelId(index, $event)"/>
                                    </div>
                                    <div class="remove-icon-tracking" @click="removeInput1(index)" v-if="index > 0"><img
                                            src="../../../../assets/images/save-filter-delete.svg" /></div>
                                </div>
                            </div>
                            <div class="pixcel-error-msg" v-if="inputRow.pixcelError">This value is required</div>
                        </div>
                        <div class="add-pixel" v-if="availAddPixel" v-show="inputRows.length < 3">
                            <div class="add-pixeldata" @click="addPixel1()">
                                <div class="pixel-img">
                                    <img src="@\assets\images\plus-circle.png" />
                                </div>
                                <div class="add-pixel-info">Add Pixel</div>
                            </div>
                        </div>
                        <!-- <div class="info">
                        <div class="feedback-info">
                            <div class="feedback-right">
                                <div class="main-input">
                                    <DynamicLable :lableValues="inputDynamicValue.pixelLabel" />
                                    <Skeleton v-if="isSkeleton" height="32px" borderRadius="4px" />
                                    <DynamicInput v-else :inputValues="inputDynamicValue.pixelInput" :modelInput="pixelId" @inputValue="getpixelId" @keydown="validateNumber" />
                                </div>
                                <div class="main-input right">
                                    <DynamicLable :lableValues="inputDynamicValue.accesstokenLabel" />
                                    <Skeleton v-if="isSkeleton" height="32px" borderRadius="4px" />
                                    <DynamicInput v-else :inputValues="inputDynamicValue.accesstokenInput" :modelInput="accessToken" @inputValue="getaccessToken" />
                                </div>
                                <div class="remove-icon-tracking"></div>
                            </div>
                        </div>
                    </div>
                    <div class="pixcel-error-msg" v-if="pixcelError">This value is required</div>
                    <div v-if="pixelIdFb_1" class="info">
                        <div class="feedback-info">
                            <div class="feedback-right">
                                <div class="main-input">
                                    <DynamicLable :lableValues="inputDynamicValue.pixelLabel" />
                                    <Skeleton v-if="isSkeleton" height="32px" borderRadius="4px" />
                                    <DynamicInput v-else :inputValues="inputDynamicValue.pixelInput" :modelInput="pixelId_1" @inputValue="getpixelId_1" @keydown="validateNumber" />
                                </div>
                                <div class="main-input right">
                                    <DynamicLable :lableValues="inputDynamicValue.accesstokenLabel" />
                                    <Skeleton v-if="isSkeleton" height="32px" borderRadius="4px" />
                                    <DynamicInput v-else :inputValues="inputDynamicValue.accesstokenInput" :modelInput="accessToken_1" @inputValue="getaccessToken_1" />
                                </div>
                                <div class="remove-icon-tracking" @click="removeInput(2)"><img src="../../../../assets/images/save-filter-delete.svg" /></div>
                            </div>
                        </div>
                    </div>
                    <div class="pixcel-error-msg" v-if="pixcelError2">This value is required</div>
                    <div v-if="pixelIdFb_2" class="info">
                        <div class="feedback-info">
                            <div class="feedback-right">
                                <div class="main-input">
                                    <DynamicLable :lableValues="inputDynamicValue.pixelLabel" />
                                    <Skeleton v-if="isSkeleton" height="32px" borderRadius="4px" />
                                    <DynamicInput v-else :inputValues="inputDynamicValue.pixelInput" :modelInput="pixelId_2" @inputValue="getpixelId_2" @keydown="validateNumber" />
                                </div>
                                <div class="main-input right">
                                    <DynamicLable :lableValues="inputDynamicValue.accesstokenLabel" />
                                    <Skeleton v-if="isSkeleton" height="32px" borderRadius="4px" />
                                    <DynamicInput v-else :inputValues="inputDynamicValue.accesstokenInput" :modelInput="accessToken_2" @inputValue="getaccessToken_2" />
                                </div>
                                <div class="remove-icon-tracking" @click="removeInput(3)"><img src="../../../../assets/images/save-filter-delete.svg" /></div>
                            </div>
                        </div>
                    </div> -->
                        <!-- <div class="pixcel-error-msg" v-if="pixcelError2">This value is required</div> -->
                        <!-- <div class="add-pixel">
                        <div class="add-pixeldata" v-if="availAddPixel" :class="availAddPixel ? '' : 'not-allowed'" @click="addPixel()">
                            <div class="pixel-img">
                                <img src="@\assets\images\plus-circle.png" />
                            </div>
                            <div class="add-pixel-info">Add Pixel</div>
                        </div>
                    </div>
                    <div class="tracking-options">
                        <p class="selects-tracking">Select the Events you want to trigger</p>
                        <div class="check-tracking">
                            <div class="multiple-options" :class="fbcheckoutinitiated == true ? 'chekbox-checked-active' : ''">
                                <div class="">
                                    <DyanamicCheckbox :inputCheckbox="inputDynamicValue.trackingOptions" id="checkout_initiate" :checbox-model-value="fbcheckoutinitiated" @updatedChecboxValue="getfbcheckoutinitiated" class="dayanmic-checkbox" />
                                    <label for="checkout_initiate" class="select-optiontext">
                                        <div class="trackingoptions">
                                            <div class="options-title">Checkout Initiated</div>
                                            <div class="options-content">This event is triggered when the checkout pop-up opens. It is the standard Meta Pixel Initiate Checkout event.</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div class="multiple-options" :class="fbcheckoutpaymentinfo == true ? 'chekbox-checked-active' : ''">
                                <div class="tracking-info-outer">
                                    <DyanamicCheckbox :inputCheckbox="inputDynamicValue.trackingOptions" id="shipping" :checbox-model-value="fbcheckoutpaymentinfo" @updatedChecboxValue="getfbcheckoutpaymentinfo" class="dayanmic-checkbox" />
                                    <label for="shipping" class="select-optiontext">
                                        <div class="trackingoptions">
                                            <div class="options-title">Add Shipping Info</div>
                                            <div class="options-content">This event is triggered when the user reaches payment stage. It is the standard Meta Pixel AddPaymentInfo event.</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div class="multiple-options" :class="fbcheckoutpurchase == true ? 'chekbox-checked-active' : ''">
                                <div class="">
                                    <DyanamicCheckbox :inputCheckbox="inputDynamicValue.trackingOptions" id="purchase" :checbox-model-value="fbcheckoutpurchase" @updatedChecboxValue="getfbcheckoutpurchase" class="dayanmic-checkbox" />
                                    <label for="purchase" class="select-optiontext">
                                        <div class="trackingoptions">
                                            <div class="options-title">Purchase</div>
                                            <div class="options-content">This event is triggered when the order is placed. This is the standard Meta Pixel Purchase event.</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    </div>
                </section>
            </div>
            <div class="main-section googleanalystic">
                <div class="main-info">
                    <div class="header">
                        <span> Google Analytics 4</span>
                    </div>
                </div>
                <section>
                    <div class="conatiner">
                        <div class="info">
                            <div class="feedback-info">
                                <div class="feedback-right">
                                    <div class="main-input">
                                        <DynamicLable :lableValues="inputDynamicValue.measurementLabel" />
                                        <!-- <DynamicInput :inputValues="inputDynamicValue.measurementInput"
                                            :modelInput="measurementId" @change="handleChange"
                                            @inputValue="getmeasurementId" /> -->
                                            <BaseInput inputType="text" id="measurement" twClasses="input-text" placeholder=""
                                    v-model="measurementId" @input="getmeasurementId"/>
                                    </div>
                                    <div class="main-input right"></div>
                                </div>
                            </div>
                        </div>
                        <div class="tracking-options">
                            <p class="selects-tracking">Select the Events you want to trigger</p>
                            <div class="check-tracking">
                                <div class="multiple-options" :class="ga4checkoutinitiated == true ? 'chekbox-checked-active' : ''">
                                    <div class="relative ">
                                            <BaseCheckBox :data="checkouttracking"  
                                            @listenCheckboxChange="(val) => getga4checkoutinitiated(val)" class="absolute"/>                                           
                                            <div class="trackingoptions">
                                                 <div class="options-title"  :class="{ 'chekbox-checked-active': !CheckoutInitiated, 'chekbox-checked-active': CheckoutInitiated }">Checkout Initiated</div>
                                                <div class="options-content">This event is triggered when the checkout
                                                    pop-up opens. It is the standard Meta Pixel Initiate Checkout event.
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div class="multiple-options"
                                    :class="ga4checkoutshipping == true ? 'chekbox-checked-active' : ''">
                                    <div class="relative">
                                            <BaseCheckBox :data="checkoutshipping"  
                                            @listenCheckboxChange="(val) => getga4checkoutshipping(val)" class="absolute "/>
                                        <label for="g_shipping" class="select-optiontext">
                                            <div class="trackingoptions">
                                                <div class="options-title" :class="{ 'font-13px': !shippinginfo, 'font-family-inter-medium': shippinginfo }">Add Shipping Info</div>
                                                <div class="options-content">This event is triggered when the user
                                                    reaches payment stage. It is the standard Meta Pixel AddPaymentInfo
                                                    event.</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div class="multiple-options"
                                    :class="ga4checkoutpurchase == true ? 'chekbox-checked-active' : ''">
                                    <div class="relative">
                                            <BaseCheckBox :data="checkoutpurchase"  
                                            @listenCheckboxChange="(val) => getga4checkoutpurchase(val)" class="absolute "/>
                                        <label for="g_purchase" class="select-optiontext">
                                            <div class="trackingoptions">
                                                <div class="options-title" :class="{ 'font-13px': !purchase, 'font-family-inter-medium': purchase }">Purchase</div>
                                                <div class="options-content">This event is triggered when the order is
                                                    placed. This is the standard Meta Pixel Purchase event.</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="btn">
                <div class="container">
                    <!-- <DynamicButton :class="[loading]" :buttonValue="inputDynamicValue.saveBtn" :loading="loading"
                        :clickevent="updateTrackingDetails"
                        v-if="checkAccessRight('settings') ? true : deepCheckAccessRight('checkout', 'settings', 'action_tracking')" /> -->
                        <BaseSubmitButton text="Save" tw-classes="save-btn" class="[loading]"
                        @click="updateTrackingDetails" :isLoading="loading"
                        v-if="checkAccessRight('settings') ? true : deepCheckAccessRight('checkout', 'settings', 'action_tracking')" />
                    
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
@import './TrackingInfoSetting.scss';
</style>
