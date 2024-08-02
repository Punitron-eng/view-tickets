<script setup>
</script>

<template>
    <div class="addNewBlock">
        <!-- <hr/> -->
    </div>
    <form>
        <div class="px-[56px] py-[0]">
        <div class="flex flex-col md:w-[32%] lg:w-[24%] text-[13px] mb-[18px]">
            <label class="text-[13px] font-medium mb-[5px] text-black"> Nickname <span class="text-red-500">*</span></label>
            <input type="text" placeholder="Enter Nick Name" text-black class="border-[1px] border-[#D1D5DB] dark:border-[#4D4D4D] dark:bg-[#4D4D4D]  rounded-[6px] h-[40px] w-full py-[12px] px-[16px]" />
        </div>
    </div>
    </form>
</template>
<style lang="scss" scoped>
.addNewBlock {
    border-bottom: 1px solid red;
}
</style>