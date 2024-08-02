<template>
    <Textarea v-model="commonModel" :rows="props.rows" :cols="props.cols" :class="props?.twClasses" class="text-area" />
</template>

<script setup>
import Textarea from 'primevue/textarea';
import { defineProps, defineModel } from 'vue';

const props = defineProps({
    rows: { type: Number, default: 5 },
    cols: { type: Number, default: 30 },
    twClasses: { type: String, required: false },
});

const commonModel = defineModel();
</script>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

.text-area.p-inputtextarea {
    background: #4d4d4d !important;
    font-family: $interRegular !important;

    &::placeholder {
        font-family: $interRegular !important;
    }
}
.darkTheme .text-area.p-inputtextarea {
    border: 1px solid #5d5d5d;
    background: #4d4d4d !important;
}
.lightTheme .text-area.p-inputtext:enabled:hover {
    border-color: #dfe3e6;
}
.darkTheme .text-area.p-inputtext:enabled:hover {
    border-color: #4d4d4d;
}
.darkTheme .text-area.p-inputtext:enabled:focus {
    border: 1px solid #5d5d5d !important;
}
</style>
