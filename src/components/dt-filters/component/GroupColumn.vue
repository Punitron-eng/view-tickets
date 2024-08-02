<script setup>
const modalRefs = defineModel()
import DTSearchInput from './DTSearchInput.vue';
const { groupByColumn, fieldIdRefs, showHide, Heading } = defineProps(['groupByColumn', 'fieldIdRefs', 'showHide', 'Heading']);
const getClassName = (heading) => {
    return heading.toLowerCase().replace(/\s/g, '-');
}
</script>
<template>
    <div>
        <div class="right-filter-header px-[14px] my-[8px]">{{ Heading }}</div>
        <div class="flex  flex-col md:flex-row lg:items-center border-b-[1px] dark:border-b-[#4d4d4d]">
            <div class=" md:pl-[20px] md:px-3 md:pb-2 md:pt-2  right-lists "
                :class="fieldIdRefs[id.field]?.value ? ' mt-[2px]' : 'mt-[2px]'" :id="getClassName(id.header)"
                v-for="(id, keys) in groupByColumn" :key="keys">
                <div
                    class="flex justify-between items-center bg-[#f1f3f5] dark:bg-[#2d2d2d] md:bg-transparent px-4 md:px-0 py-2">
                    <span class="right-filter-header pl-[14px]">{{ id.header }}</span>
                    <img v-if="!fieldIdRefs[id.field]?.value" src="@/assets/images/drodown-arrow-down.svg"
                        @click="showHide(id.field)" class="flex md:hidden" />
                    <img v-else src="@/assets/images/arrow-up.svg" @click="showHide(id.field)" class="flex md:hidden" />
                </div>
                <div class="flex text-[13px] w-[80%] md:w-full pb-[20px] pt-[10px] md:pt-[0px]"
                    :class="(fieldIdRefs[id.field]?.value ? ' md:pb-[24px] mt-[12px]' : '  md:pb-[0px] mt-[0px]', id.isFilterType == 9 ? 'pl-[0px] mt-[0px]' : ' pl-[14px]')">
                    <div v-if="id.isFilterType == 2" :id="id.field" v-show="fieldIdRefs[id.field]?.value">
                        <DTSearchInput v-model="modalRefs" :placeHolder="id?.placeholder || 'Search'" :id="id" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>