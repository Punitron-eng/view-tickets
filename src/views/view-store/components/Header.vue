<script setup lang="ts">
import { apiHandlerWithFormData } from '../../../api/common/api';
import BaseButton from '../../../components/base/BaseButton.vue';
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { variables as variable, VariablesType, APIResponse } from '../viewStore';
import VendorModal from '../../../components/common-modal-files/VendorModal.vue'
import { DARKMODE } from '../../../store/dark-mode/constants';
import getImg from '../../../util/getImg';

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const applyVendor = async (val: VariablesType['selectedVendor']) => {
    variable.value.selectedVendor = val[0].split(',');
    variable.value.vendorModal = false;

    const res: Promise<APIResponse> = await apiHandlerWithFormData('store-v3/get-view-store-v3-data.json', {
        vendor_id: variable.value.selectedVendor[1]
    })
    if(res['status'] == 'success'){
        variable.value.data = res['all_get_my_store_data_array'];
        if(res['all_amazon_sub_platform_id_array']) variable.value.all_amazon_sub_platform_id_array = res['all_amazon_sub_platform_id_array'];
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: res['html_message'], life: 3000 });
        return;
    }
}

const searchStores = async () => {
    variable.value.limitCount = 12;
    const res: Promise<APIResponse> = await apiHandlerWithFormData('store-v3/get-view-store-v3-data.json', {
        vendor_id: variable.value.selectedVendor[1],
        data: variable.value.search
    })
    if(res['status'] == 'success'){
        if(res['all_get_my_store_data_array']){
            variable.value.data = res['all_get_my_store_data_array'];
        } else {
            variable.value.data = null;
        }
        if(res['all_amazon_sub_platform_id_array']) variable.value.all_amazon_sub_platform_id_array = res['all_amazon_sub_platform_id_array'];
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: res['message'], life: 3000 });
        return;
    }
}

</script>

<template>
    <div class="block md:flex items-center justify-between">
        <div class="block md:flex items-baseline justify-start gap-2">
            <h4 class="m-0 p-0 text-h3 tracking-wide mb-2 md:mb-0">Store</h4>
            <div class="flex items-center justify-between md:justify-start gap-2 mb-3 md:mb-0">
                <p class="m-0 text-p w-[320px] md:w-[280px] lg:w-[auto] truncate">({{ variable.selectedVendor[0] ||
                    'Select Vendor' }})</p>
                <img @click="variable.vendorModal = true" class="cursor-pointer"
                    :src="getImg('vendor-select-icon', darkModeVal)" />
            </div>
        </div>
        <div v-if="variable.selectedVendor[1]" class="block md:flex items-center justify-end gap-2">
            <div
                class="relative w-[full] md:w-[216px] h-[32px] border border-[#dfe3e6] dark:border-[#4d4d4d] flex items-center mb-3 md:mb-0">
                <img :src="getImg('store-order-search', darkModeVal)" alt="Search" class="w-[12px] absolute left-2">
                <input @input="searchStores()" v-model="variable.search" id="search-input" type="text" placeholder="Search Store...."
                    class="w-full h-itl-input focus:border-2 focus:pl-[26px] focus:!border-input-focused-border pl-[28px] pr-itl-input-x py-itl-input-y rounded-itl-sm font-interRegular" />
                <img v-if="variable.search" :src="getImg('close-icon', darkModeVal)" @click="() => {variable.search = ''; searchStores();}" alt="Search" class="w-[12px] absolute right-2 cursor-pointer">
            </div>
            <BaseButton class="h-md-btn !bg-itl-primary !leading-4 mx-0" name="Add New" />
        </div>
    </div>
    <div v-if="!variable.data" class="flex items-center justify-center h-[60vh] xl:h-[80vh]">
        <div>
            <img src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/no-record-v2.svg" class="block ml-4" />
            <p class="pt-3">No Record Found</p>
        </div>
    </div>

    <VendorModal v-show="variable.vendorModal" @close-modal="variable.vendorModal = false"
        @apply-vendor="(val) => applyVendor(val)" :vendor-id="variable.selectedVendor" />
</template>

<style lang="scss">
@import '../viewStore.scss';
</style>
