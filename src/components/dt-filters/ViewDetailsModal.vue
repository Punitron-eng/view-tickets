<script setup>
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useRoute, useRouter } from 'vue-router';
import FlagIcon from '../../assets/images/modal-flag.svg';
import CopyIcon from '../../assets/images/modal-copy.svg';
import CloseIcon from '../../assets/images/close-icon.svg';
import EditIcon from '../../assets/images/modal-edit.svg';
import { RETURN } from '@/store/domestic/return-flow/constants';
import OtherIcon from '../../assets/images/modal-other.svg';
import ExtraIcon from '../../assets/images/modal-extra.svg';
import ArrowIcon from '../../assets/images/modal-arrow.svg';
import BasicIcon from '../../assets/images/modal-basic.svg';
import DotIcon from '../../assets/images/modal-3dot-icon.svg';
import ParcelIcon from '../../assets/images/modal-parcel.svg';
import BlueDartIcon from '../../assets/images/bluedart-v2.svg';
import MessageIcon from '../../assets/images/modal-message.svg';
import ProductIcon from '../../assets/images/modal-product.svg';
import WhatsappIcon from '../../assets/images/modal-whatsapp.svg';
import CustomerIcon from '../../assets/images/modal-customer.svg';
import LocationIcon from '../../assets/images/modal-location.svg';
import BlueTickIcon from '../../assets/images/modal-blue-tick.svg';
import GreenTickIcon from '../../assets/images/modal-green-tick.svg';
import ShopifyIcon from '../../assets/images/modal-shopify-icon.webp';
import { defineProps, ref, onMounted, computed, defineEmits, watch } from 'vue';
import { checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import NormalTabels from '../../components/itl-dataTable-files/itl-table/NormalTables.vue';
const store = useStore();
const route = useRoute();
const props = defineProps(['close', 'skeletonData', 'rowId', 'tabName', 'haveAccessActivity', 'haveAccessParcel', 'haveAccessPickNow', 'haveAccessReject', 'haveAccessOrderDetail', 'weightUpdateAvail']);
const emit = defineEmits(['showModal', 'rejectModal', 'updateReturnData']);
const PickupAddressText = ref(null);
const ShippingAddressText = ref(null);
const iskeleton = ref(false);
const toast = useToast();
import { DARKMODE } from '../../store/dark-mode/constants';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const viewDetailsValues = computed(() => store.getters[`${RETURN.NAME}/getViewDetails`]);
const productDetails = computed(() => store.getters[`${RETURN.NAME}/sendProductDetails`].all_product_data_array);
const activityDetails = computed(() => store.getters[`${RETURN.NAME}/getviewDetailModalData`].all_activity_details_data_array);
const showActivity = computed(() => store.getters[`${RETURN.NAME}/getviewDetailModalData`]);
const copyAddress = (addressType) => {
    const addressText = addressType === 'pickup' ? PickupAddressText : ShippingAddressText;

    if (addressText.value) {
        const addressTextValue = addressText.value.innerText;
        const textarea = document.createElement('textarea');
        textarea.value = addressTextValue;
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand('copy');

        document.body.removeChild(textarea);
        toast.add({ severity: 'success', summary: 'Copied !', detail: 'Copied !', life: 1000 });
    }
};
const activityModal = ref(true);
const detailModal = ref(true);
const HeaderFlex = ref(false);
onMounted(() => {
    if (window.matchMedia('(max-width: 767px)').matches) {
        HeaderFlex.value = true;
        detailModal.value = true;
        activityModal.value = false;
    } else if (window.matchMedia('(max-width: 950px)').matches) {
        HeaderFlex.value = true;
        detailModal.value = true;
        activityModal.value = true;
    }
});
watch(
    () => viewDetailsValues.value,
    () => {
        parcelSize.value.length = viewDetailsValues.value?.view_details_data?.parcel_info?.length || '';
        parcelSize.value.width = viewDetailsValues.value?.view_details_data?.parcel_info?.width || '';
        parcelSize.value.height = viewDetailsValues.value?.view_details_data?.parcel_info?.height || '';
        parcelSize.value.weight = viewDetailsValues.value?.view_details_data?.parcel_info?.weight;
        parcelSize.value.volumetric = viewDetailsValues.value?.view_details_data?.parcel_info?.volumetric_weight || '';
    }
);

const ColoumnKey = [
    {
        field: 'loop_product_title',
        header: 'Product',
    },
    {
        field: 'loop_product_quantity',
        header: 'QTY',
    },
    {
        field: 'loop_product_sku',
        header: 'SKU',
    },
    {
        field: 'loop_product_hsn_code',
        header: 'HSN CODE',
    },
    {
        field: 'loop_product_discount',
        header: 'DISCOUNT',
    },
    {
        field: 'loop_product_tax_rate',
        header: 'TAX RATE',
    },
    {
        field: 'loop_product_price',
        header: 'PRICE',
    },
];
const isEditModal = ref(false);
const isCustomerEditModal = ref(false);
const toggleEditModal = () => {
    isEditModal.value = !isEditModal.value;
};
const toggleEditModalCustomer = () => {
    isCustomerEditModal.value = !isCustomerEditModal.value;
    basicInfo.value.fullName = viewDetailsValues.value.view_details_data.customer_info.customer_full_name;
    basicInfo.value.mobileNumber = viewDetailsValues.value.view_details_data.customer_info.customer_mobile;
    basicInfo.value.emailId = viewDetailsValues.value.view_details_data.customer_info.customer_email;
    basicInfo.value.addressLine1 = viewDetailsValues.value.view_details_data.customer_info.pickup_address;
};
const parcelSize = ref({
    length: '',
    width: '',
    height: '',
    weight: '',
    volumetric: '',
});

const basicInfo = ref({
    fullName: '',
    mobileNumber: '',
    emailId: '',
    addressLine1: '',
    addressLine2: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
    invalidEmail: false,
});

const isFloat = (input, field) => {
    const inputValue = input;
    const regex = /^\d{0,3}(\.\d{0,2})?$/;
    if (!regex.test(inputValue)) {
        parcelSize.value[field] = inputValue.slice(0, -1);
    }
    const newResult = (Number(parcelSize.value.length) * Number(parcelSize.value.width) * Number(parcelSize.value.height)) / 5000;
    parcelSize.value.volumetric = parseFloat(newResult).toFixed(2);
};
const handlePaste = (event, field) => {
    event.preventDefault();
    const pastedText = (event.clipboardData || window.clipboardData).getData('text');
    parcelSize.value[field] = parseFloat(pastedText).toFixed(1);
    isFloat(parcelSize.value[field], field);
};
const validateMobNumber = (e) => {
    const charCode = !e.charCode ? e.which : e.charCode;
    if (!/^[0-9_]+$/.test(String.fromCharCode(charCode))) {
        e.preventDefault();
        return false;
    }
    return true;
};
const validateNumber = (e, id) => {
    const charCode = !e.charCode ? e.which : e.charCode;
    const input = e.target.value + String.fromCharCode(charCode);
    if (!/^\d*\.?\d{0,3}$/.test(input)) {
        e.preventDefault();
        return false;
    }
    return true;
};
const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    if (basicInfo.value.emailId === '' || emailPattern.test(basicInfo.value.emailId)) {
        basicInfo.value.invalidEmail = false;
    } else {
        basicInfo.value.invalidEmail = true;
    }
};

const toggleActivity = (index) => {
    activityDetails.value[index].isOpen = !activityDetails.value[index].isOpen;
};
const picknowModal = () => {
    const data = {
        isModalVisible: true,
        rowId: props.rowId,
    };

    emit('showModal', data);
};
const rejectModal = () => {
    const data = {
        isModalVisible: true,
        rowId: props.rowId,
    };
    emit('rejectModal', data);
};
const validateInput = (event) => {
    if ((event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46) {
        return true;
    } else {
        event.preventDefault(); // Prevent the default action (character insertion)
    }
};
const getCityState = async () => {
    await store.dispatch(`${RETURN.NAME}/getCityState`, { pincode: basicInfo.value.pincode });
    iskeleton.value = true;
    const result = store.getters[`${RETURN.NAME}/getCityState`];
    if (result.status == 'success') {
        basicInfo.value.city = result.city_title;
        basicInfo.value.state = result.state_title;
        iskeleton.value = false;
    }
};
const getIcon = (actionIcon) => {
    let imagePath = '';
    if (!darkModeVal) {
        imagePath = new URL(`../../assets/images/${actionIcon}`, import.meta.url).href;
    } else {
        imagePath = new URL(`../../assets/images/dark-mode/dark-${actionIcon}`, import.meta.url).href;
    }

    return imagePath;
};
const toggleSubmitModalData = async () => {
    const payload = {
        type: 'parcel_size',
        row_id: props.rowId,
        ...parcelSize.value,
    };
    await store.dispatch(`${RETURN.NAME}/getWeightData`, payload);
    const result = store.getters[`${RETURN.NAME}/getWeightApiData`];
    if (result.status === 'success') {
        toast.add({ severity: 'success', detail: result.html_message, life: 3000 });
        emit('updateReturnData');
    } else {
        toast.add({ severity: 'error', detail: result.html_message, life: 3000 });
    }
    isEditModal.value = !isEditModal.value;
};
</script>

<template>
    <div class="main-container">
        <div class="main-container-header flex flex-wrap bg-[#fff] dark:bg-[#3d3d3d] align-items-center">
            <div class="flex align-items-center header-content-1" :class="HeaderFlex ? 'flex-order-0' : 'flex-order-0'">
                <button class="close-button" @click="props.close">
                    <img v-if="darkModeVal != true" :src="CloseIcon" />
                    <img v-else src="../../assets/images/dark-mode/dark-modal-close-icon.svg" alt="close-icon" />
                </button>
                <span class="md:ml-4 modal-header-heading"> View Details</span>
            </div>
            <div class="flex md:hidden flex-order-3 header-tabs">
                <div class="flex flex-column align-items-center w-[80px]">
                    <button
                        class="mobile-button"
                        @click="
                            () => {
                                detailModal = true;
                                activityModal = false;
                            }
                        "
                    >
                        Summary
                    </button>

                    <div :class="{ 'active-button': detailModal }" />
                </div>
                <div class="flex flex-column align-items-center w-[80px]">
                    <button
                        class="mobile-button"
                        @click="
                            () => {
                                detailModal = false;
                                activityModal = true;
                            }
                        "
                    >
                        Activity
                    </button>

                    <div :class="{ 'active-button': activityModal }" />
                </div>
            </div>
            <div class="flex gap-2 mr-2rem header-end approve-reject-btn" :class="HeaderFlex ? 'flex-order-1' : 'flex-order-2'" v-if="props.weightUpdateAvail">
                <button v-if="checkAccessRight('reverse_order') ? true : deepCheckAccessRight('domestic', 'reverse_order', 'reject')" class="header-button2 reject-btn" @click="rejectModal()">Reject</button>
                <button v-if="checkAccessRight('reverse_order') ? true : deepCheckAccessRight('domestic', 'reverse_order', 'pick_now')" class="header-button2" @click="picknowModal()">Pick Now</button>
            </div>
        </div>
        <div class="container-section-2 flex justify-content-center gap-3">
            <div v-if="detailModal" class="w-screen md:w-auto">
                <div v-if="checkAccessRight('reverse_order') ? true : deepCheckAccessRight('domestic', 'reverse_order', 'order_details')" class="flex flex-column gap-3 container-section-left-cards">
                    <div class="container-basic bg-[#fff] dark:bg-[#3d3d3d] border-round-sm">
                        <div class="bottom-border container-basic-header">
                            <div class="flex align-items-center font-semibold gap-3 text-base">
                                <img :src="BasicIcon" class="basic-icon" />
                                Basic
                            </div>
                        </div>
                        <div class="bottom-border p-3 md:p-4">
                            <div class="flex modal-content-box">
                                <div class="flex justify-content-between basic-details-outer">
                                    <div class="flex justify-content-between basic-details-outer" v-if="props.skeletonData">
                                        <div class="flex basic-details-inner gap-2 mb-3">
                                            <div class="flex flex-column gap-2 modal-label">
                                                <span>
                                                    <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                                </span>
                                            </div>
                                            <div class="flex flex-column gap-2 modal-content">
                                                <div class="content-div flex flex-column gap-2">
                                                    <span>
                                                        <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex basic-details-inner gap-2 mb-3">
                                            <div class="flex flex-column gap-2 modal-label">
                                                <span>
                                                    <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                                </span>
                                            </div>
                                            <div class="flex flex-column gap-2 modal-content">
                                                <div class="content-div flex flex-column gap-2">
                                                    <span>
                                                        <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex basic-details-inner gap-2 mb-3">
                                            <div class="flex flex-column gap-2 modal-label">
                                                <span>
                                                    <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                                </span>
                                            </div>
                                            <div class="flex flex-column gap-2 modal-content">
                                                <div class="content-div flex flex-column gap-2">
                                                    <span>
                                                        <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex basic-details-inner gap-2 mb-3">
                                            <div class="flex flex-column gap-2 modal-label">
                                                <span>
                                                    <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                                </span>
                                            </div>
                                            <div class="flex flex-column gap-2 modal-content">
                                                <div class="content-div flex flex-column gap-2">
                                                    <span>
                                                        <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex justify-content-between basic-details-outer" v-else>
                                        <div class="flex basic-details-inner gap-2 mb-2" v-for="(details, index) in viewDetailsValues.view_details_data.basic_info" :key="index">
                                            <div class="flex flex-column gap-2 modal-label">
                                                <span>{{ details.label }}</span>
                                            </div>
                                            <div class="flex flex-column gap-2 modal-content">
                                                <div class="skeleton-div flex flex-column gap-2" style="display: none !important">
                                                    <span>
                                                        <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                                    </span>
                                                </div>
                                                <div class="content-div flex flex-column gap-2">
                                                    <span class="modal-details">{{ details.value }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p-3 md:p-4">
                            <div class="flex modal-content-box">
                                <div class="flex store-div-outer">
                                    <!-- {{ viewDetailsValues.view_details_data }} -->
                                    <div class="flex gap-2 flex-column modal-label">
                                        <span>Store Name</span>
                                        <span>Mobile No.</span>
                                    </div>
                                    <div class="flex gap-2 flex-column modal-content">
                                        <div class="skeleton-div flex flex-column gap-2" v-if="props.skeletonData">
                                            <span>
                                                <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                            </span>
                                            <span>
                                                <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                            </span>
                                        </div>
                                        <div class="content-div flex flex-column gap-2" v-else>
                                            <span>{{ viewDetailsValues.view_details_data.store_info.store_name }}</span>
                                            <span>{{ viewDetailsValues.view_details_data.store_info.contact_no }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex address-box">
                                    <div class="flex flex-column address-box-outer">
                                        <div class="text-xs pickup-add-head">SHIPPING ADDRESS</div>
                                        <div class="skeleton-div flex flex-column gap-2 pt-2 modal-content" v-if="props.skeletonData">
                                            <span>
                                                <skeletonView width="100%" height="8px" class="border-radius"> </skeletonView>
                                            </span>
                                            <span>
                                                <skeletonView width="80%" height="8px" class="border-radius"></skeletonView>
                                            </span>
                                            <span>
                                                <skeletonView width="60%" height="8px" class="border-radius"></skeletonView>
                                            </span>
                                        </div>
                                        <div class="content-div" v-else>
                                            <div class="flex gap-2 pt-2" style="color: #0c0c0d">
                                                <div>
                                                    <img v-if="!darkModeVal" :src="LocationIcon" />
                                                    <img v-else src="../../assets/images/dark-mode/dark-modal-location.svg" alt="close-icon" />
                                                </div>
                                                <div class="max-w-17rem text-[#3c4249] dark:text-[#dfdfdf]" ref="PickupAddressText">{{ viewDetailsValues.view_details_data.store_info.shipping_address }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="copy-button-div">
                                        <button class="copy-button" @click="() => copyAddress('pickup')">
                                            <img v-if="darkModeVal != true" :src="CopyIcon" />
                                            <img v-else src="../../assets/images/dark-mode/dark-modal-copy.svg" alt="close-icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-customer bg-[#fff] dark:bg-[#3d3d3d] border-round-sm">
                        <div class="bottom-border container-basic-header flex align-items-center gap-3 font-semibold text-base">
                            <div class="flex align-items-center gap-3 font-semibold text-base">
                                <img :src="CustomerIcon" />
                                <span class="font-semibold"> Customer </span>
                            </div>
                            <div class="edit-icon !hidden" v-if="!isCustomerEditModal">
                                <button class="edit-button" @click="toggleEditModalCustomer">
                                    <img v-if="darkModeVal != true" :src="EditIcon" />
                                    <img v-else src="../../assets/images/dark-mode/dark-modal-edit.svg" alt="" />
                                </button>
                            </div>
                        </div>
                        <div class="p-3 md:p-4" v-if="!isCustomerEditModal">
                            <div class="flex flex-column xl:flex-row">
                                <div class="flex store-div-outer">
                                    <div class="flex gap-2 flex-column modal-label">
                                        <span>Full Name</span>
                                        <span>Mobile No.</span>
                                        <span>Email </span>
                                    </div>
                                    <div class="flex gap-2 flex-column modal-content">
                                        <div class="skeleton-div flex flex-column gap-2 modal-content" v-if="props.skeletonData">
                                            <span>
                                                <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                            </span>
                                            <span>
                                                <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                            </span>
                                            <span>
                                                <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                            </span>
                                        </div>
                                        <div class="content-div flex flex-column gap-2 modal-content" v-else>
                                            <span class="font-bold">{{ viewDetailsValues.view_details_data.customer_info.customer_full_name }} </span>
                                            <span>{{ viewDetailsValues.view_details_data.customer_info.customer_mobile }}</span>
                                            <span class="email-id-data">{{ viewDetailsValues.view_details_data.customer_info.customer_email }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex address-box">
                                    <div class="flex flex-column address-box-outer">
                                        <div class="text-xs pickup-add-head">PICKUP ADDRESS</div>
                                        <div class="skeleton-div flex flex-column gap-2 pt-2 modal-content" v-if="props.skeletonData">
                                            <span>
                                                <skeletonView width="100%" height="8px" class="border-radius"> </skeletonView>
                                            </span>
                                            <span>
                                                <skeletonView width="80%" height="8px" class="border-radius"></skeletonView>
                                            </span>
                                            <span>
                                                <skeletonView width="60%" height="8px" class="border-radius"></skeletonView>
                                            </span>
                                        </div>
                                        <div class="flex gap-2 pt-1 address-content" v-else>
                                            <div>
                                                <img v-if="!darkModeVal" :src="LocationIcon" />
                                                <img v-else src="../../assets/images/dark-mode/dark-modal-location.svg" alt="close-icon" />
                                            </div>
                                            <div class="max-w-17rem text-[#3c4249] dark:text-[#dfdfdf]" ref="ShippingAddressText">{{ viewDetailsValues.view_details_data.customer_info.pickup_address }}</div>
                                        </div>
                                    </div>
                                    <div class="copy-button-div">
                                        <button class="copy-button" @click="copyAddress('shipping')">
                                            <img v-if="darkModeVal != true" :src="CopyIcon" />
                                            <img v-else src="../../assets/images/dark-mode/dark-modal-copy.svg" alt="close-icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="edit-modal-outer" v-if="isCustomerEditModal">
                            <div class="p-4 modal-content-form">
                                <div class="input-box-outer w-30">
                                    <label>Full Name <span>*</span></label>
                                    <input type="text" class="form-control" v-model="basicInfo.fullName" />
                                </div>
                                <div class="input-box-outer w-30">
                                    <label>Mobile No <span>*</span></label>
                                    <input type="text" @keypress="validateMobNumber" minlength="10" maxlength="10" class="form-control" v-model="basicInfo.mobileNumber" />
                                </div>
                                <div class="input-box-outer w-30">
                                    <label>Email Id <span>*</span></label>
                                    <input type="text" class="form-control" @input="validateEmail" v-model="basicInfo.emailId" />

                                    <div class="email-error" v-if="basicInfo.invalidEmail">Invalid Email Id</div>
                                </div>
                                <div class="text-xs pickup-add-head mt-3 w-100 mb-3">PICKUP ADDRESS</div>
                                <div class="input-box-outer w-30">
                                    <label>Address Line 1 <span>*</span></label>
                                    <input type="" class="form-control" v-model="basicInfo.addressLine1" />
                                </div>
                                <div class="input-box-outer w-30">
                                    <label>Address Line 2</label>
                                    <input type="" class="form-control" v-model="basicInfo.addressLine2" />
                                </div>
                                <div class="input-box-outer w-30">
                                    <label>Pincode <span>*</span></label>
                                    <input type="" @change="getCityState()" maxlength="6" @keypress="validateInput($event)" class="form-control" v-model="basicInfo.pincode" />
                                </div>
                                <div class="input-box-outer w-30">
                                    <label>City <span>*</span></label>
                                    <skeletonView v-if="iskeleton" width="100%" height="32px" class="rounded-[4px]"> </skeletonView>
                                    <input type="text" v-else class="form-control capitalize" v-model="basicInfo.city" />
                                </div>
                                <div class="input-box-outer w-30">
                                    <label>State <span>*</span></label>
                                    <skeletonView v-if="iskeleton" width="100%" height="32px" class="rounded-[4px]"> </skeletonView>
                                    <input type="" v-else class="form-control capitalize" v-model="basicInfo.state" />
                                </div>
                                <div class="input-box-outer w-30">
                                    <label>Country <span>*</span></label>
                                    <input type="" class="form-control" v-model="basicInfo.country" />
                                </div>
                            </div>
                            <div class="edit-modal-footer">
                                <button class="edit-btn cancel-btn" @click="toggleEditModalCustomer">Cancel</button>
                                <button class="edit-btn update-btn">Update</button>
                            </div>
                        </div>
                    </div>
                    <div class="container-product-details bg-[#fff] dark:bg-[#3d3d3d] border-round-sm">
                        <div class="pl-4 pr-4" style="padding-top: 12px">
                            <div class="flex align-items-center gap-3 font-semibold text-base">
                                <img :src="ProductIcon" />
                                <span class="font-semibold text-[#3c4249] dark:text-[#dfdfdf]"> Product Details</span>
                            </div>
                            <div style="padding-top: 12px">
                                <NormalTabels :Datas="productDetails" :coloumData="ColoumnKey" />
                            </div>
                        </div>
                    </div>
                    <div class="container-pracel-extra-details border-round-sm flex flex-column lg:flex-row gap-3">
                        <div class="bg-[#fff] dark:bg-[#3d3d3d] parcel-container parcel-extra-outer">
                            <div class="bottom-border container-basic-header flex align-items-center gap-3 text-base font-semibold">
                                <div class="flex align-items-center gap-3 font-semibold text-base">
                                    <img :src="ParcelIcon" />
                                    <span class="font-semibold"> Parcel Size </span>
                                </div>
                                <div class="edit-icon" v-if="!isEditModal && checkAccessRight('reverse_order') ? true : deepCheckAccessRight('domestic', 'reverse_order', 'edit_parcel') && props.weightUpdateAvail">
                                    <button class="edit-button" @click="toggleEditModal">
                                        <img v-if="darkModeVal != true" :src="EditIcon" />
                                        <img v-else src="../../assets/images/dark-mode/dark-modal-edit.svg" alt="" />
                                    </button>
                                </div>
                            </div>
                            <div class="p-3 md:p-4" v-if="!isEditModal">
                                <div class="flex justify-content-between">
                                    <div class="flex flex-column gap-2 parcel-label-container modal-label">
                                        <span>Length </span>
                                        <span>Width</span>
                                        <span>Height</span>
                                        <span>Weight</span>
                                        <span>Volumetric Weight</span>
                                    </div>
                                    <div class="flex flex-column gap-2 modal-content">
                                        <div class="skeleton-div flex flex-column gap-2" v-if="props.skeletonData">
                                            <span>
                                                <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                            </span>
                                            <span>
                                                <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                            </span>
                                            <span>
                                                <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                            </span>
                                            <span>
                                                <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                            </span>
                                            <span>
                                                <skeletonView width="80px" height="8px" class="border-radius"> </skeletonView>
                                            </span>
                                        </div>
                                        <div class="content-div flex flex-column gap-2" v-else>
                                            <span
                                                ><span v-if="viewDetailsValues.view_details_data.parcel_info.length != ''">{{ parcelSize.length }} cm</span><span v-else>N/A</span></span
                                            >
                                            <span
                                                ><span v-if="viewDetailsValues.view_details_data.parcel_info.width != ''">{{ parcelSize.width }} cm</span><span v-else>N/A</span></span
                                            >
                                            <span
                                                ><span v-if="viewDetailsValues.view_details_data.parcel_info.height != ''">{{ parcelSize.height }} cm</span> <span v-else>N/A</span></span
                                            >
                                            <span
                                                ><span v-if="viewDetailsValues.view_details_data.parcel_info.weight != ''">{{ parcelSize.weight }} kg</span><span v-else>N/A</span></span
                                            >
                                            <span>
                                                <span v-if="viewDetailsValues.view_details_data.parcel_info.volumetric_weight != ''">{{ parcelSize.volumetric }} kg</span><span v-else>N/A</span></span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="edit-modal-outer" v-if="isEditModal">
                                <div class="p-4 modal-content-form">
                                    <div class="input-box-outer w-50">
                                        <label>Length <span>*</span></label>
                                        <input type="number" @paste="handlePaste($event, 'length')" @input="isFloat(parcelSize.length, 'length')" @keypress="validateNumber($event)" class="form-control" v-model="parcelSize.length" />
                                    </div>
                                    <div class="input-box-outer w-50">
                                        <label>width <span>*</span></label>
                                        <input type="number" @paste="handlePaste($event, 'width')" @input="isFloat(parcelSize.width, 'width')" @keypress="validateNumber($event)" class="form-control" v-model="parcelSize.width" />
                                    </div>
                                    <div class="input-box-outer w-50">
                                        <label>Height <span>*</span></label>
                                        <input type="number" @paste="handlePaste($event, 'height')" @input="isFloat(parcelSize.height, 'height')" @keypress="validateNumber($event)" class="form-control" v-model="parcelSize.height" />
                                    </div>
                                    <div class="input-box-outer w-50">
                                        <label>Weight <span>*</span></label>
                                        <input type="number" @paste="handlePaste($event, 'weight')" @input="isFloat(parcelSize.weight, 'weight')" @keypress="validateNumber($event)" class="form-control" v-model="parcelSize.weight" />
                                    </div>
                                    <div class="input-box-outer w-100">
                                        <label>Volumetric </label>
                                        {{ parcelSize.volumetric }} kg
                                    </div>
                                </div>
                                <div class="edit-modal-footer">
                                    <button class="edit-btn cancel-btn" @click="toggleEditModal">Cancel</button>
                                    <button class="edit-btn update-btn" @click="toggleSubmitModalData">Update</button>
                                </div>
                            </div>
                        </div>
                        <div class="bg-[#fff] dark:bg-[#3d3d3d] extra-charges-container">
                            <div class="bottom-border container-basic-header pr-4 flex align-items-center gap-2 justify-content-between">
                                <div class="flex align-items-center gap-3 font-semibold text-base">
                                    <img :src="ExtraIcon" />
                                    <span class="font-semibold"> Delivered Product Image</span>
                                </div>
                            </div>
                            <div class="p-3 md:p-4 delivered-product-img-outer">
                                <div class="upload-div-outer">
                                    <div class="updatecards">
                                        <div class="selected-image-div w-full" v-if="props.skeletonData">
                                            <skeletonView width="100%" height="110px"></skeletonView>
                                        </div>
                                        <div class="selected-image-div" v-else>
                                            <img src="../../assets/images/placeholder-products.svg" v-if="viewDetailsValues.view_details_data.deliverd_product.delivered_product_image === ''" />
                                            <div class="inner-selected-image-div" v-else>
                                                <a :href="viewDetailsValues.view_details_data.deliverd_product.delivered_product_image" download>
                                                    <img :src="viewDetailsValues.view_details_data.deliverd_product.delivered_product_image" />
                                                </a>
                                                <div class="download-image-btn">
                                                    <a href="../../assets/images/placeholder-products.svg" download>
                                                        <img src="../../assets/images/upload-icon-hover.svg" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="activityModal" class="w-screen md:w-auto lg:min-w-[360px]">
                <div v-if="checkAccessRight('reverse_order') ? true : deepCheckAccessRight('domestic', 'reverse_order', 'tracking')" class="container-activity bg-[#fff] dark:bg-[#3d3d3d] border-round-sm min-h-[85vh] md:min-h-fit">
                    <div class="bottom-border container-basic-header text-base font-semibold">Activity</div>
                    <div v-if="props.skeletonData" class="p-3 md:p-4 flex flex-col gap-4">
                        <div>
                            <skeletonView width="100%" height="25px"></skeletonView>
                        </div>
                        <div class="ml-6 flex gap-4 flex-col">
                            <skeletonView width="70%" height="10px"></skeletonView>
                            <skeletonView width="70%" height="10px"></skeletonView>
                        </div>
                        <div>
                            <skeletonView width="100%" height="25px"></skeletonView>
                        </div>

                        <div class="ml-6 flex gap-4 flex-col">
                            <skeletonView width="70%" height="10px"></skeletonView>
                            <skeletonView width="70%" height="10px"></skeletonView>
                        </div>
                        <div>
                            <skeletonView width="100%" height="25px"></skeletonView>
                        </div>
                    </div>
                    <div class="p-3 md:p-4" style="color: #3c4249" v-else>
                        <div v-if="showActivity.is_show_activity == 0">
                            <div>
                                <div class="no-record-outer flex flex-col gap-2 justify-center items-center">
                                    <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" />
                                    <slot name="viewAllApiData"></slot>
                                </div>
                            </div>
                        </div>

                        <div class="activity-list-outer" v-else>
                            <div v-for="(activity, index) in activityDetails" :key="index" class="activity-list-div-main">
                                <div class="activity-tag border-round-sm flex align-items-center justify-content-between gap-5" @click="toggleActivity(index)">
                                    <div class="flex align-items-center gap-2">
                                        <img :src="getIcon(activity.activityTag.image_name)" alt="" />
                                        <span class="activity-main-title">{{ activity.activityTag.title }}</span>
                                    </div>
                                    <div class="arrow-down-up">
                                        <img v-if="darkModeVal != true" src="../../assets/images/act-arrow.svg" :class="activity.isOpen ? 'up-arrow' : 'down-arrow'" />
                                        <img v-else src="../../assets/images/dark-mode/dark-act-arrow.svg" :class="activity.isOpen ? 'up-arrow' : 'down-arrow'" />
                                    </div>
                                </div>

                                <div class="activity-list-detail" v-show="activity.isOpen">
                                    <div v-for="(detail, detailIndex) in activity.activityDetail" :key="detailIndex" class="act-content-div flex gap-3 pb-2">
                                        <div class="flex flex-column justify-content-center align-items-center gap-2">
                                            <img src="../../assets/images/act-tick.svg" class="tick-icon min-w-[16px] max-w-[16px]" />
                                            <div class="line" />
                                        </div>
                                        <div class="flex flex-column gap-2">
                                            <div class="activity-title">{{ detail.title }}</div>
                                            <div class="text-sm flex act-date">
                                                {{ detail.date }}
                                                <img v-if="detail.BlueTickImage != ''" :src="detail.BlueTickImage" class="ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import './viewDetail.scss';

.p-toast {
    @media screen and (max-width: 770px) {
        width: 20rem !important;
    }
}
</style>
