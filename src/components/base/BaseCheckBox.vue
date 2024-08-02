<script setup lang="ts">
import { computed, ref } from 'vue';

interface CheckBox {
    id: number,
    value: string,
    is_checked: boolean
}

const emits = defineEmits<{
    listenCheckboxChange: [val: CheckBox]
}>();

const props = defineProps({
    disabled: { type: Boolean, required: false },
    data: { type: Object as () => CheckBox, required: true }
});

const checkBoxValue = ref<CheckBox>(props?.data || null);

// const generateIdAndForHTML = () => {

// } 

const generateIdAndForHTML = computed(() => {
    let temp = (checkBoxValue.value.id + checkBoxValue.value.value).toLowerCase();
    return temp;
})
</script>

<template>
    <div class="flex items-center gap-2">
        <input :disabled="props.disabled" v-model="checkBoxValue.is_checked" :id="generateIdAndForHTML" type="checkbox"
            @change="() => $emit('listenCheckboxChange', checkBoxValue)" />
        <label :class="props.disabled ? 'text-[#8b8a8a] dark:text-[#8b8a8a]' : ''"
            class="text-[13px] text-[#1d252b] dark:text-[#dfdfdf]" :for="generateIdAndForHTML">{{ checkBoxValue.value
            }}</label>
    </div>
</template>

<style scoped>
input[type=checkbox] {
    width: 16px;
    height: 16px;
}
</style>