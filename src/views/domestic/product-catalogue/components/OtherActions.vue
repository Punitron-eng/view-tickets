<script setup lang="ts">
import ChannelDropdown from './ChannelDropdown.vue';
import StoreDropdown from './StoreDropdown.vue';
import HeaderLeftSide from './HeaderLeftSide.vue';
import { onBeforeMount, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '../../../../util/commonHandlers';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import { productCatalogueVariable } from '../productCatalogue';
import { PRODUCTCATALOGUE } from '@/store/domestic/product-catalogue/constants';
import BulkUploadModal from '../modal/BulkUploadModal.vue';
import { DARKMODE } from '@/store/dark-mode/constants';
import { dataVariables } from '../../../../components/itl-dataTable-files/itl-dataTable-li/dataTableLi';
import config from '../../../../util/config';

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const addProduct = (val, rowId) => {
    console.log(val);
    if (val == 'add') {
        productCatalogueVariable.value.modalType = 'add';
    } else if (val == 'edit') {
        productCatalogueVariable.value.modalType = 'edit';
    } else if (val == 'view') {
        productCatalogueVariable.value.modalType = 'view';
        console.log('dataVariables.value.rowIdValue', productCatalogueVariable.value.rowIdValue);
        console.log('dataTableFncs.tableRowId', dataTableFncs.tableRowId);
    }

    productCatalogueVariable.value.showProductModel = true;
};

const refreshHandler = async () => {
    if (!checkUserType('vendor')) {
        if (productCatalogueVariable.value.getVendorValues.id.length == 0) {
            toast.add({ severity: 'error', detail: 'Please select Vendor', life: 3000 });
            return;
        } else if (productCatalogueVariable.value.getVendorValues.id.length > 1) {
            toast.add({ severity: 'error', detail: 'Please select only one vendor', life: 3000 });
            return;
        }
    }

    if (checkUserType('vendor') ? true : productCatalogueVariable.value.channel.id != 16 && productCatalogueVariable.value.channel.id != 0) {
        if (true) {
            const res = await store.dispatch(`${PRODUCTCATALOGUE.NAME}/syncOrders`, {
                vendor_id: checkUserType('vendor') ? '' : productCatalogueVariable.value.getVendorValues.id[0] || '',
                store_id: productCatalogueVariable.value?.store?.id || '',
                platform_id: productCatalogueVariable.value.channel.id || '',
            });
            if (res.status == 'success') window.open(config.baseUrlPanel + 'view-bg-process-v3', '_blank');
            if (res.status == 'error') toast.add({ severity: 'error', detail: res.html_message, life: 3000 });
            await dataTableFncs.getDataTableData();
        } else {
            if (!checkUserType('vendor')) {
                if (productCatalogueVariable.value.getVendorValues.id.length == 0) {
                    toast.add({ severity: 'error', detail: 'Please select Vendor', life: 3000 });
                } else if (productCatalogueVariable.value.getVendorValues.id.length > 1) {
                    toast.add({ severity: 'error', detail: 'Please select only one vendor', life: 3000 });
                }
            } else {
                toast.add({ severity: 'error', detail: 'Please select Store', life: 3000 });
            }
        }
    }
};

const applyChannel = async () => {
    // console.log('E', option)
    productCatalogueVariable.value.store = null;
    // productCatalogueVariable.value.channel = productVariables.value.channel;
    const tempFormat = [productCatalogueVariable.value.channel.id + ',' + productCatalogueVariable.value.channel.value];
    const data = [
        {
            type: 'multiSelect',
            platform_name: tempFormat,
        },
    ];
    // store.dispatch(`${PRODUCTCATALOGUE.NAME}/setChannelValue`, dataVariables.value.channel);
    store.commit(`${PRODUCTCATALOGUE.NAME}/setFilterValueData`, data);

    // const tempFormat2 = [];
    // const data2 = [
    //     {
    //         type: 'multiSelect',
    //         store: tempFormat2
    //     }
    // ]
    // // store.dispatch(`${PRODUCTCATALOGUE.NAME}/setChannelValue`, dataVariables.value.channel);
    // store.commit(`${PRODUCTCATALOGUE.NAME}/setFilterValueData`, data2);
    // clearStore();

    productCatalogueVariable.value.store = '';
    productCatalogueVariable.value.storeOptions = [];
    const tempFormat2 = ['' + ',' + ''];
    const data2 = [
        {
            type: 'multiSelect',
            store: tempFormat2,
        },
    ];
    store.commit(`${PRODUCTCATALOGUE.NAME}/setFilterValueData`, data2);

    if (
        checkUserType('vendor') && productCatalogueVariable.value.channel.id != 16 && productCatalogueVariable.value.channel.id != 0
            ? true
            : productCatalogueVariable.value.getVendorValues.id.length == 1 && productCatalogueVariable.value.channel.id != 16 && productCatalogueVariable.value.channel.id != 0
    ) {
        const temp = productCatalogueVariable.value.getVendorValues.id.map((el) => Number(el));
        const res = await store.dispatch(`${PRODUCTCATALOGUE.NAME}/fetchStores`, {
            // vendor_id: productCatalogueVariable.value.getVendorValues.id[0] || '',
            // vendor_id: JSON.stringify(dataVariables.value.getVendorValues.id),
            vendor_id: temp,
            platform_id: productCatalogueVariable.value.channel.id,
            module_name: 'product-catalogue',
        });
        console.log('🟢ued', res.data[0]);
        productCatalogueVariable.value.store = '';
        productCatalogueVariable.value.storeOptions = [];
        if (res.status == 'success') {
            productCatalogueVariable.value.storeOptions = res.data;
            // productVariables.value.storeOptions = fetchedStores.data;
            productCatalogueVariable.value.store = res.data[0];
            productCatalogueVariable.value.store = res.data[0];
        }
        const tempFormat2 = [productCatalogueVariable.value.store.id + ',' + productCatalogueVariable.value.store.value];
        const data2 = [
            {
                type: 'multiSelect',
                store: tempFormat2,
            },
        ];
        store.commit(`${PRODUCTCATALOGUE.NAME}/setFilterValueData`, data2);
    }

    if (productCatalogueVariable.value.channel.id == 16 || productCatalogueVariable.value.channel.id == 0) {
        await dataTableFncs.getDataTableData();
    } else {
        await dataTableFncs.getDataTableData();
    }
};

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
    <div class="flex items-center justify-end gap-3">
        <!-- <ChannelDropdown />
        <StoreDropdown /> -->

        <Dropdown
            v-if="productCatalogueVariable.showDropdowns"
            @change="applyChannel()"
            filter
            v-model="productCatalogueVariable.channel"
            :auto-option-focus="false"
            optionLabel="value"
            :options="productCatalogueVariable.channelOptions"
            :placeholder="productCatalogueVariable.channel.value || 'Select Channel'"
            class="w-[auto] hidden lg:flex xl:hidden pc-dt-dropdown-channel-store"
            id="pc-dt-dropdown-channel-store"
        >
            <template #value="slotProps">
                <div v-if="value">
                    <div class="truncate">{{ slotProps.value }}</div>
                </div>
            </template>
            <template #option="slotProps">
                <div class="flex items-center justify-between">
                    <div class="truncate">{{ slotProps.option.value }}</div>
                    <img v-if="!darkModeVal" v-show="productCatalogueVariable.channel.id == slotProps.option.id" class="check-sign" src="../../../../assets/images/IcOutlineCheck.svg" width="14" height="14" alt="Check Sign" />
                    <img v-else v-show="productCatalogueVariable.channel.id == slotProps.option.id" class="check-sign" src="../../../../assets/images/dark-mode/dark-IcOutlineCheck.svg" width="14" height="14" alt="Check Sign" />
                </div>
            </template>
        </Dropdown>
        <div
            v-if="
                productCatalogueVariable.showDropdowns &&
                (checkUserType('vendor') && productCatalogueVariable.channel.id != 16 && productCatalogueVariable.channel.id != 0 && productCatalogueVariable.storeOptions.length > 0
                    ? true
                    : productCatalogueVariable.getVendorValues.id.length == 1 && productCatalogueVariable.channel.id != 16 && productCatalogueVariable.channel.id != 0)
            "
            class="w-[auto] hidden lg:flex xl:hidden"
        >
            <Dropdown
                @change="applyStore()"
                filter
                :auto-option-focus="false"
                optionLabel="value"
                v-model="productCatalogueVariable.store"
                :options="productCatalogueVariable.storeOptions"
                :placeholder="productCatalogueVariable.store.value || 'Select Store'"
                class="w-[auto] hidden lg:flex xl:hidden"
                id="pc-dt-dropdown-channel-store"
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
        <button class="hidden lg:block bg-[#1279ff] text-[#fff] px-2 py-1 h-8 rounded-md">
            <div class="flex items-center justify-start gap-2" v-if="checkAccessRight('product_catalogue') ? true : deepCheckAccessRight('domestic', 'product_catalogue', 'add')" @click="addProduct('add')">
                <img v-if="!darkModeVal" height="12" width="12" src="@/assets/images/plus-circle.svg" />
                <img v-else height="12" width="12" src="@/assets/images/dark-mode/dark-plus-circle.svg" />
                <span class="text-[#fff] text-sm">Add Product</span>
            </div>
        </button>
        <button @click="refreshHandler()" class="refresh-btn-pc" v-if="checkAccessRight('product_catalogue') ? true : deepCheckAccessRight('domestic', 'product_catalogue', 'sync')">
            <img v-if="!darkModeVal" height="12" width="12" src="@/assets/images/refresh-icon.svg" />
            <img v-else height="12" width="12" src="@/assets/images/dark-mode/dark-refresh-icon.svg" />
        </button>
        <BulkUploadModal />
    </div>
</template>

<style lang="scss">
.darkTheme {
    #pc-dt-dropdown-channel-store.p-dropdown {
        background-color: #313131 !important;
    }
}

#pc-dt-dropdown-channel-store.p-dropdown {
    height: 28px;
}
</style>
