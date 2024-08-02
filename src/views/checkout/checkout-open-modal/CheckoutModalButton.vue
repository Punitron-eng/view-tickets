<template>
  <ButtonView @click="visible = true" >Open </ButtonView>

<DialogView v-model:visible="visible" modal maximizable style=" z-index: 9999  ;" >
            <ModalComponent :close="closeModal" />
</DialogView>

  </template>
  
  <script setup>
  import { ref } from "vue";
  import ModalComponent from './CheckoutOpenModal.vue'
  const visible = ref(false);
  const closeModal = ()=>{
    visible.value=false
  }
  </script>
  
  <style >
  .p-overflow-hidden .layout-topbar {
    z-index: 99 !important;
  }
.p-dialog-header-icons{
    display: flex;
    flex-direction: row-reverse;
    width: fit-content;
    gap:8px;
}
.p-dialog-header-close{
    width:20px;
    height: 20px;
}
.p-column-title{
  font-size: 10px;
  color: #656f7d;

}
.p-datatable-thead > tr > th  {
  padding: 0.3rem 0.3rem !important;
  background-color: #f4f7f9;
  text-transform: uppercase;
}
.p-datatable-tbody > tr > td{
  padding:0.5rem 0.5rem !important; 
  color:#0c0c0d;
}
.p-dialog-content{
  border-radius: 0px !important;
}
.p-dialog-header{
    padding:1.3rem 3px 3px 1.3rem !important;
    position: absolute !important;
    z-index: 99 !important;
}
.p-dialog-content{
    position: relative;
}
</style> 