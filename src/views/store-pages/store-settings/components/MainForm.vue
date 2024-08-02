divdiv
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { apiHandlerWithFormData } from '../../../../api/common/api';
import { DARKMODE } from '../../../../store/dark-mode/constants';
import { variables as variable } from '../storeSettings';
import BaseButton from '../../../../components/base/BaseButton.vue';
import BaseToggle from '../../../../components/base/BaseToggle.vue';
import BaseDropdown from '../../../../components/base/BaseDropdown.vue';
import BaseInput from '../../../../components/base/BaseInput.vue';


const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

onMounted(async () => {
    // Your logic here
});
</script>

<template>
    <div class="mt-3">
        <Card>
            <template #content>
                <div>
                    <div class="flex items-center justify-between gap-4">
                        <label class="text-sub-p font-semibold text-light-1000 w-[100%] md:w-[48%]">Connect+ Confirmation
                            IVR</label>
                        <div class="w-[48%] flex items-center justify-end md:justify-start gap-3">
                            <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Enable</p>
                            <BaseToggle :value="true"
                                @listenToggleChange="(e: boolean) => variable.conn_confirm_ivr_toggle = e"
                                class="flex items-center" />
                        </div>
                    </div>
                    <div v-if="variable.conn_confirm_ivr_toggle" class="w-[100%] md:w-[48%] mt-3">
                        <label class="text-sm-sub-p font-semibold text-light-1000">Delay Time in Minutes</label>
                        <BaseInput type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:!border-input-focused-border mt-[5px]" />
                    </div>
                </div>
                <div class="my-6">
                    <label class="text-sub-p font-semibold text-light-1000 w-[100%] md:w-[48%] block mb-2">Connect+ Default Payment
                        Gateway</label>
                    <BaseDropdown id="2" class="spg-dropdown"
                        twClasses="w-[100%] md:w-[48%] h-itl-dropdown px-itl-dropdown-x leading-5 border-input-border-color focus:!border-2 focus:!border-input-focused-border"
                        :options="[{ id: 0, value: 'Razorpay' }, { id: 2, value: 'Gts' }]"
                        placeholder="Select Payment Gateway" />
                    <div class="block md:flex items-center justify-between gap-3 mt-3">
                        <div class="w-[100%] md:w-[48%]">
                            <label class="text-sm-sub-p font-semibold text-light-1000">Razorpay API Key</label>
                            <BaseInput type="text"
                                class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:!border-input-focused-border mt-[5px]" />
                        </div>
                        <div class="w-[100%] md:w-[48%] pt-2 md:pt-0">
                            <label class="text-sm-sub-p font-semibold text-light-1000">Razorpay Secret Key</label>
                            <BaseInput type="text"
                                class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:!border-input-focused-border mt-[5px]" />
                        </div>
                    </div>
                </div>
                <div class="my-6">
                    <div class="flex items-center justify-between gap-4">
                        <label class="text-sub-p font-semibold text-light-1000 w-[100%] md:w-[48%]">Connect+ Partial Payment</label>
                        <div class="w-[100%] md:w-[48%] flex items-center justify-end md:justify-start gap-3">
                            <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Enable</p>
                            <BaseToggle :value="variable.conn_partial_payment_toggle"
                                @listenToggleChange="(e: boolean) => variable.conn_partial_payment_toggle = e"
                                class="flex items-center" />
                        </div>
                    </div>
                    <div v-if="variable.conn_partial_payment_toggle"
                        class="block md:flex items-center justify-between gap-4 mt-3">
                        <div class="w-[100%] md:w-[48%]">
                            <label class="text-sm-sub-p font-semibold text-light-1000 w-[48%] block mb-2">Partial
                                Payment Mode</label>
                            <BaseDropdown id="1"
                                twClasses="w-full h-itl-dropdown px-itl-dropdown-x leading-5 border-input-border-color focus:!border-2 focus:!border-input-focused-border"
                                :options="[{ id: 0, value: 'Flat' }, { id: 2, value: 'Discount' }]"
                                placeholder="Select Partial Payment Mode" />
                        </div>
                        <div class="w-[100%] md:w-[48%] pt-2 md:pt-0">
                            <label class="text-sm-sub-p font-semibold text-light-1000">Minimum Collection Amount
                                (Rs.)</label>
                            <BaseInput type="text"
                                class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:!border-input-focused-border mt-[5px]" />
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between gap-4">
                        <label class="text-sub-p font-semibold text-light-1000 w-[100%] md:w-[48%]">Enable Unicommerce</label>
                        <div class="w-[100%] md:w-[48%] flex items-center justify-end md:justify-start gap-3">
                            <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Enable</p>
                            <BaseToggle :value="variable.unicommerce_toggle"
                                @listenToggleChange="(e: boolean) => variable.unicommerce_toggle = e"
                                class="flex items-center" />
                        </div>
                    </div>
                    <div v-if="variable.unicommerce_toggle" class="block md:flex items-center justify-between gap-4 mt-3">
                        <div class="w-[100%] md:w-[48%]">
                            <label class="text-sm-sub-p font-semibold text-light-1000">Email Id/User Id</label>
                            <BaseInput type="text"
                                class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:!border-input-focused-border mt-[5px]" />
                        </div>
                        <div class="w-[100%] md:w-[48%]">
                            <label class="text-sm-sub-p font-semibold text-light-1000">Minimum Collection Amount
                                (Rs.)</label>
                            <BaseInput type="text"
                                class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:!border-input-focused-border mt-[5px]" />
                        </div>
                    </div>
                    <div class="flex items-center justify-between gap-4 mt-3">
                        <label class="text-sm-sub-p font-semibold text-light-1000 w-[48%]">Push Cancel Update</label>
                        <div class="w-[48%] flex items-center justify-end md:justify-start gap-3">
                            <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Enable</p>
                            <BaseToggle :value="variable.push_cancel_update_toggle"
                                @listenToggleChange="(e: boolean) => variable.push_cancel_update_toggle = e"
                                class="flex items-center" />
                        </div>
                    </div>

                    <div class="block md:flex items-start justify-between gap-3 mt-3">
                        <label class="text-sm-sub-p font-semibold text-light-1000 w-[100%] md:w-[48%]">Force Verify Orders</label>
                        <div class="w-[100%] md:w-[48%] flex items-center justify-between gap-3 mt-3">
                            <div>
                                <div class="flex items-center justify-start gap-3 mb-3">
                                    <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Prepaid</p>
                                    <BaseToggle :value="variable.prepaid_toggle"
                                        @listenToggleChange="(e: boolean) => variable.prepaid_toggle = e"
                                        class="flex items-center" />
                                </div>
                                <label class="text-sm-sub-p font-semibold text-light-1000">Force Verify Orders In Minutes</label>
                                <BaseInput type="text"
                                    class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:!border-input-focused-border mt-[5px]" />
                            </div>
                            <div>
                                <div class="flex items-center justify-start gap-3 mb-3">
                                    <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">COD</p>
                                    <BaseToggle :value="variable.cod_toggle"
                                        @listenToggleChange="(e: boolean) => variable.cod_toggle = e"
                                        class="flex items-center" />
                                </div>
                                <label class="text-sm-sub-p font-semibold text-light-1000">Force Verify Orders In Minutes</label>
                                <BaseInput type="text"
                                    class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:!border-input-focused-border mt-[5px]" />
                            </div>
                        </div>
                    </div>
                    <p class="text-right text-sm-sub-p mt-4">*Note: These details will not be updated once the order is fulfilled.</p>
                </div>
            </template>
        </Card>
    </div>
    <ToastView />
</template>

<style lang="scss">
@import '../storeSettings.scss';

.store-settings-page {
    #baseDropdown_list .p-dropdown-item.p-highlight {
        color: black;
        background-color: transparent !important;
    }
}
</style>
