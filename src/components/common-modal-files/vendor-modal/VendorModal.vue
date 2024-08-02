<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
const visible = ref(true);
const vendorsArray = ref([
    { id: 1, name: 'Vendor 1' },
    { id: 2, name: 'Vendor 2' },
    { id: 3, name: 'Vendor 3' },
    { id: 4, name: 'Vendor 4' },
    { id: 5, name: 'Vendor 5' },
    { id: 5, name: 'Vendor 6' },
    { id: 5, name: 'Vendor 7' },
    { id: 5, name: 'Vendor 8' },
    { id: 5, name: 'Vendor 9' },
    { id: 5, name: 'Vendor 10' },
    { id: 5, name: 'Vendor 11' },
    { id: 5, name: 'Vendor 12' },
    { id: 5, name: 'Vendor 13' },
    { id: 5, name: 'Vendor 14' },
    { id: 5, name: 'Vendor 15' },
]);
</script>
<template>
    <DialogView v-model:visible="visible" :draggable="false" :modal="true" dismissableMask @hide="handleChange" id="vendor-modal" class="w-[720px]">
        <template #header>
            <div class="w-full font-interSemiBold text-h4">Vendor</div>
        </template>
        <div class="relative">
            <img src="@/assets/images/store-order-search.svg" alt="" class="absolute left-3 top-3 text-gray-500 w-[16px] h-[16px]" />
            <input type="text" class="w-full h-[34px] px-[12px] py-[9px] mb-4 border-1 rounded border-[#e9ebef] dark:border-gray-700 outline-none pl-[30px]" placeholder="Search Vendor" />
        </div>
        <div class="bg-[#ffffff] dark:bg-[#313131] font-interRegular max-h-[280px]  overflow-y-auto">
            <div class="flex flex-wrap gap-1">
                <div v-for="vendor in vendorsArray" :key="vendor.id" class="w-full hover:bg-[#f7faff] dark:hover:bg-[#313131] cursor-pointer px-[16px] py-[10px] h-[36px]">
                    <div class="flex items-center justify-items-center h-[16px]">
                        <input type="checkbox" class="w-[16px] h-[16px] text-primary dark:text-white mr-2" />
                        <div class="font-interRegular text-h5">{{ vendor.name }}</div>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end">
                <BaseButton type="secondary" size="medium" name="Reset" :isLoading="false" />
                <BaseButton type="primary" size="medium" name="Apply" :isLoading="false" />
            </div>
        </template>
    </DialogView>
</template>

<style lang="scss">
#vendor-modal {
    @media (max-width: 768px) {
        margin: auto 16px;
    }
    .p-dialog-header {
        padding: 16px 24px !important;
    }
    .p-dialog-content {
        border-top: 1px solid #e9ecef;
        border-bottom: 1px solid #e9ecef;
        max-height: 427px !important;
        padding: 24px !important;
    }
    .p-dialog-footer {
        padding: 16px 24px !important;
    }
    .p-dialog-header .p-dialog-header-icon:focus {
        box-shadow: none !important;
    }
    .p-dialog-header .p-dialog-header-icon:hover {
        background: none !important;
    }
}
</style>
