<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { CHECKOUTSETTING } from '../../../../store/checkout/checkout-setting/constant';
import { PAYMENTSETTING } from '../../../../store/checkout/payment-setting/constant';
import SidebarSetting from '../../../../views/checkout/setting/setting-sidebar/SidebarSetting.vue';
import { useToast } from 'primevue/usetoast';
import { DARKMODE } from '../../../../store/dark-mode/constants';
import { checkAccessRight, deepCheckAccessRight } from '../../../../util/commonHandlers';
import { checkUserType } from '../../../../util/commonHandlers'; //checkUserType
import Skeleton from 'primevue/skeleton';
import VendorModal from '../../../../components/common-modal-files/VendorModal.vue';
import BaseDropdown from '../../../../components/base/BaseDropdown.vue';
import BaseInput from '../../../../components/base/BaseInput.vue';
import BaseSubmitButton from '../../../../components/base/BaseSubmitButton.vue';
const topHeader = JSON.parse(localStorage.getItem('top_header'));
const store = useStore();
const toast = useToast();
const merchantIdError = ref(false);
const razorpaykeyError = ref(false);
const razorpaysecretkeyError = ref(false);
const merchantId = ref(null);
const razorpaykey = ref(null);
const razorpaysecretkey = ref(null);
const loading = ref(false);
const isSkeleton = ref(false);
const selectedPayment = ref('');
const isUpdate = ref(false);
const isAdmin = ref(false);
const showListData = ref(false);
const vendorData = ref([]);
const storeDropdownData = ref();
// const vendorId = ref('');
const showVendorModal = () => {
    isAdmin.value = true;
};
const paymentTypes = ref([{ id: 1, value: 'Razorpay' }]);

selectedPayment.value = paymentTypes.value[0].id;
const getStoreId = computed(() => store.getters[`${CHECKOUTSETTING.NAME}/sendStoreId`]);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
onMounted(async () => {
    document.body.classList.add('Payment-Page-outer');
    showListData.value = !checkUserType('vendor') ? false : true;
    checkAccessRight('settings') ? true : deepCheckAccessRight('checkout', 'settings', 'payment');
});
onBeforeUnmount(() => {
    document.body.classList.remove('Payment-Page-outer');
});
watch(
    () => isAdmin.value,
    (newValue) => {
        if (newValue) {
            document.body.classList.add('wismo-overflow-hidden');
        } else {
            document.body.classList.remove('wismo-overflow-hidden');
        }
    }
);
const getPaymentDetails = async () => {
    isSkeleton.value = true;
    merchantIdError.value = false;
    razorpaykeyError.value = false;
    razorpaysecretkeyError.value = false;
    await store.dispatch(`${CHECKOUTSETTING.NAME}/getPaymentDetails`, { storeId: getStoreId.value, vendor_id: vendorData.value[1] || '' });
    const paymentDetails = await store.getters[`${CHECKOUTSETTING.NAME}/sendPaymentDetails`];
    if (paymentDetails.status == 'success') {
        isSkeleton.value = false;
        merchantId.value = paymentDetails.payment_detials_data.razor_pay_merchant_id;
        razorpaykey.value = paymentDetails.payment_detials_data.razorpay_api_key;
        razorpaysecretkey.value = paymentDetails.payment_detials_data.razorpay_secret_key;
    } else {
        isSkeleton.value = false;
    }
};
const updatePaymentDetails = async () => {
        // Check if any field is empty
        if (!merchantId.value || !razorpaykey.value || !razorpaysecretkey.value) {
            if (!merchantId.value) {
                merchantIdError.value = true;
            } else {
                merchantIdError.value = false;
            }
            if (!razorpaykey.value) {
                razorpaykeyError.value = true;
            } else {
                razorpaykeyError.value = false;
            }
            if (!razorpaysecretkey.value) {
                razorpaysecretkeyError.value = true;
            } else {
                razorpaysecretkeyError.value = false;
            }
            return;
        } else {
            loading.value = true;
            const data = {
                storeId: getStoreId.value,
                merchantId: merchantId.value,
                razorpaykey: razorpaykey.value,
                razorpaysecretkey: razorpaysecretkey.value,
                vendor_id: vendorData.value[1] || '',
            };
            console.log('value',data)
            await store.dispatch(`${PAYMENTSETTING.NAME}/updatePaymentDetails`, data);
            // await store.dispatch(`${CHECKOUTSETTING.NAME}/getPaymentDetails`, { storeId: getStoreId.value,vendor_id: vendorData.value[1] || ''});
            const status = store.getters[`${PAYMENTSETTING.NAME}/sendpaymentsuccess`];
            loading.value = false;
            if (status.status == 'success') {
                toast.add({ severity: 'success', summary: 'Success Message', detail: status.message, life: 1000 });
            } else {
                toast.add({ severity: 'error', summary: 'Error Message', detail: status.message, life: 1000 });
            }

            isUpdate.value = false;
        }
};
const handleMerchantInput = () => {
    merchantIdError.value = false;
};

const handleRazorpayKeyInput = () => {
    razorpaykeyError.value = false;
};

const handleRazorpaySecretKeyInput = () => {
    razorpaysecretkeyError.value = false;
};
// Select Vendor model
const getImg = (imageName) => {
    return new URL(`../../../../assets/images/${imageName}.svg`, import.meta.url).href;
};

const applyVendorFilter = async (vendorName) => {
    vendorName.forEach(async (element) => {
        const tempData = element.split(',');
        console.log(tempData);
        isAdmin.value = false;
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
    storeDropdownData.value = store.getters[`${CHECKOUTSETTING.NAME}/sendStoreDetails`];
    showListData.value = true;
};
const resetVendorFilter = () => {
    vendorData.value = [];
    isAdmin.value = false;
};
// Selecte vendor model end
const getMerchantId = (value) => {
    merchantId.value = value;
    isUpdate.value = true;
};
const getrazorpaykey = (value) => {
    razorpaykey.value = value;
    isUpdate.value = true;
};
const getrazorpaysecretkey = (value) => {
    razorpaysecretkey.value = value;
    isUpdate.value = true;
};
const getpaymentdropdown = (value) => {
    selectedPayment.value = value;
   // console.log(selectedPayment.value[0]+'')
};
const inputDynamicValue = ref({
    paymentlistLabel: {
        forLabel: 'paymentlist',
        class: 'input-label',
        lableName: 'Default Payment Gateway',
    },
    // paymentlistInput: {
    //     type: 'text',
    //     id: 'paymentlist',
    //     placeholder: '',
    //     name: 'paymentlist',
    //     class: 'input-text',
    // },
    merchantLabel: {
        forLabel: 'merchant',
        class: 'input-label',
        lableName: 'Merchant ID',
    },
    // merchantInput: {
    //     type: 'text',
    //     id: 'merchant',
    //     placeholder: '',
    //     name: 'vendor',
    //     class: 'input-text',
    // },
    clientidLabel: {
        forLabel: 'client',
        class: 'input-label',
        lableName: 'Client ID',
    },
    // clientidInput: {
    //     type: 'client',
    //     id: 'client',
    //     placeholder: '',
    //     name: 'client',
    //     class: 'input-text',
    // },
    secretcodeLabel: {
        forLabel: 'secretcode',
        class: 'input-label',
        lableName: 'Client ID Secret Code',
    },
    // secretcodeInput: {
    //     type: 'text',
    //     id: 'secretcode',
    //     placeholder: '',
    //     name: 'secretcode',
    //     class: 'input-text',
    // },
    // saveBtn: {
    //     type: 'submit',
    //     class: 'save-btn',
    //     text: 'Save',
    // },
});

const data = [{
    id:1,
    value : 'Abcd'
}]
</script>
<template>
    <ToastView />
    <section class="main-payment">
        <div class="main-page-title">
            <div class="main-page-first-div">
                <div class="title-page">Payment</div>
                <!-- Select Vebdor -->
                <div>
                    <div v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" style="font-size: 14px"
                        class="flex md:justify-center md:items-center md:space-between">
                        <div class="show-vendor" @click="showVendorModal()">
                            <span class="ml-[8px]" v-if="vendorData.length == 0"> ( Select Vendor ) </span>
                            <span v-else class="vendorMargin">( {{ vendorData[0] }} )</span>
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
            <SidebarSetting :dropdownData="storeDropdownData" @tracking-details="getPaymentDetails" v-if="showListData">
            </SidebarSetting>
        </div>
        <div v-if="(topHeader['user_type'] == 1 || topHeader['user_type'] == 2) && !showListData"
            class="no-record-outer flex flex-col justify-center items-center gap-1 h-[60vh] py-[50px]">
            <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
            <div class="head text-[#9CA3AF] text-[16px] p-[50px]">No Records Found</div>
        </div>
        <div v-else>
            <div class="main-section"
                :class="topHeader['user_type'] == 1 || topHeader['user_type'] == 2 ? 'subadmin-main-section' : ''">
                <div class="company-section">
                    <div class="main-info">
                        <div class="header">
                            <span>ITL Checkout </span>
                        </div>
                    </div>
                    <div class="conatiner">
                        <div class="info">
                            <div class="info-left">
                                <div class="main-input">
                                    <DynamicLable :lableValues="inputDynamicValue.paymentlistLabel" />
                                    <div class="dropdown-list">
                                         <!-- <Dropdown v-model="selectedPayment" :options="paymentTypes" optionLabel="value"
                                            optionValue="id" placeholder="RazorPay"
                                            class="payment-dropdown payment-custom">
                                            <template #value="slotProps">
                                                <div v-if="value" class="flex align-items-center">
                                                    <div class="list-payment-op">{{ slotProps.value.value }}</div>
                                                </div>
                                            </template>
                                            <template #option="slotProps">
                                                <div class="option-item">
                                                    <div class="select-options">
                                                        <div class="option-name"
                                                            @click="getStoreId(slotProps.option.id)">{{
                                                            slotProps.option.value }}</div>
                                                    </div>
                                                </div>
                                            </template>
                                        </Dropdown>  -->
                                        <BaseDropdown @listenDropdownChange="getpaymentdropdown" 
                                            :options="paymentTypes" placeholder="Razorpay" :defaultValue="paymentTypes[0].id" twClasses="w-[100%]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info">
                            <div class="info-left payment-autofill">
                                <div class="main-input">
                                    <div class="label-box flex">
                                        <DynamicLable :lableValues="inputDynamicValue.merchantLabel" />
                                        <span>*</span>
                                    </div>
                                    <Skeleton v-if="isSkeleton" height="32px" borderRadius="4px" />
                                    <!-- <DynamicInput v-else :inputValues="inputDynamicValue.merchantInput"
                                        :modelInput="merchantId" @inputValue="getMerchantId"
                                        @input="handleMerchantInput" /> -->
                                        <BaseInput v-else inputType="text" id="merchant" twClasses="input-text" placeholder=""
                                        v-model="merchantId" @input="handleMerchantInput"/>

                                    <div class="error_msg" v-if="merchantIdError">Merchant ID is required</div>
                                </div>
                                <div class="main-input right">
                                    <div class="label-box flex">
                                        <DynamicLable :lableValues="inputDynamicValue.clientidLabel" />
                                        <span>*</span>
                                    </div>
                                    <Skeleton v-if="isSkeleton" height="32px" borderRadius="4px" />
                                    <!-- <DynamicInput v-else :inputValues="inputDynamicValue.clientidInput"
                                        :modelInput="razorpaykey" @inputValue="getrazorpaykey"
                                        @input="handleRazorpayKeyInput" /> -->
                                  <BaseInput v-else inputType="text" id="merchant" twClasses="input-text" placeholder=""
                                        v-model="razorpaykey" @input="handleRazorpayKeyInput"/>

                                    <div class="error_msg" v-if="razorpaykeyError">Client Id is required</div>
                                </div>
                            </div>
                            <div class="info-right">
                                <div class="main-input">
                                    <div class="label-box flex">
                                        <DynamicLable :lableValues="inputDynamicValue.secretcodeLabel" />
                                        <span>*</span>
                                    </div>
                                    <Skeleton v-if="isSkeleton" height="32px" borderRadius="4px" />
                                    <!-- <DynamicInput v-else :inputValues="inputDynamicValue.secretcodeInput"
                                        :modelInput="razorpaysecretkey" @inputValue="getrazorpaysecretkey"
                                        @input="handleRazorpaySecretKeyInput" /> -->
                                        <BaseInput v-else inputType="text" id="merchant" twClasses="input-text" placeholder=""
                                        v-model="razorpaysecretkey" @input="handleRazorpaySecretKeyInput"/>

                                    <div class="error_msg" v-if="razorpaysecretkeyError">Client ID Secret Code is required
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn">
                <div class="container">
                    <!-- <DynamicButton :buttonValue="inputDynamicValue.saveBtn" :loading="loading"
                        :clickevent="updatePaymentDetails"
                        v-if="checkAccessRight('settings') ? true : deepCheckAccessRight('checkout', 'settings', 'action_payment')" /> -->
                    <BaseSubmitButton text="Save" tw-classes="save-btn" :isLoading="loading" @click="updatePaymentDetails"
                    v-if="checkAccessRight('settings') ? true : deepCheckAccessRight('checkout', 'settings', 'action_payment')" />
                    
                    
                </div>
            </div>

        </div>
    </section>
</template>
<style lang="scss" scoped>
@import './paymentPage.scss';
</style>
<style>
.Payment-Page-outer .p-dropdown-items-wrapper{
    width:100% !important;
    border:1px solid #d4d6d9 !important;
}
.darkTheme.Payment-Page-outer .p-dropdown-items-wrapper{
    border: 1px solid #5d5d5d !important;
}
.Payment-Page-outer .truncate{
    color:black;
}
.darkTheme.Payment-Page-outer .truncate{
    color:#dfdfdf;
}
 .show-vendor {
        position: relative;
        top: 0px;
        cursor: pointer;
    }

</style>