<script setup>
import { billingIntlVariable } from '../billingIntl.js';
import ToggleButton from './ToggleButton.vue';

const dataVariables = billingIntlVariable;
</script>
<template>
    <div class="dt-toggle-btns-outer" v-if="dataVariables.router.currentRoute.params.tabs == 'shipping-charges'">
        <ToggleButton name="shipping_charges"  />
    </div>
</template>