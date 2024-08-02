<script setup>
const { headerText } = defineProps(['headerText']);
</script>
<template>
    <div class="flex items-center justify-between w-full">
        <div class="flex text-[20px] font-[500] gap-4">
            <span>{{ headerText }}</span>
            <slot name="left-side"></slot>
        </div>
        <slot name="right-side"></slot>
    </div>
</template>
