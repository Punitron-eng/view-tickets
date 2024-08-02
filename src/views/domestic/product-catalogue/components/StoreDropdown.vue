<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import { checkUserType } from '../../../../util/commonHandlers';
import { productCatalogueVariable } from '../productCatalogue';
import { PRODUCTCATALOGUE } from '@/store/domestic/product-catalogue/constants';
import { DARKMODE } from '../../../../store/dark-mode/constants';

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const applyStore = async () => {
    productCatalogueVariable.value.store = productCatalogueVariable.value.store;
    const tempFormat = [productCatalogueVariable.value.store.id + ',' + productCatalogueVariable.value.store.value];
    const data = [
        {
            type: 'multiSelect',
            store: tempFormat,
        },
    ];
    store.commit(`${PRODUCTCATALOGUE.NAME}/setFilterValueData`, data);
    await dataTableFncs.getDataTableData();

    // store.dispatch(`${PRODUCTCATALOGUE.NAME}/setStoreValue`, dataVariables.value.store);
};
</script>
<template>
    <div
        v-if="
            productCatalogueVariable.showDropdowns &&
            (checkUserType('vendor') && productCatalogueVariable.channel.id != 16 && productCatalogueVariable.channel.id != 0 && productCatalogueVariable.storeOptions.length > 0
                ? true
                : productCatalogueVariable.getVendorValues.id.length == 1 && productCatalogueVariable.channel.id != 16 && productCatalogueVariable.channel.id != 0)
        "
        class="w-full h-11 block xl:hidden"
    >
        <Dropdown
            @change="applyStore()"
            filter
            :auto-option-focus="false"
            optionLabel="value"
            v-model="productCatalogueVariable.store"
            :options="productCatalogueVariable.storeOptions"
            :placeholder="productCatalogueVariable.store.value || 'Select Store'"
            id="overlay-channel-store-dropdown"
            class="w-full h-11"
        >
            <template #value="slotProps">
                <div v-if="value">
                    <div class="truncate">{{ slotProps.value }}</div>
                </div>
            </template>
            <template #option="slotProps">
                <div class="flex items-center justify-between">
                    <div class="truncate">{{ slotProps.option.value }}</div>
                    <img v-if="!darkModeVal" v-show="productCatalogueVariable.store.id == slotProps.option.id" class="check-sign" src="../../../../assets/images/IcOutlineCheck.svg" width="14" height="14" alt="Check Sign" />
                    <img v-else v-show="productCatalogueVariable.store.id == slotProps.option.id" class="check-sign" src="../../../../assets/images/dark-mode/dark-IcOutlineCheck.svg" width="14" height="14" alt="Check Sign" />
                </div>
            </template>
        </Dropdown>
    </div>
</template>

<style lang="scss">
.bottomsheet-list {
    .p-dropdown-label {
        padding: 10px 3px 4px 14px !important;
    }
}
</style>
