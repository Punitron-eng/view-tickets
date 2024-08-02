<script setup>
import { billingVariable } from '../billing.js';
import ToggleButton from './ToggleButton.vue';

const dataVariables = billingVariable;
</script>
<template>
    <div class="dt-toggle-btns-outer" v-if="dataVariables.router.currentRoute.params.tabs == 'wallet-transaction'">
        <ToggleButton name="wallet_transaction"  />
    </div>
    <div class="dt-toggle-btns-outer" v-if="dataVariables.router.currentRoute.params.tabs == 'shipping-charges'">
        <ToggleButton name="shipping_charges"  />
    </div>
</template>