<script setup lang="ts">
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseToggle from '../../../components/base/BaseToggle.vue';
import { apiHandlerWithFormData } from '../../../api/common/api';
import { defineProps, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { variables as variable, VariablesType, APIResponse, dateConversion, formatImageName } from '../viewStore';
import { DARKMODE } from '../../../store/dark-mode/constants';
import getImg from '../../../util/getImg';

const store = useStore();
const toast = useToast();
const router = useRouter();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const changeStatus = async (val: { id: string, value: boolean }) => {
    const res: Promise<APIResponse> = await apiHandlerWithFormData('store-v3/get-view-store-v3-data.json', {
        update_store_status: 1,
        store_id: val.id,
        checkbox_value: val.value
    })
    if (res['status'] == 'success') {
        toast.add({ severity: 'success', summary: 'Success', detail: res['html_message'], life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: res['html_message'], life: 3000 });
        return;
    }
}

const openEditPage = (id: string, platform_id: string): void => {
    router.push({ name: 'EditStore', params: { id: id }, state: { platform_id: platform_id } });
}
</script>

<template>
    <Card v-for="(record, i) in variable.data" :key="i"
        class="w-[100%] md:w-[48.52%] lg:w-[31.7%] xl:w-[23.65%] 2xl:w-[23.9%] rounded-itl-md">
        <template #content>
            <div>
                <div class="flex items-center justify-between mb-[28px]">
                    <img :src="getImg(formatImageName(record['platform_details']['store_svg_logo']), darkModeVal)"
                        :class="record['platform_details']['store_name'] != 'API' ? 'w-[95px]' : ''" class="h-[35px]" />
                    <div>
                        <BaseButton
                            v-if="(record['is_amazon_store_connected'] == '0') && ([7, 23, 24, 25, 26, 27, 28, 29, 30, 31].includes(Number(record['platform_id'])))"
                            name="Reconnect" class="!h-sm-btn !px-sm-btn-x !py-sm-btn-y text-sm-btn leading-[0px]" />
                        <div v-else class="flex items-center justify-end gap-2">
                            <img v-if="record['is_connected'] == '1'"
                                src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/view-store-check.svg" />
                            <p :class="record['is_connected'] == '1' ? 'text-success-dark' : 'text-error-dark'"
                                class="font-medium">{{
        record['is_connected'] == '1' ? 'Connected' : 'Disconnected'
    }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-start border-border-color border-b">
                    <div class="w-1/4 pb-[14px]">
                        <p
                            class="pb-[2px] m-0 text-h6 font-semibold [font-stretch:normal] not-italic leading-normal tracking-[normal] text-[#1f2937] block">
                            {{ record['id'] }}</p>
                        <p class="m-0 text-sm-sub-p">Store ID</p>
                    </div>
                    <div class="w-3/4 pb-[14px]">
                        <p
                            class="pb-[2px] m-0 text-h6 font-semibold [font-stretch:normal] not-italic leading-normal tracking-[normal] text-[#1f2937] block">
                            {{ record['store_name'] }}</p>
                        <p class="m-0 text-sm-sub-p">Name</p>
                    </div>
                </div>
                <div class="h-[21px] my-[16px] w-[100%]">
                    <p v-show="record['store_url'] != ''" class="truncate block text-[#1f2937]">{{ record['store_url']
                        }}</p>
                </div>
                <div class="mb-[16px]">
                    <p
                        class="pb-[2px] m-0 text-h5 font-semibold [font-stretch:normal] not-italic leading-normal tracking-[normal] text-[#1f2937] block">
                        {{ record['last_order_sync_date'] != '0000-00-00 00:00:00' ?
        dateConversion(record['last_order_sync_date']) : 'NA' }}</p>
                    <p class="m-0 text-sm-sub-p">Last Order Sync</p>
                </div>
                <div class="flex items-center justify-between border-t border-t-border-color pt-[16px] h-10">
                    <div v-if="!((record['is_amazon_store_connected'] == '0') && (variable.all_amazon_sub_platform_id_array.includes(Number(record['platform_id']))))"
                        class="flex items-center justify-start">
                        <BaseToggle :value="record['status'] == '1' ? true : false"
                            @listen-toggle-change="(val) => changeStatus({ id: record['id'], value: val })" />
                    </div>
                    <img @click="openEditPage(record['id'], record['platform_id'])"
                        v-if="!((record['is_amazon_store_connected'] == '0') && (variable.all_amazon_sub_platform_id_array.includes(Number(record['platform_id']))))"
                        class="cursor-pointer" :src="getImg('view-store-edit', darkModeVal)" />
                </div>
            </div>
        </template>
    </Card>
</template>

<style lang="scss">
@import '../viewStore.scss';
</style>
