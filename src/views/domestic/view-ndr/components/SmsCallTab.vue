<script setup>
import { ref } from 'vue';
import getImg from '@/util/getImg';
import BaseButton from '@/components/base/BaseButton.vue';
import SingleDatePicker from '@/components/itl-common-features/itl-date-range-picker/SingleDatePicker.vue';
import TimePicker from '@/components/itl-common-features/TimePicker.vue';
const tempData = ref([{
    icon: 'ndr-action-call-message-icon',
    heading: 'Verify from Buyer (Auto re-attempt)',
    isComponent: false,
    subHeading: 'Receive reattempt request from buyer Once your buyer responds we will reattempt',
    btnText: 'Send SMS',
}, {
    icon: 'ndr-action-call-phone-icon',
    heading: 'Need to schedule call, based on buyer convenience?',
    isComponent: true,
    btnText: 'Schedule',
}
]);

</script>
<template>
    <div class="max-w-[560px] w-full">
        <div v-for="item in tempData" :key="item.heading"
            class="flex justify-between items-center mt-[16px] bg-[#ecf4ff] p-[24px] rounded-md">
            <div class="flex items-center">
                <img :src="getImg(item.icon)" class=" mr-[16px]" />
                <div class="flex flex-col max-w-[332px] w-full">
                    <label class="font-interSemiBold text-base text-light-1200">{{ item.heading }}</label>
                    <label class="text-light-800 pt-[8px]" v-if="!item.isComponent">{{ item.subHeading }}</label>
                    <div v-else class="flex gap-[12px] pt-[16px]">
                        <SingleDatePicker v-model="date" class="w-full" />
                        <TimePicker v-model="time" class="w-full" />
                    </div>
                </div>
            </div>
            <div class="flex items-center">
                <BaseButton :name="item.btnText" />
            </div>
        </div>

    </div>
</template>