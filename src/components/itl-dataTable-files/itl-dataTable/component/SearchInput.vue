<template>
    <img src="@/assets/images/store-order-search.svg" alt="" class="searchimg" />
    <input type="text" class="form-control" v-model="dataVariables.orderSearch" @keydown.enter="orderSearchData" @input="onInputOrder" :placeholder="placeholder ? placeholder : 'Search Order ID Or AWB'" />
    <div v-if="dataVariables.orderSearch" class="cross-icon-section cursor-pointer" @click="clearInputField()">
        <img v-if="!darkModeVal" src="@/assets/images/selected-list-close.svg" alt="close" class="mt-[10px]" />
        <img v-else src="@/assets/images/dark-mode/dark-selected-list-close.svg" alt="close" class="mt-[10px] w-[10px]" />
    </div>
</template>

<script setup>
// import { returnFlowVariables as dataVariables } from '../returnFlow.js';
import { dataTableVariables as dataVariables } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';

import { computed, defineEmits, inject } from 'vue';
import { useStore } from 'vuex';
import { DARKMODE } from '@/store/dark-mode/constants';

const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const placeholder = inject('placeholder');
const emits = defineEmits(['orderSearch']);

const orderSearchData = async () => {
    if (dataVariables.value.orderSearch != '') {
        emits('orderSearch', dataVariables.value.orderSearch);
    }
};
const onInputOrder = () => {
    if (dataVariables.value.orderSearch !== '') {
        dataVariables.value.hiddenClass = '';
    } else {
        dataVariables.value.hiddenClass = 'hidden';
    }
};
const clearInputField = async () => {
    dataVariables.value.orderSearch = '';
    emits('orderSearch', dataVariables.value.orderSearch);
    // await store.dispatch(`${RETURN.NAME}/getOrderInput`, dataVariables.value.orderSearch);
    // await getColumnData();
    // await getBillingData();
    // await getAllWidgetValueData();
    dataVariables.value.hiddenClass = 'hidden';
};
</script>
