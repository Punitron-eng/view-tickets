<template>
    <label
     :for = "lableValues.forLabel"
     :class="lableValues.class">
     {{ lableValues.lableName}}
    </label>
</template>
<script>
// import { defineProps } from 'vue';
// const props = defineProps(['lableValues']);
 export default {
    props: ['lableValues']
 }
</script>