<script lang="ts" setup>
import { ref } from "vue";
const isModalOpen = ref(false);
const viewModalOpen = ref(false);
const openModal = () => {
isModalOpen.value = true;
document.body.style.overflow = 'hidden';
};
const closeModal = () => {
isModalOpen.value = false;
viewModalOpen.value = false;
document.body.style.overflow = '';
};
</script>
<template>
    <span class="cursor-pointer text-[#0052CC] dark:text-[#78c7ff] font-medium text-[13px]" @click="openModal">View Samples</span>
    <div class="modals" v-if="isModalOpen">
        <div class="modals-content flex flex-col gap-3 bg-[white] dark:bg-[#3d3d3d]">
            <div class="relative modals-header px-[1.8rem] md:px-[3.8rem] pt-[20px] pb-[13px] m-0 border-none flex flex-col justify-start items-start md:flex-row  md:items-center md:gap-[25%] ">
                <h2 class="my-0">Pan Card</h2>
                <span class="lg:pl-[15%]">Sample & Instruction</span>
                <button class="absolute close-btn md:right-[64px]" @click="closeModal">×</button>
            </div>
            <div class="px-[1.8rem] md:px-[3.8rem] py-4 modals-body bg-[#e5e7eb]">
                <img src="../../../assets/images/kyc-modal-pan-card.png">
            </div>
            <div class="px-[1.8rem] md:px-[3.8rem] pb-3 modals-footer flex flex-col justify-start items-start lg:gap-[5px]">
                      <p class="m-0">1. Make sure your details are clearly visible</p>
                      <p class="m-0">2. Only JPEG / PNG files with max size of 2 MB allowed</p>
            </div>
        </div>
    </div>

</template>


<style lang="scss">
.modals {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 9999;
    .modals-content {
      border-radius: 8px;
      width: 544px;
      @media screen and (max-width:480px){
        width: 320px;
      }
    }
    .modals-header {
      display: flex;
      margin-bottom: 24px;
      h2{
        font-size: 18px;
      }
    } 
    .close-btn {
        cursor: pointer;
        border: none;
        background: none;
        font-size: 30px;
        color: #888;
        right: 29px !important;
        bottom: 3px;
      @media screen and (max-width:480px){
        top: 7% !important;
        right: 3% !important;
      }
    }
  }
</style>
