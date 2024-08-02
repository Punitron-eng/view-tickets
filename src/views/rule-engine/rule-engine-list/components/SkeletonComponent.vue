<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
const props = defineProps<{
    updateList: {
        type: Array<any>;
        required: true;
    };
}>();
</script>

<template>
    <div class="pt-[48px] px-[0.5rem] md:pl-[72px] md:pr-[72px] pb-[88px] border-1 surface-border bg-[#fff] dark:bg-[#313131]">
        <div class="dropdown flex justify-between items-center mb-[24px]">
            <div class="flex pl-[16px]">
                <Skeleton width="4rem" class="mb-2"></Skeleton> <span><Skeleton width="2rem" class="ml-2"></Skeleton></span>
            </div>
        </div>
        <div class="flex gap-2 md:gap-4" v-for="data in updateList">
            <div class="pt-[40px] w-[8px]">
                <Skeleton width="0.8rem" height="1.3rem" class="mb-2"></Skeleton>
            </div>
            <div class="border-round border-1 surface-border p-1 md:p-4 surface-card w-[100%] mb-[16px] mr-[16px]">
                <!-- ship container header -->
                <div class=" pl-[12px] pt-[12px] md:pt-[0px] md:pl-[23px] flex justify-between items-center">
                    <div class="flex items-center w-[60%]">
                        <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
                        <Skeleton width="4rem" class="md:mb-2"></Skeleton>
                    </div>
                    <div class="flex items-center">
                        <div class="toggle-image">
                            <Skeleton width="2rem" class=""></Skeleton>
                        </div>
                        <Skeleton width="2rem" class="mx-[16px]"></Skeleton>
                        <Skeleton width="2rem" class=""></Skeleton>
                    </div>
                </div>
                <!-- ship container content -->
                <div class="px-[24px] flex pt-[32px] flex-col">
                    <div class="flex pb-2" v-for="rule in 9">
                        <div class="max-w-[150px] w-[100%] mr-2">
                            <Skeleton class="w-full" height="0.7rem"></Skeleton>
                        </div>
                        <div class="max-w-[600px] w-[100%] mx-5">
                            <Skeleton class="w-full" height="0.7rem"></Skeleton>
                        </div>
                    </div>
                </div>
    
                <!-- ship container footer -->
                <div class="mt-[24px] flex flex-col md:flex-row justify-between pl-[23px] py-[8px] pr-[16px]">
                    <div class="flex w-[100%] justify-between items-center md:max-w-[320px]">
                        <div><Skeleton width="5rem" class=""></Skeleton></div>
    
                        <!-- custom or best rated -->
                        <div class="flex gap-1 items-center relative">
                            <p><Skeleton width="5rem" class=""></Skeleton></p>
                        </div>
                    </div>
                    <div class="flex justify-end w-[100%] items-center pt-2">
                        <div class="flex">
                            <Skeleton width="5rem"></Skeleton>
                            <span class="ml-2"><Skeleton width="2rem"></Skeleton></span>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>

</template>

<style lang="scss"></style>
