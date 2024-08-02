<template>
    <label :for="labelFor" :class="twClasses" class="label-text block mb-1 leading-6">
        {{ labelText }}
        <span v-if="showAsterisk" class="asterisk">*</span>
    </label>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    labelText: {
        type: String,
        required: true,
    },
    labelFor: {
        type: String,
        default: '',
    },
    twClasses: {
        type: String,
        default: '',
    },
    showAsterisk: {
        type: Boolean,
        default: false,
    },
});
</script>
<style lang="scss" scoped>
@import '../../assets/itl-common-css/common-css.scss';
.label-text {
    font-size: $fontSize12;
    font-family: $interRegular;
    @include theme() {
        color: theme-get('label-clr');
    }
}
.asterisk {
    font-size: $fontSize14;
    font-family: $interRegular;
    @include theme() {
        color: theme-get('error-message');
    }
}
</style>
