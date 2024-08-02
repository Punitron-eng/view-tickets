<script setup lang="ts">
import { apiHandlerWithFormData } from '../../../../api/common/api';
import BaseButton from '../../../../components/base/BaseButton.vue';
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { variables as variable, VariablesType } from '../editStore';
import { DARKMODE } from '../../../../store/dark-mode/constants';
import getImg from '../../../../util/getImg';

const store = useStore();
const toast = useToast();
const route = useRoute();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const submitData = () => {
    const res = apiHandlerWithFormData('store-v3/add-store-sub.json', {
        input_store_name: variable.value.data['all_store_data_array'][0]['store_name'],
        input_store_id: route.params.id,
        input_platform_id: variable.value.platformIdFromState,
        input_email_id: variable.value.data['all_store_data_array'][0]['store_email'],
        input_communication_brand: variable.value.data['all_store_data_array'][0]['brand_name'],
        input_contact_number: variable.value.data['all_user_data'][0]['mobile'],
        input_website: variable.value.data['all_store_data_array'][0]['store_website_name'],
        input_default_payment_gateway: variable.value.data['all_store_data_array'][0]['default_payment_gateway'],
        input_razorpay_api_key: variable.value.data['all_store_data_array'][0]['razorpay_api_key'],
        input_razorpay_secret_key: variable.value.data['all_store_data_array'][0]['razorpay_secret_key'],
        input_cashfree_api_key: variable.value.data['all_store_data_array'][0]['cashfree_client_id'],
        input_cashfree_secret_key: variable.value.data['all_store_data_array'][0]['cashfree_client_secret_key'],
        input_partial_payment_key: variable.value.data['all_store_data_array'][0]['is_active_partial_payment'] == 1 ? 'on' : 'off',
        // input_partial_payment_amount: ,
        // input_partial_payment_percent: ,
        // input_order_confirmation_ivr: ,
        // file_name1: ,
        // input_webhook_hmac_header: ,
        // order_cancel: ,
        // order_creation: ,
        // order_updation: ,
        // input_store_url: ,
        // input_status_to_fetch: ,
        // input_push_order_status: ,
        // input_ready_ship: ,
        // input_cancelled: ,
        // input_cod: ,
        // input_prepaid: ,
        // action: 'edit',
        // is_image_changed: ,
    })
}
</script>

<template>
    <div class="block lg:flex items-start justify-between">
        <div class="flex items-center justify-start gap-4 mb-4 md:mb-2 lg:mb-0">
            <img @click="$router.go(-1)" :src="getImg('back-store-arrow', darkModeVal)" class="cursor-pointer" />
            <h4 class="m-0 p-0 text-h3 tracking-wide mb-2 md:mb-0">Edit Store</h4>
        </div>
        <div class="block lg:flex items-center justify-end gap-6 w-[100%] lg:w-[60%] xl:w-[50%]">
            <div
                class="flex items-center justify-start gap-2 bg-light-0 md:bg-[transparent] p-3 md:p-0  mb-4 md:mb-3 lg:mb-0">
                <img :src="getImg('add-store-help', darkModeVal)" />
                <p>
                    <span class="font-semibold">Anish & Kaif</span> are here in case you need help. Call on <span
                        class="text-itl-primary font-semibold">7718888236</span> or <span
                        class="text-itl-primary font-semibold">9076039828</span>. <span
                        class="text-itl-primary font-semibold text-sm cursor-pointer" v-show="!variable.showMoreHandler"
                        @click="variable.showMoreHandler = true">Show More</span>
                    <span class="font-semibold" :class="variable.showMoreHandler ? 'block' : 'hidden'">We are available
                        between 10 am - 7 pm (Monday - Saturday), or email us at onboard@ithinklogistics.com</span>
                    <span class="text-itl-primary font-semibold text-sm cursor-pointer"
                        :class="variable.showMoreHandler ? 'block' : 'hidden'"
                        @click="variable.showMoreHandler = false">Show Less</span>
                </p>
            </div>
            <BaseButton @click="submitData" name="Done" class="px-4" />
        </div>
    </div>
</template>

<style lang="scss">
@import '../../viewStore.scss';
</style>
