<script setup>
import { returnFlowVariables } from '../returnFlow.js';
import ToggleButton from './ToggleButton.vue';

const dataVariables = returnFlowVariables;
</script>
<template>
    <div class="dt-toggle-btns-outer" v-if="dataVariables.router.currentRoute.params.tabs == 'rev-manifest'">
        <ToggleButton name="rev_manifest" />
    </div>
    <div class="dt-toggle-btns-outer" v-if="dataVariables.router.currentRoute.params.tabs == 'rev-return-request'">
        <ToggleButton name="rev_return_request" />
    </div>
</template>
