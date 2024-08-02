<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { apiHandlerWithFormData } from '../../api/common/api';
import { DARKMODE } from '../../store/dark-mode/constants';
import Header from './components/Header.vue';
import { variables as variable, VariablesType, APIResponse } from './viewStore';
import StoreCard from './components/StoreCard.vue';
import BaseButton from '../../components/base/BaseButton.vue';

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

onMounted(() => {
    document.body.classList.add('view-store-page');
})

const fetchMoreStores = async () => {
    const res: Promise<APIResponse> = await apiHandlerWithFormData('store-v3/get-view-store-v3-data.json', {
        vendor_id: variable.value.selectedVendor[1],
        limit: variable.value.limitCount,
        data: variable.value.search
    })
    if(res['status'] == 'success'){
        if(res['all_get_my_store_data_array']){
            variable.value.data = variable.value.data ? variable.value.data.concat(res['all_get_my_store_data_array']) : res['all_get_my_store_data_array'];
        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: 'No more records found', life: 3000 });
            return
        }
        if(res['all_amazon_sub_platform_id_array']) variable.value.all_amazon_sub_platform_id_array = res['all_amazon_sub_platform_id_array'];
        variable.value.limitCount += 12;
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: res['html_message'], life: 3000 });
        return;
    }
}
</script>

<template>
    <main class="mx-0 md:mx-2">
        <Header />
        <div class="flex items-center justify-between xl:justify-start flex-wrap gap-4 md:gap-[1%] lg:gap-[3%] xl:gap-[1%] 2xl:gap-[2%] mt-3">
            <StoreCard />
            <div v-if="variable.data && variable.data.length > 10" class="flex items-center justify-center w-[100%] mt-4">
                <BaseButton @click="fetchMoreStores()" name="Load More" class="h-md-btn !bg-itl-primary !leading-4 mx-0" />
            </div>
        </div>
    </main>
    <ToastView />
</template>

<style lang="scss">
@import './viewStore.scss';
</style>