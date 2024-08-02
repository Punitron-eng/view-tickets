<template>
    <div class="dt-toggle-btns-outer" v-if="dataVariables.router.currentRoute.params.tabs == 'open'">
        <ToggleButton name="open" />
    </div>
</template>

<script setup>
import { viewTicketVariables } from '../viewTicketVariables.js';
import ToggleButton from './ToggleButton.vue';
const dataVariables = viewTicketVariables;
</script>
