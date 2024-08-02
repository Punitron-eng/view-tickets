<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    value: { type: Boolean, required: true } 
});

const emits = defineEmits<{
    listenToggleChange: [val: boolean]
}>();

const toggleValue = ref<boolean>(props?.value || false);

watch(() => props.value, () => {
    toggleValue.value = props.value;
})
</script>

<template>
    <InputSwitch id="common-toggle" v-model="toggleValue" @change="() => $emit('listenToggleChange', toggleValue)" />
</template>

<style lang="scss">
#common-toggle.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
    background: #0052cc;
}

#common-toggle.p-inputswitch {
    width: 2.8rem;
    height: 1.5rem;
}

#common-toggle.p-inputswitch .p-inputswitch-slider:before {
    width: 1rem;
    height: 1rem;
    left: 0.2rem;
    right: 0.2rem;
    margin-top: -0.5rem;
}

#common-toggle.p-inputswitch.p-focus .p-inputswitch-slider {
    box-shadow: none;
}</style>