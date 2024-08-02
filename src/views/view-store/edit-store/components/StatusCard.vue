<script setup lang="ts">
import { apiHandlerWithFormData } from '../../../../api/common/api';
import BaseButton from '../../../../components/base/BaseButton.vue';
import BaseToggle from '../../../../components/base/BaseToggle.vue';
import BaseDropdown from '../../../../components/base/BaseDropdown.vue';
import { formatImageName } from '../../viewStore'
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { variables as variable, VariablesType } from '../editStore';
import { DARKMODE } from '../../../../store/dark-mode/constants';
import getImg from '../../../../util/getImg';

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);


</script>

<template>
    <Card class="w-full lg:w-1/2 rounded-itl-md shadow-itl-sm" id="status-card" v-if="variable.data.all_store_data_array">
        <template #header>
            <img :src="getImg(formatImageName(variable.data['all_platform_data_array'][0]['store_name']), darkModeVal)" class="w-auto h-8" />
        </template>
        <template #content>
            <div>
                <div v-if="variable.data['all_platform_data_array'][0]['is_show_pull_order_status'] == 1" class="flex item-center justify-start gap-5">
                    <div
                        class="flex items-center justify-center w-[24px] h-[24px] p-[1px] bg-success-dark text-white rounded-full">
                        <p class="text-md font-bold">1</p>
                    </div>

                    <h4 class="m-0 p-0 text-h3 tracking-wide">Step 1:</h4>
                </div>
                <div v-if="variable.data['all_platform_data_array'][0]['is_show_pull_order_status'] == 1" :class="variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1 || variable.data['all_platform_data_array'][0]['is_show_map_payment_status'] == 1 || variable.data['all_platform_data_array'][0]['is_show_push_paid_status'] == 1 || variable.data['all_platform_data_array'][0]['is_show_pull_cancel_order_status'] == 1 || variable.data['all_platform_data_array'][0]['is_show_self_fulfill_order_status'] == 1 ? 'border-l-2' : ''" class="border-success-dark h-max py-3 pl-[8%] pr-3 ml-[3%] md:ml-[1.8%] lg:ml-[2.5%] my-1">
                    <div class="flex items-center justify-between">
                        <h5 class="p-0 m-0 text-h5">Pull Order Statuses</h5>
                        <div class="flex items-center justify-end gap-3">
                            <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Sync</p>
                            <BaseToggle :value="(variable.data['all_store_data_array'][0]['is_active_pull_order_status'] == 1 ? true : false)"
                            @listen-toggle-change="(variable.data['all_store_data_array'][0]['is_active_pull_order_status'] == 1 ? variable.data['all_store_data_array'][0]['is_active_pull_order_status'] = 0 : variable.data['all_store_data_array'][0]['is_active_pull_order_status'] = 1)" />
                        </div>
                    </div>
                    <div v-show="variable.data['all_store_data_array'][0]['is_active_pull_order_status'] == 1" class="pt-[32px]">
                        <label class="block text-sub-p font-normal text-light-1000">Status to Fetch</label>
                        <input v-model="variable.data['all_store_data_array'][0]['default_pull_order_status']" type="text"
                            class="h-itl-input w-[70%] px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                    </div>
                </div>
                <div v-if="variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1" class="flex item-center justify-start gap-5">
                    <div
                        class="flex items-center justify-center w-[24px] h-[24px] p-[1px] bg-success-dark text-white rounded-full">
                        <p class="text-md font-bold">{{ variable.data['all_platform_data_array'][0]['is_show_pull_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1 ? 2 : 1 }}</p>
                    </div>

                    <h4 class="m-0 p-0 text-h3 tracking-wide">Step {{ variable.data['all_platform_data_array'][0]['is_show_pull_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1 ? 2 : 1 }}:</h4>
                </div>
                <div v-if="variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1" :class="variable.data['all_platform_data_array'][0]['is_show_map_payment_status'] == 1 || variable.data['all_platform_data_array'][0]['is_show_push_paid_status'] == 1 || variable.data['all_platform_data_array'][0]['is_show_pull_cancel_order_status'] == 1 || variable.data['all_platform_data_array'][0]['is_show_self_fulfill_order_status'] == 1 ? 'border-l-2' : ''" class="border-success-dark h-max py-3 pl-[8%] pr-3 ml-[3%] md:ml-[1.8%] lg:ml-[2.5%] my-1">
                    <div :class="variable.pushOrderStatusToggle ? '' : 'mb-[32px]'">
                        <div class="flex items-center justify-between">
                            <h5 class="p-0 m-0 text-h5">Push Order Statuses</h5>
                            <div class="flex items-center justify-end gap-3">
                                <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Sync</p>
                                <BaseToggle :value="(variable.data['all_store_data_array'][0]['is_active_push_order_status'] == 1 ? true : false)"
                                @listen-toggle-change="(variable.data['all_store_data_array'][0]['is_active_push_order_status'] == 1 ? variable.data['all_store_data_array'][0]['is_active_push_order_status'] = 0 : variable.data['all_store_data_array'][0]['is_active_push_order_status'] = 1)" />
                            </div>
                        </div>
                        <p class="block text-sub-p font-normal text-light-1000 w-[60%] mb-[24px] pt-[16px] ">Create Order status
                            which you want to push on your channel</p>
                    </div>
                    <div v-show="variable.data['all_store_data_array'][0]['is_active_push_order_status'] == 1" class="mb-[32px]">
                        <div class="block md:flex items-center justify-between w-full gap-4">
                            <div class="w-full">
                                <label class="text-sub-p font-semibold text-light-1000">Ready to Ship</label>
                                <BaseDropdown class="payment-gateway-dropdown mt-[5px]"
                                    tw-classes="w-full h-itl-dropdown px-itl-dropdown-x leading-5 border-input-border-color focus:!border-2 focus:!border-input-focused-border"
                                    :options="variable.readyToShipDropdownOptions"
                                    :default-value="variable.data['all_store_data_array'][0]['ready_to_dispatch_push_order_status']" @listen-dropdown-change="(e) => console.log('rf')"
                                    placeholder="Select Payment Gateway" />
                            </div>
                            <div class="w-full">
                                <label class="text-sub-p font-semibold text-light-1000">Cancelled</label>
                                <BaseDropdown class="payment-gateway-dropdown mt-[5px]"
                                    tw-classes="w-full h-itl-dropdown px-itl-dropdown-x leading-5 border-input-border-color focus:!border-2 focus:!border-input-focused-border"
                                    :options="variable.cancelledDropdownOptions"
                                    :default-value="variable.data['all_platform_data_array'][0]['selected_cancelled_push_order_status'] == 'Cancelled' ? 1 : 0" @listen-dropdown-change="(e) => console.log('rf')"
                                    placeholder="Select" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="variable.data['all_platform_data_array'][0]['is_show_map_payment_status'] == 1" class="flex item-center justify-start gap-5">
                    <div class="flex items-center justify-center w-[24px] h-[24px] p-[1px] bg-success-dark text-white rounded-full">
                        <p class="text-md font-bold">{{ variable.data['all_platform_data_array'][0]['is_show_pull_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_map_payment_status'] == 1 ? 3 : 2 }}</p>
                    </div>

                    <h4 class="m-0 p-0 text-h3 tracking-wide">Step {{ variable.data['all_platform_data_array'][0]['is_show_pull_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_map_payment_status'] == 1 ? 3 : 2 }}:</h4>
                </div>
                <div v-if="variable.data['all_platform_data_array'][0]['is_show_map_payment_status'] == 1" :class="variable.data['all_platform_data_array'][0]['is_show_push_paid_status'] == 1 || variable.data['all_platform_data_array'][0]['is_show_pull_cancel_order_status'] == 1 || variable.data['all_platform_data_array'][0]['is_show_self_fulfill_order_status'] == 1 ? 'border-l-2' : ''" class="border-success-dark h-max py-3 pl-[8%] pr-3 ml-[3%] md:ml-[1.8%] lg:ml-[2.5%] my-1">
                    <div :class="variable.mapPaymentStatusToggle ? '' : 'mb-[32px]'">
                        <div class="flex items-center justify-between">
                            <h5 class="p-0 m-0 text-h5">Map Payment Statuses</h5>
                            <div class="flex items-center justify-end gap-3">
                                <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Enable</p>
                                <BaseToggle :value="(variable.data['all_store_data_array'][0]['is_active_map_payment_status'] == 1 ? true : false)"
                                @listen-toggle-change="(variable.data['all_store_data_array'][0]['is_active_map_payment_status'] == 1 ? variable.data['all_store_data_array'][0]['is_active_map_payment_status'] = 0 : variable.data['all_store_data_array'][0]['is_active_map_payment_status'] = 1)" />
                            </div>
                        </div>
                        <p class="block text-sub-p font-normal text-light-1000 w-[60%] mb-[24px] pt-[16px]">Map new and existing
                            payment gateway/ status against COD and Prepaid payment status.</p>
                    </div>
                    <div v-show="variable.data['all_store_data_array'][0]['is_active_map_payment_status'] == 1" class="pt-[16px] mb-[32px]">
                        <div class="block md:flex items-center justify-between w-full gap-4">
                            <div class="w-full">
                                <label class="text-sub-p font-semibold text-light-1000">COD</label>
                                <input v-model="variable.data['all_user_data'][0]['default_cod_payment_status']" type="text"
                                    class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                            </div>
                            <div class="w-full">
                                <label class="text-sub-p font-semibold text-light-1000">Prepaid</label>
                                <input v-model="variable.data['all_user_data'][0]['default_prepaid_payment_status']" type="text"
                                    class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="variable.data['all_platform_data_array'][0]['is_show_push_paid_status'] == 1" class="flex item-center justify-start gap-5">
                    <div
                        class="flex items-center justify-center w-[24px] h-[24px] p-[1px] bg-success-dark text-white rounded-full">
                        <p class="text-md font-bold">{{ variable.data['all_platform_data_array'][0]['is_show_pull_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_map_payment_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_paid_status'] == 1 ? 4 : 3 }}</p>
                    </div>

                    <h4 class="m-0 p-0 text-h3 tracking-wide">Step {{ variable.data['all_platform_data_array'][0]['is_show_pull_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_map_payment_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_paid_status'] == 1 ? 4 : 3 }}:</h4>
                </div>
                <div v-if="variable.data['all_platform_data_array'][0]['is_show_push_paid_status'] == 1" :class="variable.data['all_platform_data_array'][0]['is_show_pull_cancel_order_status'] == 1 || variable.data['all_platform_data_array'][0]['is_show_self_fulfill_order_status'] == 1 ? 'border-l-2' : ''" class="border-success-dark h-max py-3 pl-[8%] pr-3 ml-[3%] md:ml-[1.8%] lg:ml-[2.5%] my-1">
                    <div class="flex items-center justify-between">
                        <h5 class="p-0 m-0 text-h5">Push paid status to your channel</h5>
                        <div class="flex items-center justify-end gap-3">
                            <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Enable</p>
                            <BaseToggle :value="(variable.data['all_store_data_array'][0]['is_active_push_paid_status'] == 1 ? true : false)"
                            @listen-toggle-change="(variable.data['all_store_data_array'][0]['is_active_push_paid_status'] == 1 ? variable.data['all_store_data_array'][0]['is_active_push_paid_status'] = 0 : variable.data['all_store_data_array'][0]['is_active_push_paid_status'] = 1)" />
                        </div>
                    </div>
                    <div class="pt-[16px] mb-[32px]">
                        <p class="block text-sub-p font-normal text-light-1000 w-[60%] mb-[24px]">Get paid status
                            directly marked on your channel</p>
                    </div>
                </div>
                <div v-if="variable.data['all_platform_data_array'][0]['is_show_pull_cancel_order_status'] == 1" class="flex item-center justify-start gap-5">
                    <div
                        class="flex items-center justify-center w-[24px] h-[24px] p-[1px] bg-success-dark text-white rounded-full">
                        <p class="text-md font-bold">{{ variable.data['all_platform_data_array'][0]['is_show_pull_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_map_payment_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_paid_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_pull_cancel_order_status'] == 1 ? 5 : 4 }}</p>
                    </div>

                    <h4 class="m-0 p-0 text-h3 tracking-wide">Step {{ variable.data['all_platform_data_array'][0]['is_show_pull_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_map_payment_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_paid_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_pull_cancel_order_status'] == 1 ? 5 : 4 }}:</h4>
                </div>
                <div v-if="variable.data['all_platform_data_array'][0]['is_show_pull_cancel_order_status'] == 1" :class="variable.data['all_platform_data_array'][0]['is_show_self_fulfill_order_status'] == 1 ? 'border-l-2' : ''" class="border-success-dark h-max py-3 pl-[8%] pr-3 ml-[3%] md:ml-[1.8%] lg:ml-[2.5%] my-1">
                    <div class="flex items-center justify-between">
                        <h5 class="p-0 m-0 text-h5">Pull Cancel Orders</h5>
                        <div class="flex items-center justify-end gap-3">
                            <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Sync</p>
                            <BaseToggle :value="(variable.data['all_store_data_array'][0]['is_active_pull_cancel_order_status'] == 1 ? true : false)"
                            @listen-toggle-change="(variable.data['all_store_data_array'][0]['is_active_pull_cancel_order_status'] == 1 ? variable.data['all_store_data_array'][0]['is_active_pull_cancel_order_status'] = 0 : variable.data['all_store_data_array'][0]['is_active_pull_cancel_order_status'] = 1)" />
                        </div>
                    </div>
                    <div class="pt-[16px] mb-[32px]">
                        <p class="block text-sub-p font-normal text-light-1000 w-[60%] mb-[24px]">Once sync is on, we
                            will pull cancelled orders from channel periodically.</p>
                    </div>
                </div>
                <div v-if="variable.data['all_platform_data_array'][0]['is_show_self_fulfill_order_status'] == 1" class="flex item-center justify-start gap-5">
                    <div
                        class="flex items-center justify-center w-[24px] h-[24px] p-[1px] bg-success-dark text-white rounded-full">
                        <p class="text-md font-bold">{{ variable.data['all_platform_data_array'][0]['is_show_pull_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_map_payment_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_paid_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_pull_cancel_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_self_fulfill_order_status'] == 1 ? 6 : 5 }}</p>
                    </div>

                    <h4 class="m-0 p-0 text-h3 tracking-wide">Step {{ variable.data['all_platform_data_array'][0]['is_show_pull_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_map_payment_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_push_paid_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_pull_cancel_order_status'] == 1 && variable.data['all_platform_data_array'][0]['is_show_self_fulfill_order_status'] == 1 ? 6 : 5 }}:</h4>
                </div>
                <div v-if="variable.data['all_platform_data_array'][0]['is_show_self_fulfill_order_status'] == 1" class="h-max py-3 pl-[8%] pr-3 ml-[3%] md:ml-[1.8%] lg:ml-[2.5%] my-1">
                    <div class="flex items-center justify-between">
                        <h5 class="p-0 m-0 text-h5">Fetch Self Fullfilled Orders</h5>
                        <div class="flex items-center justify-end gap-3">
                            <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Sync</p>
                            <BaseToggle :value="(variable.data['all_store_data_array'][0]['is_show_self_fulfill_order_status'] == 1 ? true : false)"
                            @listen-toggle-change="(variable.data['all_store_data_array'][0]['is_show_self_fulfill_order_status'] == 1 ? variable.data['all_store_data_array'][0]['is_show_self_fulfill_order_status'] = 0 : variable.data['all_store_data_array'][0]['is_show_self_fulfill_order_status'] = 1)" />
                        </div>
                    </div>
                    <div class="pt-[16px] mb-[32px]">
                        <p class="block text-sub-p font-normal text-light-1000 w-[60%] mb-[24px]">Once sync is on, we
                            will pull self fullfilled orders from channel periodically.</p>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>

<style lang="scss">
@import '../../viewStore.scss';

#status-card {
    .p-card-header {
        @include theme() {
            border-bottom: 1px solid theme-get('border-color');
        }
    }

    .p-card-body {
        padding: 32px;
    }

    .payment-gateway-dropdown {
        .p-dropdown-items-wrapper {
            width: 100% !important;
        }

        .p-dropdown-item.p-highlight {
            background: transparent !important;
        }
    }

    .p-dropdown:not(.p-disabled).p-focus {
        @include theme() {
            border: 2px solid theme-get('input-focused-border');
        }
    }
}
</style>
