<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import ItlPageHeader from '../../components/itl-page-header/itlpageheader.vue';
import insurance from '../../assets/images/insurance.svg';
import { fetchInsurance, activateInsuranceApi } from '../../api/insurance/insuranceApi';
import config from '../../util/config';
import BaseSubmitButton from '../../components/base/BaseSubmitButton.vue';
import BaseCheckBox from '../../components/base/BaseCheckBox.vue';

// Store Dark mode
import { useStore } from 'vuex';
import { DARKMODE } from '../../store/dark-mode/constants';
const store = useStore();
const toast = useToast();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
let all_final_itl_add_ons_data_array = ref(JSON.parse(localStorage.getItem('all_final_itl_add_ons_data_array')));

// Store Dark mode end here

const tncCheckbox = ref(false);
const checkboxData = ref({
    id: 1,
    value: '',
    is_checked: tncCheckbox,
});
const insuranceStatus = ref('');
const isLoading1 = ref(false);
const isLoading2 = ref(false);

onBeforeMount(() => {
    let isInsurancePresent = all_final_itl_add_ons_data_array.value.find((el) => el.title == 'Insurance');
    if (!isInsurancePresent) {
        window.location.href = config.baseUrlPanel;
    }
});

onMounted(() => {
    fetchInsuranceStatus();
});

const activateInsurance = async () => {
    isLoading1.value = true;
    isLoading2.value = true;
    const res = await activateInsuranceApi({
        insurance_terms: tncCheckbox.value ? '1' : '0',
    });
    if (res.status == 'success') {
        toast.add({ severity: 'success', summary: 'Success', detail: res.html_message, life: 3000 });
        fetchInsuranceStatus();
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: res.html_message, life: 3000 });
    }
    isLoading1.value = false;
    isLoading2.value = false;
};

const fetchInsuranceStatus = async () => {
    const res = await fetchInsurance();

    if (res.status == 'success') {
        insuranceStatus.value = res.is_activate_insurance;
        if (res.is_activate_insurance == '1') {
            tncCheckbox.value = true;
        }
    }
};
</script>

<template>
    <div class="insurance flex flex-column items-start md:items-center justify-start md:justify-center">
        <ItlPageHeader :Image="insurance" Heading="Insurance" SubHeading="Insurance that cares about your parcles"> </ItlPageHeader>
        <div class="insurance-business flex flex-column-reverse sm:flex-column-reverse md:flex-row md:justify-content-between lg:flex-row">
            <div class="section2-card flex flex-column lg:flex-column">
                <h2 class="heading">Your Business, Our Priority</h2>
                <p class="business-content">
                    Your Parcels, our protection – because your success matters!
                    <span class="content-light">Coverage That Cares for You and Your Shipment</span>
                </p>
                <div class="termscondition flex">
                    <BaseCheckBox :data="checkboxData" class="mr-[-10px]" />
                    <span class="tnc-text">
                        I have read and agreed to the <a :href="config.baseUrlPanel + 'insurance-terms-and-policy'" target="_blank"><span class="tandc">Terms & Conditions</span></a></span
                    >
                </div>
                <div>
                    <BaseSubmitButton
                        @click="activateInsurance()"
                        twClasses="activate-btn activate-insurance !h-11"
                        :class="insuranceStatus == '1' ? 'disabled-btn' : ''"
                        :isLoading="isLoading1"
                        :text="insuranceStatus == '1' ? 'Activated' : 'Activate Now'"
                    />
                </div>
                <p class="note">Note : <span>Premium amount will be charged from your wallet</span></p>
            </div>
            <div class="insurance-package">
                <img src="../../assets/images/insurance-business.svg" alt="insurance business" />
                <!-- <img  v-if="!darkModeVal" src="../../assets/images/insurance-business.svg" alt="insurance business" />
                <img v-else src="../../assets/images/dark-mode/dark-insurance-business.svg" alt="insurance business" /> -->
            </div>
        </div>
        <div class="section3-card flex flex-column">
            <div class="section3-card-title">A policy that cares about you</div>
            <div class="section3-card-content flex flex-column md:flex-row lg:flex-row">
                <div class="section3-subcard">
                    <div class="section3-subcard-title">
                        <span>Journey Safeguard</span>
                        <!-- <img :src="insuranceSafeguard" /> -->
                        <img v-if="!darkModeVal" src="../../assets/images/insurance-safeguard.svg" alt="insurance business" />
                        <img v-else src="../../assets/images/dark-mode/dark-insurance-safeguard.svg" alt="insurance business" />
                    </div>
                    <div class="section3-subcard-content">Protection kicks in from dispatch and extends until the customer's delivery point.</div>
                </div>
                <div class="section3-subcard">
                    <div class="section3-subcard-title">
                        <span class="loss-damage">Loss and <span>Damage Protection</span></span>
                        <!-- <img class="insuranceprotection" :src="insuranceProtection" /> -->
                        <img class="insuranceprotection" v-if="!darkModeVal" src="../../assets/images/insurance-protection.svg" alt="insurance business" />
                        <img class="insuranceprotection" v-else src="../../assets/images/dark-mode/dark-insurance-protection.svg" alt="insurance business" />
                    </div>
                    <div class="section3-subcard-content">Our coverage shields you from financial loss caused by items lost or damaged during transit within India.</div>
                </div>
                <div class="section3-subcard">
                    <div class="section3-subcard-title">
                        <span>Claim with Ease</span>
                        <!-- <img :src="insuranceClaim" /> -->
                        <img v-if="!darkModeVal" src="../../assets/images/insurance-claim.svg" alt="insurance business" />
                        <img v-else src="../../assets/images/dark-mode/dark-insurance-claim.svg" alt="insurance business" />
                    </div>
                    <div class="section3-subcard-content">In case of an issue, follow our simple documentation process for quick claim resolution.</div>
                </div>
            </div>
            <div class="parcels-secure flex flex-column justify-content-center align-items-center lg:justify-content-center lg:align-items-center">
                <p><span>Protect your </span>parcels, secure your success!</p>
            </div>
        </div>
    </div>

    <ToastView />
</template>

<style lang="scss">
@import './insuranceChannelpartner.scss';
</style>
