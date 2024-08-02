<script setup lang="ts">
import { useStore } from 'vuex';
import { useCookies } from 'vue3-cookies';
import useVuelidate from '@vuelidate/core';
import { useToast } from 'primevue/usetoast';
import pageHeader from './components/pageHeader.vue';
import accountOtp from '../account-details/accountOtp.vue';
import { checkUserType } from '../../../util/commonHandlers';
import { DARKMODE } from '../../../store/dark-mode/constants';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseDropdown from '../../../components/base/BaseDropdown.vue';
import { ACCOUNTSETTINGS } from '../../../store/account-settings/constants';
import { ref, onMounted, computed, reactive, watch, onUnmounted } from 'vue';
import BaseSubmitButton from '../../../components/base/BaseSubmitButton.vue';
import { getAccountDetails } from '../../../api/accountDetails/accountDetails';
import { maxLength, required, helpers, minLength } from '@vuelidate/validators';
import VendorModal from '../../../components/common-modal-files/VendorModal.vue';

const toast = useToast();
const store = useStore();
const vendorData = ref([]);
const isAdmin = ref(false);
const isLoading = ref(false);
const isShowOtp = ref(false);
const isVerified = ref(false);
const selectedImage = ref(null);
const { cookies } = useCookies();
const isFormSubmitted = ref(false);
const getVerifiedStatus = ref('Not Verified');
const mobileToken = cookies.get('mobile_token');
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const accountDetailsData = computed(() => store.getters[`${ACCOUNTSETTINGS.NAME}/sendaccountsettings`]);

const state = reactive({
    status: accountDetailsData.value?.account_details_array?.[0]?.status || '',
    email: accountDetailsData.value?.account_details_array?.[0]?.email || '',
    mobile: accountDetailsData.value?.account_details_array?.[0]?.mobile || '',
    alt_mobile: accountDetailsData.value?.account_details_array?.[0]?.alt_mobile || '',
    selected_marketplaces_id: '',
    selected_commodities_id: '',
    parent_company_name: '',
    parent_user_id: accountDetailsData.value?.account_details_array?.[0]?.parent_user_id || '',
    company_modal_type: '',
    responsible_user_id: '',
    vendor_code: '',
    first_name: accountDetailsData.value?.account_details_array?.[0]?.first_name || '',
    last_name: accountDetailsData.value?.account_details_array?.[0]?.last_name || '',
    company_name: accountDetailsData.value?.account_details_array?.[0]?.company_name || '',
    vendor_website: accountDetailsData.value?.account_details_array?.[0]?.vendor_website || '',
    fssai_number: accountDetailsData.value?.account_details_array?.[0]?.fssai_number || '',
    file_name1: '',
    mobile_verify: accountDetailsData.value?.account_details_array?.[0]?.mobile_verify || '',
    mobile_token: mobileToken ? mobileToken : '',
    ondc_bap_id: '',
    pdf_logo_img: '',
    user_status: '',
});

const getImg = (imageName) => {
    return new URL(`../../../assets/images/${imageName}.svg`, import.meta.url).href;
};

onMounted(async () => {
    checkIsVendor();
});
const checkIsVendor = async () => {
    if (checkUserType('vendor')) {
        const payload = {
            vendor_id: '',
        };
        await getAccountDetails(payload);
    } else return;
};

const status = ref([
    { value: 'Inactive', id: 'NY' },
    { value: 'Active', id: 'RM' },
    { value: 'Blocked', id: 'LDN' },
]);

const rules = computed(() => ({
    status: {
        required: helpers.withMessage(() => '*This value is required.', required),
    },
    email: {
        required: helpers.withMessage(() => '*This value is required.', required),
        validEmail: helpers.withMessage(
            () => '*This value should be a valid email.',
            (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            }
        ),
    },
    mobile: {
        required: helpers.withMessage(() => '*This value is required.', required),
        maxLength: helpers.withMessage(() => 'This value length is invalid. It should be 10', maxLength(10)),
        minLength: helpers.withMessage(() => 'This value length is invalid. It should be 10', minLength(10)),
    },
    alt_mobile: {
        required: helpers.withMessage(() => '*This value is required.', required),
        maxLength: helpers.withMessage(() => 'This value length is invalid. It should be 10', maxLength(10)),
        minLength: helpers.withMessage(() => 'This value length is invalid. It should be 10', minLength(10)),
    },
}));
const v$ = useVuelidate(rules, state);
// // start
watch(
    () => ({
        status: v$.status,
        email: v$.email,
        mobile: v$.mobile,
        alt_mobile: v$.alt_mobile,
    }),
    (newValues) => {
        Object.keys(newValues).forEach((key) => {
            if (newValues[key] && newValues[key].$pending) {
                // Leave the field value unchanged during validation
            } else {
                // Update the field value after validation
                state[key] = newValues[key].$model;
            }
        });
    }
);
// // end
const showVendorModal = () => {
    isAdmin.value = true;
};
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Assuming you want to display a preview of the uploaded image
        const reader = new FileReader();
        reader.onload = () => {
            selectedImage.value = reader.result;
            v$.value.$touch(); // Trigger validation
        };
        reader.readAsDataURL(file);
    }
};
//  on form submit click
const getaccountData = async () => {
    if (v$.value.mobile && v$.value.alt_mobile && v$.value.status && v$.value.email && state.mobile.length == 10 && state.alt_mobile.length == 10) {
        isLoading.value = true; // Set loading to true during submission
        isVerified.value = true;
        getVerifiedStatus.value = 'Verified ';
        const data = {
            ...state,
            vendor_id: vendorData.value[1],
            status: state.status.name,
        };
        // using store call api
        try {
            await store.dispatch(`${ACCOUNTSETTINGS.NAME}/getaccountsettings`, data);
            console.log('this is OTP Data =========>', state.mobile, accountDetailsData.value?.account_details_array?.[0]?.mobile);
            if (state.mobile !== accountDetailsData.value?.account_details_array?.[0]?.mobile) {
                isShowOtp.value = true;
                await store.dispatch(`${ACCOUNTSETTINGS.NAME}/sendOtp`);
                return;
            }

            const response = store.getters[`${ACCOUNTSETTINGS.NAME}/sendaccountsettings`];
            if (response.status == 'success') {
                toast.add({ severity: 'success', detail: response.html_message, life: 3000 });
                isLoading.value = false;
            } else {
                isLoading.value = false;
                toast.add({ severity: 'error', detail: response.html_message, life: 3000 });
            }
            isFormSubmitted.value = true;
            v$.value.$reset(); // Reset Vuelidate validation state.
        } catch (error) {
            console.error('Error submitting form', error);
        } finally {
            isLoading.value = false; // Set loading to false regardless of success or failure
        }
    } else {
        v$.value.$touch();
        isLoading.value = false;
    }
};
const cancelImage = () => {
    selectedImage.value = null;
};
const triggerFileInput = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.click();
    }
};
const applyVendorFilter = async (vendorName) => {
    vendorName.forEach(async (element) => {
        const tempData = element.split(',');
        const payload = {
            vendor_id: tempData[1],
        };
        // debugger;
        const userDetails = await getAccountDetails(payload);
        vendorData.value = tempData;
        isAdmin.value = false;
    });
};
const resetVendorFilter = () => {
    vendorData.value = [];
    isAdmin.value = false;
};

onMounted(async () => {
    document.body.classList.add('account-vendor');
});
onUnmounted(() => {
    document.body.classList.remove('account-vendor');
});
</script>
<template>
    <ToastView />
    <div class="AccountDetailsContainer">
        <pageHeader headerText="Account Details" class="mb-3">
            <template #left-side>
                <div v-if="!checkUserType('vendor')" class="flex align-items-center gap-1 cursor-pointer font-medium text-[13px]">
                    <span v-if="vendorData.length == 0" @click="showVendorModal()" class="text-[#4b5563] dark:text-[#dfdfdf] cursor-pointer font-medium text-[13px]"> ( Select Vendor ) </span>
                    <span v-else>
                        {{ vendorData[0] }}
                    </span>
                    <button @click="showVendorModal()" class="show-vendor-btn font-medium">
                        <img v-if="!darkModeVal" :src="getImg('account-vendor_v3')" />
                        <img v-else src="../../../assets/images/dark-mode/account-vendor_v3.svg" alt="map" />
                    </button>

                    <VendorModal v-if="!checkUserType('vendor')" v-show="isAdmin" @close-modal="isAdmin = false" @applyVendor="applyVendorFilter" @resetVendor="resetVendorFilter" />
                </div>
            </template>
        </pageHeader>
        <div class="AccountDetailsContainer-form">
            <div class="box-border">
                <form class="card" autocomplete="off">
                    <div class="flex item-center gap-3 flex-wrap w-full flex-col md:flex-row">
                        <div class="flex flex-col md:w-[30%] lg:w-[24%] mb-[18px] mid-laptop-width" v-if="!checkUserType('vendor')">
                            <label class="text-[13px] font-medium mb-[5px]">Parent Company</label>
                            <BaseInput
                                v-model="state.parent_company_name"
                                placeholder="Enter Parent Compnay"
                                label="Parent Company"
                                inputType="text"
                                twClasses="border border-[#D1D5DB] dark:border-[#4D4D4D] dark:bg-[#4D4D4D] px-4 py-3 rounded-md h-10"
                            />
                        </div>
                        <div class="flex flex-col md:w-[30%] lg:w-[24%] mb-[18px] mid-laptop-width" v-if="!checkUserType('vendor')">
                            <label class="text-[13px] font-medium mb-[5px]">Responsible Company</label>
                            <BaseInput
                                v-model="state.responsible_user_id"
                                placeholder="Enter Responsible Compnay"
                                label="Responsible Company"
                                inputType="text"
                                twClasses="border border-[#D1D5DB] dark:border-[#4D4D4D] dark:bg-[#4D4D4D] px-4 py-3 rounded-md h-10"
                            />
                        </div>
                        <div class="flex flex-col md:w-[30%] lg:w-[24%] mb-[18px] mid-laptop-width" :class="{ 'has-error': !v$.state?.$pending && v$.state?.$error }" v-if="!checkUserType('vendor')">
                            <label class="text-[13px] font-medium mb-[5px]">Status</label>
                            <BaseDropdown
                                @listenDropdownChange="(val) => (state.status = val)"
                                :options="status"
                                :defaultValue="state.status && state.status.id"
                                placeholder="Select Status"
                                twClasses="!status-dropdown !border-[1px] !border-[#D1D5DB]  !dark:border-[#4D4D4D] !dark:bg-[#4D4D4D] !rounded-[6px] !h-[40px]"
                            />
                            <div v-if="!v$.status?.$pending">
                                <div class="input-errors" v-for="error in v$.status.$errors" :key="error.$uid">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:w-[30%] lg:w-[24%] mb-[18px] text-[13px] mid-laptop-width">
                            <label class="text-[13px] font-medium mb-[5px]">Vendor Id</label>
                            <BaseInput v-model="state.vendor_code" placeholder="Enter Vendor Id" label="Vendor Id" inputType="text" twClasses="border border-[#D1D5DB] dark:border-[#4D4D4D] dark:bg-[#4D4D4D] px-4 py-3 rounded-md h-10" />
                        </div>
                        <div class="flex flex-col md:w-[30%] lg:w-[24%] text-[13px] mb-[18px] mid-laptop-width">
                            <label class="text-[13px] font-medium mb-[5px]">First Name</label>
                            <BaseInput v-model="state.first_name" placeholder="Enter First Name" label="First Name" inputType="text" twClasses="border border-[#D1D5DB] dark:border-[#4D4D4D] dark:bg-[#4D4D4D] px-4 py-3 rounded-md h-10" />
                        </div>
                        <div class="flex flex-col md:w-[30%] lg:w-[24%] text-[13px] mb-[18px] mid-laptop-width">
                            <label class="text-[13px] font-medium mb-[5px]">Last Name</label>
                            <BaseInput v-model="state.last_name" placeholder="Enter Last Name" label="Last Name" inputType="text" twClasses="border border-[#D1D5DB] dark:border-[#4D4D4D] dark:bg-[#4D4D4D] px-4 py-3 rounded-md h-10" />
                        </div>
                        <div class="flex flex-col md:w-[30%] lg:w-[24%] text-[13px] mb-[18px] mid-laptop-width">
                            <label class="text-[13px] font-medium mb-[5px]">Company Name</label>
                            <BaseInput v-model="state.company_name" placeholder="Enter Compnay Name" label="Company Name" inputType="text" twClasses="border border-[#D1D5DB] dark:border-[#4D4D4D] dark:bg-[#4D4D4D] px-4 py-3 rounded-md h-10" />
                        </div>
                        <div class="flex flex-col md:w-[30%] lg:w-[24%] text-[13px] mb-[18px] mid-laptop-width" :class="{ 'has-error': !v$.email?.$pending && v$.email?.$error }">
                            <label class="text-[13px] font-medium mb-[5px]">Email</label>
                            <BaseInput v-model="state.email" placeholder="Enter Email Id" label="Email" inputType="text" twClasses="border border-[#D1D5DB] dark:border-[#4D4D4D] dark:bg-[#4D4D4D] px-4 py-3 rounded-md h-10" />
                            <div v-if="!v$.email?.$pending">
                                <div class="input-errors">
                                    <div class="error-msg">{{ v$.email?.$errors[0]?.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:w-[30%] lg:w-[24%] text-[13px] mb-[18px] mid-laptop-width" :class="{ 'has-error': !v$.mobile?.$pending && v$.mobile?.$error }">
                            <label class="flex items-center font-medium mb-[5px]"
                                >Phone <span class="text-[red]">*</span><span class="pl-[5px]"> <img :src="getImg(isVerified ? 'as-right-tick-green' : 'as-not-verified-img')" /></span>
                                <span class="phoneFontFamily pl-[3px] text-[10px] font-light" :class="isVerified ? 'text-[green]' : 'text-[red]'">{{ getVerifiedStatus }}</span>
                            </label>
                            <div class="flex border-[1px] border-[#D1D5DB] dark:border-[#3B3B3B] rounded-[6px]">
                                <div class="w-[28%] phoneFlag">
                                    <a class="flex items-center px-[10px] md:px-[8px] py-[12px] border-r-[0.14em] border-r-[#D1D5DB] h-[40px] rounded-l-[6px] dark:border-black dark:bg-[#4d4d4d]">
                                        <img :src="getImg('kyc-ind-flag')" alt="indflag" class="cursor-pointer" />
                                        <span class="font-medium ml-[5px]">+91</span>
                                    </a>
                                </div>
                                <BaseInput v-model="state.mobile" placeholder="Enter Mob No." inputType="text" twClasses="border-none " />
                            </div>
                            <div v-if="!v$.mobile?.$pending">
                                <div class="input-errors" v-for="error in v$.mobile.$errors" :key="error.$uid">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:w-[30%] lg:w-[24%] text-[13px] mb-[18px] mid-laptop-width" :class="{ 'has-error': !v$.alt_mobile?.$pending && v$.alt_mobile?.$error }">
                            <label class="font-medium mb-[5px]">Alternate Phone No. </label>
                            <div class="flex border-[1px] rounded-[6px] border-[#D1D5DB] dark:border-[#4D4D4D] dark:bg-[#4D4D4D]">
                                <div class="w-[28%] phoneFlag">
                                    <a class="flex items-center px-[10px] md:px-[8px] py-[12px] border-r-[0.14em] h-[40px] rounded-l-[6px] dark:border-black dark:bg-[#4D4D4D]">
                                        <img :src="getImg('kyc-ind-flag')" alt="indflag" class="cursor-pointer" />
                                        <span class="font-medium ml-[5px]">+91</span>
                                    </a>
                                </div>
                                <BaseInput v-model="state.alt_mobile" placeholder="Enter Mob No." inputType="text" twClasses="border-none " />
                            </div>
                            <div v-if="!v$.alt_mobile?.$pending">
                                <div class="input-errors" v-for="error in v$.alt_mobile.$errors" :key="error.$uid">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="flex md:w-[30%] flex-col lg:w-[24%] text-[13px] mb-[18px] mid-laptop-width">
                            <label class="font-medium mb-[5px]">Website</label>
                            <BaseInput v-model="state.vendor_website" placeholder="Enter Website URL" inputType="text" twClasses="border border-[#D1D5DB] dark:border-[#4D4D4D] dark:bg-[#4D4D4D] px-4 py-3 rounded-md h-10" />
                        </div>
                        <div class="flex flex-col md:w-[30%] lg:w-[24%] text-[13px] mid-laptop-width">
                            <label class="font-medium mb-[5px]">FSSAI Number (Optional)</label>
                            <BaseInput v-model="state.fssai_number" placeholder="FSSAI Number" inputType="text" twClasses="border border-[#D1D5DB] dark:border-[#4D4D4D] dark:bg-[#4D4D4D] px-4 py-3 rounded-md h-10" />
                        </div>
                    </div>
                    <div class="flex flex-col lg:w-[24%] mt-[20px] ml-[5px] mb-[18px]">
                        <label class="text-[13px] font-medium mb-[15px]">Company logo (Optional)</label>
                        <div class="uploadImg relative border-dashed border-[#D1D5DB] border-[1px] dark:border-[#3F3F3F] dark:bg-[#4D4D4D] rounded-[4px] h-[150px] w-[150px] cursor-pointer">
                            <!-- Input to trigger file upload -->
                            <input type="file" class="hidden" accept="image/*" @change="handleFileUpload" />
                            <!-- Display selected image here -->
                            <ul class="max-w-full max-h-full px-[20px] py-[44px]" @click="triggerFileInput">
                                <img v-if="selectedImage" :src="selectedImage" alt="uploaded-img" class="max-h-full max-w-full object-cover rounded-[4px]" />
                            </ul>
                            <!-- Cancel image (cross icon) -->
                            <button v-if="selectedImage" class="absolute top-[-14px] right-[-14px] rounded-full p-1" @click="cancelImage">
                                <img :src="getImg('kyc-upload-img-close')" alt="uploadimg" class="cursor-pointer mx-auto mb-2" />
                            </button>
                            <!-- Click to Upload placeholder -->
                            <div v-if="!selectedImage" class="flex flex-col justify-center items-center absolute inset-0" @click="triggerFileInput">
                                <img :src="getImg('kyc-upload-docu-icon')" alt="uploadimg" class="cursor-pointer mx-auto mb-2" />
                                <div class="text-[13px] text-[#6B7280] font-normal">Click to Upload</div>
                            </div>
                        </div>
                        <BaseSubmitButton @click.prevent="getaccountData()" text="submit" :isLoading="isLoading" twClasses="bg-[#0052cc] w-[136px] h-[40px] mt-[30px] rounded-[50px] border-[#0049b0]" />
                    </div>
                </form>
                <accountOtp v-if="checkUserType('vendor') && isShowOtp" />
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
// @import './AccountDetails.scss';
@import '../../../assets/itl-common-css/common-css.scss';

@media screen and (min-width: 768px) and (max-width: 1023px) {
    .phoneFlag {
        width: 44%;
    }
}
@media screen and (min-width: 1024px) and (max-width: 1199px) {
    .mid-laptop-width {
        width: 32%;
    }
}

@media screen and (min-width: 1200px) and (max-width: 1500px) {
    .phoneFlag {
        width: 32%;
    }
}
.account-vendor {
    .p-dropdown:not(.p-disabled).p-focus {
        box-shadow: none !important;
        outline: none !important;
        border-color: #9ca3af !important;
    }
    .p-dropdown:not(.p-disabled):hover {
        border-color: #d1d5db !important;
    }
    .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight.p-focus {
        background: none;
    }
}

.AccountDetailsContainer-form label {
    font-family: $interSemiBold;
}
.AccountDetailsContainer-form input {
    font-family: $interRegular;
}
.AccountDetailsContainer-form form {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}
.account-vendor .show-vendor-btn {
    margin-top: 4px;
    margin-left: 2px;
}
.input-errors {
    color: red;
}
.p-dropdown-items-wrapper ul {
    @include theme() {
        background-color: theme-get('check-input-background') !important;
    }
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
    @include theme() {
        background-color: theme-get('check-input-background') !important;
    }
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
    color: blue !important;
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
    background-color: #bcbcbc;
}
.phoneFontFamily {
    font-family: $interRegular !important;
}
</style>
