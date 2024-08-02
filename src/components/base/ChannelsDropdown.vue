<script setup lang="ts">
import { ref, onMounted, computed, defineProps, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { apiHandlerWithFormData } from '../../api/common/api';
import { DARKMODE } from '../../store/dark-mode/constants';
import BaseDropdown from './BaseDropdown.vue';

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

defineProps({
    defaultValue: { type: Number, required: false },
    twClasses: { type: String, required: false },
    anotherVal: { type: Boolean, required: false },
    options: { type: Array<{ id: number, value: string } | null>, required: true },
    placeholder: { type: String, required: false },
    virtualScrollerOptions: { type: Object, required: false },
});

const emits = defineEmits<{
    listenDropdownChange: [val: { id: number, value: string }];
}>();

onMounted(async () => {

});
</script>

<template>
    <BaseDropdown :options="options" :placeholder="placeholder ? placeholder : 'Select Channel'" id="channels-dropdown-base"
        class="channels-dropdown-base" :tw-classes="twClasses ? twClasses : ``" @listen-dropdown-change="(e: any) => $emit('listenDropdownChange', e)" :virtualScrollerOptions="virtualScrollerOptions ? virtualScrollerOptions : { itemSize: 22 }" />
</template>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

#channels-dropdown-base {
    .p-inputtext {
        padding: 0px;
    }

    .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
        background: transparent;
    }

    height: $dropdown-height;
    // padding: $dropdown-padding;
    line-height: 1.25rem !important;

    @include theme() {
        border: 1px solid theme-get('input-border-color');
    }
}

#channels-dropdown-base.p-inputwrapper-focus {
    @include theme() {
        border: 2px solid theme-get('input-focused-border');
    }
}
</style>