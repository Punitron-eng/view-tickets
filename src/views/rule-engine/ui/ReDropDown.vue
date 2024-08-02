<script setup lang="ts">
import { ref } from 'vue';
import BaseDropdown from '../../../components/base/BaseDropdown.vue';
const props = defineProps(['dropdownOption', 'id'])
const selectedState = ref('')
// console.log("selected state value",selectedState.value);
console.log('dropdown props',props.dropdownOption);
const emits = defineEmits(['handleDropdown']);
const dropdown = () => {
    // console.log('dropdown function selectedState.value',selectedState.value, id,':id')
    emits('handleDropdown', selectedState.value);
}

</script>

<template>
    <div>
        <label class="block font-medium mb-[8px] text-[13px] text-[#374151] font-inter dark:text-[#dfdfdf]">
            {{ dropdownOption.label }}
        </label>
        <BaseDropdown @listenDropdownChange="(val:any) => selectedState = val" :options="dropdownOption.options"
            :filter="false" placeholder="Select Value" twClasses="w-[100%]"
            class="bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] flex w-[100%] h-[40px] rounded-[6px] dark:border-[#474747]"
           @change="dropdown" />
    </div>
    <div class="absolute left-[32px] bottom-[11px] dark:text-[#dfdfdf]">{{ dropdownOption.note ? `Note: ${dropdownOption.note}` : '' }}</div>
</template>

<style lang="scss">

</style>