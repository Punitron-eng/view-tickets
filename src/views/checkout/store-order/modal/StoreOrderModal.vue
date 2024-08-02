<script setup>
import StoreCartModal from '@/views/checkout/store-cart-modal/StoreCartModal.vue';
import { Data } from '@/views/checkout/store-cart-modal/store-data';
import { checkoutStoreVariable } from '../storeOrder';

const dataVariables = checkoutStoreVariable;
</script>

<template>
    <DialogView id="store-action" v-model:visible="dataVariables.showActionModal" :modal="true" :draggable="false" dismissableMask style="z-index: 9999; max-width: 100vw">
        <StoreCartModal :data="Data" :store-modal-data="dataVariables.storeModalData" :product-details="dataVariables.productDetails" type="store" />
    </DialogView>
</template>
../storeOrder
