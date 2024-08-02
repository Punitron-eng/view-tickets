<script setup>
import { orderManagementVariables } from '../orderManagementChangeReq.js';
import ToggleButton from './ToggleButton.vue';

const dataVariables = orderManagementVariables;
</script>
<template>
    <div class="dt-toggle-btns-outer">
        <ToggleButton />
    </div>
</template>
