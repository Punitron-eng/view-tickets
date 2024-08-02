<script setup lang="ts">
import { computed, ref, watch, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { mainCheckoutVariables } from './mainCheckout';
import { GENERALSETTING } from '../../../../store/checkout/general-setting/constant';
import { useToast } from 'primevue/usetoast';
import { CHECKOUTSETTING } from '../../../../store/checkout/checkout-setting/constant';
import AjaxFileUpload from '../../../../components/resuable-component/AjaxFileUpload.vue';
import SidebarSetting from '../../../../views/checkout/setting/setting-sidebar/SidebarSetting.vue';
import ViewTemplateModal from '../../../../components/resuable-component/ViewTemplateModal.vue';
import { DARKMODE } from '../../../../store/dark-mode/constants';
import SingleDatePicker from '../../../../components/itl-common-features/itl-date-range-picker/SingleDatePicker.vue';
import VendorModal from '../../../../components/common-modal-files/VendorModal.vue';
import Skeleton from 'primevue/skeleton';
import { checkUserType } from '../../../../util/commonHandlers'; //checkUserType
import { checkAccessRight, deepCheckAccessRight } from '../../../../util/commonHandlers';
import getImg from '../../../../util/getImg';
import BaseToggle from '../../../../components/base/BaseToggle.vue'; //BaseToggle
import BaseInput from '../../../../components/base/BaseInput.vue'; //BaseInput
import BaseDropdown from '../../../../components/base/BaseDropdown.vue'; //BaseDropdown
import BaseCheckBox from '../../../../components/base/BaseCheckBox.vue';
import BaseSubmitButton from '../../../../components/base/BaseSubmitButton.vue';
import { data } from 'autoprefixer';
const dataVariable = mainCheckoutVariables;
const store = useStore();
const toast = useToast();
const getStoreId = computed(() => store.getters[`${CHECKOUTSETTING.NAME}/sendStoreId`]);
const topHeader = JSON.parse(localStorage.getItem('top_header'));
const isSubadmin = topHeader.is_subadmin;
const errorMessage = ref(null);
const imgBigError = ref(false);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const isSkeleton = ref(false);
const showdropdown = ref(false);
const buttonLoading = ref(false);
const showListData = ref(false);
const storeDropdownData = ref('');
const dropdowndays = ref(false);
const notificationOnCheckout = ref('1');
// const btndisable = ref(false);
const error = computed(() => {
    return dataVariable.value.apiSecretKey === '' ? 'The Input field is required' : '';
});

// watchEffect(() => {
//     getStoreId.value == '' ? (btndisable.value = true) : (btndisable.value = false);
// });
const getOrderConform = (val: any) => {
    dataVariable.value.sendOrderConfirmation = val;

    if (dataVariable.value.sendOrderConfirmation == true) {
        dataVariable.value.whatsappenabled = true;
        dataVariable.value.smsenabled = true;
        dataVariable.value.emailenabled = true;
        whatsapp.value.is_checked = true;
        sms.value.is_checked = true;
        email.value.is_checked = true;
    } else {
        dataVariable.value.whatsappenabled = false;
        dataVariable.value.smsenabled = false;
        dataVariable.value.emailenabled = false;
        whatsapp.value.is_checked = false;
        sms.value.is_checked = false;
        email.value.is_checked = false;
    }
};

const whatsapp = ref({
    id: 'whatsupoption',
    value: 'WhatsApp',
    is_checked: dataVariable.value.whatsappenabled,
});
const sms = ref({
    id: 'smsoption',
    value: 'SMS',
    is_checked: dataVariable.value.smsenabled,
});
const email = ref({
    id: 'emailoption',
    value: 'Email',
    is_checked: dataVariable.value.emailenabled,
});
const prepaid = ref({
    id: 'prepaid',
    value: 'Prepaid',
    is_checked: dataVariable.value.prepaidenabled,
});
const cod = ref({
    id: 'cod',
    value: 'COD',
    is_checked: dataVariable.value.codenabled,
});

const dateValue = (date) => {
    if (date != null) {
        const tempDate = [date.toISOString().split('T')[0]];
        dataVariable.value.billingDate = tempDate[0];
        dataVariable.value.ischeckoutdata = false;
    } else {
        dataVariable.value.billingDate = '';
    }

};
const getCheckoutEnabled = (val: any) => {
    dataVariable.value.checkoutEnabled = val;
};
const uploadedImage = (value, uploadStatus) => {
    if (uploadStatus) {
        dataVariable.value.storeLogo = uploadStatus.file_name;
    } else {
        dataVariable.value.storeLogo = value.file_name;
    }
};
const isAdmin = ref(false);

const vendorData = ref([]);
const showVendorModal = () => {
    isAdmin.value = true;
};
const applyVendorFilter = async (vendorName: any) => {
    vendorName.forEach(async (element: any) => {
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
    if (storeDropdownData.value == undefined) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'No store data found for the user.', life: 1000 });
    }
};

const resetVendorFilter = () => {
    vendorData.value = [];
    isAdmin.value = false;
    showListData.value = false;
};
// Selecte vendor model end
const getgeneralDetails = async () => {
    dataVariable.value.ischeckoutdata = false;
    dataVariable.value.isSkeleton = true;
    console.log(getStoreId.value, 'getStoreId.value');
    await store.dispatch(`${CHECKOUTSETTING.NAME}/getGeneralDetails`, { storeId: getStoreId.value, vendor_id: vendorData.value[1] || '' });
    dataVariable.value.isSkeleton = false;
    const generalDetails = await store.getters[`${CHECKOUTSETTING.NAME}/sendGeneralDetails`];
    if (generalDetails.status == 'error') {
        dataVariable.value.domainUrl = null;
        dataVariable.value.storeLogo = null;
        dataVariable.value.userStoreCheckoutid = null;
        dataVariable.value.communicationBrandName = null;
        dataVariable.value.companyName = null;
        dataVariable.value.vendorCode = null;
        dataVariable.value.generalDropDown = [];
        dataVariable.value.prepaidAccess = ''; //prepaid
        dataVariable.value.codAccess = ''; //cod
        dataVariable.value.retainedAccess = ''; //retained
        dataVariable.value.billingDate = ''; //datepicker
        dataVariable.value.storeName = null;
        dataVariable.value.storefontAccessToken = '';
        dataVariable.value.accessToken = '';
        dataVariable.value.apiSecretKey = '';
        dataVariable.value.apiKey = '';
        dataVariable.value.prepaidenabled = false;
        dataVariable.value.codenabled = false;
        dataVariable.value.whatsappenabled = false;
        dataVariable.value.smsenabled = false;
        dataVariable.value.emailenabled = false;
        dataVariable.value.sendOrderConfirmation = false;
        dataVariable.value.checkoutEnabled = false;
    } else {
        dataVariable.value.impageUploadData = generalDetails;
        dataVariable.value.domainUrl = generalDetails.all_user_data_array.store_url;
        dataVariable.value.storeLogo = generalDetails.all_user_data_array.store_logo;
        dataVariable.value.userStoreCheckoutid = generalDetails.all_user_data_array.user_store_checkout_id;
        dataVariable.value.communicationBrandName = generalDetails.all_user_data_array.communication_brand_name;
        dataVariable.value.companyName = generalDetails.all_user_data_array.company_name;
        dataVariable.value.vendorCode = generalDetails.all_user_data_array.vendor_code;
        dataVariable.value.generalDropDown = generalDetails.estimate_delivery_date;
        if (generalDetails.all_user_data_array.estimate_date_value != '' && generalDetails.all_user_data_array.estimate_date_value != 'undefined') {
            dataVariable.value.selectedDays = generalDetails.all_user_data_array.estimate_date_value;
        } else {
            dataVariable.value.selectedDays = generalDetails.estimate_delivery_date[0];
        }
        dataVariable.value.prepaidAccess = generalDetails.all_user_data_array.prepaid_access; //prepaid
        dataVariable.value.codAccess = generalDetails.all_user_data_array.cod_access; //cod
        dataVariable.value.retainedAccess = generalDetails.all_user_data_array.retained_access; //retained
        dataVariable.value.billingDate = generalDetails.all_user_data_array.billing_date; //datepicker
        dataVariable.value.storeName = generalDetails.all_user_data_array.store_name;
        dataVariable.value.storefontAccessToken = generalDetails.all_user_data_array.storefont_access_token;
        dataVariable.value.accessToken = generalDetails.all_user_data_array.access_token;
        dataVariable.value.apiSecretKey = generalDetails.all_user_data_array.api_Secret_Key;
        dataVariable.value.apiKey = generalDetails.all_user_data_array.api_key;
        prepaid.value.is_checked = generalDetails.all_user_data_array.is_prepaid_enabled === '1' ? true : false;
        cod.value.is_checked = generalDetails.all_user_data_array.is_cod_enabled === '1' ? true : false;
        whatsapp.value.is_checked = generalDetails.all_user_data_array.is_whatsapp_enabled === '1' ? true : false;
        sms.value.is_checked = generalDetails.all_user_data_array.is_sms_enabled === '1' ? true : false;
        email.value.is_checked = generalDetails.all_user_data_array.is_email_enabled === '1' ? true : false;
        dataVariable.value.sendOrderConfirmation = generalDetails.all_user_data_array.send_order_confirmation == '1' ? true : false;
        dataVariable.value.checkoutEnabled = generalDetails.all_user_data_array.is_checkout_enabled == '1' ? true : false;
        dataVariable.value.isDeleted = generalDetails.all_user_data_array.is_deleted;
        dataVariable.value.isStatus = generalDetails.all_user_data_array.status;
        dataVariable.value.isPaymentMode = false;
        // notificationOnCheckout.value = String(generalDetails.all_user_data_array.status.default_thank_you_page) || '1';
        // notificationOnCheckout.value = '1';
        // dataVariable.value.ischeckoutdata = false;

        if (dataVariable.value.storefontAccessToken !== '') {
            dataVariable.value.isStorefontAccessToken = false;
            dataVariable.value.isUpdate = true;
        }

        if (dataVariable.value.accessToken !== '') {
            dataVariable.value.isAccessToken = false;
            dataVariable.value.isUpdate = true;
        }

        if (dataVariable.value.apiSecretKey !== '') {
            dataVariable.value.isApiSecretKey = false;
            dataVariable.value.isUpdate = true;
        }

        if (dataVariable.value.apiKey !== '') {
            dataVariable.value.isApiKey = false;
            dataVariable.value.isUpdate = true;
        }
        dropdowndays.value = true;
    }

};
//Update General Details
const updategeneralDetails = async () => {
    buttonLoading.value = true;
    if (dataVariable.value.storefontAccessToken !== '') {
        dataVariable.value.isStorefontAccessToken = false;
        dataVariable.value.isUpdate = true;
    } else {
        dataVariable.value.isStorefontAccessToken = true;
    }
    if (dataVariable.value.accessToken !== '') {
        dataVariable.value.isAccessToken = false;
        dataVariable.value.isUpdate = true;
    } else {
        dataVariable.value.isAccessToken = true;
    }

    if (dataVariable.value.apiSecretKey !== '') {
        dataVariable.value.isApiSecretKey = false;
        dataVariable.value.isUpdate = true;
    } else {
        dataVariable.value.isApiSecretKey = true;
    }

    if (dataVariable.value.apiKey !== '') {
        dataVariable.value.isApiKey = false;
        dataVariable.value.isUpdate = true;
    } else {
        dataVariable.value.isApiKey = true;
    }
    if (!cod.value['is_checked'] && !prepaid.value['is_checked']) {
        dataVariable.value.isPaymentMode = true;
        dataVariable.value.isUpdate = false;
    } else {
        dataVariable.value.isPaymentMode = false;
    }
    // ======checkoutenable field=========
    if ((dataVariable.value.prepaidAccess != undefined && dataVariable.value.prepaidAccess != '') || (dataVariable.value.codAccess != undefined && dataVariable.value.codAccess != '') || (dataVariable.value.retainedAccess != undefined && dataVariable.value.retainedAccess != '') || (dataVariable.value.billingDate != undefined && dataVariable.value.billingDate != '')) {
        if ((dataVariable.value.prepaidAccess != undefined && dataVariable.value.prepaidAccess != '') && (dataVariable.value.codAccess != undefined && dataVariable.value.codAccess != '') && (dataVariable.value.retainedAccess != undefined && dataVariable.value.retainedAccess != '') && (dataVariable.value.billingDate != undefined && dataVariable.value.billingDate != '')) {
            dataVariable.value.ischeckoutdata = false;
        } else {
            dataVariable.value.ischeckoutdata = true;
        }

    } else {
        dataVariable.value.ischeckoutdata = false;
        dataVariable.value.isUpdate = true;

    }


    if (dataVariable.value.tempCompanyName !== null) {
        dataVariable.value.companyName = dataVariable.value.tempCompanyName;
    }

    if (dataVariable.value.isApiKey === true || dataVariable.value.isApiSecretKey === true || dataVariable.value.isAccessToken === true || dataVariable.value.isStorefontAccessToken === true || dataVariable.value.ischeckoutdata === true) {
        buttonLoading.value = false;

        setTimeout(() => {
            scrollError();
        }, 500);
        return;
    } else if (!dataVariable.value.isUpdate) {
        buttonLoading.value = false;
        return;
    } else {
        if (dataVariable.value.storefontAccessToken !== '') {
            dataVariable.value.isStorefontAccessToken = false;
        } else {
            dataVariable.value.isStorefontAccessToken = true;
        }
        if (dataVariable.value.apiSecretKey !== '') {
            dataVariable.value.isApiSecretKey = false;
        } else {
            dataVariable.value.isApiSecretKey = true;
        }
        const data = {
            storeId: getStoreId.value,
            vendor_id: vendorData.value[1] || '',
            checkoutEnabled: dataVariable.value.checkoutEnabled ? '1' : '0', //checkoutenabled
            prepaidAccess: dataVariable.value.prepaidAccess, //prepaid
            codAccess: dataVariable.value.codAccess, //cod num
            retainedAccess: dataVariable.value.retainedAccess, //retained
            billingDate: dataVariable.value.billingDate, //datepicker
            storeUrl: dataVariable.value.domainUrl,
            communicationBrandName: dataVariable.value.communicationBrandName,
            estimateDeliveryDate: dataVariable.value.selectedDays,
            userStoreCheckoutid: dataVariable.value.userStoreCheckoutid,
            storeName: dataVariable.value.storeName,
            companyName: dataVariable.value.companyName,
            codenabled: cod.value.is_checked ? '1' : '0',
            prepaidenabled: prepaid.value.is_checked ? '1' : '0',
            whatsappenabled: whatsapp.value.is_checked ? '1' : '0',
            smsenabled: sms.value.is_checked ? '1' : '0',
            emailenabled: email.value.is_checked ? '1' : '0',
            defaultPrepaidDiscount: '10',
            sendOrderConfirmation: dataVariable.value.sendOrderConfirmation ? '1' : '0',
            isDeleted: dataVariable.value.isDeleted,
            isStatus: dataVariable.value.isStatus,
            storefontAccessToken: dataVariable.value.storefontAccessToken,
            accessToken: dataVariable.value.accessToken,
            apiSecretKey: dataVariable.value.apiSecretKey,
            apiKey: dataVariable.value.apiKey,
            vendorCode: dataVariable.value.vendorCode,
            storeLogo: dataVariable.value.storeLogo,
            notificationOnCheckout: notificationOnCheckout.value
            // vendor_id: getVendorValues.value?.id[0] || '',
        };

        await store.dispatch(`${GENERALSETTING.NAME}/updateGeneralDetails`, data)
        // await store.dispatch(`${CHECKOUTSETTING.NAME}/getGeneralDetails`, { storeId: getStoreId.value})
        const status = store.getters[`${GENERALSETTING.NAME}/sendGeneralSuccess`];
        buttonLoading.value = false;
        if (status.status == 'success') {
            toast.add({ severity: 'success', summary: 'Success Message', detail: status.message, life: 1000 });
        } else {
            toast.add({ severity: 'error', summary: 'Error Message', detail: status.message, life: 1000 });
        }
        dataVariable.value.isUpdate = false;
    }
};

const scrollError = async () => {
    const errorMessage = document.querySelector('.error_msg');
    if (errorMessage) {
        let topPos = '';
        if (window.matchMedia('(min-width: 1200px)').matches) {
            topPos = errorMessage.getBoundingClientRect().top + window.scrollY - 100; // Adjust 500 as needed
        } else {
            topPos = errorMessage.getBoundingClientRect().top + window.scrollY - 200; // Adjust 500 as needed
        }
        window.scrollTo({
            top: topPos,
            behavior: 'smooth',
        });
        // errorMessage.scrollIntoView({ behavior: 'smooth', top: 500 });
    }
};
const inputValue = async (event: any) => {
    let value = event.target.value;
    const weightRegex = /^(100(\.00?)?|\d{1,2}(?:\.\d{0,2})?)$/
    const amountRegex = /^\d{0,6}(\.\d{0,2})?$/;
    if (userInput.value.trim() === '') {
        errorMsg.value = 'Field cannot be empty';
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
    } else if (!weightRegex.test(value) && props.value == 2) {
        userInput.value = userInput.value.slice(0, -1);
        // await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
    } else if (!amountRegex.test(value) && props.value == 4) {
        userInput.value = userInput.value.slice(0, -1);
        // await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
    } else {
        userInput.value = value;
        if (value.length === 3) {
            value += '.00';
        }
    }
};

const getprepaidnumber = (event) => {
    let value = event.target.value;
    const regex = /^(100(\.00?)?|\d{1,2}(?:\.\d{0,2})?)$/;
    const numberCheck = /[^0-9.]/;
    if (numberCheck) {
        if (!regex.test(value)) {
            // value = '';
            dataVariable.value.prepaidAccess = dataVariable.value.prepaidAccess.slice(0, -1);
            dataVariable.value.ischeckoutdata = false;
            dataVariable.value.isprepaidAccess = true;
            event.target.value = '';
        } else {
            dataVariable.value.prepaidAccess = value;
            dataVariable.value.isprepaidAccess = false;
            dataVariable.value.ischeckoutdata = false;
            if (value.length === 3) {
                value += '.00';
            }
        }
    } else {
        value == '';
    }
};

const getcodnumber = (event) => {
    let value = event.target.value;
    const regex = /^(100(\.00?)?|\d{1,2}(?:\.\d{0,2})?)$/;
    const numberCheck = /[^0-9.]/;
    if (numberCheck) {
        if (!regex.test(value)) {
            // value = '';
            dataVariable.value.codAccess = dataVariable.value.codAccess.slice(0, -1);
            dataVariable.value.ischeckoutdata = false;
            dataVariable.value.iscodAccess = true;
            event.target.value = '';
        } else {
            dataVariable.value.codAccess = value;
            dataVariable.value.iscodAccess = false;
            dataVariable.value.ischeckoutdata = false;

            if (value.length === 3) {
                value += '.00';
            }
        }
    } else {
        value == '';
    }
};
const getretainednumber = (event) => {
    let value = event.target.value;
    const regex = /^(100(\.00?)?|\d{1,2}(?:\.\d{0,2})?)$/;
    const numberCheck = /[^0-9.]/;
    if (numberCheck) {
        if (!regex.test(value)) {
            // value = '';
            dataVariable.value.retainedAccess = dataVariable.value.retainedAccess.slice(0, -1);
            dataVariable.value.ischeckoutdata = false;
            dataVariable.value.isretainedAccess = true;
            event.target.value = '';
        } else {
            dataVariable.value.retainedAccess = value;
            dataVariable.value.isretainedAccess = false;
            dataVariable.value.ischeckoutdata = false;
            if (value.length === 3) {
                value += '.00';
            }
        }
    } else {
        value == '';
    }
};
// const getbillingdate = (value) => {
//     if (value != null) {
//         dataVariable.value.billingDate = value;
//         dataVariable.value.ischeckoutdata = false;
//         dataVariable.value.isUpdate = true;
//     } else {
//         return;
//     }
// };

const getdomainUrl = (value) => {
    if (value != null) {
        // dataVariable.value.domainUrl = value;
        dataVariable.value.isUpdate = true;
    } else {
        return;
    }
};

const getcommunicationBrandName = (value) => {
    if (value != null) {
        // dataVariable.value.communicationBrandName = value;
        dataVariable.value.isUpdate = true;
    } else {
        return;
    }
};
const getstoreName = (value) => {
    if (value != null) {
        // dataVariable.value.storeName = value;
        dataVariable.value.isUpdate = true;
    } else {
        return;
    }
};
const getcodEabled = (value) => {
    if (value != null) {
        dataVariable.value.isPaymentMode = false;
        dataVariable.value.isPaymentMode = false;
        dataVariable.value.codenabled = value;
        dataVariable.value.isUpdate = true;
    } else {
        return;
    }
};
const getprepaidEnabled = (value) => {
    if (value != null) {
        dataVariable.value.isPaymentMode = false;
        dataVariable.value.isPaymentMode = false;
        dataVariable.value.prepaidenabled = value;
        dataVariable.value.isUpdate = true;
    } else {
        return;
    }
};
const updateSendOrderConfirmation = () => {
    // dataVariable.value.sendOrderConfirmation = dataVariable.value.whatsappenabled || dataVariable.value.smsenabled || dataVariable.value.emailenabled;
    if (whatsapp.value.is_checked === true || sms.value.is_checked === true || email.value.is_checked === true) {
        dataVariable.value.sendOrderConfirmation = true;
    } else {
        dataVariable.value.sendOrderConfirmation = false;
    }
};
const getcompanyName = (value) => {
    if (value != null) {
        // dataVariable.value.tempCompanyName = value;
        dataVariable.value.isUpdate = true;
    } else {
        return;
    }
};
const getStorefontAccessToken = (value) => {
    // dataVariable.value.storefontAccessToken = value;
    if (dataVariable.value.storefontAccessToken !== '') {
        dataVariable.value.isStorefontAccessToken = true;
    } else {
        dataVariable.value.isStorefontAccessToken = false;
    }
};
const getAccessToken = (value) => {
    // dataVariable.value.accessToken = value;
    if (dataVariable.value.accessToken !== '') {
        dataVariable.value.isAccessToken = true;
    } else {
        dataVariable.value.isAccessToken = false;
    }
};
const getApiSecretKey = (value) => {
    // dataVariable.value.apiSecretKey = value;
    if (dataVariable.value.apiSecretKey !== '') {
        dataVariable.value.isApiSecretKey = true;
    } else {
        dataVariable.value.isApiSecretKey = false;
    }
};
const getApiKey = (value) => {
    // dataVariable.value.apiKey = value;
    if (dataVariable.value.apiKey !== '') {
        dataVariable.value.isApiKey = true;
    } else {
        dataVariable.value.isApiKey = false;
    }
};
const getdefaultPrepaidDiscount = (value) => {
    if (value != null) {
        dataVariable.value.defaultPrepaidDiscount = value;
    } else {
        return;
    }
};
const getDropDownValue = (value) => {
    dataVariable.value.selectedDays = value.id;
};
watch(
    () => dataVariable.value.showViewTemplate,
    () => {
        if (dataVariable.value.showViewTemplate === false) {
            document.body.classList.remove('model-open');
        } else {
            document.body.classList.add('model-open');
        }
    }
);

const viewTemplate = (viewTemplateData, whatsappImgView, smsImgView, emailImgView) => {
    dataVariable.value.headingTitle = viewTemplateData;
    dataVariable.value.showViewTemplate = true;
    dataVariable.value.emailViewImg = emailImgView;
    dataVariable.value.smsViewImg = smsImgView;
    dataVariable.value.whatsAppViewImg = whatsappImgView;
};
const copyText = (value) => {
    navigator.clipboard.writeText(value);
    toast.add({
        severity: 'success',
        summary: 'Copied..!',
        life: 1000,
    });
};

onMounted(async () => {
    document.body.classList.add('store-dropdown');
    showListData.value = !checkUserType('vendor') ? false : true;
    showdropdown.value = !checkUserType('vendor') ? false : true;

    checkAccessRight('settings') ? true : deepCheckAccessRight('checkout', 'settings', 'general');
});
onBeforeMount(() => {
    document.body.classList.remove('store-dropdown');
});
</script>
<template>
    <ToastView />
    <section class="general">
        <div class="main-page-title">
            <div class="main-page-first-div">
                <div class="title-page">General</div>
                <!-- Select Vendor -->
                <div>
                    <div v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" style="font-size: 14px"
                        class="flex md:justify-center md:items-center md:space-between md:ml-[10px]">
                        <div class="show-vendor" @click="showVendorModal()">
                            <span class="ml-[8px]" v-if="vendorData.length == 0"> ( Select Vendor ) </span>
                            <span v-else class="vendorMargin"> ( {{ vendorData[0] }} )</span>
                            <button class="show-vendor-btn">
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

            <!-- <div v-if="showdropdown" class="send-order-section active-inactive">
                <div class="send-order">
                    <h3 class="order-conf">Checkout Enabled</h3>
                    <div class="switch-btn">
                        <label class="switch">
                            <input type="checkbox" v-model="dataVariable.checkoutEnabled"
                                @click="getCheckoutEnabled()" />
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>  -->
            <SidebarSetting :dropdownData="storeDropdownData" @tracking-details="getgeneralDetails" v-if="showListData">
            </SidebarSetting>
        </div>

        <div class="rounded-[12px]">
            <div v-if="!checkUserType('vendor') && !showListData"
                class="no-record-outer flex flex-col justify-center items-center gap-1 h-[60vh] py-[50px]">
                <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                <div class="head text-[#9CA3AF] text-[16px] p-[50px]">No Records Found</div>
            </div>

            <div v-else>
                <!-- --------Checkout Enabled section----- -->
                <div v-if="(checkUserType('admin') || checkUserType('subadmin')) && (checkAccessRight('settings') ? true : deepCheckAccessRight('checkout', 'settings', 'edit_checkout_status'))"
                    :class="!checkUserType('vendor') ? 'subadmin-main-section' : ''" class="main-section">
                    <div class="company-section">
                        <div class="main-info">
                            <div class="company-text">
                                <span>Checkout Enabled</span>
                                <div class="switch-toggle">
                                    <BaseToggle class="toggle-btn" :value="dataVariable.checkoutEnabled"
                                        @listenToggleChange="getCheckoutEnabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-section">
                        <div class="conatiner checkout-enabled-div">
                            <div class="container-div flex justify-between w-[80%]">
                                <div class="main-flex-container">
                                    <div class="main-div relative"
                                        :class="topHeader.is_subadmin != 1 && dataVariable.isprepaidAccess && dataVariable.prepaidAccess != '' ? 'bg-text' : ''">
                                        <!-- Prapaid div  -->
                                        <div class="main-image-div">
                                            <div class="main-image-heading">
                                                <div class="common-image">
                                                    <img :src="getImg('ic_prepaid', darkModeVal)" class="ic_prepaid" />
                                                </div>

                                                <span class="common-heading">Prepaid Charges</span>
                                            </div>
                                        </div>
                                        <!-- <Skeleton v-if="dataVariable.isSkeleton" height="32px" borderRadius="4px" /> -->
                                        <div class="common-input flex ml-[auto]">
                                            <BaseInput inputType="text" id="numbericValue" class="main-input-div"
                                                v-model="dataVariable.prepaidAccess" @input="getprepaidnumber"
                                                :readonly="dataVariable.checkoutEnabled" />
                                            <span class="percentage">%</span>
                                        </div>
                                    </div>

                                    <div class="main-div relative"
                                        :class="topHeader.is_subadmin != 1 && dataVariable.iscodAccess && dataVariable.codAccess != '' ? 'bg-text' : ''">
                                        <!-- cod div  -->
                                        <div class="main-image-div">
                                            <div class="main-image-heading">
                                                <div class="common-image">
                                                    <img :src="getImg('ic_cod', darkModeVal)" class="ic_cod" />
                                                </div>
                                                <span class="common-heading">COD Charges</span>
                                            </div>
                                        </div>
                                        <!-- <Skeleton v-if="dataVariable.isSkeleton" height="32px" borderRadius="4px" /> -->
                                        <div class="common-input flex">
                                            <BaseInput inputType="text" id="numbericValue" class="main-input-div"
                                                v-model="dataVariable.codAccess" @input="getcodnumber"
                                                :readonly="dataVariable.checkoutEnabled" />

                                            <span class="percentage">%</span>
                                        </div>
                                    </div>
                                    <div class="main-div relative"
                                        :class="topHeader.is_subadmin != 1 && dataVariable.isretainedAccess && dataVariable.retainedAccess != '' ? 'bg-text' : ''">
                                        <!-- Retained Abandoned div  -->
                                        <div class="main-image-div">
                                            <div class="main-image-heading">
                                                <div class="common-image">
                                                    <img :src="getImg('ic_ratained', darkModeVal)"
                                                        class="ic_ratained" />
                                                </div>
                                                <span class="common-heading">Retained Abandoned Charges</span>
                                            </div>
                                        </div>
                                        <!-- <Skeleton v-if="dataVariable.isSkeleton" height="32px" borderRadius="4px" /> -->
                                        <div class="common-input flex">
                                            <BaseInput inputType="text" id="numbericValue" class="main-input-div"
                                                v-model="dataVariable.retainedAccess" @input="getretainednumber"
                                                :readonly="dataVariable.checkoutEnabled" />
                                            <span class="percentage">%</span>
                                        </div>
                                    </div>
                                    <div v-if="dataVariable.ischeckoutdata" class="error_msg" ref="errorMessage">Please
                                        select all field mandatory</div>
                                </div>

                                <!-- ---------singledate picker-------------- -->
                                <div class="main-section-div">
                                    <div class="label-box">
                                        <DynamicLable :lableValues="dataVariable.inputDynamicValue.startBillLabel" />
                                    </div>
                                    <SingleDatePicker @date-value="dateValue" :defaultDate="dataVariable.billingDate"
                                        :readonly="dataVariable.checkoutEnabled" class="h-[32px]" />
                                    <!-- :min-date="new Date()" -->
                                    <!-- :readonly="dataVariable.billingDate != '' ? true : false" -->
                                    <!-- <div v-if="dataVariable.billingDate == '' && dataVariable.isbillingDate" class="error_msg md:static" ref="errorMessage">This is required</div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ============sopify section============== -->
                <div class="main-section">
                    <div class="main-info">
                        <div class="header">
                            <img v-if="!darkModeVal" src="../../../../assets/images/Shopify_logo.svg" />
                            <img v-else src="../../../../assets/images/dark-mode/dark-shopify_logo.svg" alt="vendor" />
                        </div>
                    </div>
                    <div class="main-section">
                        <div class="conatiner">
                            <div class="info itl">
                                <div class="main-input itl">
                                    <span class="app-name">App Name</span>
                                    <div class="itl-info">
                                        <span class="itl-name">{{ dataVariable.appName }}</span>
                                        <img class="itl-copy-img" :src="getImg('modal-copy', darkModeVal)"
                                            @click="copyText(dataVariable.appName)" />
                                    </div>
                                </div>
                            </div>

                            <div class="info">
                                <div class="main-input">
                                    <DynamicLable :lableValues="dataVariable.inputDynamicValue.domainLabel" />

                                    <!-- //  <Skeleton v-if="dataVariable.isSkeleton" height="32px" borderRadius="4px" />  -->
                                    <BaseInput inputType="text" id="domainurl" placeholder="" name="domainurl"
                                        class="input-text" v-model="dataVariable.domainUrl" @input="getdomainUrl" />
                                </div>
                                <div class="main-input right">
                                    <DynamicLable
                                        :lableValues="dataVariable.inputDynamicValue.communicationBrandLabel" />

                                    <!--  <Skeleton v-if="dataVariable.isSkeleton" height="32px" borderRadius="4px" /> -->
                                    <BaseInput inputType="text" id="communicationbrand" name="communicationbrand"
                                        class="input-text" v-model="dataVariable.communicationBrandName"
                                        @input="getcommunicationBrandName" />
                                </div>
                            </div>
                            <div class="info">
                                <div class="main-input">
                                    <div class="flex">
                                        <DynamicLable :lableValues="dataVariable.inputDynamicValue.storeLabel" />
                                        <span class="pl-1 required-mark">*</span>
                                    </div>
                                    <!--  <Skeleton v-if="dataVariable.isSkeleton" height="32px" borderRadius="4px" /> -->

                                    <BaseInput inputType="text" id="storename" name="storename"
                                        class="store-name-input input-text" v-model="dataVariable.storeName"
                                        @input="getstoreName" readonly />
                                </div>
                                <div class="main-input right">
                                    <DynamicLable :lableValues="dataVariable.inputDynamicValue.generallistLabel" />
                                    <div class="dropdown-list">
                                        <!-- <Skeleton v-if="!dataVariable.selectedDays" height="32px" borderRadius="4px" /> -->
                                        <BaseDropdown :defaultValue='dataVariable.selectedDays'
                                            @listenDropdownChange="getDropDownValue"
                                            :options="dataVariable.generalDropDown" twClasses="w-[100%]" />
                                    </div>
                                </div>

                            </div>
                            <div class="info">
                                <div class="main-input relative"
                                    :class="topHeader.is_subadmin != 1 && dataVariable.isStorefontAccessToken && dataVariable.storefontAccessToken != '' ? 'bg-text' : ''">
                                    <div class="select-payment-mode">
                                        <span class="payment-heading">Payment Modes:</span>

                                        <div class="options-select">
                                            <div class="select-option1">
                                                <BaseCheckBox :data="prepaid"
                                                    @listenCheckboxChange="getprepaidEnabled" />
                                            </div>
                                            <div class="select-option2">
                                                <BaseCheckBox :data="cod" @listenCheckboxChange="getcodEabled" />
                                            </div>
                                        </div>

                                        <div v-if="dataVariable.isPaymentMode"
                                            class="error_msg ml-[10px] absolute top-[15px] md:top-[32px]"
                                            ref="errorMessage">Please select at least one payment mode</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-section">
                    <div class="company-section">
                        <div class="main-info">
                            <div class="company-text">
                                <span>API Details</span>
                            </div>
                        </div>
                        <div class="conatiner">
                            <div class="company-info">
                                <div class="info">
                                    <div class="main-input"
                                        :class="topHeader.is_subadmin != 1 && dataVariable.isStorefontAccessToken && dataVariable.storefontAccessToken != '' ? 'bg-text' : ''">
                                        <div class="label-box flex">
                                            <DynamicLable :lableValues="dataVariable.inputDynamicValue.storeurlLabel" />
                                            <span>*</span>
                                        </div>

                                        <!-- <Skeleton v-if="dataVariable.isSkeleton" height="32px" borderRadius="4px" /> -->
                                        <BaseInput inputType="text" id="storeurl" name="storeurl"
                                            class="store-name-input input-text"
                                            v-model="dataVariable.storefontAccessToken" @input="getStorefontAccessToken"
                                            :readonly="topHeader['user_type'] == 3 && !dataVariable.isStorefontAccessToken && dataVariable.storefontAccessToken != '' ? true : false" />

                                        <div v-if="dataVariable.isStorefontAccessToken && dataVariable.storefontAccessToken == ''"
                                            class="error_msg" ref="errorMessage">This is required</div>
                                    </div>
                                    <div class="main-input right"
                                        :class="dataVariable.accessToken !== '' && dataVariable.isAccessToken ? 'bg-text' : ''">
                                        <div class="label-box flex">
                                            <DynamicLable
                                                :lableValues="dataVariable.inputDynamicValue.accessTokenLabel" />
                                            <span>*</span>
                                        </div>
                                        <!-- <Skeleton v-if="dataVariable.isSkeleton" height="32px" borderRadius="4px" /> -->

                                        <div class="input-flex">
                                            <BaseInput inputType="text" id="storeurl" name="accessToken"
                                                class="input-text" v-model="dataVariable.accessToken"
                                                @input="getAccessToken"
                                                :readonly="topHeader['user_type'] == 3 && dataVariable.accessToken !== '' && !dataVariable.isAccessToken ? true : false" />

                                            <img class="input-img" v-if="isSubadmin == 1"
                                                @click="copyText(dataVariable.accessToken)"
                                                src="../../../../assets/images/copy.svg" />
                                        </div>
                                        <div v-if="dataVariable.accessToken == '' && dataVariable.isAccessToken"
                                            class="error_msg">This is required</div>
                                    </div>
                                </div>
                                <div class="info">
                                    <div class="main-input"
                                        :class="topHeader.is_subadmin != 1 && dataVariable.apiSecretKey !== '' && !dataVariable.isApiSecretKey ? 'bg-text' : ''">
                                        <div class="label-box flex">
                                            <DynamicLable :lableValues="dataVariable.inputDynamicValue.ScretKeyLabel" />
                                            <span>*</span>
                                        </div>
                                        <!-- <Skeleton v-if="dataVariable.isSkeleton" height="32px" borderRadius="4px" /> -->

                                        <div class="input-flex">
                                            <BaseInput inputType="text" id="comapany" name="ScretKey" class="input-text"
                                                v-model="dataVariable.apiSecretKey" @input="getApiSecretKey"
                                                :readonly="topHeader['user_type'] == 3 && dataVariable.apiSecretKey !== '' && !dataVariable.isApiSecretKey ? true : false" />

                                            <img class="input-img" v-if="isSubadmin == 1"
                                                @click="copyText(dataVariable.apiSecretKey)"
                                                src="../../../../assets/images/copy.svg" />
                                        </div>
                                        <div v-if="dataVariable.isApiSecretKey && dataVariable.apiSecretKey == ''"
                                            class="error_msg">This is required</div>
                                    </div>
                                    <div class="main-input right"
                                        :class="topHeader.is_subadmin != 1 && dataVariable.apiKey !== '' && dataVariable.isApiKey ? 'bg-text' : ''">
                                        <div class="label-box flex">
                                            <DynamicLable :lableValues="dataVariable.inputDynamicValue.keyUpLabel" />
                                            <span>*</span>
                                        </div>
                                        <!-- <Skeleton v-if="dataVariable.isSkeleton" height="32px" borderRadius="4px" /> -->
                                        <div class="input-flex">
                                            <BaseInput inputType="text" id="keyup" name="keyup" class="input-text"
                                                v-model="dataVariable.apiKey" @input="getApiKey"
                                                :readonly="topHeader['user_type'] == 3 && dataVariable.apiKey !== '' && !dataVariable.isApiKey ? true : false" />

                                            <img class="input-img" v-if="isSubadmin == 1"
                                                @click="copyText(dataVariable.apiKey)"
                                                src="../../../../assets/images/copy.svg" />
                                        </div>
                                        <div v-if="dataVariable.isApiKey && dataVariable.apiKey == ''"
                                            class="error_msg">This is required</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-section">
                    <div class="company-section">
                        <div class="main-info">
                            <div class="company-text">
                                <span>Company Information</span>
                            </div>
                        </div>
                        <div class="conatiner">
                            <div class="company-info">
                                <div class="info">
                                    <div class="main-input" :class="dataVariable.companyName != '' ? 'bg-text' : ''">
                                        <DynamicLable :lableValues="dataVariable.inputDynamicValue.comapnyLabel" />
                                        <!-- <Skeleton v-if="dataVariable.isSkeleton" height="32px" borderRadius="4px" /> -->

                                        <BaseInput inputType="text" id="comapany" name="comapany" class="input-text"
                                            v-model="dataVariable.companyName" @input="getcompanyName"
                                            :readonly="dataVariable.companyName !== '' ? true : false" />
                                    </div>
                                    <div class="main-input right bg-text">
                                        <DynamicLable :lableValues="dataVariable.inputDynamicValue.vendorLabel" />
                                        <!-- <Skeleton v-if="dataVariable.isSkeleton" height="32px" borderRadius="4px" /> -->

                                        <BaseInput inputType="text" id="vendor" name="vendor" class="input-text"
                                            v-model="dataVariable.vendorCode" readonly />
                                    </div>
                                </div>
                                <div class="info">
                                    <div class="main-input">
                                        <DynamicLable :lableValues="dataVariable.inputDynamicValue.imgUploadLabel"
                                            class="mb-2" />
                                        <AjaxFileUpload @uploaded-image="uploadedImage"
                                            :imageData="dataVariable.impageUploadData.all_user_data_array"
                                            @fileBig="(isImgBig) => (imgBigError = isImgBig)"
                                            @removeImg="dataVariable.storeLogo = ''" />

                                        <p v-show="imgBigError" class="img-error-text">Image size should be less than
                                            2MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-section">
                    <div
                        class="block md:flex items-center justify-between px-[16px] xl:px-[80px] py-[24px] notification-on-checkout">
                        <div class="flex items-center justify-start w-full lg:w-1/2">
                            <p class="m-0 p-0 order-conf">Display order placed notification on checkout</p>
                            <i class="pi pi-exclamation-circle px-2 custom-tooltip" tabindex="1" v-tooltip.right="{
                        value: `Choose whether to display default checkout order placed page or One Tap checkout popup to enhance your customers checkout experience`, pt: {
                            arrow: {
                                style: {
                                    borderRightColor: 'var(--gray-900)',
                                }
                            },
                            text: 'bg-gray-900 text-primary-contrast !font-xs !py-2 !px-3',
                            root: '!max-w-96'
                        }
                    }" severity="secondary" label="Button"><span
                                    class="custom-tooltiptext block lg:hidden font-sans font-normal text-left">Choose
                                    whether to display default checkout order placed page or One Tap checkout popup to
                                    enhance your customers checkout experience</span></i>
                        </div>
                        <div
                            class="flex items-center justify-between w-full lg:w-1/2 pl-[0px] lg:pl-[14px] pt-3 md:pt-0">
                            <div class="flex flex-wrap gap-3 md:gap-5">
                                <div class="flex align-items-center">
                                    <RadioButton v-model="notificationOnCheckout" inputId="oneTapCheckout"
                                        name="oneTapCheckout" value="2" />
                                    <label for="oneTapCheckout" class="ml-2 cursor-pointer">One Tap Checkout</label>
                                </div>
                                <div class="flex align-items-center">
                                    <RadioButton v-model="notificationOnCheckout" inputId="defaultCheckout"
                                        name="defaultCheckout" value="1" />
                                    <label for="defaultCheckout" class="ml-2 cursor-pointer">Default Checkout</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-section">
                    <div class="conatiner">
                        <div class="send-order-section">
                            <div class="send-order">
                                <h3 class="order-conf m-0 p-0">Send Order Confirmation</h3>

                                <div class="switch-btn">
                                    <BaseToggle class="toggle-btn" :value="dataVariable.sendOrderConfirmation"
                                        @listenToggleChange="getOrderConform" />
                                </div>
                            </div>
                            <div class="socialmedia-option">
                                <div class="socialmedia-option-select">
                                    <div class="media-options whatsup">
                                        <BaseCheckBox :data="whatsapp"
                                            @listenCheckboxChange="updateSendOrderConfirmation" />
                                    </div>
                                    <div class="media-options sms">
                                        <BaseCheckBox :data="sms" @listenCheckboxChange="updateSendOrderConfirmation" />
                                    </div>
                                    <div class="media-options email">
                                        <BaseCheckBox :data="email"
                                            @listenCheckboxChange="updateSendOrderConfirmation" />
                                    </div>
                                </div>
                                <div class="open-model-view">
                                    <span @click="viewTemplate()">View</span>
                                </div>
                                <ViewTemplateModal v-if="dataVariable.showViewTemplate"
                                    :headerTitle="dataVariable.headingTitle"
                                    @close-modal="dataVariable.showViewTemplate = false"
                                    :emailViewImg="dataVariable.emailViewImg" :smsViewImg="dataVariable.smsViewImg"
                                    :whatsAppViewImg="dataVariable.whatsAppViewImg" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <BaseSubmitButton text="Save" tw-classes="save-btn" class="[!dataVariable.storeName]"
                        @click="updategeneralDetails" :isLoading="buttonLoading"
                        v-if="checkAccessRight('settings') ? true : deepCheckAccessRight('checkout', 'settings', 'action_general')" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import '../general-setting/CheckoutSetting.scss';

.p-tooltip-text {
    color: red !important;
}
</style>
<style lang="scss">
@import '../../../../assets/itl-common-css/common-css.scss';

body.model-open {
    overflow: hidden !important;
}

.vendorMargin {
    margin-left: 8px !important;
}

.p-inputswitch .p-inputswitch-slider {
    background: #ccc !important;
}

.p-inputswitch .p-inputswitch-slider {
    background: #ccc !important;
}

.darkTheme .p-inputswitch .p-inputswitch-slider {
    background: #5d5d5d !important;
}

#common-toggle.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
    background: #0052cc !important;
}

.p-inputswitch .p-inputswitch-slider:before {
    background: white !important;
}

.p-dropdown-items-wrapper {
    width: 100% !important;
}

.store-dropdown .p-dropdown-items-wrapper {
    border: 1px solid #dfe3e6 !important;
}

.darkTheme.store-dropdown .p-dropdown-items-wrapper {
    border: 1px solid #5d5d5d !important;
}

.notification-on-checkout {
    .pi {
        font-size: 12px !important;
    }

    .p-radiobutton-box.p-highlight,
    .p-radiobutton-box.p-highlight:not(.p-disabled):hover {
        border-color: #0075ff;
        background: #0075ff;
    }

    .p-radiobutton-box:not(.p-disabled):not(.p-highlight):hover {
        border-color: lightgray;
    }

    .p-radiobutton-box:not(.p-disabled).p-focus {
        border-color: #0075ff;
        box-shadow: none;
    }

    .p-radiobutton {
        width: 18px !important;
        height: 18px !important;
    }

    .p-radiobutton-box {
        width: 18px !important;
        height: 18px !important;
        background: transparent;
    }

    .p-radiobutton-box .p-radiobutton-icon {
        width: 6px !important;
        height: 6px !important;
    }

    @media screen and (max-width: 1024px) {
    .custom-tooltip {
        position: relative;
        display: inline-block;
    }

    .custom-tooltip .custom-tooltiptext::after {
        content: "";
        position: absolute;
        bottom: -10px; /* Position the arrow at the bottom of the tooltip */
        left: 83%; /* Center the arrow horizontally */
        margin-left: -5px; /* Offset the arrow by half its width to center it */
        border-width: 5px;
        border-style: solid;
        border-color: var(--gray-900) transparent transparent transparent;
        /* Black arrow pointing upwards */
    }

    .custom-tooltip .custom-tooltiptext {
        font-family: $helveticaRegular;
        visibility: hidden;
        width: 240px;
        background-color: var(--gray-900);
        /* Match the arrow color */
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 8px;
        margin-bottom: 2px;
        line-height: 16px;

        /* Position the tooltip */
        position: absolute;
        z-index: 1;
        bottom: 135%;
        left: -250%;
        /* Center the tooltip horizontally */
        transform: translateX(-50%);
        /* Adjust position to keep tooltip centered */
    }

    .custom-tooltip:hover .custom-tooltiptext {
        visibility: visible;
    }
}


}
</style>
