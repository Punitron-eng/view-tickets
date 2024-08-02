<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import HeaderImage1 from '../../../assets/images/mobile.webp';
import HeaderImage3 from '../../../assets/images/connect-plus-prepaid.png';
import HeaderImage2 from '../../../assets/images/connect-plus-address.png';
import ModalCommon from '../../../components/resuable-component/ModalCommon.vue';
import SingleDatePicker from '../../../components/itl-common-features/itl-date-range-picker/SingleDatePicker.vue';
import connectplusLogo from '../../../assets/images/connectplus.svg';
import connectActivateIcon from '../../../assets/images/connect-activate-icon.svg';
import rupeesGreen from '../../../assets/images/rupeesgreen.svg';
import rupeesRed from '../../../assets/images/rupeesred.svg';
import addressAssurance from '../../../assets/images/address-assurance.svg';
import priceTag from '../../../assets/images/price-tag.svg';
import liveChat from '../../../assets/images/live-chat.svg';
import codPrepaid from '../../../assets/images/cod-prepaid.svg';
import orderConfirmationCode from '../../../assets/images/order-confirmation-cod.svg';
import orderConfirm from '../../../assets/images/order-confirm.svg';
import addressConfirmation from '../../../assets/images/address-confirmation.svg';
import addressconfirm from '../../../assets/images/address-confirm.svg';
import convertCod from '../../../assets/images/convert-cod.svg';
import codConfirm from '../../../assets/images/cod-confirm.svg';
import numberOne from '../../../assets/images/number-one.svg';
import numberTwo from '../../../assets/images/number-two.svg';
import numberThree from '../../../assets/images/number-three.svg';
import stepLine from '../../../assets/images/step-line.svg';
import bookingClose from '../../../assets/images/bookingclose.svg';
import { notificationSubmitResponse, getNotificationResponse } from '../../../api/notification-charges/notificationChargesApi';
import { connectPlusonboard } from './connectPlusonboard';
import VendorModal from '../../../components/common-modal-files/VendorModal.vue';
import { useStore } from 'vuex';
import { DARKMODE } from '../../../store/dark-mode/constants';
import { bookademo } from '../../../api/connectPlusonboard/connectPlusonboard';
import { useToast } from 'primevue/usetoast';
import Skeleton from 'primevue/skeleton';
const toast = useToast();
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const getImg = (imageName) => {
    return new URL(`../../../assets/images/${imageName}.svg`, import.meta.url).href;
};

const hideSbtn = ref(true);
const hidedemobtn = ref(true);
const notificationVars = connectPlusonboard;
const connectPlusAccess = JSON.parse(localStorage.getItem('connect_plus_access_right'));
const topHeader = JSON.parse(localStorage.getItem('top_header'));
const loading = ref(false);

const products = [HeaderImage1, HeaderImage2, HeaderImage3];
const showInput = ref(false);
const bookingInput = ref('');
const error = ref(false);
const errorMessage = ref('');
const isAdmin = ref(false);
const vendorData = ref([]);
const bookingButtonText = ref('Book a Demo');
const bookingButtonName = ref('Submit');
const bookingButtonColor = ref('#007bff');
const isLoading = ref(false);

const dateValue = (date) => {
    const tempDate = [date.toISOString().split('T')[0]];
    notificationVars.value.billingDate = tempDate[0];
};

onMounted(async () => {
    if (topHeader.user_type == 3) {
        hideSbtn.value = false;
        hidedemobtn.value = false;
        loading.value = true;
        checkButtonVisibility();
        await getNotificationChargesData('');
    }
});

const getNotificationChargesData = async (vendorId) => {
    let payLoadData;
    if (topHeader.user_type == 1 || topHeader.user_type == 2) {
        payLoadData = {
            vendor_id: vendorId,
        };
    }
    //  else {
    //     payLoadData = {
    //         framework: '1',
    //         platformData: vendorId,
    //     };
    // }
    const notificationDataResponce = await getNotificationResponse(payLoadData);
    if (notificationDataResponce.status === 'success') {
        loading.value = false;
        if (vendorId === '' && (topHeader.user_type == 1 || topHeader.user_type == 2)) {
            notificationVars.value.isVisibleNotificationCharges = 'hidden';
        } else {
            notificationVars.value.isVisibleNotificationCharges = '';
        }
        notificationVars.value.isSkeleton = false;
        notificationVars.value.isActivateLoading = false;
        notificationVars.value.perOrderAmount = notificationDataResponce.all_notification_charges_data_array.data.connect_plus.charges;
        notificationVars.value.connectPlusActivation = notificationDataResponce.all_notification_charges_data_array.data.connect_plus.is_activated;
        notificationVars.value.activationDetail = notificationDataResponce.all_notification_charges_data_array.data.connect_plus.is_activated;
        notificationVars.value.billingDate = notificationDataResponce.all_notification_charges_data_array.data.connect_plus.billing_started_on;
        if (notificationDataResponce.all_notification_charges_data_array.data.connect_plus.is_activated == '1') {
            notificationVars.value.activateDisabled = true;
            notificationVars.value.datepickerDisabled = true;
            notificationVars.value.activateStatus = 'Activated';
            notificationVars.value.submitClass = 'activated pointer-event';
            hidedemobtn.value = true;
        } else if (notificationDataResponce.all_notification_charges_data_array.data.connect_plus.is_activated == '2') {
            notificationVars.value.activateDisabled = true;
            notificationVars.value.datepickerDisabled = false;
            notificationVars.value.activateStatus = 'Requested';
            notificationVars.value.submitClass = 'requested pointer-event';
            notificationVars.value.isSubmitLoading = false;
            hidedemobtn.value = true;
        } else {
            notificationVars.value.activateStatus = 'Activate Now!';
            notificationVars.value.submitClass = '';
            notificationVars.value.activateDisabled = false;
        }
    }
    if (notificationDataResponce.status === 'success') {
        loading.value = false;
        if (notificationDataResponce.all_notification_charges_data_array.data.connect_plus.is_activated == '1') {
            notificationVars.value.activateDisabled = true;
            notificationVars.value.datepickerDisabled = true;
            notificationVars.value.activateStatus = 'Activated';
            notificationVars.value.submitClass = 'activated pointer-event';
            hidedemobtn.value = true;
        } else if (notificationDataResponce.all_notification_charges_data_array.data.connect_plus.is_activated == '2') {
            notificationVars.value.activateDisabled = true;
            notificationVars.value.datepickerDisabled = false;
            notificationVars.value.activateStatus = 'Requested';
            notificationVars.value.submitClass = 'requested pointer-event';
            notificationVars.value.isSubmitLoading = false;
            hidedemobtn.value = true;
        } else {
            notificationVars.value.activateStatus = 'Activate Now!';
            notificationVars.value.submitClass = '';
            notificationVars.value.activateDisabled = false;
        }
    } else {
        console.log('error');
    }
};
const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden';
};

const enableBodyScroll = () => {
    document.body.style.overflow = '';
};

const closedconnectplusModal = () => {
    notificationVars.value.showModal = false;
    enableBodyScroll();
};

const showVendorModal = () => {
    isAdmin.value = true;
};
const applyVendorFilter = async (vendorName) => {
    vendorName.forEach((element) => {
        const tempData = element.split(',');
        notificationVars.value.vendorNameData = '(' + tempData[0] + ')';
        notificationVars.value.vendorId = tempData[1];
        vendorData.value = tempData;
        hideSbtn.value = true;
        hidedemobtn.value = true;
    });
    if (vendorName == '') {
        notificationVars.value.isVisibleNotificationCharges = 'hidden';
    } else {
        notificationVars.value.isVisibleNotificationCharges = '';
    }
    if (connectPlusAccess.is_full_access == 0) {
        notificationVars.value.editAccessRight = connectPlusAccess.user_access_rights.connect_plus.notification_charges.edit_itl_connect_notification_charges_v3;
    } else {
        notificationVars.value.editAccessRight = 1;
    }
    isAdmin.value = false;
    hideSbtn.value = false;
    hidedemobtn.value = false;
    await getNotificationChargesData(notificationVars.value.vendorId);
};

const resetVendorFilter = () => {
    vendorData.value = [];
    isAdmin.value = false;
    hideSbtn.value = true;
    hidedemobtn.value = true;
};
const activationApi = async (activatedStatus) => {
    isLoading.value = true;
    notificationVars.value.isSubmitLoading = true;
    notificationVars.value.submitDisabled = true;
    if (!notificationVars.value.isSubmitLoading) {
        notificationVars.value.isActivateLoading = true;
    }
    notificationVars.value.activateDisabled = true;
    const activateData = {
        mode: 'connect_plus',
        connect_plus_activated: activatedStatus,
        connect_plus_charges: notificationVars.value.perOrderAmount,
        vendor_id: notificationVars.value.vendorId,
        billing_date: notificationVars.value.billingDate,
        // platformData: notificationVars.value.platformDataValue,
        // storeData: notificationVars.value.storeDataValue,
        // framework: '1',
    };
    const activateResponce = await notificationSubmitResponse(activateData);
    isLoading.value = false;
    if (activateResponce.status === 'success') {
        loading.value = false;
        notificationVars.value.activateStatus = 'Requested';
        notificationVars.value.submitClass = 'requested pointer-event';
        hidedemobtn.value = true;
        if (notificationVars.value.activateStatus === 'Requested') {
            notificationVars.value.datepickerDisabled = false;
        } else {
            notificationVars.value.datepickerDisabled = true;
        }
        notificationVars.value.submitDisabled = false;
        notificationVars.value.activateDisabled = true;
        notificationVars.value.isActivateLoading = false;
        if ((notificationVars.value.showModal = true)) {
            disableBodyScroll();
        }
        notificationVars.value.isSubmitLoading = false;
    } else if (activateResponce.status === 'error') {
        notificationVars.value.submitDisabled = false;
        notificationVars.value.activateDisabled = false;
        notificationVars.value.pointerEvent = '';
        notificationVars.value.isActivateLoading = false;
    }
};

const validateNumber = () => {
    notificationVars.value.perOrderAmount = notificationVars.value.perOrderAmount.replace(/[^0-9.]/g, '');
};

const toggleBooking = () => {
    showInput.value = !showInput.value;
    hideSbtn.value = true;
    hidedemobtn.value = true;
};
// const submitBooking = () => {
//     closeBooking();
// };
const closeBooking = () => {
    showInput.value = false;
    bookingInput.value = '';
    hideSbtn.value = false;
    hidedemobtn.value = false;
    errorMessage.value = '';
};
const showSpan = ref(window.innerWidth <= 767);
const handleResize = () => {
    showSpan.value = window.innerWidth <= 767;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});
const accordionItems = ref([
    {
        title: 'Is Connect+ compatible with any eCommerce platforms and systems?',
        content: 'Connect+ integrates with popular platforms like Shopify, WooCommerce, Magento, and custom-built systems. Enhance your order management process and enjoy an efficient, unified solution for order confirmation and message analytics.',
        showDropdown: true,
    },
    {
        title: 'Can Connect+ help me increase revenue and improve cash flow?',
        content:
            'Definitely! Connect+ offers features like COD to prepaid conversion, allowing you to incentivise buyers to switch to prepaid payments. The increase in prepaid orders boosts your revenue and improves cash flow. Additionally, the message analytics provided by Connect+ help you identify areas for revenue growth and optimise your business model.',
        showDropdown: false,
    },
    {
        title: 'Is there a trial for Connect+?',
        content: 'Yes, there is a trial of 15 days. After the trial, the charges of Rs. 3.99 + 18% GST per order ONLY ON DELIVERED ORDERS will be applied. If orders get RTO, Rs. 3.99 + 18% GST per order WILL NOT BE CHARGED.',
        showDropdown: false,
    },
    {
        title: 'Will the system automatically cancel the order if the customer cancels the order?',
        content: 'No, the cancel status will be shown in the ‘Buyer Intent” tab. No action will be taken on the order unless you want to.',
        showDropdown: false,
    },
]);
const toggleDropdown = (index) => {
    accordionItems.value.forEach((item, i) => {
        if (i !== index) {
            item.showDropdown = false;
        }
    });

    accordionItems.value[index].showDropdown = !accordionItems.value[index].showDropdown;
};

// const validateInput = () => {
//   const regex = /^[0-9]{10}$/;
//   if (!bookingInput.value) {
//     error.value = true;
//     errorMessage.value = 'Field cannot be empty';
//   } else if (!regex.test(bookingInput.value)) {
//     error.value = true;
//     errorMessage.value = 'Enter a valid 10-digit number';
//   } else {
//     error.value = false;
//     errorMessage.value = '';
//   }
// };

// const validateInput = () => {
//   const regex = /^[6-9]\d{9}$/;
//   if (!bookingInput.value) {
//     error.value = true;
//     errorMessage.value = 'Field cannot be empty';
//   } else if (!regex.test(bookingInput.value)) {
//     error.value = true;
//     errorMessage.value = 'Enter a valid 10-digit mobile number';
//   } else {
//     error.value = false;
//     errorMessage.value = '';
//   }
// };

const validateInput = (errorMsg) => {
    const regex = /^[6-9]\d{9}$/;
    if (!bookingInput.value) {
        error.value = true;
        errorMessage.value = errorMsg;
    } else if (!regex.test(bookingInput.value)) {
        error.value = true;
        errorMessage.value = 'Enter a valid 10-digit mobile number';
    } else {
        error.value = false;
        errorMessage.value = '';
    }
    return error.value;
};

const clearError = () => {
    error.value = false;
    errorMessage.value = '';
};

const filterAndValidateInput = () => {
    bookingInput.value = bookingInput.value.replace(/\D/g, '');
    validateInput('Enter Numbers Only');
};

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
};

const getCookie = (name) => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

const checkButtonVisibility = () => {
    const hideButtonTimestamp = getCookie('hideButtonTimestamp');
    if (hideButtonTimestamp) {
        const now = new Date().getTime();
        const hideDuration = 24 * 60 * 60 * 1000;
        if (now - hideButtonTimestamp < hideDuration) {
            hidedemobtn.value = true;
        } else {
            setCookie('hideButtonTimestamp', '', -1);
            hidedemobtn.value = false;
        }
    }
};

const setHideButtonTimestamp = () => {
    const now = new Date().getTime();
    setCookie('hideButtonTimestamp', now, 1);
};

const submitBooking = async (data) => {
    const phoneNumber = bookingInput.value;
    const payload = { phoneNumber };

    if (!validateInput('Field cannot be empty') && phoneNumber) {
        error.value = false;
        isLoading.value = true;
        const res = await bookademo(payload);
        if (res.status == 'success') {
            hidedemobtn.value = true;
            toast.add({ severity: 'success', summary: res.html_message, life: 1000 });
            setHideButtonTimestamp();
            showInput.value = false;
            bookingInput.value = '';
            isLoading.value = false;
            hideSbtn.value = false;
        } else {
            toast.add({ severity: 'error', summary: res.html_message, life: 1000 });
        }
    }
};
</script>

<template>
    <div class="connectplus flex flex-column md:justify-content-center md:align-items-center md:mt-[20px]">
        <div class="connectplus-container flex flex-column">
            <div class="section section--one flex flex-column md:flex md:flex-row md:justify-content-between">
                <div class="section--one__content">
                    <div class="section--one__content--header flex">
                        <img :src="connectplusLogo" alt="connect plus" />
                        <h3>Connect+</h3>
                    </div>
                    <div class="section--one__content--body">
                        <h3>Click. Chat. Confirm</h3>
                        <p>Transform WhatsApp into your business ally with Connect+, reducing RTO, boosting cash flow, and converting COD to prepaid seamlessly.</p>
                        <div v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" class="flex align-items-center gap-2 vendor-name-data">
                            <span v-if="vendorData.length == 0" @click="showVendorModal()"> Select Vendor </span>
                            <span v-else>
                                {{ notificationVars.vendorNameData }}
                            </span>
                            <button @click="showVendorModal()" class="show-vendor-btn">
                                <img src="../../../assets/images/vendor_v3.svg" />
                            </button>
                            <VendorModal v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" v-show="isAdmin" @close-modal="isAdmin = false" @applyVendor="applyVendorFilter" @resetVendor="resetVendorFilter" />
                        </div>
                        <div class="section--one__orderContainer flex flex-column md:flex-row" v-if="notificationVars.activateStatus !== 'Activate Now!' && (topHeader['user_type'] == 1 || topHeader['user_type'] == 2) && vendorData.length > 1">
                            <div>
                                <span>For Delivered Order</span>
                                <div class="section--one__orderBox flex">
                                    <img :src="rupeesGreen" alt="rupees green" />
                                    <input
                                        class="helvetica-bold per-order-amount-input"
                                        maxlength="4"
                                        @input="validateNumber"
                                        :class="
                                            ((topHeader['user_type'] == 1 || topHeader['user_type'] == 2) && notificationVars.activationDetail == '1') ||
                                            topHeader['user_type'] == 3 ||
                                            notificationVars.activationDetail == '1' ||
                                            notificationVars.editAccessRight == 0
                                                ? 'pointer-event'
                                                : ''
                                        "
                                        type="text"
                                        v-model="notificationVars.perOrderAmount"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div>
                                <span>For Undelivered or Return Order</span>
                                <div class="section--one__orderBox flex">
                                    <img :src="rupeesRed" alt="rupees red" />
                                    <span>₹0.00</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="(topHeader['user_type'] == 1 || topHeader['user_type'] == 2) && vendorData.length > 1 && notificationVars.activateStatus !== 'Activate Now!'" class="date-picker-outer-section flex flex-column md:flex-row">
                            <div class="date-picker-label">Start Date For Billing:</div>
                            <div class="flex flex-column md:flex-row">
                                <SingleDatePicker @date-value="dateValue" :defaultDate="notificationVars.billingDate" :disabledInput="notificationVars.datepickerDisabled" />
                                <button
                                    class="date-btn"
                                    @click="activationApi(1)"
                                    v-if="notificationVars.editAccessRight == 1 && notificationVars.activateStatus === 'Requested' && (topHeader['user_type'] == 1 || topHeader['user_type'] == 2)"
                                    :disabled="notificationVars.submitDisabled"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                        <!-- <div class="book-a-demo flex flex-column">
                            <span class="bookdemo" v-show="showInput">Book a Demo</span>
                            <div class="inputbookingfield" v-show="showInput">
                                <span class="numberprefix">+91</span>
                                <input class="bookinginput" v-model="bookingInput" />
                                <button class="submitbookingbtn" @click="submitBooking">Submit</button>
                                <img @click="closeBooking" :src="bookingClose" alt="cross button" class="close-icon bookingcross" />
                            </div>
                        </div> -->
                        <!-- <div class="book-a-demo flex flex-column">
                            <span class="bookdemo" v-show="showInput">Book a Demo</span>
                            <div class="inputbookingfield" v-show="showInput">
                                <span class="numberprefix">+91</span>
                                <input class="bookinginput" v-model="bookingInput" @input="validateInput" :class="{ 'input-error': error }" maxlength="10"
                                placeholder="Enter 10 digits number"/>
                                <button class="submitbookingbtn" @click="submitBooking">Submit</button>
                                <img @click="closeBooking" :src="bookingClose" alt="cross button" class="close-icon bookingcross" />
                                <span v-if="error" class="error-message">{{ errorMessage }}</span>
                            </div>
                        </div> -->
                        <!-- <div class="book-a-demo flex flex-column">
                            <span class="bookdemo" v-show="showInput">Book a Demo</span>
                            <div class="inputbookingfield" v-show="showInput">
                                <span class="numberprefix">+91</span>
                                <input
                                    class="bookinginput"
                                    v-model="bookingInput"
                                    @input="filterInput"
                                    @blur="validateInput"
                                    :class="{ 'input-error': error }"
                                    maxlength="10"
                                    placeholder="Enter a mobile number"
                                />
                                <button class="submitbookingbtn" @click="submitBooking">Submit</button>
                                <img @click="closeBooking" :src="bookingClose" alt="cross button" class="close-icon bookingcross" />
                                <span v-if="error" class="error-message">{{ errorMessage }}</span>
                            </div>
                        </div> -->
                        <div class="book-a-demo flex flex-column">
                            <span class="bookdemo" v-show="showInput">Book a Demo</span>
                            <div class="inputbookingfield" v-show="showInput">
                                <span class="numberprefix">+91</span>
                                <input class="bookinginput" v-model="bookingInput" @input="filterAndValidateInput" @keydown="clearError" :class="{ 'input-error': error }" maxlength="10" placeholder="Enter a mobile number" />
                                <button class="submitbookingbtn" @click="submitBooking">
                                    <div v-if="isLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                                    <div v-else>Submit</div>
                                </button>
                                <img @click="closeBooking" :src="bookingClose" alt="cross button" class="close-icon bookingcross" />
                                <span v-if="error" class="error-message">{{ errorMessage }}</span>
                            </div>
                        </div>
                        <div class="section--one__btnContainer flex">
                            <ModalCommon v-show="notificationVars.showModal">
                                <template #header>
                                    <div class="flex flex-column justify-content-center align-items-center">
                                        <img :src="connectActivateIcon" alt="connect activate" />
                                        <h2 class="modal-connectplus-head">Thank you for Choosing Connect+</h2>
                                    </div>
                                </template>
                                <template #body>
                                    <div class="connectplus-modal-body flex flex-column justify-content-center align-items-center">
                                        <p>Your Connect+ activation request has been received! Our dedicated team will be reaching out to you shortly to assist you with the next steps.</p>
                                    </div>
                                </template>
                                <template #footer>
                                    <div class="flex flex-column justify-content-end align-items-end">
                                        <button class="connectplus-modal-btn" @click="closedconnectplusModal">OK</button>
                                    </div>
                                </template>
                            </ModalCommon>
                            <Skeleton v-if="loading" height="56px" class="mb-2 w-full !important bg-grey"></Skeleton>
                            <button
                                v-else
                                class="submit-btn"
                                :style="{ display: hideSbtn ? 'none' : 'block' }"
                                :class="
                                    notificationVars.submitClass +
                                    ((topHeader['user_type'] == 1 || topHeader['user_type'] == 2) && connectPlusAccess['is_full_access'] == 0
                                        ? connectPlusAccess['user_access_rights']['connect_plus']['notification_charges']['view_itl_connect_notification_charges_v3'] == 1 &&
                                          connectPlusAccess['user_access_rights']['connect_plus']['notification_charges']['submit_itl_connect_notification_charges_v3'] == 0
                                            ? ' hidden'
                                            : ''
                                        : connectPlusAccess['user_access_rights']['itl_connect_access'] == 1 && connectPlusAccess['is_full_access'] == 1)
                                "
                                :disabled="notificationVars.activateDisabled"
                                @click="activationApi('1')"
                            >
                                <!-- <span v-if="notificationVars.isActivateLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></span> -->
                                <div v-if="isLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                                <span v-else>{{ notificationVars.activateStatus }}</span>
                            </button>
                            <!-- <button  v-show="!showInput">{{ buttonText }}</button> -->
                            <!-- <button @click="activationApi(1)" v-show="!showInput">{{ buttonText }}</button> -->
                            <!-- <button @click="activationApi(1)" :disabled="isButtonDisabled">activate</button> -->
                            <Skeleton v-if="loading" height="56px" class="mb-2 w-full !important bg-grey"></Skeleton>
                            <button class="bookDemo" v-if="!loading && topHeader['user_type'] == 3" :style="{ display: hidedemobtn ? 'none' : 'block' }" @click="toggleBooking">Book a Demo!</button>
                        </div>
                    </div>
                </div>
                <div class="section--one__mobileScreen">
                    <Carousel :value="products" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000">
                        <template #item="slotProps">
                            <div class="flex justify-content-center align-items-center">
                                <img class="imgs" :src="slotProps.data" />
                            </div>
                        </template>
                    </Carousel>
                </div>
            </div>
            <div class="section section--two flex flex-column md:justify-content-center md:align-items-center">
                <span class="section--two__title">Seamless Solutions, Stunning Results</span>
                <h2 class="section--two__subtitle">Reduce RTO by <span>15%</span></h2>
                <div class="section--two__content flex flex-wrap">
                    <div class="section--two__content--box flex">
                        <img :src="addressAssurance" alt="address assurance" />
                        <div>
                            <h3 class="section--two__content--box__title">24/7 Address Assurance</h3>
                            <p class="section--two__content--box__description">No playing hide-and-seek with deliveries, only pinpoint precision</p>
                        </div>
                    </div>
                    <div class="section--two__content--box flex">
                        <img :src="priceTag" alt="price tag" />
                        <div>
                            <h3 class="section--two__content--box__title">Price Tag at ₹3.99*</h3>
                            <p class="section--two__content--box__description">Because awesome doesn't break the bank.</p>
                        </div>
                    </div>
                    <div class="section--two__content--box flex">
                        <img :src="liveChat" alt="live chat" />
                        <div>
                            <h3 class="section--two__content--box__title">Live Chat with Customers</h3>
                            <p class="section--two__content--box__description">Connect instantly and chat effortlessly. Turn every interaction into success.</p>
                        </div>
                    </div>
                    <div class="section--two__content--box flex">
                        <img :src="codPrepaid" alt="cod prepaid" />
                        <div>
                            <h3 class="section--two__content--box__title">COD - Prepaid Conversion</h3>
                            <p class="section--two__content--box__description">Connect+ is the reason for prepaid orders to become the new normal.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section section--three flex flex-column">
                <h2 class="section--three__title">How does it work?</h2>
                <div class="section--three__content flex flex-column md:flex md:flex-row">
                    <div class="section--three__content--left flex flex-column">
                        <div>
                            <img :src="orderConfirmationCode" alt="order confirmation" />
                            <img :src="orderConfirm" alt="order confirmation" />
                            <span v-if="showSpan">STEP 1</span>
                            <h3>Order Confirmation</h3>
                            <p>Connect+ instantly validates COD orders with confirmation messages, ensuring genuine buyer intent.</p>
                        </div>
                        <div class="section--three__content--left--left">
                            <img :src="addressConfirmation" alt="address confirmation" />
                            <img :src="addressconfirm" alt="address confirmation" />
                            <span v-if="showSpan">STEP 2</span>
                            <h3>Address Confirmation</h3>
                            <p>Navigate parcels home smoothly and minimise RTO  – thanks to precise address confirmation.</p>
                        </div>
                        <div>
                            <img :src="convertCod" alt="convert cod" />
                            <img :src="codConfirm" alt="cod confirm" />
                            <span v-if="showSpan">STEP 3</span>
                            <h3>Convert COD Orders into Prepaid</h3>
                            <p>With Connect+, you can easily switch COD orders are prepaid using offer and discount messages sent directly from Connect+ to customers.</p>
                        </div>
                    </div>
                    <div class="section--three__content--middle flex flex-column">
                        <div class="flex flex-column">
                            <span>STEP 1</span>
                            <img :src="numberOne" alt="number one" />
                        </div>
                        <img class="section--three__content--middle__line" :src="stepLine" alt="step line" />
                        <div class="flex flex-column">
                            <span>STEP 2</span>
                            <img :src="numberTwo" alt="number two" />
                        </div>
                        <img class="section--three__content--middle__line" :src="stepLine" alt="step line" />
                        <div class="flex flex-column">
                            <span>STEP 3</span>
                            <img :src="numberThree" alt="number three" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-content-center">
                    <Skeleton v-if="loading" height="56px" width="368px" class="mb-2 bg-grey"></Skeleton>
                    <button
                        v-else
                        class="submit-btn section--three__activateBtn"
                        :style="{ display: hideSbtn ? 'none' : 'block' }"
                        :class="
                            notificationVars.submitClass +
                            ((topHeader['user_type'] == 1 || topHeader['user_type'] == 2) && connectPlusAccess['is_full_access'] == 0
                                ? connectPlusAccess['user_access_rights']['connect_plus']['notification_charges']['view_itl_connect_notification_charges_v3'] == 1 &&
                                  connectPlusAccess['user_access_rights']['connect_plus']['notification_charges']['submit_itl_connect_notification_charges_v3'] == 0
                                    ? ' hidden'
                                    : ''
                                : connectPlusAccess['user_access_rights']['itl_connect_access'] == 1 && connectPlusAccess['is_full_access'] == 1)
                        "
                        :disabled="notificationVars.activateDisabled"
                        @click="activationApi('1')"
                    >
                        <!-- <span v-if="notificationVars.isActivateLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></span> -->
                        <div v-if="isLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                        <span v-else>{{ notificationVars.activateStatus }}</span>
                    </button>
                </div>
            </div>
            <div class="section section--four flex flex-column md:justify-content-center md:align-items-center">
                <h2 class="section--four__title">Why Connect+ ?</h2>
                <div class="section--four__content flex flex-column md:flex md:flex-row md:flex-wrap md:justify-content-center md:align-items-center">
                    <div class="section--four__content__item flex flex-column md:flex md:flex-row">
                        <span>01</span>
                        <div>
                            <h3>Charges Applied on Delivered Orders Only ✅</h3>
                            <p>Pay only for what reaches your customers</p>
                        </div>
                    </div>
                    <div class="section--four__content__item flex flex-column md:flex md:flex-row">
                        <span>02</span>
                        <div>
                            <h3>Time is Money – Save Both ⏳</h3>
                            <p>Skip manual confirmations - let Connect+ handle it for you.</p>
                        </div>
                    </div>
                    <div class="section--four__content__item flex flex-column md:flex md:flex-row">
                        <span>03</span>
                        <div>
                            <h3>Know Your Customer Before You Ship 🔎</h3>
                            <p>Validate Customer Intent for Smooth Shipping.</p>
                        </div>
                    </div>
                    <div class="section--four__content__item flex flex-column md:flex md:flex-row">
                        <span>04</span>
                        <div>
                            <h3>Track Your COD to Prepaid Revenue 💰</h3>
                            <p>Boost your prepaid orders and improve cash flow.</p>
                        </div>
                    </div>
                    <div class="section--four__content__item flex flex-column md:flex md:flex-row">
                        <span>05</span>
                        <div>
                            <h3>IVR and Manual Calls for Verification 📞</h3>
                            <p>Streamlined verification without the Headaches.</p>
                        </div>
                    </div>
                    <div class="section--four__content__item flex flex-column md:flex md:flex-row">
                        <span>06</span>
                        <div>
                            <h3>Pre-paid Orders Become the New Normal 😎</h3>
                            <p>Secure more prepaid transactions for a stable business.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section section--five flex flex-column md:justify-content-center md:align-items-center">
                <h2 class="section--five__title">Frequently Asked Questions</h2>

                <div class="accordion-main-container">
                    <div v-for="(item, index) in accordionItems" :key="index" @click="toggleDropdown(index)" class="accordion-container" :class="{ active: item.showDropdown }">
                        <div class="flex justify-content-between">
                            <h2>{{ item.title }}</h2>
                            <img v-if="!item.showDropdown && !darkModeVal" :src="getImg('accordion-plus')" />
                            <img v-else-if="!item.showDropdown" src="../../../assets/images/dark-mode/darkconnectplus.svg" />
                            <img v-if="item.showDropdown && !darkModeVal" :src="getImg('accordion-minus')" alt="accordion minus" />
                            <img v-else-if="item.showDropdown" src="../../../assets/images/dark-mode/darkconnectminus.svg" />
                        </div>
                        <p v-show="item.showDropdown">{{ item.content }}</p>
                    </div>
                </div>
            </div>
        </div>
        <ToastView />
    </div>
</template>

<style lang="scss">
@import './connectPlusonboard.scss';

.section--one__content--body input {
    padding: 7px;
    margin-left: 3px;
}

.inputbookingfield {
    position: relative;
    height: 56px;
}

.numberprefix {
    position: absolute;
    top: 26px;
    left: 18px;
    z-index: 1;

    &::after {
        content: '';
        height: 16px;
        border-left: 1px solid #1279ff;
        margin-left: 10px;
    }
}

.bookinginput {
    padding-left: 60px !important;
    position: relative;
    width: 368px;
    height: 56px;
    padding: 12px 12px 12px 16px;
    border-radius: 12px;
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.04), 0 20px 25px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px #dfe3e6;
    margin: 8px 0 0 0;

    @media screen and (max-width: 767px) {
        width: 290px;
    }

    @media screen and (max-width: 361px) {
        width: 280px;
    }

    &.bookinginput::placeholder {
        @media screen and (max-width: 767px) {
            font-size: 10px;
        }

        @media screen and (max-width: 361px) {
            font-size: 9px;
        }
    }
}

.submitbookingbtn {
    position: relative;
    bottom: 43px;
    left: 57px;
    width: 80px;
    flex-grow: 0;
    margin: 0 12px 0 188px;
    padding: 5px 16px;
    border-radius: 8px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #0168ed;
    background-color: #1279ff;
    color: white;
    font-size: 14px;
    font-family: $interMedium;
    cursor: pointer;

    @media screen and (max-width: 767px) {
        margin-left: 178px;
        bottom: 43px;
        left: 0;
        font-size: 13px;
    }

    @media screen and (max-width: 361px) {
        margin-left: 160px;
        left: 11px;
        width: 71px;
    }
}

.bookdemo {
    font-size: 12px;
    font-family: $interSemiBold;
}

.bookingcross {
    position: relative;
    cursor: pointer;
    bottom: 70px;
    left: 339px;
    width: 20px;
    height: 20px;

    @media screen and (max-width: 767px) {
        bottom: 68px;
        left: 265px;
    }

    @media screen and (min-width: 300px) and (max-width: 376px) {
        left: 266px;
        bottom: 67px;
    }

    @media screen and (max-width: 361px) {
        left: 251px;
    }
}

.modal-connectplus-head {
    font-size: 22px;
    text-align: center;
    max-width: 336px;
}

.connectplus-modal-body {
    max-width: 328px;
}

.connectplus-modal-body::after {
    content: '';
    position: relative;
    width: 376px;
    bottom: 13px;
    border-bottom: 1px solid #d0d6dc;
}

.connectplus-modal-btn {
    width: 110px !important;
    padding: 8px !important;
    height: auto !important;
    border-radius: 50px !important;
    cursor: pointer;
}

.p-link {
    border-radius: 50px !important;
    width: 10px !important;
    height: 10px !important;
}

.p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button {
    background-color: black !important;
}

.p-carousel-container {
    button {
        display: none;
    }
}

.p-carousel-content {
    width: 100%;
}

.p-dialog-header-close-icon {
    display: none;
}

.date-picker-outer-section {
    display: flex;
    gap: 5px;
    padding-bottom: 10px;

    @media screen and (max-width: 767px) {
        gap: 18px;
    }

    div {
        gap: 5px;
    }
}

.lightTheme .dp__input,
.darkTheme .dp__input {
    position: relative;
    width: 135px;
    bottom: 8px;
    padding-left: 29px;

    @media screen and (max-width: 767px) {
        width: 252px;
    }
}

.dp__input_icon {
    top: 28%;
}

.dp__clear_icon {
    top: 28%;
    right: 0;

    @media screen and (max-width: 767px) {
        left: 215px;
    }
}

.hide-sbtn {
    display: none;
}

.error-message {
    color: red;
    font-size: 13px;
    position: relative;
    bottom: 38px;
    left: 15px;
}
</style>
