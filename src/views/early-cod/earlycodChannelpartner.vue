<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import config from '../../util/config';
import ItlPageHeader from '../../components/itl-page-header/itlpageheader.vue';
import HeaderImage from '../../assets/images/early-cod-logo.svg';
import { getDefaultData, updateRemittancePlan } from '../../api/early-cod/earlyCodApi';
import BaseCheckBox from '../../components/base/BaseCheckBox.vue';
import BaseSubmitButton from '../../components/base/BaseSubmitButton.vue';

const toast = useToast();

// const topHeader = ref(ref(JSON.parse(localStorage.getItem('top_header'))));

const tncCheckbox = ref(false);
const earlyCodCheckBoxData = ref({ id: 1, value: '', is_checked: tncCheckbox });
const isLoading1 = ref(false);
const isLoading2 = ref(false);
const isLoading3 = ref(false);
const remPlanType1 = ref('Deactivate');
const remPlanType2 = ref('Deactivate');
const remPlanType3 = ref('Deactivate');

const cards = ref([
    {
        id: '1',
        value: '',
        percentage: '',
    },
    {
        id: '2',
        value: '',
        percentage: '',
    },
    {
        id: '3',
        value: '',
        percentage: '',
    },
]);

onMounted(async () => {
    const res = await getDefaultData();
    if (res.status == 'success') {
        applyValues(res);
    }
});

const activatePlan = async (rem_active_plan_id, rem_plan_type) => {
    activateSpecificLoader(rem_active_plan_id);
    const res = await updateRemittancePlan({
        rem_active_plan_id: rem_active_plan_id,
        rem_plan_type: rem_plan_type,
        terms_condition_status: tncCheckbox.value ? '1' : '0',
    });
    if (res.status == 'success') {
        const res1 = await getDefaultData();
        if (res1.status == 'success') applyValues(res1);
        toast.add({ severity: 'success', summary: 'Success', detail: res.html_message, life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: res.html_message, life: 3000 });
    }
    deActivateSpecificLoader(rem_active_plan_id);
};

const applyValues = (res) => {
    cards.value.forEach((el, i) => {
        cards.value[i].value = res[`plan${i + 1}_button_type`];
        cards.value[i].percentage = res.all_cod_user_data_array[0][`rem_plan${i + 1}_percentage`];
    });
    remPlanType1.value = res['plan1_button_type'];
    remPlanType2.value = res['plan2_button_type'];
    remPlanType3.value = res['plan3_button_type'];
};

const activateSpecificLoader = (loaderType) => {
    if (loaderType == 1) {
        isLoading1.value = true;
    } else if (loaderType == 2) {
        isLoading2.value = true;
    } else {
        isLoading3.value = true;
    }
};

const deActivateSpecificLoader = (loaderType) => {
    if (loaderType == 1) {
        isLoading1.value = false;
    } else if (loaderType == 2) {
        isLoading2.value = false;
    } else {
        isLoading3.value = false;
    }
};
</script>
<template>
    <div class="early-cod flex flex-column items-start md:items-center justify-start md:justify-center">
        <ItlPageHeader :Image="HeaderImage" Heading="Early COD" SubHeading="Activate your daily COD remittance by selecting your preferred plan from the options below!" />
        <div class="our-plans">
            <div class="our-plans-container">
                <h2>Our Plans:</h2>
                <!-- {{ cards }} - {{ remPlanType1 }} - {{ remPlanType2 }} -->
                <div class="days-boxes flex flex-column lg:justify-content-between">
                    <div class="box-container flex flex-column lg:flex-row md:flex-row sm:flex-column">
                        <div class="day-box" :class="[cards[0].value == 'Deactivate' ? 'active' : '']">
                            <img src="../../assets/images/cod-rupees-blue.svg" alt="cod-rupees" />
                            <span class="deliver">Delivered in</span>
                            <h3>1 Day</h3>
                            <span class="charges">Charges</span>
                            <h5>{{ cards[0].percentage }}% of COD Amt.</h5>
                            <span class="gst">(GST Exclusive)</span>
                            <BaseSubmitButton
                                @click="activatePlan(1, remPlanType1)"
                                :text="cards[0].value == 'Deactivate' ? 'Deactivate' : 'Activate'"
                                :isLoading="isLoading1"
                                :twClasses="[cards[0].value == 'Deactivate' ? 'deactivate' : '']"
                                class="!h-11"
                            />
                        </div>
                        <div class="day-box" :class="[cards[1].value == 'Deactivate' ? 'active' : '']">
                            <img src="../../assets/images/cod-rupees-sky.svg" alt="cod-rupees" />
                            <span class="deliver">Delivered in</span>
                            <h3>2 Days</h3>
                            <span class="charges">Charges</span>
                            <h5>{{ cards[1].percentage }}% of COD Amt.</h5>
                            <span class="gst">(GST Exclusive)</span>
                            <BaseSubmitButton
                                @click="activatePlan(2, remPlanType2)"
                                :text="cards[1].value == 'Deactivate' ? 'Deactivate' : 'Activate'"
                                :isLoading="isLoading2"
                                :twClasses="[cards[1].value == 'Deactivate' ? 'deactivate' : '']"
                                class="!h-11"
                            />
                        </div>
                        <div class="day-box" :class="[cards[2].value == 'Deactivate' ? 'active' : '']">
                            <img src="../../assets/images/cod-rupees-golden.svg" alt="cod-rupees" />
                            <span class="deliver">Delivered in</span>
                            <h3>3 Days</h3>
                            <span class="charges">Charges</span>
                            <h5>{{ cards[2].percentage }}% of COD Amt.</h5>
                            <span class="gst">(GST Exclusive)</span>
                            <BaseSubmitButton
                                @click="activatePlan(3, remPlanType3)"
                                :text="cards[2].value == 'Deactivate' ? 'Deactivate' : 'Activate'"
                                :isLoading="isLoading3"
                                :twClasses="[cards[2].value == 'Deactivate' ? 'deactivate' : '']"
                                class="!h-11"
                            />
                        </div>
                    </div>
                    <p>To activate your early COD plan, kindly agree to our terms and conditions, given below.</p>
                    <div class="termscondition flex">
                        <BaseCheckBox :data="earlyCodCheckBoxData" />
                        <span class="tnc-text">
                            I have read and agreed to the <a :href="config.baseUrlPanel + 'terms-and-condition'" target="_blank"><span class="tandc">Terms & Conditions</span></a></span
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="benefits">
            <div class="benefits-container">
                <h2>Benefits:</h2>
                <ul>
                    <li>
                        <img src="../../assets/images/cod-green-check.svg" class="greencheck" alt="green check" />
                        <span>Faster process and best-in-industry plans to help you grow your eCommerce business.</span>
                    </li>
                    <li>
                        <img src="../../assets/images/cod-green-check.svg" alt="green check" />
                        <span>Assured COD remittance within 1 to 3 days of delivery.</span>
                    </li>
                    <li>
                        <img src="../../assets/images/cod-green-check.svg" class="greencheck" alt="green check" />
                        <span>The remittance happens within average X days of delivery based on your current activated plan.</span>
                    </li>
                    <li>
                        <img src="../../assets/images/cod-green-check.svg" alt="green check" />
                        <span>Improved business cash cycle with unrestricted cash flow.</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <ToastView />
</template>

<style lang="scss">
@import './earlycodChannelpartner.scss';
</style>
