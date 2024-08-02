<script setup>
import { ref, defineProps,defineEmits, watch } from 'vue';
const props = defineProps(['inputCheckbox','checboxModelValue'])
const emit = defineEmits(['updatedChecboxValue'])
const checboxValue = ref(props.checboxModelValue)
const getCheckboxValue = ()=>{
  emit('updatedChecboxValue',checboxValue.value)
}
watch(() => props.checboxModelValue, (val) =>{ 
   checboxValue.value = val });
</script>
<template>
  <input
    :type="props.inputCheckbox.type"
    :id="props.inputCheckbox.id"
    :name="props.inputCheckbox.name"
    @change="getCheckboxValue()"
    v-model="checboxValue"
    :checked="checboxValue"
    class="styled-checkbox"
  />
</template>

<style>
.styled-checkbox {
  position: absolute;
  opacity: 0;
}
.styled-checkbox + label {
  position: relative;
  cursor: pointer;
  padding: 0;
}
.styled-checkbox + label:before {
  content: "";
  margin-right: 10px;
  display: inline-block;
  vertical-align: text-top;
  width: 14px;
  height: 14px;
  background:none !important;
  border:1px solid #a3aebb;
  border-radius: 2px;
  top: 2px;
  position: relative;
}


.styled-checkbox:checked + label:before {
  background: #1279ff !important;
 
}
.styled-checkbox:disabled + label {
  color: #b8b8b8;
  cursor: auto;
}
.styled-checkbox:disabled + label:before {
  box-shadow: none;
  background: #ddd;
}
.styled-checkbox:checked + label:after {
  content: '';
  display: block;
  position: absolute;
  top: 2px;
  left: 5.5px;
  width: 4px;
  height: 10px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>