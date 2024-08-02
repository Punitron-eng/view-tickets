<script setup lang="ts">
import RadioButton from 'primevue/radiobutton';
import { ref } from 'vue';
const emits = defineEmits(['radioInputValues'])
const radioValue = ref('');
const inputs = [
    { id:'1', value : 'Yes'},
    { id: '2', value : 'No'},
]
const radioValues = () => {
    console.log(radioValue,'radio values');
    emits('radioInputValues', radioValue,);
}

</script>
<template>
    <div class="flex md:items-center w-[248px] h-[auto] md:h-[40px] md:mt-[27px] gap-[11px]">
        <div v-for="input in inputs" class="md:ml-[42px]">
            <RadioButton v-model="radioValue" :inputId="input.id" :name="input.value" :value="input.value" @change="radioValues"/>
            <label :for=input.id class="ml-2 dark:text-[#dfdfdf] text-[13px]">{{input.value}}</label>
        </div>
    </div>
</template>

<style lang="scss">

</style>