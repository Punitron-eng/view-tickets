<script setup>
import { ref } from 'vue';
import getImg from '@/util/getImg';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseDropDown from '@/components/base/BaseDropDown.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';
import BaseFileUpload from '@/components/base/BaseFileUpload.vue';
import SingleDatePicker from '@/components/itl-common-features/itl-date-range-picker/SingleDatePicker.vue';
import * as Validation from '@/util/commonValidations';

const tempOptions = [
    { id: 1, value: 'Mumbai' },
    { id: 2, value: 'Pune' },
    { id: 3, value: 'Bangalore' },
    { id: 4, value: 'Chennai' },
    { id: 5, value: 'Hyderabad' },
    { id: 6, value: 'Kochi' },
    { id: 7, value: 'Nagpur' },
    { id: 8, value: 'Visakhapatnam' },
    { id: 9, value: 'Ahmedabad' },
    { id: 10, value: 'Surat' },
];
const tempCheckboxOptions = { id: 1, value: 'I have a Proof', is_checked: false };
const phoneNumber = ref('');
const pincode = ref('');
const date = ref();
const validationResults = ref({
    phoneNumber: '',
    pincode: ''
});

const validateCheck = (validationType) => {
    switch (validationType) {
        case 'ispincode':
            if (!pincode.value) {
                validationResults.value.pincode = '';
            } else {
                validationResults.value.pincode = Validation.isValidIndianPinCode(pincode.value) ? 'Valid' : 'Invalid Pincode';
            }
            break;
        case 'phoneNumber':
            if (!phoneNumber.value) {
                validationResults.value.phoneNumber = '';
            } else {
                validationResults.value.phoneNumber = Validation.checkMobileNumber(phoneNumber.value) ? 'Valid' : 'Invalid Phone Number';
            }
            break;
        default:
            validationResults.value[validationType] = '';
    }
};
</script>

<template>
    <div
        class="max-w-[560px] w-full flex gap-[16px] md:gap-[24px] flex-col text-[13px] font-interRegular text-light-800">
        <div>
            <label>Reattempt Date</label>
            <SingleDatePicker v-model="date" class="w-full mt-[4px]" />
        </div>
        <div class="flex justify-between flex-col md:flex-row gap-[16px] md:gap-0">
            <div class="flex flex-col md:max-w-[272px] w-full">
                <label class='mb-[4px]'>Phone no.</label>
                <BaseInput type="text" placeholder="Enter your Phone no." v-model="phoneNumber"
                    @input="validateCheck('phoneNumber')" />
                <div v-if="validationResults.phoneNumber !== '' && validationResults.phoneNumber !== 'Valid'"
                    class="text-itl-error dark:text-error-dark">
                    {{ validationResults.phoneNumber }}
                </div>
            </div>
            <div class="flex flex-col md:max-w-[272px] w-full">
                <label class='mb-[4px]'>Pincode</label>
                <BaseInput type="text" placeholder="Enter your Pincode" v-model="pincode"
                    @input="validateCheck('ispincode')" />
                <div v-if="validationResults.pincode !== '' && validationResults.pincode !== 'Valid'"
                    class="text-itl-error dark:text-error-dark">
                    {{ validationResults.pincode }}
                </div>
            </div>
        </div>
        <div class="flex flex-col  w-full">
            <label class='mb-[4px]'>Address</label>
            <BaseInput type="text" placeholder="Enter your Remark" />
        </div>
        <div class="flex justify-between flex-col md:flex-row gap-[16px] md:gap-0">
            <div class="flex flex-col md:max-w-[272px] w-full">
                <label class='mb-[4px]'>State</label>
                <BaseDropDown placeholder="Select your state" :options="tempOptions" twClasses="w-full" />
            </div>
            <div class="flex flex-col md:max-w-[272px] w-full">
                <label class='mb-[4px]'>City</label>
                <BaseDropDown placeholder="Select your city" :options="tempOptions" twClasses="w-full" />
            </div>
        </div>
        <div class="flex flex-col md:max-w-[272px] w-full">
            <label class='mb-[4px]'>Address Type</label>
            <BaseDropDown placeholder="Select your Address Type" :options="tempOptions" twClasses="w-full" />
            <BaseCheckbox :data="tempCheckboxOptions" class="mt-[8px]" />
        </div>
        <div>
            <span class="flex items-center pb-[8px]">
                <img :src="getImg('modal-gallery', false, 'modals')" class="w-[16px] h-[16px] mr-[8px]" />
                Chat Screenshot
            </span>
            <BaseFileUpload fileID="file-upload" fileType="Image" :maxFileSize="1" defaultValueName="Upload an Image"
                :allowedExtensions="['jpg', 'png']" @listenFileUploadChange="handleFileChange"
                @clearFile="handleClearFile"
                twClasses="w-full h-44 rounded-xl border-2 dark:border-[#5d5d5d] border-dashed" />
        </div>
        <div>
            <span class="flex items-center pb-[8px]">
                <img :src="getImg('modal-call-recording', false, 'modals')" class="w-[16px] h-[16px] mr-[8px]" />
                Call Recording
            </span>
            <BaseFileUpload fileID="call-recording-file-upload" fileType="*" :maxFileSize="1"
                defaultValueName="Upload an Audio File" :allowedExtensions="['wav', 'mp3', 'mp4']"
                @listenFileUploadChange="handleFileChange" @clearFile="handleClearFile"
                twClasses="w-full h-44 rounded-xl border-2 dark:border-[#5d5d5d] border-dashed" />
        </div>
    </div>
</template>
<style lang="scss">
.escalate-modal {

    .dp__clear_icon {
        display: none !important;
    }
}
</style>
