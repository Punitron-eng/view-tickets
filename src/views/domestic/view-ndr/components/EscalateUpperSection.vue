<script setup>
import { ref } from 'vue';
import getImg from '@/util/getImg';

const customerItems = ref([
    { label: 'Full Name', value: 'Vipul Yadav' },
    { label: 'Amount', value: '₹ 399' },
    { label: 'City', value: 'Mumbai' },
    { label: 'Courier Boy', value: 'NA' },
]);
</script>
<template>
    <div class="modal-card font-interRegular">
        <div class="modal-card-head">
            <img :src="getImg('modal-customer')" class="w-[24px] mr-[8px]" />
            Customer
        </div>
        <div class="p-[24px] flex w-full justify-between md:flex-row flex-col gap-4">
            <div class="flex flex-col md:max-w-[220px] w-full text-light-1000 gap-[4px]">
                <div class="flex justify-between items-center text-[13px] mb-[8px]" v-for="(item, index) in customerItems" :key="index">
                    <div>{{ item.label }}</div>
                    <div class="text-light-1400"
                        :class="item.label == 'Full Name' ? 'font-interSemiBold' : 'font-interRegular'">{{ item.value }}
                    </div>
                </div>
            </div>

            <div class="flex flex-col md:max-w-[304px] w-full md:mr-[40px]">
                <div class="text-sm font-interSemiBold">SHIPPING ADDRESS</div>
                <div class="flex pt-[5px] items-start">
                    <img :src="getImg('modal-location')" class="w-[16px] mr-[8px] mt-1" />
                    <span class="text-light-1400"> Gaurav palace, Acharya Nagar, kandivali Bhagat Colony Kandivali West,
                        Bengaluru North, Karnataka 560076 </span>
                    <img :src="getImg('modal-copy')" class="w-[16px] my-[8px] mt-1" />
                </div>
            </div>
        </div>
    </div>
</template>
