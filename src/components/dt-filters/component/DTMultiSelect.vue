<template>
    <div v-if="!id.isIconAvail" id="status" class="w-[216px] md:w-[226px] relative">
        <div v-if="dataVariables.isFilterSkeletonShow">
            <div v-if="id.field == 'ticket_category'">
                <Skeleton height="2rem" class="rounded-[3px] mb-1"></Skeleton>
            </div>
            <Skeleton v-else height="2rem" class="rounded-[3px]"></Skeleton>
        </div>
        <MultiSelect v-else appendTo="self" id="status_filter" v-model="modal[id.field]" filter :options="id.values" optionLabel="value" :placeholder="id.header" :maxSelectedLabels="4" class="w-full dark:bg-transparent" />
        <p v-if="id.field == 'ticket_category'" class="text-xs">Note: Please select a department*</p>
    </div>
    <div v-else id="shipping_awb" class="w-[216px] md:w-[226px] relative">
        <MultiSelect appendTo="self" v-model="modal[id.field]" filter :options="id.values" optionLabel="value" :placeholder="id.header" :maxSelectedLabels="4" class="w-full dark:bg-transparent">
            <template #option="slotProps">
                <div class="flex items-center gap-2">
                    <img :src="getLogisticIcon(slotProps.option.logistics_logo)" class="w-[16px]" />
                    {{ slotProps.option.value }}
                </div>
            </template>
        </MultiSelect>
    </div>
</template>

<script setup>
import { defineModel } from 'vue';
import Skeleton from 'primevue/skeleton';
import { dataTableVariables as dataVariables } from '../../itl-dataTable-files/itl-dataTable/commonVariable';
const modal = defineModel();
const { id } = defineProps(['id']);
const getLogisticIcon = (logisticLogo) => {
    const imagePath = new URL(`../../../assets/images/logistics/${logisticLogo}.svg`, import.meta.url).href;
    const logisticLogoPath = imagePath.split('/');
    const logisticLogoLastPart = logisticLogoPath[logisticLogoPath.length - 1];
    if (logisticLogoLastPart == 'undefined') {
        const defaultImagePath = new URL(`../../../assets/images/default_logics_2.svg`, import.meta.url).href;
        return defaultImagePath;
    } else {
        return imagePath;
    }
};
</script>
<style lang="scss">
#status_filter,
.p-multiselect {
    @apply font-interRegular;
}
</style>
