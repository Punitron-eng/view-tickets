<script setup>
const { headerText } = defineProps(['headerText']);
</script>
<template>
    <div class="flex items-center justify-between w-full">
        <div class="text-[20px] font-[500] flex gap-2 ml-3 md:m-0">
            <slot name="left-side-img"></slot>
            <span>{{ headerText }}</span>
        </div>
        <slot name="right-side"></slot>
    </div>
</template>
