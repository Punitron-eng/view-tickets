<template>
    <div v-if="col.field === 'vendor_entered_weight'" class="dropdown-div dropdown-div-outer" :class="data.vendor_entered_weight.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" @click="overlay.toggle($event), dataDropdownToggle($event, data.vendor_entered_weight, index, col.field)">
            {{ `${data.vendor_entered_weight['entered_kg']} kg` }}
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <ITLWeight :weight-data="dataVariables.selectedCharge" :rowId="data.row_id" />
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'order_weight'" class="dropdown-div dropdown-div-outer" :class="data.order_weight.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" @click="overlay.toggle($event), dataDropdownToggle($event, data.order_weight, index, col.field)">
            {{ `${data.order_weight['entered_kg']} kg` }}
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <!-- {{ dataVariables.selectedCharge }} -->
            <ITLWeight :weight-data="dataVariables.selectedCharge" :rowId="data.row_id" :haveAccessParcel="props.haveAccessParcel" />
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'product_weight'" class="dropdown-div dropdown-div-outer" :class="data.product_weight.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" @click="overlay.toggle($event), dataDropdownToggle($event, data.product_weight, index, col.field)">
            {{ `${data.product_weight['entered_kg']} kg` }}
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <!-- {{ dataVariables.selectedCharge }} -->
            <ITLWeight :weight-data="dataVariables.selectedCharge" :rowId="data.row_id" :haveAccessParcel="props.haveAccessParcel" />
        </OverlayPanel>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ITLWeight from '../../../common-modal-files/ITLWeight.vue';
import { dataTableVariables as dataVariables } from '../dataTable';
const { data, col, props, index, dataDropdownToggle } = defineProps(['data', 'col', 'props', 'index', 'dataDropdownToggle']);
const overlay = ref(null);
</script>
