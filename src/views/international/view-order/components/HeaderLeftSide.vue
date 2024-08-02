<template>
    <DropdownView
        v-model="dataVariables.selectedSetting"
        :options="dataVariables?.dropdownStoreDetails?.data || []"
        optionLabel="store_name"
        optionValue="id"
        placeholder="Select an option"
        class="setting-dropdown rounded-[6px] h-[28px] w-[170px] max-w-[170px]"
    >
        <template #value="slotProps">
            <div v-if="value" class="flex align-items-center text-[12px] p-0 !dark:bg-transparent">
                <div>
                    <!-- <img alt="store-icon" src="../../../../assets/images/store-icon.png" class="mr-2" style="width: 18px" /> -->
                    {{ slotProps.value.store_name }}
                </div>
            </div>
        </template>
        <template #option="slotProps">
            <div class="option-item">
                <div class="select-options">
                    <div class="option-name text-[13px]" @click="getStoreId(slotProps.option.id)">{{ slotProps.option.store_name }}</div>
                </div>
            </div>
        </template>
    </DropdownView>
</template>

<script setup>
import { useStore } from 'vuex';
import { viewOrderVariables } from '../viewOrder';
import { STOREORDER } from '@/store/checkout/store-order/constants';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';

const store = useStore();
const dataVariables = viewOrderVariables;
const getStoreId = async (tempStoreId) => {
    await store.dispatch(`${STOREORDER.NAME}/getStoreId`, tempStoreId);
    await dataTableFncs.getDataTableData();
};
</script>
<style>
.dark .checkout-store .p-inputtext {
    background-color: red !important;
}

.checkout-store .p-inputtext {
    padding: 4px 10px;
    font-size: 13px;
}
</style>
