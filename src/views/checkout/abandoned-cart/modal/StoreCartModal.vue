<script setup>
import StoreCartModal from '@/views/checkout/store-cart-modal/StoreCartModal.vue';
import { Data } from '@/views/checkout/store-cart-modal/store-data';
import { checkoutStoreVariable } from '../abandonedCart';

const dataVariables = checkoutStoreVariable;
</script>
<template>
    <DialogView id="store-action" v-model:visible="dataVariables.showActionModal" :modal="true" :draggable="false" dismissableMask style="z-index: 9999; max-width: 100vw">
        <StoreCartModal :data="Data" :store-modal-data="dataVariables.abandonedModalData" :product-details="dataVariables.productDetails" type="abandoned" />
    </DialogView>
</template>
../abandonedCart
