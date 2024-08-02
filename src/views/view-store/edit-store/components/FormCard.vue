<script setup lang="ts">
import { apiHandlerWithFormData } from '../../../../api/common/api';
import BaseButton from '../../../../components/base/BaseButton.vue';
import BaseDropdown from '../../../../components/base/BaseDropdown.vue';
import BaseToggle from '../../../../components/base/BaseToggle.vue';
import BaseFileUpload from '../../../../components/base/BaseFileUpload.vue'
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
    <Card class="w-full lg:w-1/2 rounded-itl-md shadow-itl-sm pb-4" id="form-card">
        <template #header>
            <img :src="getImg('itl-logo', darkModeVal)" class="w-auto h-8" />
        </template>
        <template #content>
            <h4 class="m-0 p-0 text-h3 tracking-wide mb-2 md:mb-0">Basic Information</h4>
            <form @submit="(e) => e.preventDefault()" class="mt-4" v-if="variable.data.all_store_data_array">
                <div class="w-full">
                    <div class="block md:flex items-center justify-between w-full gap-4">
                        <div class="w-full">
                            <label class="text-sub-p font-semibold text-light-1000">Store Name <span
                                    class="text-error-dark">*</span></label>
                            <input v-model="variable.data['all_store_data_array'][0]['store_name']" type="text"
                                class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                        </div>
                        <div class="w-full">
                            <label class="text-sub-p font-semibold text-light-1000">Email ID <span
                                    class="text-error-dark">*</span></label>
                            <input v-model="variable.data['all_store_data_array'][0]['store_email']" type="text"
                                class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                        </div>
                    </div>
                    <div class="block md:flex items-center justify-between w-full gap-4">
                        <div class="pt-3 w-full">
                            <label class="text-sub-p font-semibold text-light-1000">Communication Brand <span
                                    class="text-error-dark">*</span></label>
                            <input v-model="variable.data['all_store_data_array'][0]['brand_name']" type="text"
                                class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                        </div>
                        <div class="pt-3 w-full">
                            <label class="text-sub-p font-semibold text-light-1000">Contact Number <span
                                    class="text-error-dark">*</span></label>
                            <div class="flex items-center justify-start w-full">
                                <div
                                    class="h-itl-input w-[30%] px-itl-input-x text-input-text-color rounded-tl-itl-sm rounded-bl-itl-sm border-l border-y border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px] flex items-center justify-between">
                                    <img :src="getImg('add-store-ind-flag')" />
                                    <span class="text-input-text-color pl-2 font-semibold">+91</span>
                                </div>
                                <input v-model="variable.data['all_user_data'][0]['mobile']" type="text"
                                    class="h-itl-input w-[70%] px-itl-input-x text-input-text-color py-itl-input-y rounded-tr-itl-sm rounded-br-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                            </div>
                        </div>
                    </div>
                    <div v-if="((!variable.all_amazon_sub_platform_id_array.includes(Number(variable.platformIdFromState)) && (variable.platformIdFromState != 8) && (variable.platformIdFromState != 20)))" class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Website URL <span
                                class="text-error-dark">*</span></label>
                        <input v-model="variable.data['all_store_data_array'][0]['store_website_name']" type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                    </div>
                    <div class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Connect + Default Payment
                            Gateway</label>
                        <BaseDropdown id="payment-gateway-dropdown" class="payment-gateway-dropdown mt-[5px]"
                            tw-classes="w-full h-itl-dropdown px-itl-dropdown-x leading-5 border-input-border-color focus:!border-2 focus:!border-input-focused-border"
                            :options="variable.paymentGatewayDropdownOptions"
                            :default-value="variable.data['all_store_data_array'][0]['default_payment_gateway']"
                            @listen-dropdown-change="(e) => variable.data['all_store_data_array'][0]['default_payment_gateway'] = e.id"
                            placeholder="Select Payment Gateway" />
                    </div>
                    <div v-if="variable.data['all_store_data_array'][0]['default_payment_gateway'] == 1"
                        class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Razorpay Api Key</label>
                        <input v-model="variable.data['all_store_data_array'][0]['razorpay_api_key']" type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                    </div>
                    <div v-if="variable.data['all_store_data_array'][0]['default_payment_gateway'] == 1"
                        class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Razorpay Secret Key
                        </label>
                        <input v-model="variable.data['all_store_data_array'][0]['razorpay_secret_key']" type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                    </div>
                    <div v-if="variable.data['all_store_data_array'][0]['default_payment_gateway'] == 2"
                        class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Cashfree Api Key</label>
                        <input v-model="variable.data['all_store_data_array'][0]['cashfree_client_id']" type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                    </div>
                    <div v-if="variable.data['all_store_data_array'][0]['default_payment_gateway'] == 2"
                        class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Cashfree Secret Key
                        </label>
                        <input v-model="variable.data['all_store_data_array'][0]['cashfree_client_secret_key']"
                            type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                    </div>
                    <div v-if="variable.platformIdFromState == 2" class="w-full pt-4 flex items-center justify-between">
                        <label class="text-sub-p font-semibold text-light-1000">Connect+ Partial Payment</label>
                        <div class="flex items-center justify-end gap-4">
                            <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Enable</p>
                            <BaseToggle
                                :value="(variable.data['all_store_data_array'][0]['is_active_partial_payment'] == 1 ? true : false)"
                                @listen-toggle-change="(variable.data['all_store_data_array'][0]['is_active_partial_payment'] == 1 ? variable.data['all_store_data_array'][0]['is_active_partial_payment'] = 0 : variable.data['all_store_data_array'][0]['is_active_partial_payment'] = 1)" />
                        </div>
                    </div>
                    <div v-show="variable.data['all_store_data_array'][0]['is_active_partial_payment'] == 1"
                        class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Partial Payment Mode</label>
                        <BaseDropdown class="payment-gateway-dropdown mt-[5px]"
                            tw-classes="w-full h-itl-dropdown px-itl-dropdown-x leading-5 border-input-border-color focus:!border-2 focus:!border-input-focused-border"
                            :options="variable.partialPaymentModeDropdownOptions"
                            :default-value="variable.data['all_store_data_array'][0]['partial_payment_mode']"
                            @listen-dropdown-change="(e) => console.log('rf')" placeholder="Select Payment Gateway" />
                    </div>
                    <div class="w-full pt-4 flex items-center justify-between">
                        <label class="text-sub-p font-semibold text-light-1000">Connect+ Confirmation Ivr</label>
                        <div class="flex items-center justify-end gap-4">
                            <p class="text-sub-p font-semibold text-light-1000 m-0 p-0">Enable</p>
                            <BaseToggle
                                :value="(variable.data['all_store_data_array'][0]['is_active_order_confirmation_ivr'] == 1 ? true : false)"
                                @listen-toggle-change="(variable.data['all_store_data_array'][0]['is_active_order_confirmation_ivr'] == 1 ? variable.data['all_store_data_array'][0]['is_active_order_confirmation_ivr'] = 0 : variable.data['all_store_data_array'][0]['is_active_order_confirmation_ivr'] = 1)" />
                        </div>
                    </div>
                    <div v-show="variable.data['all_store_data_array'][0]['is_active_order_confirmation_ivr'] == 1"
                        class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Delay Time in Minutes</label>
                        <input v-model="variable.data['all_store_data_array'][0]['order_confirmation_ivr_delay']"
                            type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                    </div>
                    <div class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Upload Brand Logo</label>
                        <BaseFileUpload fileID="form-file-upload" fileType="Image"
                            defaultValueName="Upload an Image" :allowedExtensions="['jpg', 'png']"
                            @listenFileUploadChange="(e) => console.log(e)" @clearFile="console.log('rfef')"
                            twClasses="w-full md:w-[496px] h-44 rounded-xl border-2 dark:border-[#5d5d5d] border-dashed mt-[5px]" />
                    </div>
                    <div v-if="variable.platformIdFromState == 2" class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Shopify Webhook MAC Header
                        </label>
                        <input v-model="variable.data['all_store_data_array'][0]['webhook_hmac_header']" type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                    </div>
                    <div v-if="variable.platformIdFromState == 2" class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Order Cancellation</label>
                        <input
                            value="https://alpha.ithinklogistics.com/shopify_all_webhook_order_cancel.php?vendor_code="
                            type="text" disabled
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px] bg-light-200" />
                    </div>
                    <div v-if="variable.platformIdFromState == 2" class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Order Creation</label>
                        <input
                            value="https://alpha.ithinklogistics.com/shopify_all_webhook_order_create.php?vendor_code="
                            disabled type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px] bg-light-200" />
                    </div>
                    <div v-if="variable.platformIdFromState == 2" class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Order Updation</label>
                        <input
                            value="https://alpha.ithinklogistics.com/shopify_all_webhook_order_update.php?vendor_code="
                            disabled type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px] bg-light-200" />
                    </div>

                    <div class="w-full mt-4 bg-light-200 rounded-itl-sm p-4">
                        <div class="flex items-center justify-start gap-3">
                            <img :src="getImg('add-store-help', darkModeVal)" />
                            <p class="font-semibold">NOTE</p>
                        </div>
                        <p class="pt-3">Your buyer will see this as your brand name in SMS, Email, Post-Ship page &
                            label.</p>
                        <a href="" target="_blank" class="text-itl-primary font-semibold">Click to Preview</a>
                    </div>

                    <div v-if="((!variable.all_amazon_sub_platform_id_array.includes(Number(variable.platformIdFromState)) && (variable.platformIdFromState != 8) && (variable.platformIdFromState != 20)))" class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Store URL <span
                                class="text-error-dark">*</span></label>
                        <input v-model="variable.data['all_store_data_array'][0]['store_url']" type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                    </div>
                    <div v-if="!(variable.platformIdFromState != 3 && variable.platformIdFromState != 4 && variable.platformIdFromState != 5 && variable.platformIdFromState != 6 && variable.platformIdFromState != 11 && variable.platformIdFromState != 12 && variable.platformIdFromState != 21)"
                        class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Access Token</label>
                        <input :value="variable.data['all_store_data_array'][0]['access_token']" disabled type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px] bg-light-200" />
                    </div>
                    <div v-if="!(variable.platformIdFromState != 3 && variable.platformIdFromState != 4 && variable.platformIdFromState != 5 && variable.platformIdFromState != 6 && variable.platformIdFromState != 11 && variable.platformIdFromState != 12 && variable.platformIdFromState != 21)"
                        class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Secret Key</label>
                        <input :value="variable.data['all_store_data_array'][0]['secret_key']" disabled type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px] bg-light-200" />
                    </div>


                    <!-- REST API FOR WOOCOMMERCE -->
                    <div v-if="variable.platformIdFromState == 4" class="w-full pt-4 flex items-center justify-between">
                        <label class="text-h4 font-normal text-light-1000">Enable REST API</label>
                        <BaseToggle
                            :value="(variable.data['all_store_data_array'][0]['is_enabled_woocommerce_rest_api'] == 1 ? true : false)"
                            @listen-toggle-change="(variable.data['all_store_data_array'][0]['is_enabled_woocommerce_rest_api'] == 1 ? variable.data['all_store_data_array'][0]['is_enabled_woocommerce_rest_api'] = 0 : variable.data['all_store_data_array'][0]['is_enabled_woocommerce_rest_api'] = 1)" />
                    </div>
                    <div v-if="variable.data['all_store_data_array'][0]['is_enabled_woocommerce_rest_api'] == 1" class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Woocommerce Access Token</label>
                        <input v-model="variable.data['all_store_data_array'][0]['woocommerce_access_token']" type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                    </div>
                    <div v-if="variable.data['all_store_data_array'][0]['is_enabled_woocommerce_rest_api'] == 1" class="w-full pt-3">
                        <label class="text-sub-p font-semibold text-light-1000">Woocommerce Secret Key</label>
                        <input v-model="variable.data['all_store_data_array'][0]['woocommerce_secret_key']" type="text"
                            class="h-itl-input w-full px-itl-input-x text-input-text-color py-itl-input-y rounded-itl-sm border border-input-border-color focus:border-2 focus:border-input-focused-border mt-[5px]" />
                    </div>
                </div>
            </form>
        </template>
    </Card>
    <ToastView />
</template>

<style lang="scss">
@import '../../viewStore.scss';

#form-card {
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

            @include theme() {
                color: theme-get('primary');
            }
        }
    }

    .p-dropdown:not(.p-disabled).p-focus {
        @include theme() {
            border: 2px solid theme-get('input-focused-border');
        }
    }
}
</style>
