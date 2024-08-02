<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['switchData']);
const emit = defineEmits(['update:switchData']);

const handleClick = (event) => {
    const isActiveValue = event.target.textContent.trim();
    const updatedData = props.switchData.map(item => ({
        ...item,
        isActive: item.label === isActiveValue
    }));
    emit('update:switchData', updatedData);
};
</script>

<template>
    <div class="flex justify-between items-center gap-4">
        <button @click="handleClick($event)" class="capitalize" v-for="ele in switchData" :key="ele.label"
            :class="ele.isActive ? 'mb-[0px] font-interSemiBold' : 'mb-[5px] font-interRegular'">
            {{ ele.label }}
            <div class="h-[5px] w-full bg-itl-primary rounded-t-itl-sm" :class="ele.isActive ? 'block' : 'hidden'" />
        </button>
    </div>
</template>
