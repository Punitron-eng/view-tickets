<script setup>
import ItlPageHeader from '../../components/itl-page-header/ItlPageHeader.vue';
import HeaderImage from '../../assets/images/capital-union.svg';
import Section1Image from '../../assets/images/capital-image.webp';
import Section2Icon1 from '../../assets/images/capital-inventory.svg';
import Section2Icon2 from '../../assets/images/capital-marketing.svg';
import Section2Icon3 from '../../assets/images/capital-op.svg';
import Section3Icon1 from '../../assets/images/capital-puzzel.svg';
import Section3Icon2 from '../../assets/images/capital-terms-icons.svg';
import Section3Icon3 from '../../assets/images/capital-approval-icon.svg';
import BaseSubmitButton from '../../components/base/BaseSubmitButton.vue';

import config from '../../util/config';
import { useToast } from 'primevue/usetoast';
import { ref, onMounted, computed } from 'vue';
import { sendMail } from '../../api/rise/sendEmail.ts';
import { useStore } from 'vuex';
import { DARKMODE } from '../../store/dark-mode/constants';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const captialAmount = ref(JSON.parse(localStorage.getItem('top_header')));
const isInterested = ref('');

const buttonText = "I'm Interested!";
const isLoading = ref(false);
const configBase = config;
const buttonHide = ref(false);
const toast = useToast();
const sendEmail = async () => {
    isLoading.value = true;
    const Data = await sendMail();
    if (Data.status !== 'Error') {
        buttonHide.value = true;
        isLoading.value = false;
        toast.add({ severity: 'success', summary: 'Thank you for showing interest!', life: 1000 });
        localStorage.setItem('is_interested', 1);
        isInterested.value = localStorage.getItem('is_interested');
    } else {
        isLoading.value = false;
        toast.add({ severity: 'error', summary: 'Some Error Occured !!', life: 1000 });
    }
};
const checkCapitalAmount = (captialAmount) => {
    if (!captialAmount || captialAmount.capital_amount == null || captialAmount.capital_amount == undefined || captialAmount.capital_amount == '' || !captialAmount.capital_amount >= 1) {
        window.location.href = configBase.baseUrlPanel;
    }
};
onMounted(() => {
    checkCapitalAmount(JSON.parse(localStorage.getItem('top_header')));
    if (captialAmount.value.is_capital_interested == 0) {
        localStorage.setItem('is_interested', 0);
    } else {
        localStorage.setItem('is_interested', 1);
    }
    isInterested.value = localStorage.getItem('is_interested');
});
</script>

<template>
    <div class="main-container lg:flex lg:align-items-center flex-column">
        <div class="flex md:justify-content-center align-items-center container-header lg:gap-3">
            <!-- <div>
                <img :src="HeaderImage" class="container-image " />
       
            </div>
            <div class="container-header-title"><span>ITL</span>  Capital</div> -->
            <ItlPageHeader :Image="HeaderImage" Heading="Rise" SubHeading="Get funds for all your business needs when you need" />
        </div>
        <div>
            <div class="section1-card1 flex flex-column lg:flex-row">
                <div class="section1-left-content flex justify-content-center align-items-center flex-column">
                    <div class="section1-left-title">Your Funding Partner that helps you grow…</div>
                    <div class="section1-left-subtitle">
                        <span> Introducing iThink Logistics Rise:</span><br />
                        Your key to accelerated growth. Access the funds you need, hassle-free.
                    </div>
                    <div class="section1-button">
                        <ToastView />
                        <BaseSubmitButton
                            v-if="captialAmount.is_capital_interested == 0 && isInterested == 0"
                            :text="buttonText"
                            :isLoading="isLoading"
                            twClasses="section1-left-button"
                            @click="sendEmail"
                            :style="{ display: buttonHide ? 'none' : 'block' }"
                        />
                    </div>
                </div>
                <div class="section1-right-content flex justify-content-center align-items-center flex-column">
                    <div>
                        <img :src="Section1Image" class="section-1-image" />
                    </div>
                    <div class="section1-right-subtitle">Congrats! 🎉 Rise funding pre-approved up to ...</div>
                    <div class="section-1-text">
                        {{ config.selectedCurrencyIcon + captialAmount.capital_amount }}
                    </div>
                </div>
            </div>
            <div class="section2-card flex flex-column">
                <div class="section2-card-title">Why iThink Logistics Rise?</div>
                <div class="section2-card-content flex flex-column md:flex-row">
                    <div class="section2-subcard">
                        <img v-if="!darkModeVal" :src="Section2Icon1" />
                        <img v-else src="../../assets/images/dark-mode/dark-capital-inventory.svg" />
                        <div class="section2-subcard-title">Expand Inventory</div>
                        <div class="section2-subcard-content">More funds, more products, more smiles. iThink Logistics Rise fuels your brand journey.</div>
                    </div>
                    <div class="section2-subcard">
                        <img v-if="!darkModeVal" :src="Section2Icon2" />
                        <img v-else src="../../assets/images/dark-mode/dark-capital-marketing.svg" />
                        <div class="section2-subcard-title">Enhanced Marketing</div>
                        <div class="section2-subcard-content">Make your brand stand out. Let iThink Logistics Rise power your business growth.</div>
                    </div>
                    <div class="section2-subcard">
                        <img v-if="!darkModeVal" :src="Section2Icon3" />
                        <img v-else src="../../assets/images/dark-mode/dark-capital-op.svg" />
                        <div class="section2-subcard-title">Seize Opportunities</div>
                        <div class="section2-subcard-content">Don't just meet goals, exceed them! Use extra funds to explore new markets and launch exciting products.</div>
                    </div>
                </div>
            </div>
            <div class="section3-card flex flex-column">
                <div class="section3-card-title">What makes iThink Logistics Rise different?</div>
                <div class="section3-card-content flex gap-3 flex-column lg:flex-row">
                    <div class="section3-subcard">
                        <div class="section3-subcard-title">
                            <span>Tailored Solutions</span>
                            <img v-if="!darkModeVal" :src="Section3Icon1" />
                            <img v-else src="../../assets/images/dark-mode/dark-capital-puzzel.svg" />
                        </div>
                        <div class="section3-subcard-content">Your business, your plan. iThink Logistics Rise creates plans specific to your business.</div>
                    </div>
                    <div class="section3-subcard">
                        <div class="section3-subcard-title">
                            <span>Competitive terms</span>
                            <img v-if="!darkModeVal" :src="Section3Icon2" />
                            <img v-else src="../../assets/images/dark-mode/dark-capital-terms-icons.svg" />
                        </div>
                        <div class="section3-subcard-content">A partnership that feels right. Better rates, flexible plans —financing that understands your business.</div>
                    </div>
                    <div class="section3-subcard">
                        <div class="section3-subcard-title">
                            <span>Swift Approval</span>
                            <img v-if="!darkModeVal" :src="Section3Icon3" />
                            <img v-else src="../../assets/images/dark-mode/dark-capital-approval-icon.svg" />
                        </div>
                        <div class="section3-subcard-content">Opportunities don't wait, and neither should you. Our streamlined process ensures swift approval, putting funds in your hands when needed.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import './rise.scss';

.p-toast-message-icon {
    display: none !important;
}

.p-toast {
    @media screen and (max-width: 1000px) {
        width: 21rem;
    }
}
</style>
