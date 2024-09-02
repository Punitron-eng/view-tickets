<template>
    <Textarea v-model="trimmedModel" :rows="props.rows" :cols="props.cols" :class="props?.twClasses" class="text-area" />
</template>

<script setup>
import { computed } from 'vue';
import Textarea from 'primevue/textarea';
import { defineProps, defineModel } from 'vue';

const props = defineProps({
    rows: { type: Number, default: 5 },
    cols: { type: Number, default: 30 },
    twClasses: { type: String, required: false },
});

const commonModel = defineModel();

const trimmedModel = computed({
    get() {
        return commonModel.value;
    },
    set(value) {
        commonModel.value = value
            .replace(/\t+/g, '\t') // Allows only one tab space.
            .replace(/[^\S\r\n]+/g, ' ') // Replace multiple spaces with a single space, preserving newlines.
            .replace(/\n{2,}/g, '\n') // Replace multiple newlines with a single newline.
            .trim();
    },
});
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
