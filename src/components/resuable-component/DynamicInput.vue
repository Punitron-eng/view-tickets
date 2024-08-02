<script setup>
import { defineProps,defineEmits,ref, watch} from 'vue';
 const props = defineProps(['inputValues','modelInput'])
 const emit = defineEmits (['inputValue'])
 const textInput = ref(props.modelInput)
 const error = ref('');
 const getInputValue = () =>{
     emit('inputValue',textInput.value)
 }
 watch(() => props.modelInput, (val) =>{
     textInput.value = val
 })
</script>
<template>
     <input  
     :type="props.inputValues.type"
     :class="props.inputValues.class"
     :placeholder="props.inputValues.placeholder"
     :name="props.inputValues.name"
     :id="props.inputValues.id"
     v-model.trim="textInput" 
     autocomplete="off"
     @input="getInputValue()" 
     />
</template>

