<script lang="ts" setup>
import { ref, computed, watch, onMounted, reactive } from 'vue';
import VendorModal from '../../../components/common-modal-files/VendorModal.vue';
import dummyData from './accountKyc.js';
import BaseSingleFileUpload from '../../../components/base/BaseSingleFileUpload.vue';
import useVuelidate from '@vuelidate/core';
import { required } from 'vuelidate/lib/validators';
import Calendar from 'primevue/calendar';
import { useStore } from 'vuex';
import { DARKMODE } from '../../../store/dark-mode/constants';
import BaseDropdown from '../../../components/base/BaseDropdown.vue';
import BaseSubmitButton from '../../../components/base/BaseSubmitButton.vue';
import { useToast } from 'primevue/usetoast';
import accountKycModal from './accountKycModal.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
const topHeader = JSON.parse(localStorage.getItem('top_header'));
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const toast = useToast();
const showstatusUpdate = ref(false);
const showviewDocument = ref(false);
const selectedusersType = ref({ value: 'Company' });
const contactPerson = ref('');
const companyName = ref('');
const gstNo = ref('');
const panNumber = ref('');
const nameOnPan = ref('');
const dob = ref('');
const aadharNumber = ref('');
const nameOnAadhar = ref('');
const aadharStatus = ref('');
const panRejectRemark = ref('');
const aadharRejectRemark = ref('');
const rejectRemark = ref('');
const rejectRemarkOne = ref('');
const buttonLoading = ref(false);
onMounted(async () => {
    const user = dummyData[0];
    contactPerson.value = user.contactPerson;
    companyName.value = user.companyName;
    gstNo.value = user.gstNo;
    panNumber.value = user.panNumber;
    nameOnPan.value = user.nameOnPan;
    dob.value = user.dob;
    aadharNumber.value = user.aadharNumber;
    nameOnAadhar.value = user.nameOnAadhar;
    aadharStatus.value = user.aadharStatus;
    panRejectRemark.value = user.panRejectRemark;
    aadharRejectRemark.value = user.aadharRejectRemark;
    showstatusUpdate.value = true;
    showviewDocument.value = true;
    rejectRemark.value = user.rejectRemark;
    rejectRemarkOne.value = user.rejectRemarkOne;
});
const getImg = (imageName) => {
    return new URL(`../../../assets/images/${imageName}.svg`, import.meta.url).href;
};
const isAdmin = ref(false);
const vendorData = ref([]);
const showVendorModal = () => {
    isAdmin.value = true;
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
};
const resetVendorFilter = () => {
    vendorData.value = [];
    isAdmin.value = false;
};
const userTypes = ref([
    { id: 1, value: 'Company', code: 'CO' },
    { id: 2, value: 'Individual', code: 'IN' },
]);
const companyTypes = ref([
    { id: 1, value: 'Sole Proprietorship', code: 'CO' },
    { id: 2, value: 'Partnership', code: 'IN' },
    { id: 3, value: 'Limited Liability Partnership', code: 'IN' },
    { id: 4, value: 'Public Limited Company', code: 'IN' },
    { id: 5, value: 'Private Limited Company', code: 'IN' },
]);
const kycDocs = ref([
    { id: 1, value: 'Select Identification Proof', code: 'CO' },
    { id: 2, value: 'Aadhar Card', code: 'IN' },
    { id: 3, value: 'Bank Account Statement', code: 'IN' },
    { id: 4, value: 'Driving License', code: 'IN' },
    { id: 5, value: 'Valid Passport', code: 'IN' },
    { id: 6, value: 'Voter ID Card', code: 'IN' },
]);
const gstDocs = ref([
    { id: 1, value: 'GST Certificate', code: 'IN' },
    { id: 2, value: 'Bank Account Statement', code: 'IN' },
    { id: 3, value: 'Company Incorporation Certificate', code: 'IN' },
]);
const panStatus = ref([
    { id: 1, value: 'Pending', code: 'CO' },
    { id: 2, value: 'Approved', code: 'IN' },
    { id: 3, value: 'Rejected', code: 'INS' },
]);
const docStatus = ref([
    { id: 1, value: 'Pending', code: 'CO' },
    { id: 2, value: 'Approved', code: 'IN' },
    { id: 3, value: 'Rejected', code: 'INS' },
]);
const getPlaceholder = () => {
    return filteredDocs.value === gstDocs.value ? 'GST Certificate' : 'Aadhar Card';
};
const isRejected = computed(() => {
    return selectedCity.value.code === 'INS';
});
const isRejecteds = computed(() => {
    return selectedCities.value.code === 'INS';
});
const selectedCity = ref(panStatus.value[0]);
const selectedCities = ref(docStatus.value[0]);
const companyusersType = ref();
const userDocuments = ref(kycDocs[0]);
const filteredDocs = ref(kycDocs.value);
watch(companyusersType, (newValue) => {
    if (!newValue || newValue.value === 'Sole Proprietorship') {
        filteredDocs.value = kycDocs.value.filter((doc) => doc.value !== 'Select Identification Proof');
        if (!newValue) {
            userDocuments.value = kycDocs.value[0];
        } else {
            userDocuments.value = kycDocs.value.find((doc) => doc.value === 'Aadhar Card');
        }
    } else {
        filteredDocs.value = gstDocs.value;
        userDocuments.value = gstDocs.value.find((doc) => doc.value === 'GST Certificate');
    }
});
const formData = reactive({
    companyName: '',
    contactPerson: '',
    panNumber: '',
    nameOnPan: '',
    dob: '',
    aadharNumber: '',
    nameOnAadhar: '',
});
const rules = {
    companyName: { required },
    contactPerson: { required },
    panNumber: { required },
    nameOnPan: { required },
    dob: { required },
    aadharNumber: { required },
    nameOnAadhar: { required },
};
const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
    buttonLoading.value = true;
    const result = await v$.value.$validate();
    if (result) {
        alert('success');
        toast.add({ severity: 'success', summary: 'Account Details Document Submitted Sucessfully', life: 1000 });
    } else {
        toast.add({ severity: 'error', summary: 'Please Filled Required Account Details Document ', life: 1000 });
    }
    setTimeout(() => {
        buttonLoading.value = false;
    }, 1000);
};
const getStatusColor = (statusCode) => {
    if (statusCode === 'CO') {
        return 'bg-[#fef9c3] && text-[#a16207]';
    } else if (statusCode === 'IN') {
        return 'bg-[#ccf3c6] && text-[#18740a]';
    } else {
        return 'bg-[#ffd9d9] && text-[#e4400b]';
    }
};
const isDirty = ref(false);
const isRequired = computed(() => aadharNumber.value.trim().length === 0);
const isInvalidLength = computed(() => {
    const length = aadharNumber.value.trim().length;
    return length > 0 && (length < 12 || length > 16);
});
function validateAadharNumber() {
    isDirty.value = true;
    aadharNumber.value = aadharNumber.value.replace(/\D/g, '');
    if (aadharNumber.value.length > 16) {
        aadharNumber.value = aadharNumber.value.slice(0, 16);
    }
}
function validatePanNumber() {
    isDirty.value = true;
    panNumber.value = panNumber.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
    if (panNumber.value.length > 10) {
        panNumber.value = panNumber.value.slice(0, 10);
    }
}
const isRequireds = computed(() => panNumber.value.trim().length === 0);
const isInvalidLengths = computed(() => panNumber.value.trim().length !== 0 && panNumber.value.trim().length !== 10);
const hasNumbersOrSpecialChars = computed(() => {
    const contactPersonContainsSpecialChars = /[0-9!@#$%^&*()_+={}|;':",.<>?]/.test(contactPerson.value);
    const nameOnAadharContainsSpecialChars = /[0-9!@#$%^&*()_+={}|;':",.<>?]/.test(nameOnAadhar.value);
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(panNumber.value);
    return contactPersonContainsSpecialChars || nameOnAadharContainsSpecialChars || hasSpecialCharacters;
});
function validateInput(inputElement) {
    isDirty.value = true;
    let regexPattern;
    if (inputElement === nameOnAadhar.value) {
        regexPattern = /[0-9!@#$%^&*()_+={}|;':",.<>?]/g;
    } else if (inputElement === contactPerson.value || inputElement === companyName.value) {
        regexPattern = /[0-9!@#$%^&*()_+={}|;':",.<>?]/g;
    } else if (inputElement === gstNo.value) {
        regexPattern = /[^A-Za-z0-9]/g;
    }
    inputElement.value = inputElement.value.replace(regexPattern, '');
}
</script>
<template>
    <div class="box-border p-[10px]">
        <ToastView class="formtoast" />
        <div class="section section--one flex flex-col md:flex-row pb-[20px] gap-[10px]">
            <h1 class="m-0 font-bold text-[22px]">KYC</h1>
            <div v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" class="flex md:justify-center md:items-center gap-[10px]">
                <span class="mr-[8px]" v-if="vendorData.length == 0" @click="showVendorModal()" style="cursor: pointer"> ( Select Vendor ) </span>
                <span v-else>
                    {{ vendorData[0] }}
                </span>
                <button @click="showVendorModal()" class="show-vendor-btn">
                    <img v-if="!darkModeVal" :src="getImg('account-vendor_v3')" />
                    <img v-else src="../../../assets/images/dark-mode/vendors_v3.svg" />
                </button>
                <VendorModal v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" v-show="isAdmin" @close-modal="isAdmin = false" @applyVendor="applyVendorFilter" @resetVendor="resetVendorFilter" />
            </div>
        </div>
        <div class="section section--two bg-[#fff] dark:bg-[#313131] rounded-[12px]">
            <div class="section--two--subsection md:px-[56px] md:py-[30px] px-[16px] py-[24px] flex flex-col">
                <div class="flex flex-wrap gap-[16px]">
                    <div class="flex flex-col w-[100%] md:w-[48%] lg:w-[24%] mb-[18px]">
                        <label class="text-[13px] font-medium mb-[5px]"
                            >User Type
                            <span class="text-[#FF5A3A]">*</span>
                        </label>
                        <BaseDropdown
                            v-model="selectedOption"
                            @listenDropdownChange="(val) => (selectedusersType = val)"
                            :filter="false"
                            :options="userTypes"
                            placeholder="Select User Type"
                            class="w-full rounded-[6px] h-[40px] bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] dark:border-[#4f4f50]"
                        />
                    </div>
                    <div v-if="selectedusersType.value !== 'Individual'" class="flex flex-col w-[100%] md:w-[48%] lg:w-[24%] mb-[18px]">
                        <label class="text-[13px] font-medium mb-[5px]"
                            >Company Type
                            <span class="text-[#FF5A3A]">*</span>
                        </label>
                        <BaseDropdown
                            @listenDropdownChange="(val) => (companyusersType = val)"
                            :filter="false"
                            :options="companyTypes"
                            placeholder="Sole Proprietorship"
                            class="w-full rounded-[6px] h-[40px] bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] dark:border-[#4f4f50]"
                        />
                    </div>
                    <div class="flex flex-col w-[100%] md:w-[48%] lg:w-[24%] mb-[18px]">
                        <!-- <label class="text-[13px] font-medium mb-[5px]"
                            >Contact Person
                            <span class="text-[#FF5A3A]">*</span>
                        </label>
                        <input v-if="contactPerson !== '-'" v-model.trim="contactPerson" @input="validateInput(contactPerson)" type="text" class="border-[1px] dark:border-[#383b40] dark:bg-[#3d3d3d] px-[16px] py-[12px] rounded-[6px] h-[40px]" /> -->
                        <BaseInput v-model="contactPerson" label="Contact Person" inputType="text" isImportantInput="true" twClasses="border-[1px] dark:border-[#383b40] dark:bg-[#3d3d3d] px-[16px] py-[12px] rounded-[6px] h-[40px]" />
                        <!-- <span v-else>--</span>
                        <span v-if="!contactPerson && isDirty" class="text-red-500">This value is required.</span> -->
                    </div>
                    <div v-if="selectedusersType.value !== 'Individual'" class="companyhide flex flex-col w-[100%] md:w-[48%] lg:w-[24%] mb-[18px]">
                        <!-- <label class="text-[13px] font-medium mb-[5px]"
                            >Company Name
                            <span class="text-[#FF5A3A]">*</span>
                        </label>
                        <input v-model.trim="companyName" @input="validateInput(companyName)" type="text" class="border-[1px] dark:border-[#383b40] dark:bg-[#3d3d3d] px-[16px] py-[12px] rounded-[6px] h-[40px]" placeholder="Enter Name" />
                        <span v-if="!companyName && isDirty" class="text-red-500">This value is required.</span> -->
                        <BaseInput v-model="companyName" label="Company Name" inputType="text" :isImportantInput="true" twClasses="border-[1px] dark:border-[#383b40] dark:bg-[#3d3d3d] px-[16px] py-[12px] rounded-[6px] h-[40px]" />
                    </div>
                    <div class="flex flex-col w-[100%] md:w-[48%] lg:w-[24%] mb-[18px]">
                        <!-- <label class="text-[13px] font-medium mb-[5px]">GST No. (Optional)</label>
                        <input v-model.trim="gstNo" type="text" class="border-[1px] dark:border-[#4D4D4D] dark:bg-[#4D4D4D] px-[16px] py-[12px] rounded-[6px] h-[40px]" placeholder="Enter 15 alphanumeric" /> -->
                        <BaseInput v-model="gstNo" label="GST No. (Optional)" inputType="text" :isImportantInput="false" twClasses="border-[1px] dark:border-[#383b40] dark:bg-[#3d3d3d] px-[16px] py-[12px] rounded-[6px] h-[40px]" />
                    </div>
                </div>
                <div>
                    <span class="text-[13px]">Uploaded Documents</span>
                    <div class="flex flex-col md:flex-row gap-[16px]">
                        <div class="bg-[#f3f4f6] dark:bg-[#4d4d4d] rounded-[8px] w-[100%] lg:w-[450px] mt-[16px]">
                            <div class="docPan px-[16px] py-[24px] md:pb-[40px] lg:pl-[33px]">
                                <div class="flex justify-between">
                                    <span class="text-[13px] font-bold">Pan Card</span>
                                    <span v-show="showstatusUpdate" :class="getStatusColor(selectedCity.code)" class="w-[90px] text-[13px] font-medium h-[30px] px-[20px] py-[5px] rounded-full">{{ selectedCity.value }}</span>
                                </div>
                                <div class="flex flex-col my-[22px]">
                                    <!-- <label class="text-[13px] mb-[5px] font-bold"
                                        >Pan number
                                        <span class="text-[#FF5A3A]">*</span>
                                    </label>
                                    <input
                                        v-model.trim="panNumber"
                                        @input="validatePanNumber"
                                        type="text"
                                        class="border-[1px] border-[#D1D5DB] dark:border-[#383b40] dark:bg-[#3d3d3d] px-[16px] py-[12px] rounded-[6px] h-[40px]"
                                        placeholder="Enter PAN Number"
                                    /> -->
                                    <!-- <span v-if="isRequireds && isDirty" class="text-red-500">This value is required.</span>
                                    <span v-if="panNumber.trim().length > 0 && isInvalidLengths" class="text-red-500">This value length is invalid. It should be 10 characters.</span>
                                    <span v-if="hasNumbersOrSpecialChars" class="text-red-500">Special characters are not allowed.</span> -->
                                    <BaseInput
                                        v-model="panNumber"
                                        label="Pan Number"
                                        placeholder="Enter Pan Number"
                                        inputType="text"
                                        :isImportantInput="true"
                                        twClasses="!border-[1px] !border-[#D1D5DB] !dark:border-[#383b40] !dark:bg-[#3d3d3d] !px-[16px] !py-[12px] !rounded-[6px] !h-[40px]"
                                    />
                                </div>
                                <div class="flex flex-col mb-[22px]">
                                    <!-- <label class="text-[13px] mb-[5px] font-bold"
                                        >Name
                                        <span class="text-[#FF5A3A]">*</span>
                                    </label>
                                    <input
                                        v-model.trim="nameOnPan"
                                        @input="validateInput()"
                                        type="text"
                                        class="border-[1px] border-[#D1D5DB] dark:border-[#383b40] dark:bg-[#3d3d3d] px-[16px] py-[12px] rounded-[6px] h-[40px]"
                                        placeholder="Enter Name on Documents"
                                    />
                                    <span v-if="!nameOnPan && isDirty" class="text-red-500">This value is required.</span> -->
                                    <BaseInput
                                        v-model="nameOnPan"
                                        label="Name"
                                        placeholder="Enter Name on Documents"
                                        inputType="text"
                                        :isImportantInput="true"
                                        twClasses="!border-[1px] !border-[#D1D5DB] !dark:border-[#383b40] !dark:bg-[#3d3d3d] !px-[16px] !py-[12px] !rounded-[6px] !h-[40px]"
                                    />
                                </div>
                                <div class="flex flex-col mb-[32px]">
                                    <label class="text-[13px] mb-[5px] font-medium"
                                        >DOB
                                        <span class="text-[#FF5A3A]">*</span>
                                    </label>
                                    <Calendar v-model="dob" showIcon iconDisplay="input" inputId="icondisplay" />
                                    <span v-if="!dob && v$?.dob?.$dirty" class="text-red-500">This value is required.</span>
                                </div>
                                <div class="flex gap-[16px]">
                                    <span>Photo (JPEG or PNG) </span>
                                    <accountKycModal></accountKycModal>
                                </div>
                                <BaseSingleFileUpload :isRejected="isRejected" :viewdocsVisible="true" :modalsVisible="true" />
                            </div>
                            <div class="flex flex-col bg-[#e5e7eb] dark:bg-[#212121] px-[32px] py-[8px] rounded-bl-[8px] rounded-br-[8px]">
                                <div class="flex justify-between status-box" id="status-one">
                                    <span class="py-[8px]">Status</span>
                                    <BaseDropdown
                                        @listenDropdownChange="(val) => (selectedCity = val)"
                                        :filter="false"
                                        :options="panStatus"
                                        placeholder="Pending"
                                        class="w-full rounded-[6px] h-[40px] bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] dark:border-[#4f4f50]"
                                    />
                                </div>
                                <div class="flex flex-col">
                                    <div class="flex flex-col w-[100%] mb-[18px]" v-if="selectedCity.value === 'Rejected'">
                                        <label class="text-[13px] font-bold mb-[5px]">Reject Remark</label>
                                        <input type="text" v-model="rejectRemark" class="border-[1px] border-[#D1D5DB] dark:border-[#383b40] dark:bg-[#3d3d3d] px-[16px] py-[12px] rounded-[6px] h-[40px]" placeholder="Remark" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-[100%] lg:w-[450px] lg:h-[448px] mt-[16px]">
                            <div class="bg-[#f3f4f6] dark:bg-[#4d4d4d] rounded-tl-[8px] rounded-tr-[8px] px-[16px] py-[24px] md:pt-[32px] lg:pr-[40px] md:pb-[40px] lg:pl-[56px]">
                                <div class="flex flex-col md:flex-row justify-between">
                                    <div class="flex flex-col w-[100%] md:w-[66%] mb-[18px]">
                                        <BaseDropdown
                                            @listenDropdownChange="(val) => (userDocuments = val)"
                                            :filter="false"
                                            :options="filteredDocs"
                                            :placeholder="getPlaceholder()"
                                            class="w-full rounded-[6px] h-[40px] bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] dark:border-[#4f4f50]"
                                        />
                                    </div>
                                    <span v-show="showviewDocument" :class="getStatusColor(selectedCities.code)" class="w-[90px] text-[13px] font-medium h-[30px] px-[20px] py-[5px] rounded-full">{{ selectedCities.value }}</span>
                                </div>
                                <div class="flex flex-col my-[22px]">
                                    <!-- <label class="text-[13px] mb-[5px] font-bold"
                                        >Number
                                        <span class="text-[#FF5A3A]">*</span>
                                    </label>
                                    <input
                                        v-model.trim="aadharNumber"
                                        @input="validateAadharNumber"
                                        type="text"
                                        class="border-[1px] border-[#D1D5DB] dark:border-[#383b40] dark:bg-[#3d3d3d] px-[16px] py-[12px] rounded-[6px] h-[40px]"
                                        placeholder="Enter Document Number"
                                    /> -->
                                    <!-- <span v-if="isRequired && isDirty" class="text-red-500">This value is required.</span>
                                    <span v-if="isInvalidLength" class="text-red-500">This value length is invalid. It should be between 12 and 16 characters long.</span> -->
                                    <BaseInput
                                        v-model="aadharNumber"
                                        label="Aadhar Number"
                                        placeholder="Enter Document Number"
                                        inputType="text"
                                        :isImportantInput="true"
                                        twClasses="!border-[1px] !border-[#D1D5DB] !dark:border-[#383b40] !dark:bg-[#3d3d3d] !px-[16px] !py-[12px] !rounded-[6px] !h-[40px]"
                                    />
                                </div>
                                <div class="flex flex-col mb-[22px]">
                                    <!-- <label class="text-[13px] mb-[5px] font-bold"
                                        >Name
                                        <span class="text-[#FF5A3A]">*</span>
                                    </label>
                                    <input
                                        v-model.trim="nameOnAadhar"
                                        @input="validateInput(nameOnAadhar)"
                                        type="text"
                                        class="border-[1px] border-[#D1D5DB] dark:border-[#383b40] dark:bg-[#3d3d3d] px-[16px] py-[12px] rounded-[6px] h-[40px]"
                                        placeholder="Enter Name on Documents"
                                    />
                                    <span v-if="!nameOnAadhar && isDirty" class="text-red-500">This value is required.</span>
                                    <span v-if="hasNumbersOrSpecialChars" class="text-red-500">Numbers and special characters are not allowed.</span> -->
                                    <BaseInput
                                        v-model="nameOnAadhar"
                                        label="Name"
                                        placeholder="Enter Name on Documents"
                                        inputType="text"
                                        :isImportantInput="true"
                                        twClasses="!border-[1px] !border-[#D1D5DB] !dark:border-[#383b40] !dark:bg-[#3d3d3d] !px-[16px] !py-[12px] !rounded-[6px] !h-[40px]"
                                    />
                                </div>
                                <div class="flex gap-[16px]">
                                    <BaseSingleFileUpload :isRejected="isRejecteds" :imageName="'Front Image'" :viewdocsVisible="true" :modalsVisible="true" />
                                    <BaseSingleFileUpload :isRejected="isRejecteds" :imageName="'Back Image'" :viewdocsVisible="true" :modalsVisible="true" />
                                </div>
                            </div>
                            <div class="flex flex-col bg-[#e5e7eb] dark:bg-[#212121] rounded-bl-[8px] rounded-br-[8px] px-[32px] py-[8px]">
                                <div class="flex justify-between status-box">
                                    <span class="py-[8px]">Status</span>
                                    <BaseDropdown
                                        @listenDropdownChange="(val) => (selectedCities = val)"
                                        :filter="false"
                                        :options="docStatus"
                                        placeholder="Pending"
                                        class="w-full rounded-[6px] h-[40px] bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] dark:border-[#4f4f50]"
                                    />
                                </div>
                                <div class="flex flex-col">
                                    <div class="flex flex-col w-[100%] mb-[18px]" v-if="selectedCities.value === 'Rejected'">
                                        <label class="text-[13px] font-bold mb-[5px]">Reject Remark</label>
                                        <input v-model="rejectRemarkOne" type="text" class="border-[1px] border-[#D1D5DB] dark:border-[#383b40] dark:bg-[#3d3d3d] px-[16px] py-[12px] rounded-[6px] h-[40px]" placeholder="Remark" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <BaseSubmitButton @click="submitForm" :isLoading="buttonLoading" class="kyc-submit-btn px-[30px] py-[12px] mt-[40px] mb-[12px] text-[#fff] bg-[#0052cc] rounded-[50px]" text="Submit" />
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
@import '../account-kyc/accountKyc.scss';
</style>
