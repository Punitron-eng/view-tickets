<template>
  <input :type="inputType" :id="id" :class="twClasses" :placeholder="placeholder" v-model="commonModel" :maxlength="maxLength" class="base-input px-3 py-2 border rounded dark:bg-transparent leading-5" />
</template>
<script setup>
  import { defineProps, defineModel } from 'vue';
  const { inputType, id, twClasses, placeholder, maxLength } = defineProps(['inputType', 'id', 'twClasses', 'placeholder', 'maxLength']);
  const commonModel = defineModel();
</script>

<style lang="scss" scoped>
@import '../../assets/itl-common-css/common-css.scss';
.base-input{
  height: 32px;
  @include theme(){
      border-color: theme-get('border-black-500');
  };
}
</style>