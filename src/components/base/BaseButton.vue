<template>
    <button :class="buttonClasses" :name="name" :disabled="props.isLoading">
        <div class="flex items-center justify-center" v-if="props.isLoading">
            <i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i>
        </div>
        <div v-else class="flex items-center" :class="props.isIcon ? 'justify-between gap-[6px]' : 'justify-center'">
            <img v-if="props.isIcon" :src="props.isIcon" class="w-[16px] h-[16px]" />
            {{ name }}
        </div>
    </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary', 'danger'].includes(value),
    },
    isIcon: {
        type: String,
        default: false,
        required: false,
    },
    size: {
        type: String,
        default: 'medium',
        validator: (value) => ['small', 'medium', 'big'].includes(value),
    },
    name: {
        type: String,
        default: 'Submit',
    },
    isLoading: {
        type: Boolean,
        default: false,
        required: false,
    },
});

const buttonClasses = computed(() => {
    return ['btn', `btn-${props.type}`, `btn-${props.size}`];
});
</script>

<style scoped lang="scss">
.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    outline: none;
    min-width: 60px;
}

.btn-primary {
    background-color: #1279ff;
    border: 1px solid #0168ed;
    color: #fff;
}

.btn-secondary {
    @apply bg-[#ffffff] dark:bg-[#313131] dark:text-[#fff] border-[#dfe3e6] dark:border-[#383b40];
    border: 1px solid #dfe3e6;
    color: #575f6c;
}

.btn-danger {
    background-color: #ee596b;
    border: 1px solid #e13a4e;
    color: #fff;
}

.btn-small {
    padding: 6px 12px;
    font-size: 12px;
}

.btn-medium {
    padding: 8px 12px;
    font-size: 12px;
}

.btn-big {
    padding: 12px 24px;
    font-size: 14px;
}
</style>
