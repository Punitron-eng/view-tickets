<template>
        <button
            :class="props.buttonValue.class"
            :type="props.buttonValue.button"
            @click ='props.clickevent'
        >
        <div v-if="loading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
        <div v-else>
            {{ props.buttonValue.text  }}
        </div>
        </button>
</template>
<script setup>
    const props = defineProps (['buttonValue','clickevent','loading'])
</script>