<template>
    <div class="amount-filter flex gap-4">
        <div class="flex flex-col gap-1">
            <label for="min"> Min </label>
            <input type="number" class="w-[104px] h-[34px] min-filter-input rounded-[4px] px-2" v-model="tempValue.min" placeholder="Min" @keypress="validateNumber($event)" @input="updateValue('min', $event.target.value)" />
        </div>
        <div class="flex flex-col gap-1">
            <label for="max"> Max </label>
            <input type="number" class="w-[104px] h-[34px] max-filter-input rounded-[4px] px-2" v-model="tempValue.max" placeholder="Max" @keypress="validateNumber($event)" @input="updateValue('max', $event.target.value)" />
        </div>
    </div>
</template>
<script setup>
import { ref, defineProps, watch, defineEmits } from 'vue';
const props = defineProps(['modalRefs', 'id']);
const emit = defineEmits(['updateMinMax']);
const tempValue = ref({ min: '', max: '' });
watch(
    () => props.modalRefs,
    (newValue) => {
        tempValue.value = { ...newValue };
    },
    { immediate: true }
);
const validateNumber = (e) => {
    const charCode = !e.charCode ? e.which : e.charCode;
    const input = e.target.value + String.fromCharCode(charCode);
    // Allow numbers with up to three decimal places
    if (!/^\d*\.?\d{0,3}$/.test(input)) {
        e.preventDefault();
        return false;
    }
    return true;
};
const updateValue = (key, value) => {
    tempValue.value[key] = value;
    emit('updateMinMax', tempValue.value, props.id.field);
};
</script>
