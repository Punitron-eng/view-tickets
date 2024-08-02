<script setup lang="ts">
// import { ref } from 'vue';

const defaultClasses: string = 'w-auto';

// const isLoading = ref(false);

const props = defineProps({
    isLoading: { type: Boolean, required: false },
    text: { type: String, required: true },
    twClasses: { type: String, requied: false },
});
</script>

<template>
    <button class="submit-btn" :class="props?.twClasses || defaultClasses">
        <div class="flex items-center justify-center" v-if="props.isLoading">
            <i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i>
        </div>
        <div v-else>{{ props.text }}</div>
    </button>
</template>

<style scoped lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

.submit-btn {
    background-color: $backgroundBlue;
    color: $whiteColor;
    outline: none;
    // width: 80px;
    height: 32px;
    border-radius: 50px;
    cursor: pointer;
    font-family: $helveticaRegular;
    padding: 2px 0px;
}
</style>
