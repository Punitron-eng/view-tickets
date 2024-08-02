<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import config from '../../../../../util/config';
import { DARKMODE } from '../../../../../store/dark-mode/constants';
import getImg from '../../../../../util/getImg';
import { creditWalletVariables, filterModal } from '../creditWallet.js';
import BaseInput from '../../../../../components/base/BaseInput.vue';
import BaseButton from '../../../../../components/base/BaseButton.vue';

const store = useStore();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const dataVariables = creditWalletVariables;

const assignAmount = (amount: number) => {
    dataVariables.value.selectedAmount = amount;
}
</script>

<template>
    <div class="cw-dt-wallet-card block lg:flex items-center justify-between gap-4 mb-4 h-[auto] lg:h-[280px] xl:h-[240px] mx-3 md:mx-0">
        <Card class="w-[100%] lg:w-1/2 rounded-itl-md h-full mb-4 lg:mb-0">
            <template #content>
                <div class="block md:flex items-start justify-between">
                    <div>
                        <div class="flex items-center justify-start md:justify-between gap-3">
                            <img :src="getImg('credit-wallet-wallet-icon', darkModeVal)" />
                            <h2 class="text-h2 font-light m-0 p-0">Your Wallet</h2>
                        </div>
                        <div class="mt-10">
                            <p class="text-sub-p m-0 p-0">Balance</p>
                            <h2 class="text-h2 m-0 p-0 text-primary-dark font-semibold">{{ config.selectedCurrencyIcon }} {{ 4934.88 }}</h2>
                        </div>
                    </div>
                    <img class="mt-[24px] md:mt-[0px]" :src="getImg('wallet-reacharge-image', darkModeVal)" />
                </div>
            </template>
        </Card>
        <Card class="w-[100%] lg:w-1/2 rounded-itl-md h-full">
            <template #content>
                <div>
                    <div class="flex items-center justify-start gap-3">
                        <div class="relative w-[100%] md:w-[30%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] h-[32px] flex items-center">
                            <p class="w-[12px] absolute left-3 m-0 pt-[2px] text-input-text-color">{{
                                config.selectedCurrencyIcon }}</p>
                            <input v-model="dataVariables.selectedAmount" type="text" placeholder=""
                                class="w-[100%] h-itl-input text-input-text-color border border-input-border-color focus:border-2 focus:pl-[22px] focus:!border-input-focused-border pl-[24px] pr-itl-input-x py-itl-input-y rounded-itl-sm font-interRegular leading-8" />
                        </div>
                        <BaseButton class="!bg-success-dark !border-success-dark h-md-btn leading-[14px]"
                            name="Recharge" />
                    </div>
                    <div class="flex items-center justify-start flex-wrap gap-3 mt-4 mb-[30px]">
                        <BaseButton @click="assignAmount(2000)"
                            class="h-md-btn leading-[14px]" :class="dataVariables.selectedAmount == 2000 ? '!bg-[#f2f7ff] !border-itl-primary !text-itl-primary' : '!bg-transparent !border-input-border-color !text-input-text-color'"
                            :name="config.selectedCurrencyIcon + ' 2000'" />
                        <BaseButton @click="assignAmount(3000)"
                            class="h-md-btn leading-[14px]" :class="dataVariables.selectedAmount == 3000 ? '!bg-[#f2f7ff] !border-itl-primary !text-itl-primary' : '!bg-transparent !border-input-border-color !text-input-text-color'"
                            :name="config.selectedCurrencyIcon + ' 3000'" />
                        <BaseButton @click="assignAmount(4000)"
                            class="h-md-btn leading-[14px]" :class="dataVariables.selectedAmount == 4000 ? '!bg-[#f2f7ff] !border-itl-primary !text-itl-primary' : '!bg-transparent !border-input-border-color !text-input-text-color'"
                            :name="config.selectedCurrencyIcon + ' 4000'" />
                        <BaseButton @click="assignAmount(5000)"
                            class="h-md-btn leading-[14px]" :class="dataVariables.selectedAmount == 5000 ? '!bg-[#f2f7ff] !border-itl-primary !text-itl-primary' : '!bg-transparent !border-input-border-color !text-input-text-color'"
                            :name="config.selectedCurrencyIcon + ' 5000'" />
                        <BaseButton @click="assignAmount(10000)"
                            class="h-md-btn leading-[14px]" :class="dataVariables.selectedAmount == 10000 ? '!bg-[#f2f7ff] !border-itl-primary !text-itl-primary' : '!bg-transparent !border-input-border-color !text-input-text-color'"
                            :name="config.selectedCurrencyIcon + ' 10000'" />
                    </div>
                    <p class="text-primary-dark text-sub-p mb-[16px]">Have a Promocode?</p>
                    <div class="flex items-center justify-start gap-3">
                        <input type="text" placeholder="Enter coupon code"
                            class="w-[100%] md:w-[40%] lg:w-[80%] xl:w-[60%] 2xl:w-[40%] h-itl-input text-input-text-color border border-input-border-color focus:border-2 focus:pl-[10px] focus:!border-input-focused-border pl-[12px] pr-itl-input-x py-itl-input-y rounded-itl-sm font-interRegular leading-8" />
                        <BaseButton class="!bg-success-dark !border-success-dark h-md-btn leading-[14px]"
                            name="Apply" />
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style lang="scss">
@import "../../../../../assets/itl-common-css/common-css.scss";

.credit-wallet {
    .cw-dt-wallet-card {
        .p-card-body {
            padding: 28px 40px;
            font-family: $interRegular;
        }

        .p-card-content {
            padding: 0px;
            font-family: $interRegular;
        }
    }
}
</style>