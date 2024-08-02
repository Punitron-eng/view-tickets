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

// onBeforeMount(async () => {
//     productCatalogueVariable.value.showDropdowns = true;
//     await fetchChannelsAndStores();
// })

// const fetchChannelsAndStores = async () => {
//     // clearStore();
//     const res = await store.dispatch(`${PRODUCTCATALOGUE.NAME}/fetchChannels`, { module: 1, vendor_id: JSON.stringify(productCatalogueVariable.value.getVendorValues.id) });
//     if (res.status == 'success') {
//         productCatalogueVariable.value.channelOptions = res.data;
//         productCatalogueVariable.value.channel = res.data[0];
//         // dataVariables.value.channel = res.data[0];

//         const tempFormat = [productCatalogueVariable.value.channel.id + ',' + productCatalogueVariable.value.channel.value];
//         const data = [
//             {
//                 type: 'multiSelect',
//                 channel: tempFormat
//             }
//         ]
//         // store.dispatch(`${PRODUCTCATALOGUE.NAME}/setChannelValue`, dataVariables.value.channel);
//         store.commit(`${PRODUCTCATALOGUE.NAME}/setFilterValueData`, data);

//         // alert('hellooooo'+ dataVariables.value.getVendorValues.id.length)
//         if ((checkUserType('vendor') ? true : productCatalogueVariable.value.getVendorValues.id.length == 1)) {
//             const fetchedStores = await store.dispatch(`${PRODUCTCATALOGUE.NAME}/fetchStores`, {
//                 vendor_id: productCatalogueVariable.value.getVendorValues.id[0] || '',
//                 // vendor_id: 9,
//                 // vendor_id: JSON.stringify(dataVariables.value.getVendorValues.id),
//                 platform_id: productCatalogueVariable.value.channel.id,
//                 module_name: 'product-catalogue'
//             });
//             if (fetchedStores.status == 'success') {
//                 productCatalogueVariable.value.storeOptions = fetchedStores.data;
//                 productCatalogueVariable.value.store = fetchedStores.data[0];

//                 // dataVariables.value.store = fetchedStores.data[0];
//             }

//             const tempFormat2 = [productCatalogueVariable.value.store.id + ',' + productCatalogueVariable.value.store.value];
//             const data2 = [
//                 {
//                     type: 'multiSelect',
//                     store: tempFormat2
//                 }
//             ]
//             store.commit(`${PRODUCTCATALOGUE.NAME}/setFilterValueData`, data2);
//         }
//     }
//     return true;
// }

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

// const applyStore = async () => {
//     productCatalogueVariable.value.store = productCatalogueVariable.value.store;
//     const tempFormat = [productCatalogueVariable.value.store.id + ',' + productCatalogueVariable.value.store.value];
//     const data = [
//         {
//             type: 'multiSelect',
//             store: tempFormat
//         }
//     ]
//     store.commit(`${PRODUCTCATALOGUE.NAME}/setFilterValueData`, data);
//     await dataTableFncs.getDataTableData();

//     // store.dispatch(`${PRODUCTCATALOGUE.NAME}/setStoreValue`, dataVariables.value.store);
// }
</script>
<template>
    <div class="w-full h-11">
        <Dropdown
            id="overlay-channel-store-dropdown"
            v-if="productCatalogueVariable.showDropdowns"
            @change="applyChannel()"
            filter
            v-model="productCatalogueVariable.channel"
            :auto-option-focus="false"
            optionLabel="value"
            :options="productCatalogueVariable.channelOptions"
            :placeholder="productCatalogueVariable.channel.value || 'Select Channel'"
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
                    <img v-if="!darkModeVal" v-show="productCatalogueVariable.channel.id == slotProps.option.id" class="check-sign" src="../../../../assets/images/IcOutlineCheck.svg" width="14" height="14" alt="Check Sign" />
                    <img v-else v-show="productCatalogueVariable.channel.id == slotProps.option.id" class="check-sign" src="../../../../assets/images/dark-mode/dark-IcOutlineCheck.svg" width="14" height="14" alt="Check Sign" />
                </div>
            </template>
        </Dropdown>
    </div>
    <!-- <li v-if="productCatalogueVariable.showDropdowns && ((checkUserType('vendor') && productCatalogueVariable.channel.id != 16 && productCatalogueVariable.channel.id != 0 && productCatalogueVariable.storeOptions.length > 0) ? true : (productCatalogueVariable.getVendorValues.id.length == 1) && productCatalogueVariable.channel.id != 16 && productCatalogueVariable.channel.id != 0)"
            class="ml-2 hidden xl:block">
            <Dropdown @change="applyStore()" filter :auto-option-focus="false" optionLabel="value"
                v-model="productCatalogueVariable.store" :options="productCatalogueVariable.storeOptions" placeholder="Select Store"
                class="w-12rem">
                <template #value="slotProps">
                    <div v-if="value">
                        <div class="truncate">{{ slotProps.value }}</div>
                    </div>
                </template>
                <template #option="slotProps">
                    <div class="flex items-center justify-between">
                        <div class="truncate">{{ slotProps.option.value }}</div>
                        <img v-if="!darkModeVal" v-show="productCatalogueVariable.store.id == slotProps.option.id"
                            class="check-sign" src="../../../../assets/images/IcOutlineCheck.svg" width="14" height="14"
                            alt="Check Sign" />
                        <img v-else v-show="productCatalogueVariable.store.id == slotProps.option.id" class="check-sign"
                            src="../../../../assets/images/dark-mode/dark-IcOutlineCheck.svg" width="14" height="14"
                            alt="Check Sign" />
                    </div>
                </template>
            </Dropdown>
        </li> -->
</template>

<style lang="scss">
#overlay-channel-store-dropdown.p-dropdown {
    height: 2.75rem !important;
}
</style>
