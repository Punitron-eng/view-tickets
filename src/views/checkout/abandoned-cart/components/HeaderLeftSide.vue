<template>
    <DropdownView
        v-if="checkUserType('vendor')"
        v-model="dataVariables.selectedSetting"
        :options="dataVariables.dropdownStoreDetails"
        optionLabel="store_name"
        :auto-option-focus="false"
        optionValue="id"
        placeholder="Select Store"
        class="checkout-aband-dropdown md:border-none rounded-[6px] h-[28px] md:w-[170px] md:max-w-[170px]"
    >
        <template #value="slotProps">
            <div v-if="value" class="flex align-items-center text-[13px]">
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
import { checkUserType } from '@/util/commonHandlers';
import { checkoutStoreVariable } from '../abandonedCart.js';
import { ABANDONEDCART } from '@/store/checkout/abandoned-cart/constants';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';

const store = useStore();
const dataVariables = checkoutStoreVariable;
const getStoreId = async (tempStoreId) => {
    await store.dispatch(`${ABANDONEDCART.NAME}/getStoreId`, tempStoreId);
    await dataTableFncs.getDataTableData();
};
</script>
<style lang="scss">
@import '../../../../assets/itl-common-css/common-css.scss';

.dark .checkout-aband .p-inputtext {
    background-color: red !important;
}

.checkout-aband .p-inputtext {
    padding: 4px 10px;
    font-size: 13px;
}

.checkout-aband {
    .p-dropdown-panel {
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.05), 0 10px 15px 0 rgba(0, 0, 0, 0.1);
        border: none !important;
    }
}

.checkout-aband {
    .p-dropdown-trigger {
        svg {
            width: 12px !important;
            height: 12px !important;
        }
    }
}

.checkout-aband-dropdown {
    @include theme() {
        border: 1px solid theme-get('border-black-500') !important;
    }

    @media screen and (max-width: 991px) {
        @include theme() {
            min-width: 100% !important;
            border: 0px solid theme-get('border-black-500') !important;
        }
    }
}
</style>
../abandonedCart.js
