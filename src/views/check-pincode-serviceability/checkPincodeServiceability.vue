<script setup lang="ts">
import { reactive, ref, watchEffect, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import DynamicDropdown from '../../components/resuable-component/DynamicDropdown.vue';
import CheckPincodeCart from './CheckPincodeCart.vue';
import { PINCODE } from '../../store/checkPincode/constants';
import { DARKMODE } from '../../store/dark-mode/constants';
import BaseSubmitButton from '../../components/base/BaseSubmitButton.vue';
import BaseInput from '../../components/base/BaseInput.vue';

const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
import data from './data.json';

const logisticDetails = ref('');
const showCheckPincodeCart = ref(false);
const isFormSubmitted = ref(false);
const isLoading = ref(false);
const skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const getImg = (imageName) => {
    return new URL(`../../assets/images/${imageName}.svg`, import.meta.url).href;
};

const state = reactive({
    pincode: '',
    checkPincode: '',
});

const validationErrorMessage = reactive({
    pincode: '',
    checkPincode: '',
});

const validatePincode = () => {
    let isValid = true;
    if (!state.pincode || state.pincode.trim() === '') {
        validationErrorMessage.pincode = 'This value is required.';
        isValid = false;
    } else if (!/^\d{6}$/.test(state.pincode)) {
        validationErrorMessage.pincode = 'Kindly enter a valid pincode of 6 digits only.';
        isValid = false;
    } else {
        validationErrorMessage.pincode = '';
    }

    if (!state.checkPincode || state.checkPincode.trim() === '') {
        validationErrorMessage.checkPincode = 'This value is required.';
        isValid = false;
    } else if (!/^\d{6}$/.test(state.checkPincode)) {
        validationErrorMessage.checkPincode = 'Kindly enter a valid pincode of 6 digits only.';
        isValid = false;
    } else {
        validationErrorMessage.checkPincode = '';
    }

    return isValid;
};

// Automatically re-validate when pin codes change
watchEffect(() => {
    validatePincode();
});

const getPincodeData = async () => {
    if (validatePincode()) {
        isLoading.value = true;
        const payload = {
            yourPincode: state.pincode,
            checkPincode: state.checkPincode,
        };
        try {
            console.log(PINCODE.NAME, 'pincode');

            await store.dispatch(`${PINCODE.NAME}/getPincodeDetails`, payload);
            logisticDetails.value = store.getters[`${PINCODE.NAME}/sendPincodeDetails`];
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
            isFormSubmitted.value = true;
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            isLoading.value = false;
        }
    }
};
onMounted(() => {
    // getPincodeData();
});
</script>

<template>
    <div class="check-pin-outer">
        <form autocomplete="off">
            <div class="header">
                <div class="header__heading">Check Pincode Serviceability</div>
                <DynamicDropdown />
            </div>
            <!-- card stars -->
            <div class="panel panel--deafult1 bg-white dark:!bg-[#313131]">
                <div class="panel--deafult">
                    <div class="pincodecard">
                        <div class="pincodecard--section" :class="{ 'has-error': validationErrorMessage.pincode }">
                            <label for="pincode">Your Pincode <span>*</span></label>
                            <BaseInput placeholder="Enter Your Pincode" v-model.trim="state.pincode" id="pincode" maxLength="6" />
                            <div v-if="validationErrorMessage.pincode">
                                <div class="input-errors">
                                    <div class="error-msg">{{ validationErrorMessage.pincode }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="pincodecard--section" id="carddivimg">
                            <img v-if="!darkModeVal" :src="getImg('checkpincode-arrow-circle-left')" />
                            <img v-else src="../../assets/images/dark-mode/dark-arrow-circle-left.svg" alt="map" />
                        </div>
                        <div class="pincodecard--section" :class="{ 'has-error': validationErrorMessage.checkPincode }">
                            <label for="pincode"> To Pincode <span>*</span></label>
                            <BaseInput placeholder="Enter Pincode to Check" v-model.trim="state.checkPincode" id="checkPincode" maxLength="6" />
                            <div v-if="validationErrorMessage.checkPincode">
                                <div class="input-errors">
                                    <div class="error-msg">{{ validationErrorMessage.checkPincode }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="button-submit">
                        <BaseSubmitButton @click.prevent="getPincodeData()" twClasses="w-44" text="Submit" :isLoading="isLoading" />
                    </div>
                </div>

                <div class="second" id="carddivimg2">
                    <img src="../../assets/images/checkpincode_services_gfx.svg" alt="map" />
                </div>
            </div>
        </form>

        <!-- after button click start -->
        <div v-if="isFormSubmitted" class="servicable">
            <div class="servicable-city">
                <span class="Serviceable-Spancity">Serviceable City:</span>
                <span class="serviceability-value">{{ data.loop_itl_city_name }}</span>
            </div>
            <div class="servicable-city">
                <span class="Serviceable-Spancity">Serviceable State:</span>
                <span class="serviceability-value">{{ data.loop_itl_state_name }}</span>
            </div>
        </div>
        <!-- after button click end -->

        <!-- Actual content for para-output div -->
        <div class="para-output">
            <div v-if="isLoading" class="cardparent-child flex flex-wrap gap-5">
                <div v-for="n in skeletonItems" :key="n" class="checkCard skeleton w-[22%] bg-white p-3 rounded-[12px]">
                    <div class="flex items-center gap-2 mb-[10px]">
                        <SkeletonView shape="circle" size="17px" height="17px" />
                        <SkeletonView width="55px" height="7px" />
                    </div>
                    <div class="flex justify-between items-center mb-[10px]">
                        <SkeletonView width="9rem" height="7px" />
                        <SkeletonView shape="circle" size="17px" height="17px" class="mb-1" />
                    </div>
                    <div class="flex justify-between items-center mb-[10px]">
                        <SkeletonView width="9rem" height="7px" />
                        <SkeletonView shape="circle" size="17px" height="17px" class="mb-1" />
                    </div>
                    <div class="flex justify-between items-center mb-[10px]">
                        <SkeletonView width="9rem" height="7px" />
                        <SkeletonView shape="circle" size="17px" height="17px" class="mb-1" />
                    </div>
                    <div class="flex justify-between items-center mb-[10px]">
                        <SkeletonView width="9rem" height="7px" />
                        <SkeletonView shape="circle" size="17px" height="17px" class="mb-1" />
                    </div>
                </div>
            </div>
            <div v-else-if="!showCheckPincodeCart">
                <CheckPincodeCart :tempData="data" />
            </div>
            <div v-else>
                <p>Enter pincodes to see available services.</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './checkPincodeServiceability.scss';
@import '../../assets/itl-common-css/common-css.scss';

.domestic-intl-section-outer {
    @include theme() {
        background-color: theme-get('check-input-background') !important;
        color: theme-get('check-value') !important;
    }
}

.domestic-intl-section-outer .p-dropdown .p-inputtext {
    @include theme() {
        color: theme-get('check-value') !important;
    }
}
</style>
